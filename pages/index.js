import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [userBalance, setUserBalance] = useState(undefined);

  const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";  // Replace with your actual contract address
  const abi = contractABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(new ethers.providers.Web3Provider(window.ethereum));
    }
  };

  const handleAccount = async () => {
    if (ethWallet) {
      const accounts = await ethWallet.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        getContract();
      } else {
        console.log("No account found");
      }
    }
  };

  const connectAccount = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      handleAccount();
    } catch (error) {
      console.error("Error connecting account: ", error);
    }
  };

  const getContract = () => {
    if (ethWallet) {
      const signer = ethWallet.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);
    }
  };

  const fetchContractData = async () => {
    if (contract) {
      try {
        const contractValue = await contract.getValue();
        const contractMessage = await contract.getMessage();
        const userBalance = await contract.getBalance();  // Fetch balance from contract
        setValue(contractValue.toString());
        setMessage(contractMessage);
        setUserBalance(ethers.utils.formatEther(userBalance));  // Convert balance to Ether and set state
      } catch (error) {
        console.error("Error fetching contract data: ", error);
      }
    }
  };

  const deposit = async () => {
    if (contract) {
      try {
        const amountInWei = ethers.utils.parseEther("0.1"); // Convert 0.1 ETH to Wei
        const tx = await contract.deposit({ value: amountInWei });
        await tx.wait();
        fetchContractData();
      } catch (error) {
        console.error("Error depositing: ", error);
      }
    }
  };
  

  const withdraw = async () => {
    if (contract) {
      try {
        const amountInWei = ethers.utils.parseEther("1"); // Convert 0.1 ETH to Wei
        const tx = await contract.withdraw(amountInWei);
        await tx.wait();
        fetchContractData();
      } catch (error) {
        console.error("Error withdrawing: ", error);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask to use this application.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount} style={styles.button}>Please connect your Metamask wallet</button>;
    }

    if (!value || !message || userBalance === undefined) {
      fetchContractData();
    }

    return (
      <div>
        <p style={styles.text}>Your Account: {account}</p>
        <p style={styles.text}>Contract Value: {value}</p>
        <p style={styles.text}>Contract Message: {message}</p>
        <p style={styles.text}>Your Balance: {userBalance} ETH</p>
        <button onClick={deposit} style={styles.button}>Deposit 1 ETH</button>
        <button onClick={withdraw} style={styles.button}>Withdraw 1 ETH</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container" style={styles.body}>
      <header><h1>Welcome to the CryptoExchange !</h1></header>
      {initUser()}
    </main>
  );
}

const styles = {
  body: {
    backgroundColor: "#252525",  // Background color of the main container
    minHeight: "100vh",  // Ensures container takes up full viewport height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",  // Text color for the entire page
  },
  button: {
    backgroundColor: "#4CAF50",  // Background color of buttons
    border: "none",  // Remove border
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  text: {
    fontSize: "18px",  // Font size for paragraphs
    margin: "5px",
  },
};

