---
title: Shutter API Overview
description: Shutter API Overview
sidebar_label: 'Overview'
sidebar_position: 1
---

import Admonition from '@theme/Admonition';

# Shutter API Overview

## Introduction

Shutter Network is launching Shutter API, a threshold encryption service that allows developers to integrate fairness, privacy, and security into their decentralized applications. By providing access to a decentralized encryption service powered by Keypers, Shutter API ensures that sensitive data remains private until it is meant to be revealed. Unlike private mempools or centralized encryption services, Shutter API minimizes trust assumptions while maintaining transparency and verifiability.

Blockchain technology was designed to eliminate trust, yet many Web3 applications still rely on hidden trust assumptions that benefit insiders at the expense of regular users. This can result in manipulation, front-running, and information asymmetry, affecting governance, gaming, auctions, and DeFi applications. By using Shutter API, developers can remove these vulnerabilities and create dApps that offer true cryptographic fairness, ensuring that no single entity has undue influence over the execution of transactions.

Shutter API represents an evolution from Shutter’s previous protocol-level integrations. While earlier implementations focused on encrypted mempools to prevent MEV attacks, they required protocol-level adoption. The API, in contrast, allows any developer to integrate threshold encryption directly into their applications, making it more accessible for a wide range of use cases.

The system works through a commit-and-reveal process, where a user encrypts data such as a bid, vote, or game move and submits it either on or off-chain. This encrypted commitment is registered in a registry managed by the Shutter API. At a predefined time or event, decryption keys are released by a threshold of independent Keypers, ensuring that no single party has control over when the information is revealed. This approach prevents front-running, manipulation, and premature information leaks, ensuring fairness in every interaction.

Developers can integrate Shutter API into various applications, such as decentralized finance platforms that want to protect traders from MEV attacks, DAOs looking to implement private and tamper-proof voting, and gaming applications that require secrecy in game mechanics. The API also enables new use cases, such as parimutuel betting, sealed RFPs for corporate procurement, and fair auction mechanisms that eliminate the Free Option Problem, ensuring that bids remain confidential until the deadline.

Unlike solutions based on Trusted Execution Environments (TEEs), which introduce a single point of failure and rely on specialized hardware, Shutter API provides a fully decentralized approach that does not require trusting any central entity. It operates as a distributed threshold encryption network, where independent Keypers collaboratively generate and release encryption keys, making it a truly trust-minimized solution.

Shutter API is already live and deployed on Gnosis Chain, with integrations powering applications built by Shutter Network and partners. It is set to be adopted by Snapshot, bringing encrypted voting to over 600 DAOs. Developers can start using Shutter API immediately by exploring the documentation, which provides guidance on registering identities, encrypting commitments, and retrieving decryption keys. By integrating Shutter API, developers can create applications that prioritize fairness, privacy, and trustlessness, unlocking new possibilities in Web3.

#### Why Cryptographic Time-Locked Commitments Matter

Cryptographic techniques such as **threshold encryption** and **distributed key generation (DKG)** unlock **new possibilities in blockchain applications**. By using **time-locked decryption**, Shutter API can enable:

<Admonition type="note" title={null} icon={null}>
      <p>
      - **Private voting** that remains concealed until a set deadline
      - **Sealed-bid auctions** where bids cannot be seen before closing
      - **Front-running protection** by encrypting transactions until they are finalized
      - **Fair games** where player moves are hidden until all actions are taken
      - **Private trading** that prevents information leaks before execution
      </p>
</Admonition>

Traditionally, implementing such cryptographic workflows **requires deep expertise in encryption and complex coordination mechanisms**. The **Shutter API abstracts this complexity** and makes integrating these security guarantees as simple as calling an API.

The Shutter API provides a **trust-minimized** way for developers to implement **privacy, fairness, and security** in decentralized applications. Whether for **governance, gaming, DeFi, or auctions**, it enables dApps to integrate **threshold encryption** without requiring deep cryptographic expertise.

## Disclaimer
This software is in its early stages of development. Users are strongly advised to exercise caution and not entrust any assets or sensitive information of high value to this API until further maturity and decentralization are achieved.

Please note that all threshold cryptography systems and multi-party computation (MPC) frameworks inherently rely on a threshold trust assumption. While the Shutter API currently utilizes a decentralized set of Keypers, the network is still small and not fully decentralized at this time. We expect additional Keypers to join and enhance the network's resilience soon.

This project is released as open source and provided "as is" without any warranties, express or implied. The developers and contributors assume no liability for any issues, losses, or damages arising from the use or misuse of this API. Use at your own risk.
