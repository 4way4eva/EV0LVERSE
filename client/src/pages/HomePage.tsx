import Hero from "@/components/Hero";
import HydroCoinDashboard from "@/components/HydroCoinDashboard";
import ENATODashboard from "@/components/ENATODashboard";
import MultiTokenEconomy from "@/components/MultiTokenEconomy";
import NFTGallery from "@/components/NFTGallery";
import VaultBrowser from "@/components/VaultBrowser";
import MintInterface from "@/components/MintInterface";
import CeremonialProtocol from "@/components/CeremonialProtocol";
import ExtractionDossier from "@/components/ExtractionDossier";
import ThemeToggle from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("enato");

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🦁</div>
            <h1 className="font-ceremonial text-xl font-bold tracking-wide">
              BLEULIONTREASURY
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <Hero />

      <div className="container px-6 py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="enato" data-testid="tab-enato">ENATO</TabsTrigger>
            <TabsTrigger value="tokens" data-testid="tab-tokens">Tokens</TabsTrigger>
            <TabsTrigger value="hydrocoin" data-testid="tab-hydrocoin">HydroCoin</TabsTrigger>
            <TabsTrigger value="mint" data-testid="tab-mint">Mint</TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">Gallery</TabsTrigger>
            <TabsTrigger value="vault" data-testid="tab-vault">Vault</TabsTrigger>
            <TabsTrigger value="protocol" data-testid="tab-protocol">Protocol</TabsTrigger>
            <TabsTrigger value="dossier" data-testid="tab-dossier">Dossier</TabsTrigger>
          </TabsList>

          <TabsContent value="enato">
            <ENATODashboard />
          </TabsContent>

          <TabsContent value="tokens">
            <MultiTokenEconomy />
          </TabsContent>

          <TabsContent value="hydrocoin">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">HydroCoin</h2>
              <p className="text-muted-foreground mb-8">
                Water-backed cryptocurrency powering sustainable infrastructure
              </p>
              <HydroCoinDashboard />
            </div>
          </TabsContent>

          <TabsContent value="mint">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Mint ENFT</h2>
              <p className="text-muted-foreground mb-8">
                Create your sovereign NFT with IPFS metadata storage
              </p>
              <MintInterface />
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">ENFT Collection</h2>
              <p className="text-muted-foreground mb-8">
                Browse all EV0L ENFTs across the EvolVerse
              </p>
              <NFTGallery />
            </div>
          </TabsContent>

          <TabsContent value="vault">
            <VaultBrowser />
          </TabsContent>

          <TabsContent value="protocol">
            <CeremonialProtocol />
          </TabsContent>

          <TabsContent value="dossier">
            <ExtractionDossier />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t border-border py-12 mt-24">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-ceremonial text-lg font-bold mb-4">BLEULIONTREASURY™</h3>
              <p className="text-sm text-muted-foreground">
                Sovereign governance and multi-currency economy across the EvolVerse ecosystem
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Currency Systems</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>ENATO Fiat</li>
                <li>HydroCoin</li>
                <li>Blu-Tillion</li>
                <li>Multi-Token Economy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>ENATO Codex Constitution</li>
                <li>BLEUChain Protocol</li>
                <li>MetaVault Documentation</li>
                <li>Block Explorer</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 BLEULIONTREASURY. ENATO Sovereign. Council Certified. Hash Authenticated.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
