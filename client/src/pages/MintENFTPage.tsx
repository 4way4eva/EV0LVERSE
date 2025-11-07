import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Upload, CheckCircle2, Info } from "lucide-react";
import type { TreasuryVault } from "@shared/schema";

const enftFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  vaultId: z.string().min(1, "Please select a vault"),
  codexLayer: z.string().min(1, "Please select a codex layer"),
  codexReference: z.string().min(1, "Codex reference is required"),
  densityScore: z.enum(["High", "Medium", "Low"]),
  biome: z.string().optional(),
  denomination: z.enum(["Bleu", "Pink", "Shills", "None"]).optional(),
  ceremonyType: z.string().optional(),
  currentOwner: z.string().min(20, "Valid wallet address required"),
  provenanceHash: z.string().min(10, "Provenance hash required"),
});

type ENFTFormData = z.infer<typeof enftFormSchema>;

const CODEX_LAYERS = [
  "Layer 1: Sovereignty Anchor",
  "Layer 2: Treaty Systems",
  "Layer 3: Ceremonial Protocols",
  "Layer 4: War Codex",
  "Layer 5: Mythology Integration",
  "Layer 6: Environmental Mapping",
  "Layer 7: Treasury Mechanics",
  "Layer 8: MetaSchool Framework",
  "Layer 9: MetaNation Structures",
  "Layer 10: MetaGalaxy Consciousness",
];

const BIOMES = [
  "Oceanic Territories",
  "Desert Sanctuaries",
  "Frozen Peaks",
  "Forest Kingdoms",
  "Volcanic Zones",
  "Sky Citadels",
];

