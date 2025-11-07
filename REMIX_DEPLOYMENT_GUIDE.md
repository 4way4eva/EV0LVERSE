# BLEULIONTREASURY™ ENFT Deployment via Remix IDE

## Why Use Remix IDE?

Remix IDE is a browser-based smart contract development tool that requires zero local setup. It's perfect for deploying contracts to testnets without dealing with Node.js compatibility issues.

## 📋 Prerequisites

1. **MetaMask Wallet** installed with your wallet address: `0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be`
2. **Testnet Funds**:
   - Ethereum Sepolia: https://sepoliafaucet.com/
   - Polygon Mumbai: https://faucet.polygon.technology/
   - Avalanche Fuji: https://faucet.avax.network/

## 🚀 Step-by-Step Deployment

### Step 1: Open Remix IDE

Visit: **https://remix.ethereum.org**

### Step 2: Create Smart Contract File

1. In the **File Explorer** (left sidebar), create a new file:
   - Click the "Create New File" icon
   - Name it: `BLEULIONTREASURY_ENFT.sol`

2. Copy the contract code from `contracts/BLEULIONTREASURY_ENFT.sol` and paste it into Remix

### Step 3: Install OpenZeppelin Dependencies

1. Click the **Plugin Manager** icon (plug icon in left sidebar)
2. Activate "**File Explorer**" if not already active
3. The contract imports will be automatically resolved by Remix

### Step 4: Compile Contract

1. Click the **Solidity Compiler** icon (left sidebar)
2. Select compiler version: **0.8.20** or higher
3. Enable "**Optimization**" (optional but recommended)
4. Click "**Compile BLEULIONTREASURY_ENFT.sol**"
5. Wait for green checkmark ✅

### Step 5: Connect MetaMask to Testnet

**For Ethereum Sepolia:**
1. Open MetaMask
2. Click network dropdown at top
3. Select "**Sepolia test network**"
4. Ensure you have Sepolia ETH from faucet

**For Polygon Mumbai:**
1. Add Mumbai network to MetaMask:
   - Network Name: `Polygon Mumbai`
   - RPC URL: `https://rpc-mumbai.maticvigil.com/`
   - Chain ID: `80001`
   - Currency: `MATIC`
   - Block Explorer: `https://mumbai.polygonscan.com/`
2. Get Mumbai MATIC from faucet

**For Avalanche Fuji:**
1. Add Fuji network to MetaMask:
   - Network Name: `Avalanche Fuji C-Chain`
   - RPC URL: `https://api.avax-test.network/ext/bc/C/rpc`
   - Chain ID: `43113`
   - Currency: `AVAX`
   - Block Explorer: `https://testnet.snowtrace.io/`
2. Get Fuji AVAX from faucet

### Step 6: Deploy Contract

1. Click the **Deploy & Run Transactions** icon (left sidebar)
2. In "**ENVIRONMENT**" dropdown, select "**Injected Provider - MetaMask**"
3. MetaMask will pop up - click "**Connect**"
4. Verify the correct network is selected in MetaMask
5. In Remix, verify:
   - Contract: `BLEULIONTREASURY_ENFT`
   - Account shows your wallet address
6. Click orange "**Deploy**" button
7. MetaMask will pop up - review and click "**Confirm**"
8. Wait for transaction confirmation ⏳

### Step 7: Save Deployment Info

Once deployed, you'll see the contract in the "**Deployed Contracts**" section:

1. **Copy the contract address** (click copy icon next to contract)
2. **Save deployment details**:
   ```
   Network: Sepolia (or Mumbai/Fuji)
   Contract Address: 0x... (the address you copied)
   Deployer: 0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be
   Transaction Hash: (visible in MetaMask)
   ```

3. **Verify on Block Explorer**:
   - Sepolia: `https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS`
   - Mumbai: `https://mumbai.polygonscan.com/address/YOUR_CONTRACT_ADDRESS`
   - Fuji: `https://testnet.snowtrace.io/address/YOUR_CONTRACT_ADDRESS`

