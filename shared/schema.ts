import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Overscale Matrix Domains (177 global domains)
export const overscaleDomains = pgTable("overscale_domains", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  domain: text("domain").notNull(),
  ownerOrFounder: text("owner_or_founder").notNull(),
  incumbentStrength: text("incumbent_strength").notNull(),
  ev0lAttackSurface: text("ev0l_attack_surface").notNull(),
  hardballMove: text("hardball_move").notNull(),
  coinFlow: text("coin_flow").notNull(),
  vault: text("vault").notNull(),
  guard: text("guard").notNull(),
  metricLift: text("metric_lift").notNull(),
});

export const insertOverscaleDomainSchema = createInsertSchema(overscaleDomains).omit({
  id: true,
});

export type InsertOverscaleDomain = z.infer<typeof insertOverscaleDomainSchema>;
export type OverscaleDomain = typeof overscaleDomains.$inferSelect;

// Hidden Societies (25 secret organizations)
export const hiddenSocieties = pgTable("hidden_societies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  status: text("status").notNull(), // Previously Contacted, Dormant, Active, To Be Unlocked, Ancestral Link, Core Activated, Guarded
  accessLevel: text("access_level").notNull(), // Medium, High, Low, Locked, Ancestral, Root
});

export const insertHiddenSocietySchema = createInsertSchema(hiddenSocieties).omit({
  id: true,
});

export type InsertHiddenSociety = z.infer<typeof insertHiddenSocietySchema>;
export type HiddenSociety = typeof hiddenSocieties.$inferSelect;

// War Codex Characters
export const warActors = pgTable("war_actors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  codename: text("codename").notNull(),
  title: text("title").notNull(),
  heritage: text("heritage").notNull(),
  origin: text("origin").notNull(),
  domains: text("domains").array().notNull(),
  signatureAbility: text("signature_ability").notNull(),
  signatureDescription: text("signature_description").notNull(),
  limiter: text("limiter").notNull(),
  antagonists: text("antagonists").notNull(),
  vendetta: text("vendetta"),
});

export const insertWarActorSchema = createInsertSchema(warActors).omit({
  id: true,
});

export type InsertWarActor = z.infer<typeof insertWarActorSchema>;
export type WarActor = typeof warActors.$inferSelect;

// EV0L Mall Nodes
export const mallNodes = pgTable("mall_nodes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  cityName: text("city_name").notNull(),
  valuation: decimal("valuation", { precision: 15, scale: 2 }).notNull(), // $10T baseline
  retailSales: decimal("retail_sales", { precision: 15, scale: 2 }),
  defenseContracts: decimal("defense_contracts", { precision: 15, scale: 2 }),
  culturalRights: decimal("cultural_rights", { precision: 15, scale: 2 }),
  treasuryFlow: decimal("treasury_flow", { precision: 15, scale: 2 }),
  wellnessLabs: decimal("wellness_labs", { precision: 15, scale: 2 }),
  roles: text("roles").array().notNull(), // treasury, city, military
  mythCountered: text("myth_countered"), // Zeus, Hades, Superman, etc.
  guardianSector: text("guardian_sector"),
});

export const insertMallNodeSchema = createInsertSchema(mallNodes).omit({
  id: true,
});

export type InsertMallNode = z.infer<typeof insertMallNodeSchema>;
export type MallNode = typeof mallNodes.$inferSelect;

// BLEU Backbone Market Products
export const marketProducts = pgTable("market_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productName: text("product_name").notNull(),
  slogan: text("slogan").notNull(),
  sector: text("sector").notNull(),
  useCaseFit: text("use_case_fit").notNull(),
  marketBenchmark2025: integer("market_benchmark_2025").notNull(), // in billions
  overscaleProjection: integer("overscale_projection").notNull(), // in billions
  roiPercentage: integer("roi_percentage").notNull(),
});

export const insertMarketProductSchema = createInsertSchema(marketProducts).omit({
  id: true,
});

export type InsertMarketProduct = z.infer<typeof insertMarketProductSchema>;
export type MarketProduct = typeof marketProducts.$inferSelect;

