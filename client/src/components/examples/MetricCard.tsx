import MetricCard from '../MetricCard';
import { Droplet, Coins, Users, Lock } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <MetricCard 
        label="Total Supply"
        value="1,250,000"
        unit="HC"
        change={12.5}
        icon={<Coins className="h-12 w-12" />}
      />
      <MetricCard 
        label="Reserve Ratio"
        value="52.3"
        unit="%"
        change={0.8}
        icon={<Lock className="h-12 w-12" />}
      />
      <MetricCard 
        label="Water Backed"
        value="625,000"
        unit="m³"
        change={15.2}
        icon={<Droplet className="h-12 w-12" />}
      />
      <MetricCard 
        label="Active Guardians"
        value="847"
        change={-2.1}
        icon={<Users className="h-12 w-12" />}
      />
    </div>
  );
}
