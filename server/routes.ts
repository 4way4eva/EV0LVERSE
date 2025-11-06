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

  const httpServer = createServer(app);

  return httpServer;
}
