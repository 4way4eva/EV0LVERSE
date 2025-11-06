import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Database, Shield, Coins, Globe2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { OverscaleDomain } from "@shared/schema";

export default function OverscaleMatrixPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: domains, isLoading } = useQuery<OverscaleDomain[]>({
    queryKey: ["/api/overscale-domains"],
  });

  const seedMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/overscale-domains/seed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/overscale-domains"] });
      toast({
        title: "Matrix Seeded",
        description: "177 domains loaded into Overscale Matrix",
      });
    },
  });

  const filteredDomains = domains?.filter((domain) =>
    domain.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.coinFlow.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: domains?.length || 0,
    vaults: new Set(domains?.map(d => d.vault) || []).size,
    coins: new Set(domains?.map(d => d.coinFlow) || []).size,
    guards: new Set(domains?.map(d => d.guard) || []).size,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">
          Overscale Matrix Control Tower
        </h1>
        <p className="text-muted-foreground">
          177 global domains under EV0L sovereignty framework
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Domains</CardTitle>
            <Globe2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-domains">
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground">
              Operational sectors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vaults</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-vaults">
              {stats.vaults}
            </div>
            <p className="text-xs text-muted-foreground">
              Treasury repositories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coin Flows</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-coins">
              {stats.coins}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique currencies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guard Systems</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-guards">
              {stats.guards}
            </div>
            <p className="text-xs text-muted-foreground">
              Security protocols
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Domain Registry</CardTitle>
              <CardDescription>
                Real-time view of all overscale operations
              </CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search domains or coins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-domains"
                />
              </div>
              {(!domains || domains.length === 0) && (
                <Button
                  onClick={() => seedMutation.mutate()}
                  disabled={seedMutation.isPending}
                  data-testid="button-seed-matrix"
                >
                  {seedMutation.isPending ? "Seeding..." : "Seed Matrix"}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredDomains && filteredDomains.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Coin Flow</TableHead>
                    <TableHead>Vault</TableHead>
                    <TableHead>Guard</TableHead>
                    <TableHead>Metric Lift</TableHead>
                    <TableHead>Attack Surface</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDomains.map((domain) => (
                    <TableRow key={domain.id} data-testid={`domain-row-${domain.domain.toLowerCase().replace(/\s+/g, "-")}`}>
                      <TableCell className="font-medium">{domain.domain}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{domain.coinFlow}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {domain.vault}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{domain.guard}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {domain.metricLift}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {domain.ev0lAttackSurface}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Domains Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try a different search term" : "Seed the matrix to load domain data"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