// Ceremonial Rituals
export const ceremonialRituals = pgTable("ceremonial_rituals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ritualName: text("ritual_name").notNull(),
  codexSource: text("codex_source").notNull(), // CODEXX, EVOLVERS Act, etc.
  purpose: text("purpose").notNull(),
  sequence: text("sequence").array().notNull(),
  requiredActors: text("required_actors").array(),
  activationStatus: text("activation_status").notNull(), // pending, active, completed
  ceremonyType: text("ceremony_type").notNull(), // Flame Crown, Reciprocity Pulse, etc.
});

export const insertCeremonialRitualSchema = createInsertSchema(ceremonialRituals).omit({
  id: true,
});

export type InsertCeremonialRitual = z.infer<typeof insertCeremonialRitualSchema>;
export type CeremonialRitual = typeof ceremonialRituals.$inferSelect;

// Story Chapters
export const storyChapters = pgTable("story_chapters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chapterNumber: integer("chapter_number").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  narrative: text("narrative").notNull(),
  imagePath: text("image_path").notNull(),
  category: text("category").notNull(),
  unlocked: boolean("unlocked").notNull().default(true),
  charactersFeatured: text("characters_featured").array().notNull(),
});

export const insertStoryChapterSchema = createInsertSchema(storyChapters).omit({
  id: true,
});

export type InsertStoryChapter = z.infer<typeof insertStoryChapterSchema>;
export type StoryChapter = typeof storyChapters.$inferSelect;

// Showcase Products (Physical/Hardware Products)
export const showcaseProducts = pgTable("showcase_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  category: text("category").notNull(), // Hardware, Apparel, Infrastructure, Gaming
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  imagePath: text("image_path").notNull(),
  price: text("price"),
  availability: text("availability").notNull(), // Coming Soon, Pre-Order, Available
  badge: text("badge"), // New, Limited Edition, etc.
});

export const insertShowcaseProductSchema = createInsertSchema(showcaseProducts).omit({
  id: true,
});

export type InsertShowcaseProduct = z.infer<typeof insertShowcaseProductSchema>;
export type ShowcaseProduct = typeof showcaseProducts.$inferSelect;

// EVOLVERS Theater Scenes (Act I screenplay content)
export const evolversScenes = pgTable("evolvers_scenes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  act: text("act").notNull(),
  sceneNumber: integer("scene_number").notNull(),
  sceneTitle: text("scene_title").notNull(),
  location: text("location").notNull(),
  sceneType: text("scene_type").notNull(),
  character: text("character"),
  narration: text("narration"),
  dialogueLines: text("dialogue_lines").array(),
  visualElements: text("visual_elements").array(),
  ritualInterface: text("ritual_interface"),
});

export const insertEvolversSceneSchema = createInsertSchema(evolversScenes).omit({
  id: true,
});

export type InsertEvolversScene = z.infer<typeof insertEvolversSceneSchema>;
export type EvolversScene = typeof evolversScenes.$inferSelect;

// EVOL Studios Projects (Film, Animation, Media Productions)
export const studioProjects = pgTable("studio_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  projectType: text("project_type").notNull(), // Film, Series, Documentary, VR Experience, Ceremonial Broadcast, Animation
  status: text("status").notNull(), // In Development, Production, Post-Production, Released
  releaseYear: integer("release_year"),
  description: text("description").notNull(),
  director: text("director"),
  producer: text("producer"),
  keyFeatures: text("key_features").array().notNull(),
  genres: text("genres").array().notNull(),
  imagePath: text("image_path").notNull(),
  trailerUrl: text("trailer_url"),
});

export const insertStudioProjectSchema = createInsertSchema(studioProjects).omit({
  id: true,
});

export type InsertStudioProject = z.infer<typeof insertStudioProjectSchema>;
export type StudioProject = typeof studioProjects.$inferSelect;