export default function MintENFTPage() {
  const { toast } = useToast();
  const [mintingStep, setMintingStep] = useState<"form" | "metadata" | "minting" | "complete">("form");
  const [metadataUrl, setMetadataUrl] = useState<string>("");
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);

  const { data: vaults, isLoading: vaultsLoading } = useQuery<TreasuryVault[]>({
    queryKey: ["/api/treasury-vaults"],
  });

  const form = useForm<ENFTFormData>({
    resolver: zodResolver(enftFormSchema),
    defaultValues: {
      name: "",
      description: "",
      vaultId: "",
      codexLayer: "",
      codexReference: "",
      densityScore: "Medium",
      biome: "",
      denomination: "None",
      ceremonyType: "",
      currentOwner: "",
      provenanceHash: "",
    },
  });

  const metadataMutation = useMutation({
    mutationFn: async (data: ENFTFormData) => {
      const response = await apiRequest("/api/enfts/create-metadata", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          imageIpfsUrl: "ipfs://placeholder",
          vaultId: data.vaultId,
          provenanceHash: data.provenanceHash,
          codexLayer: data.codexLayer,
          biome: data.biome,
          denomination: data.denomination !== "None" ? data.denomination : undefined,
          ceremonyType: data.ceremonyType,
          additionalAttributes: [
            { trait_type: "Density Score", value: data.densityScore },
            { trait_type: "Codex Reference", value: data.codexReference },
          ],
        }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setMetadataUrl(data.metadataUrl);
      setMintingStep("metadata");
      toast({
        title: "Metadata Created",
        description: "IPFS metadata uploaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Metadata Upload Failed",
        description: error.message || "Failed to create metadata",
        variant: "destructive",
      });
    },
  });

  const mintMutation = useMutation({
    mutationFn: async (data: ENFTFormData & { metadataUrl: string; tokenId: number }) => {
      const response = await apiRequest("/api/enfts/register", {
        method: "POST",
        body: JSON.stringify({
          tokenId: data.tokenId,
          vaultId: data.vaultId,
          name: data.name,
          codexReference: data.codexReference,
          densityScore: data.densityScore,
          metadata: data.metadataUrl,
          provenanceHash: data.provenanceHash,
          mintTransaction: "0x000000000000000000000000000000000000000000000000000000000000000",
          currentOwner: data.currentOwner,
          attributes: [data.codexLayer, data.biome || "", data.denomination || ""].filter(Boolean),
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      setMintingStep("complete");
      queryClient.invalidateQueries({ queryKey: ["/api/enfts"] });
      toast({
        title: "ENFT Minted Successfully!",
        description: "Your ceremonial token has been registered",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Minting Failed",
        description: error.message || "Failed to mint ENFT",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ENFTFormData) => {
    setMintingStep("metadata");
    metadataMutation.mutate(data);
  };

  const handleMint = () => {
    const formData = form.getValues();
    const tokenId = Math.floor(Math.random() * 1000000);
    setMintedTokenId(tokenId);
    setMintingStep("minting");
    
    mintMutation.mutate({
      ...formData,
      metadataUrl,
      tokenId,
    });
  };

  const handleReset = () => {
    form.reset();
    setMintingStep("form");
    setMetadataUrl("");
    setMintedTokenId(null);
  };

  if (vaultsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" data-testid="loader-vaults" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Mint ENFT</h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Create an Enhanced Non-Fungible Token linked to the BLEULIONTREASURY™ sovereign system
        </p>
      </div>

      {mintingStep === "complete" ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <CardTitle data-testid="text-success-title">ENFT Minted Successfully!</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Token ID</Label>
              <p className="text-2xl font-mono font-bold" data-testid="text-token-id">#{mintedTokenId}</p>
            </div>
            <div>
              <Label>Metadata URL</Label>
              <p className="text-sm font-mono break-all text-muted-foreground" data-testid="text-metadata-url">
                {metadataUrl}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReset} data-testid="button-mint-another">
                Mint Another ENFT
              </Button>
              <Button variant="outline" asChild data-testid="link-view-treasury">
                <a href="/treasury-ledger">View Treasury Ledger</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle data-testid="text-form-title">ENFT Details</CardTitle>
            <CardDescription data-testid="text-form-description">
              Configure your ceremonial token metadata and vault association
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ENFT Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Codex - Witness #0001" 
                          {...field} 
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ceremonial description of this ENFT..."
                          className="min-h-24"
                          {...field}
                          data-testid="input-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="vaultId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Treasury Vault</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-vault">
                              <SelectValue placeholder="Select vault" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vaults?.map((vault) => (
                              <SelectItem key={vault.id} value={vault.id} data-testid={`option-vault-${vault.id}`}>
                                {vault.name} (Weight: {vault.densityWeight})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="codexLayer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Codex Layer</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-codex-layer">
                              <SelectValue placeholder="Select layer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CODEX_LAYERS.map((layer) => (
                              <SelectItem key={layer} value={layer} data-testid={`option-layer-${layer}`}>
                                {layer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="codexReference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Codex Reference</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., CODEXX.Treaty.001" 
                            {...field}
                            data-testid="input-codex-reference"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="densityScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Density Score</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-density-score">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High" data-testid="option-density-high">High</SelectItem>
                            <SelectItem value="Medium" data-testid="option-density-medium">Medium</SelectItem>
                            <SelectItem value="Low" data-testid="option-density-low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="biome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biome (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-biome">
                              <SelectValue placeholder="Select biome" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BIOMES.map((biome) => (
                              <SelectItem key={biome} value={biome} data-testid={`option-biome-${biome}`}>
                                {biome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="denomination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Denomination (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-denomination">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="None" data-testid="option-denom-none">None</SelectItem>
                            <SelectItem value="Bleu" data-testid="option-denom-bleu">Bleu ($10k)</SelectItem>
                            <SelectItem value="Pink" data-testid="option-denom-pink">Pink ($1k)</SelectItem>
                            <SelectItem value="Shills" data-testid="option-denom-shills">Shills ($100)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ceremonyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ceremony Type (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Sovereignty Oath, Treaty Seal" 
                          {...field}
                          data-testid="input-ceremony-type"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentOwner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Wallet Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="0x..." 
                          className="font-mono text-sm"
                          {...field}
                          data-testid="input-owner-address"
                        />
                      </FormControl>
                      <FormDescription>
                        Ethereum wallet address that will own this ENFT
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="provenanceHash"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provenance Hash</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="SHA3-256 hash of ceremonial scroll" 
                          className="font-mono text-sm"
                          {...field}
                          data-testid="input-provenance-hash"
                        />
                      </FormControl>
                      <FormDescription>
                        Cryptographic verification of source documentation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-muted/50 p-4 rounded-lg flex gap-3">
                  <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Blockchain Deployment Required</p>
                    <p>
                      To mint ENFTs on-chain, deploy the smart contracts to testnets using the deployment guide 
                      in <code className="bg-background px-1 rounded">BLOCKCHAIN_DEPLOYMENT.md</code>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {mintingStep === "form" && (
                    <Button 
                      type="submit" 
                      disabled={metadataMutation.isPending}
                      data-testid="button-create-metadata"
                    >
                      {metadataMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Metadata...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Create Metadata
                        </>
                      )}
                    </Button>
                  )}

                  {mintingStep === "metadata" && (
                    <Button 
                      type="button"
                      onClick={handleMint}
                      disabled={mintMutation.isPending}
                      data-testid="button-mint-enft"
                    >
                      {mintMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Minting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Mint ENFT
                        </>
                      )}
                    </Button>
                  )}

                  {mintingStep !== "form" && (
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
