// WalletService.java (Business Logic)
package com.example.wallet.service;

import com.example.wallet.entity.Transaction;
import com.example.wallet.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WalletService {

    private double balance = 0.0;

    @Autowired
    private TransactionRepository transactionRepository;

    public double getBalance() {
        return balance;
    }

    public String addMoney(double amount) {
        if (amount <= 0) return "Invalid amount";
        balance += amount;
        transactionRepository.save(new Transaction("Credit", amount));
        return "Added " + amount + " to wallet. New Balance: " + balance;
    }

    public String withdrawMoney(double amount) {
        if (amount <= 0) return "Invalid amount";
        if (amount > balance) return "Insufficient balance";
        balance -= amount;
        transactionRepository.save(new Transaction("Debit", amount));
        return "Withdrawn " + amount + " from wallet. New Balance: " + balance;
    }

    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }
}