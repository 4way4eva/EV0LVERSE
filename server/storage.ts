import { 
  type User, 
  type InsertUser,
  type OverscaleDomain,
  type InsertOverscaleDomain,
  type HiddenSociety,
  type InsertHiddenSociety,
  type WarActor,
  type InsertWarActor,
  type MallNode,
  type InsertMallNode,
  type MarketProduct,
  type InsertMarketProduct,
  type CeremonialRitual,
  type InsertCeremonialRitual,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Overscale Domain methods
  getAllOverscaleDomains(): Promise<OverscaleDomain[]>;
  getOverscaleDomain(id: string): Promise<OverscaleDomain | undefined>;
  createOverscaleDomain(domain: InsertOverscaleDomain): Promise<OverscaleDomain>;
  
  // Hidden Society methods
  getAllHiddenSocieties(): Promise<HiddenSociety[]>;
  getHiddenSociety(id: string): Promise<HiddenSociety | undefined>;
  updateHiddenSocietyStatus(id: string, status: string): Promise<HiddenSociety | undefined>;
  
  // War Actor methods
  getAllWarActors(): Promise<WarActor[]>;
  getWarActor(id: string): Promise<WarActor | undefined>;
  getWarActorByCodename(codename: string): Promise<WarActor | undefined>;
  
  // Mall Node methods
  getAllMallNodes(): Promise<MallNode[]>;
  getMallNode(id: string): Promise<MallNode | undefined>;
  createMallNode(mall: InsertMallNode): Promise<MallNode>;
  
  // Market Product methods
  getAllMarketProducts(): Promise<MarketProduct[]>;
  getMarketProductsBySector(sector: string): Promise<MarketProduct[]>;
  
  // Ceremonial Ritual methods
  getAllCeremonialRituals(): Promise<CeremonialRitual[]>;
  getCeremonialRitual(id: string): Promise<CeremonialRitual | undefined>;
  updateRitualStatus(id: string, status: string): Promise<CeremonialRitual | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private overscaleDomains: Map<string, OverscaleDomain>;
  private hiddenSocieties: Map<string, HiddenSociety>;
  private warActors: Map<string, WarActor>;
  private mallNodes: Map<string, MallNode>;
  private marketProducts: Map<string, MarketProduct>;
  private ceremonialRituals: Map<string, CeremonialRitual>;

  constructor() {
    this.users = new Map();
    this.overscaleDomains = new Map();
    this.hiddenSocieties = new Map();
    this.warActors = new Map();
    this.mallNodes = new Map();
    this.marketProducts = new Map();
    this.ceremonialRituals = new Map();
    
    this.seedData();
  }

  private async seedData() {
    // Seed War Actors
    const warActors = [
      {
        codename: "EVOLYNN",
        title: "Rift Queen, Treaty Architect",
        heritage: "Matriarchs of the Rift",
        origin: "Atlantis Restored",
        domains: ["Solar flame", "Treaty binding", "Pedagogy"],
        signatureAbility: "Flame Crown",
        signatureDescription: "Writs that bind opponents to ceremonial terms",
        limiter: "Requires witnessed consent or ritual proof",
        antagonists: "Distortion Syndicate",
        vendetta: "Funhouse Mirror Gangs",
      },
      {
        codename: "DR. SOSA",
        title: "Codex Sovereign",
        heritage: "Navigators, Midwives, Captains",
        origin: "BLEULION Treasury",
        domains: ["Electromagnetic archives", "Infinite accounting engines", "MetaMilitary command"],
        signatureAbility: "Genesis Codex",
        signatureDescription: "Spins parallel economies from pure mathematics",
        limiter: "Overuse fragments memory indexes",
        antagonists: "Archivist Guild of Distortion",
        vendetta: "Colonial Archivists",
      },
      {
        codename: "PHIYAH",
        title: "Signal Priestess",
        heritage: "Electromagnetic Rift lineage",
        origin: "Signal Choir Temples",
        domains: ["Frequency firewalls", "Glyph translation", "Memory decoding"],
        signatureAbility: "Choir Seal",
        signatureDescription: "No scroll executes without her harmonic tone",
        limiter: "Must maintain choir harmony",
        antagonists: "Spectrum Lords",
        vendetta: "Telecom Monopolies",
      },
      {
        codename: "KONGO SONIX",
        title: "Sonic Sovereign",
        heritage: "Leviathan Choir descendant",
        origin: "Jungle Resonance Citadel",
        domains: ["Sonic shock", "Vibration control", "Ancestral summons"],
        signatureAbility: "Mountain-Break Roar",
        signatureDescription: "Tech collapse via sonic detune",
        limiter: "Over-resonance risks structural damage to allies",
        antagonists: "Beast-Makers",
        vendetta: "Industrial Myth Cartel",
      },
      {
        codename: "DRIFT WALKER",
        title: "Wild Strategist",
        heritage: "4-Gen Thunder lineage",
        origin: "Nomadic Spiral Paths",
        domains: ["Mirror Walk", "Quarter Spiral", "PPI placement"],
        signatureAbility: "Mirror Rewrite",
        signatureDescription: "Reverses distortion back to truth",
        limiter: "Requires physical mirror proximity",
        antagonists: "Distortion Engines",
        vendetta: "Funhouse Mirrors",
      },
      {
        codename: "BLACK SAMBO",
        title: "Afro-Asian Hero",
        heritage: "Maritime Afro-Asian trade lines",
        origin: "Cross-Continental Routes",
        domains: ["Reversal Rite", "Lineage Restoration", "Trade route reclamation"],
        signatureAbility: "Lineage Restoration",
        signatureDescription: "Restores erased Afro-Asian heritage connections",
        limiter: "Requires ancestral artifacts",
        antagonists: "IP Flatteners",
        vendetta: "Colonial Image Mills",
      },
    ];

    for (const actor of warActors) {
      const id = randomUUID();
      this.warActors.set(id, { ...actor, id });
    }

    // Seed Hidden Societies
    const societies = [
      { name: "The Watchers", symbol: "👁️", status: "Previously Contacted", accessLevel: "Medium" },
      { name: "Knights Templar", symbol: "⚔️", status: "Previously Contacted", accessLevel: "Medium" },
      { name: "Order of the Black Sun", symbol: "☀️", status: "Dormant", accessLevel: "High" },
      { name: "Thule Society", symbol: "🧊", status: "Dormant", accessLevel: "High" },
      { name: "Freemasons", symbol: "📐", status: "Active", accessLevel: "Low" },
      { name: "Rosicrucians", symbol: "🌹", status: "Previously Contacted", accessLevel: "Medium" },
      { name: "Illuminati", symbol: "🔺", status: "Active", accessLevel: "High" },
      { name: "Council of 13", symbol: "👑", status: "Dormant", accessLevel: "High" },
      { name: "Bohemian Grove", symbol: "🔥", status: "Active", accessLevel: "High" },
      { name: "Skull & Bones", symbol: "💀", status: "Active", accessLevel: "Medium" },
      { name: "The 300", symbol: "💼", status: "Dormant", accessLevel: "High" },
      { name: "The Vatican Secret Archives", symbol: "📜", status: "Guarded", accessLevel: "High" },
      { name: "Sons of Poseidon", symbol: "🌊", status: "To Be Unlocked", accessLevel: "Locked" },
      { name: "The Golden Dawn", symbol: "✨", status: "Dormant", accessLevel: "Medium" },
      { name: "The Builders", symbol: "🏗️", status: "To Be Unlocked", accessLevel: "Locked" },
      { name: "The Architects", symbol: "📏", status: "To Be Unlocked", accessLevel: "Locked" },
      { name: "Order of Melchizedek", symbol: "🕊️", status: "To Be Unlocked", accessLevel: "Locked" },
      { name: "Seraphim Intelligence", symbol: "🪽", status: "To Be Unlocked", accessLevel: "Locked" },
      { name: "Anunnaki Lineage", symbol: "🛸", status: "Ancestral Link", accessLevel: "Ancestral" },
      { name: "The Hidden Scribes", symbol: "🖋️", status: "To Be Unlocked", accessLevel: "Locked" },
      { name: "Atlantean Code Keepers", symbol: "🔮", status: "Ancestral Link", accessLevel: "Ancestral" },
      { name: "Inner Earth Syndicate", symbol: "🌌", status: "To Be Unlocked", accessLevel: "Locked" },
      { name: "Eternals of Lemuria", symbol: "🌴", status: "To Be Unlocked", accessLevel: "Locked" },
      { name: "E-SOIL Guardians", symbol: "🧬", status: "Core Activated", accessLevel: "Root" },
    ];

    for (const society of societies) {
      const id = randomUUID();
      this.hiddenSocieties.set(id, { ...society, id });
    }

    // Seed Mall Nodes
    const malls = [
      {
        name: "Atlantis Prime Mall",
        cityName: "Atlantis Restored",
        valuation: "12500000000000",
        roles: ["Treasury Node", "City Core", "Military Hub"],
        mythCountered: "Zeus / Thor (Lightning Kings)",
        guardianSector: "HydroGlyph Energy Plants",
        retailSales: "2800000000000",
        defenseContracts: "4200000000000",
        culturalRights: "1500000000000",
        treasuryFlow: null,
        wellnessLabs: null,
      },
      {
        name: "BLEULION Central",
        cityName: "Safe Haven Alpha",
        valuation: "15200000000000",
        roles: ["Command Center", "Vault Access", "Device Lab"],
        mythCountered: "Batman (Device Prep)",
        guardianSector: "Mirror Market™ Counter-Lab",
        retailSales: "3500000000000",
        defenseContracts: "5800000000000",
        culturalRights: "2100000000000",
        treasuryFlow: null,
        wellnessLabs: null,
      },
      {
        name: "Signal Choir Plaza",
        cityName: "Harmonic District",
        valuation: "10800000000000",
        roles: ["Frequency Hub", "Choir Broadcast", "Ceremonial Center"],
        mythCountered: "Wonder Woman (Lasso Truth)",
        guardianSector: "Flame Crown Nodes",
        retailSales: "2200000000000",
        defenseContracts: "3900000000000",
        culturalRights: "1800000000000",
        treasuryFlow: null,
        wellnessLabs: null,
      },
      {
        name: "Jungle Citadel Market",
        cityName: "Resonance Valley",
        valuation: "11400000000000",
        roles: ["Sonic Arsenal", "Training Grounds", "EV0LArcade"],
        mythCountered: "Hulk (Gamma Rage)",
        guardianSector: "Vibration Nullifiers",
        retailSales: "2400000000000",
        defenseContracts: "4500000000000",
        culturalRights: "1600000000000",
        treasuryFlow: null,
        wellnessLabs: null,
      },
    ];

    for (const mall of malls) {
      const id = randomUUID();
      this.mallNodes.set(id, { ...mall, id });
    }

    // Seed Ceremonial Rituals
    const rituals = [
      {
        ritualName: "Flame Crown Activation",
        codexSource: "EVOLVERS Act I",
        purpose: "Bind opponents to ceremonial treaty terms through solar flame authority",
        sequence: [
          "Witness gathering at designated node",
          "Treaty Scroll presentation and reading",
          "Consent verification or ritual proof documentation",
          "Flame Crown ignition via EVOLYNN",
          "Binding seal inscription on ENFT ledger",
          "Audit trail propagation across vaults",
        ],
        requiredActors: ["EVOLYNN", "PHIYAH"],
        activationStatus: "active",
        ceremonyType: "Treaty Binding",
      },
      {
        ritualName: "Reciprocity Pulse Ritual",
        codexSource: "ENATO Codex Constitution",
        purpose: "Activate MetaVault π■ yield redistribution across sovereign streams",
        sequence: [
          "Quarter Law cycle verification",
          "Civil, Military, Cosmic stream alignment",
          "π■ compounding calculation (28.9M/sec → $2.498T/day)",
          "Treasury pulse broadcast via Signal Choir",
          "Vault synchronization confirmation",
          "Yield ledger update and hash lock",
        ],
        requiredActors: ["DR. SOSA", "PHIYAH"],
        activationStatus: "active",
        ceremonyType: "Treasury Pulse",
      },
      {
        ritualName: "Vortex Codex Unsealing",
        codexSource: "CODEXX Assembly Scroll",
        purpose: "Access dormant genetic memory archives for lineage restoration",
        sequence: [
          "Ceremonial EMP signal preparation (abstract only)",
          "Scroll extraction from Atlantis Vault",
          "Mirror Scroll reflective recalibration",
          "Gem Scroll pluripotent option activation",
          "ENFT provenance anchoring",
          "Face-Off Scroll identity verification",
        ],
        requiredActors: ["EVOLYNN", "DR. SOSA", "DRIFT WALKER"],
        activationStatus: "pending",
        ceremonyType: "Archive Access",
      },
      {
        ritualName: "Choir Seal Protocol",
        codexSource: "War Codex v0.1",
        purpose: "Frequency firewall activation preventing unauthorized scroll execution",
        sequence: [
          "Signal Choir harmonic tuning",
          "Glyph translation matrix setup",
          "Ceremonial frequency broadcast",
          "Choir Seal inscription",
          "Spectrum defense activation",
          "Continuous harmonic maintenance",
        ],
        requiredActors: ["PHIYAH", "KONGO SONIX"],
        activationStatus: "active",
        ceremonyType: "Frequency Defense",
      },
      {
        ritualName: "Genesis Codex Initialization",
        codexSource: "ENATO Codex Constitution",
        purpose: "Spin parallel economy from mathematical foundations",
        sequence: [
          "Electromagnetic archive calibration",
          "Infinite accounting engine priming",
          "Genesis Codex inscription",
          "Parallel economy genesis block",
          "MetaMilitary ledger integration",
          "Memory index fragmentation monitoring",
        ],
        requiredActors: ["DR. SOSA"],
        activationStatus: "active",
        ceremonyType: "Economic Genesis",
      },
    ];

    for (const ritual of rituals) {
      const id = randomUUID();
      this.ceremonialRituals.set(id, { ...ritual, id });
    }

    // Seed Market Products
    const products = [
      { productName: "CryoLife Vaultlets", slogan: "Freeze time. Restore life.", sector: "Healing, Medicine & Biology", useCaseFit: "Longevity", marketBenchmark2025: 210, overscaleProjection: 580, roiPercentage: 176 },
      { productName: "Soul Recode Pods", slogan: "Realign your DNA. Reclaim your soul.", sector: "Healing, Medicine & Biology", useCaseFit: "Genetic repair", marketBenchmark2025: 190, overscaleProjection: 540, roiPercentage: 184 },
      { productName: "Ziphonate Cores", slogan: "Power beyond limits.", sector: "Energy, Agriculture & Planet Systems", useCaseFit: "Energy yield", marketBenchmark2025: 420, overscaleProjection: 1200, roiPercentage: 186 },
      { productName: "PlasmaPearl Reactors", slogan: "Ocean-born energy.", sector: "Energy, Agriculture & Planet Systems", useCaseFit: "Infinite hydro power", marketBenchmark2025: 310, overscaleProjection: 890, roiPercentage: 187 },
      { productName: "Portal Key Tokens", slogan: "Cross realms. Safely.", sector: "Travel, Expansion & Mobility", useCaseFit: "Dimensional trade", marketBenchmark2025: 160, overscaleProjection: 470, roiPercentage: 194 },
      { productName: "SmartAd Beacons", slogan: "Advertise across time.", sector: "Economy, Commerce & Finance", useCaseFit: "Scroll reach", marketBenchmark2025: 390, overscaleProjection: 960, roiPercentage: 146 },
      { productName: "MetaCurriculum Pods", slogan: "Learn faster than light.", sector: "Schools, Training & Education", useCaseFit: "Skill yield", marketBenchmark2025: 130, overscaleProjection: 430, roiPercentage: 231 },
      { productName: "HydroDome Farms", slogan: "Grow oceans indoors.", sector: "Agriculture & Food Systems", useCaseFit: "Food security", marketBenchmark2025: 240, overscaleProjection: 720, roiPercentage: 200 },
      { productName: "NanoHeal Clouds", slogan: "Let the air heal you.", sector: "Healing, Medicine & Biology", useCaseFit: "Mass healing", marketBenchmark2025: 250, overscaleProjection: 710, roiPercentage: 184 },
      { productName: "SkyyBleu Serums", slogan: "Drink light. Heal faster.", sector: "Healing, Medicine & Biology", useCaseFit: "Cell repair", marketBenchmark2025: 180, overscaleProjection: 530, roiPercentage: 194 },
    ];

    for (const product of products) {
      const id = randomUUID();
      this.marketProducts.set(id, { ...product, id });
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Overscale Domain methods
  async getAllOverscaleDomains(): Promise<OverscaleDomain[]> {
    return Array.from(this.overscaleDomains.values());
  }

  async getOverscaleDomain(id: string): Promise<OverscaleDomain | undefined> {
    return this.overscaleDomains.get(id);
  }

  async createOverscaleDomain(insertDomain: InsertOverscaleDomain): Promise<OverscaleDomain> {
    const id = randomUUID();
    const domain: OverscaleDomain = { ...insertDomain, id };
    this.overscaleDomains.set(id, domain);
    return domain;
  }

  // Hidden Society methods
  async getAllHiddenSocieties(): Promise<HiddenSociety[]> {
    return Array.from(this.hiddenSocieties.values());
  }

  async getHiddenSociety(id: string): Promise<HiddenSociety | undefined> {
    return this.hiddenSocieties.get(id);
  }

  async updateHiddenSocietyStatus(id: string, status: string): Promise<HiddenSociety | undefined> {
    const society = this.hiddenSocieties.get(id);
    if (society) {
      const updated = { ...society, status };
      this.hiddenSocieties.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // War Actor methods
  async getAllWarActors(): Promise<WarActor[]> {
    return Array.from(this.warActors.values());
  }

  async getWarActor(id: string): Promise<WarActor | undefined> {
    return this.warActors.get(id);
  }

  async getWarActorByCodename(codename: string): Promise<WarActor | undefined> {
    return Array.from(this.warActors.values()).find(
      (actor) => actor.codename.toLowerCase() === codename.toLowerCase(),
    );
  }

  // Mall Node methods
  async getAllMallNodes(): Promise<MallNode[]> {
    return Array.from(this.mallNodes.values());
  }

  async getMallNode(id: string): Promise<MallNode | undefined> {
    return this.mallNodes.get(id);
  }

  async createMallNode(insertMall: InsertMallNode): Promise<MallNode> {
    const id = randomUUID();
    const mall: MallNode = { 
      ...insertMall, 
      id,
      retailSales: insertMall.retailSales ?? null,
      defenseContracts: insertMall.defenseContracts ?? null,
      culturalRights: insertMall.culturalRights ?? null,
      treasuryFlow: insertMall.treasuryFlow ?? null,
      wellnessLabs: insertMall.wellnessLabs ?? null,
      mythCountered: insertMall.mythCountered ?? null,
      guardianSector: insertMall.guardianSector ?? null,
    };
    this.mallNodes.set(id, mall);
    return mall;
  }

  // Market Product methods
  async getAllMarketProducts(): Promise<MarketProduct[]> {
    return Array.from(this.marketProducts.values());
  }

  async getMarketProductsBySector(sector: string): Promise<MarketProduct[]> {
    return Array.from(this.marketProducts.values()).filter(
      (product) => product.sector.toLowerCase().includes(sector.toLowerCase()),
    );
  }

  // Ceremonial Ritual methods
  async getAllCeremonialRituals(): Promise<CeremonialRitual[]> {
    return Array.from(this.ceremonialRituals.values());
  }

  async getCeremonialRitual(id: string): Promise<CeremonialRitual | undefined> {
    return this.ceremonialRituals.get(id);
  }

  async updateRitualStatus(id: string, status: string): Promise<CeremonialRitual | undefined> {
    const ritual = this.ceremonialRituals.get(id);
    if (ritual) {
      const updated = { ...ritual, activationStatus: status };
      this.ceremonialRituals.set(id, updated);
      return updated;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
