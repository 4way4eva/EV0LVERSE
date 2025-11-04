# Design Guidelines: BLEULIONTREASURY Web3 Platform

## Design Approach

**Selected Framework**: Web3 Design System (inspired by Uniswap, OpenSea, and Foundation) with ceremonial mysticism overlay

This platform requires a hybrid approach combining:
- Clean, data-dense dashboard aesthetics for financial metrics
- Gallery-style presentation for NFT collections
- Ceremonial visual language for governance elements
- Professional credibility to handle real asset-backed currencies

---

## Typography System

**Font Families**:
- **Display/Headers**: Space Grotesk (geometric, modern Web3 aesthetic)
- **Body/Data**: Inter (exceptional legibility for dense information)
- **Accent/Ceremonial**: Cinzel Decorative (for BLEULIONTREASURY elements, species names)

**Type Scale**:
- Hero/Display: text-6xl to text-8xl (96-128px)
- Page Titles: text-4xl to text-5xl (36-48px)
- Section Headers: text-2xl to text-3xl (24-30px)
- Card Titles: text-xl (20px)
- Body Text: text-base (16px)
- Data/Metrics: text-sm to text-lg (14-18px) with font-mono for numbers
- Labels/Captions: text-xs to text-sm (12-14px)

**Weight Strategy**:
- Headers: font-bold (700)
- Subheaders: font-semibold (600)
- Body: font-normal (400)
- Data emphasis: font-medium (500)
- Ceremonial elements: font-bold with letter-spacing-wide

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24**

**Container Strategy**:
- Dashboard sections: max-w-7xl with px-6 to px-8
- NFT galleries: max-w-screen-2xl for wide layouts
- Data panels: max-w-4xl for focused reading
- Full-bleed visualizations: w-full

**Grid Systems**:
- Dashboard metrics: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- NFT gallery: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Data tables: Use flexible column layouts with overflow-x-auto
- Vault hierarchy: grid-cols-1 lg:grid-cols-3 (Outer/Middle/Inner spiral)

**Vertical Rhythm**:
- Section padding: py-16 to py-24
- Component spacing: space-y-8 to space-y-12
- Card internal padding: p-6 to p-8
- Tight groupings: space-y-2 to space-y-4

---

## Navigation Architecture

**Primary Navigation** (Sticky header):
- Logo/Brand (left): BLEULIONTREASURY with lion icon
- Main nav (center): Dashboard | Mint | Vault | HydroCard | Dossier
- Wallet connect (right): "Connect Wallet" button with network indicator
- Height: h-20 with backdrop-blur-lg

**Secondary Navigation** (Within sections):
- Tab navigation for multi-panel views (HydroCoin metrics vs. Supply charts)
- Breadcrumbs for deep hierarchies (Vault > Realm > Species)
- Sidebar navigation for dashboards (collapsible on mobile)

---

## Component Library

### Core UI Elements

**Cards**:
- **Metric Cards**: Compact cards with large numbers, labels, and trend indicators
  - Border with subtle shadow
  - Padding: p-6
  - Include: Value (text-4xl), Label (text-sm), Change indicator (+/- with icon)

- **NFT Cards**: 
  - Aspect ratio: aspect-square for thumbnails
  - Hover: transform scale-105 with transition-transform
  - Include: Image, Token ID, Rarity badge, Quick actions overlay

- **Vault Cards**:
  - Ceremonial borders (decorative SVG patterns)
  - Include: Species icon, Name (Cinzel font), Function description
  - Three-tier visual distinction for Outer/Middle/Inner spiral

**Buttons**:
- **Primary CTA**: Large rounded-xl with px-8 py-4, font-semibold
- **Secondary**: Outlined variant with border-2
- **Wallet Connect**: Special treatment with wallet icon, rounded-full
- **Data Actions**: Compact px-4 py-2 for tables and lists
- **Ceremonial**: Custom styled for ritual protocols (Flame Crown activation)

**Data Display**:
- **Stat Blocks**: Grid layout with icon, value, and label vertically stacked
- **Progress Bars**: Show reserve ratios, supply caps
  - Use gradient fills
  - Height: h-2 to h-3
  - Include percentage label

- **Tables**:
  - Striped rows for readability
  - Sticky headers for long scrolls
  - Sortable columns with icons
  - Monospace for numerical data
  - Expand/collapse for nested data (extraction lineage)

**Forms**:
- **Mint Interface**:
  - Drag-and-drop zone for image uploads (border-dashed, h-64)
  - Multi-step wizard with progress indicator
  - Metadata fields with validation states
  - Preview panel showing generated NFT

- **HydroCard Application**:
  - Step-by-step form with visual progress
  - Input fields with icons (water drop for quantity)
  - Real-time validation and conversion display

### Navigation Components

**Wallet Widget**:
- Display: Address (truncated), Balance, Network badge
- Dropdown: View transactions, Switch network, Disconnect
- Position: Sticky in header

**Realm Selector**:
- Visual dropdown showing all 7 EvolVerse realms
- Each option includes icon and brief description
- Selected state highlights active realm

### Data Displays

