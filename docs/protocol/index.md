---
title: Shutter Protocol
description: Shutter Protocol
sidebar_label: 'Shutter Protocol'
sidebar_position: 1
---

# A Distributed Solution to a Shared Problem
Shutter is an open-source encryption protocol that has been in development since 2021. The Shutter protocol is designed to enhance fairness and security in decentralized ecosystems through threshold encryption and Distributed Key Generation (DKG).

## Shutter Protocol - A Distributed Commit-Reveal Scheme

### Threshold Encryption

Threshold encryption is a cryptographic method that enhances security by requiring a group of parties to collaborate in order to decrypt information. Unlike traditional encryption, which can be decrypted using a single key, threshold encryption divides the decryption key among multiple participants. The data can only be decrypted when a specific number of these participants, known as Keypers in the case of Shutter, work together. This approach ensures that no single entity can unilaterally access or manipulate the encrypted information, making it particularly valuable in decentralized systems where trust is distributed.

This feature makes it a valuable tool for establishing a more equitable and fair environment in blockchain applications, distinguishing it from systems that depend on centralized control and trust.
### Keypers - A Distributed Key Generation Mechanism

Distributed Key Generation (DKG) is a cryptographic process that allows a group of participants to collectively generate a cryptographic key in a way that no single participant knows the complete key. Instead, each participant holds a share of the key, and the key can only be reconstructed when a threshold number of participants combine their shares. This decentralized approach ensures that no individual has full control over the key, enhancing security and trust in systems where centralization is a risk.

In the Shutter protocol, DKG plays a crucial role in enabling its threshold encryption mechanism. The Keypers—trusted nodes in the Shutter network—use the DKG process to collaboratively generate the decryption keys needed to unlock encrypted transactions and votes. This contrasts with centralized solutions that can introduce vulnerabilities and trust issues, making Shutter's use of DKG a superior approach for ensuring decentralized, secure, and fair interactions in blockchain environments.
