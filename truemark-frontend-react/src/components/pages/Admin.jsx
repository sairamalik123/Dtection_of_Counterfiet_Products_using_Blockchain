// import '../../css/Role.css'
// import { LinkButton } from '../LinkButton';
// import { Box, Button as Btn } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';

// const Admin = () => {
//     return (
//         <div className="role-container">
//             <div className="role-container-box">

//                 <Box
//                     sx={{                        
//                         position: 'absolute',
//                         top: 20,
//                         right: 20,
//                     }}
//                 >
//                     <Btn href="/login" endIcon={<LogoutIcon />}>Logout</Btn>                    
//                 </Box>

//                 <h2>Welcome:</h2>
//                 <h1>ADMIN</h1>
//                 <LinkButton to="/add-account" className="btns" buttonStyle='btn--long' buttonSize='btn--large'>Add Account</LinkButton>
//                 <LinkButton to="/manage-account" className="btns" buttonStyle='btn--long' buttonSize='btn--large'>Manage Accounts</LinkButton>

//             </div>
//         </div>
//     );
// }

// export default Admin;





import '../../css/Role.css';
import { LinkButton } from '../LinkButton';
import { Box, Button as Btn, TextField, MenuItem, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../../utils/Truemark.json';

const CONTRACT_ADDRESS = '0xff640E131188aAf6E898a53E7969054327c7A5aA'; // Replace with your deployed contract address

const Admin = () => {
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');

    const handleAssignRole = async (e) => {
        e.preventDefault();
        if (!window.ethereum) return alert("Please install MetaMask");
        if (!address || !role) return alert("Enter all fields");

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer);

            const tx = await contract.assignRole(address, parseInt(role));
            await tx.wait();

            alert("Role assigned successfully!");
            setAddress('');
            setRole('');
        } catch (err) {
            console.error(err);
            alert("Failed to assign role");
        }
    };

    return (
        <div className="role-container">
            <div className="role-container-box">

                <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
                    <Btn href="/login" endIcon={<LogoutIcon />}>Logout</Btn>
                </Box>
                {/* <h2>Welcome:</h2> */}
                <h1>ADMIN</h1>

                <LinkButton to="/add-account" className="btns" buttonStyle='btn--long' buttonSize='btn--large'>
                    Add Account
                </LinkButton>
                <LinkButton to="/manage-account" className="btns" buttonStyle='btn--long' buttonSize='btn--large'>
                    Manage Accounts
                </LinkButton>

                {/* Role Assignment Form */}
                <Box sx={{ mt: 1, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>Assign Role</Typography>
                    <form onSubmit={handleAssignRole}>
                        <TextField
                            label="Wallet Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Paste wallet address here"
                        />
                        <TextField
                            select
                            label="Select Role"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="1">Manufacturer</MenuItem>
                            <MenuItem value="2">Retailer</MenuItem>
                            <MenuItem value="3">Supplier</MenuItem>
                        </TextField>
                        <Btn type="submit" variant="contained" color="primary" fullWidth>Assign Role</Btn>
                    </form>
               
                </Box>

            </div>
        </div>
    );
};

export default Admin;
