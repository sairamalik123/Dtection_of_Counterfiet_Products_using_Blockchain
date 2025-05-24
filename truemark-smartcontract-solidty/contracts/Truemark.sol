// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

contract Truemark {
    address public owner; 

    constructor() {
        owner = msg.sender;
    }

    enum Role { None, Manufacturer, Retailer, Supplier }

    struct ProductHistory {
        uint id;
        string actor;
        string location;
        string timestamp;
        bool isSold;
    }

    struct Product {
        string name;
        string serialNumber;
        string description;
        string brand;
        string image;
        mapping(uint => ProductHistory) history;
        uint historySize;
    }

    mapping(string => Product) products;
    mapping(address => Role) public roles; // role mapping
    string[] public allProducts;

    // ========================= ADMIN =========================

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    function assignRole(address user, uint roleType) public onlyOwner {
        require(roleType >= 1 && roleType <= 3, "Invalid role type");
        roles[user] = Role(roleType);
    }

    // ========================= REGISTER PRODUCT =========================

    function registerProduct(
        string memory _name,
        string memory _brand,
        string memory _serialNumber,
        string memory _description,
        string memory _image,
        string memory _actor,
        string memory _location,
        string memory _timestamp
    ) public {
        require(roles[msg.sender] == Role.Manufacturer, "Only Manufacturer can register product");

        Product storage p = products[_serialNumber];
        p.name = _name;
        p.brand = _brand;
        p.serialNumber = _serialNumber;
        p.description = _description;
        p.image = _image;
        p.historySize = 0;
        allProducts.push(_serialNumber);

        addProductHistory(_serialNumber, _actor, _location, _timestamp, false);
    }

    // ========================= UPDATE HISTORY =========================

    function addProductHistory(
        string memory _serialNumber,
        string memory _actor,
        string memory _location,
        string memory _timestamp,
        bool _isSold
    ) public {
        require(roles[msg.sender] != Role.None, "Only authorized roles can update history");

        Product storage p = products[_serialNumber];
        require(bytes(p.serialNumber).length > 0, "Product does not exist");

        p.historySize++;
        p.history[p.historySize] = ProductHistory(p.historySize, _actor, _location, _timestamp, _isSold);
    }

    // ========================= GET PRODUCT & HISTORY =========================

    function getProduct(
        string memory _serialNumber
    ) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        ProductHistory[] memory
    ) {
        Product storage prod = products[_serialNumber];
        require(bytes(prod.serialNumber).length > 0, "Product not found");

        ProductHistory[] memory pHistory = new ProductHistory[](prod.historySize);
        for (uint i = 0; i < prod.historySize; i++) {
            pHistory[i] = prod.history[i + 1];
        }

        return (
            prod.serialNumber,
            prod.name,
            prod.brand,
            prod.description,
            prod.image,
            pHistory
        );
    }

    // ========================= COUNTERFEIT CHECK =========================

    function isAuthentic(string memory _serialNumber) public view returns (bool) {
        Product storage p = products[_serialNumber];
        if (bytes(p.serialNumber).length == 0) return false;
        if (p.historySize < 3) return false; // Less than 3 updates = incomplete

        return true; // You can add deeper role-based history validation if needed
    }

    function getRole(address user) public view returns (string memory) {
        Role r = roles[user];
        if (r == Role.Manufacturer) return "Manufacturer";
        else if (r == Role.Retailer) return "Retailer";
        else if (r == Role.Supplier) return "Supplier";
        else return "None";
    }
}
