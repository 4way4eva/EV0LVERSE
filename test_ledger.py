#!/usr/bin/env python3
"""
BLEULIONTREASURY™ - Test Ledger Configuration
Wallet addresses and ceremonial configuration for blockchain deployment
"""

import os
import json
from typing import Dict, List

# Ethereum / Avalanche / Polygon addresses
WALLET_MAIN = "0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be"
WALLET_TREASURY = "0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be"
WALLET_RESERVE = "0x36CA5f34E5E873e7c3dF37432081d20b4Af320Be"

# Cronos address  
WALLET_CRONOS = "cro1k6fjx9naayrjqxuqvcgw05h63vrz8lwgmz95lc"

# NFT.Storage API Key (should be in environment, not hardcoded)
# Use: export NFT_STORAGE_API_KEY="your_key" or add to Replit Secrets
NFT_STORAGE_KEY = os.environ.get("NFT_STORAGE_API_KEY", "")

# Configuration structure
LEDGER_CONFIG = {
    "ethereum_like": {
        "main": WALLET_MAIN,
        "treasury": WALLET_TREASURY,
        "reserve": WALLET_RESERVE
    },
    "cosmos_like": {
        "cronos": WALLET_CRONOS
    },
    "metadata": {
        "platform": "BLEULIONTREASURY™",
        "schema": "EVOL.ENFT.v1",
        "treasury_anchor": "BLEULIONTREASURY™"
    }
}

def verify_ledger() -> None:
    """Print ledger configuration for verification"""
    print("=" * 60)
    print("BLEULIONTREASURY™ - Ledger Verification")
    print("=" * 60)
    
    print("\n🔷 Ethereum/Avalanche/Polygon Addresses:")
    for role, addr in LEDGER_CONFIG["ethereum_like"].items():
        print(f"  {role.upper():12} → {addr}")
    
    print("\n🔶 Cosmos Ecosystem:")
    for chain, addr in LEDGER_CONFIG["cosmos_like"].items():
        print(f"  {chain.upper():12} → {addr}")
    
    print("\n📋 Platform Metadata:")
    for key, value in LEDGER_CONFIG["metadata"].items():
        print(f"  {key:15} → {value}")
    
    print("\n🔐 Environment Secrets:")
    if NFT_STORAGE_KEY:
        print(f"  NFT_STORAGE_API_KEY: ✓ Set ({NFT_STORAGE_KEY[:8]}...)")
    else:
        print("  NFT_STORAGE_API_KEY: ⚠️  NOT SET - Add to environment or Replit Secrets")
    
    print("\n" + "=" * 60)

def export_config(filename: str = "ledger_config.json") -> None:
    """Export configuration to JSON file"""
    with open(filename, 'w') as f:
        json.dump(LEDGER_CONFIG, f, indent=2)
    print(f"✓ Configuration exported to {filename}")

if __name__ == "__main__":
    verify_ledger()
    
    # Optionally export config
    if "--export" in os.sys.argv:
        export_config()
