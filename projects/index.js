/**
 * PROJECT REGISTRY
 * ============================================================================
 * Showcasing Bala Srinivas's authentic engineering projects in sequence:
 * 01 — Heat Pipe-Assisted Hybrid PCM-EG Battery Thermal Management System
 * 02 — 4-Slot 6U Backplane MIL-Qualification & Test Chassis
 * 03 — Mechanical Structure — Primary Support Lattice (For X)
 * ============================================================================
 */

import project01Btms from './01-hybrid-pcm-heatpipe-btms.js';
import project02Chassis6U from './02-6u-vpx-qualification-chassis.js';
import project03MechStructure from './03-mechanical-structure-x.js';

project01Btms.number = '01';
project02Chassis6U.number = '02';
project03MechStructure.number = '03';

export const PROJECTS = [
  project01Btms,
  project02Chassis6U,
  project03MechStructure,
];
