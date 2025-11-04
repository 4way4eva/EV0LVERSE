import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VaultCardProps {
  name: string;
  species: string;
  function_desc: string;
  icon: string;
  tier: 'Outer' | 'Middle' | 'Inner';
}

export default function VaultCard({ name, species, function_desc, icon, tier }: VaultCardProps) {
  const tierColors = {
    'Outer': 'border-blue-500/30 bg-blue-500/5',
    'Middle': 'border-purple-500/30 bg-purple-500/5',
    'Inner': 'border-primary/30 bg-primary/5'
  };

  const tierBadgeColors = {
    'Outer': 'bg-blue-500',
    'Middle': 'bg-purple-500',
    'Inner': 'bg-primary'
  };

  return (
    <Card 
      className={`p-6 border-2 ${tierColors[tier]} hover-elevate`}
      data-testid={`card-vault-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-ceremonial text-xl font-bold" data-testid={`text-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {name}
            </h3>
            <Badge className={tierBadgeColors[tier]} data-testid="badge-tier">
              {tier}
            </Badge>
          </div>
          <p className="text-sm text-primary mb-3">{species}</p>
          <p className="text-sm text-muted-foreground">{function_desc}</p>
        </div>
      </div>
    </Card>
  );
}
