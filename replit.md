# BLEULIONTREASURY Web3 Platform

## Overview

BLEULIONTREASURY is a Web3 sovereign platform that combines ceremonial worldbuilding with blockchain technology. The platform enables minting of EV0L ENFTs (Enhanced Non-Fungible Tokens), management of asset-backed currencies (HydroCoin, FlameCoin, etc.), and governance of treasury vaults within the EvolVerse ecosystem. 

The project integrates mythological narratives from the BLACK§BLEU Sovereign Zone Codex with modern Web3 infrastructure, featuring six sovereign biomes (Aquatic, TropiCore, Volcanic, Polar, Dimensional Spiral, and Galactic), each with unique economies, treaties, and ceremonial protocols.

## Recent Changes

**Date**: November 6, 2025

**Completed Platform Integration**: Successfully integrated all uploaded ceremonial documentation and datasets into a fully functional multi-page Web3 platform with PostgreSQL backend.

### Feature Pages Implemented
1. **Overscale Matrix Control Tower** (`/overscale-matrix`)
   - 175 global domains loaded from CSV seed data
   - Domain detail cards with vault guardianship and regional summaries
   - Backend API integration via TanStack Query

2. **War Codex Tactical Theater** (`/war-codex`)
   - 6 EvolVerse heroes (EVOLYNN, DR. SOSA, PHIYAH, KONGO SONIX, DRIFT WALKER, NEELA)
   - Character dossier cards with powers, affiliations, and tactical roles
   - Backend API integration with loading states

3. **Hidden Societies Access Console** (`/hidden-societies`)
   - 24 secret organizations with status tracking
   - Society cards showing access levels and ceremonial symbols
   - Backend API integration

4. **Mall Command Center** (`/mall-command`)
   - 4 multi-domain hubs (Atlantis Prime Mall, BLEULION Central, Signal Choir Plaza, Jungle Citadel Market)
   - Treasury + City + Military operations visualization
   - Real-time valuation calculations from backend data

5. **Ceremonial Protocol Orchestrator** (`/ceremonial`)
   - 5 ritual sequences (Flame Crown Activation, Reciprocity Pulse, Vortex Codex Unsealing, Choir Seal, Genesis Codex)
   - Tab-based ritual viewer with ceremonial sequence steps
   - Required actors and activation status tracking

6. **Market Intelligence Hub** (`/market-intelligence`)
   - 10 product lines with market projections
   - Search and filter functionality
   - ROI metrics and overscale projections table

7. **ENFT Story Mode** (`/story-mode`)
   - 13 interactive story chapters with expandable narratives
   - Rich visual storytelling using ceremonial imagery (EVOL Awards, Pour House, SORA Spiral, etc.)
   - Chapter progression system with unlock status tracking
   - Category badges (Event, Location, Technology, Institution, Protocol, Wisdom, Infrastructure)
   - Featured character integration linking to EvolVerse heroes

8. **Mythology & Divine Protocol Console** (`/mythology`)
   - Greek/Roman deity integration: Nike (Victory), Hermes (Commerce), Nyx/NØX13 (Night/Shadow)
   - EV0LVERSE encoding system showing how ancient deities manifest as platform protocols
   - Reactive protocol displays (Victory-as-a-Service, BLEU Broker AI, Checkout Cloak)
   - Classical symbols mapped to modern activations (winged sandals → JetBoots, caduceus → BLEU-Chain oracle)
   - NØX13 Gate System visualization (13th seal protocol with admin override capabilities)
   - Tab-based interface for EV0L encoding, reactive protocols, and classical/modern symbol mapping

9. **Codex Audit Console** (`/codex-audit`)
   - **Codex Layers Tab**: 10-layer EV0L Codex system (Infinity Core → Justice)
     - Multilingual laws in 6 languages (English, Swahili, Yoruba, Hebrew, Arabic, Nahuatl)
     - Glyphs, HMMM resonance patterns, hieroglyphs
     - Revenue streams and PPPPI status tracking
   - **Environmental Cities Tab**: Climate tracking for 7 Safe Haven cities
     - Real-time weather, temperature, population density
     - Coordinates, biomes, vault guardians
     - Safe haven status (Active/Under Construction/Planned)
     - Mall node connections
   - **Image Audits Tab**: ENFT provenance and density metrics
     - Density scores, entropy bits, edge detection, colorfulness
     - File metadata (resolution, size, compression ratio)
     - Blockchain provenance (IPFS CIDs, Keccak-256 hashes)
     - Quality metrics with progress bar visualizations

### Technical Implementation
- **Navigation**: Shadcn sidebar primitives with grouped menu items (Core, Command & Control, Operations)
- **Data Layer**: All pages fetch from RESTful API endpoints using TanStack Query
- **Storage**: In-memory storage with comprehensive seed data for all entities
- **Testing**: End-to-end verification using Playwright confirms all pages functional
- **Type Safety**: Drizzle schemas with Zod validation for all data models

