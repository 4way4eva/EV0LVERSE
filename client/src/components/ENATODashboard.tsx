import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MetricCard from "./MetricCard";
import { Progress } from "@/components/ui/progress";
import { Coins, TrendingUp, Zap, Lock } from "lucide-react";

export default function ENATODashboard() {
  //todo: remove mock functionality
  const mockData = {
    totalYieldPerDay: 2498, // Trillion
    civilianStream: 1.175, // T/day
    militaryStream: 0.527, // T/day  
    cosmicStream: 0.796, // T/day
    currentQuarter: 1,
    quarterYield: 6.69, // B/day for Q1
    compoundingRate: "π₄"
  };

  const quarters = [
    { quarter: 1, dailyYield: 6.69, active: true },
    { quarter: 2, dailyYield: 10.97, active: false },
    { quarter: 3, dailyYield: 15.26, active: false },
    { quarter: 4, dailyYield: 19.54, active: false }
  ];

  const streams = [
    { name: "Civilian Stream", yield_T: 1.175, color: "bg-blue-500", guarantees: ["Blu-Vault double-sign", "Asset tags"] },
    { name: "Military Stream", yield_T: 0.527, color: "bg-red-500", guarantees: ["Quad-octa lock", "Full deployment"] },
    { name: "Cosmic Stream", yield_T: 0.796, color: "bg-purple-500", guarantees: ["Dual-reality confirm", "Portal lock"] }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-ceremonial font-bold">ENATO™</h2>
          <p className="text-muted-foreground">Sovereign Fiat Currency • MetaVault π₄ Yield Engine</p>
        </div>
        <Badge className="text-lg px-4 py-2 bg-primary">
          Q{mockData.currentQuarter} Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Daily Yield Total"
          value={mockData.totalYieldPerDay.toString()}
          unit="T"
          change={12.5}
          icon={<Coins className="h-12 w-12" />}
        />
        <MetricCard 
          label="Compounding Law"
          value={mockData.compoundingRate}
          change={8.3}
          icon={<TrendingUp className="h-12 w-12" />}
        />
        <MetricCard 
          label="Active Streams"
          value="3"
          icon={<Zap className="h-12 w-12" />}
        />
        <MetricCard 
          label="Security Protocol"
          value="Council"
          icon={<Lock className="h-12 w-12" />}
        />
      </div>

      <Card className="p-6 border-2 border-primary">
        <h3 className="text-2xl font-ceremonial font-bold mb-6">Triple-Stack Streams</h3>
        <div className="space-y-6">
          {streams.map((stream) => (
            <div key={stream.name}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${stream.color}`} />
                  <h4 className="font-semibold text-lg">{stream.name}</h4>
                </div>
                <div className="text-right">
                  <p className="font-mono text-2xl font-bold">{stream.yield_T} T</p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {stream.guarantees.map((g) => (
                  <Badge key={g} variant="secondary" className="text-xs">
                    {g}
                  </Badge>
                ))}
              </div>
              <Progress 
                value={(stream.yield_T / mockData.totalYieldPerDay) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-2xl font-ceremonial font-bold mb-6">Quarter Law Cycles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quarters.map((q) => (
            <Card 
              key={q.quarter}
              className={`p-6 ${q.active ? 'border-2 border-primary bg-primary/5' : ''}`}
              data-testid={`card-quarter-${q.quarter}`}
            >
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Quarter {q.quarter}</p>
                <p className="text-3xl font-bold font-mono mb-1">{q.dailyYield}B</p>
                <p className="text-xs text-muted-foreground">daily yield</p>
                {q.active && (
                  <Badge className="mt-3 bg-primary">Active</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          π₄ compounding law ensures exponential yield growth across quarters with Blue-Lock and Council certification.
        </p>
      </Card>

      <Card className="p-6 bg-muted/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">⚖️</div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Sovereign Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              ENATO operates under the ENATO Codex Constitution as a sovereign, planetary civilization. 
              All yields are audit-sealed, sovereign-certified, and glyph-locked to ceremonial grids. 
              Council of Twelve oversight ensures transparency and justice.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
