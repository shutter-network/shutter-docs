---
title: Shutter API Glossary
description: Shutter API Glossary
sidebar_label: 'Glossary'
sidebar_position: 5
---

:::note

The [shutter-api README](https://github.com/shutter-network/shutter-api/blob/main/README.md) is the up-to-date API reference. This page may not be up-to-date.

:::

# Shutter API Glossary  

This glossary provides definitions of key terms related to the **Shutter API** and the **Shutter threshold encryption protocol**. These concepts are essential for understanding how Shutter enables **fair, private, and trust-minimized** interactions in decentralized applications (dApps).  

---

#### **Threshold Encryption**  
A cryptographic method where a **decryption key is split among multiple parties**, requiring a minimum threshold of them to collaborate before decryption is possible. This ensures that no single entity has unilateral control over the encrypted data, improving security and reducing trust assumptions.  

---

#### **Commit-and-Reveal Scheme**  
A cryptographic mechanism where a user **first commits** to an action (e.g., submitting an encrypted bid or move) and **later reveals** it when predefined conditions are met. This prevents premature disclosure of sensitive information, ensuring fairness in scenarios like auctions, governance, and gaming.  

---

#### **Keypers**  
A decentralized network of **independent node operators** that collaboratively generate encryption keys, manage decryption key fragments, and release the final decryption key once a **commitment condition** is satisfied. Keypers ensure that **no single party has unilateral control** over decryption.  

---

#### **Distributed Key Generation (DKG)**  
A cryptographic protocol that allows a group of Keypers to collaboratively **generate an encryption keypair** without any single participant knowing the full private key. This ensures that decryption is threshold-based, meaning multiple Keypers must cooperate before a decryption key is released.  

---

#### **Sealed-Bid Auction**  
A type of auction where **bids remain encrypted** until the auction period ends, ensuring that no participant—including the auctioneer—can see other bids before submission deadlines. This prevents **bid sniping, collusion, and unfair price discovery**.  

---

#### **Shielded Voting**  
A voting mechanism where **votes remain private** until the voting period ends. This prevents vote manipulation, undue influence, and strategic voting based on early results. Shutter API enables **cryptographic fairness** in decentralized governance by ensuring that all votes are revealed simultaneously.  

---

#### **MEV (Maximal Extractable Value)**  
The process of reordering, inserting, or censoring transactions in a blockchain’s mempool for profit. Malicious MEV tactics such as **front-running and sandwich attacks** allow privileged actors to exploit users. **Shutter API mitigates MEV risks** by keeping transaction details encrypted until execution.  

---

#### **Time-Locked Encryption**  
A method where encrypted data can only be decrypted **after a specified time or event**. This is useful for applications such as **sealed-bid auctions, governance voting, gaming, and MEV protection**, where information must remain private until a fair reveal moment.  

---

#### **Multiparty Computation (MPC)**  
A cryptographic method allowing multiple participants to collectively compute a function without revealing their private inputs. **Threshold encryption**, as used in Shutter, is a specialized form of MPC.  

---

#### **Shutter API**  
A developer-friendly API that provides **easy access** to Shutter's **threshold encryption network**, enabling commit-and-reveal workflows for dApps in **governance, gaming, finance, and auctions**. Unlike previous Shutter implementations that required protocol-level integration, **Shutter API is application-layer focused**, allowing any dApp to integrate encryption **permissionlessly**.  

---

#### **Shutter SDK**  
A TypeScript library that simplifies **local encryption and decryption** using Shutter's threshold encryption scheme. The SDK provides developers with an easy way to **encrypt commitments, retrieve decryption keys, and integrate privacy features into their dApps**.  

---

#### **Encrypted Mempool**  
A blockchain mempool where **pending transactions remain encrypted** until validators commit to their inclusion. This prevents MEV attacks like **front-running and sandwiching**, ensuring fair transaction execution. Shutter has implemented an **encrypted mempool on Gnosis Chain**, with future expansion plans for **Ethereum and Layer 2 rollups**.  

---

#### **The Free Option Problem**  
A situation where one party in an agreement **can change their decision after seeing new information**, creating an unfair advantage. For example, in an auction, a bidder could submit multiple bids, observe competitors' bids, and withdraw unfavorable ones. Shutter API prevents this by **sealing commitments until the reveal phase**, ensuring fair participation.  

---

#### **Parimutuel Betting**  
A betting model where wagers are pooled together, and the final odds are determined based on all bets. **Shutter API ensures fairness** by encrypting bets until the pool closes, preventing strategic last-minute wagers that manipulate the odds.  

---

#### **Smart Account Encryption**  
Smart accounts (e.g., those enabled by **ERC-4337 account abstraction**) lack built-in encryption, making it impossible for them to **access encrypted data**. Shutter enables smart accounts to securely **decrypt and access private data** when triggered by a **predefined event**—useful for secure file storage (e.g., **Fileverse**) or private smart contract interactions.  

---

#### **Simultaneous Move Games**  
Games that require players to **submit actions without seeing their opponents’ choices**. Shutter API enables **encrypted move submissions**, ensuring fairness in games like **poker, Rock Paper Scissors, and strategy-based multiplayer games**.  

---

#### **Trusted Execution Environment (TEE)**  
A hardware-based solution that provides a secure enclave for running private computations. Unlike TEEs, **Shutter's threshold encryption approach does not require trusting a centralized hardware manufacturer or relying on a single point of failure**.  

---

#### **Event-Based Encryption Triggers**  
The Shutter API enables encryption to be **triggered by predefined events**, such as **when all players submit their moves in a game**, instead of relying solely on time-based triggers. This approach ensures that decryption occurs only when all specified conditions are met.

Decryption is **released when a specific on-chain event is observed** by the Keypers. These events are compared against a registered **Event Trigger Definition (ETD)**, which details the emitter contract, the event signature, and includes optional indexed topic filters as well as conditions for non-indexed arguments. This functionality is useful for various applications, such as payment-gated content, enhancing DAO transparency after a proposal is executed, settling auctions once they are closed, or revealing game rounds upon completion.

---

#### **Programmable Privacy**  
A vision for Ethereum where **privacy settings can be configured at the user or application level**. **Shutter plays a key role in this landscape** by providing threshold encryption that enables **temporary privacy** for applications such as DeFi, governance, and gaming.  

---

#### **Fair Price Discovery**  
A mechanism ensuring that financial markets and auctions reflect true supply and demand without manipulation. By **encrypting bids and transactions**, Shutter API eliminates **price manipulation, order flow leaks, and bid front-running**, creating a **more trustworthy and open market**.  

---

#### **Sealed RFPs (Request for Proposals)**  
In corporate procurement, businesses request bids for services or products. Shutter API allows RFP responses to be **encrypted until the deadline**, preventing competitors or procurement managers from seeing bids early and **ensuring a fair selection process**.  

---

#### **Encrypted Private Messaging**  
While not a direct feature of the Shutter API, the **threshold encryption model** could be extended to enable **time-delayed, event-triggered, or role-based decryption** in private communication systems.  

---

This glossary will continue to expand as **Shutter Network and Shutter API evolve** to enable more use cases in **privacy-preserving, decentralized applications**.
