# BLEULIONTREASURY Web3 Platform

## Overview
BLEULIONTREASURY is a Web3 sovereign platform that merges ceremonial worldbuilding with blockchain technology. Its core purpose is to facilitate the minting of EV0L ENFTs, manage asset-backed currencies (e.g., HydroCoin, FlameCoin), and govern treasury vaults within the EvolVerse ecosystem. The platform integrates mythological narratives from the BLACK§BLEU Sovereign Zone Codex with modern Web3 infrastructure, featuring six sovereign biomes, each with unique economies, treaties, and ceremonial protocols. Key capabilities include a comprehensive treasury ledger dashboard for tracking the flow from Codex to ENFTs, bills/coins, and vaults, with Fibonacci-weighted allocations across five sovereign vaults, a $51T cap ceiling, and $1.1T/day yield distribution.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React and TypeScript, using Vite for bundling. UI components leverage Radix UI primitives and shadcn/ui (New York style) with Tailwind CSS for styling, incorporating custom design tokens and a responsive spacing system. Typography uses Space Grotesk, Inter, Cinzel Decorative, and JetBrains Mono. TanStack Query manages server state, and routing is file-based via Vite. The design aesthetic is Web3-inspired, blending clean dashboard layouts with ceremonial mysticism.

### Backend Architecture
The backend uses Node.js with Express.js and TypeScript (ES modules). It exposes RESTful API endpoints under `/api/*`. Request handling includes JSON and URL-encoded body parsing, with logging and performance tracking middleware. Production bundling is handled by esbuild.

### Data Storage Solutions
The primary database is PostgreSQL, hosted via Neon serverless. Drizzle ORM is used for type-safe queries and schema management, with Drizzle Kit for migrations. The database schema includes modules for Users, Overscale Domains, Hidden Societies, War Actors, Mall Nodes, Market Products, Ceremonial Rituals, Story Chapters, Mythology Deities, Codex Layers, Environmental Cities, Image Audits, MetaSchools, MetaNations, MetaGalaxies, Treasury Vaults, ENFT Registry, and MetaVault Summary.

### Authentication & Authorization
Currently, there's a basic user schema with username/password as a foundational element, supporting user creation and retrieval. Advanced authentication methods (sessions, JWT, or wallet-based) are planned for future expansion.

### Key Architectural Decisions
-   **Monorepo Structure**: A unified codebase with `/client`, `/server`, and `/shared` directories ensures type sharing and clear separation of concerns.
-   **Drizzle ORM**: Chosen for its type-safety, lightweight nature, and seamless Zod integration for compile-time query validation.
-   **Serverless Database**: Neon provides auto-scaling PostgreSQL, crucial for handling variable loads from platform activities.
-   **Storage Abstraction Layer**: An `IStorage` interface allows flexible swapping of storage implementations.
-   **Ceremonial Data as Code**: Extensive markdown/JSON codex files in `/attached_assets` are treated as the canonical source of truth and are seeded into the database via API endpoints.
-   **Web3 Design Language**: A hybrid aesthetic combines data-dense financial dashboards with gallery-style NFT presentation and ceremonial visual language to reflect the platform's dual nature.

## External Dependencies

### Blockchain & Web3
-   **Target Networks**: Ethereum Sepolia testnet, Polygon Mumbai testnet, Avalanche Fuji testnet.
-   **Token Standards**: ERC-721 for ENFT metadata (implemented in `contracts/BLEULIONTREASURY_ENFT.sol`).
-   **IPFS/Storage**: NFT.Storage integration fully implemented via `server/services/ipfs-service.ts`.
-   **Provenance**: SHA3-256 hashing for ceremonial scroll verification.
-   **Smart Contracts**: 
    - `BLEULIONTREASURY_ENFT.sol`: ERC-721 contract with vault association, provenance tracking, and transfer control.
    - Deployment tooling: Hardhat configuration and Remix IDE deployment guide available.
-   **Minting Infrastructure**:
    - Backend API endpoints: `/api/enfts/create-metadata`, `/api/enfts/register` for IPFS upload and blockchain registration.
    - Frontend minting page: `/mint-enft` route with wallet connection and form validation.
    - Treasury ledger integration: Real-time display of minted ENFTs via `/api/enft-registry` endpoint.

### Third-Party Services
-   **Neon Database**: Serverless PostgreSQL hosting.
-   **Fonts**: Google Fonts (Space Grotesk, Inter, Cinzel Decorative, JetBrains Mono).
-   **UI Libraries**: Radix UI, shadcn/ui, Embla Carousel, cmdk.

### Asset Management
-   **Attached Assets**: Ceremonial documentation, codexes, protocols, CSV seed data, JSON metadata templates, and Python mint scripts are stored in `/attached_assets`.
-   **Static Assets**: SVG icons and favicon at `/favicon.png`.

### Development Tools
-   **Vite Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`.
-   **Type Safety**: Zod schemas integrated with Drizzle for runtime validation.
-   **Code Quality**: TypeScript strict mode and ESLint-ready configuration.