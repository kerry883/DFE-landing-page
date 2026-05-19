<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Pricing Section</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}

  body {
    background: #e2e4e9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.5rem;
  }

  .pricing-section {
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pricing-heading {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700;
    color: #111;
    text-align: center;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin-bottom: 0.75rem;
  }

  .pricing-sub {
    font-size: 1rem;
    color: #666;
    text-align: center;
    margin-bottom: 2rem;
  }

  /* ── Toggle ── */
  .toggle-wrap {
    display: flex;
    background: #fff;
    border: 1px solid #d8d8d8;
    border-radius: 12px;
    padding: 5px;
    gap: 4px;
    margin-bottom: 3rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }

  .toggle-btn {
    padding: 9px 28px;
    border-radius: 8px;
    border: none;
    background: transparent;
    font-size: 14px;
    font-weight: 500;
    color: #888;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    font-family: inherit;
  }

  .toggle-btn.active {
    background: #f0f0f0;
    color: #111;
  }

  /* ── Cards grid ── */
  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
  }

  @media (max-width: 640px) {
    .cards-grid { grid-template-columns: 1fr; }
  }

  /* ── Pricing card ── */
  .plan-card {
    background: #fff;
    border-radius: 20px;
    padding: 2rem 2rem 2.2rem;
    border: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    gap: 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .plan-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 36px rgba(0,0,0,0.1);
  }

  /* ── Card header ── */
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.4rem;
  }

  .plan-name {
    font-size: 1rem;
    font-weight: 600;
    color: #111;
  }

  .popular-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
    background: #1a7a1a;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
  }

  .popular-badge .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #6ee86e;
    flex-shrink: 0;
  }

  /* ── Pricing display ── */
  .price-display {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 1.4rem;
  }

  .price-main {
    font-size: 2.4rem;
    font-weight: 800;
    color: #111;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .price-main sup {
    font-size: 1.2rem;
    font-weight: 700;
    vertical-align: super;
    margin-right: 1px;
  }

  .price-label {
    font-size: 0.9rem;
    color: #888;
    font-weight: 400;
  }

  /* ── CTA buttons ── */
  .cta-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 13px 20px;
    border-radius: 10px;
    border: none;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: opacity 0.15s, transform 0.12s;
    margin-bottom: 1.6rem;
  }

  .cta-btn:active { transform: scale(0.98); }

  .cta-green {
    background: #1db31d;
    color: #fff;
  }

  .cta-green:hover { background: #18a018; }

  .cta-grey {
    background: #ececec;
    color: #333;
    border: 1px solid #ddd;
  }

  .cta-grey:hover { background: #e4e4e4; }

  .cta-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  /* ── Divider ── */
  .divider-dashed {
    border: none;
    border-top: 1.5px dashed #ddd;
    margin-bottom: 1.4rem;
  }

  /* ── Features ── */
  .features-label {
    font-size: 13px;
    font-weight: 600;
    color: #444;
    margin-bottom: 1rem;
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  .feature-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #333;
  }

  .check-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #888;
  }

  .check-icon.green { color: #1db31d; }
</style>
</head>
<body>

<div class="pricing-section">

  <h1 class="pricing-heading">Flexible Plans for All</h1>
  <p class="pricing-sub">Our plan enables us to grow with you — we only succeed when you do</p>

  <div class="toggle-wrap">
    <button class="toggle-btn active" id="btn-monthly" onclick="setToggle('monthly')">Monthly</button>
    <button class="toggle-btn" id="btn-annual" onclick="setToggle('annual')">Annual <span style="font-size:11px;color:#1db31d;font-weight:700;">–20%</span></button>
  </div>

  <div class="cards-grid">

    <!-- Hotspot Plan -->
    <div class="plan-card">
      <div class="card-header">
        <span class="plan-name">Hotspot Plan</span>
        <span class="popular-badge">
          <span class="dot"></span>
          Popular
        </span>
      </div>

      <div class="price-display">
        <span class="price-main" id="price-hotspot">3%</span>
        <span class="price-label" id="label-hotspot">of Hotspot Revenue</span>
      </div>

      <button class="cta-btn cta-green">
        <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
        Get Started – Free
      </button>

      <hr class="divider-dashed"/>

      <p class="features-label">Whats included : -</p>
      <div class="feature-list">
        <div class="feature-row">
          <svg class="check-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Unlimited Mikrotiks
        </div>
        <div class="feature-row">
          <svg class="check-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          No user limit
        </div>
        <div class="feature-row">
          <svg class="check-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Remote Winbox management
        </div>
        <div class="feature-row">
          <svg class="check-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Multiple payment gateways
        </div>
        <div class="feature-row">
          <svg class="check-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Multiple SMS gateways
        </div>
        <div class="feature-row">
          <svg class="check-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Automated invoicing
        </div>
      </div>
    </div>

    <!-- PPPoE Plan -->
    <div class="plan-card">
      <div class="card-header">
        <span class="plan-name">PPPoE Plan</span>
      </div>

      <div class="price-display">
        <span class="price-main" id="price-pppoe"><sup>$</sup>0.25</span>
        <span class="price-label" id="label-pppoe">user/month</span>
      </div>

      <button class="cta-btn cta-grey">
        <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
        Get Started – Free
      </button>

      <hr class="divider-dashed"/>

      <p class="features-label">Whats included : -</p>
      <div class="feature-list">
        <div class="feature-row">
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Unlimited Mikrotiks
        </div>
        <div class="feature-row">
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Unlimited users
        </div>
        <div class="feature-row">
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          No revenue limit
        </div>
        <div class="feature-row">
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Automated invoicing
        </div>
        <div class="feature-row">
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Automated payments
        </div>
        <div class="feature-row">
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Remote Winbox management
        </div>
      </div>
    </div>

  </div>
</div>

<script>
  const prices = {
    monthly: {
      hotspot: { price: '3%',   label: 'of Hotspot Revenue' },
      pppoe:   { price: '$0.25', label: 'user/month' }
    },
    annual: {
      hotspot: { price: '3%',   label: 'of Hotspot Revenue' },
      pppoe:   { price: '$0.20', label: 'user/month (billed annually)' }
    }
  };

  function setToggle(mode) {
    document.getElementById('btn-monthly').classList.toggle('active', mode === 'monthly');
    document.getElementById('btn-annual').classList.toggle('active', mode === 'annual');

    const p = prices[mode];

    const hotspotEl = document.getElementById('price-hotspot');
    hotspotEl.innerHTML = p.hotspot.price;
    document.getElementById('label-hotspot').textContent = p.hotspot.label;

    const pppoeEl = document.getElementById('price-pppoe');
    if (p.pppoe.price.startsWith('$')) {
      pppoeEl.innerHTML = '<sup>$</sup>' + p.pppoe.price.slice(1);
    } else {
      pppoeEl.textContent = p.pppoe.price;
    }
    document.getElementById('label-pppoe').textContent = p.pppoe.label;
  }
</script>

</body>
</html>