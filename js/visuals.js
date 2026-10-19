/**
 * TECHNICAL PRESENTATION VISUAL ENGINE (`js/visuals.js`)
 * ============================================================================
 * - Zero cropping (`object-fit: contain`) for full-page SolidWorks & CAE plots
 * - Async image decoding (`decoding="async"`) + priority hints (`fetchpriority`)
 * - Strict HTML escaping (`escapeHtml`) for XSS-safe attribute rendering
 */

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function renderStepMediaGallery(step, projectNumber, stepIndex) {
  const figureList =
    Array.isArray(step.images) && step.images.length > 0
      ? step.images
      : [
          {
            src: step.image,
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
      const figCode = `FIG ${projectNumber}.${stepIndex + 1}${count > 1 ? String.fromCharCode(65 + fIdx) : ''}`;
      const safeCaption = escapeHtml(fig.caption || figCode);
      const visualMarkup = renderTechnicalVisual(fig, projectNumber, false);

      return `
        <figure class="pres-figure-card" data-lightbox-trigger data-caption="${safeCaption}">
          <div class="pres-figure-topbar">
            <span class="pres-fig-badge">${escapeHtml(figCode)}</span>
            <span class="pres-zoom-tag">ENLARGE ↗</span>
          </div>
          <div class="consistent-aspect-box">
            ${visualMarkup}
          </div>
          <figcaption class="pres-figure-caption">
            ${safeCaption}
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

export function renderTechnicalVisual(fig, projectNumber = '01', isPriority = false) {
  const src = fig?.src || fig?.image;
  const safeCaption = escapeHtml(fig?.caption || `Project ${projectNumber} Figure`);

  if (src) {
    const loadAttrs = isPriority
      ? 'fetchpriority="high" decoding="async"'
      : 'loading="lazy" decoding="async"';
    return `<img class="custom-step-img" src="${escapeHtml(src)}" alt="${safeCaption}" ${loadAttrs} />`;
  }

  return `
    <svg class="tech-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${safeCaption}">
      <rect width="800" height="500" fill="#f8fafc"/>
      <rect x="24" y="24" width="752" height="452" rx="8" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="6 4"/>
      <text x="400" y="250" text-anchor="middle" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="14" font-weight="600">
        CAD / CAE VIEWPORT — PRJ ${escapeHtml(projectNumber)}
      </text>
    </svg>
  `;
}
