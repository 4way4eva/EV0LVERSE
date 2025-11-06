import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Zap, Moon } from "lucide-react";
import type { MythologyDeity } from "@shared/schema";

export default function MythologyConsolePage() {
  const { data: deities, isLoading } = useQuery<MythologyDeity[]>({
    queryKey: ["/api/mythology-deities"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading Divine Protocols...</p>
        </div>
      </div>
    );
  }

  const getDeityIcon = (name: string) => {
    if (name.includes("Nike")) return Sparkles;
    if (name.includes("Hermes")) return Zap;
    if (name.includes("Nyx")) return Moon;
    return Sparkles;
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight" data-testid="text-mythology-title">
          Mythology & Divine Protocol Console
        </h1>
        <p className="text-lg text-muted-foreground">
          Ancient deities encoded as living EVOLVERSE systems — Nike, Hermes, Nyx/NØX13
        </p>
      </div>

      {/* Deity Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {deities?.map((deity) => {
          const Icon = getDeityIcon(deity.name);
          const isNox = deity.name.includes("Nyx");
          
          return (
            <Card 
              key={deity.id} 
              className={`overflow-hidden ${isNox ? 'border-purple-500/50 bg-gradient-to-br from-purple-950/20 to-background' : ''}`}
              data-testid={`card-deity-${deity.name.toLowerCase().replace(/\s/g, '-')}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-6 h-6" style={{ color: deity.primaryColor }} />
                      <CardTitle className="text-2xl" data-testid={`text-deity-name-${deity.name.toLowerCase()}`}>
                        {deity.name}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{deity.greekName}</span>
                      <span>•</span>
                      <span>{deity.romanName}</span>
                    </div>
                  </div>
                  <div className="text-4xl" data-testid={`icon-deity-${deity.name.toLowerCase()}`}>
                    {deity.iconSymbol}
                  </div>
                </div>
                <CardDescription className="pt-2" data-testid={`text-deity-domain-${deity.name.toLowerCase()}`}>
                  {deity.domain}
                </CardDescription>
                {deity.gateNumber && (
                  <Badge variant="secondary" className="mt-2 w-fit" data-testid={`badge-gate-${deity.gateNumber}`}>
                    Gate {deity.gateNumber} - Shadow Governance
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Tabs defaultValue="evol" className="w-full">
                  <TabsList className="grid w-full grid-cols-3" data-testid={`tabs-deity-${deity.name.toLowerCase()}`}>
                    <TabsTrigger value="evol" data-testid={`tab-evol-${deity.name.toLowerCase()}`}>EV0L</TabsTrigger>
                    <TabsTrigger value="protocols" data-testid={`tab-protocols-${deity.name.toLowerCase()}`}>Protocols</TabsTrigger>
                    <TabsTrigger value="classical" data-testid={`tab-classical-${deity.name.toLowerCase()}`}>Classical</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="evol" className="space-y-3 mt-4" data-testid={`content-evol-${deity.name.toLowerCase()}`}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">EV0LVERSE Encoding</h4>
                      <ul className="space-y-2">
                        {deity.evolEncoding.map((encoding, idx) => (
                          <li 
                            key={idx} 
                            className="text-sm flex items-start gap-2"
                            data-testid={`text-evol-encoding-${idx}`}
                          >
                            <span className="text-primary mt-0.5">▸</span>
                            <span>{encoding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="protocols" className="space-y-3 mt-4" data-testid={`content-protocols-${deity.name.toLowerCase()}`}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">Reactive Protocols</h4>
                      <ul className="space-y-2">
                        {deity.reactiveProtocols.map((protocol, idx) => (
                          <li 
                            key={idx} 
                            className="text-sm flex items-start gap-2"
                            data-testid={`text-protocol-${idx}`}
                          >
                            <span className="text-primary mt-0.5">◆</span>
                            <span>{protocol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="classical" className="space-y-3 mt-4" data-testid={`content-classical-${deity.name.toLowerCase()}`}>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Classical Symbols</h4>
                        <div className="flex flex-wrap gap-2">
                          {deity.classicalSymbols.map((symbol, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-xs"
                              data-testid={`badge-classical-${idx}`}
                            >
                              {symbol}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Modern Activations</h4>
                        <ul className="space-y-1">
                          {deity.modernActivations.map((activation, idx) => (
                            <li 
                              key={idx} 
                              className="text-sm text-muted-foreground"
                              data-testid={`text-modern-${idx}`}
                            >
                              • {activation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {deity.ceremonyType && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">Ceremony Type:</span>
                      <Badge variant="secondary" data-testid={`badge-ceremony-${deity.name.toLowerCase()}`}>
                        {deity.ceremonyType}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* NØX13 Gate System Explanation */}
      {deities?.some(d => d.gateNumber === 13) && (
        <Card className="border-purple-500/50 bg-gradient-to-br from-purple-950/10 to-background" data-testid="card-nox13-system">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-purple-400" />
              NØX13 Gate System
            </CardTitle>
            <CardDescription>The 13th seal protocol — where all time splits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Gate Phases (NØX1-NØX12)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li data-testid="text-gate-phase-1">• Dream protocols and latency shifts</li>
                  <li data-testid="text-gate-phase-2">• Checkout mirrors and night phases</li>
                  <li data-testid="text-gate-phase-3">• Monthly rhythm cycles</li>
                  <li data-testid="text-gate-phase-4">• Jetsonian-based sale windows</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">NØX13 Override</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li data-testid="text-gate-override-1">• Hidden fate override capability</li>
                  <li data-testid="text-gate-override-2">• Reversal loop access</li>
                  <li data-testid="text-gate-override-3">• Access to Chaos protocols</li>
                  <li data-testid="text-gate-override-4">• Admin override for platform resets</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
