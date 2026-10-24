/**
 * MAIN PORTFOLIO CONTROLLER (`js/app.js`)
 * ============================================================================
 * - Instant startup: On-demand lazy rendering for Gallery & Resume views
 * - 60/120fps glitch-free transitions: GPU-composited transforms, rAF scroll
 *   throttling, single-shot IntersectionObserver unobserving, zero blur lag
 * - Security hardened: Strict HTML escaping & `noopener noreferrer` links
 */

import { PROJECTS } from '../projects/index.js';
import { PROFILE } from '../projects/profile.js';
import { escapeHtml, renderStepMediaGallery, renderTechnicalVisual } from './visuals.js';
import { initPortfolioAnalytics } from './analytics.js';

const SVG_ARROW_RIGHT = `<svg class="btn-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
const SVG_ARROW_DOWN = `<svg class="btn-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`;
const SVG_ARROW_UP_RIGHT = `<svg class="btn-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
const SVG_TOOL = `<svg class="tool-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

let isGalleryRendered = false;
let isResumeRendered = false;

document.addEventListener('DOMContentLoaded', () => {
  initHeroAndProfile();
  renderVerticalStepRail();
  renderProjectCubes();
  initViewNavigation();
  initScrollSpyAndFluidReveals();
  initLightbox();
  initPortfolioAnalytics();
});

function formatPresentationBullet(text) {
  const safe = escapeHtml(text);
  const colonIdx = safe.indexOf(':');
  if (colonIdx > 0 && colonIdx < 68) {
    const lead = safe.slice(0, colonIdx);
    const rest = safe.slice(colonIdx + 1);
    return `<strong class="bullet-lead">${lead}:</strong>${rest}`;
  }
  return safe;
}

/* --------------------------------------------------------------------------
   1. HERO & PROFILE INITIALIZATION (Fast First Paint)
   -------------------------------------------------------------------------- */
function initHeroAndProfile() {
  const taglineEl = document.getElementById('hero-tagline');
  if (taglineEl) taglineEl.textContent = PROFILE.tagline;

  const countBadgeEl = document.getElementById('project-count-badge');
  if (countBadgeEl) {
    countBadgeEl.textContent = `${String(PROJECTS.length).padStart(2, '0')} PROJECTS`;
  }

  const heroPreview = document.getElementById('hero-blueprint-preview');
  if (heroPreview && PROJECTS.length > 0) {
    const p0 = PROJECTS[0];
    const heroFig = p0.steps[3]?.images?.[0] || p0.steps[0]?.images?.[0] || p0.steps[0];
    heroPreview.innerHTML = renderTechnicalVisual(heroFig, p0.number, true);
  }

  const ledgerEl = document.getElementById('hero-project-ledger');
  if (ledgerEl) {
    ledgerEl.innerHTML = PROJECTS.map(
      (proj) => `
        <a href="#cube-${escapeHtml(proj.id)}" class="ledger-card-link">
          <div class="ledger-card-top">
            <span class="ledger-pill-num">PROJECT ${escapeHtml(proj.number)}</span>
            <span class="ledger-card-arrow">${SVG_ARROW_RIGHT}</span>
          </div>
          <div class="ledger-card-title">${escapeHtml(proj.title)}</div>
          <div class="ledger-card-cat">${escapeHtml(proj.category)}</div>
        </a>
      `
    ).join('');
  }

  const servicesEl = document.getElementById('services-mini-list');
  if (servicesEl) {
    servicesEl.innerHTML = PROFILE.servicesForClients
      .map(
        (s) =>
          `<div class="service-mini-item"><strong>${escapeHtml(s.code)}</strong><span>${escapeHtml(s.title)}</span></div>`
      )
      .join('');
  }

  const linksEl = document.getElementById('contact-links-box');
  if (linksEl) {
    linksEl.innerHTML = `
      <a class="contact-link-row" href="mailto:${escapeHtml(PROFILE.email)}">
        <div class="contact-row-meta">
          <span class="contact-row-label">EMAIL</span>
          <span class="contact-row-val">${escapeHtml(PROFILE.email)}</span>
        </div>
        ${SVG_ARROW_UP_RIGHT}
      </a>
      <a class="contact-link-row" href="${escapeHtml(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer">
        <div class="contact-row-meta">
          <span class="contact-row-label">LINKEDIN</span>
          <span class="contact-row-val">${escapeHtml(PROFILE.linkedinDisplay)}</span>
        </div>
        ${SVG_ARROW_UP_RIGHT}
      </a>
      <a class="contact-link-row" href="tel:${escapeHtml(PROFILE.phone.replace(/\s+/g, ''))}">
        <div class="contact-row-meta">
          <span class="contact-row-label">PHONE (INDIA)</span>
          <span class="contact-row-val">${escapeHtml(PROFILE.phoneDisplay)}</span>
        </div>
        ${SVG_ARROW_RIGHT}
      </a>
    `;
  }
}

