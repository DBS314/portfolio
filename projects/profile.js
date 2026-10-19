/**
 * PROFILE & RESUME DATA (`projects/profile.js`)
 * ============================================================================
 * 100% synced with Dasari Bala Srinivas's official Resume PDF.
 */

export const PROFILE = {
  name: 'DASARI BALA SRINIVAS',
  shortName: 'Bala Srinivas',
  role: 'Mechanical Engineer | CAD & CAE | Systems Engineering, Design & Integration | Defence, Aerospace & Energy',
  tagline:
    'Mechanical Engineer with a first-principles approach to problem-solving and hands-on experience in deep-tech and R&D startup environments—specializing in CAD/CAE (SolidWorks, CATIA, ANSYS, SimScale), Defence & Aerospace electronics packaging (VPX, LRUs, MIL-STD), and multidisciplinary system integration.',
  summary:
    'Mechanical Engineer with a first-principles approach to problem-solving, developing expertise through hands-on experience in deep-tech and R&D Startup Environments. Experienced in mechanical design, CAD/CAE, electronics packaging, and multidisciplinary engineering, with an emphasis on understanding system-level requirements, managing interfaces, and integrating subsystems into practical engineering solutions. Driven by continuous learning, technical ownership, and solving complex engineering challenges.',
  location: 'Guntur, Andhra Pradesh / Bengaluru, India',
  email: 'balasrinivas314@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bala-srinivas-mech',
  linkedinDisplay: 'www.linkedin.com/in/bala-srinivas-mech',
  phone: '+91 8500716992',
  phoneDisplay: '🇮🇳 +91 8500716992 (IN)',
  resumePdfUrl: './assets/resume/Dasari_Bala_Srinivas_CV_2026.pdf?v=2',
  resumeImageUrl: './assets/resume/Dasari_Bala_Srinivas_Resume.png?v=2',

  softwareMatrix: [
    {
      domain: 'CAD & CAE Tools',
      items: ['SolidWorks', 'CATIA', 'ANSYS (Mechanical, Discovery & Fluent)', 'SimScale'],
    },
    {
      domain: 'Mechanical Systems Design',
      items: [
        'Concept Development & Requirement Translation',
        'Custom Chassis & Enclosure Design',
        'Precision Mechanisms & Flexures',
        'Mounting Interfaces & Structural Assemblies',
        'Design Optimisation',
      ],
    },
    {
      domain: 'Defence & Aerospace Electronics Packaging',
      items: [
        'Radar-System Mechanical Design & RF Integration',
        'VPX-Based Electronics Packaging & LRUs',
        'Test & Qualification Chassis',
        'Air-, Conduction- & Liquid-Cooled Chassis',
        'MIL-STD, VITA & Indian Standards (IS)',
      ],
    },
    {
      domain: 'Engineering Documentation',
      items: [
        'Interface Control Documents (ICDs)',
        'Quality Assurance Plans (QAPs) & Compliance',
        'Bills of Materials (BOMs) & SOW',
        'CAE Reports & Engineering Drawings',
        'Pre-Visualisation & CAD Rendering',
      ],
    },
  ],

  experience: [
    {
      company: 'Avarthana Technologies Pvt. Ltd.',
      location: 'Bengaluru, Karnataka, India',
      totalDuration: '10 Months',
      roles: [
        {
          title: 'Research and Development Engineer',
          period: 'July 2026 - Present (4 months)',
        },
        {
          title: 'Research and Development Intern',
          period: 'January 2026 - July 2026 (6 months)',
        },
      ],
      highlights: [
        'Supported R&D activities in radar development, VPX systems, and custom MIL-STD applications through CAD/CAE-driven design and engineering analysis.',
        'Collaborated with multidisciplinary RF, FPGA, and Civil Engineering teams during the pre-development of a specialised radar system, contributing to mechanical structures, thermal management, interfaces, mounting arrangements, and pre-visualisation models.',
        'Contributed to new designs and redesigns of LRUs, test and qualification chassis, air-cooled, conduction-cooled, and liquid-cooled systems, and mechanical assemblies. Conducted self-directed R&D into precision mechanisms, particularly flexures.',
      ],
    },
    {
      company: 'Away Space Covenant (AwSc)',
      location: 'Guntur, Andhra Pradesh, India',
      totalDuration: 'August 2025 (1 month)',
      roles: [
        {
          title: 'CAD & CFD Engineering Intern',
          period: 'August 2025 (1 month)',
        },
      ],
      highlights: [
        'Contributed to the design and development of an Earth-observation product by creating prototype models in CATIA and performing CFD simulations in ANSYS Discovery and Fluent to evaluate and optimise aerodynamic performance.',
        'Collaborated with the engineering team to develop a functional prototype, gaining practical experience in research-driven product development and aerospace engineering.',
      ],
    },
  ],

  resumeProjects: [
    {
      title: 'Battery Thermal Management System for Electric Two-Wheelers | Capstone Project',
      period: 'April 2026',
      description:
        'Designed a hybrid PCM–EG and heat-pipe battery thermal management system for a 200-cell electric two-wheeler battery pack. Developed the mechanical assembly in SolidWorks and performed transient thermal simulations in SimScale. Achieved a 6°C reduction in simulated peak temperature at 40°C ambient, while demonstrating predictable cyclic thermal behaviour under the hybrid configuration and identifying rapid thermal escalation toward potential thermal runaway in the PCM–EG-only case.',
    },
    {
      title: 'Atmospheric Water Generator',
      period: 'April 2022',
      description:
        'Designed and fabricated an atmospheric water generator prototype capable of producing up to 10 L/day through dew-point cooling. Integrated an R134a-based vapour-compression refrigeration cycle using repurposed air-conditioning and refrigeration components to condense atmospheric moisture. Presented the prototype at Regional Polytech Fest 2022, receiving appreciation for its innovative approach and resource-efficient component reuse.',
    },
  ],

  education: [
    {
      period: 'August 2023 - June 2026',
      degree: 'Bachelor of Technology - Mechanical Engineering',
      institution: 'Vasireddy Venkatadri Institute of Technology, Nambur, Guntur',
      score: 'CGPA: 7.5',
    },
    {
      period: 'October 2020 - April 2023',
      degree: 'Diploma in Mechanical Engineering',
      institution: 'M.B.T.S Government Polytechnic, Nallapadu, Guntur',
      score: 'Percentage: 73.44%',
    },
    {
      period: 'March 2020',
      degree: 'High School',
      institution: 'St Ann’s EM School',
      score: 'Percentage: 96%',
    },
  ],

  certifications: [
    {
      title: 'Master CAD/CAM — Central Institute for Tool Design',
      period: 'December 2022 - June 2023 (6 months)',
    },
    {
      title: 'Engineering Design and Simulation - Professional Certificate — MathWorks',
      period: 'edX, September 2024',
    },
    {
      title: 'NPTEL - Computer Integrated Manufacturing - (Elite)',
      period: 'January - April 2024',
    },
    {
      title: 'CATIA Expert Surface Design — APSSDC',
      period: 'May – July 2025',
    },
  ],

  servicesForClients: [
    {
      code: '01',
      title: 'CAD & CAE (SolidWorks, CATIA, ANSYS, SimScale)',
    },
    {
      code: '02',
      title: 'Defence & Aerospace Packaging (VPX, LRUs, MIL-STD)',
    },
    {
      code: '03',
      title: 'Mechanical Structures, Thermal & CFD Analysis',
    },
    {
      code: '04',
      title: 'Engineering Documentation (ICDs, BOMs, QAPs, Drawings)',
    },
  ],
};
