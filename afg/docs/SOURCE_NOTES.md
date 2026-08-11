# Source Notes and Provenance

## Primary supplied sources

### AFG Defense Grid image

The supplied diagram is titled **“A.F.G. Defense Grid — Perimeter & Response.”** It visibly contains:

- a central `Core Colony`;
- an inner circular sentry perimeter;
- an outer circular scout perimeter;
- 12 radial arrows/lanes;
- a four-step protocol printed in the lower-left of the image.

A repository-native SVG derivative is stored in `assets/AFG_Defense_Grid.svg`. The original upload had SHA-256 `487818a3c8a3364e9e25d6866b2ae96779f5931142082da780185f5f29d45e47`; the repository copy is intentionally optimized for version control. The machine-readable model intentionally abstracts the protocol into game/simulation states rather than adding real-world tactical parameters.

### AFG Hive Tunnel Cross-Section image

The supplied cross-section is titled **“A.F.G. Hive Tunnel Cross-Section.”** Visible labels include entrance, `Honey gallery`, `Brood chamber`, `Lower hive levels`, `Outer guard ring`, `Inner guard ring`, and `sentry` markers.

A repository-native SVG derivative is stored in `assets/AFG_Hive_Tunnel_CrossSection.svg`. The original upload had SHA-256 `5d71da70f0e59702e9e67ab4bdf93e66c0a3496f5f25550f735494269f50611e`; the repository copy is intentionally optimized for version control.

## Supporting supplied files reviewed

- `SpiralMovement.cs 2` — a small Unity `MonoBehaviour` implementing spiral XY movement. It is copied unchanged to `sim/SpiralMovement.cs` as a visualization/motion utility.
- `Optic_Surgery_Codex_Summary.xlsx` — supporting project context includes BLEU Shades / HUD optics, MirrorMarket provenance, and MirrorGuard-style concepts. These are contextual links, not direct evidence of the A.F.G. layout.
- `Optic_Surgery___Raw_Passages__preview_.csv` — includes a MirrorGuard Shields entry; treated as contextual project vocabulary only.
- `routes.csv` — reviewed, but its cultural/archive route rows are unrelated to the A.F.G. topology and are not imported into this module.
- `conversationshh.json`, `conversationshh 4.json`, and `text.txt` — broad project corpus. Search surfaced general defense-grid and registry concepts, but no stronger direct A.F.G.-specific implementation than the supplied diagrams.

## Repository alignment

The existing `EVOLVERSE_Master_Registry.csv` already contains a `MILITARY & DEFENSE SYSTEMS` domain with grid/shield/infrastructure concepts. This PR adds a dedicated A.F.G. module as a simulation asset beneath that domain.
