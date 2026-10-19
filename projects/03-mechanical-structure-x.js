/**
 * PROJECT 03: MECHANICAL STRUCTURE (PRIMARY SUPPORT STRUCTURE FOR X)
 * ============================================================================
 * Extracted directly from the 3-page Structural Capability & FEA Validation report.
 */

export default {
  id: 'mechanical-structure-x',
  number: '03',
  title: 'Mechanical Structure — Primary Support Lattice (For X)',
  subtitle: '3000 × 3000 × 3000 mm Alloy Steel Support Structure & IS 800 / IS 875 Structural FEA for X',
  category: 'STRUCTURAL WELDMENT CAD & BEAM FEA',
  year: '2026',
  tools: [
    'SolidWorks Weldments',
    'SolidWorks Simulation (Static Beam FEA)',
    'IS 800:2007 (Steel Structures)',
    'IS 875 Pt.1 & Pt.3 (Dead & Wind Loads)',
    'IS 4923 Hollow Sections',
    'ISO 12944 Duplex Corrosion System',
  ],

  metrics: [
    { label: 'Footprint & Mass', value: '3×3×3 m · 1,451.3 kg' },
    { label: 'Max Combined Stress', value: '10.41 MPa (Limit: 620 MPa)' },
    { label: 'Factor of Safety', value: '59.6 (Req: ≥ 1.5)' },
    { label: 'Max Deflection (URES)', value: '0.248 mm (Limit: 10 mm)' },
  ],

  problemStatement: {
    heading: '03.0 — Engineering Scope & Structural Requirements (For X)',
    summary:
      'Design and structurally validate a 3000 × 3000 × 3000 mm elevated Alloy Steel primary support structure for X capable of supporting an 850 kg top-mounted array under simultaneous gravity and 47.67 m/s design wind loads:',
    constraints: [
      'Governing Load Combination (LC2): Simultaneous Dead Weight (1,451.28 kg) + Top Array Load (850 kg / 8,340 N) + IS 875 Pt.3 Wind Load (5,107 N) per IS 800:2007.',
      'Serviceability Deflection Limit: Maximum lateral/vertical nodal displacement must remain strictly below L/300 (≤ 10.0 mm).',
      'Member Slenderness & Buckling Check: Primary columns and diagonal bracing rods must satisfy IS 800 compression slenderness limits (λ ≤ 180).',
      'Environmental Durability: Duplex corrosion protection via Hot-Dip Galvanizing (IS 4759) + epoxy zinc-rich primer + polyurethane topcoat per ISO 12944.',
    ],
  },

  steps: [
    {
      stepCode: 'SLIDE 01 / STRUCTURE CAD & SPECS',
      title: 'Primary Support Structure Geometry & Material Specifications (For X)',
      description: '3D Structural Weldment Architecture & Alloy Steel Member Hierarchy:',
      keyPoints: [
        '3000 × 3000 × 3000 mm Lattice Envelope: Total structural mass of 1,451.28 kg anchored via 16 grouted-pocket base joints (modeled Fixed, effective length factor K = 0.7).',
        'Primary Vertical Columns: Constructed from 80 × 80 × 5 mm Square Hollow Sections (SHS), Alloy Steel per IS 4923, with full X-bracing across all 4 vertical faces.',
        'Top Payload Cage: Built from 40 × 40 × 4 mm SHS perimeter/grid beams reinforced with Ø33 mm solid rod diagonals to distribute the 850 kg array load.',
        'Alloy Steel Mechanical Properties: Elastic Modulus E = 210 GPa, Yield Strength fy = 620.42 MPa, Ultimate Tensile Strength fu = 723.83 MPa, Density = 7,700 kg/m³.',
      ],
      table: {
        headers: ['Structure Parameter', 'Specification', 'Standard / Basis'],
        rows: [
          ['Plan Footprint & Height', '3000 × 3000 mm · 3000 mm Height', 'Total Mass: 1,451.28 kg'],
          ['Primary Columns', '80 × 80 × 5 mm SHS (Alloy Steel)', 'IS 4923 Hollow Section'],
          ['Top Cage & Diagonals', '40 × 40 × 4 mm SHS + Ø33 mm Rods', 'X-Bracing on all 4 faces'],
          ['Corrosion Protection', 'Hot-Dip Galvanizing + Epoxy/PU Topcoat', 'IS 4759 & ISO 12944 Duplex'],
        ],
      },
      images: [
        {
          src: './assets/mech-structure/p1_img1_529x682.jpeg',
          useCustomImage: true,
          caption: 'FIG 03.1A — Isometric 3D CAD Model of the 3000 × 3000 × 3000 mm Primary Support Structure for X',
        },
        {
          src: './assets/mech-structure/p1_img2_521x598.jpeg',
          useCustomImage: true,
          caption: 'FIG 03.1B — Highlighted Primary Support Columns (80×80×5 SHS) & 4-Face Lateral X-Bracing',
        },
        {
          src: './assets/mech-structure/p1_img3_517x352.jpeg',
          useCustomImage: true,
          caption: 'FIG 03.1C — Top Cage Grid (40×40×4 SHS) & Ø33 mm Diagonal Rod Bracing Network',
        },
      ],
      specs: [
        'Skill: 3D Weldment & Lattice CAD',
        'Mass: 1,451.28 kg',
        'Yield Strength: 620.42 MPa',
      ],
    },

    {
      stepCode: 'SLIDE 02 / FEA SETUP & LOAD DERIVATION',
      title: 'Structural Analysis Setup, IS 875 Wind Derivation & Reaction Check',
      description: 'Beam FEA Discretization, Simultaneous LC2 Loading & Statics Verification:',
      keyPoints: [
        'SolidWorks Simulation Beam Mesh: Discretized into 9,616 beam elements (9,456 nodes) with 16 immovable grouted-pocket base fixtures (green).',
        'Simultaneous Combined Load Case (LC2): Global gravity (1,451.28 kg self-weight) + 8,340 N vertical array load distributed across 14 top-cage beams (595.71 N/beam).',
        'IS 875 Part 3 Wind Derivation: Basic wind speed Vb = 41.67 m/s → Design speed Vz = 47.67 m/s → Design pressure pz = 1,363 N/m² (Cf = 1.76, solidity 0.237) → 5,107 N total lateral force (638.38 N across 8 windward beams).',
        'Independent Statics Self-Validation: Solver reaction forces matched applied loads to the Newton (Sum Z = 5,107 N wind; Sum Y = 24,040 N dead + array; Sum X = 0 N), proving exact boundary condition integrity.',
      ],
      table: {
        headers: ['Load Component (LC2)', 'Engineering Basis', 'Applied in FEA Solver'],
        rows: [
          ['1. Structure Dead Weight', 'CAD Mass = 1,451.28 kg', 'Global Gravity 9.81 m/s² (~14,237 N)'],
          ['2. Top Array Payload', '850 kg Mass → 8,340 N Total', '595.71 N/beam across 14 top-cage beams'],
          ['3. Wind Load (IS 875 Pt.3)', 'Vz = 47.67 m/s, pz = 1,363 N/m²', '638.38 N/beam across 8 windward beams (5,107 N)'],
          ['4. Reaction Force Check', 'Independent Statics Verification', 'ΣFz = 5,107 N | ΣFy = 24,040 N | ΣFx = 0 N'],
        ],
      },
      images: [
        {
          src: './assets/mech-structure/fig2_boundary_conditions.png',
          useCustomImage: true,
          caption: 'FIG 03.2A — FEA Boundary Conditions: 16 Fixed Grouted-Pocket Base Joints (Green) & Simultaneous Array/Wind Loads (Purple/Red)',
        },
        {
          src: './assets/mech-structure/slide_2_full.png',
          useCustomImage: true,
          caption: 'FIG 03.2B — Complete Structural Analysis Setup, IS 875 Part 3 Wind Derivation & Reaction Validation Sheet',
        },
      ],
      specs: [
        'Skill: Code-Compliant Load Derivation',
        'Mesh: 9,456 Nodes / 9,616 Beam Elements',
        'Reaction Check: 100% Exact Match',
      ],
    },

    {
      stepCode: 'SLIDE 03 / VERIFIED FEA RESULTS',
      title: 'Verified Stress, Displacement (URES) & Slenderness Compliance',
      description: 'Full Strength, Serviceability & Buckling Verification Under Governing Load Case LC2:',
      keyPoints: [
        'Max Combined Axial + Bending Stress (10.41 MPa): Well below the 620.42 MPa Alloy Steel yield limit—representing only 1.68% stress utilization and a Factor of Safety of 59.6 (Required ≥ 1.5).',
        'Serviceability Deflection Pass (0.248 mm): Peak resultant displacement (URES) is 0.248 mm at the top cage, 40× stiffer than the 10.0 mm (L/300) serviceability limit.',
        'IS 800 Slenderness Compliance: Primary column slenderness (67.9 ≤ 180) and diagonal rod slenderness (96.9 ≤ 180) pass with substantial buckling margin.',
        'Engineering Recommendation: Preliminary design satisfies all IS 800:2007 and IS 875 Pt.3 criteria; substantial FoS margin allows member wall-thickness optimization for mass/cost reduction in the next phase.',
      ],
      table: {
        headers: ['Verification Parameter', 'Simulated Value', 'IS 800 / Service Limit', 'Status'],
        rows: [
          ['Max Combined Stress', '10.41 MPa', '620.42 MPa (fy)', 'PASS (1.68% Util.)'],
          ['Factor of Safety (FoS)', '59.6', '≥ 1.50', 'PASS'],
          ['Max Displacement (URES)', '0.248 mm', '≤ 10.0 mm (L/300)', 'PASS'],
          ['Column / Rod Slenderness', '67.9 (Col) / 96.9 (Rod)', '≤ 180', 'PASS'],
        ],
      },
      images: [
        {
          src: './assets/mech-structure/fig3_stress_plot.png',
          useCustomImage: true,
          caption: 'FIG 03.3A — Upper Bound Axial + Bending Stress Contour: Peak 10.41 MPa vs. 620.42 MPa Yield (FoS = 59.6)',
        },
        {
          src: './assets/mech-structure/fig4_displacement_plot.png',
          useCustomImage: true,
          caption: 'FIG 03.3B — Static Resultant Displacement (URES) Contour: Peak 0.248 mm vs. 10.0 mm (L/300) Limit',
        },
      ],
      specs: [
        'Skill: Structural Code Verification (IS 800)',
        'Max Stress: 10.41 MPa (PASS)',
        'Max Deflection: 0.248 mm (PASS)',
      ],
    },
  ],

  outcome:
    'Validated the 3000 × 3000 × 3000 mm Mechanical Support Structure for X under simultaneous dead, 850 kg array, and 47.67 m/s wind loads per IS 800:2007 & IS 875 Pt.3—achieving 10.41 MPa peak stress (FoS 59.6), 0.248 mm deflection, and 100% reaction-force equilibrium.',
};
