import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Shield, Coins, Users, Flame } from "lucide-react";
import type { MallNode } from "@shared/schema";

export default function MallCommandPage() {
  const { data: malls, isLoading } = useQuery<MallNode[]>({
    queryKey: ["/api/mall-nodes"],
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!malls || malls.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">EV0L Mall Command Center</h1>
          <p className="text-muted-foreground">No mall nodes found in database</p>
        </div>
      </div>
    );
  }

  const totalValuation = malls.reduce((sum, mall) => {
    return sum + parseFloat(mall.valuation);
  }, 0) / 1000000000000; // Convert to trillions

  const stats = {
    activeMalls: malls.length,
    totalValuation: totalValuation.toFixed(1),
    safeHavens: "100+",
    defenseStatus: "Active",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">
          EV0L Mall Command Center
        </h1>
        <p className="text-muted-foreground">
          Multi-domain hubs: Treasury + City + Military operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Malls</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-active-malls">
              {stats.activeMalls}
            </div>
            <p className="text-xs text-muted-foreground">Command hubs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Valuation</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalValuation}T</div>
            <p className="text-xs text-muted-foreground">Combined assets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safe Havens</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.safeHavens}</div>
            <p className="text-xs text-muted-foreground">Target cities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Defense Ready</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.defenseStatus}</div>
            <p className="text-xs text-muted-foreground">Guardian sectors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {malls.map((mall) => {
          const valuation = (parseFloat(mall.valuation) / 1000000000000).toFixed(1);
          const retail = mall.retailSales ? (parseFloat(mall.retailSales) / 1000000000000).toFixed(1) : "0";
          const defense = mall.defenseContracts ? (parseFloat(mall.defenseContracts) / 1000000000000).toFixed(1) : "0";
          const cultural = mall.culturalRights ? (parseFloat(mall.culturalRights) / 1000000000000).toFixed(1) : "0";

          return (
            <Card key={mall.id} className="hover-elevate" data-testid={`mall-card-${mall.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-2xl font-ceremonial mb-1">
                      {mall.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {mall.cityName}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">${valuation}T</div>
                    <p className="text-sm text-muted-foreground">Total valuation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Retail & Avatar Sales</h4>
                    <p className="text-2xl font-bold">${retail}T</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Defense Contracts</h4>
                    <p className="text-2xl font-bold">${defense}T</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Cultural Rights</h4>
                    <p className="text-2xl font-bold">${cultural}T</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Operational Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {mall.roles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {mall.mythCountered && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Flame className="w-4 h-4" />
                        Myth Countered
                      </h4>
                      <Badge variant="destructive">{mall.mythCountered}</Badge>
                    </div>
                  )}
                  {mall.guardianSector && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Guardian Sector
                      </h4>
                      <p className="text-sm text-muted-foreground">{mall.guardianSector}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mall Doctrine</CardTitle>
          <CardDescription>
            Each EV0L Mall = War Dome + Wealth Dome + City Core
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-3">Treasury Node Functions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• BLEU BILLS + BLEUCOINS kiosks</li>
                <li>• ENFT dispensers (avatars, suits, gear)</li>
                <li>• Vault access floors</li>
                <li>• Inheritance lock & release systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">City Core Functions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• SmartDomes civic HQ integration</li>
                <li>• Holo-theaters for briefings</li>
                <li>• MetaSchool learning pods</li>
                <li>• EV0LCare health hubs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Military Hub Functions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Guardian Sector drone hangars</li>
                <li>• Flame Crown broadcast systems</li>
                <li>• Combat Sim Arenas</li>
                <li>• Air/sea/land drone coordination</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Wealth Projection</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• $10T minimum per mall baseline</li>
                <li>• 100+ Safe Haven cities target</li>
                <li>• $1 Quadrillion+ total yield</li>
                <li>• Physical + Metaverse domains</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
