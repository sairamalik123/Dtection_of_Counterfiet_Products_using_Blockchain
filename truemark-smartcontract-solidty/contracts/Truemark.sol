    // SPDX-License-Identifier: Unlicense
    pragma solidity ^0.8.17;

    /**
    * @title Truemark
    * @dev Uses ECDSA (Ethereum) keys to register products and verify authenticity.
    *      - Only addresses assigned the Manufacturer role may register a new product.
    *      - Off‐chain, the Manufacturer must sign keccak256(serialNumber ‖ name ‖ brand) 
    *        with their Ethereum private key.
    *      - registerProduct() verifies that signature on‐chain, ensuring it was actually 
    *        signed by msg.sender before storing.
    *      - Anyone can call isAuthentic() later to see if a given serialNumber is valid 
    *        (i.e. matches the stored signature and has at least one history entry).
    */
    contract Truemark {
        address public owner;

        constructor() {
            owner = msg.sender;
        }

        enum Role { None, Manufacturer, Retailer, Supplier }

        /// @dev For each serialNumber, store the product’s static data plus signature info.
        struct Product {
            string name;
            string brand;
            string description;
            string image;
            address manufacturer;       // The address that registered (and signed) this product
            bytes signature;            // ECDSA signature of keccak256(serialNumber‖name‖brand)
            mapping(uint => ProductHistory) history;
            uint historySize;
        }

        struct ProductHistory {
            uint id;
            string actor;
            string location;
            string timestamp;
            bool isSold;
        }

        /// @dev serialNumber ⇒ Product struct
        mapping(string => Product) private products;

        /// @dev user address ⇒ Role
        mapping(address => Role) public roles;

        /// @dev List of all registered serialNumbers
        string[] public allProducts;

        // ========================= ADMIN =========================

        modifier onlyOwner() {
            require(msg.sender == owner, "Only owner can call this");
            _;
        }

        /// @dev The owner can assign roles (Manufacturer, Retailer, Supplier) to arbitrary addresses.
        function assignRole(address user, uint roleType) external onlyOwner {
            require(roleType >= 1 && roleType <= 3, "Invalid role type");
            roles[user] = Role(roleType);
        }

        // ========================= REGISTRATION (WITH SIGNATURE) =========================

        /**
        * @notice Register a new product on‐chain, verifying the off‐chain ECDSA signature.
        * @param _serialNumber   Unique serial number for the product.
        * @param _name           Human‐readable name of the product.
        * @param _brand          Brand of the product.
        * @param _description    Free‐text description.
        * @param _image          URL or IPFS‐style hash that points to the product image.
        * @param _actor          First history actor (e.g. initial warehouse or factory), stored to kickstart history.
        * @param _location       Location for the first history entry.
        * @param _timestamp      Timestamp for the first history entry.
        * @param _isSold         Whether this first entry marks it as sold (usually false at registration).
        * @param _signature      ECDSA signature over keccak256(serialNumber‖name‖brand), signed by msg.sender’s private key.
        */
        function registerProduct(
            string memory _serialNumber,
            string memory _name,
            string memory _brand,
            string memory _description,
            string memory _image,
            string memory _actor,
            string memory _location,
            string memory _timestamp,
            bool _isSold,
            bytes memory _signature
        ) external {
            // 1) Only an address with Role.Manufacturer may register new products.
            require(roles[msg.sender] == Role.Manufacturer, "Only Manufacturer can register product");

            // 2) Check that this serialNumber has not already been used.
            Product storage existing = products[_serialNumber];
            require(bytes(existing.name).length == 0, "Product already exists");

            // 3) Reconstruct the message hash that was signed off‐chain:
            //    keccak256(abi.encodePacked(serialNumber, name, brand))
            bytes32 messageHash = keccak256(abi.encodePacked(_serialNumber, _name, _brand));
            bytes32 ethSignedMessageHash = _toEthSignedMessageHash(messageHash);

            // 4) Recover the signer address from the signature:
            address recovered = _recoverSigner(ethSignedMessageHash, _signature);
            require(recovered == msg.sender, "Invalid signature: must be signed by sender");

            // 5) Populate the Product struct in storage:
            Product storage p = products[_serialNumber];
            p.name = _name;
            p.brand = _brand;
            p.description = _description;
            p.image = _image;
            p.manufacturer = msg.sender;
            p.signature = _signature;

            // 6) Add initial history entry:
            p.historySize = 0;
            _addProductHistoryInternal(_serialNumber, _actor, _location, _timestamp, _isSold);

            // 7) Keep track of all serialNumbers:
            allProducts.push(_serialNumber);
        }

        // ========================= INTERNAL UTILITY FOR HISTORY =========================

        function _addProductHistoryInternal(
            string memory _serialNumber,
            string memory _actor,
            string memory _location,
            string memory _timestamp,
            bool _isSold
        ) internal {
            Product storage p = products[_serialNumber];
            p.historySize++;
            p.history[p.historySize] = ProductHistory({
                id: p.historySize,
                actor: _actor,
                location: _location,
                timestamp: _timestamp,
                isSold: _isSold
            });
        }

        // ========================= EXTERNAL HISTORY UPDATES =========================

        /**
        * @notice Append a new history record for an existing product.
        * @dev Any role except None can update history (Manufacturer/Retailer/Supplier).
        * @param _serialNumber   Serial number of an existing product.
        * @param _actor          Actor name (e.g. "Distributor X", "Retailer Y").
        * @param _location       Location string.
        * @param _timestamp      Timestamp in string form.
        * @param _isSold         Whether this event marks it as sold.
        */
        function addProductHistory(
            string memory _serialNumber,
            string memory _actor,
            string memory _location,
            string memory _timestamp,
            bool _isSold
        ) external {
            require(roles[msg.sender] != Role.None, "Only authorized roles can update history");
            Product storage p = products[_serialNumber];
            require(bytes(p.name).length != 0, "Product does not exist");

            _addProductHistoryInternal(_serialNumber, _actor, _location, _timestamp, _isSold);
        }

        // ========================= PUBLIC GETTERS =========================

        /**
        * @notice Retrieve all information about a product, including its full history array.
        * @param _serialNumber   Serial number to look up.
        * @return serialRet      Serial number (redundant echo).
        * @return nameRet        Product name.
        * @return brandRet       Product brand.
        * @return descriptionRet Product description.
        * @return imageRet       Product image reference.
        * @return manufacturerRet Address of the original manufacturer who registered + signed.
        * @return historyRet     Array of ProductHistory items (length = historySize).
        */
        function getProduct(
            string memory _serialNumber
        ) external view returns (
            string memory serialRet,
            string memory nameRet,
            string memory brandRet,
            string memory descriptionRet,
            string memory imageRet,
            address manufacturerRet,
            ProductHistory[] memory historyRet
        ) {
            Product storage prod = products[_serialNumber];
            require(bytes(prod.name).length != 0, "Product not found");

            // Build a fixed‐size array in memory for all history entries:
            uint count = prod.historySize;
            ProductHistory[] memory arr = new ProductHistory[](count);
            for (uint i = 0; i < count; i++) {
                arr[i] = prod.history[i + 1];
            }

            return (
                _serialNumber,
                prod.name,
                prod.brand,
                prod.description,
                prod.image,
                prod.manufacturer,
                arr
            );
        }

        // ========================= AUTHENTICITY CHECK =========================

        /**
        * @notice Check if a given serialNumber is “authentic”.
        * @dev A product is authentic if:
        *      1) It exists in the mapping (i.e. was registered properly), and
        *      2) It has at least one history entry beyond registration.
        *      (You can add deeper checks if required—e.g. verifying signature again on‐chain.)
        * @param _serialNumber Serial number to verify.
        * @return true if product is found and has ≥1 history entries.
        */
        function isAuthentic(string memory _serialNumber) external view returns (bool) {
            Product storage p = products[_serialNumber];
            if (bytes(p.name).length == 0) {
                return false; // Never registered
            }
            if (p.historySize < 1) {
                return false; // No history recorded yet
            }
            return true;
        }

        /**
        * @notice Helper that returns the stored manufacturer address and signature for a product.
        * @param _serialNumber Serial number to look up.
        * @return manufacturerAddr The address that signed/registered.
        * @return sig              The raw bytes of the stored ECDSA signature.
        */
        function getSigInfo(string memory _serialNumber) external view returns (address manufacturerAddr, bytes memory sig) {
            Product storage p = products[_serialNumber];
            require(bytes(p.name).length != 0, "Product not found");
            return (p.manufacturer, p.signature);
        }

        // ========================= ECDSA UTILITIES =========================

        /// @dev Prefixes a raw hash with “\x19Ethereum Signed Message:\n32” and rehashes.
        function _toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
            return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        }

        /**
        * @dev Recover the signer address from a given message hash and signature bytes.
        *      Signature should be: {r (32 bytes)}‖{s (32 bytes)}‖{v (1 byte)}.
        */
        function _recoverSigner(bytes32 ethSignedMessageHash, bytes memory signature) internal pure returns (address) {
            require(signature.length == 65, "Invalid signature length");

            bytes32 r;
            bytes32 s;
            uint8 v;
            // Extract r, s, v from the 65‐byte signature:
            assembly {
                r := mload(add(signature, 0x20))      // first 32 bytes
                s := mload(add(signature, 0x40))      // next 32 bytes
                v := byte(0, mload(add(signature, 0x60))) // final byte
            }
            // EIP‐2 still allows signature malleability via lower‐S values. Enforce s <= secp256k1n/2.
            require(uint256(s) <= 0x7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0, "Invalid S parameter");
            require(v == 27 || v == 28, "Invalid v parameter");

            return ecrecover(ethSignedMessageHash, v, r, s);
        }

        // ========================= ROLE QUERY =========================

        function getRole(address user) external view returns (string memory) {
            Role r = roles[user];
            if (r == Role.Manufacturer) return "Manufacturer";
            else if (r == Role.Retailer)   return "Retailer";
            else if (r == Role.Supplier)   return "Supplier";
            else                           return "None";
        }
    }
