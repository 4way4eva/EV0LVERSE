# A.F.G. Defense Grid — Simulation Module

This package preserves the supplied A.F.G. perimeter and hive/tunnel diagrams and translates them into a **fictional / game-simulation topology** for EV0LVERSE. It is not a real-world tactical deployment guide.

## Package contents

- `assets/AFG_Defense_Grid.svg` — supplied perimeter-and-response diagram.
- `assets/AFG_Hive_Tunnel_CrossSection.svg` — supplied hive/tunnel cross-section.
- `data/afg-defense-grid.json` — normalized rings, node classes, and simulation response states.
- `data/afg-nodes.csv` — 12 scout + 12 sentry perimeter positions for deterministic scene generation.
- `schemas/afg-defense-grid.schema.json` — JSON Schema for the topology file.
- `sim/SpiralMovement.cs` — supplied Unity spiral-motion utility, retained unchanged.
- `tools/validate_afg_manifest.py` — standard-library validator for package hashes and JSON shape.
- `docs/SOURCE_NOTES.md` — provenance and source-to-model mapping.
- `manifest.json` — SHA-256 inventory for the complete package.

## Model

The source perimeter diagram is represented as three concentric regions:

1. **Core Colony** — protected center / objective node.
2. **Sentry Ring** — 12 evenly spaced inner-perimeter nodes.
3. **Scout Ring** — 12 evenly spaced outer-perimeter nodes.

The source image also shows 12 radial vectors extending from the sentry ring toward the scout perimeter. The machine-readable version treats these as detection/response lanes.

The hive cross-section is modeled as an entrance funnel, honey gallery, brood chamber, lower hive levels, and layered guard boundaries. The drawing is preserved as the canonical visual reference; the JSON stays intentionally abstract.

## Simulation response states

The machine-readable model converts the source image's response protocol into non-real-world simulation events:

- `detect` — scout observation updates a threat/interest heatmap.
- `intercept` — sentry NPCs or agents move to a lane and challenge/contain.
- `swarm_response` — area-control event in a game/simulation, with no physical implementation parameters.
- `seal_breach` — closes a simulated tunnel edge and reroutes graph traversal.

## Deterministic node layout

`afg-nodes.csv` uses 30-degree increments. Coordinates are normalized to a unit circle so Unity/Unreal/web renderers can scale them to any scene. The outer Scout Ring uses radius `1.0`; the Sentry Ring uses radius `0.67`; the Core Colony uses normalized radius `0.33`.

## Validation

From the repository root:

```bash
python3 afg/tools/validate_afg_manifest.py afg
```

The validator verifies SHA-256 entries in `manifest.json`, checks expected ring counts, and confirms the JSON document's declared schema version.

## Integration

This module aligns with the existing EVOLVERSE master registry's defense/grid concepts while remaining a self-contained simulation asset. No claim is made that the diagrams describe a tested physical defense system.
