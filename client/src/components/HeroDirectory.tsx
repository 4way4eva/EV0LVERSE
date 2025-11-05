import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroCard from "./HeroCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function HeroDirectory() {
  const [searchQuery, setSearchQuery] = useState("");

  //todo: remove mock functionality
  const evolutionaryTitans = [
    { name: 'Evoleon Prime', lineage: 'Gene-Wright / Titan', archetype: 'Mythic/Evolutionary', abilities: ['Power Activation', 'DNA Indexing', 'Shapeshifting'], attributes: ['Strength', 'Intellect'] },
    { name: 'Adaptress Kynare', lineage: 'Atavist Siblings', archetype: 'Demi-Goddess', abilities: ['Environmental Adaptation', 'Genetic Memory'], attributes: ['Agility', 'Insight'] },
    { name: 'Splice King Vezir', lineage: 'Hiveborn, Basal Symbiote', archetype: 'Trickster-Paragon', abilities: ['Bodily Aspect Enhancement', 'Power Replication'], attributes: ['Cunning', 'Endurance'] },
    { name: 'Synergy', lineage: 'Gene-Mage/AI Mutator', archetype: 'Techno-Mystic Synth', abilities: ['Bio-Augmentation', 'Ability Imprinting'], attributes: ['Wisdom', 'Speed'] }
  ];

  const mechanistBrotherhood = [
    { name: 'Ironheart Aegis', lineage: 'Turing Scribes', archetype: 'Tech Guardian', abilities: ['Defensive Corrosion', 'Force-Field Generation'], attributes: ['Strength', 'Intelligence'] },
    { name: 'Vultech Forge', lineage: 'Martian Gearmancers', archetype: 'Master Smith', abilities: ['Forges adaptive weapons'], attributes: ['Stamina', 'Creativity'] },
    { name: 'Lady Tesla', lineage: 'Arc-Lit Engineer Line', archetype: 'Energy Manipulator', abilities: ['Flight', 'EMP', 'Energy Constructs'], attributes: ['Speed', 'Ingenuity'] },
    { name: 'Jetstrike Zenith', lineage: 'Sky-Fleet Tinkerers', archetype: 'Sky Warrior', abilities: ['Rapid deployment', 'AI combat tactics'], attributes: ['Agility', 'Precision'] }
  ];

  const orderOfMyth = [
    { name: 'Arjuna the Peerless', lineage: 'Indian-Vedic, son of Indra', archetype: 'Divine Warrior', abilities: ['Divine Weaponry', 'Invulnerability', 'Army Annihilation'], attributes: ['Law Mastery', 'Precision'] },
    { name: 'Cu Chulainn', lineage: 'Celtic-Lugh', archetype: 'Berserker Avatar', abilities: ['Berserker Transformation', 'Divine Avatar'], attributes: ['Supernatural Strength'] },
    { name: 'Baldr Radiant', lineage: 'Norse-Asgardian', archetype: 'Light Bearer', abilities: ['Invulnerability', 'Light Mastery'], attributes: ['Beauty', 'Wisdom'] },
    { name: 'Beowulf Ironbear', lineage: 'Proto-Nordic, Royal', archetype: 'Monster Slayer', abilities: ['Dragon Slayer', 'Monster Resilience'], attributes: ['Leadership', 'Virtue'] }
  ];

  const guildOfShadows = [
    { name: 'Shadowstep', lineage: 'Old Night Families', archetype: 'Shadow Walker', abilities: ['Invisibility', 'Phase Shift'], attributes: ['Stealth', 'Tactics'] },
    { name: 'Widowblade', lineage: 'Assassin Sisterhood', archetype: 'Master Assassin', abilities: ['Poison Craft', 'Neuromimicry'], attributes: ['Marksmanship', 'Agility'] },
    { name: 'Mirage Yurei', lineage: 'Trickster-Yuki hybrid', archetype: 'Illusionist', abilities: ['Illusion Casting', 'Sense Reading'], attributes: ['Deception', 'Intelligence'] }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-ceremonial font-bold mb-2">EvolVerse Hero Directory</h2>
        <p className="text-muted-foreground">
          Ceremonial encyclopedia of heroic lineages across all houses
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search heroes by name, lineage, or abilities..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-heroes"
        />
      </div>

      <Tabs defaultValue="evolutionary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="evolutionary" data-testid="tab-evolutionary-titans">Evolutionary Titans</TabsTrigger>
          <TabsTrigger value="mechanist" data-testid="tab-mechanist">Mechanist Brotherhood</TabsTrigger>
          <TabsTrigger value="myth" data-testid="tab-myth">Order of Myth</TabsTrigger>
          <TabsTrigger value="shadows" data-testid="tab-shadows">Guild of Shadows</TabsTrigger>
        </TabsList>

        <TabsContent value="evolutionary" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evolutionaryTitans.map((hero) => (
              <HeroCard 
                key={hero.name}
                {...hero}
                house="Evolutionary Titans"
                onViewDetails={() => console.log('View', hero.name)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mechanist" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mechanistBrotherhood.map((hero) => (
              <HeroCard 
                key={hero.name}
                {...hero}
                house="Mechanist Brotherhood"
                onViewDetails={() => console.log('View', hero.name)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="myth" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderOfMyth.map((hero) => (
              <HeroCard 
                key={hero.name}
                {...hero}
                house="Order of Myth"
                onViewDetails={() => console.log('View', hero.name)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shadows" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guildOfShadows.map((hero) => (
              <HeroCard 
                key={hero.name}
                {...hero}
                house="Guild of Shadows"
                onViewDetails={() => console.log('View', hero.name)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
