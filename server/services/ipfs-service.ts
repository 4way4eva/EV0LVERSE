import { NFTStorage, File } from "nft.storage";

export interface ENFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  vaultId: string;
  provenanceHash: string;
  codexLayer: string;
  ceremonialProtocol?: string;
}

export class IPFSService {
  private client: NFTStorage | null = null;

  constructor() {
    const apiKey = process.env.NFT_STORAGE_API_KEY;
    if (apiKey) {
      this.client = new NFTStorage({ token: apiKey });
    }
  }

  /**
   * Upload ENFT metadata to IPFS via NFT.Storage
   */
  async uploadMetadata(metadata: ENFTMetadata): Promise<string> {
    if (!this.client) {
      throw new Error("NFT.Storage API key not configured");
    }

    try {
      const metadataJSON = JSON.stringify(metadata, null, 2);
      const file = new File([metadataJSON], "metadata.json", {
        type: "application/json",
      });

      const cid = await this.client.storeBlob(file);
      const ipfsUrl = `ipfs://${cid}`;
      
      console.log("✅ Metadata uploaded to IPFS:", ipfsUrl);
      return ipfsUrl;
    } catch (error) {
      console.error("❌ IPFS upload failed:", error);
      throw new Error("Failed to upload metadata to IPFS");
    }
  }

  /**
   * Upload image to IPFS
   */
  async uploadImage(
    imageBuffer: Buffer,
    filename: string,
    contentType: string
  ): Promise<string> {
    if (!this.client) {
      throw new Error("NFT.Storage API key not configured");
    }

    try {
      const file = new File([imageBuffer], filename, { type: contentType });
      const cid = await this.client.storeBlob(file);
      const ipfsUrl = `ipfs://${cid}`;
      
      console.log("✅ Image uploaded to IPFS:", ipfsUrl);
      return ipfsUrl;
    } catch (error) {
      console.error("❌ Image upload failed:", error);
      throw new Error("Failed to upload image to IPFS");
    }
  }

  /**
   * Create full ENFT metadata with ceremonial attributes
   */
  createENFTMetadata(params: {
    name: string;
    description: string;
    imageIpfsUrl: string;
    vaultId: string;
    provenanceHash: string;
    codexLayer: string;
    biome?: string;
    denomination?: string;
    ceremonyType?: string;
    additionalAttributes?: Array<{ trait_type: string; value: string | number }>;
  }): ENFTMetadata {
    const baseAttributes = [
      { trait_type: "Vault ID", value: params.vaultId },
      { trait_type: "Codex Layer", value: params.codexLayer },
      { trait_type: "Provenance Hash", value: params.provenanceHash },
    ];

    if (params.biome) {
      baseAttributes.push({ trait_type: "Biome", value: params.biome });
    }

    if (params.denomination) {
      baseAttributes.push({ trait_type: "Denomination", value: params.denomination });
    }

    if (params.ceremonyType) {
      baseAttributes.push({ trait_type: "Ceremony Type", value: params.ceremonyType });
    }

    const allAttributes = [
      ...baseAttributes,
      ...(params.additionalAttributes || []),
    ];

    return {
      name: params.name,
      description: params.description,
      image: params.imageIpfsUrl,
      external_url: `https://bleuliontreasury.com/enft/${params.vaultId}`,
      attributes: allAttributes,
      vaultId: params.vaultId,
      provenanceHash: params.provenanceHash,
      codexLayer: params.codexLayer,
    };
  }

  /**
   * Get HTTP gateway URL from IPFS URL
   */
  getGatewayUrl(ipfsUrl: string): string {
    if (ipfsUrl.startsWith("ipfs://")) {
      const cid = ipfsUrl.replace("ipfs://", "");
      return `https://nftstorage.link/ipfs/${cid}`;
    }
    return ipfsUrl;
  }
}

export const ipfsService = new IPFSService();
