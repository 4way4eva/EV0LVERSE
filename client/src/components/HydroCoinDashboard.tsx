import MetricCard from "./MetricCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplet, Coins, Lock, TrendingUp } from "lucide-react";
import hydroCoinImage from "@assets/generated_images/HydroCoin_token_visual_f3e602f6.png";

export default function HydroCoinDashboard() {
  //todo: remove mock functionality
  const mockData = {
    totalSupply: "1,250,000",
    reserveRatio: 52.3,
    waterBacked: "625,000",
    velocity: 11.8
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <img 
          src={hydroCoinImage} 
          alt="HydroCoin"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-4xl font-display font-bold">HydroCoin</h2>
          <p className="text-muted-foreground">Water-backed sovereign currency</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total Supply"
          value={mockData.totalSupply}
          unit="HC"
          change={12.5}
          icon={<Coins className="h-12 w-12" />}
        />
        <MetricCard 
          label="Reserve Ratio"
          value={mockData.reserveRatio.toString()}
          unit="%"
          change={0.8}
          icon={<Lock className="h-12 w-12" />}
        />
        <MetricCard 
          label="Water Backed"
          value={mockData.waterBacked}
          unit="m³"
          change={15.2}
          icon={<Droplet className="h-12 w-12" />}
        />
        <MetricCard 
          label="Velocity (Annual)"
          value={mockData.velocity.toString()}
          unit="tx/yr"
          change={3.4}
          icon={<TrendingUp className="h-12 w-12" />}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Reserve Health</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Current Reserve Ratio</span>
              <span className="font-mono font-semibold">{mockData.reserveRatio}%</span>
            </div>
            <Progress value={mockData.reserveRatio} className="h-3" />
          </div>
          <p className="text-sm text-muted-foreground">
            Reserve ratio above 50% threshold. System stable with {((mockData.reserveRatio - 50) / 50 * 100).toFixed(1)}% buffer.
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Distribution Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Guardian Payroll', percentage: 35 },
            { name: 'AbyssWalk™ Incentives', percentage: 25 },
            { name: 'ENFT Relic Sales', percentage: 20 },
            { name: 'HydroCard Issuance', percentage: 20 }
          ].map((channel) => (
            <div key={channel.name}>
              <div className="flex justify-between text-sm mb-2">
                <span>{channel.name}</span>
                <span className="font-mono">{channel.percentage}%</span>
              </div>
              <Progress value={channel.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
