// WalletController.java (Handles API Requests)
package com.example.wallet.controller;

import com.example.wallet.service.WalletService;
import com.example.wallet.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping("/balance")
    public double getBalance() {
        return walletService.getBalance();
    }

    @PostMapping("/add")
    public String addMoney(@RequestParam double amount) {
        return walletService.addMoney(amount);
    }

    @PostMapping("/withdraw")
    public String withdrawMoney(@RequestParam double amount) {
        return walletService.withdrawMoney(amount);
    }

    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        return walletService.getTransactions();
    }
}