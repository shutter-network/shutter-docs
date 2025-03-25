---
title: Shutter API Use Cases
description: Shutter API Use Cases
sidebar_label: 'Use Cases'
sidebar_position: 3
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import Admonition from '@theme/Admonition';

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

## Use Cases


> ### MEV

#### Shielded Trading
##### Preventing MEV and Ensuring Fair Markets

In decentralized finance (DeFi), traders use public blockchains to execute transactions. However, the transparency of blockchain mempools can lead to opportunities for Maximal Extractable Value (MEV) attacks. In these attacks, bots and privileged actors manipulate the order of transactions for their own profit. This manipulation can result in front-running and sandwich attacks, creating unfair market conditions where regular users either pay more for their trades or experience financial losses.

Shielded Trading, powered by the Shutter API, introduces commit-reveal encryption to the trading process, ensuring that trade details remain completely hidden until execution. This protects against malicious actors who might exploit pending transactions, creating a fairer environment for all participants.

You can think of Shielded Trading as placing an order inside a locked box at an auction house. The box remains closed until the bidding period ends, which means no one can see, copy, or manipulate your offer before it is executed.

##### Transaction Flow Overview

Shielded Trading encrypts transaction details upon submission, rendering them unreadable to sequencers, validators, and MEV bots until the trade is finalized.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Encryption Before Submission
      - A user locally encrypts their trade order, such as swapping ETH for USDC, using the Shutter API.
      - The encrypted transaction is submitted to the mempool or a private order book for processing.
      - At this stage, no external party is able to inspect or rearrange the transaction for their own profit.

      ###### Commitment on-Chain
      - The encrypted order is recorded on the blockchain, providing transparency while keeping sensitive trade details confidential.
      - Market participants can view that trade is pending; however, they are unable to discern the details of its contents.

      ###### Revealing at Execution
      - Once the specified conditions are fulfilled (e.g., block inclusion, order matching), the decryption key is released by a distributed network of Keypers.
      - The transaction is decrypted and executed simultaneously for all traders, which helps prevent MEV manipulation.
      - This process reduces information asymmetry, making DeFi markets fairer, more secure, and less susceptible to manipulation.
      </p>
</Admonition>

___

Shielded Trading can be implemented in two main ways—fully on-chain or off-chain—depending on the structure of the trading platform.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### 1. Fully On-Chain (Two-Transaction Model)
      This approach mirrors the structure of earlier Shutter integrations, where the user first encrypts their trade intent (e.g., a limit order) and submits it on-chain. Later, once the decryption condition is met (e.g., end of a batch or time window), a second transaction is sent to execute the decrypted trade.
      This provides transparency and verifiability but may require higher gas costs due to the two-step process.
      </p>
</Admonition>

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### 2. Off-Chain Commit-Reveal (Snapshot-Style Model)
In this model, encrypted orders are submitted off-chain, such as into a private order book. When the trading round or matching session concludes, Shutter’s Keyper network decrypts the orders, which are then collectively processed on-chain.
This model reduces gas overhead and allows for more complex batching or auction logic, similar to how Snapshot implements Shielded Voting.
      </p>
</Admonition>

Both approaches rely on the same core principle: encrypted commitments are only revealed and executed after a predefined condition is satisfied, preventing MEV and ensuring fairness.

##### Real-World Applications of Shielded Trading
- **Decentralized Exchanges (DEXs) & Automated Market Makers (AMMs)**
  - This ensures that liquidity providers and traders are protected from sandwich attacks.
  - Safeguards market makers from the exploitation of their order flow.
- **Private OTC Trading & Large Order Execution**
  - High-net-worth individuals and institutional investors can execute large trades without being affected by front-running or sandwich attacks.
  - Ensures that the details of block trade settlements remain confidential until they are finalized.
- **Options & Derivatives Trading**
  - Keeps strike prices and limit orders confidential to prevent any manipulation before it occurs.
- **Auctions (Token, NFT, or Treasury Sales)**
  - Prevents manipulation by keeping all bids hidden until the auction ends. Ensures fair price discovery without sniping or preemptive trades.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### The Poker Table
      Imagine you're participating in a high-stakes poker game where every player's move is recorded and displayed face-up on the table before the next hand begins. This means that other players can see your intended action before making their own move, which gives them an unfair advantage.

      Shielded Trading addresses this problem by sealing each player's move in an envelope, revealing them only after the betting round concludes. This ensures that no one can alter their strategy based on inside information, making sure that all trades occur fairly and simultaneously.

      With the Shutter API, DeFi trades resemble hidden poker moves—kept secret until it's time to act—making the game equitable for all participants.
      </p>
</Admonition>

#### Shielded DeFi
##### Confidential Lending and Liquidations with Shutter API

In the current landscape of decentralized finance (DeFi), lending protocols and liquidation mechanisms are often vulnerable to information leakage and timing-based exploitation. When collateral positions, interest rate shifts, or liquidation thresholds are transparently exposed on-chain, sophisticated actors—particularly MEV bots—can monitor this data and extract profit by preempting or manipulating liquidation events.

:::warning[This leads to]
- Premature or unnecessary liquidations triggered by bots racing to liquidate positions.
- Front-running of liquidation opportunities by privileged actors.
- Adverse user experience for borrowers, especially during volatile markets, as their positions are publicly telegraphed before execution.
:::

Shielded DeFi, enabled by the Shutter API, introduces threshold encryption into lending and liquidation flows, ensuring that sensitive position data and liquidation transactions remain fully confidential until a predefined execution condition is met. This approach protects borrowers from being prematurely liquidated and prevents extractive behaviors based on leaked data.

##### Transaction Flow Overview
Shielded DeFi integrates a commit-reveal workflow into lending protocols. It enables confidential submission of liquidations, collateral management actions, and liquidation triggers, which are only revealed and executed once validated by on-chain logic and decrypted by the Keyper network.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Encrypted Liquidation or Adjustment Request)
      - A liquidator or borrower encrypts their intended action—such as repaying a debt, supplying more collateral, or triggering liquidation—using the Shutter SDK.
      - This encrypted action is submitted to the protocol, recorded either in a transaction queue or smart contract.
      - The encrypted payload includes the target position and the intended action, but remains unreadable to third parties, including validators and MEV bots.
      ###### Waiting Period (Monitoring and Validation)
      - The encrypted commitment is monitored for fulfillment of execution criteria (e.g., a price crossing a liquidation threshold).
      - No external actor can determine which positions are about to be liquidated, or preemptively insert a transaction ahead of the encrypted request.
      ###### Reveal Phase (Decryption and Execution)
      - Once the predefined condition is met—such as a price drop or a time-based trigger—the Shutter Keyper network releases the decryption key.
      - The encrypted liquidation or adjustment request is decrypted and executed, all in the same atomic operation.
      </p>
</Admonition>

This guarantees equal access to opportunities and protects against exploitative frontrunning.