/* --------------------------------------------------------------------------
   2. RIGHT-HAND VERTICAL TIMELINE RAIL
   -------------------------------------------------------------------------- */
function renderVerticalStepRail() {
  const rail = document.getElementById('vertical-step-rail');
  if (!rail) return;

  const nodes = [
    { id: 'top', label: '00', title: 'Overview' },
    ...PROJECTS.map((p) => ({ id: `cube-${p.id}`, label: p.number, title: p.title })),
    { id: 'contact-cube', label: 'END', title: 'Contact' },
  ];

  rail.innerHTML = nodes
    .map(
      (n, idx) => `
      <a href="#${escapeHtml(n.id)}" class="rail-node ${idx === 0 ? 'active' : ''}" data-rail-target="${escapeHtml(n.id)}" title="${escapeHtml(n.title)}">
        ${escapeHtml(n.label)}
      </a>
    `
    )
    .join('');
}

/* --------------------------------------------------------------------------
   3. TECHNICAL PRESENTATION CUBE RENDERER
   -------------------------------------------------------------------------- */
function renderProjectCubes() {
  const container = document.getElementById('project-cubes-container');
  if (!container) return;

  container.innerHTML = PROJECTS.map((proj, pIndex) => {
    const themeClass = `cube-theme-${pIndex % 5}`;
    const nextProj = PROJECTS[pIndex + 1];
    const nextHref = nextProj ? `#cube-${escapeHtml(nextProj.id)}` : '#contact-cube';
    const nextLabel = nextProj ? `Next: Project ${escapeHtml(nextProj.number)}` : 'Contact & Resume';

    const hasMetrics = Array.isArray(proj.metrics) && proj.metrics.length > 0;
    const metricsHtml = hasMetrics
      ? `
      <div class="cube-metrics-strip apple-reveal">
        ${proj.metrics
          .map(
            (m) => `
          <div class="metric-cell">
            <span class="metric-label">${escapeHtml(m.label)}</span>
            <span class="metric-value">${escapeHtml(m.value)}</span>
          </div>`
          )
          .join('')}
      </div>`
      : '';

    const toolsHtml = (proj.tools || [])
      .map((t) => `<span class="tool-pill">${SVG_TOOL}<span>${escapeHtml(t)}</span></span>`)
      .join('');

    let problemBlockHtml = '';
    if (proj.problemStatement) {
      const hasConstraints =
        Array.isArray(proj.problemStatement.constraints) &&
        proj.problemStatement.constraints.length > 0;

      const constraintsHtml = hasConstraints
        ? `
        <div class="problem-right">
          <div class="constraints-title">KEY ENGINEERING CHALLENGES &amp; CONSTRAINTS</div>
          <ul class="constraints-list">
            ${proj.problemStatement.constraints
              .map((c) => `<li>${formatPresentationBullet(c)}</li>`)
              .join('')}
          </ul>
        </div>`
        : '';

      problemBlockHtml = `
        <div class="cube-problem-block apple-reveal ${!hasConstraints ? 'single-col' : ''}">
          <div class="problem-left">
            <div>
              <span class="mono-tag">PROBLEM STATEMENT &amp; METHODOLOGY</span>
              <h3>${escapeHtml(proj.problemStatement.heading)}</h3>
              <p class="problem-summary">${escapeHtml(proj.problemStatement.summary)}</p>
            </div>
            <div class="tools-block-wrap">
              <div class="tools-label">TOOLS &amp; STANDARDS EMPLOYED</div>
              <div class="tools-row">${toolsHtml}</div>
            </div>
          </div>
          ${constraintsHtml}
        </div>
      `;
    }

    const stepJumpNav =
      proj.steps.length > 1
        ? `
      <div class="cube-step-jumper apple-reveal" aria-label="Presentation Slides">
        <span class="jumper-label">SLIDE DECK INDEX (${proj.steps.length} SLIDES) — SELECT TO JUMP</span>
        <div class="jumper-pills">
          ${proj.steps
            .map(
              (st, sIdx) => `
            <a href="#step-${escapeHtml(proj.id)}-${sIdx}" class="phase-jump-pill">
              <span class="jump-num">0${sIdx + 1}</span>
              <span class="jump-text">${escapeHtml(st.title)}</span>
            </a>
          `
            )
            .join('')}
        </div>
      </div>`
        : '';

    const stepsHtml = proj.steps
      .map((step, sIdx) => {
        const specsHtml = (step.specs || [])
          .map((sp) => `<span class="spec-badge">${escapeHtml(sp)}</span>`)
          .join('');

        const bulletItems =
          Array.isArray(step.keyPoints) && step.keyPoints.length > 0
            ? step.keyPoints
            : String(step.description || '')
                .split(/(?<=\.)\s+/)
                .filter((s) => s.trim().length > 0);

        const leadSubheading =
          Array.isArray(step.keyPoints) && step.keyPoints.length > 0 && step.description
            ? `<p class="pres-slide-subtitle">${escapeHtml(step.description)}</p>`
            : '';

        const keyPointsHtml = `
          <ul class="pres-bullet-list">
            ${bulletItems.map((kp) => `<li>${formatPresentationBullet(kp)}</li>`).join('')}
          </ul>
        `;

        const tableHtml =
          step.table && Array.isArray(step.table.headers)
            ? `
          <div class="step-table-wrap">
            <div class="table-scroll-container">
              <table class="eng-data-table">
                <thead>
                  <tr>${step.table.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
                </thead>
                <tbody>
                  ${step.table.rows
                    .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
                    .join('')}
                </tbody>
              </table>
            </div>
          </div>`
            : '';

        const mediaGalleryHtml = renderStepMediaGallery(step, proj.number, sIdx);

        return `
        <article class="cube-step-slide presentation-slide apple-reveal"
                 id="step-${escapeHtml(proj.id)}-${sIdx}"
                 data-scroll-code="PRJ ${escapeHtml(proj.number)} · ${escapeHtml(step.stepCode)}"
                 data-scroll-title="${escapeHtml(proj.title)} — ${escapeHtml(step.title)}"
                 data-rail-id="cube-${escapeHtml(proj.id)}">

          <div class="pres-slide-top">
            <div class="pres-slide-title-row">
              <div class="pres-title-col">
                <span class="pres-step-pill">${escapeHtml(step.stepCode)}</span>
                <h4 class="pres-slide-title">${escapeHtml(step.title)}</h4>
                ${leadSubheading}
              </div>
              <div class="pres-specs-row">${specsHtml}</div>
            </div>

            <div class="pres-content-grid ${tableHtml ? 'with-table' : ''}">
              <div class="pres-bullets-col">
                ${keyPointsHtml}
              </div>
              ${tableHtml ? `<div class="pres-table-col">${tableHtml}</div>` : ''}
            </div>
          </div>

          <div class="pres-slide-visuals">
            ${mediaGalleryHtml}
          </div>
        </article>`;
      })
      .join('');

    return `
      <section class="project-cube ${themeClass}" id="cube-${escapeHtml(proj.id)}"
               data-scroll-code="PRJ ${escapeHtml(proj.number)} / 0${PROJECTS.length}"
               data-scroll-title="${escapeHtml(proj.title)}"
               data-rail-id="cube-${escapeHtml(proj.id)}">
        <div class="cube-header apple-reveal">
          <div class="cube-id-group">
            <span class="cube-number-pill">PROJECT ${escapeHtml(proj.number)}</span>
            <div class="cube-title-wrap">
              <h2 class="cube-title">${escapeHtml(proj.title)}</h2>
              <p class="cube-subtitle">${escapeHtml(proj.subtitle)}</p>
            </div>
          </div>
          <div class="cube-meta-right">
            <span class="cube-badge">${escapeHtml(proj.category)}</span>
            <span class="cube-badge">${escapeHtml(proj.year)}</span>
          </div>
        </div>

        ${metricsHtml}
        ${problemBlockHtml}
        ${stepJumpNav}

        <div class="cube-steps-stream">
          ${stepsHtml}
        </div>

        <div class="cube-outcome-bar apple-reveal">
          <div class="outcome-text">
            <span class="outcome-label">KEY DELIVERABLE &amp; OUTCOME</span>
            <p>${escapeHtml(proj.outcome)}</p>
          </div>
          <a href="${nextHref}" class="action-btn primary">
            <span>${nextLabel}</span>
            ${SVG_ARROW_DOWN}
          </a>
        </div>
      </section>
    `;
  }).join('');
}

