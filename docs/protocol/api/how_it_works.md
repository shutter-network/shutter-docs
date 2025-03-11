---
title: How It Works
description: How It Works
sidebar_label: "How It Works"
sidebar_position: 2
---

import Admonition from '@theme/Admonition';

# How Shutter API Works

## Introduction

The **Shutter API** provides a **threshold encryption service** that allows decentralized applications (dApps) to integrate **secure commit-and-reveal encryption workflows**. This system ensures that **sensitive data remains encrypted** until a **predefined time condition** is met, enhancing **fairness, privacy, and security** in various Web3 applications.

At a high level, Shutter API allows dApps to:

<Admonition type="note" title={null} icon={null}>
      <p>
      - **Securely commit private data (such as votes, game moves, or bids)** without revealing it prematurely.
      - **Use decentralized threshold encryption**, ensuring no single entity can decrypt data ahead of time.
      - **Retrieve decryption keys at a predefined moment**, enforcing a time-locked reveal.
      </p>
</Admonition>

## Shutter API Architecture

The Shutter protocol provides a robust and secure commit-and-reveal workflow by leveraging threshold encryption and a decentralized infrastructure. With the Shutter API, we have enhanced the architecture with a generalized Keyper implementation and introduced a comprehensive API layer to serve multiple endpoints, enabling seamless interaction with the system.

1.  **On-chain registry contract**

    - One of the core components of this Keyper implementation is the on-chain registry contract, where users can register identities linked to time-based decryption triggers.

2.  **Generalized Keyper implementation**

    - The distributed Keyper implementation has been updated to include new functionality that generalizes the use of Shutter and improves its efficiency and use cases. Keypers now monitor the registry for new registrations and handle time-based decryption key releases, even recovering missed keys during downtime. A flagging system ensures that decryption keys are released only once per trigger.

3.  **API for an easier integration**
    - To simplify access and usability, we have introduced a centralized API layer that supports multiple endpoints:

<Admonition type="note" title={null} icon={null}>
      <p>
      -   **Register Identity with Timestamp**: Allows clients to register identities and decryption triggers seamlessly.
      -   **Retrieve Encryption Data**: Enables retrieval of encryption data for specific identities.
      -   **Retrieve Decryption Keys**: Provides access to decryption keys once trigger conditions are met.
      -   **Decrypt Commitments**: Facilitates direct decryption of commitments using stored decryption keys.
      </p>
</Admonition>

This API bridges the Keyper network and end-users, offering a streamlined interface for developers while maintaining the decentralized principles of the system.

By integrating the updated Keyper implementation and the new API, the Shutter system delivers a scalable, user-friendly architecture. These advancements enhance the system's reliability and accessibility, laying the groundwork for future improvements like event-based triggers, peer-to-peer key delivery, and real-time WebSocket notifications. This ensures that Shutter continues to meet the evolving needs of decentralized applications.

:::tip[Quick Start]

https://github.com/shutter-network/shutter-api/blob/main/README.md
:::

:::info[Swagger Docs]

