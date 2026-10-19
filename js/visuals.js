/**
 * TECHNICAL PRESENTATION VISUAL ENGINE (`js/visuals.js`)
 * ============================================================================
 * Renders all images of a project step directly in a large, high-visibility
 * Presentation Grid (no hidden tabs required to see your work!) with zero
 * cropping (`object-fit: contain`) so full-page SolidWorks screenshots and
 * CAE graphs are 100% visible at a glance.
 */

export function renderStepMediaGallery(step, projectNumber, stepIndex) {
  const figureList =
    Array.isArray(step.images) && step.images.length > 0
      ? step.images
      : [
          {
            src: step.image,
            visualType: step.visualType,
            useCustomImage: step.useCustomImage,
            caption: step.caption || `FIG ${projectNumber}.${stepIndex + 1}`,
          },
        ];

  const count = figureList.length;
  const gridLayoutClass =
    count === 1
      ? 'pres-grid-1'
      : count === 2
      ? 'pres-grid-2'
      : count === 3
      ? 'pres-grid-3'
      : 'pres-grid-multi';

  const cardsHtml = figureList
    .map((fig, fIdx) => {
      const visualMarkup = renderSingleFigureVisual(fig, projectNumber, stepIndex * 10 + fIdx);
      const figCode = `FIG ${projectNumber}.${stepIndex + 1}${count > 1 ? String.fromCharCode(65 + fIdx) : ''}`;
      return `
        <figure class="pres-figure-card" data-lightbox-trigger data-caption="${escapeHtml(fig.caption || figCode)}">
          <div class="pres-figure-topbar">
            <span class="pres-fig-badge">${figCode}</span>
            <span class="pres-zoom-tag">CLICK TO ENLARGE ↗</span>
          </div>
          <div class="consistent-aspect-box">
            ${visualMarkup}
          </div>
          <figcaption class="pres-figure-caption">
            ${fig.caption || ''}
          </figcaption>
        </figure>
      `;
    })
    .join('');

  return `
    <div class="pres-media-grid ${gridLayoutClass}" data-figure-count="${count}">
      ${cardsHtml}
    </div>
  `;
}

export function renderTechnicalVisual(stepOrFig, projectNumber, seedOffset = 0) {
  return renderSingleFigureVisual(stepOrFig, projectNumber, seedOffset);
}

