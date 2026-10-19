/**
 * PROJECT 01: HEAT PIPE-ASSISTED HYBRID PCM-EG BATTERY THERMAL MANAGEMENT SYSTEM
 * ============================================================================
 * Executive Technical Presentation Format:
 * - Zero long paragraphs
 * - Large, scannable point-wise engineering bullets
 * - All SolidWorks prototypes, CAD components, and CAE graphs visible directly
 */

export default {
  id: 'hybrid-pcm-heatpipe-btms',
  number: '01',
  title: 'Hybrid PCM-EG & Heat Pipe Battery Thermal Management System',
  subtitle: '72 V, 50 Ah Split-Pack (2× 20S5P) Architecture for Electric Two-Wheelers',
  category: 'PARAMETRIC CAD & TRANSIENT CFD/FEA',
  year: '2026',
  tools: [
    'SolidWorks 2025 (Top-Down Assembly)',
    'Boolean Cavity Modeling',
    'Sheet Metal & Laser Busbars',
    'SimScale Transient Thermal',
    'Equivalent Capacity Method',
    'AIS 156 Compliance',
  ],

  metrics: [
    { label: 'Pack Spec', value: '72 V · 50 Ah' },
    { label: '40 °C Peak Reduction', value: '-6.0 °C (64.9 °C)' },
    { label: 'Runaway Margin', value: '15.1 °C (+66%)' },
    { label: '30 °C Cyclic Drift', value: '0 K (Steady State)' },
  ],

  problemStatement: {
    heading: '01.0 — Problem Statement (Why E2W Packs Fail in 40 °C+ Summers)',
    summary:
      'Compact electric two-wheeler (E2W) packs experience intense Joule heating during 3C–5C urban sprints in 40 °C+ tropical ambients:',
    constraints: [
      'PCM Thermal Saturation: Pure paraffin (0.2 W/m·K) melts 100% and turns into a thermal insulator during continuous cruising.',
      'BMS Power Derating: Unmanaged heat spikes (>55 °C) force the BMS to throttle motor current, cutting torque and top speed.',
      'Arrhenius Capacity Fade: Every +1 °C above 30 °C cuts battery lifespan by ~2 months due to anode SEI layer breakdown.',
      'Costly Monolithic Packs: Single-block 200-cell packs force full-pack replacement when a single local cell group fails.',
    ],
  },

  steps: [
    {
      stepCode: 'SLIDE 01 / WORKING PROTOTYPES',
      title: 'Early SolidWorks Concept Iterations (Before Final Design)',
      description: '4 Iterative CAD Prototypes Built to Test Cell Pitch, Thermal Weaving & Sub-Block Mounting:',
      keyPoints: [
        'Prototype 1 (Diagonal Flat-Strip Weave): Tested 6 mm copper strips weaving diagonally between cells — rejected due to line-contact air gaps.',
        'Prototype 2 (Cylindrical PCM Sleeves): Tested individual graphite-PCM sleeves with multi-tier straps — high part count and assembly complexity.',
        'Prototype 3 (Orthogonal 4×6 Block): Tested square cell grid with side heat-pipe extensions — square packing wasted interstitial volume.',
        'Prototype 4 (5-Sub-Block Bolted Housing): Tested segmented sub-modules — evolved into the final unified 20S5P staggered honeycomb shell.',
      ],
      images: [
        {
          src: './assets/btms/proto-01-diagonal-weave.png',
          useCustomImage: true,
          caption: 'PROTOTYPE 01 — Diagonal flat-strip weaving concept (Full SolidWorks 4-Viewport)',
        },
        {
          src: './assets/btms/proto-02-pcm-sleeve-weave.png',
          useCustomImage: true,
          caption: 'PROTOTYPE 02 — Individual cylindrical PCM sleeves with multi-tier thermal straps',
        },
        {
          src: './assets/btms/proto-03-orthogonal-strip.png',
          useCustomImage: true,
          caption: 'PROTOTYPE 03 — Orthogonal 4×6 cell grid with protruding side flat heat-pipes',
        },
        {
          src: './assets/btms/proto-04-modular-block-assy.png',
          useCustomImage: true,
          caption: 'PROTOTYPE 04 — Segmented 5-sub-block bolted assembly with vertical side heat pipes',
        },
      ],
      specs: [
        'Skill: Rapid CAD Prototyping',
        'Tool: SolidWorks 2025',
        'Outcome: Converged on Staggered Honeycomb',
      ],
    },

    {
      stepCode: 'SLIDE 02 / PACK ARCHITECTURE',
      title: 'Split-Pack 20S5P Honeycomb Layout & 3-Stage Thermal Cascade',
      description: 'Modular Dual-Pack Geometry & Passive 3-Stage Defence Mechanism:',
      keyPoints: [
        'Split-Pack Modularity: 200× Samsung INR21700-50S cells split into two serviceable 100-cell (20S5P) modules (416 × 100 × 302.3 mm, 14.62 kg each).',
        'Staggered Honeycomb Pitch (28.00 mm): Creates exact 6.75 mm interstitial triangular voids to seat the PCM-EG matrix and Ø4 mm circular heat pipes.',
        'Stage 1 (<35 °C) & Stage 2 (>35 °C): 20% Expanded Graphite conducts heat laterally (4.0–6.0 W/m·K) into 90 axial copper-water heat pipes (10,000 W/m·K).',
        'Stage 3 (45–50 °C Latent Buffering): Paraffin melts isothermally inside capillary EG pores (zero leakage) while heat pipes continuously regenerate the wax.',
      ],
      images: [
        {
          src: './assets/btms/p054_img1_831x435.jpeg',
          useCustomImage: true,
          caption: 'FIG 4.1 — Top view of 100-cell (20S5P) staggered honeycomb at 28.00 mm pitch (6.75 mm gap)',
        },
        {
          src: './assets/btms/p034_img1_1408x768.jpeg',
          useCustomImage: true,
          caption: 'FIG 1.15 — 3-Stage Thermal Cascade: (1) EG Conduction, (2) Heat Pipe Extraction, (3) PCM Latent Buffering',
        },
        {
          src: './assets/btms/p037_img1_850x664.jpeg',
          useCustomImage: true,
          caption: 'FIG 1.16 — Samsung INR21700-50S Cell (Ø21.25 × 70.62 mm, 5.0 Ah, 25 A continuous)',
        },
      ],
      specs: [
        'Skill: Pack Packaging & Thermal Architecture',
        'Cell Pitch: 28.00 mm',
        'Interstitial Gap: 6.75 mm',
      ],
    },

    {
      stepCode: 'SLIDE 03 / COMPONENT CAD',
      title: 'Top-Down Parametric Modeling of All 7 Core Components',
      description: 'In-Context SolidWorks 2025 Part Design & Vibration Damping:',
      keyPoints: [
        'Boolean Cavity PCM-EG Block: Subtracted 100 cells and 90 heat pipes from a solid block to create a zero-clearance 1,515.7 g negative mold.',
        '90 Axial Circular Heat Pipes (Ø4 × 247 mm): Routed in an independent diagonal lattice across the honeycomb to prevent thermal shadowing.',
        'FR-ABS Holders & Al 6061-T6 Plates: 7.08 mm flame-retardant ABS holders isolate cells electrically; M4-fastened Al 6061-T6 plates seal to IPX7.',
        'Silicone Condenser Cushion: Cradles all 90 exposed condenser stubs above the top plate to prevent brittle root fracture under 8G road vibration.',
      ],
      images: [
        {
          src: './assets/btms/p059_img3_612x703.jpeg',
          useCustomImage: true,
          caption: 'FIG 4.7 — Exploded view of all 7 module components in SolidWorks 2025',
        },
        {
          src: './assets/btms/p055_img1_999x671.jpeg',
          useCustomImage: true,
          caption: 'FIG 4.2 — PCM-EG 80/20 composite matrix block generated via Boolean Cavity subtraction',
        },
        {
          src: './assets/btms/p056_img1_711x724.png',
          useCustomImage: true,
          caption: 'FIG 4.3 — Cross-section showing Ø4 mm copper heat pipes embedded between 21700 cells',
        },
        {
          src: './assets/btms/p061_img1_842x435.jpeg',
          useCustomImage: true,
          caption: 'FIG 4.8 — Transparent view of 90 axial heat pipes in diagonal non-shadowing routing pattern',
        },
        {
          src: './assets/btms/p059_fig4_6_silicone_comparison.png',
          useCustomImage: true,
          caption: 'FIG 4.6 — With vs. Without top silicone cushion support (prevents 8G condenser vibration fracture)',
        },
        {
          src: './assets/btms/p057_img1_424x590.png',
          useCustomImage: true,
          caption: 'FIG 4.4 — Flame-Retardant ABS cell holder with 7.35 mm collar bosses & BMS wire channels',
        },
        {
          src: './assets/btms/p058_img1_1269x669.png',
          useCustomImage: true,
          caption: 'FIG 4.5 — Aluminium 6061-T6 top & bottom IPX7 enclosure cover plates',
        },
      ],
      specs: [
        'Skill: Boolean Cavity & DFM Assembly',
        'Heat Pipes: 90 × Ø4 mm Copper-Water',
        'Vibration Damping: Silicone Flexure Support',
      ],
    },

    {
      stepCode: 'SLIDE 04 / FINAL CAD ASSEMBLY',
      title: 'Slot Lock-In Mount, Cu–Ni Sandwich Busbars & Full SolidWorks Assembly',
      description: 'Structural Interlocking & High-Ampacity Laser-Welded Interconnects:',
      keyPoints: [
        '0.20 mm Copper–Nickel Sandwich Busbars: Copper core carries 125 A peak current (<0.4 mΩ); outer nickel cladding enables automated infrared laser welding.',
        'Precision CAD Verification: 0.20 mm thickness and 8.0 mm inter-cell bridge length verified directly via SolidWorks Measure.',
        'Slot Lock-In Chassis Mount: Matching tongue-and-slot profiles distribute 8G (7–200 Hz) AIS-156 shock loads and allow single-module field replacement.',
      ],
      images: [
        {
          src: './assets/btms/p065_img1_1062x539.jpeg',
          useCustomImage: true,
          caption: 'FIG 4.12 — Full 20S5P assembly in SolidWorks 2025 (Untrimmed Full-Screen CAD Window)',
        },
        {
          src: './assets/btms/p065_img2_1062x524.jpeg',
          useCustomImage: true,
          caption: 'FIG 4.13 — Close-up of 90 finned heat pipe condenser stubs & silicone support in SolidWorks 2025',
        },
        {
          src: './assets/btms/p062_img1_855x711.png',
          useCustomImage: true,
          caption: 'FIG 4.9 — Extruded Al 6061-T6 shell with upper & lower Slot Lock-In mounts',
        },
        {
          src: './assets/btms/p064_img1_856x353.jpeg',
          useCustomImage: true,
          caption: 'FIG 4.10 — SolidWorks Measure confirmation: 0.20 mm thickness & 8.0 mm busbar bridge',
        },
        {
          src: './assets/btms/p064_img2_1062x385.jpeg',
          useCustomImage: true,
          caption: 'FIG 4.11 — Cross-section of 0.20 mm Copper-Nickel sandwich busbar at cell terminal',
        },
      ],
      specs: [
        'Skill: Sheet Metal & Electromechanical CAD',
        'Busbar Resistance: < 0.4 mΩ',
        'Standard: AIS 156 COP Laser Welding',
      ],
    },

    {
      stepCode: 'SLIDE 05 / CAE SETUP & MESH',
      title: 'SimScale 300k-Node Mesh, Equivalent Capacity Method & 3C Load Setup',
      description: 'Computational Methodology to Simulate Phase Change Without Fluid Solver Crash:',
      keyPoints: [
        'Representative Cell Domain (~300,000 Nodes): Extracted 1 cell + 6.75 mm PCM-EG annulus + axial heat pipes with boundary refinement.',
        'Equivalent Capacity Method (Cp Spike): Capillary EG pores immobilize liquid wax; latent heat is modeled as a sharp Specific Heat (Cp) spike across 318–323 K (45–50 °C).',
        '5× Cyclic 3C Load (24,000 s): 129,926 W/m³ during 1,200 s discharge (~3.2 W/cell) + 14,436 W/m³ during 3,600 s rest across 30 °C and 40 °C ambients.',
      ],
      images: [
        {
          src: './assets/btms/p069_img2_1251x795.jpeg',
          useCustomImage: true,
          caption: 'FIG 5.2 — Hybrid mesh (~300,000 nodes) with interfacial refinement around axial heat pipes',
        },
        {
          src: './assets/btms/p071_img1_1301x439.png',
          useCustomImage: true,
          caption: 'FIG 5.5 — Equivalent Capacity Method: Cp latent heat spike between 318 K and 323 K (45–50 °C)',
        },
        {
          src: './assets/btms/p072_img1_1172x776.png',
          useCustomImage: true,
          caption: 'FIG 5.7 — Cyclic volumetric heat source (129,926 W/m³ discharge / 14,436 W/m³ rest)',
        },
        {
          src: './assets/btms/p072_img2_1254x428.png',
          useCustomImage: true,
          caption: 'FIG 5.8 — 5-cycle transient heat flux step waveform over 24,000 seconds',
        },
      ],
      specs: [
        'Skill: Transient Thermal FEA/CFD Setup',
        'Mesh: ~300,000 Tetrahedral Nodes',
        'Phase-Change Model: Equivalent Heat Capacity',
      ],
    },

    {
      stepCode: 'SLIDE 06 / GRAPH & SPIKE ANALYSIS',
      title: 'Why Flux Goes Positive vs. Negative & Unpredictable vs. Predictable Spikes',
      description: 'Direct Physics Breakdown of the Simulation Graphs (Run 4 Failure vs. Runs 5 & 6 Hybrid Success):',
      keyPoints: [
        'WHY FLUX IS NEGATIVE vs. POSITIVE: In PCM-only (Run 4, Fig 5.18), radial flux (FLUY) is NEGATIVE (-15 to -128 W/m²) because heat conducts passively outward in the -Y direction from the cell wall. In Hybrid runs (Figs 5.23 & 5.29), FLUY is POSITIVE (+400 to +2,500 W/m²) because heat pipe evaporators actively pull heat along the +Y extraction vector.',
        'UNPREDICTABLE SPIKE (Run 4 Failure at t = 14,400 s): At 40 °C PCM-only (Figs 5.16 & 5.18), Cycles 1–3 look deceptively stable (~323 K). At t = 14,400 s (Cycle 4), paraffin melts 100% and turns into a liquid insulator—causing a violent, unpredictable flux collapse to -128 W/m² (10× shock) and a +12 K single-cycle jump to 344 K (70.9 °C) with zero BMS warning.',
        'PREDICTABLE SPIKE & DECAY (Run 5, 30 °C Hybrid — Fig 5.23): FLUY spikes predictably to +2,500 W/m² in Cycle 1 due to the large initial temperature difference between hot matrix and cool condenser, then decays smoothly to +400 W/m² by Cycle 5 as dynamic equilibrium (ΔT ≈ 0 K at 320.1 K) is achieved.',
        'PREDICTABLE RE-ELEVATION (Run 6, 40 °C Hybrid — Figs 5.26 & 5.29): Eliminates the t = 14,400 s cliff. FLUY starts at +1,300 W/m² and predictably rises in Cycles 4–5 (~+2,100 W/m²) as heat pipes work harder against accumulated heat—holding peak temp to 338 K (64.9 °C) and boosting runaway safety margin from 9.1 °C to 15.1 °C.',
      ],
      images: [
        {
          src: './assets/btms/p080_img1_1200x800.png',
          useCustomImage: true,
          caption: 'FIG 5.16 [UNPREDICTABLE CLIFF — RUN 4, 40 °C PCM-ONLY] — Sudden +12 K saturation jump at t = 14,400 s reaching 344 K (70.9 °C)',
        },
        {
          src: './assets/btms/p089_img1_1200x800.png',
          useCustomImage: true,
          caption: 'FIG 5.26 [PREDICTABLE STEPWISE — RUN 6, 40 °C HYBRID] — No saturation cliff; controlled progression to 338 K (64.9 °C)',
        },
        {
          src: './assets/btms/p082_img1_1200x800.png',
          useCustomImage: true,
          caption: 'FIG 5.18 [NEGATIVE FLUX COLLAPSE — RUN 4] — Violent negative spike to -128 W/m² at t = 14,400 s when PCM 100% melts',
        },
        {
          src: './assets/btms/p092_img1_1200x800.png',
          useCustomImage: true,
          caption: 'FIG 5.29 [POSITIVE ACTIVE EXTRACTION — RUN 6] — Predictable +1,300 W/m² peak re-elevating in Cycles 4–5 as pipes extract harder',
        },
        {
          src: './assets/btms/p087_img1_1200x800.png',
          useCustomImage: true,
          caption: 'FIG 5.23 [EQUILIBRIUM DECAY — RUN 5, 30 °C HYBRID] — Predictable +2,500 W/m² Cycle 1 peak decaying to +400 W/m² steady state',
        },
        {
          src: './assets/btms/p094_img1_1280x900.png',
          useCustomImage: true,
          caption: 'FIG 5.32 [FINAL 3D CONTOUR — RUN 6] — Heat rejected upward through top condenser stubs; lower matrix remains cool',
        },
      ],
      table: {
        headers: ['40 °C Comparison Metric', 'Run 4 (PCM-Only Baseline)', 'Run 6 (Hybrid PCM + Pipes)', 'Result'],
        rows: [
          ['Cycle 4 Inflection (t = 14,400 s)', '335 K (Unpredictable +12 K cliff)', '328 K (Controlled step)', '-7 K spike eliminated'],
          ['Cycle 5 Peak Temperature', '344 K (70.9 °C)', '338 K (64.9 °C)', '-6 °C cooler peak'],
          ['Volumetric Heat Flux (FLUY)', 'Negative collapse (-128 W/m²)', 'Positive extraction (+1,300 → +2,100 W/m²)', 'Zero saturation'],
          ['Margin to 80 °C Runaway', '9.1 °C (Unsafe)', '15.1 °C (Safe BMS visibility)', '+6 °C safety margin'],
        ],
      },
      specs: [
        'Skill: Transient Graph & Physics Diagnostics',
        'Peak Temp Reduced: -6.0 °C',
        'Safety Margin: +15.1 °C',
      ],
    },
  ],

  outcome:
    'Eliminated catastrophic 40 °C PCM saturation (t = 14,400 s), reduced peak cell temperature by 6.0 °C (expanding thermal runaway safety margin from 9.1 °C to 15.1 °C), achieved 0 K inter-cycle drift at 30 °C, and delivered a serviceable 20S10P split-pack CAD assembly.',
};
