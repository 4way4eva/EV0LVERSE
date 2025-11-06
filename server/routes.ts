import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertOverscaleDomainSchema,
  insertHiddenSocietySchema,
  insertMallNodeSchema,
} from "@shared/schema";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Overscale Domains Routes
  app.get("/api/overscale-domains", async (req, res) => {
    try {
      const domains = await storage.getAllOverscaleDomains();
      res.json(domains);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch overscale domains" });
    }
  });

  app.get("/api/overscale-domains/:id", async (req, res) => {
    try {
      const domain = await storage.getOverscaleDomain(req.params.id);
      if (!domain) {
        return res.status(404).json({ error: "Domain not found" });
      }
      res.json(domain);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch domain" });
    }
  });

  app.post("/api/overscale-domains/seed", async (req, res) => {
    try {
      const csvPath = path.join(process.cwd(), "attached_assets", "overscale_matrix_full_1762456077941.csv");
      const csvContent = await fs.readFile(csvPath, "utf-8");
      const lines = csvContent.split("\n").filter(line => line.trim());
      const headers = lines[0].split(",");
      
      const domains = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        if (values.length === headers.length) {
          const domain = await storage.createOverscaleDomain({
            domain: values[0],
            ownerOrFounder: values[1],
            incumbentStrength: values[2],
            ev0lAttackSurface: values[3],
            hardballMove: values[4],
            coinFlow: values[5],
            vault: values[6],
            guard: values[7],
            metricLift: values[8] || "",
          });
          domains.push(domain);
        }
      }
      
      res.json({ message: `Seeded ${domains.length} overscale domains`, count: domains.length });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ error: "Failed to seed overscale domains" });
    }
  });

  // Hidden Societies Routes
  app.get("/api/hidden-societies", async (req, res) => {
    try {
      const societies = await storage.getAllHiddenSocieties();
      res.json(societies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hidden societies" });
    }
  });

  app.get("/api/hidden-societies/:id", async (req, res) => {
    try {
      const society = await storage.getHiddenSociety(req.params.id);
      if (!society) {
        return res.status(404).json({ error: "Society not found" });
      }
      res.json(society);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch society" });
    }
  });

  app.patch("/api/hidden-societies/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const society = await storage.updateHiddenSocietyStatus(req.params.id, status);
      if (!society) {
        return res.status(404).json({ error: "Society not found" });
      }
      res.json(society);
    } catch (error) {
      res.status(500).json({ error: "Failed to update society status" });
    }
  });

  app.post("/api/hidden-societies/seed", async (req, res) => {
    try {
      const csvPath = path.join(process.cwd(), "attached_assets", "Hidden_Societies_Chart_1762456144424.csv");
      const csvContent = await fs.readFile(csvPath, "utf-8");
      const lines = csvContent.split("\n").filter(line => line.trim());
      
      const societies = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",");
        if (values.length >= 4) {
          const society: any = {
            name: values[0],
            symbol: values[1],
            status: values[2],
            accessLevel: values[3],
          };
          societies.push(society);
        }
      }
      
      res.json({ message: `Seeded ${societies.length} hidden societies`, societies });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ error: "Failed to seed hidden societies" });
    }
  });

  // War Actors Routes
  app.get("/api/war-actors", async (req, res) => {
    try {
      const actors = await storage.getAllWarActors();
      res.json(actors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch war actors" });
    }
  });

  app.get("/api/war-actors/:codename", async (req, res) => {
    try {
      const actor = await storage.getWarActorByCodename(req.params.codename);
      if (!actor) {
        return res.status(404).json({ error: "War actor not found" });
      }
      res.json(actor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch war actor" });
    }
  });

  // Mall Nodes Routes
  app.get("/api/mall-nodes", async (req, res) => {
    try {
      const malls = await storage.getAllMallNodes();
      res.json(malls);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mall nodes" });
    }
  });

  app.get("/api/mall-nodes/:id", async (req, res) => {
    try {
      const mall = await storage.getMallNode(req.params.id);
      if (!mall) {
        return res.status(404).json({ error: "Mall node not found" });
      }
      res.json(mall);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mall node" });
    }
  });

  // Market Products Routes
  app.get("/api/market-products", async (req, res) => {
    try {
      const products = await storage.getAllMarketProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch market products" });
    }
  });

  app.get("/api/market-products/sector/:sector", async (req, res) => {
    try {
      const products = await storage.getMarketProductsBySector(req.params.sector);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by sector" });
    }
  });

  // Ceremonial Rituals Routes
  app.get("/api/ceremonial-rituals", async (req, res) => {
    try {
      const rituals = await storage.getAllCeremonialRituals();
      res.json(rituals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ceremonial rituals" });
    }
  });

  app.get("/api/ceremonial-rituals/:id", async (req, res) => {
    try {
      const ritual = await storage.getCeremonialRitual(req.params.id);
      if (!ritual) {
        return res.status(404).json({ error: "Ritual not found" });
      }
      res.json(ritual);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ritual" });
    }
  });

  app.patch("/api/ceremonial-rituals/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const ritual = await storage.updateRitualStatus(req.params.id, status);
      if (!ritual) {
        return res.status(404).json({ error: "Ritual not found" });
      }
      res.json(ritual);
    } catch (error) {
      res.status(500).json({ error: "Failed to update ritual status" });
    }
  });

  // Story Chapters Routes
  app.get("/api/story-chapters", async (req, res) => {
    try {
      const chapters = await storage.getStoryChapters();
      res.json(chapters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch story chapters" });
    }
  });

  // Showcase Products Routes
  app.get("/api/showcase-products", async (req, res) => {
    try {
      const products = await storage.getAllShowcaseProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch showcase products" });
    }
  });

  app.get("/api/showcase-products/category/:category", async (req, res) => {
    try {
      const products = await storage.getShowcaseProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch showcase products by category" });
    }
  });

  // Studio Projects Routes
  app.get("/api/studio-projects", async (req, res) => {
    try {
      const projects = await storage.getAllStudioProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch studio projects" });
    }
  });

  app.get("/api/studio-projects/type/:projectType", async (req, res) => {
    try {
      const projects = await storage.getStudioProjectsByType(req.params.projectType);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch studio projects by type" });
    }
  });

  app.get("/api/studio-projects/status/:status", async (req, res) => {
    try {
      const projects = await storage.getStudioProjectsByStatus(req.params.status);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch studio projects by status" });
    }
  });

  // Mythology Deities Routes (Nike, Hermes, Nyx/NØX13)
  app.get("/api/mythology-deities", async (req, res) => {
    try {
      const deities = await storage.getAllMythologyDeities();
      res.json(deities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mythology deities" });
    }
  });

  app.get("/api/mythology-deities/:id", async (req, res) => {
    try {
      const deity = await storage.getMythologyDeity(req.params.id);
      if (!deity) {
        return res.status(404).json({ error: "Deity not found" });
      }
      res.json(deity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deity" });
    }
  });

  app.get("/api/mythology-deities/name/:name", async (req, res) => {
    try {
      const deity = await storage.getMythologyDeityByName(req.params.name);
      if (!deity) {
        return res.status(404).json({ error: "Deity not found" });
      }
      res.json(deity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deity by name" });
    }
  });

  // Codex Layers Routes (10-layer EV0L Codex system)
  app.get("/api/codex-layers", async (req, res) => {
    try {
      const layers = await storage.getAllCodexLayers();
      res.json(layers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch codex layers" });
    }
  });

  app.get("/api/codex-layers/:id", async (req, res) => {
    try {
      const layer = await storage.getCodexLayer(req.params.id);
      if (!layer) {
        return res.status(404).json({ error: "Codex layer not found" });
      }
      res.json(layer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch codex layer" });
    }
  });

  app.get("/api/codex-layers/number/:layerNumber", async (req, res) => {
    try {
      const layerNumber = parseInt(req.params.layerNumber);
      const layer = await storage.getCodexLayerByNumber(layerNumber);
      if (!layer) {
        return res.status(404).json({ error: "Codex layer not found" });
      }
      res.json(layer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch codex layer by number" });
    }
  });

  // Environmental Cities Routes (Climate & Density Tracking)
  app.get("/api/environmental-cities", async (req, res) => {
    try {
      const cities = await storage.getAllEnvironmentalCities();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch environmental cities" });
    }
  });

  app.get("/api/environmental-cities/:id", async (req, res) => {
    try {
      const city = await storage.getEnvironmentalCity(req.params.id);
      if (!city) {
        return res.status(404).json({ error: "Environmental city not found" });
      }
      res.json(city);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch environmental city" });
    }
  });

  app.get("/api/environmental-cities/region/:region", async (req, res) => {
    try {
      const cities = await storage.getEnvironmentalCitiesByRegion(req.params.region);
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cities by region" });
    }
  });

  app.get("/api/environmental-cities/biome/:biome", async (req, res) => {
    try {
      const cities = await storage.getEnvironmentalCitiesByBiome(req.params.biome);
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cities by biome" });
    }
  });

  // Image Audits Routes (ENFT Density Metrics & Provenance)
  app.get("/api/image-audits", async (req, res) => {
    try {
      const audits = await storage.getAllImageAudits();
      res.json(audits);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch image audits" });
    }
  });

  app.get("/api/image-audits/:id", async (req, res) => {
    try {
      const audit = await storage.getImageAudit(req.params.id);
      if (!audit) {
        return res.status(404).json({ error: "Image audit not found" });
      }
      res.json(audit);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch image audit" });
    }
  });

  app.get("/api/image-audits/file/:fileName", async (req, res) => {
    try {
      const audit = await storage.getImageAuditByFileName(req.params.fileName);
      if (!audit) {
        return res.status(404).json({ error: "Image audit not found" });
      }
      res.json(audit);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch image audit by filename" });
    }
  });

  app.get("/api/image-audits/density/:minScore", async (req, res) => {
    try {
      const minScore = parseFloat(req.params.minScore);
      const audits = await storage.getImageAuditsByDensityScore(minScore);
      res.json(audits);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch image audits by density score" });
    }
  });

  // MetaSchools Routes (Educational/Consciousness Sequencing Systems)
  app.get("/api/meta-schools", async (req, res) => {
    try {
      const schools = await storage.getAllMetaSchools();
      res.json(schools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meta schools" });
    }
  });

  app.get("/api/meta-schools/:id", async (req, res) => {
    try {
      const school = await storage.getMetaSchool(req.params.id);
      if (!school) {
        return res.status(404).json({ error: "Meta school not found" });
      }
      res.json(school);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meta school" });
    }
  });

  app.get("/api/meta-schools/status/:status", async (req, res) => {
    try {
      const schools = await storage.getMetaSchoolsByStatus(req.params.status);
      res.json(schools);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schools by status" });
    }
  });

  // MetaNations Routes (Sovereign Nation-State Structures)
  app.get("/api/meta-nations", async (req, res) => {
    try {
      const nations = await storage.getAllMetaNations();
      res.json(nations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meta nations" });
    }
  });

  app.get("/api/meta-nations/:id", async (req, res) => {
    try {
      const nation = await storage.getMetaNation(req.params.id);
      if (!nation) {
        return res.status(404).json({ error: "Meta nation not found" });
      }
      res.json(nation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meta nation" });
    }
  });

  app.get("/api/meta-nations/status/:status", async (req, res) => {
    try {
      const nations = await storage.getMetaNationsByDiplomaticStatus(req.params.status);
      res.json(nations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch nations by diplomatic status" });
    }
  });

  // MetaGalaxies Routes (Cosmic-Scale Organizational Structures)
  app.get("/api/meta-galaxies", async (req, res) => {
    try {
      const galaxies = await storage.getAllMetaGalaxies();
      res.json(galaxies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meta galaxies" });
    }
  });

  app.get("/api/meta-galaxies/:id", async (req, res) => {
    try {
      const galaxy = await storage.getMetaGalaxy(req.params.id);
      if (!galaxy) {
        return res.status(404).json({ error: "Meta galaxy not found" });
      }
      res.json(galaxy);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meta galaxy" });
    }
  });

  app.get("/api/meta-galaxies/consciousness/:level", async (req, res) => {
    try {
      const galaxies = await storage.getMetaGalaxiesByConsciousnessLevel(req.params.level);
      res.json(galaxies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch galaxies by consciousness level" });
    }
  });

  // Treasury Vault Routes (MetaVault 5100 System)
  app.get("/api/treasury-vaults", async (req, res) => {
    try {
      const vaults = await storage.getTreasuryVaults();
      res.json(vaults);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treasury vaults" });
    }
  });

  app.get("/api/treasury-vaults/:id", async (req, res) => {
    try {
      const vault = await storage.getTreasuryVault(req.params.id);
      if (!vault) {
        return res.status(404).json({ error: "Treasury vault not found" });
      }
      res.json(vault);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treasury vault" });
    }
  });

  // ENFT Registry Routes
  app.get("/api/enft-registry", async (req, res) => {
    try {
      const registry = await storage.getEnftRegistry();
      res.json(registry);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ENFT registry" });
    }
  });

  app.get("/api/enft-registry/vault/:vaultId", async (req, res) => {
    try {
      const entries = await storage.getEnftRegistryByVaultId(req.params.vaultId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ENFT entries for vault" });
    }
  });

  // MetaVault Summary Routes
  app.get("/api/metavault-summary", async (req, res) => {
    try {
      const summary = await storage.getMetaVaultSummary();
      if (!summary) {
        return res.status(404).json({ error: "MetaVault summary not found" });
      }
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch MetaVault summary" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
