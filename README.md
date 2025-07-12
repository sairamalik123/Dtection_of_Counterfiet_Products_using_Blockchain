# Detection of Counterfeit Product Using Blockchain

The Detection of Counterfeit Product Using Blockchain is an innovative solution that uses blockchain technology to combat counterfeit products in various industries. It uses QR codes, smart contracts, and the Ethereum network to provide a secure and transparent platform for tracking and verifying product authenticity. The system is significant in addressing global supply chain issues by reducing the prevalence of counterfeit goods and enhancing transparency and trust. 

## Table of Contents
- [Overview](#overview)
- [Basic Walkthrough](#basic-walkthrough)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Setup](#project-setup)

## Overview
The Anti-Counterfeit Product Identification System Using Blockchain is a groundbreaking solution designed to combat global supply chain issues related to counterfeit products. It leverages the unique capabilities of blockchain technology to provide a secure and transparent platform for tracking and verifying the authenticity of products across various industries.

The system uses QR codes, an overt technology that can be scanned by a smartphone app, to verify product information and origin. It employs smart contracts to store and execute product verification logic on the blockchain, ensuring tamper-proof data and trust less transactions. The Ethereum network serves as its decentralized database to store product information and status, accessible by authorized parties. A web interface, powered by React, allows users to interact with the system and view product information and history.
The technologies used in this system include Solidity for smart contract development, Hardhat for Ethereum development environment, react for building the user interface, Node.js for backend development, and ethers.js for interacting with the Ethereum blockchain.

This system is significant in solving global supply chain issues as it provides a reliable method to verify the authenticity of products, thereby reducing the prevalence of counterfeit goods. It enhances transparency and trust among stakeholders in the supply chain, from manufacturers to consumers.


## Basic Walkthrough
- The `truemark-backend-node` directory contains the codebase for the backend of the system.
- The `truemark-frontend-react` directory contains the codebase for the frontend of the system.
- The `truemark-postgres-database` directory contains the csv files for the backend database.
- The `truemark-smartcontract-solidity` directory contains the smart contract deployed to the Ethereum network.

## Technologies Used
- Solidity
- Hardhat
- React
- Node.js
- ethers.js

## Features
- **QR Codes with Digital Signature**:
Each product is assigned a unique QR code that contains a digitally signed payload using an RSA private key, allowing users to scan and verify authenticity.

- **Smart Contracts for Verification**:
Smart contracts deployed on the Ethereum Sepolia Testnet securely store product data and verification logic, ensuring immutability and tamper-proof operations.

- **Public Key Retrieval from Blockchain**:
The public key needed to verify the QR code’s signature is fetched directly from the smart contract, enabling decentralized signature validation.

- **One-Time Key Authentication**:
An additional layer of security using one-time keys (OTKs) printed on the product — once verified, the key becomes invalid for future use.

- **Ethereum Network Integration**:
The Ethereum blockchain acts as a decentralized ledger to store product history, including creation, updates, and verification by different roles.

- **Web Interface for All Roles**:
A React-powered frontend enables manufacturers, suppliers, retailers, and consumers to register products, scan QR codes, and view product history with an intuitive interface.

- **Location and Timestamp Tracking**:
The system captures user location using IP geolocation and stores a timestamp on every blockchain interaction to ensure traceability.

- **Role-Based Access Control**:
Access and permissions are controlled based on user roles (manufacturer, supplier, retailer, customer), with each action recorded on-chain.

## Project Setup
To get started with this project, 
1. Clone the repository.
2. In `truemark-postgres-database`, import the csv files to your own postgres database.
3. In `truemark-backend-node`, run `npm i` to install the dependencies and change the postgres credentials to your postgres crediantials and run `node postgres.js` to start the backend execution.
4. In `truemark-frontend-react`, run `npm i` to install the dependencies and run `npm start` to start localhost.
5. You can inspect `truemark-smartcontract-solidity` directory to view the smart contract details that is deployed to the Sepolia Testnet.
6. To perform transactions, setup your Metamask wallet and connect your wallet to the Sepolia Tesnet Network and transact using SepoliaETH which can be obtained for free on Seplolia Faucet (https://sepoliafaucet.com/).

For more information, you can view our user manual:
[View User Manual](/user-manual.pdf)
