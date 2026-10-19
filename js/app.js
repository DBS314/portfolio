/**
 * MAIN PORTFOLIO CONTROLLER (`js/app.js`)
 * ============================================================================
 * - Zero ghost scrolling & zero horizontal mobile overflow
 * - Crisp SVG iconography & disciplined visual alignment across Web & Mobile
 * - Distinct color palettes & subtle atmospheric gradients per Project Cube
 */

import { PROJECTS } from '../projects/index.js';
import { PROFILE } from '../projects/profile.js';
import { renderStepMediaGallery, renderTechnicalVisual } from './visuals.js';

const SVG_ARROW_RIGHT = `<svg class="btn-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
const SVG_ARROW_DOWN = `<svg class="btn-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`;
const SVG_ARROW_UP_RIGHT = `<svg class="btn-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
const SVG_TOOL = `<svg class="tool-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  initHeroAndProfile();
  renderVerticalStepRail();
  renderProjectCubes();
  renderGalleryView();
  renderResumeView();
  initViewNavigation();
  initScrollSpyAndAppleAnimations();
  initLightbox();
});

function formatPresentationBullet(text) {
  const colonIdx = text.indexOf(':');
  if (colonIdx > 0 && colonIdx < 62) {
    const lead = text.slice(0, colonIdx);
    const rest = text.slice(colonIdx + 1);
    return `<strong class="bullet-lead">${lead}:</strong>${rest}`;
  }
  return text;
}

/* --------------------------------------------------------------------------
   1. HERO & PROFILE INITIALIZATION
   -------------------------------------------------------------------------- */
function initHeroAndProfile() {
  const heroAvailEl = document.getElementById('hero-availability');
  if (heroAvailEl && PROFILE.availability) {
    heroAvailEl.textContent = PROFILE.availability;
  }
  document.getElementById('hero-tagline').textContent = PROFILE.tagline;
  document.getElementById('project-count-badge').textContent =
    `${String(PROJECTS.length).padStart(2, '0')} PROJECTS`;

  const heroPreview = document.getElementById('hero-blueprint-preview');
  if (heroPreview && PROJECTS.length > 0) {
    const p0 = PROJECTS[0];
    const heroFig = p0.steps[3]?.images?.[0] || p0.steps[0]?.images?.[0] || p0.steps[0];
    heroPreview.innerHTML = renderTechnicalVisual(heroFig, p0.number, 1);
  }

  // Populate Evenly Proportioned Project Overview Strip
  const ledgerEl = document.getElementById('hero-project-ledger');
  ledgerEl.innerHTML = PROJECTS.map(
    (proj) => `
      <a href="#cube-${proj.id}" class="ledger-card-link">
        <div class="ledger-card-top">
          <span class="ledger-pill-num">PROJECT ${proj.number}</span>
          <span class="ledger-card-arrow">${SVG_ARROW_RIGHT}</span>
        </div>
        <div class="ledger-card-title">${proj.title}</div>
        <div class="ledger-card-cat">${proj.category}</div>
      </a>
    `
  ).join('');

  const servicesEl = document.getElementById('services-mini-list');
  servicesEl.innerHTML = PROFILE.servicesForClients
    .map((s) => `<div class="service-mini-item"><strong>${s.code}</strong><span>${s.title}</span></div>`)
    .join('');

  const linksEl = document.getElementById('contact-links-box');
  linksEl.innerHTML = `
    <a class="contact-link-row" href="mailto:${PROFILE.email}">
      <div class="contact-row-meta">
        <span class="contact-row-label">EMAIL</span>
        <span class="contact-row-val">${PROFILE.email}</span>
      </div>
      ${SVG_ARROW_UP_RIGHT}
    </a>
    <a class="contact-link-row" href="${PROFILE.linkedin}" target="_blank" rel="noopener">
      <div class="contact-row-meta">
        <span class="contact-row-label">LINKEDIN</span>
        <span class="contact-row-val">${PROFILE.linkedinDisplay}</span>
      </div>
      ${SVG_ARROW_UP_RIGHT}
    </a>
    <a class="contact-link-row" href="tel:${PROFILE.phone.replace(/\s+/g, '')}">
      <div class="contact-row-meta">
        <span class="contact-row-label">PHONE (INDIA)</span>
        <span class="contact-row-val">${PROFILE.phoneDisplay}</span>
      </div>
      ${SVG_ARROW_RIGHT}
    </a>
  `;
}

/* --------------------------------------------------------------------------
   2. RIGHT-HAND VERTICAL TIMELINE RAIL
   -------------------------------------------------------------------------- */
