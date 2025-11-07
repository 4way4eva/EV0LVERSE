import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🚀 Deploying BLEULIONTREASURY_ENFT contract...\n");

  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("📋 Deployment Details:");
  console.log("  Network:", network.name);
  console.log("  Chain ID:", network.chainId);
  console.log("  Deployer:", deployer.address);
  console.log("  Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  // Deploy contract
  console.log("📝 Deploying contract...");
  const BENFT = await ethers.getContractFactory("BLEULIONTREASURY_ENFT");
  const benft = await BENFT.deploy();
  
  await benft.waitForDeployment();
  const contractAddress = await benft.getAddress();
  
  console.log("✅ Contract deployed!");
  console.log("  Address:", contractAddress);
  console.log("  Transaction:", benft.deploymentTransaction()?.hash, "\n");

  // Save deployment info
  const deploymentInfo = {
    network: network.name,
    chainId: Number(network.chainId),
    contractAddress: contractAddress,
    deployerAddress: deployer.address,
    deploymentTx: benft.deploymentTransaction()?.hash,
    timestamp: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filename = `${network.name}-${network.chainId}.json`;
  const filepath = path.join(deploymentsDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", filepath, "\n");

  // Display blockchain explorer link
  const explorerUrls: { [key: string]: string } = {
    "sepolia": "https://sepolia.etherscan.io",
    "mumbai": "https://mumbai.polygonscan.com",
    "fuji": "https://testnet.snowtrace.io",
    "avalanche": "https://snowtrace.io",
  };

  const explorerUrl = explorerUrls[network.name];
  if (explorerUrl) {
    console.log("🔍 View on Explorer:");
    console.log(`  ${explorerUrl}/address/${contractAddress}\n`);
  }

  // Verification instructions
  console.log("📝 To verify contract on block explorer, run:");
  console.log(`  npx hardhat verify --network ${network.name} ${contractAddress}\n`);

  console.log("🎉 Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
