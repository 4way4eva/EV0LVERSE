import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink } from "lucide-react";
import { useState } from "react";

interface NFTCardProps {
  tokenId: string;
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Sovereign';
  species: string;
}

export default function NFTCard({ tokenId, name, image, rarity, species }: NFTCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const rarityColors = {
    'Common': 'bg-secondary',
    'Rare': 'bg-blue-500',
    'Legendary': 'bg-purple-500',
    'Sovereign': 'bg-primary'
  };

  return (
    <Card 
      className="overflow-hidden transition-transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-nft-${tokenId}`}
    >
      <div className="aspect-square relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-background/90 flex items-center justify-center gap-2 animate-in fade-in">
            <Button 
              size="icon" 
              variant="secondary"
              onClick={() => console.log('View NFT', tokenId)}
              data-testid={`button-view-${tokenId}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary"
              onClick={() => console.log('Open in explorer', tokenId)}
              data-testid={`button-explorer-${tokenId}`}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg truncate" data-testid={`text-name-${tokenId}`}>
            {name}
          </h3>
          <Badge className={rarityColors[rarity]} data-testid={`badge-rarity-${tokenId}`}>
            {rarity}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-1">#{tokenId}</p>
        <p className="text-sm text-muted-foreground">{species}</p>
      </div>
    </Card>
  );
}