##### Real-World Applications of Shielded DeFi
- **Lending Protocols**
  - Borrowers can top up collateral or repay loans without publicly revealing distressed positions.
  - Liquidators can submit liquidation requests without alerting others, reducing liquidation races.
- **Liquidation Bots & Risk Management Systems**
  - DeFi protocols can deploy in-house liquidation agents that operate under encrypted rules, ensuring fair and verifiable execution without leaking strategic logic.
- **Flash Loan & Leverage Strategies**
  - Complex leverage unwinds or multi-step repayment sequences can be encrypted, ensuring that bots can't reverse-engineer or front-run the strategy.
- **Automated Risk Adjustments & Vault Rebalancing**
  - Automated bots managing user vaults or protocol treasuries can restructure positions confidentially, avoiding information asymmetry that could move markets.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### The Hidden Margin Call
      Imagine you're a trader using a lending platform. Due to market volatility, your collateral position is close to liquidation. In today’s DeFi, everyone can see your position slipping, including opportunistic bots waiting to profit from your forced sale.

      Now imagine a better system:

      You encrypt your intention to repay the loan or top up your collateral.
      This encrypted commitment sits safely on-chain, invisible to others, and only triggers when your position truly needs attention.
      If the threshold is hit, the repayment or liquidation occurs instantly and fairly, without any bot jumping ahead or tipping off others.

      This is Shielded DeFi in action—decentralized lending, made confidential, tamper-resistant, and equitable.
      </p>
</Admonition>

#### MEV-Protected Launchpads & NFT Minting
##### Preventing Unfair Token & NFT Sales
Token sale launchpads (IDOs, ICOs, and public auctions) and NFT minting events often face MEV (Maximal Extractable Value) attacks, where bots and privileged actors manipulate the transaction order for unfair advantages.

:::warning[Common issues include]
- **Sniping**: Bots monitor transactions in the mempool and act quickly to mint rare NFTs or purchase tokens before actual users.
- **Sandwich Attacks**: MEV bots manipulate token sale prices by executing strategic transactions around a buyer's trade.
- **Gas Wars**: Whales tend to pay higher gas fees in order to gain an advantage over other buyers, which can exclude smaller participants from the market.
- **Failed Transactions & Wasted Fees**: Users frequently spam transactions during high-demand sales, often wasting gas fees without successfully purchasing assets.
:::

