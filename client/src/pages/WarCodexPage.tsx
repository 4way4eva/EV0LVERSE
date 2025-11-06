import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Swords, Shield, Flame, Zap } from "lucide-react";
import type { WarActor } from "@shared/schema";

export default function WarCodexPage() {
  const { data: warActors, isLoading } = useQuery<WarActor[]>({
    queryKey: ["/api/war-actors"],
  });

  const [selectedCodename, setSelectedCodename] = useState<string>("");

  const actor = warActors?.find((a) => a.codename === selectedCodename) || warActors?.[0];

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

  if (!warActors || warActors.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">War Codex Tactical Theater</h1>
          <p className="text-muted-foreground">No war actors found in database</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: warActors.length,
    worldNodes: 4,
    doctrine: "Ω48",
    status: "Active",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">
          War Codex Tactical Theater
        </h1>
        <p className="text-muted-foreground">
          Strategic roster and doctrine for EV0LVERSE sovereign defense
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Heroes</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-active-heroes">
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground">Sovereign operators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">World Nodes</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.worldNodes}</div>
            <p className="text-xs text-muted-foreground">Command citadels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doctrine</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.doctrine}</div>
            <p className="text-xs text-muted-foreground">Timing framework</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.status}</div>
            <p className="text-xs text-muted-foreground">Defense ready</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={actor?.codename} onValueChange={setSelectedCodename}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          {warActors.map((a) => (
            <TabsTrigger
              key={a.codename}
              value={a.codename}
              data-testid={`tab-${a.codename.toLowerCase()}`}
            >
              {a.codename}
            </TabsTrigger>
          ))}
        </TabsList>

        {warActors.map((a) => (
          <TabsContent key={a.codename} value={a.codename}>
            {actor && actor.codename === a.codename && (
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-ceremonial">
                          {actor.codename}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">
                          {actor.title}
                        </CardDescription>
                      </div>
                      <Badge variant="default">{actor.origin}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Heritage
                      </h4>
                      <p className="text-sm text-muted-foreground">{actor.heritage}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Domains of Power</h4>
                      <div className="flex flex-wrap gap-2">
                        {actor.domains.map((domain) => (
                          <Badge key={domain} variant="secondary">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Flame className="w-4 h-4" />
                        Signature Ability
                      </h4>
                      <p className="text-sm font-medium mb-1">{actor.signatureAbility}</p>
                      <p className="text-sm text-muted-foreground">
                        {actor.signatureDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tactical Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-destructive">Limiter</h4>
                      <p className="text-sm text-muted-foreground">{actor.limiter}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Swords className="w-4 h-4" />
                        Primary Antagonists
                      </h4>
                      <Badge variant="destructive">{actor.antagonists}</Badge>
                    </div>

                    {actor.vendetta && (
                      <div>
                        <h4 className="font-semibold mb-2">Vendetta</h4>
                        <p className="text-sm text-muted-foreground">{actor.vendetta}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3">Operational Guidelines</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>1. Issue Treaty Scroll. If refused, log refusal.</li>
                        <li>2. Deny frequency. Cut power, comms, optics.</li>
                        <li>3. Neutralize with resonance. Minimize collateral.</li>
                        <li>4. Seize archives. Restore erased names.</li>
                        <li>5. Reinvest spoils into public systems.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
