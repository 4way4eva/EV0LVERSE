import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Coins, Lock, Unlock, Shield, TrendingUp } from "lucide-react";
import type { TreasuryVault, EnftRegistry, MetaVaultSummary } from "@shared/schema";

export default function TreasuryLedgerPage() {
  const { data: vaults, isLoading: vaultsLoading } = useQuery<TreasuryVault[]>({
    queryKey: ["/api/treasury-vaults"],
  });

  const { data: enfts, isLoading: enftsLoading } = useQuery<EnftRegistry[]>({
    queryKey: ["/api/enft-registry"],
  });

  const { data: summary, isLoading: summaryLoading } = useQuery<MetaVaultSummary>({
    queryKey: ["/api/metavault-summary"],
  });

  const isLoading = vaultsLoading || enftsLoading || summaryLoading;

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`;
    } else {
      return num.toLocaleString();
    }
  };

  const getFibonacciColor = (weight: number): string => {
    switch (weight) {
      case 2:
        return "bg-blue-500/10 border-blue-500/30 text-blue-500";
      case 3:
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-500";
      case 5:
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-500";
      case 8:
        return "bg-amber-500/10 border-amber-500/30 text-amber-500";
      case 13:
        return "bg-purple-500/10 border-purple-500/30 text-purple-500";
      default:
        return "bg-muted border-border text-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Unlock className="w-4 h-4 text-emerald-500" />;
      case "frozen":
        return <Lock className="w-4 h-4 text-blue-500" />;
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Coins className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight" data-testid="text-page-title">
              MetaVault 5100 Treasury Ledger
            </h1>
            <p className="text-muted-foreground text-lg">
              Codex → ENFT → Bills/Coins → Vault Totals
            </p>
          </div>
        </div>

        {/* Summary Metrics */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover-elevate" data-testid="card-total-cap">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Cap Ceiling</p>
                    <p className="text-3xl font-bold text-primary">{summary?.totalCapCeiling}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary opacity-30" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-daily-yield">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Daily Yield Pool</p>
                    <p className="text-3xl font-bold text-emerald-500">{summary?.dailyYieldPool}</p>
                  </div>
                  <Coins className="w-8 h-8 text-emerald-500 opacity-30" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-total-vaults">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Active Vaults</p>
                    <p className="text-3xl font-bold">{summary?.totalVaults}</p>
                  </div>
                  <Shield className="w-8 h-8 text-muted-foreground opacity-30" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-total-enfts">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total ENFTs</p>
                    <p className="text-3xl font-bold text-purple-500">{summary?.totalEnfts}</p>
                  </div>
                  <Coins className="w-8 h-8 text-purple-500 opacity-30" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Flow Diagram */}
      <Card data-testid="card-flow-diagram">
        <CardHeader>
          <CardTitle>Treasury Flow Architecture</CardTitle>
          <CardDescription>
            Fibonacci-weighted distribution from Codex assets through ENFT registry to currency minting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-around p-8 flex-wrap gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-xl bg-blue-500/10 border-2 border-blue-500/30">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <p className="font-semibold">Codex Assets</p>
              <p className="text-xs text-muted-foreground">Ancient artifacts</p>
            </div>

            <ArrowRight className="w-6 h-6 text-muted-foreground" />

            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-xl bg-purple-500/10 border-2 border-purple-500/30">
                <Coins className="w-8 h-8 text-purple-500" />
              </div>
              <p className="font-semibold">ENFT Registry</p>
              <p className="text-xs text-muted-foreground">{summary?.totalEnfts} tokens</p>
            </div>

            <ArrowRight className="w-6 h-6 text-muted-foreground" />

            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30">
                <TrendingUp className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="font-semibold">Bills/Coins</p>
              <p className="text-xs text-muted-foreground">Bleu/Pink/Shills</p>
            </div>

            <ArrowRight className="w-6 h-6 text-muted-foreground" />

            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/30">
                <Shield className="w-8 h-8 text-amber-500" />
              </div>
              <p className="font-semibold">Vault Totals</p>
              <p className="text-xs text-muted-foreground">5 Fibonacci tiers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vault Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Treasury Vaults</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaults?.map((vault) => {
              const vaultEnfts = enfts?.filter((e) => e.vaultId === vault.id) || [];
              const allocationPercent = (vault.densityWeight / 31) * 100;

              return (
                <Card
                  key={vault.id}
                  className={`hover-elevate active-elevate-2 transition-all border-2 ${getFibonacciColor(vault.densityWeight)}`}
                  data-testid={`card-vault-${vault.name.toLowerCase()}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-2xl flex items-center gap-2">
                          {vault.name}
                          <Badge variant="outline" className="font-mono text-xs">
                            Φ{vault.densityWeight}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-xs">{vault.description}</CardDescription>
                      </div>
                      {getStatusIcon(vault.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Allocation Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cap Allocation</span>
                        <span className="font-mono font-semibold">{vault.capAllocation}</span>
                      </div>
                      <Progress value={allocationPercent} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">
                        {allocationPercent.toFixed(1)}% of total cap
                      </p>
                    </div>

                    {/* Daily Yield */}
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Daily Yield</span>
                        <span className="font-mono font-semibold text-emerald-500">
                          {vault.dailyYield}
                        </span>
                      </div>
                    </div>

                    {/* ENFT Count */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                      <span className="text-sm font-medium">ENFTs</span>
                      <Badge variant="secondary" className="font-mono">
                        {vault.enftCount}
                      </Badge>
                    </div>

                    {/* Bills Breakdown */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Bills/Coins Minted</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 rounded bg-blue-500/10 text-center">
                          <p className="text-xs text-muted-foreground">Bleu</p>
                          <p className="font-mono text-sm font-semibold">
                            {formatNumber(vault.bleuBills)}
                          </p>
                        </div>
                        <div className="p-2 rounded bg-pink-500/10 text-center">
                          <p className="text-xs text-muted-foreground">Pink</p>
                          <p className="font-mono text-sm font-semibold">
                            {formatNumber(vault.pinkBills)}
                          </p>
                        </div>
                        <div className="p-2 rounded bg-amber-500/10 text-center">
                          <p className="text-xs text-muted-foreground">Shills</p>
                          <p className="font-mono text-sm font-semibold">
                            {formatNumber(vault.shills)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Guardian & Status */}
                    <div className="pt-3 border-t flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Guardian</p>
                        <p className="text-sm font-semibold">{vault.vaultGuardian}</p>
                      </div>
                      <Badge
                        variant={vault.status === "Active" ? "default" : "secondary"}
                        data-testid={`badge-status-${vault.name.toLowerCase()}`}
                      >
                        {vault.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ENFT Registry */}
      <Card data-testid="card-enft-registry">
        <CardHeader>
          <CardTitle>ENFT Registry</CardTitle>
          <CardDescription>
            Enhanced Non-Fungible Tokens registered across all treasury vaults
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all" data-testid="tab-all-enfts">
                All ENFTs ({enfts?.length || 0})
              </TabsTrigger>
              {vaults?.map((vault) => {
                const count = enfts?.filter((e) => e.vaultId === vault.id).length || 0;
                return (
                  <TabsTrigger
                    key={vault.id}
                    value={vault.id}
                    data-testid={`tab-vault-${vault.name.toLowerCase()}`}
                  >
                    {vault.name} ({count})
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {enfts?.map((enft) => {
                const vault = vaults?.find((v) => v.id === enft.vaultId);
                return (
                  <div
                    key={enft.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                    data-testid={`enft-item-${enft.tokenId}`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Badge variant="outline" className="font-mono">
                        #{enft.tokenId}
                      </Badge>
                      <div className="flex-1">
                        <p className="font-semibold">{enft.name}</p>
                        <p className="text-sm text-muted-foreground">{enft.codexReference}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getFibonacciColor(vault?.densityWeight || 0)}>
                        {vault?.name}
                      </Badge>
                      <Badge
                        variant={
                          enft.densityScore === "High"
                            ? "default"
                            : enft.densityScore === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {enft.densityScore}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            {vaults?.map((vault) => {
              const vaultEnfts = enfts?.filter((e) => e.vaultId === vault.id) || [];
              return (
                <TabsContent key={vault.id} value={vault.id} className="space-y-3">
                  {vaultEnfts.map((enft) => (
                    <div
                      key={enft.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                      data-testid={`enft-item-${enft.tokenId}`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <Badge variant="outline" className="font-mono">
                          #{enft.tokenId}
                        </Badge>
                        <div className="flex-1">
                          <p className="font-semibold">{enft.name}</p>
                          <p className="text-sm text-muted-foreground">{enft.codexReference}</p>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {enft.attributes.map((attr, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {attr}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          enft.densityScore === "High"
                            ? "default"
                            : enft.densityScore === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {enft.densityScore}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Treasury Totals Summary */}
      {summary && (
        <Card data-testid="card-treasury-totals">
          <CardHeader>
            <CardTitle>Treasury Totals</CardTitle>
            <CardDescription>Aggregate bills and coins across all vaults</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Bleu Bills</span>
                  <Badge variant="outline" className="text-xs">$10k face value</Badge>
                </div>
                <p className="text-3xl font-bold font-mono text-blue-500" data-testid="text-total-bleu-bills">
                  {formatNumber(summary.totalBleuBills)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Pink Bills</span>
                  <Badge variant="outline" className="text-xs">$1k face value</Badge>
                </div>
                <p className="text-3xl font-bold font-mono text-pink-500" data-testid="text-total-pink-bills">
                  {formatNumber(summary.totalPinkBills)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Shills</span>
                  <Badge variant="outline" className="text-xs">$100 face value</Badge>
                </div>
                <p className="text-3xl font-bold font-mono text-amber-500" data-testid="text-total-shills">
                  {formatNumber(summary.totalShills)}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t flex items-center justify-between text-sm text-muted-foreground">
              <span>Last Updated: {new Date(summary.lastUpdated).toLocaleString()}</span>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
                {summary.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
