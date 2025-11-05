import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface HeroCardProps {
  name: string;
  lineage: string;
  house: string;
  archetype: string;
  abilities: string[];
  attributes: string[];
  image?: string;
  onViewDetails?: () => void;
}

export default function HeroCard({ 
  name, 
  lineage, 
  house, 
  archetype, 
  abilities, 
  attributes,
  image,
  onViewDetails 
}: HeroCardProps) {
  const houseColors: Record<string, string> = {
    'Evolutionary Titans': 'border-green-500/30 bg-green-500/5',
    'Mechanist Brotherhood': 'border-blue-500/30 bg-blue-500/5',
    'Order of Myth': 'border-purple-500/30 bg-purple-500/5',
    'Guild of Shadows': 'border-gray-500/30 bg-gray-500/5'
  };

  const houseIcons: Record<string, string> = {
    'Evolutionary Titans': '🧬',
    'Mechanist Brotherhood': '⚙️',
    'Order of Myth': '⚡',
    'Guild of Shadows': '🌑'
  };

  return (
    <Card 
      className={`p-6 border-2 ${houseColors[house] || ''} hover-elevate`}
      data-testid={`card-hero-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start gap-4">
        <div className="text-5xl">{houseIcons[house] || '⭐'}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-ceremonial text-xl font-bold mb-1" data-testid="text-hero-name">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">{lineage}</p>
            </div>
            <Badge variant="secondary">{archetype}</Badge>
          </div>

          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">House</p>
            <p className="text-sm font-semibold">{house}</p>
          </div>

          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Primary Abilities</p>
            <div className="flex flex-wrap gap-1">
              {abilities.slice(0, 3).map((ability) => (
                <Badge key={ability} variant="outline" className="text-xs">
                  {ability}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Attributes</p>
            <div className="flex flex-wrap gap-1">
              {attributes.map((attr) => (
                <Badge key={attr} className="text-xs bg-primary/20">
                  {attr}
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-2"
            onClick={onViewDetails}
            data-testid="button-view-hero-details"
          >
            <Eye className="h-4 w-4" />
            View Full Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}
