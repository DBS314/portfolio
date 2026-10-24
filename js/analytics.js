/**
 * PORTFOLIO ANALYTICS & 20-SECOND MOBILE NOTIFICATION ENGINE (`js/analytics.js`)
 * ============================================================================
 * - Tracks active visible viewing time (pauses when tab is backgrounded)
 * - Fires an instant mobile push notification via ntfy.sh when a visitor views
 *   the portfolio for > 20 seconds (or downloads the Resume PDF)
 * - Syncs visitor telemetry across devices using ntfy's JSON stream + localStorage
 * - Renders an interactive Analytics & Mobile Alert Dashboard Modal
 */

import { escapeHtml } from './visuals.js';

const DEFAULT_NTFY_TOPIC = 'dbs314-portfolio-alerts-8500';
const STORAGE_KEY_HISTORY = 'dbs_portfolio_analytics_v1';
const STORAGE_KEY_OWNER_MUTE = 'dbs_portfolio_owner_mute_v1';
const STORAGE_KEY_TOPIC = 'dbs_portfolio_ntfy_topic_v1';
const ENGAGEMENT_THRESHOLD_SEC = 20;

export function initPortfolioAnalytics() {
  const state = {
    sessionId: `ses_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    activeSeconds: 0,
    maxScrollPct: 0,
    viewedSections: new Set(['00 / Overview']),
    resumeDownloaded: false,
    notified20s: false,
    visitorGeo: null,
    deviceInfo: detectDeviceAndBrowser(),
    referrer: detectReferrer(),
    startedAt: new Date().toISOString(),
  };

  // Fetch non-blocking visitor geolocation (city, country, ISP/org)
  fetchVisitorGeo().then((geo) => {
    state.visitorGeo = geo;
  });

  // Track max scroll depth & sections viewed
  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
        if (pct > state.maxScrollPct) state.maxScrollPct = pct;
      }
      const codeEl = document.getElementById('dynamic-step-code');
      if (codeEl && codeEl.textContent) {
        state.viewedSections.add(codeEl.textContent.trim());
      }
    },
    { passive: true }
  );

  // Track view tab clicks (Projects / Gallery / Resume)
  document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('[data-view-btn], [data-open-view]');
    if (viewBtn) {
      const target = viewBtn.dataset.viewBtn || viewBtn.dataset.openView;
      if (target === 'gallery') state.viewedSections.add('02 / Gallery');
      if (target === 'resume') state.viewedSections.add('03 / Resume');
    }

    const downloadLink = e.target.closest('a[download], #print-resume-btn');
    if (downloadLink && !state.resumeDownloaded) {
      state.resumeDownloaded = true;
      state.viewedSections.add('03 / Resume PDF');
      sendMobileAlert(state, 'resume_download');
    }
  });

  // 1-second active engagement timer (only counts while tab is visible)
  const timerId = setInterval(() => {
    if (document.visibilityState !== 'visible') return;

    state.activeSeconds += 1;
    updateLiveTimerBadge(state.activeSeconds, state.notified20s);

    if (state.activeSeconds === ENGAGEMENT_THRESHOLD_SEC && !state.notified20s) {
      state.notified20s = true;
      updateLiveTimerBadge(state.activeSeconds, true);
      recordAndNotifyEngagedVisit(state);
    }
  }, 1000);

  // Bind Analytics Modal UI controls
  setupAnalyticsModal(state);

  // Open modal automatically if URL hash is #analytics
  if (window.location.hash === '#analytics') {
    openAnalyticsModal(state);
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#analytics') {
      openAnalyticsModal(state);
    }
  });

  return () => clearInterval(timerId);
}

function getTopic() {
  return localStorage.getItem(STORAGE_KEY_TOPIC) || DEFAULT_NTFY_TOPIC;
}

function isOwnerMuted() {
  return localStorage.getItem(STORAGE_KEY_OWNER_MUTE) === 'true';
}

function detectDeviceAndBrowser() {
  const ua = navigator.userAgent || '';
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  let os = 'Unknown OS';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  let browser = 'Browser';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';

  return {
    type: isMobile ? 'Mobile' : 'Desktop',
    os,
    browser,
    screen: `${window.screen.width}x${window.screen.height}`,
    label: `${isMobile ? 'Mobile' : 'Desktop'} · ${os} · ${browser}`,
  };
}

function detectReferrer() {
  const ref = document.referrer;
  if (!ref) return 'Direct / Resume Link';
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '');
    if (host.includes('linkedin')) return 'LinkedIn';
    if (host.includes('github')) return 'GitHub';
    if (host.includes('google')) return 'Google Search';
    return host;
  } catch {
    return 'Direct / External';
  }
}

async function fetchVisitorGeo() {
  try {
    const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
    if (!res.ok) throw new Error('Geo status error');
    const data = await res.json();
    if (data && data.success !== false && data.city) {
      return {
        city: data.city || 'Unknown City',
        region: data.region || '',
        country: data.country || 'Unknown Country',
        org: data.connection?.org || data.connection?.isp || '',
        label: `${data.city}, ${data.country}`,
      };
    }
  } catch {
    // Fallback if blocked by browser privacy extension
  }
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Global';
  return {
    city: tz.split('/').pop()?.replace(/_/g, ' ') || 'Visitor',
    region: '',
    country: tz.split('/')[0] || '',
    org: '',
    label: tz.replace(/_/g, ' '),
  };
}

function loadLocalHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEventToLocalHistory(evt) {
  const list = loadLocalHistory();
  const existsIdx = list.findIndex((x) => x.id === evt.id);
  if (existsIdx >= 0) {
    list[existsIdx] = evt;
  } else {
    list.unshift(evt);
  }
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(list.slice(0, 100)));
  } catch {
    // Ignore storage quota errors
  }
}

async function recordAndNotifyEngagedVisit(state) {
  const geoLabel = state.visitorGeo?.label || 'Visitor';
  const sectionsArr = Array.from(state.viewedSections);
  const eventRecord = {
    id: state.sessionId,
    ts: new Date().toISOString(),
    type: 'engaged_20s',
    location: geoLabel,
    org: state.visitorGeo?.org || '',
    device: state.deviceInfo.label,
    referrer: state.referrer,
    durationSec: state.activeSeconds,
    scrollPct: state.maxScrollPct,
    sections: sectionsArr,
    resumeDownloaded: state.resumeDownloaded,
  };

  saveEventToLocalHistory(eventRecord);

  if (!isOwnerMuted()) {
    await sendMobileAlert(state, 'engaged_20s', eventRecord);
  }
}

async function sendMobileAlert(state, triggerType = 'engaged_20s', customRecord = null) {
  const topic = getTopic();
  const geoLabel = state.visitorGeo?.label || 'Unknown Location';
  const orgInfo = state.visitorGeo?.org ? ` (${state.visitorGeo.org})` : '';
  const sectionsStr = Array.from(state.viewedSections).join(', ');

  const record = customRecord || {
    id: `${state.sessionId}_${triggerType}`,
    ts: new Date().toISOString(),
    type: triggerType,
    location: geoLabel,
    org: state.visitorGeo?.org || '',
    device: state.deviceInfo.label,
    referrer: state.referrer,
    durationSec: state.activeSeconds,
    scrollPct: state.maxScrollPct,
    sections: Array.from(state.viewedSections),
    resumeDownloaded: state.resumeDownloaded,
  };

  saveEventToLocalHistory(record);

  let title = `Portfolio Viewed >20s — ${geoLabel}`;
  let tags = 'eyes,briefcase';
  let priority = 'default';

  if (triggerType === 'resume_download') {
    title = `Resume Downloaded! — ${geoLabel}`;
    tags = 'page_facing_up,star';
    priority = 'high';
  } else if (triggerType === 'test_alert') {
    title = `Test Alert — Bala Srinivas Portfolio`;
    tags = 'white_check_mark,bell';
    priority = 'high';
  }

  const messageLines = [
    `📍 Location: ${geoLabel}${orgInfo}`,
    `💻 Device: ${state.deviceInfo.label} (${state.deviceInfo.screen})`,
    `🔗 Source: ${state.referrer}`,
    `⏱️ Active Time: ${state.activeSeconds}s | Scroll Depth: ${state.maxScrollPct}%`,
    `📂 Viewed: ${sectionsStr}`,
    `📊META:${JSON.stringify(record)}`,
  ];

  try {
    await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: 'POST',
      headers: {
        Title: title,
        Priority: priority,
        Tags: tags,
        Click: 'https://dbs314.github.io/portfolio/#analytics',
      },
      body: messageLines.join('\n'),
    });
    return true;
  } catch {
    return false;
  }
}

async function syncCloudEventsFromNtfy() {
  const topic = getTopic();
  try {
    const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}/json?poll=1&since=all`, {
      cache: 'no-store',
    });
    if (!res.ok) return loadLocalHistory();
    const text = await res.text();
    const lines = text.split('\n').filter((l) => l.trim().length > 0);

    lines.forEach((line) => {
      try {
        const msg = JSON.parse(line);
        if (msg.event === 'message' && typeof msg.message === 'string') {
          const metaIdx = msg.message.indexOf('📊META:');
          if (metaIdx !== -1) {
            const metaJson = msg.message.slice(metaIdx + '📊META:'.length).trim();
            const parsed = JSON.parse(metaJson);
            if (parsed && parsed.id) {
              saveEventToLocalHistory(parsed);
            }
          }
        }
      } catch {
        // Ignore non-JSON lines
      }
    });
  } catch {
    // Offline fallback uses local history
  }
  return loadLocalHistory();
}