/* --------------------------------------------------------------------------
   4. RIBBON-FREE IMAGE GALLERY (Lazy-Rendered on First Open)
   -------------------------------------------------------------------------- */
function ensureGalleryRendered() {
  if (isGalleryRendered) return;
  isGalleryRendered = true;

  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  const items = [];
  PROJECTS.forEach((proj) => {
    proj.steps.forEach((step) => {
      const figList =
        Array.isArray(step.images) && step.images.length > 0
          ? step.images
          : [
              {
                src: step.image,
                useCustomImage: step.useCustomImage,
                caption: step.caption,
              },
            ];

      figList.forEach((fig) => {
        items.push({
          projNumber: proj.number,
          caption: fig.caption || `${proj.title} Figure`,
          visualHtml: renderTechnicalVisual(fig, proj.number, false),
        });
      });
    });
  });

  galleryGrid.innerHTML = items
    .map(
      (item) => `
      <figure class="gallery-card" data-lightbox-trigger data-caption="${escapeHtml(item.caption)}">
        <div class="consistent-aspect-box">
          ${item.visualHtml}
        </div>
        <figcaption class="gallery-caption">
          <span>${escapeHtml(item.caption)}</span>
          <span class="gallery-caption-project">PRJ-${escapeHtml(item.projNumber)}</span>
        </figcaption>
      </figure>
    `
    )
    .join('');
}

