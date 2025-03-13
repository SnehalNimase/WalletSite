// src/components/Wallet.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get("http://localhost:8080/wallet/balance");
      setBalance(response.data);
    } catch (error) {
      console.error("Error fetching balance", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/wallet/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleAddMoney = async () => {
    try {
      await axios.post(`http://localhost:8080/wallet/add?amount=${amount}`);
      fetchBalance();
      fetchTransactions();
      setAmount("");
    } catch (error) {
      console.error("Error adding money", error);
    }
  };

  const handleWithdrawMoney = async () => {
    try {
      await axios.post(`http://localhost:8080/wallet/withdraw?amount=${amount}`);
      fetchBalance();
      fetchTransactions();
      setAmount("");
    } catch (error) {
      console.error("Error withdrawing money", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Wallet System</h2>
      <p className="text-lg font-semibold">Balance: ${balance}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="mt-4 p-2 border rounded w-full"
      />
      <div className="mt-4 flex space-x-2">
        <button onClick={handleAddMoney} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Money
        </button>
        <button onClick={handleWithdrawMoney} className="bg-red-500 text-white px-4 py-2 rounded">
          Withdraw Money
        </button>
      </div>
      <h3 className="mt-6 text-lg font-semibold">Transaction History</h3>
      <ul className="mt-2 border p-2 rounded">
        {transactions.map((tx, index) => (
          <li key={index} className={`p-1 ${tx.type === "Credit" ? "text-green-500" : "text-red-500"}`}>
            {tx.type}: ${tx.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}