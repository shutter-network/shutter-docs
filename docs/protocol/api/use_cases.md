---
title: Shutter API Use Cases
description: Shutter API Use Cases
sidebar_label: 'Use Cases'
sidebar_position: 3
---

# Shutter API Use Cases  

## Overview  

The **Shutter API** provides developers with access to a **threshold encryption service**, enabling secure, fair, and private interactions in decentralized applications (dApps). By leveraging a **distributed network of Keypers**, the Shutter API ensures that sensitive data remains encrypted until a predefined time or event occurs.  

This document explores the many ways developers can integrate the Shutter API into their applications, detailing both high-level use cases and the technical mechanisms that enable them.  

## Why Threshold Encryption?  

Decentralized applications often require privacy and fairness guarantees, but traditional blockchain environments expose all transactions and commitments publicly. This results in:  

- **Information asymmetry** – Some participants can see private information before others, leading to unfair advantages.  
- **Hidden trust assumptions** – Many dApps still rely on centralized servers or opaque processes to manage private data.  
- **Manipulation risks** – Without encryption, attackers can exploit transaction visibility for **front-running, censorship, or selective reveals**.  

By using **Shutter API**, developers can remove these vulnerabilities and introduce **trust-minimized encryption** into their applications with **minimal complexity**.  

## Key Use Cases  

### 1. Shielded Trading – Preventing MEV & Front-Running  

**Problem:** In decentralized finance (DeFi), malicious actors monitor pending transactions in public mempools, allowing them to **front-run** users by inserting their own transactions first. This results in **higher costs, price manipulation, and unfair markets**.  

**Solution:** Shutter API enables encrypted transaction submissions, ensuring that trade details remain hidden until execution. Traders can execute **private limit orders, swaps, and liquidations** without exposing sensitive information to bots or other traders.  

**Technical Flow:**  
- The user encrypts their transaction data before submitting it.  
- The encrypted transaction is recorded on-chain or in a private order book.  
- Once confirmed, the decryption key is released, revealing and executing the transaction **simultaneously for all users**.  

---

### 2. Shielded Voting – Preventing Manipulation in DAOs  

**Problem:** Most DAOs rely on **open voting**, where early votes can influence later participants, leading to **coercion, vote buying, and governance manipulation**.  

**Solution:** With **Shutter API**, all votes remain **encrypted** until the voting period ends, ensuring that every participant’s decision remains private until the final reveal. This prevents strategic voting and maintains the integrity of decentralized governance.  

**Technical Flow:**  
- A voter encrypts their vote before submitting it to the DAO’s smart contract.  
- The vote is stored on-chain, but remains unreadable.  
- Once the voting period closes, the decryption key is released and all votes are revealed **at the same time**.  

---

### 3. Sealed-Bid Auctions – Preventing Bid Manipulation  

**Problem:** In traditional auctions, bid data is often visible before the auction ends. This allows **auctioneers, insiders, or competitors** to adjust their strategies unfairly, outbidding honest participants at the last moment.  

**Solution:** **Shutter API** ensures that all bids remain **completely private** until the auction closes. Bidders can submit **sealed bids** without fear of being outmaneuvered by privileged actors.  

**Technical Flow:**  
- A bidder encrypts their bid and submits it to the auction contract.  
- The bid is stored securely, but remains unreadable until the auction ends.  
- At the closing time, the decryption key is released, revealing all bids simultaneously and determining the winner fairly.  

---

### 4. Fair On-Chain Gaming – Enforcing Simultaneous Move Revelation  

**Problem:** Many blockchain games involve **hidden moves, secret actions, or randomness**, but without encryption, these mechanics can be **exploited** by insiders or other players.  

**Solution:** **Shutter API** ensures that game moves and actions remain encrypted until they should be revealed, preventing unfair advantages.  

**Example Applications:**  
- **Rock, Paper, Scissors** – Players encrypt and submit their moves, ensuring neither can see the other's choice before committing.  
- **Poker** – Enforces forced reveals of cards at the appropriate moment, preventing selective disclosure or cheating.  
- **Daoplomacy** – A blockchain version of Diplomacy, where all strategic moves remain hidden until the reveal phase.  
- **Werewolf/Mafia-style games** – Keeps player roles and night actions secret until they are meant to be disclosed.  

**Technical Flow:**  
- Players submit encrypted moves or actions.  
- The encrypted data is recorded on-chain or in a game state database.  
- At the designated time, the decryption key is released, revealing the results fairly.  

---

### 5. Smart Accounts with Encrypted Data Access  

**Problem:** **Smart accounts (such as Safe multisigs)** improve security and usability, but they currently **lack the ability to access encrypted data**. Unlike EOAs, smart contracts cannot easily retrieve and decrypt sensitive information.  

**Solution:** With **Shutter API**, smart accounts can be granted controlled access to encrypted documents, financial records, or private user data.  

**Example Application:** **Providing E2E encrypted access to a Fileverse document for a smart account.**  

**Technical Flow:**  
1. A user generates a key for their smart account wallet.  
2. They link a **Shutter public key** to their smart account.  
3. When the smart account requests access to encrypted data, an on-chain event triggers the **Shutter Keypers** to release a **decryption key**.  
4. The decryption key is encrypted for the requesting user, allowing them to decrypt the data in their browser.  

This enables **private document sharing, secure access controls, and confidential transaction data retrieval** for smart accounts.  

---

### 6. Solving the Free Option Problem in Auctions & Bidding  

**Problem:** In sealed-bid auctions, bidders can **submit multiple bids, observe others' bids, and withdraw unfavorable ones**. This exploit, known as the **Free Option Problem**, results in unfair competition.  

**Solution:** **Shutter API** prevents this by **locking bids until the reveal phase**, ensuring every bid is final and no one can selectively withdraw after seeing competitors' offers.  

**Example:** In an NFT auction, Shutter API ensures that all bids remain **sealed** until the auction ends, preventing last-minute withdrawals or bid manipulation.  

---

### 7. Private Trading for MEV-Protected Order Books  

**Problem:** In DeFi, **order book-based trading platforms** often expose orders before execution, allowing **market makers and bots** to manipulate prices.  

**Solution:** **Shutter API** keeps limit orders and trade intentions private until they execute, ensuring fair trading conditions.  

**Technical Flow:**  
- Traders encrypt their limit orders before submission.  
- The encrypted orders are stored in the **order book**.  
- At execution, the decryption key is released, allowing orders to be matched fairly.  

This approach can significantly **reduce MEV attacks** and **improve price fairness** in decentralized exchanges (DEXs).  

---

## Conclusion  

The **Shutter API** provides a **powerful and flexible encryption layer** for a wide variety of Web3 applications. By integrating threshold encryption, dApps can **prevent manipulation, enhance fairness, and protect user data** without requiring complex cryptographic knowledge.  

Developers can start using the Shutter API today to **improve trading security, enable fair governance, build trustless games, and implement confidential smart account interactions**.  

To learn more and start building, visit: [Shutter API Documentation](https://shutter.network/shutter-api)  
