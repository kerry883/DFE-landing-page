/* ============================================================
   Header collapse on scroll
   Adds `.is-scrolled` to the site header once the user scrolls
   past `THRESHOLD` pixels, which triggers the CSS pill animation.
   ============================================================ */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const THRESHOLD = 24;
  let ticking = false;

  function update() {
    header.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    window.requestAnimationFrame(update);
    ticking = true;
  }

  window.addEventListener('scroll', () => {
    onScroll();
  }, { passive: true });
  // Run once in case the page is loaded already scrolled (e.g. anchor reload)
  update();
})();

/* ============================================================
   Scroll Progress Bar
   Scales the fixed top bar to match how far the page is scrolled.
   ============================================================ */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  let ticking = false;

  function update() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    window.requestAnimationFrame(update);
    ticking = true;
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* ============================================================
   Scroll Reveal
   Tags sections and cards with `.reveal`, then animates them in
   as they enter the viewport. Grid children get a small stagger.
   Classes are removed after the animation so hover transforms
   keep working as designed.
   ============================================================ */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Staggered groups — direct children animate one after another
  document.querySelectorAll(
    '.features-grid, .steps-grid, .lifecycle-grid, .channels-grid, .testimonials-grid, .pricing-grid, .stats-grid, .faq-list, .integrations-list'
  ).forEach(grid => {
    Array.from(grid.children).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.4).toFixed(2) + 's');
    });
  });

  // Standalone elements
  document.querySelectorAll(
    '.section-eyebrow, .section-title, .section-subtitle, .sp-heading, .faq-eyebrow, ' +
    '.pricing-toggle, .diagram, .testimonials-proof-bar, .cta-card, .microsite-preview, .channel-badge, ' +
    '.lifecycle-number, .lifecycle-phase, .lifecycle-title, ' +
    // Service sub-pages — absent from index.html, so this is a no-op there.
    // Only the section-head eyebrow: the hero one runs its own fadeUp.
    '.svc-section-head .svc-eyebrow, .svc-deep-copy, .svc-deep-visual, .svc-cta-band'
  ).forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
      io.unobserve(el);
      el.addEventListener('animationend', function onEnd(ev) {
        if (ev.target !== el || ev.animationName !== 'revealUp') return;
        el.classList.remove('reveal', 'is-visible');
        el.style.removeProperty('--reveal-delay');
        el.removeEventListener('animationend', onEnd);
      });
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ============================================================
   Stats Counter Animation
   ============================================================ */
(function () {
  const stats = document.querySelectorAll('.stat-value');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));

  function animateValue(obj) {
    const text = obj.innerText;
    const match = text.match(/(\d+\.?\d*)/);
    if (!match) return;
    
    const target = parseFloat(match[0]);
    const suffix = text.replace(match[0], '');
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = (ease * target).toFixed(target % 1 === 0 ? 0 : 1);
      
      obj.innerText = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }
})();

/* ============================================================
   Trusted By Marquee
   ============================================================ */
(function () {
  const track = document.getElementById('sp-track');
  if (!track) return;

  const logos = [
    { name: "Digitally Fit Awards", color: "#ff7f00" },
    { name: "Tuqio", color: "#1fa348" },
    { name: "Elimisha Network", color: "#4f46e5" },
    { name: "Acco", color: "#0ea5e9" },
    { name: "Mema Awards", color: "#d97706" },
    { name: "Change Africa Foundation", color: "#7c3aed" },
    { name: "Africa AI Future Awards", color: "#e11d48" }
  ];

  // Render twice for seamless loop
  const allLogos = [...logos, ...logos, ...logos];

  allLogos.forEach(logo => {
    const el = document.createElement('div');
    el.className = 'sp-logo';
    el.innerHTML = `<span>${logo.name}</span>`;
    track.appendChild(el);
  });
})();

/* ============================================================
   Integrations Diagram Connectors — animated beams (mirrors integrations.html)
   ============================================================ */
