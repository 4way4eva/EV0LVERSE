import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DossierEntry {
  entity: string;
  type: string;
  years: string;
  resource: string;
  region: string;
  successor: string;
}

export default function ExtractionDossier() {
  const [searchQuery, setSearchQuery] = useState("");

  //todo: remove mock functionality
  const mockData: DossierEntry[] = [
    { entity: 'Royal African Company', type: 'Chartered Company', years: '1660-1752', resource: 'Gold, slaves, ivory', region: 'West Africa', successor: 'Bank of England capital interests' },
    { entity: 'Dutch West India Company', type: 'Chartered Company', years: '1621-1794', resource: 'Slaves, sugar, gold', region: 'West Africa, Caribbean', successor: 'Dutch colonial financial networks' },
    { entity: 'De Beers Consolidated', type: 'Mining Company', years: '1888-present', resource: 'Diamonds', region: 'Southern Africa', successor: 'De Beers Group / Anglo American' },
    { entity: 'Union Minière du Haut-Katanga', type: 'Mining Company', years: '1906-1966', resource: 'Copper, cobalt, uranium', region: 'DRC (Katanga)', successor: 'Umicore / Glencore' },
    { entity: 'Royal Dutch Shell', type: 'Oil & Gas', years: '1907-present', resource: 'Oil, gas', region: 'Nigeria, Gabon', successor: 'Shell plc' },
    { entity: 'British East India Company', type: 'Chartered Company', years: '1600-1874', resource: 'Spices, textiles, tea, opium', region: 'India, China, East Africa', successor: 'Crown Raj; UK trading successors' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-display font-bold mb-2">Global Extraction Dossier</h2>
        <p className="text-muted-foreground">
          Historical documentation of colonial entities and their modern corporate successors
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search entities, resources, or regions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-dossier"
        />
      </div>

      <div className="space-y-4">
        {mockData.map((entry, index) => (
          <Card 
            key={index}
            className="p-6 hover-elevate"
            data-testid={`card-dossier-${index}`}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-bold" data-testid={`text-entity-${index}`}>
                    {entry.entity}
                  </h3>
                  <Badge variant="secondary">{entry.type}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Active Years:</span>
                    <p className="font-mono font-semibold mt-1">{entry.years}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Primary Resources:</span>
                    <p className="font-medium mt-1">{entry.resource}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Operating Region:</span>
                    <p className="font-medium mt-1">{entry.region}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Modern Successor:</span>
                    <p className="font-medium mt-1 text-primary">{entry.successor}</p>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2"
                  onClick={() => console.log('View lineage for', entry.entity)}
                  data-testid={`button-lineage-${index}`}
                >
                  <ExternalLink className="h-4 w-4" />
                  Lineage
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