/* --------------------------------------------------------------------------
   5. OFFICIAL ENGINEERING RESUME VIEW (Lazy-Rendered on First Open)
   -------------------------------------------------------------------------- */
function ensureResumeRendered() {
  if (isResumeRendered) return;
  isResumeRendered = true;

  const container = document.getElementById('resume-sheet-content');
  if (!container) return;

  const matrixHtml = PROFILE.softwareMatrix
    .map(
      (group) => `
      <div class="matrix-box">
        <h4>${escapeHtml(group.domain)}</h4>
        <div class="tools-row">
          ${group.items.map((item) => `<span class="tool-pill"><span>${escapeHtml(item)}</span></span>`).join('')}
        </div>
      </div>
    `
    )
    .join('');

  const expHtml = PROFILE.experience
    .map(
      (exp) => `
      <div class="exp-item">
        <div class="exp-head">
          <span>${escapeHtml(exp.company)} — ${escapeHtml(exp.location)}</span>
          <span class="exp-period">${escapeHtml(exp.totalDuration)}</span>
        </div>
        <div class="exp-roles-stack">
          ${exp.roles
            .map(
              (r) => `
            <div class="exp-role-row">
              <span>${escapeHtml(r.title)}</span>
              <span class="exp-role-date">${escapeHtml(r.period)}</span>
            </div>
          `
            )
            .join('')}
        </div>
        <ul class="exp-highlights">
          ${exp.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
        </ul>
      </div>
    `
    )
    .join('');

  const resumeProjHtml = PROFILE.resumeProjects
    .map(
      (rp) => `
      <div class="exp-item">
        <div class="exp-head">
          <span>${escapeHtml(rp.title)}</span>
          <span class="exp-period">${escapeHtml(rp.period)}</span>
        </div>
        <p class="exp-desc-p">${escapeHtml(rp.description)}</p>
      </div>
    `
    )
    .join('');

  const eduHtml = PROFILE.education
    .map(
      (ed) => `
      <div class="exp-item">
        <div class="exp-head">
          <span>${escapeHtml(ed.degree)} — <strong style="color: var(--accent-amber);">${escapeHtml(ed.score)}</strong></span>
          <span class="exp-period">${escapeHtml(ed.period)}</span>
        </div>
        <p class="exp-desc-p">${escapeHtml(ed.institution)}</p>
      </div>
    `
    )
    .join('');

  const certHtml = PROFILE.certifications
    .map(
      (c) => `
      <div class="exp-item cert-item">
        <div class="exp-head" style="margin-bottom: 0;">
          <span>${escapeHtml(c.title)}</span>
          <span class="exp-period">${escapeHtml(c.period)}</span>
        </div>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="resume-top">
      <div>
        <h3 class="resume-name">${escapeHtml(PROFILE.name)}</h3>
        <p class="resume-role">${escapeHtml(PROFILE.role)}</p>
      </div>
      <div class="resume-contact-meta">
        <div><a href="mailto:${escapeHtml(PROFILE.email)}">${escapeHtml(PROFILE.email)} ↗</a></div>
        <div><a href="tel:${escapeHtml(PROFILE.phone.replace(/\s+/g, ''))}">${escapeHtml(PROFILE.phoneDisplay)}</a></div>
        <div><a href="${escapeHtml(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(PROFILE.linkedinDisplay)} ↗</a></div>
        <div>${escapeHtml(PROFILE.location)}</div>
      </div>
    </div>

    <div class="official-resume-paper-wrap">
      <div class="official-resume-paper-bar no-print">
        <span class="mono-tag">OFFICIAL UPLOADED RESUME DOCUMENT (A4)</span>
        <a href="${escapeHtml(PROFILE.resumePdfUrl)}" target="_blank" rel="noopener noreferrer" class="mono-tag link-tag">
          OPEN ORIGINAL PDF IN NEW TAB ↗
        </a>
      </div>
      <div class="official-resume-paper" data-lightbox-trigger data-caption="Dasari Bala Srinivas — Official Engineering Resume">
        <div class="consistent-aspect-box" style="aspect-ratio: auto; background: #ffffff; padding: 0;">
          <img src="${escapeHtml(PROFILE.resumeImageUrl)}" alt="Dasari Bala Srinivas — Official Resume" class="official-resume-img" decoding="async" />
        </div>
      </div>
    </div>

    <div class="resume-structured-breakdown no-print">
      <div class="resume-section">
        <div class="resume-sec-title">01 / SUMMARY</div>
        <p class="exp-desc-p">${escapeHtml(PROFILE.summary)}</p>
      </div>

      <div class="resume-section">
        <div class="resume-sec-title">02 / SKILLS &amp; TECHNICAL CAPABILITIES</div>
        <div class="matrix-grid">${matrixHtml}</div>
      </div>

      <div class="resume-section">
        <div class="resume-sec-title">03 / EXPERIENCE</div>
        <div>${expHtml}</div>
      </div>

      <div class="resume-section">
        <div class="resume-sec-title">04 / PROJECTS</div>
        <div>${resumeProjHtml}</div>
      </div>

      <div class="resume-section">
        <div class="resume-sec-title">05 / EDUCATION</div>
        <div>${eduHtml}</div>
      </div>

      <div class="resume-section">
        <div class="resume-sec-title">06 / CERTIFICATIONS</div>
        <div>${certHtml}</div>
      </div>
    </div>
  `;

  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const printWin = window.open(PROFILE.resumePdfUrl, '_blank', 'noopener,noreferrer');
      if (!printWin) {
        window.print();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. GLITCH-FREE VIEW SWITCHING (Liquid Sliding Nav Pill + Instant Top Reset)
   -------------------------------------------------------------------------- */
function initViewNavigation() {
  const views = {
    stream: document.getElementById('view-stream'),
    gallery: document.getElementById('view-gallery'),
    resume: document.getElementById('view-resume'),
  };

  const navOrder = ['stream', 'gallery', 'resume'];
  const capsuleNav = document.querySelector('.capsule-nav');
  const navBtns = document.querySelectorAll('[data-view-btn]');
  const codeEl = document.getElementById('dynamic-step-code');
  const titleEl = document.getElementById('dynamic-step-title');
  const railEl = document.getElementById('vertical-step-rail');
  let currentView = 'stream';

  function switchView(target, shouldScrollTop = true) {
    if (target === 'gallery') ensureGalleryRendered();
    if (target === 'resume') ensureResumeRendered();

    const idx = Math.max(0, navOrder.indexOf(target));
    if (capsuleNav) {
      capsuleNav.style.setProperty('--nav-index', String(idx));
    }

    navBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.viewBtn === target);
    });

    if (railEl) {
      railEl.style.display = target === 'stream' ? '' : 'none';
    }

    if (target === 'gallery') {
      codeEl.textContent = '02 / GALLERY';
      titleEl.textContent = 'Visual Figure Archive';
    } else if (target === 'resume') {
      codeEl.textContent = '03 / RESUME';
      titleEl.textContent = 'Curriculum Vitae';
    } else {
      codeEl.textContent = '00 / OVERVIEW';
      titleEl.textContent = 'Portfolio Index';
    }

    if (currentView !== target) {
      currentView = target;
      Object.entries(views).forEach(([key, el]) => {
        if (!el) return;
        if (key === target) {
          el.hidden = false;
          el.classList.remove('active');
          requestAnimationFrame(() => {
            el.classList.add('active');
          });
        } else {
          el.hidden = true;
          el.classList.remove('active');
        }
      });
    }

    if (shouldScrollTop) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.viewBtn, true));
  });

  document.querySelectorAll('[data-open-view]').forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.openView, true));
  });

  const brandLink = document.querySelector('[data-view-target="stream"]');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('stream', true);
    });
  }

  const contactJumpBtn = document.getElementById('contact-jump-btn');
  if (contactJumpBtn) {
    contactJumpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const wasHidden = views.stream.hidden;
      switchView('stream', false);
      requestAnimationFrame(() => {
        document.getElementById('contact-cube')?.scrollIntoView({
          behavior: wasHidden ? 'instant' : 'smooth',
        });
      });
    });
  }
}