### API Endpoints
- `GET /api/overscale-domains` - Overscale Matrix data
- `GET /api/war-actors` - War Codex character data
- `GET /api/hidden-societies` - Hidden Societies data
- `GET /api/mall-nodes` - Mall Command Center data
- `GET /api/ceremonial-rituals` - Ceremonial Protocol data
- `GET /api/market-products` - Market Intelligence data
- `GET /api/story-chapters` - ENFT Story Mode chapters
- `GET /api/mythology-deities` - Mythology & Divine Protocol data
- `GET /api/codex-layers` - 10-layer EV0L Codex system
- `GET /api/environmental-cities` - Environmental tracking for Safe Haven cities
- `GET /api/image-audits` - ENFT provenance and density metrics

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, Vite build system
- **UI Components**: Radix UI primitives with shadcn/ui component library (New York style)
- **Styling**: Tailwind CSS with custom design tokens
  - Typography: Space Grotesk (display), Inter (body), Cinzel Decorative (ceremonial), JetBrains Mono (code)
  - Custom color system with HSL tokens for theming
  - Responsive spacing primitives (2, 4, 6, 8, 12, 16, 20, 24)
- **State Management**: TanStack Query for server state
- **Routing**: File-based routing via Vite
- **Design System**: Web3-inspired aesthetic combining clean dashboard layouts with ceremonial mysticism overlay

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript (ES modules)
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Request Handling**: 
  - JSON body parsing with raw body preservation for verification
  - URL-encoded form support
  - Request/response logging middleware with performance tracking
- **Build**: esbuild for production bundling (platform: node, format: esm)

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with type-safe queries
- **Schema Management**: Drizzle Kit for migrations (`/migrations` directory)
- **Connection Pooling**: Neon serverless pool with WebSocket support
- **Schema Modules**:
  - Users (authentication foundation)
  - Overscale Domains (177 global domains from CSV seed data)
  - Hidden Societies (25 secret organizations)
  - War Actors (character/entity registry)
  - Mall Nodes (physical/virtual commerce hubs)
  - Market Products (ceremonial commerce items)
  - Ceremonial Rituals (protocol definitions)
  - Story Chapters (ENFT narrative sequences)
  - Mythology Deities (Greek/Roman deity integration)
  - Codex Layers (10-layer EV0L Codex with multilingual laws)
  - Environmental Cities (7 Safe Haven cities with climate tracking)
  - Image Audits (ENFT provenance and density metrics)

### Authentication & Authorization
- **Current State**: Basic user schema with username/password (foundation only)
- **Storage Interface**: User creation and retrieval methods defined
- **Future Expansion**: Not yet implemented (sessions, JWT, or wallet-based auth)

### External Dependencies

#### Blockchain & Web3
- **Target Networks**: Avalanche, Polygon, BLEUChain (custom), Ethereum (Sepolia testnet)
- **Token Standards**: ERC-721, ERC-1155 (ENFT metadata schemas)
- **IPFS/Storage**: NFT.Storage integration planned for metadata and assets
- **Provenance**: SHA3-256 hashing for ceremonial scroll verification

#### Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting with WebSocket connections
- **Fonts**: Google Fonts (Space Grotesk, Inter, Cinzel Decorative, JetBrains Mono)
- **UI Libraries**: 
  - Radix UI (@radix-ui/* packages) - 20+ component primitives
  - shadcn/ui component patterns
  - Embla Carousel for galleries
  - cmdk for command palette interfaces

#### Asset Management
- **Attached Assets**: Extensive ceremonial documentation stored in `/attached_assets`
  - Zone codexes, war protocols, character scrolls
  - CSV seed data (overscale matrix, global extraction records)
  - JSON metadata templates for ENFT minting
  - Python mint scripts for batch operations
- **Static Assets**: SVG icons, favicon at `/favicon.png`

#### Development Tools
- **Vite Plugins**: 
  - @replit/vite-plugin-runtime-error-modal
  - @replit/vite-plugin-cartographer (dev only)
  - @replit/vite-plugin-dev-banner (dev only)
- **Type Safety**: Zod schemas with Drizzle integration for runtime validation
- **Code Quality**: TypeScript strict mode, ESLint-ready configuration

### Key Architectural Decisions

**Monorepo Structure**: Unified codebase with `/client`, `/server`, and `/shared` directories enables type sharing between frontend and backend while maintaining clear separation of concerns.

**Drizzle ORM Choice**: Selected for type-safety, lightweight footprint, and seamless Zod integration. Enables compile-time query validation and automated schema generation from TypeScript types.

**Serverless Database**: Neon provides auto-scaling PostgreSQL without managing infrastructure, critical for handling variable load from ENFT minting events and ceremonial broadcasts.

**Storage Abstraction Layer**: Interface-based storage (`IStorage`) allows swapping implementations without changing business logic. Current in-memory fallback enables development without database connectivity.

**Ceremonial Data as Code**: Extensive markdown/JSON codex files in `/attached_assets` treated as canonical source of truth, seeded into database via API endpoints rather than manual SQL imports.

**Web3 Design Language**: Hybrid aesthetic balances data-dense financial dashboards (for treasury metrics) with gallery-style NFT presentation and ceremonial visual language for governance, reflecting the platform's dual nature as both financial infrastructure and cultural archive.