function updateLiveTimerBadge(seconds, isNotified) {
  const badgeEl = document.getElementById('live-engagement-timer');
  if (!badgeEl) return;
  badgeEl.textContent = `${seconds}s`;
  if (isNotified) {
    badgeEl.classList.add('engaged-20s');
  }
}

function setupAnalyticsModal(state) {
  const modal = document.getElementById('analytics-modal');
  const closeBtn = document.getElementById('analytics-close-btn');
  const openBtns = document.querySelectorAll('[data-open-analytics]');
  const testBtn = document.getElementById('analytics-test-push-btn');
  const copyTopicBtn = document.getElementById('analytics-copy-topic-btn');
  const muteToggle = document.getElementById('analytics-owner-mute-toggle');
  const refreshBtn = document.getElementById('analytics-refresh-btn');

  if (!modal) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAnalyticsModal(state);
    });
  });

  function closeModal() {
    modal.classList.remove('is-open');
    if (window.location.hash === '#analytics') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setTimeout(() => {
      modal.hidden = true;
    }, 220);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (muteToggle) {
    muteToggle.checked = isOwnerMuted();
    muteToggle.addEventListener('change', () => {
      localStorage.setItem(STORAGE_KEY_OWNER_MUTE, muteToggle.checked ? 'true' : 'false');
    });
  }

  if (copyTopicBtn) {
    copyTopicBtn.addEventListener('click', () => {
      const topic = getTopic();
      navigator.clipboard?.writeText(topic);
      const orig = copyTopicBtn.textContent;
      copyTopicBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyTopicBtn.textContent = orig;
      }, 1800);
    });
  }

  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      const origText = testBtn.querySelector('span')?.textContent || 'Send Test Notification';
      const labelSpan = testBtn.querySelector('span');
      if (labelSpan) labelSpan.textContent = 'Sending to Mobile...';
      const ok = await sendMobileAlert(state, 'test_alert');
      if (labelSpan) {
        labelSpan.textContent = ok ? 'Sent! Check Your Phone ✓' : 'Network Error — Try Again';
      }
      await renderAnalyticsDashboardData(state);
      setTimeout(() => {
        if (labelSpan) labelSpan.textContent = origText;
      }, 2800);
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      renderAnalyticsDashboardData(state);
    });
  }
}

