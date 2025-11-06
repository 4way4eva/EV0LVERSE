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
