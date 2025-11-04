import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VaultCard from "./VaultCard";
import vaultImage from "@assets/generated_images/Tri-Spiral_Vault_diagram_f8470d46.png";

export default function VaultBrowser() {
  //todo: remove mock functionality
  const roboticLions = [
    { name: 'BLEULION Prime', function_desc: 'Treasury enforcer, vault guardian', icon: '🦁', tier: 'Inner' as const },
    { name: 'SolarMane', function_desc: 'Light converter, solar anchoring', icon: '🦁', tier: 'Middle' as const },
    { name: 'EchoRoar', function_desc: 'Sonic disruptor, truth amplifier', icon: '🦁', tier: 'Middle' as const },
    { name: 'StealthPride', function_desc: 'Cloaked recon unit', icon: '🦁', tier: 'Outer' as const },
    { name: 'CrownClaw', function_desc: 'Flame Crown protocol enforcement', icon: '🦁', tier: 'Inner' as const }
  ];

  const felineSovereigns = [
    { name: 'Panthera Codex', function_desc: 'Dream patrol, stealth ops', icon: '🐆', tier: 'Inner' as const },
    { name: 'TigerVault', function_desc: 'Energy defense, border surge', icon: '🐅', tier: 'Middle' as const },
    { name: 'LeopardGlyph', function_desc: 'Pattern decoding, encryption logic', icon: '🐆', tier: 'Middle' as const },
    { name: 'LionessMatron', function_desc: 'Matriarchal coordination', icon: '🦁', tier: 'Outer' as const }
  ];

  const wolfGuardians = [
    { name: 'AlphaHowl', function_desc: 'Signal leadership, frequency relay', icon: '🐺', tier: 'Inner' as const },
    { name: 'OmegaShield', function_desc: 'Trauma buffer, final defense', icon: '🐺', tier: 'Middle' as const },
    { name: 'LunarScout', function_desc: 'Dream scanner, nocturnal patrol', icon: '🐺', tier: 'Middle' as const },
    { name: 'PackBinder', function_desc: 'Unity architect', icon: '🐺', tier: 'Outer' as const }
  ];

  const matriarchalOps = [
    { name: 'MamaYaya7', function_desc: 'Wisdom anchor, care engine', icon: '🌽', tier: 'Inner' as const },
    { name: 'WombVault', function_desc: 'Fertility protocol', icon: '🧬', tier: 'Middle' as const },
    { name: 'CradleGuard', function_desc: 'Infant protector', icon: '🛏️', tier: 'Outer' as const },
    { name: 'HarvestMatron', function_desc: 'Food sovereignty steward', icon: '🌾', tier: 'Middle' as const }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <img 
          src={vaultImage} 
          alt="Tri-Spiral Vault"
          className="w-32 h-32 rounded-lg"
        />
        <div>
          <h2 className="text-4xl font-ceremonial font-bold">Tri-Spiral Vault System</h2>
          <p className="text-muted-foreground">Outer (Public) • Middle (Economic) • Inner (Ritual)</p>
        </div>
      </div>

      <Tabs defaultValue="robotic-lions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="robotic-lions" data-testid="tab-robotic-lions">Robotic Lions</TabsTrigger>
          <TabsTrigger value="feline-sovereigns" data-testid="tab-feline-sovereigns">Feline Sovereigns</TabsTrigger>
          <TabsTrigger value="wolf-guardians" data-testid="tab-wolf-guardians">Wolf Guardians</TabsTrigger>
          <TabsTrigger value="matriarchal-ops" data-testid="tab-matriarchal-ops">Matriarchal Ops</TabsTrigger>
        </TabsList>
        
        <TabsContent value="robotic-lions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roboticLions.map((unit) => (
              <VaultCard 
                key={unit.name}
                name={unit.name}
                species="Robotic Lions"
                function_desc={unit.function_desc}
                icon={unit.icon}
                tier={unit.tier}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feline-sovereigns" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {felineSovereigns.map((unit) => (
              <VaultCard 
                key={unit.name}
                name={unit.name}
                species="Feline Sovereigns"
                function_desc={unit.function_desc}
                icon={unit.icon}
                tier={unit.tier}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wolf-guardians" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wolfGuardians.map((unit) => (
              <VaultCard 
                key={unit.name}
                name={unit.name}
                species="Wolf Guardians"
                function_desc={unit.function_desc}
                icon={unit.icon}
                tier={unit.tier}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matriarchal-ops" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matriarchalOps.map((unit) => (
              <VaultCard 
                key={unit.name}
                name={unit.name}
                species="Matriarchal Ops"
                function_desc={unit.function_desc}
                icon={unit.icon}
                tier={unit.tier}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