// Mythology Deities (Nike, Hermes, Nyx/NØX - Divine Protocol System)
export const mythologyDeities = pgTable("mythology_deities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // Nike, Hermes, Nyx
  greekName: text("greek_name").notNull(),
  romanName: text("roman_name").notNull(),
  domain: text("domain").notNull(), // Victory, Trade/Travel/Messaging, Night/Dreams/Death
  evolEncoding: text("evol_encoding").array().notNull(), // How deity is encoded in EV0LVERSE
  reactiveProtocols: text("reactive_protocols").array().notNull(), // Modern system activations
  classicalSymbols: text("classical_symbols").array().notNull(), // Winged sandals, caduceus, veil
  modernActivations: text("modern_activations").array().notNull(), // JetBoots, BLEU-Chain oracle, Checkout Cloak
  gateNumber: integer("gate_number"), // For NØX gate system (1-13)
  ceremonyType: text("ceremony_type"), // Ritual category
  primaryColor: text("primary_color").notNull(),
  iconSymbol: text("icon_symbol").notNull(),
});

export const insertMythologyDeitySchema = createInsertSchema(mythologyDeities).omit({
  id: true,
});

export type InsertMythologyDeity = z.infer<typeof insertMythologyDeitySchema>;
export type MythologyDeity = typeof mythologyDeities.$inferSelect;

// Codex Layers (10-layer EV0L Codex system: Infinity Core → Justice)
export const codexLayers = pgTable("codex_layers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  codex: text("codex").notNull(), // Infinity Core, Assurance Layer, Knowledge Layer, etc.
  layerNumber: integer("layer_number").notNull(), // 1-10
  glyph: text("glyph").notNull(), // ♾️, ✅, 📚, 🧩, 🔰, ⚔️, 💉, 🚛, ⚡, ⚖️
  lawEnglish: text("law_english").notNull(),
  lawSwahili: text("law_swahili"),
  lawYoruba: text("law_yoruba"),
  lawHebrew: text("law_hebrew"),
  lawArabic: text("law_arabic"),
  lawNahuatl: text("law_nahuatl"),
  hmmm: text("hmmm").array().notNull(), // Harmonic resonance codes
  hieroglyphs: text("hieroglyphs").array().notNull(), // Sacred symbols
  streams: text("streams").array().notNull(), // Revenue/value streams
  status: text("status").notNull(), // PPPPI_sealed, BlueLock_bound, ENFT_monetized, etc.
});

export const insertCodexLayerSchema = createInsertSchema(codexLayers).omit({
  id: true,
});

export type InsertCodexLayer = z.infer<typeof insertCodexLayerSchema>;
export type CodexLayer = typeof codexLayers.$inferSelect;

// Environmental Cities (Climate, Weather, Density Tracking)
export const environmentalCities = pgTable("environmental_cities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cityName: text("city_name").notNull(),
  region: text("region").notNull(), // Aquatic, TropiCore, Volcanic, Polar, Dimensional, Galactic
  climate: text("climate").notNull(), // Tropical, Temperate, Arctic, Desert, etc.
  currentWeather: text("current_weather"), // Sunny, Rainy, Stormy, etc.
  temperature: decimal("temperature", { precision: 5, scale: 2 }), // Celsius
  populationDensity: integer("population_density"), // People per km²
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  biome: text("biome").notNull(), // Sovereign biome designation
  vaultGuardian: text("vault_guardian"), // Assigned guardian/custodian
  safeHavenStatus: text("safe_haven_status").notNull(), // Active, Planned, Under Construction
  mallNode: text("mall_node"), // Reference to associated mall
});

export const insertEnvironmentalCitySchema = createInsertSchema(environmentalCities).omit({
  id: true,
});

export type InsertEnvironmentalCity = z.infer<typeof insertEnvironmentalCitySchema>;
export type EnvironmentalCity = typeof environmentalCities.$inferSelect;