**HydroCoin Dashboard**:
- Hero metric section: Total supply, Reserve ratio, Water backing
- Live chart: Supply growth over time (line chart)
- Transaction feed: Recent mints/burns with timestamps
- Distribution breakdown: Pie chart of stakeholder allocations

**NFT Gallery**:
- Masonry grid layout for varied aspect ratios
- Filter toolbar: Rarity, Species, Realm
- Infinite scroll with loading states
- Quick view modal: Click to expand with full metadata

**Treasury Visualizer**:
- Three concentric circles representing Tri-Spiral Vault
- Interactive: Click to drill into each layer
- Species icons distributed around relevant vaults
- Connecting lines showing governance relationships

### Overlays

**Transaction Modals**:
- Confirm minting action
- Display: Gas estimate, Total cost, Preview
- Progress states: Pending, Confirming, Success/Error
- Confetti animation on successful mint

**Ceremonial Protocol Drawer**:
- Slide-in panel from right
- Visual representation of ritual steps
- Progress tracker for multi-step ceremonies
- Completion rewards display

---

## Animations & Interactions

**Micro-interactions** (use sparingly):
- Hover scale on cards: scale-105
- Button press: scale-95 on active state
- Number counters: Animate counting up for metrics
- Success states: Subtle pulse or check mark animation

**Page Transitions**:
- Fade-in for content: animate-fade-in
- No excessive sliding or complex transitions

**Loading States**:
- Skeleton screens for data tables
- Shimmer effect for image placeholders
- Spinner for wallet transactions

**Special Effects** (ceremonial only):
- Flame Crown activation: Subtle glow pulse
- Reciprocity Pulse: Ripple effect from center
- Successful vault mutation: Brief particle effect

---

## Images

### Hero Section
**Large Hero Image**: YES - Full-width hero showcasing the BLEULIONTREASURY ecosystem
- Composition: Majestic robotic lion (BLEULION Prime) in foreground with digital vault architecture in background
- Treatment: Gradient overlay from bottom (fade to solid) for text readability
- Height: h-screen on desktop, h-96 on mobile
- Overlay content: Platform title, tagline, dual CTAs ("Launch Dashboard" + "Mint ENFT")
- Button treatment: Backdrop-blur-md with semi-transparent background

### NFT Collection Assets
- Species portraits: High-quality renders of each sovereign species (Lions, Wolves, Feline, Matriarchs)
- Realm environments: Atmospheric backgrounds for each EvolVerse realm
- ENFT Codex samples: Example token artwork showing layer combinations

### Dashboard Icons
- Custom iconography for: Vault types, Species categories, Realm symbols
- Water drop icon for HydroCoin branding
- Tri-spiral symbol for treasury visualizations

### Data Visualization
- Charts rendered with libraries (Chart.js or similar) - not static images
- Supply graphs, distribution pie charts, historical trends

### Ceremonial Elements
- Decorative borders for vault cards (SVG patterns)
- Flame Crown symbol for activation protocols
- Reciprocity Pulse mandala for ritual sections

---

## Responsive Behavior

**Breakpoint Strategy**:
- Mobile (base): Single column, stacked navigation, simplified charts
- Tablet (md: 768px): Two-column grids, sidebar navigation appears
- Desktop (lg: 1024px): Full dashboard layout, multi-column data
- Wide (xl: 1280px): Maximum gallery columns, enhanced spacing

**Mobile Optimizations**:
- Bottom tab bar for primary navigation
- Collapsible metric cards (expand on tap)
- Horizontal scroll for data tables
- Touch-optimized button sizes (min h-12)

---

## Accessibility

**Color Independence**:
- Use icons + labels for all status indicators
- Pattern fills in addition to gradients for charts
- Never rely on color alone to convey information

**Keyboard Navigation**:
- Visible focus states on all interactive elements
- Tab order follows logical content flow
- Skip links for dashboard sections

**Screen Reader Support**:
- Descriptive labels for all form inputs
- ARIA labels for icon-only buttons
- Table headers properly associated
- Live regions for transaction status updates

**Contrast & Readability**:
- Minimum 4.5:1 for body text
- 3:1 for large text and UI components
- Data tables use clear row separators

---

## Web3-Specific Patterns

**Wallet Connection Flow**:
- Prominent "Connect Wallet" button when disconnected
- Network selector if wrong chain
- Clear messaging about required actions
- Persistent wallet status indicator

**Transaction Feedback**:
- Multi-state communication: Initiated → Pending → Confirmed → Complete
- Transaction hash display with block explorer link
- Clear error messages with suggested actions
- Gas estimation before confirmation

**Blockchain Data Display**:
- Token IDs: Monospace font, copyable
- Addresses: Truncated with copy function
- Timestamps: Relative time (e.g., "2 hours ago")
- IPFS links: Gateway redirect with CID display

---

**Design Philosophy**: This platform balances professional Web3 utility with mystical ceremonial branding. Every interface element serves the dual purpose of enabling complex blockchain operations while honoring the sovereign mythology of the BLEULIONTREASURY ecosystem. The design should feel both cutting-edge and timeless, data-driven yet spiritually resonant.