- [Chiado Swagger Documentation](https://shutter-api.chiado.staging.shutter.network/docs/index.html)
- [Mainnet Swagger Documentation](https://shutter-api.shutter.network/docs/index.html)
  :::

## Components

The Shutter API is built on a **decentralized cryptographic framework** leveraging **threshold encryption and distributed key management**.

The core components of the system are:

:::info[1. Registry Contract]
A smart contract deployed on-chain that **tracks encryption identities** and their **associated decryption timestamps**. Developers register identities through this contract, defining when encrypted data should become decryptable.
:::

:::info[2. Keypers]
A **distributed set of nodes** that:

- **Monitor the registry contract** for new encryption identities.
- **Perform threshold key generation**, ensuring no single Keyper holds the entire decryption key.
- **Release decryption keys** once the decryption condition is met.
  :::
  :::info[3. Shutter API]
  A **developer-facing service** that:
- Provides an **easy interface for dApps** to interact with the threshold encryption system.
- Allows developers to **register identities, retrieve encryption data, and obtain decryption keys**.
- Simplifies **interaction with the on-chain registry and Keyper network**.
  :::

:::info[4. Shutter SDK]
A client-side **TypeScript library** that enables:

- **Local encryption of data** before submission to the blockchain.
- **Local decryption** of commitments once the decryption key is available.
  :::

This architecture ensures that **encryption and decryption happen securely, automatically, and without reliance on a single trusted entity**.

---

## Encryption & Decryption Flow

The Shutter API follows a **three-step process**:

### 1. Setup: Register an Identity with a Decryption Timestamp

Before using Shutter’s encryption, a dApp must **register an identity and define when decryption should occur**. This step ensures that all encrypted data remains **unreadable until a predefined moment in the future**.

:::tip[How it works]

1. The developer sends a request to the Shutter API to **register an identity with a decryption timestamp**.
2. The API **submits this registration to the on-chain registry contract**.
3. The **Keypers monitor the registry** and begin the **threshold key generation process**.
4. Once successful, the registry **stores the identity and its associated decryption time**.

:::note  
The Shutter API can optionally **cover the gas fees** for this transaction.
:::

:::note[Example API Request]

```bash
curl -X POST https://API_BASE_URL/register_identity \
-H "Content-Type: application/json" \
-d '{
  "decryptionTimestamp": 1735044061,
  "identityPrefix": "0x79bc8f6b4fcb02c651d6a702b7ad965c7fca19e94a9646d21ae90c8b54c030a0"
}'
```

:::

### 2. Encrypt Data Before Submission

Once an identity is registered, developers can encrypt data locally before submitting it to the blockchain.

:::tip[How it works]

1. The developer requests encryption data from the Shutter API.

   - This includes the public encryption key (Eon Key) associated with the registered identity.

2. The developer encrypts data locally using the Shutter SDK.

   - This ensures that no unencrypted data is ever exposed before submission.

3. The encrypted commitment can now be submitted to the blockchain.

   - This could be a DAO vote, a sealed bid, a game move, or a confidential transaction.
     :::

:::note[Example API Request (Retrieve Encryption Data)]

```bash
curl -X GET "https://API_BASE_URL/get_data_for_encryption?identity=0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75"
```

:::

:::note[Example Encryption (Using Shutter SDK in TypeScript)]

```typescript
import { encryptData } from "@shutter-network/shutter-sdk";

const message = "My secret vote";
const eonKey = "0x57af54..."; // Retrieved from Shutter API
const identity = "0x8c232e..."; // Registered identity

const encryptedCommitment = await encryptData(message, eonKey, identity);
console.log("Encrypted Data:", encryptedCommitment);
```

:::

At this point, the dApp can safely store or submit the encrypted data, knowing that it remains secure until the predefined time has passed.

### 3. Decrypt Data After the Predefined Time

Once the predefined decryption timestamp has passed, dApps can retrieve the decryption key and reveal the previously encrypted data.

:::tip[How it works]

1. The dApp requests the decryption key from the Shutter API.
2. The Shutter API checks the on-chain registry to verify that the time condition is met.
3. If the time condition is satisfied, the Keypers collaboratively release the decryption key.
4. The developer uses the Shutter SDK to decrypt the previously encrypted data.
   Example API Request (Retrieve Decryption Key):

```bash
curl -X GET "https://<API_BASE_URL>/get_decryption_key?identity=0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75"
```

:::

:::note[Example Decryption (Using Shutter SDK in TypeScript)]

```typescript
import { decrypt } from "@shutter-network/shutter-sdk";

const encryptedData = "0x03a97..."; // Previously encrypted commitment
const decryptionKey = "0x99a80..."; // Retrieved from Shutter API

const decryptedMessage = await decrypt(encryptedData, decryptionKey);
console.log("Decrypted Message:", decryptedMessage);
```

:::

At this point, the previously encrypted information is fully revealed, completing the commit-and-reveal cycle.

## How Shutter API Enforces Fairness & Security

1. Data is encrypted locally before submission → No one can see it prematurely.
2. A predefined decryption timestamp is set → Enforced by a decentralized Keyper network.
3. Decryption only happens after the set time → Prevents front-running, unfair advantages, and information asymmetry.

This guarantees privacy, fairness, and security without requiring a centralized intermediary.

## Conclusion

The Shutter API provides a seamless, trust-minimized encryption service for Web3 developers. By leveraging threshold encryption and a decentralized Keyper set, it eliminates the need for single trusted parties while ensuring data remains private until the right time.

Developers can integrate Shutter API today to:

- Protect DAO governance with shielded voting
- Secure NFT and token auctions with sealed-bid commitments
- Prevent front-running in DeFi and Web3 trading
- Ensure fair play in blockchain-based gaming
- Enable time-locked messages, gifts, and transactions
- For further details, check out:

## Links

- [Shutter API Documentation](https://github.com/shutter-network/shutter-api)
- [Shutter SDK on GitHub](https://github.com/shutter-network/shutter-sdk)
- [Shutter Network Website](https://shutter.network/)
