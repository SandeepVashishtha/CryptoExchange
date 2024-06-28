# CryptoExchange

## Overview

Welcome to **cryptoexchange**, a project focused on smart contract development for decentralized exchange functionalities on the Ethereum blockchain. This repository contains Solidity smart contracts implemented using Hardhat, a development environment for Ethereum that helps you deploy, test, and manage smart contracts effectively.

## Contracts

### Assessment.sol

Assessment.sol is the main smart contract in this project. It includes functionalities such as:

- **getValue():** Retrieves the current stored value in the contract.
- **setValue(uint256 newValue):** Sets a new value in the contract.
- **getMessage():** Retrieves a message stored in the contract.
- **setMessage(string memory newMessage):** Sets a new message in the contract.
- **deposit():** Allows users to deposit Ether into the contract.
- **withdraw(uint256 amount):** Allows users to withdraw Ether from the contract.
- **getBalance():** Retrieves the balance of the user in the contract.

## Getting Started

To get started with this project:

1. Clone the repository: `git clone https://github.com/sandeepvashishtha/CryptoExchange.git`
2. Navigate to the project directory: `cd cryptoexchange`
3. Install dependencies: `npm install`
4. Compile the contracts: `npx hardhat compile`
5. Test the contracts: `npx hardhat test`
6. Deploy the contracts: `npx hardhat run scripts/deploy.js`

## Authors

- Sandeep Vashishtha

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
