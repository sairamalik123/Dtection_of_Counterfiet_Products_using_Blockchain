# Detection of Counterfeit Product Using Blockchain

The Detection of Counterfeit Product Using Blockchain is an innovative solution that uses blockchain technology to combat counterfeit products in various industries. It uses QR codes, smart contracts, and the Ethereum network to provide a secure and transparent platform for tracking and verifying product authenticity. The system is significant in addressing global supply chain issues by reducing the prevalence of counterfeit goods and enhancing transparency and trust.

---

## Live Demo

- [Product Live Demo](#) *(Insert actual link)*
- [Project Blog Post](https://medium.com/p/68d23c7bc41c)

---

## Table of Contents

- [Overview](#overview)
- [Basic Walkthrough](#basic-walkthrough)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Setup](#project-setup)
- [Security Features](#security-features)

---

## Overview

The Detection of Counterfeit Product Using Blockchain is a groundbreaking solution designed to combat global supply chain issues related to counterfeit products. It leverages the unique capabilities of blockchain technology to provide a secure and transparent platform for tracking and verifying the authenticity of products across various industries.

The system uses QR codes, an overt technology that can be scanned by a smartphone app, to verify product information and origin. It employs smart contracts to store and execute product verification logic on the blockchain, ensuring tamper-proof data and trustless transactions. The Ethereum network serves as its decentralized database to store product information and status, accessible by authorized parties. A web interface, powered by React, allows users to interact with the system and view product information and history.

The technologies used in this system include Solidity for smart contract development, Hardhat for Ethereum development environment, React for building the user interface, Node.js for backend development, and ethers.js for interacting with the Ethereum blockchain.

This system is significant in solving global supply chain issues as it provides a reliable method to verify the authenticity of products, thereby reducing the prevalence of counterfeit goods. It enhances transparency and trust among stakeholders in the supply chain, from manufacturers to consumers.

---

## Basic Walkthrough

- The `trumark-backend-node` directory contains the codebase for the backend of the system.
- The `trumark-frontend-react` directory contains the codebase for the frontend of the system.
- The `trumark-postgres-database` directory contains the CSV files for the backend database.
- The `trumark-smartcontract-solidity` directory contains the smart contract deployed to the Ethereum network.

---

## Technologies Used

- Solidity
- Hardhat
- React
- Node.js
- ethers.js
- PostgreSQL

---

## Features

- **QR Code Scanning**: Overt technology used to scan and verify product data and origin.
- **Smart Contracts**: Blockchain-based verification logic ensuring tamper-proof, immutable records.
- **Ethereum Network**: Decentralized platform storing product metadata and verification logs.
- **Web Interface**: React-based frontend for real-time product verification and tracking.
- **Image Upload**: Upload and link product images to enhance authenticity.
- **Geolocation Tagging**: Capture and store product location at the time of registration.

---

## Security Features

- **Digital Signature Validation**: Every product’s QR code is digitally signed with a private key. When scanned, its authenticity is validated using the public key stored on-chain.
- **One-Time Key Verification**: Each product includes a one-time key printed physically. Upon first scan and validation, this key must be entered by the user. If the OTP is correct and unused, access is granted. Reuse is blocked by marking it in the backend database.
- **Encrypted Private Key Storage**: Private RSA keys are stored in the backend encrypted using AES-256 to protect the signing process.

---

## Project Setup

To get started with this project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   ```

2. **Database Setup:**

   - Navigate to `truemark-postgres-database`
   - Import the provided CSV files into your PostgreSQL database

3. **Backend Setup:**

   - Navigate to `truemark-backend-node`
   - Run:
     ```bash
     npm install
     node postgres.js
     ```
   - Edit `config/db.js` to set your PostgreSQL credentials

4. **Frontend Setup:**

   - Navigate to `truemark-frontend-react`
   - Run:
     ```bash
     npm install
     npm start
     ```

5. **Smart Contract Setup:**

   - Explore `truemark-smartcontract-solidity`
   - Contracts are deployed to the **Sepolia Testnet**

6. **MetaMask & Blockchain Transactions:**

   - Install [MetaMask](https://metamask.io/)
   - Connect it to the **Sepolia Testnet**
   - Obtain free SepoliaETH from the [Sepolia Faucet](https://sepoliafaucet.com/)

---

## Documentation

For detailed user guide, smart contract details, and testing scenarios:

- [User Manual (Google Drive/Notion/Link)](#)
- [API Documentation (Swagger/Postman Collection)](#)

---

## Contact

For questions or feedback, please open an issue or contact: **Saira Luqman** - [sairaluqman366@gmail.com](mailto\:sairaluqman366@gmail.com)

---

For more information, you can view our user manual:
[View User Manual](/user-manual.pdf)
