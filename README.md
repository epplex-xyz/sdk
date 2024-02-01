<h1 align="center">epPlex SDK</h1>
<p align="center"><strong>epPlex Typescript SDK</strong></p>

<div align="center">

  <a href="https://opensource.org/licenses/MIT">![License](https://img.shields.io/badge/License-MIT-yellow.svg)</a>

</div>

## Note

- **epPlex SDK is in active development, so all APIs are subject to change.**
- **This code is unaudited. Use at your own risk.**


## Usage

First, initialize an `EpplexProvider`

As script:
```javascript
const wallet = new NodeWallet(new Keypair());
const connection = new Connection(clusterApiUrl("devnet"));
const clockworkProvider = new EpplexProvider(
    wallet,
    connection,
    anchor.AnchorProvider.defaultOptions()
);

```

Web-client
```javascript
import {EpplexProvider} from "@epplex-xyz/sdk";
import {useAnchorWallet, useConnection} from "@solana/wallet-adapter-react";

const wallet = useAnchorWallet()
const connection = useConnection()
const epplexProvider = new EpplexProvider(
    wallet,
    connection,
    anchor.AnchorProvider.defaultOptions()
);
```

Get all epNFTs of wallet
```javascript
const epNFTs = await EpNFTService.getEpNFTs(connection, wallet.publicKey)
```


Check if mint is epNFT
```javascript
const isEpNFT = await EpNFTService.isBurgerNFT(connection, mint)
```