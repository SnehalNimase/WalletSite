package com.example.wallet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.wallet.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
