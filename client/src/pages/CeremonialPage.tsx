import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Scroll, Zap } from "lucide-react";
import type { CeremonialRitual } from "@shared/schema";

export default function CeremonialPage() {
  const { data: rituals, isLoading } = useQuery<CeremonialRitual[]>({
    queryKey: ["/api/ceremonial-rituals"],
  });

  const [selectedRitual, setSelectedRitual] = useState<string>("");

  const ritual = rituals?.find((r) => r.ritualName === selectedRitual) || rituals?.[0];

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

  if (!rituals || rituals.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Ceremonial Protocol Orchestrator</h1>
          <p className="text-muted-foreground">No ceremonial rituals found in database</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: rituals.length,
    active: rituals.filter(r => r.activationStatus === "active").length,
    pending: rituals.filter(r => r.activationStatus === "pending").length,
    codexSources: new Set(rituals.map(r => r.codexSource)).size,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-2">
          Ceremonial Protocol Orchestrator
        </h1>
        <p className="text-muted-foreground">
          CODEXX & EVOLVERS Act ritual sequencing and activation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rituals</CardTitle>
            <Scroll className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-rituals">
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground">Ceremonial protocols</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently executable</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting activation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Codex Sources</CardTitle>
            <Scroll className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.codexSources}</div>
            <p className="text-xs text-muted-foreground">Source documents</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={ritual?.ritualName} onValueChange={setSelectedRitual}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
          {rituals.map((r) => (
            <TabsTrigger
              key={r.ritualName}
              value={r.ritualName}
              data-testid={`tab-${r.ritualName.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {r.ceremonyType}
            </TabsTrigger>
          ))}
        </TabsList>

        {rituals.map((r) => (
          <TabsContent key={r.ritualName} value={r.ritualName}>
            {ritual && ritual.ritualName === r.ritualName && (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-ceremonial mb-1">
                          {ritual.ritualName}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {ritual.codexSource}
                        </CardDescription>
                      </div>
                      <Badge variant={ritual.activationStatus === "active" ? "default" : "secondary"}>
                        {ritual.activationStatus}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Purpose</h4>
                      <p className="text-muted-foreground">{ritual.purpose}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Required Actors</h4>
                      <div className="flex flex-wrap gap-2">
                        {ritual.requiredActors && ritual.requiredActors.map((actor) => (
                          <Badge key={actor} variant="secondary">
                            {actor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Scroll className="w-4 h-4" />
                        Ceremonial Sequence
                      </h4>
                      <div className="space-y-3">
                        {ritual.sequence.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-medium">
                              {index + 1}
                            </div>
                            <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {ritual.activationStatus === "active" && (
                      <div className="pt-4 border-t">
                        <Button className="w-full" data-testid={`button-activate-${ritual.ceremonyType.toLowerCase().replace(/\s+/g, "-")}`}>
                          <Flame className="w-4 h-4 mr-2" />
                          Initiate {ritual.ceremonyType} Ceremony
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Codex Foundations</CardTitle>
          <CardDescription>
            Source documents and ceremonial frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">CODEXX Assembly Scroll</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Ceremonial and technical framework for scroll-bonded organism concepts using vortex logic and Afrocentric restitution.
              </p>
              <Badge variant="outline">Tribunal-Safe Edition v0.1</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">EVOLVERS Act I</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Gathering of the Four - narrative integration linking character powers to BLEUChain economic tokens.
              </p>
              <Badge variant="outline">Ceremonial PDF Scroll</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">ENATO Codex Constitution</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Sovereign charter establishing π■ MetaVault yield engine and Quarter-Lattice Law protocols.
              </p>
              <Badge variant="outline">Active Charter</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">War Codex v0.1</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Omega-48 doctrine with roster, matchups, and Rules of Engagement for sovereign defense.
              </p>
              <Badge variant="outline">Operational</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