function renderSingleFigureVisual(fig, projectNumber, seedOffset) {
  const isCustomRaster =
    fig.useCustomImage ||
    (!fig.visualType && fig.src && !fig.src.endsWith('placeholder')) ||
    (fig.src && /\.(png|jpe?g|webp|gif)$/i.test(fig.src));

  if (isCustomRaster) {
    return `<img class="custom-step-img" src="${fig.src || fig.image}" alt="${escapeHtml(fig.caption || 'Engineering Figure')}" loading="lazy" />`;
  }

  const mode = fig.visualType || 'cad-wireframe';
  const seed = parseInt(projectNumber, 10) * 100 + seedOffset + 1;

  if (mode === 'cad-wireframe') {
    return createCadBlueprintSvg(projectNumber, fig, seed);
  }
  if (mode === 'cad-section') {
    return createCadSectionSvg(projectNumber, fig, seed);
  }
  if (mode === 'mesh-grid') {
    return createMeshDiscretizationSvg(projectNumber, fig, seed);
  }
  if (mode === 'convergence-plot') {
    return createConvergenceGraphSvg(projectNumber, fig, seed);
  }
  return createFeaContourSvg(projectNumber, fig, seed);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function createCadBlueprintSvg(projectNumber, step, seed) {
  return `
  <svg class="tech-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(step.caption)}">
    <defs>
      <linearGradient id="bg-cad-${seed}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#eef2f6"/>
      </linearGradient>
      <pattern id="grid-minor-${seed}" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.7"/>
      </pattern>
      <pattern id="grid-major-${seed}" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#grid-minor-${seed})"/>
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#cbd5e1" stroke-width="1.1"/>
      </pattern>
    </defs>

    <rect width="800" height="500" fill="url(#bg-cad-${seed})"/>
    <rect x="24" y="24" width="752" height="452" rx="10" fill="url(#grid-major-${seed})" stroke="#1e293b" stroke-width="1.5"/>

    <line x1="80" y1="250" x2="720" y2="250" stroke="#e05a2b" stroke-width="1" stroke-dasharray="12 4 2 4"/>
    <line x1="400" y1="50" x2="400" y2="450" stroke="#e05a2b" stroke-width="1" stroke-dasharray="12 4 2 4"/>

    <g transform="translate(400, 250)">
      <polygon points="-190,-115 -70,-140 160,-98 215,0 160,98 -70,140 -190,115 -150,0" 
               fill="rgba(30,41,59,0.06)" stroke="#0f172a" stroke-width="2.2"/>
      <polygon points="-125,-78 -30,-95 35,-32 -60,-16" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
      <polygon points="-125,78 -30,95 35,32 -60,16" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
      <polygon points="55,-62 138,-46 138,46 55,62" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>

      <circle cx="-45" cy="0" r="58" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
      <circle cx="-45" cy="0" r="44" fill="none" stroke="#0f172a" stroke-width="1.2" stroke-dasharray="6 4"/>
      <circle cx="-45" cy="0" r="33" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>

      <circle cx="-155" cy="-88" r="19" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <circle cx="-155" cy="-88" r="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="-155" cy="88" r="19" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <circle cx="-155" cy="88" r="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="172" cy="0" r="22" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <circle cx="172" cy="0" r="10" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
    </g>

    <g transform="translate(525, 408)">
      <rect x="0" y="0" width="232" height="50" rx="6" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>
      <line x1="0" y1="25" x2="232" y2="25" stroke="#0f172a" stroke-width="1"/>
      <line x1="115" y1="0" x2="115" y2="50" stroke="#0f172a" stroke-width="1"/>
      <text x="12" y="16" font-family="monospace" font-size="10" font-weight="bold" fill="#0f172a">CAD // PRJ-${projectNumber}</text>
      <text x="125" y="16" font-family="monospace" font-size="10" fill="#e05a2b">3D MASTER MODEL</text>
      <text x="12" y="41" font-family="monospace" font-size="10" fill="#475569">SCALE: 1:1 (MM)</text>
      <text x="125" y="41" font-family="monospace" font-size="10" fill="#0f172a">ISO 2768-mK</text>
    </g>
  </svg>`;
}

function createCadSectionSvg(projectNumber, step, seed) {
  return `
  <svg class="tech-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(step.caption)}">
    <defs>
      <pattern id="hatch-${seed}" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#64748b" stroke-width="1.2"/>
      </pattern>
    </defs>
    <rect width="800" height="500" fill="#f8fafc"/>
    <rect x="24" y="24" width="752" height="452" rx="10" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
    <line x1="60" y1="250" x2="740" y2="250" stroke="#e05a2b" stroke-width="1.2" stroke-dasharray="14 5 3 5"/>

    <g transform="translate(400, 250)">
      <rect x="-230" y="-95" width="460" height="190" rx="14" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
      <rect x="-210" y="-75" width="140" height="42" fill="url(#hatch-${seed})" stroke="#0f172a" stroke-width="1.5"/>
      <rect x="-210" y="33" width="140" height="42" fill="url(#hatch-${seed})" stroke="#0f172a" stroke-width="1.5"/>
      <rect x="50" y="-60" width="155" height="32" fill="url(#hatch-${seed})" stroke="#0f172a" stroke-width="1.5"/>
      <rect x="50" y="28" width="155" height="32" fill="url(#hatch-${seed})" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="-40" cy="0" r="48" fill="#ffffff" stroke="#0f172a" stroke-width="2.2"/>
      <text x="0" y="-115" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#0f172a">SECTION A-A // INTERNAL WALL &amp; BEARING SEAT TOLERANCES</text>
    </g>
  </svg>`;
}

function createMeshDiscretizationSvg(projectNumber, step, seed) {
  return `
  <svg class="tech-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(step.caption)}">
    <defs>
      <linearGradient id="bg-mesh-${seed}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <pattern id="mesh-tri-${seed}" width="22" height="22" patternUnits="userSpaceOnUse">
        <path d="M0 0 L22 0 L11 22 Z M0 0 L11 22 L0 22 Z M22 0 L22 22 L11 22 Z" fill="none" stroke="#38bdf8" stroke-width="0.65" opacity="0.55"/>
      </pattern>
      <pattern id="mesh-fine-${seed}" width="9" height="9" patternUnits="userSpaceOnUse">
        <path d="M0 0 L9 0 L4.5 9 Z M0 0 L4.5 9 L0 9 Z M9 0 L9 9 L4.5 9 Z" fill="none" stroke="#7dd3fc" stroke-width="0.6" opacity="0.9"/>
      </pattern>
    </defs>

    <rect width="800" height="500" fill="url(#bg-mesh-${seed})"/>
    <rect x="24" y="24" width="752" height="452" rx="10" fill="none" stroke="#334155" stroke-width="1.5"/>

    <g transform="translate(400, 250)">
      <polygon points="-190,-115 -70,-140 160,-98 215,0 160,98 -70,140 -190,115 -150,0" 
               fill="url(#mesh-tri-${seed})" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="-45" cy="0" r="70" fill="url(#mesh-fine-${seed})" stroke="#7dd3fc" stroke-width="1.5"/>
      <circle cx="-45" cy="0" r="35" fill="#0f172a" stroke="#bae6fd" stroke-width="2"/>
      <circle cx="-155" cy="-88" r="22" fill="url(#mesh-fine-${seed})" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="-155" cy="88" r="22" fill="url(#mesh-fine-${seed})" stroke="#38bdf8" stroke-width="1.5"/>
      <line x1="255" y1="-65" x2="178" y2="-8" stroke="#facc15" stroke-width="2.5"/>
      <polygon points="175,-5 188,-10 183,-19" fill="#facc15"/>
      <text x="195" y="-75" font-family="monospace" font-size="11" font-weight="bold" fill="#facc15">F_applied = 18.4 kN</text>
    </g>
  </svg>`;
}

function createConvergenceGraphSvg(projectNumber, step, seed) {
  return `
  <svg class="tech-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(step.caption)}">
    <rect width="800" height="500" fill="#0f172a"/>
    <rect x="24" y="24" width="752" height="452" rx="10" fill="#131c31" stroke="#334155" stroke-width="1.5"/>

    <g transform="translate(110, 80)">
      <line x1="0" y1="320" x2="580" y2="320" stroke="#94a3b8" stroke-width="1.8"/>
      <line x1="0" y1="0" x2="0" y2="320" stroke="#94a3b8" stroke-width="1.8"/>
      <line x1="0" y1="90" x2="580" y2="90" stroke="#22c55e" stroke-width="1.2" stroke-dasharray="6 4"/>
      <text x="430" y="80" font-family="monospace" font-size="11" fill="#22c55e">CONVERGED ASYMPTOTE (214.0 MPa — Δ &lt; 1.1%)</text>

      <polyline fill="none" stroke="#38bdf8" stroke-width="3"
                points="40,260 150,175 270,118 400,95 520,91"/>
      <circle cx="40" cy="260" r="6" fill="#38bdf8"/>
      <circle cx="150" cy="175" r="6" fill="#38bdf8"/>
      <circle cx="270" cy="118" r="6" fill="#38bdf8"/>
      <circle cx="400" cy="95" r="7" fill="#facc15" stroke="#0f172a" stroke-width="2"/>
      <circle cx="520" cy="91" r="6" fill="#22c55e"/>
    </g>
  </svg>`;
}

function createFeaContourSvg(projectNumber, step, seed) {
  return `
  <svg class="tech-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(step.caption)}">
    <defs>
      <radialGradient id="fea-grad-${seed}" cx="42%" cy="48%" r="55%">
        <stop offset="0%" stop-color="#ef4444"/>
        <stop offset="22%" stop-color="#f97316"/>
        <stop offset="45%" stop-color="#eab308"/>
        <stop offset="70%" stop-color="#22c55e"/>
        <stop offset="90%" stop-color="#06b6d4"/>
        <stop offset="100%" stop-color="#1d4ed8"/>
      </radialGradient>
      <linearGradient id="legend-bar-${seed}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ef4444"/>
        <stop offset="25%" stop-color="#f97316"/>
        <stop offset="50%" stop-color="#eab308"/>
        <stop offset="75%" stop-color="#22c55e"/>
        <stop offset="100%" stop-color="#1d4ed8"/>
      </linearGradient>
    </defs>

    <rect width="800" height="500" fill="#111318"/>
    <rect x="24" y="24" width="752" height="452" rx="10" fill="#111318" stroke="#2e3440" stroke-width="1.5"/>

    <g transform="translate(48, 68)">
      <text x="0" y="-12" font-family="monospace" font-size="10" font-weight="bold" fill="#f8fafc">CONTOUR SCALE</text>
      <rect x="0" y="4" width="18" height="270" rx="4" fill="url(#legend-bar-${seed})" stroke="#ffffff" stroke-width="0.8"/>
      <text x="26" y="16" font-family="monospace" font-size="10" fill="#ef4444" font-weight="bold">214.0 MAX</text>
      <text x="26" y="144" font-family="monospace" font-size="10" fill="#cbd5e1">110.2</text>
      <text x="26" y="272" font-family="monospace" font-size="10" fill="#60a5fa">4.12 MIN</text>
    </g>

    <g transform="translate(430, 250)">
      <path d="M-185,-108 C-110,-134 -40,-136 155,-92 L208,2 L155,94 C-40,136 -110,134 -185,108 L-142,0 Z" 
            fill="url(#fea-grad-${seed})" stroke="#ffffff" stroke-width="1.8"/>
      <path d="M-115,-68 L-20,-82 L25,-28 L-55,-18 Z" fill="#111318" stroke="#e2e8f0" stroke-width="1.2"/>
      <path d="M-115,68 L-20,82 L25,28 L-55,18 Z" fill="#111318" stroke="#e2e8f0" stroke-width="1.2"/>
      <path d="M58,-52 L130,-38 L130,38 L58,52 Z" fill="#111318" stroke="#e2e8f0" stroke-width="1.2"/>
      <circle cx="-45" cy="0" r="35" fill="#111318" stroke="#ffffff" stroke-width="2"/>
    </g>
  </svg>`;
}