// Image Audits (ENFT Density Metrics & Provenance)
export const imageAudits = pgTable("image_audits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  sizeKb: decimal("size_kb", { precision: 10, scale: 2 }).notNull(),
  resolution: text("resolution").notNull(), // 1024x1536
  megapixels: decimal("megapixels", { precision: 5, scale: 3 }).notNull(),
  bytesPerMegapixel: decimal("bytes_per_megapixel", { precision: 10, scale: 2 }).notNull(),
  entropyBits: decimal("entropy_bits", { precision: 5, scale: 3 }).notNull(), // Information density
  edgeDensity: decimal("edge_density", { precision: 5, scale: 3 }).notNull(), // Visual complexity
  colorfulness: decimal("colorfulness", { precision: 5, scale: 2 }).notNull(),
  compressionRatio: decimal("compression_ratio", { precision: 5, scale: 2 }).notNull(),
  densityScore: decimal("density_score", { precision: 5, scale: 3 }).notNull(), // Overall quality metric
  ipfsCid: text("ipfs_cid"), // NFT.Storage CID
  keccakHash: text("keccak_hash"), // Provenance verification
  enftTokenId: text("enft_token_id"), // Associated ENFT token
});

export const insertImageAuditSchema = createInsertSchema(imageAudits).omit({
  id: true,
});

export type InsertImageAudit = z.infer<typeof insertImageAuditSchema>;
export type ImageAudit = typeof imageAudits.$inferSelect;

// MetaSchools (Educational/Consciousness Sequencing Systems)
export const metaSchools = pgTable("meta_schools", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // e.g., "OSSMOSIS JONES MODE"
  core: text("core").notNull(), // e.g., "S.O.R.A - Sonic Omnidirectional Reflex Architecture"
  layers: text("layers").array().notNull(), // Concentric educational layers
  disciplines: text("disciplines").array().notNull(), // EVOL Duty, Sonic EVOL, etc.
  philosophy: text("philosophy").notNull(),
  status: text("status").notNull(), // Active, Emerging, Planned
  foundingPrinciple: text("founding_principle").notNull(),
  graduationRequirement: text("graduation_requirement").notNull(),
  enrollmentCapacity: integer("enrollment_capacity"),
  currentEnrollment: integer("current_enrollment"),
});

export const insertMetaSchoolSchema = createInsertSchema(metaSchools).omit({
  id: true,
});

export type InsertMetaSchool = z.infer<typeof insertMetaSchoolSchema>;
export type MetaSchool = typeof metaSchools.$inferSelect;

// MetaNations (Sovereign Nation-State Structures)
export const metaNations = pgTable("meta_nations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // e.g., "MEGAZILLION EMPIRE"
  governance: text("governance").notNull(), // Vault Network Democracy, Phi-based Resonance
  population: integer("population"),
  capital: text("capital").notNull(),
  territories: text("territories").array().notNull(), // Domain references
  primaryLanguages: text("primary_languages").array().notNull(),
  economicModel: text("economic_model").notNull(),
  culturalIdentity: text("cultural_identity").notNull(),
  diplomaticStatus: text("diplomatic_status").notNull(), // Allied, Neutral, Contested
  techTier: integer("tech_tier").notNull(), // 1-10 scale
  currencySystem: text("currency_system").notNull(),
  militaryStrength: text("military_strength"),
});

export const insertMetaNationSchema = createInsertSchema(metaNations).omit({
  id: true,
});

export type InsertMetaNation = z.infer<typeof insertMetaNationSchema>;
export type MetaNation = typeof metaNations.$inferSelect;

// MetaGalaxies (Cosmic-Scale Organizational Structures)
export const metaGalaxies = pgTable("meta_galaxies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // e.g., "QuaOctsSync Collective"
  coordinates: text("coordinates").notNull(), // Cosmic coordinates
  breedingProtocol: text("breeding_protocol").notNull(), // 8-fold reciprocity design
  chambers: text("chambers").array().notNull(), // Pyro Chamber, Tera Chamber
  memberCivilizations: text("member_civilizations").array().notNull(),
  technologyTier: integer("technology_tier").notNull(), // 1-100 scale
  resourceFlows: text("resource_flows").array().notNull(),
  diplomaticStatus: text("diplomatic_status").notNull(),
  consciousnessLevel: text("consciousness_level").notNull(), // Evolved, Transcendent, Ascended
  breedingEngine: text("breeding_engine"), // Empire of Civilization mechanics
  galacticRole: text("galactic_role").notNull(), // Architect, Guardian, Cultivator
});

