import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Token {
  name: string;
  symbol: string;
  class: string;
  purpose: string;
  affiliation: string;
  supply?: string;
  icon: string;
}

export default function MultiTokenEconomy() {
  //todo: remove mock functionality
  const tokens: Token[] = [
    { name: "Blu-Tillion", symbol: "BLU", class: "Utility", purpose: "Universal currency, gas for rituals, governance", affiliation: "All platforms", supply: "∞", icon: "💎" },
    { name: "PraiseCoin", symbol: "PRAISE", class: "Reward", purpose: "Community acknowledgment, tribute flows", affiliation: "Cultural ceremonies", supply: "Generated", icon: "🙏" },
    { name: "HydroCoin", symbol: "HC", class: "Asset-Backed", purpose: "Water-backed sovereign currency", affiliation: "Resource vault", supply: "1.25M", icon: "💧" },
    { name: "ENATO", symbol: "ENATO", class: "Fiat", purpose: "Sovereign planetary currency", affiliation: "Nation-state", supply: "MetaVault", icon: "⚖️" },
    { name: "RARELY 1if1", symbol: "RARE1", class: "Governance", purpose: "Mythic governance, lineage anchor", affiliation: "Council", supply: "1", icon: "👑" },
    { name: "PlasmaRain", symbol: "RAIN", class: "Cultural", purpose: "Culture yield, festival commerce", affiliation: "DREAMKAM", supply: "Event-based", icon: "🌧️" },
    { name: "SpaceBar Coin", symbol: "SBC", class: "Trade", purpose: "Trade fuel, refine credit", affiliation: "BLEUFleet", supply: "Orbital", icon: "🚀" },
    { name: "Jewel RARE", symbol: "JRARE", class: "Prestige", purpose: "Vault prestige, ritual display", affiliation: "Cryo-forge", supply: "Limited", icon: "💎" }
  ];

  const tokensByClass = {
    "Utility & Governance": tokens.filter(t => t.class === "Utility" || t.class === "Governance"),
    "Asset-Backed & Fiat": tokens.filter(t => t.class === "Asset-Backed" || t.class === "Fiat"),
    "Cultural & Prestige": tokens.filter(t => t.class === "Cultural" || t.class === "Prestige" || t.class === "Reward"),
    "Trade & Commerce": tokens.filter(t => t.class === "Trade")
  };

  const TokenCard = ({ token }: { token: Token }) => (
    <Card className="p-6 hover-elevate" data-testid={`card-token-${token.symbol}`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl">{token.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-bold text-lg">{token.name}</h4>
              <p className="text-sm text-muted-foreground font-mono">{token.symbol}</p>
            </div>
            <Badge variant="secondary">{token.class}</Badge>
          </div>
          <p className="text-sm mb-3">{token.purpose}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Affiliation: {token.affiliation}</span>
            {token.supply && (
              <span className="font-mono font-semibold">Supply: {token.supply}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-display font-bold mb-2">Multi-Token Economy</h2>
        <p className="text-muted-foreground">
          BLEUChain sovereign token spectrum powering the EvolVerse ecosystem
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="all" data-testid="tab-all-tokens">All Tokens</TabsTrigger>
          <TabsTrigger value="utility" data-testid="tab-utility">Utility</TabsTrigger>
          <TabsTrigger value="asset" data-testid="tab-asset">Asset-Backed</TabsTrigger>
          <TabsTrigger value="cultural" data-testid="tab-cultural">Cultural</TabsTrigger>
          <TabsTrigger value="trade" data-testid="tab-trade">Trade</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <TokenCard key={token.symbol} token={token} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="utility" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tokensByClass["Utility & Governance"].map((token) => (
              <TokenCard key={token.symbol} token={token} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="asset" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tokensByClass["Asset-Backed & Fiat"].map((token) => (
              <TokenCard key={token.symbol} token={token} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cultural" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokensByClass["Cultural & Prestige"].map((token) => (
              <TokenCard key={token.symbol} token={token} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trade" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tokensByClass["Trade & Commerce"].map((token) => (
              <TokenCard key={token.symbol} token={token} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="p-6 bg-primary/5 border-2 border-primary">
        <h3 className="text-xl font-ceremonial font-bold mb-4">Economic Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Token Interoperability</h4>
            <p className="text-sm text-muted-foreground">
              All tokens operate on BLEUChain with cross-platform compatibility, enabling seamless exchange 
              between ceremonial, governance, and commercial functions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Yield Distribution</h4>
            <p className="text-sm text-muted-foreground">
              MetaVault π₄ compounding ensures fair distribution across streams: Guardian Payroll, 
              AbyssWalk™ Incentives, ENFT Relic Sales, and ceremonial rewards.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