(function () {
  const diagram = document.getElementById('diagram');
  const svg = document.getElementById('connector-svg');
  if (!diagram || !svg) return;

  function drawConnectors() {
    const dRect = diagram.getBoundingClientRect();
    const dW = dRect.width;
    const dH = dRect.height;
    const hCx = dW / 2;
    const hCy = dH / 2;
    // Measure live so the beams stay attached when the hub and
    // icon cards shrink at mobile breakpoints
    const hubEl = diagram.querySelector('.hub');
    const hHalf = hubEl ? hubEl.getBoundingClientRect().width / 2 : 50;
    const cardEl = diagram.querySelector('.icon-card');
    const cardHalf = cardEl ? cardEl.getBoundingClientRect().width / 2 : 28;

    // Use getBoundingClientRect for pixel-perfect positions,
    // including cards placed with bottom/right or CSS transforms
    function cardCenter(sel) {
      const el = diagram.querySelector(sel);
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - dRect.left + r.width  / 2,
        y: r.top  - dRect.top  + r.height / 2
      };
    }

    const tl = cardCenter('.card-tl');
    const ml = cardCenter('.card-ml');
    const bl = cardCenter('.card-bl');
    const tr = cardCenter('.card-tr');
    const mr = cardCenter('.card-mr');
    const br = cardCenter('.card-br');

    svg.innerHTML = `
    <defs>
      <linearGradient id="beamLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#ff7f00" stop-opacity="0"/>
        <stop offset="50%"  stop-color="#ff7f00" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#ffa54f" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="beamRight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#ffa54f" stop-opacity="0.9"/>
        <stop offset="50%"  stop-color="#ff7f00" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#ff7f00" stop-opacity="0"/>
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    ${makePath(tl, { x: hCx - hHalf, y: hCy - 18 }, 'beamLeft',  'glow', 0)}
    ${makePath(ml, { x: hCx - hHalf, y: hCy       }, 'beamLeft',  'glow', 0.3)}
    ${makePath(bl, { x: hCx - hHalf, y: hCy + 18  }, 'beamLeft',  'glow', 0.6)}
    ${makePath({ x: hCx + hHalf, y: hCy - 18 }, tr, 'beamRight', 'glow', 0.15)}
    ${makePath({ x: hCx + hHalf, y: hCy       }, mr, 'beamRight', 'glow', 0.45)}
    ${makePath({ x: hCx + hHalf, y: hCy + 18  }, br, 'beamRight', 'glow', 0.75)}

    ${makeBeam(ml.x + cardHalf, hCy, hCx - hHalf,   hCy, 'beamLeft',  0)}
    ${makeBeam(hCx + hHalf,     hCy, mr.x - cardHalf, hCy, 'beamRight', 0.3)}
    `;
  }

  function makePath(from, to, grad, filterId, delay) {
    const mx = (from.x + to.x) / 2;
    const d = `M ${from.x} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`;
    return `
      <path d="${d}" fill="none" stroke="rgba(255,127,0,0.12)" stroke-width="1" opacity="0.7"/>
      <path d="${d}" fill="none" stroke="url(#${grad})" stroke-width="1.5" filter="url(#${filterId})" opacity="0">
        <animate attributeName="opacity"      values="0;0.9;0" dur="2.8s" begin="${delay}s" repeatCount="indefinite"/>
        <animate attributeName="stroke-width" values="1;2.5;1" dur="2.8s" begin="${delay}s" repeatCount="indefinite"/>
      </path>`;
  }

  function makeBeam(x1, y1, x2, y2, grad, delay) {
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,127,0,0.10)" stroke-width="1" opacity="0.6"/>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#${grad})" stroke-width="2.5" filter="url(#glow)" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2s" begin="${delay}s" repeatCount="indefinite"/>
      </line>`;
  }

  window.addEventListener('load', () => { setTimeout(drawConnectors, 150); });
  window.addEventListener('resize', drawConnectors);
})();

/* ============================================================
   Pricing Toggle
   ============================================================ */
(function () {
  const monthlyBtn = document.getElementById('monthly-btn');
  const annualBtn = document.getElementById('annual-btn');
  const hotspotPrice = document.getElementById('hotspot-price');
  const pppoePrice = document.getElementById('pppoe-price');
  const pppoeLabel = document.getElementById('pppoe-label');

  if (!monthlyBtn || !annualBtn) return;

  monthlyBtn.addEventListener('click', () => {
    monthlyBtn.classList.add('active');
    annualBtn.classList.remove('active');
    hotspotPrice.textContent = '3.5%';
    pppoePrice.textContent = 'Custom';
    pppoeLabel.textContent = 'for large-scale awards';
  });

  annualBtn.addEventListener('click', () => {
    annualBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
    hotspotPrice.textContent = '$299';
    pppoePrice.textContent = 'Contact';
    pppoeLabel.textContent = 'for annual subscriptions';
  });
})();

/* ============================================================
   FAQ Accordion
   ============================================================ */
(function () {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    // Guard: an item missing either part would otherwise throw here and
    // take every IIFE below this one with it — including the mobile menu.
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      items.forEach(otherItem => {
        otherItem.classList.remove('open');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ============================================================
   CTA Chart Animation (Dashboard Style)
   ============================================================ */
(function () {
  const chart = document.getElementById('barChart');
  if (!chart) return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  /* Heights in px — Jun is tallest/active, others vary naturally */
  const heights = [38, 52, 44, 36, 48, 78, 56, 42, 30, 22];
  const activeIndex = 5; /* Jun */

  months.forEach((m, i) => {
    const col = document.createElement('div');
    col.className = 'bar-col';

    const bar = document.createElement('div');
    bar.className = 'bar' + (i === activeIndex ? ' active' : '');
    bar.style.height = heights[i] + 'px';

    const label = document.createElement('span');
    label.className = 'bar-label';
    label.textContent = m;

    col.appendChild(bar);
    col.appendChild(label);
    chart.appendChild(col);
  });
})();
/* ============================================================
   Floating WhatsApp — close button dismiss
   ============================================================ */
(function () {
  const closeBtn = document.getElementById('wa-close');
  const tooltip  = document.getElementById('wa-tooltip');
  const widget   = document.getElementById('wa-float');
  if (!closeBtn || !tooltip || !widget) return;

  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    tooltip.classList.add('dismissed');
    // Prevent re-opening on hover after dismissal
    widget.dataset.dismissed = 'true';
  });

  // If user dismissed, block hover re-open via inline style override
  widget.addEventListener('mouseenter', function () {
    if (widget.dataset.dismissed === 'true') {
      tooltip.style.display = 'none';
    }
  });
})();

/* ============================================================
   Mobile Navigation Hamburger Menu
   ============================================================ */
(function () {
  const toggleBtn = document.getElementById('nav-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menuOverlay = document.getElementById('mobile-menu');
  // Sub-nav links close the drawer too. The Services group's own toggle
  // is a .mobile-nav-trigger, deliberately not matched here, so expanding
  // it does not dismiss the drawer.
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-subnav-link');
  const body = document.body;

  if (!toggleBtn || !menuOverlay) return;

  function openMenu() {
    menuOverlay.classList.add('is-active');
    body.classList.add('mobile-menu-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    menuOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    menuOverlay.classList.remove('is-active');
    body.classList.remove('mobile-menu-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    menuOverlay.setAttribute('aria-hidden', 'true');
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close menu when clicking backdrop overlay (clicking outside the inner panel)
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });

  // Close menu when clicking on any mobile navigation links
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

/* ============================================================
   Services Dropdown — desktop panel + mobile drawer group

   The desktop panel already opens on hover and :focus-within via
   CSS. This adds the click path (touch devices, and keyboard users
   who prefer Enter over tabbing through), plus Escape and
   outside-click dismissal.
   ============================================================ */
(function () {
  const toggle = document.getElementById('services-toggle');
  const item = toggle && toggle.closest('.nav-item-dropdown');
  if (!toggle || !item) return;

  function open() {
    item.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function close() {
    item.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (item.classList.contains('is-open')) {
      close();
    } else {
      open();
    }
  });

  document.addEventListener('click', (e) => {
    if (!item.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !item.classList.contains('is-open')) return;
    close();
    toggle.focus();
  });

  // Hovering out should also clear a click-opened panel, otherwise the
  // CSS hover state and the JS class disagree about what is showing.
  item.addEventListener('mouseleave', close);
})();

/* ============================================================
   Mobile drawer — Services group expand/collapse
   Uses the same max-height technique as the FAQ accordion.
   ============================================================ */
(function () {
  const trigger = document.getElementById('mobile-services-toggle');
  const panel = document.getElementById('mobile-services');
  if (!trigger || !panel) return;

  function expand() {
    panel.classList.add('is-open');
    panel.style.maxHeight = panel.scrollHeight + 'px';
    trigger.setAttribute('aria-expanded', 'true');
  }

  function collapse() {
    panel.classList.remove('is-open');
    panel.style.maxHeight = null;
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', () => {
    if (panel.classList.contains('is-open')) {
      collapse();
    } else {
      expand();
    }
  });

  // Service pages ship the group pre-expanded; give it a real height.
  // scrollHeight reads 0 while the drawer is display-collapsed, so
  // re-measure when the drawer actually opens.
  if (panel.classList.contains('is-open')) {
    expand();

    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        if (panel.classList.contains('is-open')) {
          // Next frame, once the drawer has been laid out
          requestAnimationFrame(() => {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          });
        }
      });
    }
  }
})();