:::tip[With Shutter API's encryption:]
- All purchase/minting transactions remain private until execution.
- No one can see or reorder transactions before finalization.
- Users have an equal chance to participate in public token and NFT sales.
:::

Consider this system as a fair queue for purchasing concert tickets. Everyone submits their requests in a locked box, and all boxes are opened simultaneously to determine who will receive a ticket. The selection is made not based on speed but through a fair random process.

##### Transaction Flow Overview
MEV-protected launchpads and NFT minting can utilize the Shutter API's commit-reveal encryption scheme, ensuring that buy and mint transactions remain hidden from mempool analysis until they are executed.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Transaction Submission)
      - Users encrypt their minting or token purchase transactions before submitting them.
      - The encrypted transactions are broadcast to the network but cannot be read or prioritized by validators, sequencers, or other participants.
      ###### Waiting Period (Transaction Pooling)
      - Transactions are collected in the mempool or launchpad contract.
      - No trader, bot, or validator can see the purchase details, gas fees, or order size.
      ###### Reveal Phase (Execution & Fair Allocation)
      - When the minting or token sale period ends, the decryption key is released by Shutter's distributed Keyper network.
      - Transactions are decrypted and executed simultaneously, ensuring fair allocation without MEV exploits.
      </p>
</Admonition>

This approach eliminates the advantage of fast bots and gas wars, making Web3 public sales more equitable for all participants.

##### Real-World Applications of MEV-Protected Launchpads & NFT Minting
- **NFT Minting Events (Fair Distribution of Digital Assets)**
  - Prevents bots from minting entire collections before real users can participate.
  - Ensures rare NFTs are fairly allocated instead of being monopolized by insiders.
- **Token Sales (Initial DEX Offerings, ICOs, and Public Auctions)**
  - Eliminates gas wars and front-running in decentralized launchpads.
  - Prevents snipers from preemptively buying large allocations, ensuring fair access for retail investors.
- **Fair Lottery-Based NFT & Token Distribution**
  - Allows launchpads to randomly allocate spots to participants without revealing bids.
  - Ensures that NFT collections aren't unfairly hoarded by a few wallets.
- **Limited Edition Digital Collectibles & Gaming Items**
  - Protects in-game NFT sales from bot-driven mass purchases.
  - Ensures fairness in exclusive digital item sales.
- **Private Sales & Allowlisted Token Distributions**
  - Prevents insiders from gaming the system by knowing allocation results early.
  - Guarantees that allow listed buyers to be chosen fairly.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### The Fair Ticket Queue System
      Imagine a ticketing system for a highly anticipated concert. Normally, when ticket sales go live:

      - Scalpers use automated bots to buy tickets instantly.
      - Some people pay extra fees to cut the line and get better seats.
      - Fans who join later are left with no tickets or must buy at inflated resale prices.

      Now, imagine instead:
      - Everyone submits their ticket request in a sealed envelope before the sales window closes.
      - Once all requests are received, the envelopes are opened at the same time, and tickets are randomly distributed based on availability.
      - No one can see, manipulate, or prioritize transactions before the reveal phase.

      This is how Shutter API secures token and NFT sales, ensuring that no one has an unfair advantage before the sale is completed.
      </p>
</Admonition>

> ### Voting

#### Shielded Voting
Ensuring Privacy & Fairness in Decentralized Governance
In decentralized governance, transparent voting can create opportunities for unfair influence, coercion, and vote manipulation. When votes are visible before the voting period concludes, early results can impact later voters, enabling strategic voting, pressure tactics, and vote buying.

Shielded Voting addresses these issues by encrypting votes until the voting period ends. With the Shutter API, all votes remain private and tamper-proof until the final reveal phase. This process ensures a fair, unbiased, and influence-free decision-making experience.

You can think of Shielded Voting as similar to a sealed ballot box in a traditional election. Voters can submit their votes, but no one—including election officials—can see them until the voting period concludes and the box is opened publicly. This guarantees that every participant can cast their vote without external pressure or knowledge of how others voted.

##### Transaction Flow Overview
Shielded Voting utilizes a commit-reveal encryption scheme, which ensures that votes remain private during the voting period and are automatically decrypted only after the deadline.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase: Encrypting & Submitting Votes
      - A voter encrypts their vote using the Shutter API before submitting it to an on-chain governance contract, such as Snapshot, Kleros, Aragon, or Decent.
      - The encrypted vote is recorded but remains unreadable to governance participants, validators, and sequencers.
      - At this stage, the vote exists but cannot be analyzed or manipulated.

      ###### Waiting Period: Hidden Votes During the Election
      - Votes are kept encrypted until the voting period ends.
      - Participants can see votes being cast and added to the quorum, but they cannot determine individual choices or predict outcomes in advance.

      ###### Reveal Phase: Decrypting & Counting Votes
      - After the voting period ends, the decryption key is released automatically by Shutter's distributed Keyper network.
      - All votes are decrypted at the same time and counted transparently.
      - The election result is revealed in a verifiable and trust-minimized way.
      </p>
</Admonition>

By following this encryption process, Shielded Voting prevents vote manipulation, safeguards voter privacy, and guarantees an unbiased governance system.

##### Real-World Applications of Shielded Voting
- **DAO Governance & Treasury Decisions**
  - This measure prevents large token holders from swaying the decisions of smaller voters based on initial results.
  - Ensures that treasury proposals are decided fairly, without any last-minute changes in voting strategy.
- **Protocol Governance (Ethereum, DeFi, L2s)**
  - This safeguards Layer 1 and Layer 2 protocol upgrades from manipulation before the results are revealed.
  - Ensures fair voting on staking, policies related to MEV, and decisions regarding governance forks.
- **Political & Community Elections**
  - Enables on-chain political voting with privacy-preserving guarantees.
  - This can be used for city-level referendums, student body elections, or for selecting corporate boards.
- **Private Voting in Investment DAOs & Syndicates**
  - This prevents investors in venture DAOs from changing their allocations based on early votes.
  - Ensures that deal flow proposals stay confidential until they are finalized.

##### Example

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### The Secret Ballot in Elections
      Imagine a public town hall meeting where citizens are asked to vote on a new policy by raising their hands. Once some hands go up, others may feel pressured to follow the majority, even if they initially had a different opinion. Some individuals might wait until the last minute to see how the vote is trending before deciding how to cast their vote.

      Now, contrast this with a sealed ballot system, where each person votes in a private voting booth. In this system, no one knows how others voted until all ballots are collected and revealed simultaneously. This approach prevents bias, influence, and vote manipulation, ensuring a true representation of public opinion.
      </p>
</Admonition>

> ### Auctions

#### Sealed-Bid Auctions
##### Enabling Fair & Confidential Bidding
Auctions are widely utilized in various sectors, including NFT sales, real estate, corporate procurement, and token sales. However, many traditional auction formats are plagued by issues such as information asymmetry and last-minute bid manipulation. In a conventional open auction, participants can see other bids in real time, which enables them to adjust their own offers accordingly. This often results in unfair advantages for those who wait until the last moment to bid or who have insider access to other bids.

A sealed-bid auction addresses these issues by keeping all bids completely private until the auction concludes. By using Shutter API's threshold encryption, bidders submit encrypted bids that remain unreadable until the auction deadline. Once the bidding period ends, the encrypted bids are decrypted simultaneously, ensuring that the winner is determined fairly and transparently.

:::tip[This system ensures that]
- No participant is able to adjust their bid based on the offers made by other bidders.
- The auction operator is not able to selectively disclose or manipulate bid data prior to the auction's closing.
- Each participant competes on equal terms, ensuring that the auction outcome is fair for everyone involved.
:::

##### Transaction Flow Overview
Sealed-bid auctions use the Shutter API's commit-reveal encryption method to prevent premature disclosure of bid information.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### The process works as
      ###### Commitment Phase (Bidding)
      - Each bidder securely encrypts their bid using the Shutter API before submitting it to the auction.
      - The encrypted bid is recorded but remains unreadable to everyone, including the auctioneer and other bidders.
      ###### Waiting Period (Auction in Progress)
      - Bidders can view the total number of bids that have been placed, but they cannot see the individual bid amounts.
      - The auction contract has a strict deadline, preventing early reveals or late bid changes.
      ###### Reveal Phase (Auction Closes)
      - Once the auction deadline is reached, the decryption key is automatically released by Shutter's distributed Keyper network.
      - All bids are simultaneously decrypted and revealed, ensuring a fair winner selection based on the highest bid.
      </p>
</Admonition>

This revised structure prevents last-minute bid sniping, eliminates unfair pre-reveal advantages, and stops auction house manipulation, making it perfect for high-stakes bidding environments.

##### Real-World Applications of Sealed-Bid Auctions
- **NFT Sales & Digital Collectibles**
  - Ensures fair bidding for rare NFTs without whales exploiting early bid visibility.
Prevents market makers and platforms from pre-revealing high-value bids.
- **Real Estate & Property Auctions**
  - Allows buyers to bid competitively without revealing their price to rivals before the deadline.
  - Prevents sellers from selectively leaking high bids to drive up prices.
- **Corporate Procurement & Government Contracts**
  - Companies and governments use Request for Proposals (RFPs) to source suppliers.
  - A sealed-bid approach ensures fair competition by keeping bids confidential until selection.
- **Token Auctions & IDOs (Initial DEX Offerings)**
  - Guarantees that launchpad sales occur without insiders seeing private bids before execution.
  - Reduces MEV attacks where bots copy large bids before execution.
- **Art & Luxury Goods Auctions**
  - Protects bidders in high-value art sales where revealing bid amounts could influence competitors.
- **Private Investment Rounds & Venture Capital Bidding**
  - Ensures startups receive fair investment offers from competing investors.
  - Prevents investors from colluding or adjusting bids based on early submissions.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### A Silent Charity Auction
      Imagine you are attending a charity fundraiser where a signed, limited-edition sports jersey is up for auction. Rather than shouting bids aloud, attendees write their offers on slips of paper and drop them into a locked box.
      No one knows what others are bidding.
      The auction organizer cannot peek at or modify bids before the deadline.
      When the auction ends, all bids are revealed at the same time, ensuring the highest legitimate offer wins.

      This is exactly how Shutter API's sealed-bid auction system works—every bid remains private until the auction ends, creating a level playing field for all participants.
      </p>
</Admonition>

> ### Gaming

#### Simultaneous Move Games
##### Enforcing Fair Play & Strategic Secrecy in Multiplayer Games
In many multiplayer and strategy-based games, players are required to commit to an action without knowing their opponents' intentions. However, in on-chain games, the transparency of the blockchain can lead to unfair advantages, as players may choose to wait and observe their opponents' moves before making their own decisions.

:::warning[Common issues in blockchain-based games]
- **Turn-Based Manipulation**
  - If players can see their opponents' moves before finalizing their own, they can always counter optimally.
- **Information Asymmetry**
  - Game hosts or validators may have privileged access to hidden moves, creating trust issues.
- **Selective Disclosure**
  - Players might only reveal their actions when it's strategically beneficial, gaining an unfair edge.
:::

:::tip[With Shutter API's threshold encryption, Simultaneous Move Games ensure]
- All players submit moves privately before they are revealed.
- Game logic enforces a commit-reveal system for fairness.
- No player can change their move based on opponents' actions.
:::

Consider this system like a secret bidding war in a high-stakes poker game. Each player places their bets facedown, and only after all players have made their bets are the cards revealed. This approach ensures that no one gains an unfair advantage by seeing the bets of others beforehand.

##### Transaction Flow Overview
Simultaneous move games utilize Shutter API's commit-reveal encryption to hide player actions until all participants have finalized their moves.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Players Submit Moves)
      - Each player encrypts their move (e.g., attack, defense, spell selection) using Shutter API before submitting it on-chain.
      - The encrypted moves are stored in the game's smart contract but remain unreadable to all parties, including opponents and game hosts.
      ###### Waiting Period (Move Lock-in Phase)
      - Players cannot see each other's moves, preventing unfair counter-strategies.
      - The game logic ensures that no moves can be altered once submitted.
      ###### Reveal Phase (Decryption & Game Resolution)
      - Once all players have submitted their moves, the decryption key is released by Shutter's distributed Keyper network.
      - Moves are simultaneously revealed, and the game logic determines the outcome based on the predefined rules.
      </p>
</Admonition>

This structure removes turn-based bias, prevents unfair move selection, and ensures trust-minimized gameplay.

##### Real-World Applications of Simultaneous Move Games
- **Strategy-Based Blockchain Games (Chess, Diplomacy, RTS Games)**
  - Ensures that players commit to moves without seeing their opponents' choices.
  - Prevents manipulation in games where strategic secrecy is crucial.
- **Poker & Gambling dApps**
  - Guarantees hidden bets and card selections until the reveal phase.
  - Prevents players from selectively revealing information to manipulate game flow.
- **On-Chain Battle Games (Turn-Based & Real-Time Combat)**
  - Ensures that combat actions remain hidden until all players have locked in their choices.
  - Prevents last-minute strategic counterpicking of moves.
- **Hidden Role & Social Deduction Games (Mafia, Werewolf, Daoplomacy)**
  - Keeps player roles and actions hidden until the correct moment.
  - Prevents bias or leaks that could ruin the secrecy of the game.
- **Tournaments & Competitive Matchmaking**
  - Ensures that players submit their game choices (e.g., characters, weapons, skills) without pre-revealing them.
  - Reduces meta-gaming and strategic countering before matches begin.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### A Stealth Military Strategy Game
      Imagine a military standoff where two opposing commanders must secretly choose their next move. If one commander could see the other's battle plans before finalizing their own, they could:
      - Change their strategy to perfectly counter the opponent's move.
      - Exploit knowledge of enemy positioning before committing their forces.
      - Delay their decision to see what the other does first.

      Now, imagine instead that:
      - Each commander writes their battle plan on a sealed note.
      - Both commanders submit their sealed orders simultaneously.
      - Only after all strategies are locked in are the battle plans revealed.

      This is exactly how Shutter API's Simultaneous Move Games work—players make decisions independently, and only after all have committed do moves become public, ensuring fair competition.
      </p>
</Admonition>

#### Fair On-Chain Gaming
##### Preventing Exploits & Ensuring Transparent Play
Blockchain gaming is revolutionizing the gaming industry by enabling player-owned assets, decentralized economies, and provable fairness.

:::warning[On-chain games face several challenges due to blockchain transparency]
- **Information Asymmetry**
  - If game actions are recorded on-chain before execution, opponents or game operators can adjust their strategies based on visible data.
- **Predictable Randomness**
  - Many blockchain games rely on on-chain random number generation (RNG), which can be manipulated by validators, sequencers, or miners.
- **Unfair Move Selection**
  - In competitive multiplayer games, players who can see opponents' moves before acting gain an unfair advantage.
:::

:::tip[With Shutter API's threshold encryption, Fair On-Chain Gaming ensures]
- Players' moves and game mechanics remain hidden until the reveal phase.
- Randomness is generated securely and cannot be manipulated.
- Game outcomes are determined in a fair, transparent, and verifiable way.
:::

Consider this system as a sealed deck of cards in a poker game—until the cards are revealed, no one knows what to expect next, preventing anyone from unfairly influencing the game.

##### Transaction Flow Overview
Fair On-Chain Gaming uses Shutter API's commit-reveal encryption to protect in-game actions, player strategies, and randomness.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Players Make Moves or Game Logic is Executed)
      - Players encrypt their moves or game actions (e.g., attacks, trades, card selections) before submitting them on-chain.
      - If randomness is needed, a secure random value is generated and encrypted to prevent pre-reveal exploitation.
      - The encrypted data is stored on-chain but remains hidden from all players, validators, and sequencers.
      ###### Waiting Period (Game Progression & Strategy Lock-In)
      - Players cannot see each other's moves until all actions are finalized.
      - Smart contracts prevent strategic last-minute changes by enforcing move locking.
      - If randomness is involved, the random value remains sealed until the moment it is required.
      ###### Reveal Phase (Decryption & Game Resolution)
      - Once the predefined conditions are met, the decryption key is released by Shutter's distributed Keyper network.
      - All encrypted moves and random values are revealed simultaneously, ensuring that no player has an unfair preview.
      - The game executes the final outcomes based on the revealed data, ensuring fair competition.
      </p>
</Admonition>

This method prevents pre-reveal move sniping, ensures unpredictable randomness, and guarantees tamper-proof game execution.

##### Real-World Applications of Fair On-Chain Gaming
- **On-Chain Card Games (Poker, Blackjack, TCGs like Gods Unchained)**
  - Ensures that cards remain hidden until drawn and cannot be predicted by miners or validators.
  - Prevents selective disclosure, where players reveal cards only when it benefits them.
- **Turn-Based Strategy Games (Chess, Diplomacy, Auto-Battlers)**
  - Ensures simultaneous move commitment, preventing players from reacting to opponents' moves before finalizing their own.
- **Role-Playing Games (RPGs) & Loot-Based Games**
  - Guarantees that random loot drops remain hidden until assigned, preventing game hosts from selectively rewarding players.
- **Battle Royale & eSports Betting Games**
  - Ensures that players cannot see enemy locations or in-game conditions before executing actions.
  - Prevents scripted manipulation of game outcomes by validators or developers.
- **Hidden Role & Social Deduction Games (Mafia, Werewolf, Daoplomacy)**
  - Keeps player roles and night actions secret until the reveal phase.
  - Prevents hosts from revealing critical game information early.
- **Play-to-Earn (P2E) Blockchain Games**
  - Protects players from gaming exploits, such as bots front-running valuable in-game actions.
  - Prevents unfair NFT distribution based on visible game logic.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### A Sealed Dice Roll in a Dungeon Game
      Imagine playing a tabletop role-playing game (RPG) where you must roll a die to determine if you successfully defeat a monster. If you could see the dice result before making your move, you could:
      - Choose only to fight when the outcome is in your favor.
      - Adjust your strategy to optimize rewards based on pre-known randomness.
      - Take actions based on hidden information that others don't have access to.

      Now, imagine instead:
      - The dice roll is made inside a sealed box before any actions are taken.
      - Players commit their battle strategies before knowing the outcome.
      - Only after everyone has finalized their moves is the box opened, revealing the true result.

      This is exactly how Shutter API's Fair On-Chain Gaming works—game outcomes, actions, and randomness remain sealed until the appropriate moment, ensuring an even playing field.
      </p>
</Admonition>

#### Parimutuel Betting
##### Fair & Manipulation-Resistant Wagering
Parimutuel betting is a popular system used in horse racing, sports betting, and prediction markets. In this system, all bets are combined into a pool, and the winnings are distributed based on the total amount wagered. Unlike fixed-odds betting, where payouts are predetermined, parimutuel odds fluctuate dynamically according to the bets placed. However, this system can be susceptible to strategic manipulation and insider exploitation.

:::warning[Common problems in traditional parimutuel betting]
- **Late-Stage Betting Exploits**
  - Players wait until the last moment to place bets, adjusting based on the current odds.
- **Odds Manipulation**
  - Early bettors can strategically place large bets to shift the odds in their favor.
- **Insider Advantage**
  - Market operators or validators may see bets before they are finalized, allowing them to adjust their positions accordingly.
:::

:::tip[With Shutter API's encrypted parimutuel betting, bets remain completely hidden until the pool closes]
- No one can adjust their bets based on the current odds.
- Bets are only revealed after the betting window closes, ensuring fairness.
- The final odds reflect true market sentiment, free from last-minute manipulation.
:::

Consider this system as if you are placing your bet in a sealed envelope—no one can see how much you've wagered until all envelopes are opened simultaneously, ensuring that no one can manipulate the odds before the final reveal.

##### Transaction Flow Overview
Parimutuel betting with Shutter API's commit-reveal encryption ensures that wagers remain confidential until the betting period ends.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Bet Placement)
      - Players encrypt their bets before submitting them to the betting smart contract.
      - The encrypted bet is stored on-chain but remains unreadable to all other players, validators, and the market operator.
      ###### Waiting Period (Betting Pool Open)
      - Players can see the total number of participants but not the individual bets.
      - No one can adjust their wagers based on others' betting patterns.
      ###### Reveal Phase (Pool Closure & Odds Calculation)
      - When the betting window closes, the decryption key is released by Shutter's distributed Keyper network.
      - All bets are revealed simultaneously, and final odds are calculated based on total wagers in the pool.
      - The winnings are distributed fairly, based on the final odds.
      </p>
</Admonition>

This method prevents last-minute betting exploits, guarantees privacy, and ensures that no player can manipulate the market before the final odds are locked in.

##### Real-World Applications of Parimutuel Betting
- **Horse Racing & Traditional Sports Betting**
  - Ensures fair parimutuel odds without last-minute betting exploits.
  - Prevents sportsbooks from adjusting odds based on insider knowledge.
- **Decentralized Prediction Markets**
  - Keeps market participants' wagers hidden until the event concludes.
  - Ensures manipulation-free forecasting in political and financial markets.
- **Crypto & NFT Betting Pools**
  - Allows users to place bets on NFT rarities or token price movements without others seeing their predictions.
  - Prevents whales from manipulating outcomes by front-loading bets.
- **On-Chain Fantasy Sports & eSports Betting**
  - Guarantees that no one can adjust their fantasy league wagers based on early game results.
  - Keeps betting odds stable until all positions are locked in.
- **Yield-Based Betting & DeFi Risk Pools**
  - Used in DeFi insurance pools, where participants bet on protocol risks or security events.
  - Ensures fair distribution of payouts based on final pool outcomes.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### A Blindfolded Auction for Betting
      Imagine a group of friends betting on a mystery box auction, where the final price is determined by the total amount wagered. If they could see each other's bids before submitting their own, they might:
      - Adjust their bets to manipulate the final price.
      - Wait until the last second to place their wager, ensuring they get the best possible deal.
      - Use insider knowledge to game the system.

      Now, imagine instead:
      - All bets are placed inside locked boxes and submitted without revealing the amounts.
      - When the betting period ends, all boxes are opened at the same time, and the final price is determined fairly.
      - No one knew what others were betting, so the final result was free from manipulation.

      This is exactly how Shutter API's Parimutuel Betting system works—bets remain hidden until the pool closes, ensuring fair odds and trust-minimized betting outcomes.
      </p>
</Admonition>

#### Randomness Generation
##### Threshold-Generated Randomness for Games and Protocols
Randomness plays a critical role in gaming, lotteries, NFT mints, and many on-chain applications where fairness and unpredictability are essential. However, generating reliable randomness on a public blockchain is notoriously difficult due to its transparent and deterministic nature. Traditional approaches, such as relying on block hashes or centralized oracles, introduce vulnerabilities and trust assumptions.

Shutter API offers a unique solution: it provides access to random values generated directly through the threshold decryption process by a decentralized network of Keypers. These values can be accessed via API calls and used as a reliable randomness source in any off-chain or on-chain application.

This randomness is not derived from encrypting a pre-defined value and later decrypting it—instead, the decryption key itself (produced as part of Shutter’s distributed key generation) serves as the source of randomness. Because the key is generated collaboratively through a secure threshold process, it is unpredictable, unbiased, and cannot be influenced by any single actor.

##### Transaction Flow Overview
The Shutter API enables access to trust-minimized randomness by exposing the randomness inherent in its threshold key generation process.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Identity Registration (Randomness Setup)
      - A developer registers a new encryption identity with a decryption trigger condition (e.g. a future timestamp or event).
      ###### Wait for Decryption (Key Generation by Keypers)
      - The network of Keypers collaborates to compute a threshold decryption key. Until the condition is met, the key—and thus the randomness—is not available to anyone.
      ###### Randomness Retrieval (Reveal Phase)
      - Once the trigger condition is satisfied, the Keypers publish the decryption key associated with the identity.
      - This decryption key itself is used as the random value, which can be consumed by applications to drive logic in games, draws, lotteries, and more.
      </p>
</Admonition>

Importantly, the randomness is not user-supplied or application-specific, making it tamper-resistant and suitable for a wide range of verifiable use cases.

##### Real-World Applications of Randomness Generation
- **Provably Fair Blockchain Games**
  - Use random values to resolve outcomes such as dice rolls, loot drops, monster spawns, or card shuffles—without giving validators or players the chance to manipulate the result.
- **NFT Minting and Trait Assignment**
  - Assign rarities and attributes to NFTs using unbiased randomness. Prevents early insiders from predicting or gaming the minting process.
- **Prize Draws, Lotteries, and Raffles**
  - Run secure giveaways where winners are selected based on a truly unpredictable value, with public verifiability.
- **DAO Governance and Random Selection**
  - Select random committee members, grant reviewers, or jurors in decentralized governance processes.
- **Randomized Event Triggers in Smart Contracts**
  - Trigger in-game or protocol-level events at unpredictable times to keep user interactions dynamic and trustless.
- **Betting Games and Gambling dApps**
  - Use random outcomes to determine winners in parimutuel pools, roulette-style games, or dice games, ensuring fairness across participants.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### The Dice Roll That No One Can Rig
      Imagine a turn-based strategy game where players roll a die to determine how many spaces they can move. If the die roll is public or predictable, a savvy player might time their actions or manipulate the outcome in their favor.

      Now consider a die that is rolled in secret by a neutral, trusted group, and the result is only revealed once it's time to act. No one can influence or predict it—players commit to their strategies blind, and only after that is the die roll shown.

      This is what Shutter’s randomness generation achieves. The randomness comes from the threshold-generated decryption key, created by a decentralized set of Keypers. No participant or developer can bias it. It’s just fair randomness—generated collaboratively, revealed at the right time.
      </p>
</Admonition>

> ### Access Control

#### Time-Locked Gifts
##### Delayed & Encrypted Transfers for Special Occasions
Sending digital gifts, tokens, or NFTs typically requires immediate transfers, which can make it challenging to create a sense of anticipation or restrict early access to sensitive content. Whether it's a birthday gift, a surprise airdrop, or an inheritance distribution, traditional blockchain transactions do not provide a way to enforce a delayed reveal.

:::warning[Common problems with standard digital gifting]
- **No Timing Control**
  - Once a transfer is made, the recipient gains immediate access.
- **Spoiled Surprises**
  - Public blockchain transactions immediately reveal gift details, removing the excitement of a timed reveal.
- **Inheritance & Deferred Payments**
  - There's no native way to enforce a time-based unlocking of assets without relying on centralized intermediaries.
:::

:::tip[With Shutter API's Time-Locked Gifts, senders can encrypt tokens, messages, or NFTs until a predefined time]
- Recipients can only access the gift after a specific date.
- The contents of the gift remain hidden until the unlock moment.
- Transfers occur in a fully decentralized, trust-minimized manner.
:::

A prime example of this functionality is Shutter Hongbao, a decentralized time-locked red envelope platform that allows users to send crypto gifts that remain sealed until a specified future moment, recreating the traditional surprise of gifting.

##### Transaction Flow Overview
Time-Locked Gifts leverage Shutter API's commit-reveal encryption, ensuring that assets remain sealed until the predefined unlocking condition is met.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Gift Creation & Encryption)
      - The sender encrypts the gift's details (e.g., token amount, NFT metadata, or message) using Shutter API.
      - This encrypted data is stored in a smart contract, ensuring that even the recipient cannot see the gift's contents prematurely.
      ###### Waiting Period (Gift Locking & Countdown)
      - The encrypted gift remains on-chain but unreadable until the unlock time.
      - The recipient can see that they have received a pending gift but cannot access the details yet.
      ###### Reveal Phase (Time-Based Unlocking & Redemption)
      - Once the predefined time or condition is met, the decryption key is released by Shutter's distributed Keyper network.
      - The gift automatically unlocks, and the recipient can redeem the tokens, NFTs, or message.
      </p>
</Admonition>

This ensures that gifts remain sealed until the right moment, creating a tamper-proof and surprise-filled experience.

##### Real-World Applications of Time-Locked Gifts
- **Shutter Hongbao (Time-Locked Red Envelopes)**
  - Inspired by the traditional Chinese New Year custom, Shutter Hongbao allows users to send crypto gifts that remain sealed until a future moment, creating an exciting reveal experience.
  - Prevents recipients from accessing funds early while ensuring a trustless, decentralized distribution process.
- **Surprise Airdrops & NFT Mystery Boxes**
  - Projects can airdrop mystery NFTs or governance tokens that remain sealed until a specific date.
  - Prevents early trading and speculation by ensuring that recipients cannot reveal their holdings before the unlock.
- **Event-Based Token Unlocks (Bonuses & Rewards)**
  - Used for loyalty programs, gaming rewards, or seasonal bonuses, where tokens only become accessible after a certain milestone or date.
  - Ensures that recipients cannot prematurely cash out rewards before they are officially distributed.
- **Birthday, Holiday & Special Occasion Crypto Gifts**
  - Users can send crypto or NFTs as a surprise gift that only unlocks on a specific date, similar to a wrapped present under a Christmas tree.
- **Deferred Payments & Trustless Escrows**
  - Employers or DAOs can set up deferred salary payments, where funds are locked and automatically released after a work milestone is completed.
  - Eliminates the need for centralized escrow services.
- **Inheritance & Estate Planning in Web3**
  - Allows assets to be distributed automatically to beneficiaries after a specified date without requiring lawyers, notaries, or third-party custodians.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### A Time-Locked Treasure Chest
      Imagine a magical treasure chest that can only be opened at midnight on New Year's Eve.
      - You place gold coins inside and give the chest to a friend.
      - Until the clock strikes 12:00 AM, the chest remains locked, and no one—including the recipient—can peek inside.
      - When the moment arrives, the chest automatically unlocks, revealing its contents.

      This is exactly how Shutter API's Time-Locked Gifts work—gifts remain completely encrypted until the predefined reveal time, ensuring trustless, surprise-filled experiences.
      </p>
</Admonition>

#### Smart Account Access to Encryption
##### Enabling Private & Secure Interactions for Smart Contract Wallets
In Ethereum and other blockchain ecosystems, smart accounts (such as ERC-4337 account abstraction wallets and multisigs like Safe) are revolutionizing how users interact with Web3.

:::warning[Smart accounts lack native access to encrypted data, making it difficult to]
- Securely manage private information—Smart accounts cannot decrypt confidential data, such as private voting results, encrypted documents, or confidential trade orders.
- Enable encrypted interactions—Unlike Externally Owned Accounts (EOAs), smart contracts cannot locally generate private keys for encryption or decryption, limiting their use in privacy-preserving applications.
- Facilitate trusted data access—Users may want to control how and when smart accounts gain access to encrypted assets, messages, or transactions.
:::

:::tip[With Shutter API's Smart Account Access to Encryption, developers can enable smart contract wallets to interact with encrypted data]
- Smart accounts can retrieve and decrypt sensitive data at predefined conditions.
- Users retain full control over when and how a smart account accesses private information.
- Applications such as DAOs, decentralized storage, and private transactions become fully compatible with smart contract wallets.
:::

##### Transaction Flow Overview
Smart Account Access to Encryption uses Shutter API's threshold encryption to enable controlled access to private data, messages, and encrypted transactions.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (User Encrypts Data & Assigns Smart Account Access)
      - The user encrypts the data (e.g., a DAO vote, a private document, or an encrypted transaction) using Shutter API.
      - The encryption key is linked to a smart account, meaning that only the designated contract can request the decryption at a later stage.
      ###### Waiting Period (Conditional Access Enforcement)
      - The encrypted data remains unreadable until the predefined unlocking condition is met.
        - Conditions may include:
          - A time delay (e.g., time-locked document access).
          - A user's explicit approval (e.g., private DAO voting results).
          - A smart contract-triggered event (e.g., successful transaction execution).
      ###### Reveal Phase (Smart Account Retrieves Decryption Key & Unlocks Data)
      - Once the predefined condition is satisfied, the decryption key is released by Shutter's distributed Keyper network.
      - The smart account retrieves and decrypts the previously encrypted data, enabling private, trust-minimized access.
      </p>
</Admonition>

This structure ensures that encrypted data can be programmatically unlocked by smart accounts without compromising security or requiring a centralized trust model.

##### Real-World Applications of Smart Account Access to Encryption
- **Decentralized Private File Storage (e.g., Fileverse, Arweave, IPFS)**
  - Smart accounts can store encrypted files and retrieve them only under predefined conditions.
  - Users can set rules such as time-based access, role-based access, or multi-party authorization.
- **Encrypted On-Chain Identity & Credentials**
  - Decentralized identity (DID) systems can store encrypted user credentials that are only accessible to authorized smart contract wallets.
  - Enables private KYC data sharing without exposing sensitive user details.
- **Trust-Minimized Smart Contract Escrows**
  - Funds, documents, or trade secrets can be encrypted and stored within an escrow contract.
  - The decryption key is only released when both parties meet predefined conditions (e.g., completing a service or providing collateral).
- **Automated Financial Contracts & Private Transactions**
  - A smart account can decrypt confidential financial transactions or payment details only when certain milestones are met.
  - Enables privacy-preserving on-chain finance without exposing transaction metadata.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### A Programmable Smart Safe
      Imagine a smart safe that can store confidential documents or digital assets, but unlike a normal safe, it:
      - Can only be unlocked by an authorized contract (not just any user).
      - Can be programmed to open only after a certain condition is met (e.g., time delay, approval from multiple parties).
      - Ensures that no one else can access the contents before the safe is opened.

      This is exactly how Shutter API's Smart Account Access to Encryption works—it enables smart contracts to securely retrieve and decrypt private data only under specific conditions, ensuring trusted and programmable data access.
      </p>
</Admonition>

> ### Forecasting & Prediction

#### Encrypted Prediction
##### Ensuring Fair & Confidential Forecasting
Predictions are essential in finance, governance, sports, and decentralized decision-making. However, making predictions public before an event concludes can lead to exploitation or strategic manipulation based on emerging trends.

:::warning[Common challenges in open prediction systems]
- **Bias & Influence**
  - Early predictions can sway other participants' decisions.
- **Strategic Adjustments**
  -  Participants may modify their forecasts based on what others predict.
- **Insider Exploits**
  -  Privileged actors might adjust their predictions using early access to off-chain data.
:::

:::tip[With Shutter API's encrypted prediction, forecasts remain completely private until the predefined reveal phase]
- Participants cannot see or influence each other's predictions before the event concludes.
- All forecasts are revealed at the same time, preventing strategic last-minute changes.
- Markets and decision-making processes remain unbiased and trust-minimized.
:::

Consider this system as a sealed ballot box for forecasting—everyone submits their predictions without knowing the inputs of others, and all entries are revealed simultaneously when the event concludes, ensuring genuine, uninfluenced results.

##### Transaction Flow Overview
Encrypted Prediction utilizes Shutter API's commit-reveal encryption, ensuring that forecasts remain hidden until the event resolution phase.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Prediction Submission)
      - Participants encrypt their predictions using Shutter API before submitting them on-chain.
      - The encrypted prediction is stored but remains unreadable to all parties, including validators and sequencers.
      ###### Waiting Period (Event Progression)
      - While the prediction market or event unfolds, all forecasts stay sealed.
      - Participants cannot adjust their predictions based on real-time developments.
      ###### Reveal Phase (Outcome & Settlement)
      - When the event concludes (e.g., election results, sports match, stock price movement), the decryption key is automatically released by Shutter's distributed Keyper network.
      - The previously encrypted predictions are revealed simultaneously, ensuring fair evaluation.
      - The correct or most accurate forecasts receive payouts, recognition, or governance influence.
      </p>
</Admonition>

This structure removes information asymmetry, prevents late-stage strategic adjustments, and ensures a transparent forecasting process.

##### Real-World Applications of Encrypted Prediction
- **Prediction Markets**
  - Ensures that all bets are sealed until the market closes, preventing manipulation.
  - Eliminates pre-reveal trading exploits that allow bettors to adjust their positions based on partial results.
- **Sports Betting & Tournament Forecasting**
  - Keeps all sports bets sealed until the game ends, ensuring no last-minute betting adjustments based on real-time scores.
  - Guarantees that no bettor can gain an unfair advantage through early leaks.
- **Financial Market Predictions & Trading Signals**
  - Traders can commit to a price prediction (e.g., BTC will be above $50K by next week) without revealing their position until after the deadline.
  - Prevents copy-trading and manipulation of price movement expectations.
- **Election Forecasting & Political Markets**
  - Forecasts for political races remain hidden until election results are confirmed.
  - Prevents last-minute strategic positioning based on polling trends.
- **Scientific & Academic Consensus Surveys**
  - Researchers can submit independent assessments on a hypothesis without peer influence.
  - It helps prevent groupthink and bias in collaborative forecasting.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Predicting the Stock Market in a Locked Vault
      Imagine a financial analyst who wants to publicly commit to their prediction that Bitcoin will hit $160,000 in the next 30 days. If they announce this forecast openly, several things could happen:
      - Other analysts might copy their prediction, diluting its value.
      - Traders with privileged market access might adjust their positions in response.
      - The prediction's credibility could be influenced by early sentiment rather than accuracy.

      Now, imagine instead that the analyst:
      - Locks their prediction in a vault and submits it to a trusted system.
      - The vault remains sealed until the deadline, so nobody can alter their own predictions based on it.
      - When the reveal time arrives, all forecasts are opened at once, ensuring fairness.

      This is exactly how Shutter API's Encrypted Prediction works—forecasts remain hidden until they are meant to be revealed.
      </p>
</Admonition>

> ### Coordination & Workflows

#### Bounty Submissions
Protecting Intellectual Property & Ensuring Fair Rewards
Bounty programs play a vital role in open-source development, security research, bug hunting, and DAO-funded initiatives. However, they often face issues like idea theft, favoritism, and a lack of confidentiality during the submission process.

:::warning[Common issues include]
- **Plagiarism & Idea Theft**: A developer presents a unique solution, but an insider or another participant submits a slight variation to claim the reward.
- **Submission Bias**: Judges or project owners might favor certain contributors if they see who submitted what before making evaluations.
- **Front-Running & Strategic Delays**: Contributors might hold back their submissions until they see what others propose. This allows them to make small adjustments and unfairly outcompete original ideas.
:::

:::tip[With Shutter API's encrypted bounty submissions, every participant's work is sealed until the submission deadline]
- All bounty solutions remain private until the evaluation phase.
- No one can copy, modify, or front-run another submission.
- Contributors are judged solely on merit, not timing or insider connections.
:::

Consider this system as a science fair competition where all projects are kept confidential until judging begins, ensuring fair evaluation without peer influence or idea theft.

##### Transaction Flow Overview
Bounty Submissions leverage Shutter API's commit-reveal encryption to protect submissions from premature disclosure or manipulation.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Submission Period)
      - Contributors encrypt their bounty submissions before submitting them on-chain.
      - The encrypted submissions are stored in a bounty contract but remain unreadable to all parties, including bounty issuers and other contributors.
      ###### Waiting Period (Review & Validation)
      - The submission window remains open, allowing multiple participants to submit solutions.
      - Since all submissions are encrypted, contributors cannot copy or adjust their work based on competitors.
      ###### Reveal Phase (Evaluation & Selection)
      - Once the bounty submission deadline is reached, Shutter's distributed Keyper network releases the decryption key.
      - All submissions are decrypted simultaneously, allowing judges to review them objectively.
      - The best submission is selected, ensuring a fair and transparent reward process.
      </p>
</Admonition>

This protects intellectual property and ensures that the best solution wins—not the fastest or most strategically submitted one.

##### Real-World Applications of Bounty Submissions
- **Open-Source Development & Gitcoin Grants**
  - Ensures developers' contributions remain private until review.
  - Prevents code plagiarism in blockchain development grants.
- **Bug Bounty Programs & Security Research**
  - Security researchers can submit vulnerabilities privately, preventing exploits.
  - Ensures ethical hackers receive proper rewards without others copying their findings.
- **DAO-Funded Initiatives & Research Proposals**
  - Allows DAO members to submit solutions privately, avoiding bias.
  - Prevents favoritism in decentralized funding programs.
- **Art & Design Contests**
  - Artists can submit designs, logos, or UI concepts without fearing theft.
  - Judges evaluate work objectively without knowing authorship beforehand.
- **Crowdsourced Innovation Challenges**
  - Organizations seeking new business models, technical solutions, or research ideas can receive sealed proposals.
  - Prevents late entries from strategically tweaking earlier submissions.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### The Patent Office Filing System
      Imagine you have invented a revolutionary new technology. You want to file a patent to protect your idea, but you fear:
      Competitors might see your application and rush to file a slightly different version before it's reviewed.
      Patent office insiders could leak your invention details to established companies.
      The first filer gets unfair priority, even if they copied someone else's concept.
      Now, imagine a secure patent filing system where:
      All patent applications are encrypted upon submission.
      No one can see or modify submissions until a strict deadline.
      Applications are reviewed fairly and simultaneously, ensuring the original creator gets credit.

      This is how the Shutter API's bounty submission system operates—ensuring that each submission is evaluated on its true merit rather than on strategic timing or insider advantage.
      </p>
</Admonition>

#### Sealed-Bid RFPs
##### Ensuring Fair & Confidential Procurement Processes
A Request for Proposal (RFP) is a formal process that invites vendors to submit competitive bids for projects, contracts, or services. However, traditional RFPs often suffer from information asymmetry and bid manipulation:

:::warning[traditional RFPs often suffer from information asymmetry and bid manipulation]
      - Procurement officers or insiders may disclose bid amounts to preferred vendors.
      - Vendors may adjust their bids strategically based on the submissions made by their competitors.
      - The process may be biased or unfair, often favoring larger firms that have insider knowledge.
:::

:::tip[Sealed-bid RFPs, powered by Shutter API's threshold encryption, eliminate these vulnerabilities]
      - All proposals remain private until the submission deadline.
      - No vendor can see other bids before the final reveal.
      - The selection process is tamper-proof and based on merit, not insider influence.
:::


Consider this system as submitting job applications in sealed envelopes—employers evaluate all candidates simultaneously without knowing the order of applications, ensuring a fair selection process.

##### Transaction Flow Overview
Sealed-bid RFPs utilize Shutter API's commit-reveal encryption to ensure proposal confidentiality throughout the procurement process.

<Admonition type="note" title={null} icon={null}>
      <p>
      ###### Commitment Phase (Proposal Submission)
      - Vendors encrypt their proposals using Shutter API before submitting them on-chain.
      - The encrypted proposals are stored in an RFP smart contract but remain unreadable to everyone, including procurement officers.
      ###### Waiting Period (Proposal Collection)
      - Organizations can see how many proposals have been submitted but cannot read the contents.
      - Vendors cannot adjust their proposals based on competitor submissions.
      ###### Reveal Phase (Evaluation & Selection)
      - Once the submission deadline is reached, the decryption key is released by Shutter's distributed Keyper network.
      - All proposals are decrypted simultaneously, ensuring fair and transparent evaluation.
      - The winning bid is selected based on predefined criteria (e.g., price, service quality, reputation).
      </p>
</Admonition>

This process guarantees the confidentiality of all bids until the final decision is made, minimizing corruption and fostering a level playing field for all vendors.

##### Real-World Applications of Sealed-Bid RFPs
- **Corporate Procurement & Vendor Selection**
  - Ensures fair bidding for contracts involving construction, logistics, and consulting services.
  - Prevents manipulation by procurement officers favoring preferred vendors.
- **Government Contracts & Public Sector Bidding**
  - Guarantees transparent competition for public infrastructure projects.
  - Prevents bribery and insider trading in contract awards.
- **Freelance & Gig Economy Platforms**
  - Enables fair job bidding where freelancers submit sealed proposals without seeing competitors' rates.
  - Ensures objective hiring based on skill rather than bid timing.
- **Blockchain DAOs & Decentralized Grant Programs**
  - Allows DAOs to select service providers or developers in a decentralized and private manner.
  - Ensures grant applicants receive fair consideration without favoritism.
- **Investment & Fundraising Proposals**
  - Startups can submit funding proposals privately, ensuring equal access to VC deals.
  - Prevents investors from colluding or adjusting terms after seeing competitors' offers.

##### Example
<Admonition type="note" title={null} icon={null}>
      <p>
      ###### A Blind Art Competition
      Imagine an art competition where artists submit their work for judging. In a flawed system:

      - Some artists might see what others are submitting and adjust their pieces accordingly.
      - Judges might favor certain artists if they know their identities in advance.
      - Insiders might leak scores before the final evaluation.

      Now, imagine a fair art competition where:

      - All artworks are submitted in covered frames, hiding the artists' identities.
      - The judges evaluate all pieces simultaneously without bias.
      - Only after judging are the artists revealed, ensuring a merit-based outcome.

      This is how Shutter API's sealed-bid RFPs operate: every vendor submits their bid in a "sealed frame," ensuring that the best proposal wins rather than the best-connected bidder.
      </p>
</Admonition>

---

## Conclusion  

The **Shutter API** provides a **powerful and flexible encryption layer** for a wide variety of Web3 applications. By integrating threshold encryption, dApps can **prevent manipulation, enhance fairness, and protect user data** without requiring complex cryptographic knowledge.  

Developers can start using the Shutter API today to **improve trading security, enable fair governance, build trustless games, and implement confidential smart account interactions**.  

To learn more and start building, visit the [Quick Start Guide to Shutter API](get_started/)  
