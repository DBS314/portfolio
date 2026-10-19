/**
 * PROJECT 02: 4-SLOT 6U BACKPLANE TEST & MIL-QUALIFICATION CHASSIS
 * ============================================================================
 * Concise, point-wise Technical Presentation format showcasing rugged
 * electromechanical packaging, conduction-to-convection cooling, and EMI/EMC sealing.
 */

export default {
  id: '6u-backplane-qualification-chassis',
  number: '02',
  title: '4-Slot 6U Backplane MIL-Qualification & Test Chassis',
  subtitle: 'Rugged Aluminum 6061-T6 Conduction-to-Convection Enclosure with EMI/EMC Shielding',
  category: 'RUGGED ELECTRONIC PACKAGING & THERMAL CAD',
  year: '2026',
  tools: [
    'SolidWorks 2025 (Assembly & Part Modeling)',
    'Aluminum 6061-T6 CNC Machining',
    'MIL-STD Thermal & Vibration Design',
    'Conduction-to-Convection Cooling',
    'EMI/EMC Gasket Sealing',
  ],

  metrics: [
    { label: 'Card Capacity', value: '4 Slots · 6U Form Factor' },
    { label: 'Primary Material', value: 'Al 6061-T6 (Monolithic)' },
    { label: 'Active Exhaust', value: '4× Top Ducted Fans' },
    { label: 'Qualification', value: 'MIL-STD + EMI/EMC' },
  ],

  problemStatement: {
    heading: '02.0 — Engineering Requirement & Design Scope',
    summary:
      'Design a rugged 4-slot 6U backplane test and qualification chassis in Aluminum 6061-T6 built to pass customer MIL-STD thermal, shock, and vibration testing while providing EMI/EMC environmental shielding:',
    constraints: [
      'Rigid Card Retention: Must firmly lock four 6U electronic cards and the rear backplane against severe MIL-STD vibration profiles.',
      'Low-Resistance Thermal Path: Sealed internal electronics cannot rely on open ambient air; heat must conduct directly from cards into the side walls.',
      'Shrouded Forced Convection: Side-wall external fins must reject heat via ducted axial fans without airflow choking.',
      'EMI/EMC Protection: Mating cover interfaces must accommodate continuous EMI/EMC shielding gaskets to prevent RF leakage.',
    ],
  },

  steps: [
    {
      stepCode: 'SLIDE 01 / FULL ENCLOSURE & INTERNAL CUTAWAY',
      title: 'Cohesive 4-Slot 6U Assembly & Shrouded Forced-Air Plenum',
      description: 'Complete Test Chassis Packaging & Internal Backplane Integration:',
      keyPoints: [
        '4-Slot 6U Backplane Integration: Houses a 4-slot 6U backplane PCB (green) with precision-aligned horizontal card guide rails and front I/O panel access.',
        'Isolated Cooling Plenums: Cool air enters through lower side-wall perforated vents, sweeps upward across vertical heatsink fins, and exits via 4 top-mounted axial fans (OUTLET).',
        'Ergonomic & Rugged Exterior: Front I/O panel integrates thermally insulated carry handles and a multi-bolt perimeter for uniform EMI/EMC gasket compression.',
        'Current Optimization (In Progress): Refining intake vent open-area ratio and plenum geometry to lower static pressure drop (ΔP) and prevent fan airflow choking.',
      ],
      images: [
        {
          src: './assets/chassis-6u/01-full-enclosure-4view.png',
          useCustomImage: true,
          caption: 'FIG 02.1A — Complete 4-Slot 6U Qualification Chassis (Front I/O Panel, Side Intake Vents & 4× Top Fan Outlets)',
        },
        {
          src: './assets/chassis-6u/02-internal-backplane-cutaway.png',
          useCustomImage: true,
          caption: 'FIG 02.1B — Internal Cutaway: 4-Slot 6U Backplane (Green), Card Guide Slots & Top Axial Exhaust Fans Above Fin Channels',
        },
      ],
      specs: [
        'Skill: Rugged Electromechanical CAD',
        'Backplane: 4-Slot 6U Standard',
        'Airflow: Bottom-Inlet to Top-Outlet Duct',
      ],
    },

    {
      stepCode: 'SLIDE 02 / MONOLITHIC FINNED SIDE WALL & CHASSIS CORE',
      title: 'Conduction-to-Convection Side Wall & EMI/EMC Structural Core',
      description: 'Dual-Purpose Aluminum 6061-T6 Side Walls for Structural Rigidity & Heat Transfer:',
      keyPoints: [
        'Monolithic Al 6061-T6 Side Wall: CNC-machined from a single billet (`k = 167–218 W/m·K`) to eliminate thermal joint resistance between card slots and cooling fins.',
        'Direct Card-to-Fin Conduction: Internal horizontal slots grip the 6U card edges firmly, conducting heat directly into the deep vertical external fin array.',
        'Sturdy Interlocking Box Core: Base plate, rear wall, and finned side walls bolt together into a rigid box-beam frame engineered for MIL-STD vibration sweeps.',
        'EMI/EMC Shielding Gasket Seating: Continuous machined perimeter lands and closely spaced fastener bosses ensure uniform clamping pressure on the EMI/EMC gasket.',
      ],
      images: [
        {
          src: './assets/chassis-6u/03-finned-sidewall-part.png',
          useCustomImage: true,
          caption: 'FIG 02.2A — Monolithic Al 6061-T6 Side Wall: Inner 4-Slot Card Rails (Left) & Outer Vertical Heatsink Fins (Right)',
        },
        {
          src: './assets/chassis-6u/04-structural-chassis-core.png',
          useCustomImage: true,
          caption: 'FIG 02.2B — Structural Chassis Sub-Assembly Showing Symmetric Finned Side Walls, EMI/EMC Sealing Perimeter & Rear Wall',
        },
      ],
      specs: [
        'Skill: Conduction-Cooled Chassis Design',
        'Material: Aluminum 6061-T6',
        'Status: Active Pressure-Drop (ΔP) Refinement',
      ],
    },
  ],

  outcome:
    'Engineered a cohesive Aluminum 6061-T6 4-slot 6U qualification chassis with monolithic card-to-fin conduction walls, EMI/EMC gasket provisions, and ducted top-exhaust fan plenums—currently undergoing airflow optimization to minimize pressure drop and prevent choking.',
};