function renderVerticalStepRail() {
  const rail = document.getElementById('vertical-step-rail');
  const nodes = [
    { id: 'top', label: '00', title: 'Overview' },
    ...PROJECTS.map((p) => ({ id: `cube-${p.id}`, label: p.number, title: p.title })),
    { id: 'contact-cube', label: 'END', title: 'Contact' },
  ];

  rail.innerHTML = nodes
    .map(
      (n, idx) => `
      <a href="#${n.id}" class="rail-node ${idx === 0 ? 'active' : ''}" data-rail-target="${n.id}" title="${n.title}">
        ${n.label}
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

  container.innerHTML = PROJECTS.map((proj, pIndex) => {
    const themeClass = `cube-theme-${pIndex % 5}`;
    const nextProj = PROJECTS[pIndex + 1];
    const nextHref = nextProj ? `#cube-${nextProj.id}` : '#contact-cube';
    const nextLabel = nextProj ? `Next: Project ${nextProj.number}` : 'Contact & Resume';

    const hasMetrics = Array.isArray(proj.metrics) && proj.metrics.length > 0;
    const metricsHtml = hasMetrics
      ? `
      <div class="cube-metrics-strip">
        ${proj.metrics
          .map(
            (m) => `
          <div class="metric-cell">
            <span class="metric-label">${m.label}</span>
            <span class="metric-value">${m.value}</span>
          </div>`
          )
          .join('')}
      </div>`
      : '';

    const toolsHtml = (proj.tools || [])
      .map((t) => `<span class="tool-pill">${SVG_TOOL}<span>${t}</span></span>`)
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
        <div class="cube-problem-block ${!hasConstraints ? 'single-col' : ''}">
          <div class="problem-left">
            <div>
              <span class="mono-tag">PROBLEM STATEMENT &amp; METHODOLOGY</span>
              <h3>${proj.problemStatement.heading}</h3>
              <p class="problem-summary">${proj.problemStatement.summary}</p>
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
      <div class="cube-step-jumper" aria-label="Presentation Slides">
        <span class="jumper-label">SLIDE DECK INDEX (${proj.steps.length} SLIDES) — SELECT TO JUMP</span>
        <div class="jumper-pills">
          ${proj.steps
            .map(
              (st, sIdx) => `
            <a href="#step-${proj.id}-${sIdx}" class="phase-jump-pill">
              <span class="jump-num">0${sIdx + 1}</span>
              <span class="jump-text">${st.title}</span>
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
          .map((sp) => `<span class="spec-badge">${sp}</span>`)
          .join('');

        const bulletItems =
          Array.isArray(step.keyPoints) && step.keyPoints.length > 0
            ? step.keyPoints
            : step.description
                .split(/(?<=\.)\s+/)
                .filter((s) => s.trim().length > 0);

        const leadSubheading =
          Array.isArray(step.keyPoints) && step.keyPoints.length > 0 && step.description
            ? `<p class="pres-slide-subtitle">${step.description}</p>`
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
                  <tr>${step.table.headers.map((h) => `<th>${h}</th>`).join('')}</tr>
                </thead>
                <tbody>
                  ${step.table.rows
                    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
                    .join('')}
                </tbody>
              </table>
            </div>
          </div>`
            : '';

        const mediaGalleryHtml = renderStepMediaGallery(step, proj.number, sIdx);

        return `
        <article class="cube-step-slide presentation-slide apple-reveal"
                 id="step-${proj.id}-${sIdx}"
                 data-scroll-code="PRJ ${proj.number} · ${step.stepCode}"
                 data-scroll-title="${proj.title} — ${step.title}"
                 data-rail-id="cube-${proj.id}">

          <div class="pres-slide-top">
            <div class="pres-slide-title-row">
              <div class="pres-title-col">
                <span class="pres-step-pill">${step.stepCode}</span>
                <h4 class="pres-slide-title">${step.title}</h4>
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
      <section class="project-cube ${themeClass} apple-reveal" id="cube-${proj.id}"
               data-scroll-code="PRJ ${proj.number} / 0${PROJECTS.length}"
               data-scroll-title="${proj.title}"
               data-rail-id="cube-${proj.id}">
        <div class="cube-header">
          <div class="cube-id-group">
            <span class="cube-number-pill">PROJECT ${proj.number}</span>
            <div class="cube-title-wrap">
              <h2 class="cube-title">${proj.title}</h2>
              <p class="cube-subtitle">${proj.subtitle}</p>
            </div>
          </div>
          <div class="cube-meta-right">
            <span class="cube-badge">${proj.category}</span>
            <span class="cube-badge">${proj.year}</span>
          </div>
        </div>

        ${metricsHtml}
        ${problemBlockHtml}
        ${stepJumpNav}

        <div class="cube-steps-stream">
          ${stepsHtml}
        </div>

        <div class="cube-outcome-bar">
          <div class="outcome-text">
            <span class="outcome-label">KEY DELIVERABLE &amp; OUTCOME</span>
            <p>${proj.outcome}</p>
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
   4. RIBBON-FREE IMAGE GALLERY
   -------------------------------------------------------------------------- */
function renderGalleryView() {
  const galleryGrid = document.getElementById('gallery-grid');
  const items = [];

  PROJECTS.forEach((proj) => {
    proj.steps.forEach((step, sIdx) => {
      const figList =
        Array.isArray(step.images) && step.images.length > 0
          ? step.images
          : [
              {
                src: step.image,
                visualType: step.visualType,
                useCustomImage: step.useCustomImage,
                caption: step.caption,
              },
            ];

      figList.forEach((fig, fIdx) => {
        items.push({
          projNumber: proj.number,
          projTitle: proj.title,
          caption: fig.caption,
          visualHtml: renderTechnicalVisual(fig, proj.number, sIdx * 10 + fIdx),
        });
      });
    });
  });

  galleryGrid.innerHTML = items
    .map(
      (item) => `
      <figure class="gallery-card" data-lightbox-trigger data-caption="${item.caption}">
        <div class="consistent-aspect-box">
          ${item.visualHtml}
        </div>
        <figcaption class="gallery-caption">
          <span>${item.caption}</span>
          <span class="gallery-caption-project">PRJ-${item.projNumber}</span>
        </figcaption>
      </figure>
    `
    )
    .join('');
}

/* --------------------------------------------------------------------------
   5. OFFICIAL ENGINEERING RESUME VIEW (Displays Exact Uploaded Resume + Print)
   -------------------------------------------------------------------------- */
function renderResumeView() {
  const container = document.getElementById('resume-sheet-content');

  const matrixHtml = PROFILE.softwareMatrix
    .map(
      (group) => `
      <div class="matrix-box">
        <h4>${group.domain}</h4>
        <div class="tools-row">
          ${group.items.map((item) => `<span class="tool-pill"><span>${item}</span></span>`).join('')}
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
          <span>${exp.company} — ${exp.location}</span>
          <span class="exp-period">${exp.totalDuration}</span>
        </div>
        <div class="exp-roles-stack">
          ${exp.roles
            .map(
              (r) => `
            <div class="exp-role-row">
              <span>${r.title}</span>
              <span class="exp-role-date">${r.period}</span>
            </div>
          `
            )
            .join('')}
        </div>
        <ul class="exp-highlights">
          ${exp.highlights.map((h) => `<li>${h}</li>`).join('')}
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
          <span>${rp.title}</span>
          <span class="exp-period">${rp.period}</span>
        </div>
        <p class="exp-desc-p">${rp.description}</p>
      </div>
    `
    )
    .join('');

  const eduHtml = PROFILE.education
    .map(
      (ed) => `
      <div class="exp-item">
        <div class="exp-head">
          <span>${ed.degree} — <strong style="color: var(--accent-amber);">${ed.score}</strong></span>
          <span class="exp-period">${ed.period}</span>
        </div>
        <p class="exp-desc-p">${ed.institution}</p>
      </div>
    `
    )
    .join('');

  const certHtml = PROFILE.certifications
    .map(
      (c) => `
      <div class="exp-item cert-item">
        <div class="exp-head" style="margin-bottom: 0;">
          <span>${c.title}</span>
          <span class="exp-period">${c.period}</span>
        </div>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <!-- Quick Clickable Contact & Action Bar -->
    <div class="resume-top">
      <div>
        <h3 class="resume-name">${PROFILE.name}</h3>
        <p class="resume-role">${PROFILE.role}</p>
      </div>
      <div class="resume-contact-meta">
        <div><a href="mailto:${PROFILE.email}">${PROFILE.email} ↗</a></div>
        <div><a href="tel:${PROFILE.phone.replace(/\s+/g, '')}">${PROFILE.phoneDisplay}</a></div>
        <div><a href="${PROFILE.linkedin}" target="_blank" rel="noopener">${PROFILE.linkedinDisplay} ↗</a></div>
        <div>${PROFILE.location}</div>
      </div>
    </div>

    <!-- Exact Uploaded Official Resume Sheet (Full-Page A4 View & Print Target) -->
    <div class="official-resume-paper-wrap">
      <div class="official-resume-paper-bar no-print">
        <span class="mono-tag">OFFICIAL UPLOADED RESUME DOCUMENT (A4)</span>
        <a href="${PROFILE.resumePdfUrl}" target="_blank" rel="noopener" class="mono-tag link-tag">
          OPEN ORIGINAL PDF IN NEW TAB ↗
        </a>
      </div>
      <div class="official-resume-paper" data-lightbox-trigger data-caption="Dasari Bala Srinivas — Official Engineering Resume">
        <div class="consistent-aspect-box" style="aspect-ratio: auto; background: #ffffff; padding: 0;">
          <img src="${PROFILE.resumeImageUrl}" alt="Dasari Bala Srinivas — Official Resume" class="official-resume-img" />
        </div>
      </div>
    </div>

    <!-- Interactive Structured Breakdown (100% Synced with Resume) -->
    <div class="resume-structured-breakdown no-print">
      <div class="resume-section">
        <div class="resume-sec-title">01 / SUMMARY</div>
        <p class="exp-desc-p">${PROFILE.summary}</p>
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

  document.getElementById('print-resume-btn').addEventListener('click', () => {
    const printWin = window.open(PROFILE.resumePdfUrl, '_blank');
    if (!printWin) {
      window.print();
    }
  });
}

/* --------------------------------------------------------------------------
   6. VIEW SWITCHING (Clean, Instant — No Ghost Scroll Hijacking)
   -------------------------------------------------------------------------- */
function initViewNavigation() {
  const views = {
    stream: document.getElementById('view-stream'),
    gallery: document.getElementById('view-gallery'),
    resume: document.getElementById('view-resume'),
  };

  const navBtns = document.querySelectorAll('[data-view-btn]');
  const codeEl = document.getElementById('dynamic-step-code');
  const titleEl = document.getElementById('dynamic-step-title');
  const railEl = document.getElementById('vertical-step-rail');

  function switchView(target, shouldScrollTop = true) {
    Object.entries(views).forEach(([key, el]) => {
      if (key === target) {
        el.hidden = false;
        el.classList.add('active');
      } else {
        el.hidden = true;
        el.classList.remove('active');
      }
    });

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

  document.querySelector('[data-view-target="stream"]').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('stream', true);
  });

  const contactJumpBtn = document.getElementById('contact-jump-btn');
  if (contactJumpBtn) {
    contactJumpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('stream', false);
      document.getElementById('contact-cube')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   7. SCROLL SPY, APPLE SPRING REVEAL & IDLE SCROLL INDICATOR
   -------------------------------------------------------------------------- */
function initScrollSpyAndAppleAnimations() {
  const codeEl = document.getElementById('dynamic-step-code');
  const titleEl = document.getElementById('dynamic-step-title');
  const progressBar = document.getElementById('scroll-progress-bar');
  const restartBtn = document.getElementById('restart-sequence-btn');
  const railNodes = document.querySelectorAll('[data-rail-target]');
  const bottomScrollCue = document.getElementById('bottom-scroll-indicator');

  const revealItems = document.querySelectorAll('.apple-reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    {
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.04,
    }
  );
  revealItems.forEach((el) => revealObserver.observe(el));

  const trackedBlocks = document.querySelectorAll('[data-scroll-code]');
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const code = entry.target.getAttribute('data-scroll-code');
          const title = entry.target.getAttribute('data-scroll-title');
          const railId = entry.target.getAttribute('data-rail-id');

          if (code && title && !document.getElementById('view-stream').hidden) {
            codeEl.textContent = code;
            titleEl.textContent = title;
          }

          if (railId) {
            railNodes.forEach((n) => {
              n.classList.toggle('active', n.getAttribute('data-rail-target') === railId);
            });
          }

          if (entry.target.classList.contains('cube-step-slide')) {
            document
              .querySelectorAll('.cube-step-slide')
              .forEach((el) => el.classList.remove('active-step'));
            entry.target.classList.add('active-step');
          }
        }
      });
    },
    {
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0.05,
    }
  );
  trackedBlocks.forEach((block) => spyObserver.observe(block));

  let idleTimer = null;
  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      progressBar.style.width = `${pct}%`;

      if (bottomScrollCue) {
        bottomScrollCue.classList.add('is-scrolling');
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          bottomScrollCue.classList.remove('is-scrolling');
        }, 3000);
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
   8. FIGURE LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('figure-lightbox');
  const canvas = document.getElementById('lightbox-canvas');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');

  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox-trigger]');
    if (trigger) {
      captionEl.textContent = trigger.getAttribute('data-caption') || 'TECHNICAL FIGURE';
      const aspectBox =
        trigger.querySelector('.consistent-aspect-box') ||
        trigger.querySelector('.hero-blueprint-showcase') ||
        trigger;
      canvas.innerHTML = aspectBox.innerHTML;
      modal.hidden = false;
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.hidden = true;
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.hidden = true;
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      modal.hidden = true;
    }
  });
}