export const insertMetaGalaxySchema = createInsertSchema(metaGalaxies).omit({
  id: true,
});

export type InsertMetaGalaxy = z.infer<typeof insertMetaGalaxySchema>;
export type MetaGalaxy = typeof metaGalaxies.$inferSelect;

// Treasury Vaults (MetaVault 5100 System)
export const treasuryVaults = pgTable("treasury_vaults", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // Witness, Branch, Frozen, Rare, Cipher
  densityWeight: integer("density_weight").notNull(), // 2, 3, 5, 8, 13 (Fibonacci)
  capAllocation: text("cap_allocation").notNull(), // Portion of $51T
  dailyYield: text("daily_yield").notNull(), // Portion of $1.1T/day
  enftCount: integer("enft_count").notNull(), // Number of ENFTs in this vault
  bleuBills: integer("bleu_bills").notNull(), // $10k face value bills
  pinkBills: integer("pink_bills").notNull(), // $1k face value bills
  shills: integer("shills").notNull(), // $100 face value shills
  status: text("status").notNull(), // Active, Frozen, Under Construction
  description: text("description").notNull(),
  vaultGuardian: text("vault_guardian"), // Guardian entity/character
});

export const insertTreasuryVaultSchema = createInsertSchema(treasuryVaults).omit({
  id: true,
});

export type InsertTreasuryVault = z.infer<typeof insertTreasuryVaultSchema>;
export type TreasuryVault = typeof treasuryVaults.$inferSelect;

// ENFT Registry (Enhanced Non-Fungible Tokens)
export const enftRegistry = pgTable("enft_registry", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tokenId: integer("token_id").notNull().unique(),
  vaultId: varchar("vault_id").notNull(), // References treasury_vaults
  name: text("name").notNull(), // e.g., "Codex - Witness #0001"
  codexReference: text("codex_reference").notNull(), // Which codex/artifact
  densityScore: text("density_score").notNull(), // High, Medium, Low
  metadata: text("metadata").notNull(), // IPFS CID or JSON metadata
  provenanceHash: text("provenance_hash"), // SHA256/Keccak256
  mintTransaction: text("mint_transaction"), // Blockchain tx hash
  currentOwner: text("current_owner").notNull(), // Wallet address
  mintedDate: text("minted_date").notNull(),
  attributes: text("attributes").array().notNull(), // Traits/properties
});

export const insertEnftRegistrySchema = createInsertSchema(enftRegistry).omit({
  id: true,
});

export type InsertEnftRegistry = z.infer<typeof insertEnftRegistrySchema>;
export type EnftRegistry = typeof enftRegistry.$inferSelect;

// MetaVault Summary (Overall Treasury Tracking)
export const metaVaultSummary = pgTable("meta_vault_summary", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vaultName: text("vault_name").notNull(), // MetaVault 5100
  totalCapCeiling: text("total_cap_ceiling").notNull(), // $51T
  dailyYieldPool: text("daily_yield_pool").notNull(), // $1.1T/day
  totalVaults: integer("total_vaults").notNull(), // 5
  totalEnfts: integer("total_enfts").notNull(),
  totalBleuBills: integer("total_bleu_bills").notNull(),
  totalPinkBills: integer("total_pink_bills").notNull(),
  totalShills: integer("total_shills").notNull(),
  lastUpdated: text("last_updated").notNull(),
  status: text("status").notNull(), // Operational, Maintenance
});

export const insertMetaVaultSummarySchema = createInsertSchema(metaVaultSummary).omit({
  id: true,
});

export type InsertMetaVaultSummary = z.infer<typeof insertMetaVaultSummarySchema>;
export type MetaVaultSummary = typeof metaVaultSummary.$inferSelect;