/* --------------------------------------------------------------------------
   7. 60/120FPS SCROLL SPY, SINGLE-SHOT REVEAL & rAF PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollSpyAndFluidReveals() {
  const codeEl = document.getElementById('dynamic-step-code');
  const titleEl = document.getElementById('dynamic-step-title');
  const progressBar = document.getElementById('scroll-progress-bar');
  const restartBtn = document.getElementById('restart-sequence-btn');
  const railNodes = document.querySelectorAll('[data-rail-target]');
  const bottomScrollCue = document.getElementById('bottom-scroll-indicator');
  const viewStreamEl = document.getElementById('view-stream');

  // 1. Single-shot GPU Scroll Reveal (Unobserves once visible for zero scroll overhead)
  const revealItems = document.querySelectorAll('.apple-reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -24px 0px',
        threshold: 0.01,
      }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  // 2. Active Section Telemetry & Right Rail Observer
  const trackedBlocks = document.querySelectorAll('[data-scroll-code]');
  let activeStepEl = null;

  if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const code = target.getAttribute('data-scroll-code');
            const title = target.getAttribute('data-scroll-title');
            const railId = target.getAttribute('data-rail-id');

            if (code && title && viewStreamEl && !viewStreamEl.hidden) {
              codeEl.textContent = code;
              titleEl.textContent = title;
            }

            if (railId) {
              railNodes.forEach((n) => {
                n.classList.toggle('active', n.getAttribute('data-rail-target') === railId);
              });
            }

            if (target.classList.contains('cube-step-slide')) {
              if (activeStepEl && activeStepEl !== target) {
                activeStepEl.classList.remove('active-step');
              }
              target.classList.add('active-step');
              activeStepEl = target;
            }
          }
        });
      },
      {
        rootMargin: '-18% 0px -58% 0px',
        threshold: 0.01,
      }
    );
    trackedBlocks.forEach((block) => spyObserver.observe(block));
  }

  // 3. requestAnimationFrame-Throttled Scroll Progress & Idle Indicator
  let idleTimer = null;
  let isTicking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
          if (progressBar) {
            progressBar.style.transform = `scaleX(${ratio})`;
          }
          isTicking = false;
        });
        isTicking = true;
      }

      if (bottomScrollCue) {
        if (!bottomScrollCue.classList.contains('is-scrolling')) {
          bottomScrollCue.classList.add('is-scrolling');
        }
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          bottomScrollCue.classList.remove('is-scrolling');
        }, 2800);
      }
    },
    { passive: true }
  );

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   8. FLUID LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('figure-lightbox');
  const canvas = document.getElementById('lightbox-canvas');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  if (!modal || !canvas || !captionEl || !closeBtn) return;

  function openLightbox(caption, htmlContent) {
    captionEl.textContent = caption || 'TECHNICAL FIGURE';
    canvas.innerHTML = htmlContent;
    const img = canvas.querySelector('img');
    if (img) {
      img.removeAttribute('loading');
      img.setAttribute('decoding', 'sync');
    }
    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
    });
  }

  function closeLightbox() {
    modal.classList.remove('is-open');
    setTimeout(() => {
      modal.hidden = true;
      canvas.innerHTML = '';
    }, 220);
  }

  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox-trigger]');
    if (trigger) {
      const caption = trigger.getAttribute('data-caption') || 'TECHNICAL FIGURE';
      const aspectBox =
        trigger.querySelector('.consistent-aspect-box') ||
        trigger.querySelector('.hero-blueprint-showcase') ||
        trigger;
      openLightbox(caption, aspectBox.innerHTML);
    }
  });

  closeBtn.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeLightbox();
    }
  });
}
