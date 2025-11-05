import HeroCard from '../HeroCard';

export default function HeroCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <HeroCard 
        name="Evoleon Prime"
        lineage="Gene-Wright / Titan"
        house="Evolutionary Titans"
        archetype="Mythic/Evolutionary"
        abilities={["Power Activation", "DNA Indexing", "Shapeshifting"]}
        attributes={["Strength", "Intellect"]}
        onViewDetails={() => console.log('View Evoleon Prime')}
      />
      <HeroCard 
        name="Ironheart Aegis"
        lineage="Turing Scribes"
        house="Mechanist Brotherhood"
        archetype="Tech Guardian"
        abilities={["Defensive Corrosion", "Force-Field Generation"]}
        attributes={["Strength", "Intelligence"]}
        onViewDetails={() => console.log('View Ironheart Aegis')}
      />
      <HeroCard 
        name="Arjuna the Peerless"
        lineage="Indian-Vedic, son of Indra"
        house="Order of Myth"
        archetype="Divine Warrior"
        abilities={["Divine Weaponry", "Invulnerability", "Army Annihilation"]}
        attributes={["Law Mastery", "Precision"]}
        onViewDetails={() => console.log('View Arjuna')}
      />
    </div>
  );
}
