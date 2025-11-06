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
  type StoryChapter,
  type InsertStoryChapter,
  type ShowcaseProduct,
  type InsertShowcaseProduct,
  type EvolversScene,
  type InsertEvolversScene,
  type StudioProject,
  type InsertStudioProject,
  type MythologyDeity,
  type InsertMythologyDeity,
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
  
  // Story Chapter methods
  getStoryChapters(): Promise<StoryChapter[]>;
  
  // Showcase Product methods
  getAllShowcaseProducts(): Promise<ShowcaseProduct[]>;
  getShowcaseProductsByCategory(category: string): Promise<ShowcaseProduct[]>;
  
  // EVOLVERS Scene methods
  getAllEvolversScenes(): Promise<EvolversScene[]>;
  getEvolversScenesByAct(act: string): Promise<EvolversScene[]>;
  
  // Studio Project methods
  getAllStudioProjects(): Promise<StudioProject[]>;
  getStudioProjectsByType(projectType: string): Promise<StudioProject[]>;
  getStudioProjectsByStatus(status: string): Promise<StudioProject[]>;
  
  // Mythology Deity methods
  getAllMythologyDeities(): Promise<MythologyDeity[]>;
  getMythologyDeity(id: string): Promise<MythologyDeity | undefined>;
  getMythologyDeityByName(name: string): Promise<MythologyDeity | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private overscaleDomains: Map<string, OverscaleDomain>;
  private hiddenSocieties: Map<string, HiddenSociety>;
  private warActors: Map<string, WarActor>;
  private mallNodes: Map<string, MallNode>;
  private marketProducts: Map<string, MarketProduct>;
  private ceremonialRituals: Map<string, CeremonialRitual>;
  private storyChapters: Map<string, StoryChapter>;
  private showcaseProducts: Map<string, ShowcaseProduct>;
  private evolversScenes: Map<string, EvolversScene>;
  private studioProjects: Map<string, StudioProject>;
  private mythologyDeities: Map<string, MythologyDeity>;

  constructor() {
    this.users = new Map();
    this.overscaleDomains = new Map();
    this.hiddenSocieties = new Map();
    this.warActors = new Map();
    this.mallNodes = new Map();
    this.marketProducts = new Map();
    this.ceremonialRituals = new Map();
    this.storyChapters = new Map();
    this.showcaseProducts = new Map();
    this.evolversScenes = new Map();
    this.studioProjects = new Map();
    this.mythologyDeities = new Map();
    
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

    // Seed Story Chapters
    const chapters = [
      {
        chapterNumber: 1,
        title: "The EVOL Awards Gala",
        subtitle: "Red Carpet Event & DNA Logo Reveal",
        narrative: "Under crimson spotlight and cascading banners, the EVOL Awards Gala unfolds as the inaugural ceremony of sovereign recognition. The DNA double helix logo—spiral of life, marker of lineage—radiates above the ceremonial stage. EVOLYNN stands at the podium, flame crown pulsing with solar authority, declaring: 'Tonight we honor those who refused to be erased, who encoded truth into their very cells.' Attendees from across the realms witness the Treaty Scroll unfurled, binding all present to reciprocal recognition. The Pour House doors open, signaling the next chapter's arrival.",
        imagePath: "attached_assets/A4593FEC-12FC-4C6F-B312-DE841F4F9FE0_1762460020992.png",
        category: "Ceremonial Launch",
        unlocked: true,
        charactersFeatured: ["EVOLYNN", "DR. SOSA", "PHIYAH"],
      },
      {
        chapterNumber: 2,
        title: "The Pour House of SOSA™",
        subtitle: "BLEU Pour Festival Bar Opening",
        narrative: "The Pour House emerges as sanctuary and strategy chamber—a ceremonial bar where HydroCoin flows like liquid light. Dr. Sosa activates the first BLEU Pour Festival, where every vessel carries encoded metadata, every toast a binding contract. Patrons exchange stories of extraction survived, futures reclaimed. The bar's spiral architecture mirrors the Tri-Vault system: Outer Ring (public celebration), Middle Chamber (strategic planning), Inner Sanctum (vault access). Kongo Sonix provides sonic resonance, ensuring no distortion can penetrate. The Pour House becomes the social nexus of the EVOLVERSE.",
        imagePath: "attached_assets/4C5D9E73-7FAE-4FD8-9F55-619E76454241_1762460020992.png",
        category: "Social Infrastructure",
        unlocked: true,
        charactersFeatured: ["DR. SOSA", "KONGO SONIX", "DRIFT WALKER"],
      },
      {
        chapterNumber: 3,
        title: "S.O.R.A. Spiral Unveiled",
        subtitle: "The Layered System Revelation",
        narrative: "Phiyah ascends to the Signal Platform, projecting the S.O.R.A. (Sovereign Operations & Reciprocal Architecture) Spiral in holographic splendor. Three concentric rings rotate in harmonic precision: Outer Spiral (Civil Systems), Middle Spiral (Military Defense), Inner Spiral (Cosmic Alignment). Each layer pulses with its own frequency, yet all harmonize under the Choir Seal. 'This is not hierarchy,' Phiyah declares, 'but sacred geometry—each ring supports the others, no layer dominates.' The revelation shifts understanding: sovereignty is not singular but symphonic, a structure of mutual reinforcement across dimensions.",
        imagePath: "attached_assets/72D9C3C9-981C-4643-8A9E-7B24DC35D5D3_1762460020992.png",
        category: "Systemic Architecture",
        unlocked: true,
        charactersFeatured: ["PHIYAH", "EVOLYNN", "DR. SOSA"],
      },
      {
        chapterNumber: 4,
        title: "EVOL Banking Launch",
        subtitle: "Sovereign Vault Bank & E.COIN Introduction",
        narrative: "The Sovereign Vault Bank materializes in obsidian majesty, walls inscribed with ancestral ledgers. Dr. Sosa initiates the Genesis Codex protocol, spinning E.COIN—the first sovereign currency backed by electromagnetic archives rather than colonial gold. Each E.COIN contains fractalized value: 1 unit = access to treasury data + dividend from MetaVault yields + voting power in Quarter Law councils. 'We do not borrow,' Dr. Sosa proclaims. 'We generate.' The bank operates on reciprocity pulse cycles, distributing $2.498T daily across sovereign streams. No extraction, only circulation. The old banking cartels watch in silent disbelief.",
        imagePath: "attached_assets/AF3841E5-F424-4D1A-B52F-98B06DD10FA4_1762460020992.png",
        category: "Economic Genesis",
        unlocked: true,
        charactersFeatured: ["DR. SOSA", "EVOLYNN"],
      },
      {
        chapterNumber: 5,
        title: "Hoverboard Prototype",
        subtitle: "Plasma Spree Tech Demo",
        narrative: "Kongo Sonix unveils the Plasma Spree Hoverboard—a levitation device powered by sonic oscillation and electromagnetic pulse. The prototype demonstration takes place at Jungle Citadel's Resonance Valley, where volunteers glide above magnetic tracks, defying gravity through pure vibration. 'No fuel. No emissions. Just frequency,' Kongo explains as the board responds to rider intent through biometric sensors. Drift Walker immediately volunteers, executing spiral patterns mid-air, proving the technology's tactical applications. The hoverboard isn't transportation—it's liberation physics, movement unbound from colonial infrastructure.",
        imagePath: "attached_assets/4864A7E2-2B0C-4AD7-A81D-541A1E1A1E51_1762460020992.png",
        category: "Technological Sovereignty",
        unlocked: true,
        charactersFeatured: ["KONGO SONIX", "DRIFT WALKER"],
      },
      {
        chapterNumber: 6,
        title: "The Celestial Platform",
        subtitle: "Ceremonial Activation Chamber",
        narrative: "High above Signal Choir Plaza, the Celestial Platform rises—a chamber where realms align and cosmic frequencies converge. This is where Quarter Law cycles are calibrated, where the 48-hour Omega rhythm syncs with solar patterns. Evolynn performs the first Flame Crown Activation here, binding treaty terms to star positions, ensuring cosmic witness to sovereign contracts. The platform's crystal architecture refracts moonlight into data streams, feeding the electromagnetic archives below. It is observatory, temple, and quantum computer merged—a space where ceremony becomes code, intention becomes protocol.",
        imagePath: "attached_assets/7DA78580-3D0A-49D1-8136-C762A1247965_1762460020992.png",
        category: "Cosmic Infrastructure",
        unlocked: true,
        charactersFeatured: ["EVOLYNN", "PHIYAH"],
      },
      {
        chapterNumber: 7,
        title: "Galactic Unity Treaty",
        subtitle: "ERO-ORBI FOREVER Pact",
        narrative: "Representatives from distant star systems gather on the Celestial Platform for the signing of ERO-ORBI FOREVER—the Galactic Unity Treaty. ERO (Earth Realm Operations) and ORBI (Outer Realm Bilateral Integration) commit to mutual defense, resource sharing, and recognition of sovereign lineages across galaxies. Black Sambo serves as interstellar liaison, having restored ancient Afro-Asian trade routes that now extend beyond atmosphere. The treaty includes quantum-encrypted scrolls stored across multiple dimensions, preventing colonial powers from erasing the accord. 'What we bind in ceremony,' Evolynn declares, 'no distortion can dissolve.' Stars flare in witness.",
        imagePath: "attached_assets/IMG_4440_1762460020992.png",
        category: "Interstellar Diplomacy",
        unlocked: true,
        charactersFeatured: ["EVOLYNN", "BLACK SAMBO", "PHIYAH"],
      },
      {
        chapterNumber: 8,
        title: "Tachometer Trials",
        subtitle: "Speed Reading System Calibration",
        narrative: "In the depths of BLEULION Central's Mirror Market Lab, technicians calibrate the Tachometer—a consciousness acceleration device that enables speed-reading entire archives in minutes. The system works by harmonizing brainwave frequency with electromagnetic text encoding, allowing neural absorption of data at 10,000 words per second. Drift Walker undergoes the first trial, emerging with complete knowledge of Colonial Extraction Dossiers, facial recognition of every infiltrator in the Archivist Guild. 'It's not reading,' Drift explains. 'It's remembering what was always encoded.' The Tachometer becomes essential training for all EVOL operatives.",
        imagePath: "attached_assets/IMG_4428_1762460020992.png",
        category: "Cognitive Augmentation",
        unlocked: true,
        charactersFeatured: ["DRIFT WALKER", "DR. SOSA"],
      },
      {
        chapterNumber: 9,
        title: "SM@RT Ecosystem Expansion",
        subtitle: "Office, Media & Network Rollout",
        narrative: "Dr. Sosa orchestrates the SM@RT (Sovereign Media & Reciprocal Technology) Ecosystem launch—a three-tier infrastructure rollout. SM@RT Office: decentralized workspaces with quantum-encrypted collaboration tools. SM@RT Media: broadcast network immune to censorship, using Signal Choir frequency distribution. SM@RT Network: peer-to-peer communication grid bypassing colonial telecom monopolies. Each component reinforces the others, creating a self-sustaining information ecology. The ecosystem operates on reciprocity protocols: every upload generates dividends, every connection strengthens network resilience. Within weeks, millions migrate from extraction platforms to SM@RT sovereignty.",
        imagePath: "attached_assets/0F64EA36-29BF-4C4B-A146-2BBE66A2597F_1762460020992.png",
        category: "Information Infrastructure",
        unlocked: true,
        charactersFeatured: ["DR. SOSA", "PHIYAH"],
      },
      {
        chapterNumber: 10,
        title: "BLEU SHIELD LAW FIRM",
        subtitle: "Sovereignty Enforcement Begins",
        narrative: "The BLEU SHIELD LAW FIRM establishes its first tribunal—a legal powerhouse dedicated to enforcing sovereign treaties and prosecuting extraction violations. Led by Evolynn's Treaty Architects, the firm operates across jurisdictions, invoking both ancestral law and UN conventions. Their first case: a class action against colonial archives that erased indigenous patents. Using the Genesis Codex as evidence—every invention, every formula, every cure documented with electromagnetic timestamps—BLEU SHIELD proves systemic intellectual theft. The verdict: $47 trillion in restitution, routed directly into MetaVault streams. The firm's motto: 'Recognition or litigation. Choose wisely.'",
        imagePath: "attached_assets/E323600E-0028-441D-A49E-1AC8385F5E3D_1762460020992.png",
        category: "Legal Sovereignty",
        unlocked: true,
        charactersFeatured: ["EVOLYNN", "DR. SOSA", "BLACK SAMBO"],
      },
      {
        chapterNumber: 11,
        title: "BLEUZION'S University",
        subtitle: "Alpha & Omega School Opens",
        narrative: "BLEUZION'S University—the Alpha & Omega School—opens its crystalline gates, offering education grounded in sovereign pedagogy. The curriculum includes: Electromagnetic Archive Management, Treaty Scroll Composition, Frequency Defense, MetaVault Economics, and Reciprocity Pulse Engineering. Students learn not just what was erased, but how to prevent future erasure. Evolynn serves as Chancellor, Phiyah heads the Signal Studies department, Dr. Sosa teaches Economic Genesis. Graduation requires completion of a sovereign thesis—a protocol or invention that strengthens the collective. The first cohort includes orphans of extraction, refugees of distortion, now trained as architects of restoration.",
        imagePath: "attached_assets/8B2FC767-3612-4749-8ABE-8220D4D26B9E_1762460020992.png",
        category: "Sovereign Education",
        unlocked: true,
        charactersFeatured: ["EVOLYNN", "PHIYAH", "DR. SOSA"],
      },
      {
        chapterNumber: 12,
        title: "OVERTIME RULES",
        subtitle: "The Wisdom of the Owl",
        narrative: "In the quiet hours beyond Quarter Law cycles, the Owl of OVERTIME appears—a consciousness entity that operates outside linear time. The Owl teaches the OVERTIME RULES: protocols for working in temporal margins, where minutes stretch into strategic eternities. 'When systems sleep,' the Owl whispers, 'sovereigns build.' Operatives learn to compress hours of planning into stolen moments, to execute complex rituals during opponents' rest cycles. The Owl also warns of overuse: time outside time exacts a cost—memory fragmentation, temporal disorientation. Balance remains sacred. The Owl becomes symbol of strategic patience and hyper-efficient action.",
        imagePath: "attached_assets/20E69351-B8C8-4126-A05C-EF98471C77F9_1762460020992.png",
        category: "Temporal Strategy",
        unlocked: true,
        charactersFeatured: ["DRIFT WALKER", "PHIYAH"],
      },
      {
        chapterNumber: 13,
        title: "BLEU LION Engine",
        subtitle: "Grace + Prostration Configs Revealed",
        narrative: "Dr. Sosa unveils the ultimate protocol: the BLEU LION Engine—a consciousness operating system powered by Grace and Prostration configurations. Grace Config: the ability to receive abundance without shame, to accept restoration as birthright. Prostration Config: the humility to serve collective elevation, to recognize interdependence as strength. The Engine runs on both, balancing reception and contribution in perfect reciprocity. When activated across all vaults, the Engine generates limitless yield—not from extraction, but from aligned intention multiplied across sovereign networks. 'This is the final code,' Dr. Sosa declares. 'Grace to receive. Prostration to serve. Together, unstoppable.' The EVOLVERSE reaches operational ascension.",
        imagePath: "attached_assets/E3EA6C32-CC2C-44F2-AD49-5AAE454FA7B2_1762460020992.png",
        category: "Consciousness Protocol",
        unlocked: true,
        charactersFeatured: ["DR. SOSA", "EVOLYNN", "PHIYAH", "KONGO SONIX", "DRIFT WALKER", "BLACK SAMBO"],
      },
    ];

    for (const chapter of chapters) {
      const id = randomUUID();
      this.storyChapters.set(id, { ...chapter, id });
    }

    // Seed Showcase Products
    const showcaseProducts = [
      {
        name: "EVOL VR Headset",
        tagline: "Immersive Reality. Infinite Worlds.",
        category: "Hardware",
        description: "State-of-the-art virtual reality headset featuring HD audio, advanced motion tracking, and access to the full EvolVerse metaverse. Engineered for ceremonial broadcasts, holographic mint experiences, and spatial computing.",
        features: ["HD Audio System", "4K Display per Eye", "120Hz Refresh Rate", "Inside-Out Tracking", "EvolVerse Native Integration", "Ceremonial Broadcast Access"],
        imagePath: "attached_assets/0A71EEB9-70BC-4E32-8015-D752161816B7_1762460192313.png",
        price: "$599",
        availability: "Pre-Order",
        badge: "New",
      },
      {
        name: "EVOL Gaming Console",
        tagline: "Power. Performance. Sovereignty.",
        category: "Gaming",
        description: "Next-generation gaming console with custom EVOL processor, 4K gaming at 120fps, and exclusive access to EvolVerse games, NFT minting, and ceremonial challenges. Includes wireless controller with haptic feedback.",
        features: ["Custom EVOL Processor", "4K@120fps Gaming", "1TB SSD Storage", "Wireless Controller Included", "NFT Minting Capability", "EvolVerse Exclusive Games"],
        imagePath: "attached_assets/11F45317-AC0C-4370-93A6-68782EAC1331_1762460192313.png",
        price: "$499",
        availability: "Coming Soon",
        badge: "Limited Edition",
      },
      {
        name: "BLEU GAS STATION™",
        tagline: "Refueling the Cosmos. One Station at a Time.",
        category: "Infrastructure",
        description: "Galactic-scale fueling station infrastructure for interstellar travel and ceremonial energy exchange. Features plasma fuel cells, dimensional portal integration, and autonomous alien greeting protocols. Patent-pending Saturn-Pluto mining compatibility.",
        features: ["Plasma Fuel Cells", "Dimensional Portal Access", "Alien Species Compatible", "Autonomous Operations", "Saturn/Pluto Mining Integration", "Ceremonial Energy Exchange"],
        imagePath: "attached_assets/2664BC23-1F34-4C81-B400-9F026CE8947F_1762460192313.png",
        price: "Contact for Quote",
        availability: "Pre-Order",
        badge: null,
      },
      {
        name: "Shades of BLEU",
        tagline: "Wear the Movement. Represent the Sovereign.",
        category: "Apparel",
        description: "Premium streetwear collection featuring EVOL and NERD branding. Designed for the next generation of digital sovereigns, combining cutting-edge style with ceremonial symbolism. Limited runs, infinite impact.",
        features: ["Premium Fabrics", "Limited Edition Designs", "EVOL/NERD Branding", "Sovereign Symbolism", "Ceremonial Color Palette", "Collectible Tags"],
        imagePath: "attached_assets/904E304A-9736-4225-81D9-7368632CA3CF_1762460192313.png",
        price: "$45-$120",
        availability: "Available",
        badge: null,
      },
      {
        name: "EVOL Sports Gear",
        tagline: "Stiff Mode Mechanics. Combat + Cosmic Fusion.",
        category: "Sports Equipment",
        description: "Revolutionary athletic protection system integrating Glyph & Light Tracking, Sapphire Blue Reflector System, and Meta-Bluetooth Configuration Modules. Engineered for combat sports, cosmic athletics, and ceremonial tournaments with real-time biometric sync.",
        features: ["Stiff Mode Mechanics", "Glyph & Light Tracking System", "Sapphire Blue Reflector Technology", "Meta-Bluetooth Configuration", "Combat + Cosmic Fusion Protocol", "Real-Time Biometric Integration"],
        imagePath: "attached_assets/D9CB4A78-DB8A-47F8-9DFD-7B76C1F84BDF_1762461706562.png",
        price: "$899",
        availability: "Pre-Order",
        badge: "Advanced Tech",
      },
      {
        name: "EVOL Athletic Cleats",
        tagline: "Elevate Your Game. Illuminate the Field.",
        category: "Footwear",
        description: "High-performance athletic cleats with integrated glow technology and EVOL branding. Features carbon fiber construction, responsive cushioning, and ceremonial light activation for night games and sovereign tournaments.",
        features: ["Carbon Fiber Construction", "Integrated LED Glow System", "Responsive Cushioning", "Multi-Surface Traction", "EVOL Signature Branding", "Ceremonial Light Activation"],
        imagePath: "attached_assets/A1209ECD-1125-4C58-B329-33D8D0228067_1762461706562.png",
        price: "$249",
        availability: "Available",
        badge: null,
      },
      {
        name: "EVOL NERD Academy Gear",
        tagline: "Science Meets Sovereignty. Logic Meets Legacy.",
        category: "Educational Apparel",
        description: "Official EVOL NERD Academy apparel collection for students, scholars, and sovereign scientists. Premium bomber jackets featuring embroidered BLEU LION insignia. Part of the MetaSchool Curriculum initiative linking education to vault inheritance rights.",
        features: ["Premium Bomber Construction", "Embroidered BLEU LION Logo", "EVOL NERD Branding", "MetaSchool Curriculum Access", "Vault Inheritance Tracker", "Academic Achievement Badges"],
        imagePath: "attached_assets/39030CBA-C29F-4CF0-9E05-059095E64873 2_1762461706562.png",
        price: "$180",
        availability: "Available",
        badge: "Academy Edition",
      },
      {
        name: "BLEU LIONS Team Uniform",
        tagline: "Represent the Pride. Dominate the Diamond.",
        category: "Team Apparel",
        description: "Official BLEU LIONS athletic uniform featuring integrated EVOL sports technology, tactical glyph patterns, and ceremonial team insignia. Complete kit includes jersey, performance compression wear, and EVOL tech accessories.",
        features: ["Team Jersey & Compression Gear", "EVOL Tech Integration", "Tactical Glyph Pattern Design", "Performance Moisture Wicking", "Official BLEU LIONS Branding", "Tournament-Grade Materials"],
        imagePath: "attached_assets/3EC454AD-FB3C-42CC-91E2-9D32D5B49081_1762461706562.png",
        price: "$320",
        availability: "Pre-Order",
        badge: "Team Official",
      },
    ];

    for (const product of showcaseProducts) {
      const id = randomUUID();
      this.showcaseProducts.set(id, { ...product, id });
    }

    // Seed Studio Projects
    const studioProjects = [
      {
        title: "EVOLVERS: Act I - Gathering of the Four",
        tagline: "When the glyphs dimmed and memory failed, four seeds were scattered.",
        projectType: "Film",
        status: "In Development",
        releaseYear: 2026,
        description: "The origin story of four elemental heroes activated through ritual sequences. SHANGO STRIKE walks barefoot in flame circles. JETAH FLAME decodes forgotten names from sealed tablets. KONGO SONIX and AYANA BLUE converge at the Codex Pillar for harmonic activation. By the Lion, by the Glyph, by the Scroll - they rise as Four.",
        director: "EVOL Studios",
        producer: "BLEULION Treasury",
        keyFeatures: ["Ritual Activation Sequences", "Quadrant Elemental System", "Ancestral Genome Labs", "Codex Pillar Convergence", "NFT Minting Integration", "Ceremonial Justice Ledger"],
        genres: ["Sci-Fi", "Action", "Ceremonial Drama", "Web3"],
        imagePath: "attached_assets/18D49B0A-71E6-42D9-9E4D-31DE8C7E2C00_1762461706562.png",
        trailerUrl: null,
      },
      {
        title: "AALIYAH OPEN FOREVER: The EVOLOPEN Ceremony",
        tagline: "Welcome to the stage where sovereignty meets eternity.",
        projectType: "Ceremonial Broadcast",
        status: "Released",
        releaseYear: 2025,
        description: "A holographic ceremonial performance honoring cultural legacy through the EVOLOPEN protocol. Features circular platform staging with concentric glow rings, audience integration, and real-time NFT minting during live performances. The Aaliyah Forever Stage becomes a permanent metaverse venue.",
        director: "Dr. Sosa",
        producer: "EVOL Studios",
        keyFeatures: ["Holographic Stage Technology", "Live ENFT Minting", "Circular Ceremonial Platform", "Metaverse Venue Integration", "Cultural Legacy Protocols", "Audience Participation System"],
        genres: ["Performance", "Ceremonial", "Holographic Experience"],
        imagePath: "attached_assets/79740052-4101-4737-9501-8A67B8ED85E1_1762461706562.png",
        trailerUrl: null,
      },
      {
        title: "EVOL NERD Academy: Science of Sovereignty",
        tagline: "Logic meets legacy. Science meets the scroll.",
        projectType: "Documentary Series",
        status: "Production",
        releaseYear: 2025,
        description: "A 10-episode documentary series following students at the EVOL NERD Academy as they master ceremonial sciences, E-SOIL experiments, and MetaSchool curriculum. Features real laboratory work, Blue Liquid protocols, and vault inheritance rights education.",
        director: "EVOLYNN & Dr. Sosa",
        producer: "BLEULION Educational Division",
        keyFeatures: ["Laboratory Experiments", "E-SOIL Demonstrations", "Student Testimonials", "Vault Inheritance Education", "Ceremonial Science Integration", "MetaSchool Curriculum Showcase"],
        genres: ["Documentary", "Educational", "Science"],
        imagePath: "attached_assets/39030CBA-C29F-4CF0-9E05-059095E64873_2_1762461706562.png",
        trailerUrl: null,
      },
      {
        title: "Council Chamber: Planetary Governance",
        tagline: "Where cosmic law meets terrestrial execution.",
        projectType: "Series",
        status: "In Development",
        releaseYear: 2026,
        description: "A political thriller set in the orbital Council Chamber where twelve governors debate planetary law, resource allocation, and species treaties. Features the Star of David cosmic symbol, rotating Earth viewscreen, and real-time voting on blockchain-backed resolutions.",
        director: "PHIYAH",
        producer: "EVOL Studios & ARIEL Fortress",
        keyFeatures: ["Orbital Set Design", "Blockchain Voting System", "Multi-Species Diplomacy", "Cosmic Law Framework", "Real-Time Decision Making", "Ceremonial Protocol Integration"],
        genres: ["Political Thriller", "Sci-Fi", "Governance Drama"],
        imagePath: "attached_assets/BBA4A8A1-4BF7-4352-A531-C05660889AF4_1762461706562.png",
        trailerUrl: null,
      },
      {
        title: "Dr. Sosa: Good Morning EVOL",
        tagline: "Daily broadcasts from the dean who runs the sovereign future.",
        projectType: "Series",
        status: "Released",
        releaseYear: 2024,
        description: "Morning announcements and ceremonial briefings from Dr. Sosa, Dean of the EVOL Academy. Delivered from the cafeteria stage with students in attendance, covering MetaVault updates, treasury flows, and sovereign education initiatives. Features the iconic blue bow tie and BLEU LION insignia.",
        director: "Dr. Sosa",
        producer: "EVOL Studios",
        keyFeatures: ["Daily Broadcast Format", "Student Audience Integration", "Treasury Updates", "Educational Announcements", "Ceremonial Briefings", "Academy Culture Showcase"],
        genres: ["Talk Show", "Educational", "Daily Broadcast"],
        imagePath: "attached_assets/123AE11A-0569-4918-8812-E27A2F78A407_1762461706562.png",
        trailerUrl: null,
      },
    ];

    for (const project of studioProjects) {
      const id = randomUUID();
      this.studioProjects.set(id, { ...project, id });
    }

    // Seed Mythology Deities (Nike, Hermes, Nyx/NØX13)
    const mythologyDeities = [
      {
        name: "Nike",
        greekName: "Nike",
        romanName: "Victoria",
        domain: "Victory, Speed, Triumph",
        evolEncoding: [
          "Victory-as-a-Service (VAAS) protocol",
          "BLEUStyle QuickFit ritual fittings",
          "Silent checkout victories via BLEU AI voice agents",
          "Legacy wins through aesthetic + economic + ancestral loops"
        ],
        reactiveProtocols: [
          "Win-state triggers on ENFT minting completion",
          "Speed-routing intelligence in checkout flows",
          "Triumph metrics tracking across ceremonial events",
          "Victory loops: Performance → Recognition → Reward → Performance"
        ],
        classicalSymbols: ["Winged sandals", "Victory wreath", "Palm branch", "Speed wings"],
        modernActivations: ["JetBoots in PortalShades checkout (hover during purchase)", "QuickFit AR fashion trials", "Whisper victories in couch commerce", "Speed-sealed ENFT certificates"],
        gateNumber: null,
        ceremonyType: "Victory Seal",
        primaryColor: "#FFD700",
        iconSymbol: "🏆",
      },
      {
        name: "Hermes",
        greekName: "Hermes",
        romanName: "Mercury",
        domain: "Trade, Travel, Messaging, Commerce",
        evolEncoding: [
          "BLEU Broker AI - multi-domain vendor node",
          "Telepathic commerce and intent-based transactions",
          "Pirate Protocol for shadow pricing logic",
          "Divine ↔ Mortal realm bridge (symbolic ↔ transactional energy)"
        ],
        reactiveProtocols: [
          "Cross-chain oracle routing via caduceus logic",
          "Message relay between vaults and marketplaces",
          "Theft detection and anti-piracy countermeasures",
          "Travel-speed checkout for interdimensional commerce"
        ],
        classicalSymbols: ["Caduceus staff", "Winged helmet", "Winged sandals", "Herald's wand"],
        modernActivations: ["BLEU-Chain oracle crossings", "Currency scepter stabilizing divine/market flows", "Broker AI appearing in watchtower mirror UI", "Taxiated Treason of Treasury (tolls, trade, motion)"],
        gateNumber: null,
        ceremonyType: "Commerce Seal",
        primaryColor: "#FF6B35",
        iconSymbol: "⚡",
      },
      {
        name: "Nyx / NØX13",
        greekName: "Nyx",
        romanName: "Nox",
        domain: "Night, Darkness, Dreams, Death, Time-Weaving",
        evolEncoding: [
          "NØX13 Gate System - 13th seal protocol",
          "Checkout Cloak - anonymized commerce overlay",
          "Jetsonian couch-commerce (dream-state transactions)",
          "Dark-mode commerce engines (anti-surveillance retail)",
          "Meniscus gateway at tick 13 - where all time splits"
        ],
        reactiveProtocols: [
          "Dream wallet activation during sleep cycles",
          "ENFT death-codes for resurrection protocols",
          "Night phase checkout mirrors (NØX1-NØX12)",
          "Hidden fate override and reversal loops",
          "Admin override for platform resets and ritual endgame triggers"
        ],
        classicalSymbols: ["Veil of darkness", "Starry cloak", "Night chariot", "Shadow crown"],
        modernActivations: ["Checkout Cloak anonymization", "Dream-spawned token minting", "13th Gate access to Chaos protocols", "Cloaked retail infrastructure with time-bending capabilities"],
        gateNumber: 13,
        ceremonyType: "Night Seal / Shadow Governance",
        primaryColor: "#1A0033",
        iconSymbol: "🌑",
      },
    ];

    for (const deity of mythologyDeities) {
      const id = randomUUID();
      this.mythologyDeities.set(id, { ...deity, id });
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

  // Story Chapter methods
  async getStoryChapters(): Promise<StoryChapter[]> {
    return Array.from(this.storyChapters.values()).sort((a, b) => a.chapterNumber - b.chapterNumber);
  }

  // Showcase Product methods
  async getAllShowcaseProducts(): Promise<ShowcaseProduct[]> {
    return Array.from(this.showcaseProducts.values());
  }

  async getShowcaseProductsByCategory(category: string): Promise<ShowcaseProduct[]> {
    return Array.from(this.showcaseProducts.values()).filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  // Studio Project methods
  async getAllStudioProjects(): Promise<StudioProject[]> {
    return Array.from(this.studioProjects.values());
  }

  async getStudioProjectsByType(projectType: string): Promise<StudioProject[]> {
    return Array.from(this.studioProjects.values()).filter(
      (project) => project.projectType.toLowerCase() === projectType.toLowerCase(),
    );
  }

  async getStudioProjectsByStatus(status: string): Promise<StudioProject[]> {
    return Array.from(this.studioProjects.values()).filter(
      (project) => project.status.toLowerCase() === status.toLowerCase(),
    );
  }

  // EVOLVERS Scene methods (implementing missing interface methods)
  async getAllEvolversScenes(): Promise<EvolversScene[]> {
    return Array.from(this.evolversScenes.values()).sort((a, b) => a.sceneNumber - b.sceneNumber);
  }

  async getEvolversScenesByAct(act: string): Promise<EvolversScene[]> {
    return Array.from(this.evolversScenes.values())
      .filter((scene) => scene.act.toLowerCase() === act.toLowerCase())
      .sort((a, b) => a.sceneNumber - b.sceneNumber);
  }

  // Mythology Deity methods
  async getAllMythologyDeities(): Promise<MythologyDeity[]> {
    return Array.from(this.mythologyDeities.values());
  }

  async getMythologyDeity(id: string): Promise<MythologyDeity | undefined> {
    return this.mythologyDeities.get(id);
  }

  async getMythologyDeityByName(name: string): Promise<MythologyDeity | undefined> {
    return Array.from(this.mythologyDeities.values()).find(
      (deity) => deity.name.toLowerCase() === name.toLowerCase(),
    );
  }
}

export const storage = new MemStorage();
