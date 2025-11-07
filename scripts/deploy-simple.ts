import hre from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🚀 Deploying BLEULIONTREASURY_ENFT contract...\n");

  const network = hre.network.name;
  const chainId = hre.network.config.chainId;
  
  console.log("📋 Deployment Details:");
  console.log("  Network:", network);
  console.log("  Chain ID:", chainId);

  // Get contract factory and deploy
  console.log("\n📝 Deploying contract...");
  const BENFT = await hre.ethers.getContractFactory("BLEULIONTREASURY_ENFT");
  const benft = await BENFT.deploy();
  
  await benft.waitForDeployment();
  const contractAddress = await benft.getAddress();
  
  console.log("✅ Contract deployed!");
  console.log("  Address:", contractAddress);
  
  // Save deployment info
  const deploymentInfo = {
    network: network,
    chainId: chainId,
    contractAddress: contractAddress,
    timestamp: new Date().toISOString(),
  };

  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filename = `${network}-${chainId}.json`;
  const filepath = path.join(deploymentsDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));
  console.log("\n💾 Deployment info saved to:", filepath);

  // Display blockchain explorer link
  const explorerUrls: { [key: string]: string } = {
    "sepolia": "https://sepolia.etherscan.io",
    "mumbai": "https://mumbai.polygonscan.com",
    "fuji": "https://testnet.snowtrace.io",
  };

  const explorerUrl = explorerUrls[network];
  if (explorerUrl) {
    console.log("\n🔍 View on Explorer:");
    console.log(`  ${explorerUrl}/address/${contractAddress}`);
  }

  console.log("\n🎉 Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