### Step 8: Verify Contract (Optional but Recommended)

1. Go to the block explorer for your network
2. Find your contract address
3. Click "**Contract**" tab
4. Click "**Verify and Publish**"
5. Select:
   - Compiler Type: `Solidity (Single file)`
   - Compiler Version: `v0.8.20+commit...`
   - License: `MIT`
6. Paste contract code
7. Click "**Verify and Publish**"

### Step 9: Test Minting Function

In Remix, under "**Deployed Contracts**":

1. Expand your contract
2. Find the **mint** function
3. Fill in test parameters:
   ```
   to: 0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be
   vaultId: "vault_witness_001"
   provenanceHash: "0x1234567890abcdef..."
   tokenURI: "ipfs://QmTest123..."
   nonTransferable: false
   ```
4. Click "**transact**"
5. Confirm in MetaMask
6. Check transaction on block explorer

## 📊 Multi-Chain Deployment Tracking

| Network | Chain ID | Contract Address | Status | Explorer |
|---------|----------|------------------|--------|----------|
| Sepolia | 11155111 | `TBD` | ⏳ | [Etherscan](https://sepolia.etherscan.io) |
| Mumbai | 80001 | `TBD` | ⏳ | [PolygonScan](https://mumbai.polygonscan.com) |
| Fuji | 43113 | `TBD` | ⏳ | [SnowTrace](https://testnet.snowtrace.io) |

## 🔗 Connecting to Your App

After deployment, update your app configuration:

### Option 1: Environment Variables (Recommended)

Add to Replit Secrets:
```
SEPOLIA_CONTRACT_ADDRESS=0x...
MUMBAI_CONTRACT_ADDRESS=0x...
FUJI_CONTRACT_ADDRESS=0x...
```

### Option 2: Frontend Configuration File

Create `client/src/config/contracts.ts`:
```typescript
export const ENFT_CONTRACTS = {
  sepolia: "0x...",  // Your Sepolia deployment
  mumbai: "0x...",   // Your Mumbai deployment  
  fuji: "0x...",     // Your Fuji deployment
};

export const CHAIN_IDS = {
  sepolia: 11155111,
  mumbai: 80001,
  fuji: 43113,
};
```

## 🎯 Using the Minting Interface

Once contracts are deployed:

1. Navigate to `/mint-enft` in your app
2. Connect MetaMask wallet
3. Select the correct network
4. Fill in ENFT details
5. Click "Create Metadata" → "Mint ENFT"
6. Confirm transaction in MetaMask
7. View minted ENFTs in Treasury Ledger

## ⚠️ Important Notes

- **Testnet Only**: These instructions are for testnets only (Sepolia, Mumbai, Fuji)
- **Gas Fees**: Testnet gas is free but requires testnet tokens
- **Contract Owner**: The deploying wallet becomes the contract owner with minting privileges
- **Security**: Never share your private key or seed phrase

## 🆘 Troubleshooting

### "Insufficient Funds"
- Get more testnet tokens from faucets listed above

### "Transaction Underpriced"
- Increase gas price in MetaMask (click "Edit" on transaction)

### "Contract Already Exists"
- Normal - deploy creates a new instance at a new address

### "Cannot Find Module"
- Remix auto-resolves imports - just compile without manual import

### "Invalid Address"
- Ensure wallet address starts with `0x`
- Verify it's the correct format (42 characters total)

## 📚 Additional Resources

- [Remix IDE Documentation](https://remix-ide.readthedocs.io/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [MetaMask Guide](https://metamask.io/faqs/)
- [Testnet Faucets List](https://faucetlink.to/)

---

**BLEULIONTREASURY™** - Ceremonial Blockchain Infrastructure  
Deployment: Remix IDE | Schema: EV0L.ENFT.v1 | Treasury Anchor: BLEULIONTREASURY™
