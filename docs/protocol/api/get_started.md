---
title: Get Started with Shutter API
description: Get Started with Shutter API
sidebar_label: 'Get Started'
sidebar_position: 4
---

# Quick Start Guide to Shutter API  

## Introduction  

The **Shutter API** enables dApp developers to integrate **threshold encryption** into their applications, allowing for **commit-reveal mechanisms, privacy-preserving transactions, and fair interactions** in governance, gaming, auctions, and more.  

This guide provides a **technical overview and step-by-step instructions** to help you quickly integrate the Shutter API into your decentralized application.  

For in-depth API specifications and reference material, explore the following resources:  

- **Shutter API Documentation for dApp Developers**: [GitHub Repository](https://github.com/shutter-network/shutter-api)  
- **Chiado Swagger API Reference** (Testnet): [Chiado API Docs](https://shutter-api.chiado.staging.shutter.network/docs/index.html)  
- **Mainnet Swagger API Reference**: [Mainnet API Docs](https://shutter-api.shutter.network/docs/index.html)  

---

## Prerequisites  

Before using the Shutter API, ensure that you have:  

- Access to an **Ethereum-compatible network** (e.g., Gnosis Chain, Chiado Testnet).  
- A basic understanding of **smart contracts and API requests**.  
- Installed the **Shutter SDK** (optional but recommended for local encryption).  

To install the Shutter SDK, run:  

```bash
npm install @shutter-network/shutter-sdk
```

## How Shutter API Works

Shutter API provides **a simple workflow** for encrypting commitments, ensuring fairness and security in decentralized applications. The process consists of three main steps:

### 1\. **Setup: Register an Identity and Decryption Time**

The first step is to register an **identity** on-chain and specify a **decryption timestamp**. This ensures that encrypted data remains locked until the designated time.

#### API Call: Register Identity

```bash
curl -X POST https://shutter-api.shutter.network/register_identity\
-H "Content-Type: application/json"\
-d '{
  "decryptionTimestamp": 1735044061,
  "identityPrefix": "0x79bc8f6b4fcb02c651d6a702b7ad965c7fca19e94a9646d21ae90c8b54c030a0"
}'
```

This request registers an identity and sets a future timestamp when the decryption key will be released.

#### API Response

```json
{
  "eon": 1,
  "eon_key": "0x57af5437a84ef50e5ed75772c18ae38b168bb07c50cadb65fc6136604e662255",
  "identity": "0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75",
  "tx_hash": "0x3026ad202ca611551377eef069fb6ed894eae65329ce73c56f300129694f12ba"
}
```

* * * * *

### 2\. **Encrypt and Submit the Commitment**

Once the identity is registered, you need to **encrypt the commitment locally** before submitting it.

#### Step 1: Retrieve Encryption Data

```bash
curl -X GET "https://shutter-api.shutter.network/get_data_for_encryption?identityPrefix=0x79bc8f6b4fcb02c651d6a702b7ad965c7fca19e94a9646d21ae90c8b54c030a0"
```

This API call retrieves the necessary encryption parameters.

#### Step 2: Encrypt Data Locally (Using Shutter SDK)

```typescript
import { encryptData } from "@shutter-network/shutter-sdk";

const message = "0x1c";  // Your commitment
const eonPublicKey = "0x8b36251faf28be849a2ca9212ae7ceeb6b6848d58a3d5d77e1629c9d7ebdee3dad594c6af6b66e7a6e4b27e54778b8fd1491868c2938c93285be79168c0210d632a2a553f6b03940dd08312d32ea718e0f8c4488f39e6f34e27add4506631ddb";
const identityPreimage = "0x8c4e6301fba207fb2375d2fda9f2ebe1142d07d1954d871e2d71b3d93534380793b99fb184f7526012a49ac1a22300fac22dc1d7";
const sigma = "0x312c10b186086d502ba683cffc2ae650d53b508904b3c430df8e7d5aa336c0f5";

const encryptedData = await encryptData(message, eonPublicKey, identityPreimage, sigma);
console.log("Encryption successful:", encryptedData);
```

* * * * *

### 3\. **Decrypt and Reveal the Commitment**

After the **decryption timestamp has passed**, the decryption key becomes available and can be used to decrypt the original data.

#### Step 1: Retrieve Decryption Key

```bash
curl -X GET "https://shutter-api.shutter.network/get_decryption_key?identity=0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75"
```

#### Step 2: Decrypt Data Locally

```typescript
import { decrypt } from "@shutter-network/shutter-sdk";

const encryptedData = "0x03a975256b0098bc981da31762a73e50a07c79f5bf3e17c44121b9567033cedaf9e203f0300b709dec3458a88baa18963c0e503f437bff7adb31231941585ea1bb14e8ce98c7dc1471666e4b07c592cbeda30acc22f23dcb84d58d41848e72af0804d348d5c5cb65a52dc3b697ea4caae9679b97e395a30807f9657ebc85bbf2fcadaa9a458a86bffb78dde89f7626a26eb84f4781d3b6759c06629ea321a8b757";
const epochSecretKey = "0x81cfcfceebfc69b3cb3fe074f4b3751e7844f6d62b3040563ccb3a2430110f259d109519c73682735f4c02651492c740";

const decryptedData = await decrypt(encryptedData, epochSecretKey);
console.log("Decryption successful:", decryptedData);
```

* * * * *

Next Steps
----------

Now that you have successfully encrypted and decrypted data using the **Shutter API**, you can integrate it into your dApp for **use cases such as:**

-   **Shielded Voting:** Encrypt votes until the voting period ends.
-   **Sealed-Bid Auctions:** Prevent bidders from seeing each other's offers.
-   **Fair On-Chain Gaming:** Ensure secret moves remain private until revealed.
-   **MEV Protection in DeFi:** Keep transactions private to prevent front-running.

Explore the full documentation and API references to customize and scale your integration:

-   [Shutter API GitHub Repository](https://github.com/shutter-network/shutter-api)
-   [Chiado Swagger API Docs (Testnet)](https://shutter-api.chiado.staging.shutter.network/docs/index.html)
-   [Mainnet Swagger API Docs](https://shutter-api.shutter.network/docs/index.html)

For questions, support, or discussions, visit the **Shutter community** on Discord or [Twitter](https://twitter.com/ShutterNetwork).

Start building today and bring **fairness, privacy, and security** to your Web3 application with Shutter API!
