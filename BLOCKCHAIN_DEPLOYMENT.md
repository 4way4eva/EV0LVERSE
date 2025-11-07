# BLEULIONTREASURY™ Blockchain Deployment Guide

## 🎯 Quick Start

Your wallet configuration from `test_ledger.py`:
- **Wallet Address**: `0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be`
- **Cronos Address**: `cro1k6fjx9naayrjqxuqvcgw05h63vrz8lwgmz95lc`
- **NFT.Storage Key**: Already configured (H6kVe7...)

##Step 1: Add Secrets to Replit

Go to **Tools → Secrets** in Replit and add these environment variables:

```
DEPLOYER_PRIVATE_KEY=your_wallet_private_key_here
ALCHEMY_API_KEY=your_alchemy_api_key_here
NFT_STORAGE_API_KEY=H6kVe7oB56YLs8EYDhAtCRcPhXCsZdjnUFMkN9482DmP
```

### Getting Your Keys:

1. **DEPLOYER_PRIVATE_KEY**: 
   - Open MetaMask
   - Click Account Details → Export Private Key
   - ⚠️ **NEVER share this with anyone!**

2. **ALCHEMY_API_KEY**:
   - Visit https://www.alchemy.com/
   - Create free account
   - Create app (select Ethereum Sepolia)
   - Copy API key from dashboard

## Step 2: Get Testnet Funds

Before deploying, you need testnet tokens:

### Ethereum Sepolia:
```bash
# Visit: https://sepoliafaucet.com/
# Enter: 0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be
```

### Polygon Mumbai:
```bash
# Visit: https://faucet.polygon.technology/
# Select Mumbai, enter your address
```

### Avalanche Fuji:
```bash
# Visit: https://faucet.avax.network/
# Enter: 0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be
```

## Step 3: Deploy Contracts

Deploy to each testnet:

### Deploy to Sepolia (Ethereum):
```bash
npx hardhat run scripts/deploy-enft.ts --network sepolia
```

### Deploy to Mumbai (Polygon):
```bash
npx hardhat run scripts/deploy-enft.ts --network mumbai
```

### Deploy to Fuji (Avalanche):
```bash
npx hardhat run scripts/deploy-enft.ts --network fuji
```

Each deployment will:
- ✅ Deploy the ENFT contract
- 💾 Save deployment info to `deployments/` folder
- 🔍 Provide block explorer link
- 📝 Show verification command

## Step 4: Verify Contracts

After deployment, verify on block explorers:

```bash
# Sepolia
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

# Mumbai
npx hardhat verify --network mumbai <CONTRACT_ADDRESS>

# Fuji
npx hardhat verify --network fuji <CONTRACT_ADDRESS>
```

## Step 5: Test Minting

Test minting an ENFT:

```bash
npx hardhat run scripts/test-mint.ts --network sepolia
```

## 📊 Deployment Status

Track your deployed contracts:

| Network | Chain ID | Contract Address | Explorer |
|---------|----------|------------------|----------|
| Sepolia | 11155111 | TBD | [Etherscan](https://sepolia.etherscan.io) |
| Mumbai | 80001 | TBD | [PolygonScan](https://mumbai.polygonscan.com) |
| Fuji | 43113 | TBD | [SnowTrace](https://testnet.snowtrace.io) |

## 🔐 Security Checklist

- [ ] Private key added to Replit Secrets (never committed to code)
- [ ] Alchemy API key added to Secrets
- [ ] NFT.Storage API key added to Secrets
- [ ] Test wallet has testnet funds
- [ ] Contracts deployed to all 3 testnets
- [ ] Contracts verified on block explorers
- [ ] Test minting successful

## 📝 Smart Contract Features

Your ENFT contract includes:

- ✅ ERC-721 compliant with Enumerable extension
- ✅ Metadata URI storage (IPFS)
- ✅ Provenance hash tracking (SHA3-256)
- ✅ Vault ID association
- ✅ Non-transferable token option
- ✅ Batch minting capability
- ✅ Owner-only minting controls

## 🚀 Next Steps

After deployment:

1. Update `replit.md` with deployed contract addresses
2. Test minting via frontend at `/mint-enft`
3. View minted ENFTs in Treasury Ledger Dashboard
4. Set up IPFS metadata service (already configured)
5. Connect frontend with RainbowKit wallet

## 🆘 Troubleshooting

### "Insufficient funds"
- Get more testnet tokens from faucets above

### "Invalid API key"
- Check Alchemy dashboard for correct API key
- Ensure key is added to Replit Secrets

### "Deployment failed"
- Check network connectivity
- Verify you have testnet funds
- Ensure private key is correct

## 📚 Resources

- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Alchemy Dashboard](https://dashboard.alchemy.com/)
- [NFT.Storage Docs](https://nft.storage/docs/)

---

**BLEULIONTREASURY™** - Ceremonial Blockchain Infrastructure  
Schema: EVOL.ENFT.v1 | Treasury Anchor: BLEULIONTREASURY™
