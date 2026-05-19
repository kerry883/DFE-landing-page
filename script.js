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
    { name: "Safaricom", color: "#1fa348" },
    { name: "Heineken", color: "#ff2b2b" },
    { name: "Coca-Cola", color: "#ed1c16" },
    { name: "Red Bull", color: "#001d5d" },
    { name: "MTV Base", color: "#000" },
    { name: "Trace Mziki", color: "#ff0000" },
    { name: "KBL", color: "#d4af37" }
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
    const hHalf = 50; // half hub width (hub is 100px wide)

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

    ${makeBeam(ml.x + 28,      hCy, hCx - hHalf,  hCy, 'beamLeft',  0)}
    ${makeBeam(hCx + hHalf,    hCy, mr.x - 28,    hCy, 'beamRight', 0.3)}
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
    pppoeLabel.textContent = 'for large festivals';
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

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      items.forEach(otherItem => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
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
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
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
