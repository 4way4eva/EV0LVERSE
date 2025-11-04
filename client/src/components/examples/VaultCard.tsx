import VaultCard from '../VaultCard';

export default function VaultCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <VaultCard 
        name="BLEULION Prime"
        species="Robotic Lions"
        function_desc="Treasury enforcer, vault guardian"
        icon="🦁"
        tier="Inner"
      />
      <VaultCard 
        name="AlphaHowl"
        species="Wolf Guardians"
        function_desc="Signal leadership, frequency relay"
        icon="🐺"
        tier="Middle"
      />
      <VaultCard 
        name="Panthera Codex"
        species="Feline Sovereigns"
        function_desc="Dream patrol, stealth ops"
        icon="🐆"
        tier="Outer"
      />
    </div>
  );
}
