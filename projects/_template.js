/**
 * UNIVERSAL ELASTIC PROJECT TEMPLATE (`projects/_template.js`)
 * ============================================================================
 * Designed to handle ANY project scale with 100% visual consistency:
 * - Short Projects: Can have just 1–2 steps and a couple of images (metrics,
 *   constraints, and tables are all optional and auto-adapt).
 * - Deep 100-Page Report Projects: Can have 5–15+ steps, multiple images per
 *   step (`images: [...]` with interactive figure switcher), engineering data
 *   tables (`table: {...}`), and bulleted findings (`keyPoints: [...]`).
 * ============================================================================
 */

export default {
  id: '05-project-slug',          // Unique URL-friendly ID
  number: '05',                   // Sequential cube number ('05', '06', etc.)
  title: 'Project Title Here',
  subtitle: 'Clear, simple technical one-liner (e.g., Structural FEA & CAD Redesign)',
  category: 'CAD / CAE',          // Badge shown on cube header
  year: '2026',
  tools: ['SolidWorks', 'ANSYS Mechanical', 'HyperMesh', 'GD&T'],

  // [OPTIONAL] Top-level summary metrics (2 to 6 items — or leave [] for pure CAD projects)
  metrics: [
    { label: 'Mass Reduction', value: '-24.0%' },
    { label: 'Factor of Safety', value: '2.15' },
    { label: 'Max Stress', value: '178 MPa' },
    { label: 'Part Count', value: '12 → 4' },
  ],

  // [OPTIONAL] Problem Statement & Constraints block
  problemStatement: {
    heading: 'Objective & Engineering Scope',
    summary:
      'Write 2–3 simple, technically accurate sentences explaining what needed to be designed or solved and why.',
    // Leave `constraints: []` if not needed for a small project
    constraints: [
      'Envelope limit: 220 × 140 × 85 mm',
      'Static load: 18 kN vertical + 6 kN lateral braking load',
      'Material: Aluminum 7075-T6 (Yield: 503 MPa)',
    ],
  },

  // ELASTIC STORY STEPS: Add 1 step or 20 steps — the Cube adapts automatically!
  steps: [
    {
      stepCode: 'STEP 01',
      title: '3D CAD Modeling & Packaging',
      description:
        'Use clear, direct engineering language. Avoid unnecessary jargon so both HR recruiters and senior engineers immediately grasp your work.',

      // [OPTION A] Single figure:
      // image: './assets/my-project/fig-01.png',
      // caption: 'Fig 1.1 — Master parametric 3D CAD assembly',
      // useCustomImage: true,

      // [OPTION B] Multiple figures inside the SAME step (renders a consistent
      // 16:10 viewport with clickable figure pills + prev/next arrows):
      images: [
        {
          src: './assets/my-project/fig-01a.png',
          visualType: 'cad-wireframe', // Remove `visualType` when using your own PNG/JPG
          caption: 'Fig 1.1a — Isometric CAD Assembly View',
        },
        {
          src: './assets/my-project/fig-01b.png',
          visualType: 'cad-section',
          caption: 'Fig 1.1b — Cross-Sectional Internal Packaging & Tolerances',
        },
      ],

      // [OPTIONAL] Key bullet points for long technical reports
      keyPoints: [
        'Maintained 4.5 mm minimum wall thickness for sand casting',
        'Applied ISO 2768-mK general tolerances on non-mating surfaces',
      ],

      // [OPTIONAL] Structured Engineering Data Table (ideal for 100-page report data)
      table: {
        headers: ['Component / Zone', 'Material', 'Thickness', 'Status'],
        rows: [
          ['Main Housing', 'EN-GJS-500-7', '6.0 mm', 'Frozen Interface'],
          ['Mounting Rib', 'EN-GJS-500-7', '4.5 mm', 'Optimized Zone'],
        ],
      },

      // [OPTIONAL] Compact technical tags at the bottom of the step
      specs: ['Mass: 1.82 kg', 'Fit: Ø68 H7/g6', 'Draft Angle: 2.5°'],
    },
  ],

  // [OPTIONAL] Extra Visual Appendix Gallery (if a project has 5–20 extra screenshots)
  extraGallery: [
    // { src: './assets/my-project/extra-01.png', caption: 'Appendix A — Convergence Plot' },
  ],

  // Final takeaway bar at the bottom of the Cube
  outcome:
    'Delivered production STEP models, 2D GD&T drawings, and verified simulation compliance.',
};
