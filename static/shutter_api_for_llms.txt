
---
title: Integrating Shutter API and SDK for dApp Development
description: Integrating Shutter API and SDK for dApp Development
sidebar_label: "Integrating Shutter API and SDK for dApp Development"
sidebar_position: 2
---

# Integrating Shutter API and Shutter SDK for dApp Development

:::note

    This document is designed to be LLM friendly, work with current web standards, enabling fast and accurate responses for seamless communication with AI models.
:::

This guide is designed to teach you (or a generative AI) how to integrate the Shutter API and Shutter SDK into your decentralized application (dApp). The Shutter protocol provides a secure and decentralized commit-and-reveal mechanism that leverages threshold encryption, distributed cryptographic operations, and multi-party computation (MPC) techniques.

**Disclaimer**:

The Shutter API is in early development stage. Do not use it to manage high-value assets until the network is fully matured and decentralized. Use at your own risk.

* * * * *

## Overview of Shutter

The Shutter system facilitates secure commit-and-reveal workflows using:

-   **Threshold Encryption**: No single entity can compromise the encrypted data.
-   **Distributed Keypers**: Nodes that monitor on-chain events and handle decryption key releases.
-   **API Endpoints & SDK**: Simplified interfaces for dApp developers to integrate encryption and decryption functionalities.

The system consists of:

