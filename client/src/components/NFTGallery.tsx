import NFTCard from "./NFTCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import wolfImage from '@assets/generated_images/Wolf_Guardian_species_portrait_274c844d.png';
import felineImage from '@assets/generated_images/Feline_Sovereign_species_portrait_88c49a5f.png';
import mamaImage from '@assets/generated_images/Matriarchal_Ops_portrait_6ea3fbe8.png';

export default function NFTGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("all");
  const [filterRarity, setFilterRarity] = useState("all");

  //todo: remove mock functionality
  const mockNFTs = [
    { tokenId: '001', name: 'AlphaHowl', image: wolfImage, rarity: 'Legendary' as const, species: 'Wolf Guardian' },
    { tokenId: '042', name: 'Panthera Codex', image: felineImage, rarity: 'Sovereign' as const, species: 'Feline Sovereign' },
    { tokenId: '007', name: 'MamaYaya7', image: mamaImage, rarity: 'Rare' as const, species: 'Matriarchal Ops' },
    { tokenId: '123', name: 'LunarScout', image: wolfImage, rarity: 'Rare' as const, species: 'Wolf Guardian' },
    { tokenId: '089', name: 'TigerVault', image: felineImage, rarity: 'Legendary' as const, species: 'Feline Sovereign' },
    { tokenId: '234', name: 'WombVault', image: mamaImage, rarity: 'Common' as const, species: 'Matriarchal Ops' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search NFTs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-nfts"
          />
        </div>
        <Select value={filterSpecies} onValueChange={setFilterSpecies}>
          <SelectTrigger className="w-full md:w-48" data-testid="select-filter-species">
            <SelectValue placeholder="All Species" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Species</SelectItem>
            <SelectItem value="robotic-lions">Robotic Lions</SelectItem>
            <SelectItem value="feline-sovereigns">Feline Sovereigns</SelectItem>
            <SelectItem value="wolf-guardians">Wolf Guardians</SelectItem>
            <SelectItem value="matriarchal-ops">Matriarchal Ops</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterRarity} onValueChange={setFilterRarity}>
          <SelectTrigger className="w-full md:w-48" data-testid="select-filter-rarity">
            <SelectValue placeholder="All Rarities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            <SelectItem value="common">Common</SelectItem>
            <SelectItem value="rare">Rare</SelectItem>
            <SelectItem value="legendary">Legendary</SelectItem>
            <SelectItem value="sovereign">Sovereign</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockNFTs.map((nft) => (
          <NFTCard key={nft.tokenId} {...nft} />
        ))}
      </div>
    </div>
  );
}