async function openAnalyticsModal(state) {
  const modal = document.getElementById('analytics-modal');
  if (!modal) return;

  const topicCodeEl = document.getElementById('analytics-topic-code');
  if (topicCodeEl) topicCodeEl.textContent = getTopic();

  modal.hidden = false;
  requestAnimationFrame(() => {
    modal.classList.add('is-open');
  });

  await renderAnalyticsDashboardData(state);
}

async function renderAnalyticsDashboardData(state) {
  const events = await syncCloudEventsFromNtfy();

  const engagedEvents = events.filter((e) => e.type === 'engaged_20s' || e.durationSec >= 20);
  const resumeEvents = events.filter((e) => e.type === 'resume_download' || e.resumeDownloaded);

  const totalEngaged = engagedEvents.length;
  const totalTracked = Math.max(events.length, 1);
  const avgDuration =
    events.length > 0
      ? Math.round(events.reduce((acc, e) => acc + (Number(e.durationSec) || 20), 0) / events.length)
      : state.activeSeconds;
  const avgScroll =
    events.length > 0
      ? Math.round(events.reduce((acc, e) => acc + (Number(e.scrollPct) || 0), 0) / events.length)
      : state.maxScrollPct;

  const kpiEngagedEl = document.getElementById('kpi-engaged-count');
  const kpiTotalEl = document.getElementById('kpi-total-sessions');
  const kpiAvgTimeEl = document.getElementById('kpi-avg-duration');
  const kpiResumeEl = document.getElementById('kpi-resume-downloads');

  if (kpiEngagedEl) kpiEngagedEl.textContent = String(totalEngaged);
  if (kpiTotalEl) kpiTotalEl.textContent = String(totalTracked);
  if (kpiAvgTimeEl) kpiAvgTimeEl.textContent = `${avgDuration}s (${avgScroll}% scroll)`;
  if (kpiResumeEl) kpiResumeEl.textContent = String(resumeEvents.length);

  // Project interest breakdown
  const counts = {
    prj01: 0,
    prj02: 0,
    prj03: 0,
    gallery: 0,
    resume: 0,
  };

  events.forEach((ev) => {
    const secs = Array.isArray(ev.sections) ? ev.sections.join(' ') : '';
    if (/PRJ 01|00 \/ Overview/i.test(secs)) counts.prj01 += 1;
    if (/PRJ 02/i.test(secs)) counts.prj02 += 1;
    if (/PRJ 03/i.test(secs)) counts.prj03 += 1;
    if (/Gallery/i.test(secs)) counts.gallery += 1;
    if (/Resume/i.test(secs) || ev.resumeDownloaded) counts.resume += 1;
  });

  const denom = Math.max(events.length, 1);
  const barsContainer = document.getElementById('analytics-project-bars');
  if (barsContainer) {
    const barItems = [
      { label: 'PRJ 01 · Hybrid PCM-EG EV Battery Thermal System', count: counts.prj01 },
      { label: 'PRJ 02 · 4-Slot 6U Backplane Qualification Chassis', count: counts.prj02 },
      { label: 'PRJ 03 · Mechanical Structure (IS 800 / IS 875)', count: counts.prj03 },
      { label: '03 · Official Engineering Resume & PDF', count: counts.resume },
      { label: '02 · Visual Figure Gallery', count: counts.gallery },
    ];

    barsContainer.innerHTML = barItems
      .map((b) => {
        const pct = Math.min(100, Math.round((b.count / denom) * 100));
        return `
          <div class="analytics-bar-row">
            <div class="analytics-bar-head">
              <span>${escapeHtml(b.label)}</span>
              <span class="mono-tag">${b.count} views (${pct}%)</span>
            </div>
            <div class="analytics-bar-track">
              <div class="analytics-bar-fill" style="width: ${Math.max(pct, 6)}%;"></div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // Recent visitor log table
  const tbody = document.getElementById('analytics-visitor-log-body');
  if (tbody) {
    if (events.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--ink-muted); padding: 1.2rem;">
            Current session active (${state.activeSeconds}s). Visitor logs appear here automatically once >20s threshold is reached.
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = events
        .slice(0, 25)
        .map((ev) => {
          const dateStr = formatShortTimestamp(ev.ts);
          const badge =
            ev.type === 'resume_download'
              ? '<span class="log-badge resume">RESUME PDF</span>'
              : ev.type === 'test_alert'
              ? '<span class="log-badge test">TEST ALERT</span>'
              : '<span class="log-badge engaged">&gt;20s ENGAGED</span>';

          const secs = Array.isArray(ev.sections) ? ev.sections.slice(0, 3).join(', ') : 'Overview';

          return `
            <tr>
              <td>${escapeHtml(dateStr)}</td>
              <td>${badge}</td>
              <td><strong>${escapeHtml(ev.location || 'Visitor')}</strong></td>
              <td>${escapeHtml(ev.device || 'Browser')}</td>
              <td>${escapeHtml(ev.referrer || 'Direct')}</td>
              <td>${escapeHtml(String(ev.durationSec || 20))}s · ${escapeHtml(String(ev.scrollPct || 0))}% (${escapeHtml(secs)})</td>
            </tr>
          `;
        })
        .join('');
    }
  }
}

function formatShortTimestamp(iso) {
  if (!iso) return 'Just now';
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Recent';
  }
}