-   **Registry Contract**: Where identities and time-based decryption triggers are registered.
-   **Keypers**: Responsible for cryptographic operations and decentralized key management.
-   **Shutter API**: Provides endpoints for encryption and decryption operations.
-   **[Shutter SDK](https://github.com/shutter-network/shutter-sdk)**: A TypeScript library that abstracts encryption/decryption operations, easing integration in modern dApps.

* * * * *

## System Architecture

Key components include:

-   **Client dApp**: Your application that calls the Shutter API or uses the SDK.
-   **Registry Contract**: Deployed on-chain (e.g., Chiado or Gnosis) that holds identity and trigger information.
-   **Shutter API**: Endpoints for identity registration, encryption data retrieval, key retrieval, and decryption.
-   **Keypers**: Nodes that perform threshold cryptography.

*Event-based triggers note*: In addition to time-based triggers, Shutter also supports **event-based triggers**. Decryption is released when Keypers observe a matching on-chain event defined through an **Event Trigger Definition (ETD)**.

## Prerequisites and Setup

Before integrating Shutter into your dApp, ensure you have:

-   API Endpoint Access

    For example:
    -   Chiado (testnet)
        -   API Base URL: https://shutter-api.chiado.staging.shutter.network/api/
        -   Registry Contract Address: 0x2693a4Fb363AdD4356e6b80Ac5A27fF05FeA6D9F
        -   API Address: 0xb9C303443c9af84777e60D5C987AbF0c43844918

    -   Mainnet (Gnosis)
        -   API Base URL: https://shutter-api.shutter.network/api/
        -   Registry Contract Address: 0x694e5de9345d39C148DA90e6939A3fd2142267D9
        -   API Address: 0x228DefCF37Da29475F0EE2B9E4dfAeDc3b0746bc

-   Familiarity with RESTful APIs and Ethereum-based dApp development.
-   Installation of Node.js and npm (if you plan to use the TypeScript SDK).

* * * * *

## Integrating the Shutter API


The Shutter API exposes several endpoints to handle the full lifecycle of encryption and decryption in your dApp. The key endpoints are:

### Registering an Identity with a Decryption Trigger

This is your first step. Register your identity along with a time-based decryption trigger (a Unix timestamp). The API computes your identity based on your API account address unless you register directly with the registry contract.

```
Endpoint:  /register_identity
Method:  POST
```

#### Example Request

```bash
curl  -X  POST  https://`API_BASE_URL`/register_identity

-H  "Content-Type:  application/json"

-d  '{

  "decryptionTimestamp":  1735044061,

    "identityPrefix":  "0x79bc8f6b4fcb02c651d6a702b7ad965c7fca19e94a9646d21ae90c8b54c030a0"

}'
```

#### Example Response

```
{
  "eon":  1,

  "eon_key":  "0x57af5437a84ef50e5ed75772c18ae38b168bb07c50cadb65fc6136604e662255",

  "identity":  "0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75",

  "identity_prefix":  "0x79bc8f6b4fcb02c651d6a702b7ad965c7fca19e94a9646d21ae90c8b54c030a0",

  "tx_hash":  "0x3026ad202ca611551377eef069fb6ed894eae65329ce73c56f300129694f12ba"
}
```

Note: Replace `API_BASE_URL` with the appropriate API base URL (Chiado or Mainnet).

* * * * *

### Registering an Identity with an Event-Based Trigger (ETD)

To release decryption when a specific on-chain event occurs, use an **Event Trigger Definition**. In this definition, you specify the contract that emits the event, the event signature, and any optional indexed topic filters. You can also set conditions on non-indexed arguments if needed. Additionally, you will establish a Time-To-Live (TTL) to limit how long the Keypers will monitor the trigger.

```
Endpoint:  /register_event_trigger
Method:  POST
```

#### Example Request

```
curl -X POST https://`API_BASE_URL`/register_event_trigger\
-H "Content-Type: application/json"\
-d '{
  "identityPrefix": "0x79bc8f6b4fcb02c651d6a702b7ad965c7fca19e94a9646d21ae90c8b54c030a0",
  "etd": {
    "contract": "0x1234567890abcdef1234567890abcdef12345678",
    "eventSignature": "0x4bb278f3a1a2c3f4d5e6a7b8c9d0e1f2a3b4c5d6e7f8090a1b2c3d4e5f607182",
    "indexedTopics": [
      "0x000000000000000000000000228DefCF37Da29475F0EE2B9E4dfAeDc3b0746bc",
      null,
      null
    ],
    "conditions": [
      {"argIndex": 2, "op": ">=", "value": "1000000000000000000"}
    ],
    "ttl": 86400
  }
}'
```

#### Example Response

```
{
  "identity": "0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75",

  "eon": 1,

  "eon_key": "0x57af5437a84ef50e5ed75772c18ae38b168bb07c50cadb65fc6136604e662255",

  "epoch_id": "0x88f2495d1240f9c5523db589996a50a4984ee7a08a8a8f4b269e4345b383310a",

  "tx_hash": "0xabcdad202ca611551377eef069fb6ed894eae65329ce73c56f300129694f1abc"

}
```

* * * * *

### Checking Trigger Status

Query the current status of a time-based or event-based identity. Useful for polling your UI.

```
Endpoint:  /get_trigger_status
Method:  GET
```

#### Example Request

```bash
curl -X GET "https://`API_BASE_URL`/get_trigger_status?identity=0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75"
```

#### Example Response

```
{
  "identity": "0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75",

  "type": "event",

  "status": "Satisfied",

  "observedAt": 1735045061
}
```

* * * * *

### Retrieving Encryption Data

After registration, you need to obtain the encryption parameters that are required to encrypt your commitments.

```
Endpoint:  /get_data_for_encryption
Method:  GET
```

#### Example Request

```bash
curl  -X  GET  "https://`API_BASE_URL`/get_data_for_encryption?address=0xb9C303443c9af84777e60D5C987AbF0c43844918&identityPrefix=0x79bc8f6b4fcb02c651d6a702b7ad965c7fca19e94a9646d21ae90c8b54c030a0"
```

#### Example Response

```
{
  "eon":  1,

  "eon_key":  "0x57af5437a84ef50e5ed75772c18ae38b168bb07c50cadb65fc6136604e662255",

  "identity":  "0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75",

  "identity_prefix":  "0x79bc8f6b4fcb02c651d6a702b7ad965c7fca19e94a9646d21ae90c8b54c030a0",

  "epoch_id":  "0x88f2495d1240f9c5523db589996a50a4984ee7a08a8a8f4b269e4345b383310abd2dc1cd9c9c2b8718ed3f486d5242f5"
}
```

* * * * *

### Retrieving the Decryption Key

Once the specified decryption timestamp has passed, or an ETD matched event has been observed, you can retrieve the decryption key. This key is used later to decrypt the encrypted commitments.

```
Endpoint:  /get_decryption_key
Method:  GET
```

#### Example Request

```bash
curl  -X  GET  "https://`API_BASE_URL`/get_decryption_key?identity=0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75"
```

#### Example Response

```
{
  "decryption_key":  "0x99a805fc26812c13041126b25e91eccf3de464d1df7a95d1edca8831a9ec02dd",

  "decryption_timestamp":  1735044061,

  "identity":  "0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75"
}
```


* * * * *

### Decrypting Commitments

With the decryption key in hand, you can now decrypt any previously encrypted commitments.

```
Endpoint:  /decrypt_commitment
Method:  GET
```

#### Example Request

```bash
curl  -X  GET  "https://`API_BASE_URL`/decrypt_commitment?identity=0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75&encryptedCommitment=0x03b5685a460a95ba628e04b24155d6722f7c4e376a1627f714a4ae9cecd2982e005eff12ac8150b8842c29f8d5eaf4d0da0b626f762b4826d779d8969b577acb28df96cab026aa57c00cd74b07ca51e8c0c1a59933e29a728311900ebfc26c6804260914c96cb10dbd6d2ed3f6cb77788a74b5aae5f4ce6f40be53310a0524d42d5a6f03b5c1517ec097553733e228276fcdfc4b569f7ef4311a461d68819d634c"
```

#### Example Response

```
{
  "decrypted_message":  "0x706c6561736520686964652074686973206d657373616765"
}
```

Tip: The decrypted message is returned in hexadecimal format. Convert it to a string (e.g., using web3.js or ethers.js) to reveal the original message.

* * * * *

## Integrating the Shutter SDK

The Shutter SDK is a TypeScript library that simplifies the encryption and decryption process. It wraps the lower-level operations of the Shutter protocol into high-level functions that you can easily integrate into your dApp.

### Installation

To install the Shutter SDK in your project, run:

`npm  install  @shutter-network/shutter-sdk`

* * * * *

### Encrypting Data (TypeScript)

Below is a sample code snippet that demonstrates how to use the SDK to encrypt data:

```typescript
import  {  encryptData  }  from  "@shutter-network/shutter-sdk";
import  {  stringToHex  }  from  "viem";

//  Define  the  encryption  data  from  the  API
const  eonKeyHex  =  "0x57af5437a84ef50e5ed75772c18ae38b168bb07c50cadb65fc6136604e662255";
const  identityPreimageHex  =  "0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75";
const  message  =  "please  hide  this  message";
const  sigmaHex  =  "0x312c10b186086d502ba683cffc2ae650d53b508904b3c430df8e7d5aa336c0f5";

//  Encrypt  the  message
const  encryptedCommitment  =  await  encryptData(message,  eonKeyHex,  identityPreimageHex,  sigmaHex);
console.log("Encrypted  Commitment:",  encryptedCommitment);
```

:::note [Note]
If you are using an event-based trigger, the encryption step is identical. What changes is how and when you request the decryption key because availability is tied to the ETD that you registered.
:::

* * * * *

### Decrypting Data (TypeScript)

To decrypt an encrypted commitment, use the decrypt function provided by the SDK:

```typescript
import  {  decrypt  }  from  "@shutter-network/shutter-sdk";

const  encryptedData  =  "0x03a975256b0098bc981da31762a73e50a07c79f5bf3e17c44121b9567033cedaf9e203f0300b709dec3458a88baa18963c0e503f437bff7adb31231941585ea1bb14e8ce98c7dc1471666e4b07c592cbeda30acc22f23dcb84d58d41848e72af0804d348d5c5cb65a52dc3b697ea4caae9679b97e395a30807f9657ebc85bbf2fcadaa9a458a86bffb78dde89f7626a26eb84f4781d3b6759c06629ea321a8b757";
const  decryptionKey  =  "0x81cfcfceebfc69b3cb3fe074f4b3751e7844f6d62b3040563ccb3a2430110f259d109519c73682735f4c02651492c740";

//  Decrypt  the  data
const  decryptedData  =  await  decrypt(encryptedData,  decryptionKey);
console.log("Decrypted  Message:",  decryptedData);
```

:::note [Note]
For event-based triggers, first poll or subscribe to trigger status, then request the decryption key and run the same decrypt flow.
:::

* * * * *

### Example in Go

For dApps or backend services written in Go, you can use the provided example to encrypt commitments. This sample leverages the shcrypto package from Shutter's repository.

```go
package  main

import  (

  "crypto/rand"

  "encoding/hex"

  "fmt"

  "log"

  "strings"


  "github.com/shutter-network/shutter/shlib/shcrypto"

)

func  main()  {
  //  Encryption  data  from  the  Shutter  API
  identityHex  :=  "0x8c232eae4f957259e9d6b68301d529e9851b8642874c8f59d2bd0fb84a570c75"
  eonPublicKeyHex  :=  "0x57af5437a84ef50e5ed75772c18ae38b168bb07c50cadb65fc6136604e662255"
  message  :=  []byte("please  hide  this  message")

  identityHex  =  strings.TrimPrefix(identityHex,  "0x")
  eonPublicKeyHex  =  strings.TrimPrefix(eonPublicKeyHex,  "0x")

  //  Convert  hex  strings  to  bytes
  identity,  err  :=  hex.DecodeString(identityHex)
  if  err  !=  nil  {
    log.Fatalf("Failed  to  decode  identity:  %v",  err)
  }

  eonPublicKeyBytes,  err  :=  hex.DecodeString(eonPublicKeyHex)
  if  err  !=  nil  {
    log.Fatalf("Failed  to  decode  eon  public  key:  %v",  err)
  }

  //  Unmarshal  the  public  key
  eonPublicKey  :=  &shcrypto.EonPublicKey{}
  if  err  :=  eonPublicKey.Unmarshal(eonPublicKeyBytes);  err  !=  nil  {
    log.Fatalf("Failed  to  unmarshal  EonPublicKey:  %v",  err)
  }

  //  Compute  the  Epoch  ID  from  the  identity
  epochID  :=  shcrypto.ComputeEpochID(identity)

  //  Generate  a  random  sigma  value
  sigma,  err  :=  shcrypto.RandomSigma(rand.Reader)
  if  err  !=  nil  {
    log.Fatalf("Failed  to  generate  random  sigma:  %v",  err)
  }

  //  Encrypt  the  message
  encryptedCommitment  :=  shcrypto.Encrypt(message,  eonPublicKey,  epochID,  sigma)

  //  Marshal  the  encrypted  commitment  and  encode  to  hex
  encryptedCommitmentBytes  :=  encryptedCommitment.Marshal()
  encryptedCommitmentHex  :=  "0x"  +  hex.EncodeToString(encryptedCommitmentBytes)

  fmt.Printf("Encrypted  Commitment:  %s\n",  encryptedCommitmentHex)
}
```

* * * * *

Building a New dApp with Shutter API
------------------------------------

When building a new dApp with the Shutter API, follow these steps:

1.  **Set Up Your Environment**

    Ensure you have access to the appropriate API endpoints (Chiado or Mainnet) and that your project includes a web3 provider for interacting with the registry contract.

2.  **Register an Identity**

    Use the /register_identity endpoint to register a new identity and set a decryption trigger.

    Tip: If you want full control over your address, consider registering directly with the registry contract.

    *Event-based option*: You can also register an identity with an ETD using **/register_event_trigger** so that decryption keys are released when a matching on-chain event is observed.

3.  **Retrieve Encryption Data**

    Once your identity is registered, call /get_data_for_encryption to obtain the parameters needed to encrypt commitments.

4.  **Encrypt Commitments**

    Use either the provided SDK (TypeScript) or native implementations (Go, etc.) to encrypt your sensitive messages or commitments before storing or transmitting them.

5.  **Store and Manage Encrypted Data**

    Persist the encrypted commitments within your dApp (for example, on-chain, in IPFS, or a centralized database) until the decryption trigger is activated.

6.  **Retrieve and Decrypt Data**

    After the trigger time passes, or after the ETD condition is observed, use the /get_decryption_key endpoint to fetch the decryption key, and then call /decrypt_commitment or use the SDK's decrypt function to reveal the original message.

7.  **User Interaction and UI**

    Integrate WebSocket or polling mechanisms to notify your users when decryption keys become available. Future releases of Shutter will enhance real-time notifications.

* * * * *

## Future Features and Considerations

-   **Event-Based Triggers**

    Event-based decryption via ETD is supported. Best practice is to constrain ETDs using indexed topic filters and conditions, and to set a reasonable TTL.

-   **Real-Time Notifications**

    Planned WebSocket integrations will enable real-time notifications for key releases.

-   **Enhanced Decentralization**

    As more Keypers join the network, the decentralization and resilience of the system will continue to improve.

* * * * *

## FAQs

### What if a Keyper goes offline?

The system is designed to handle downtime gracefully. Any missed decryption key releases will be processed when the network recovers.

### How secure is the Shutter system?

Using threshold encryption and distributed key management, Shutter ensures that no single party can compromise the encrypted data. However, as the network evolves, always monitor updates and recommendations.

### Can I use my own address for identity registration?

Yes. By default, the API uses the account address to compute the identity. If you prefer to use your own address, register directly with the registry contract.

### How do event-based triggers differ from time-based triggers?

Time-based triggers release decryption keys after a future timestamp. Event-based triggers release keys when Keypers observe an on-chain event that matches your ETD. Both flows use the same encryption and decryption steps. What changes is how availability of the decryption key is determined.

* * * * *

## Additional Resources

-   Swagger Documentation
    -   [Chiado Swagger Docs](https://shutter-api.chiado.staging.shutter.network/docs/index.html)
    -   [Mainnet Swagger Docs](https://shutter-api.shutter.network/docs/index.html)
-   Shutter SDK Repository
    -   [GitHub - Shutter SDK](https://github.com/shutter-network/shutter-sdk)
-   Registry Contract Code
    -   [ShutterRegistry.sol on GitHub](https://github.com/shutter-network/contracts/blob/main/src/shutter-service/ShutterRegistry.sol#L1C1-L86C2)
-   Shutter API Examples
    - [Shutter Hello World Tutorial](https://github.com/shutter-network/shutter-api-examples/blob/6dad08cf26878abeee7b8866b545f8ebb0eea17b/hello-world/README.md)
    - [Shutter Rock Paper Scissors Tutorial](https://github.com/shutter-network/shutter-api-examples/blob/6dad08cf26878abeee7b8866b545f8ebb0eea17b/rock-paper-scissors/README.md)
