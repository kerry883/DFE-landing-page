<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>FAQ Section</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #d9dce5;
    background-image:
      radial-gradient(ellipse 90% 50% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 65%);
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 5rem 1.5rem 5rem;
  }

  .section {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ── Badge ── */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 18px;
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(255,255,255,0.95);
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    color: #3a4560;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    letter-spacing: 0.01em;
  }

  .badge svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }

  /* ── Heading ── */
  .heading {
    font-size: clamp(2.6rem, 7vw, 4.2rem);
    font-weight: 800;
    color: #1a2035;
    text-align: center;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 0.97rem;
    color: #5a6480;
    text-align: center;
    line-height: 1.6;
    letter-spacing: 0.01em;
    margin-bottom: 2.8rem;
    max-width: 520px;
  }

  /* ── FAQ list ── */
  .faq-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── FAQ item ── */
  .faq-item {
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(200,206,222,0.55),
      0 2px 4px rgba(0,0,0,0.04),
      0 6px 16px rgba(0,0,0,0.06),
      0 20px 40px rgba(0,0,0,0.06);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
  }

  .faq-item:hover {
    box-shadow:
      0 0 0 1px rgba(180,188,210,0.7),
      0 4px 8px rgba(0,0,0,0.06),
      0 12px 28px rgba(0,0,0,0.09),
      0 28px 52px rgba(0,0,0,0.08);
    transform: translateY(-1px);
  }

  .faq-item.open {
    box-shadow:
      0 0 0 1.5px rgba(99,102,241,0.25),
      0 4px 8px rgba(0,0,0,0.06),
      0 12px 28px rgba(0,0,0,0.09),
      0 28px 52px rgba(0,0,0,0.07);
  }

  /* ── Question row (the clickable button) ── */
  .faq-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 22px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    gap: 16px;
    font-family: inherit;
  }

  .faq-question {
    font-size: 15px;
    font-weight: 500;
    color: #1a2035;
    line-height: 1.4;
    flex: 1;
  }

  /* ── Chevron icon ── */
  .chevron-wrap {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #f2f4f8;
    border: 1px solid #e4e7ef;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, border-color 0.2s;
  }

  .faq-item.open .chevron-wrap {
    background: #eef0ff;
    border-color: #c8caee;
  }

  .chevron-icon {
    width: 16px;
    height: 16px;
    color: #6b7280;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
    flex-shrink: 0;
  }

  .faq-item.open .chevron-icon {
    transform: rotate(180deg);
    color: #6366f1;
  }

  /* ── Answer panel — smooth slide ── */
  .faq-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .faq-answer {
    padding: 0 22px 20px;
    font-size: 14.5px;
    color: #4a5570;
    line-height: 1.75;
    border-top: 1px solid #f0f2f7;
    padding-top: 16px;
  }
</style>
</head>
<body>

<div class="section">

  <!-- Badge -->
  <div class="badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="#3a7bd5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <circle cx="12" cy="17" r="0.5" fill="#3a7bd5"/>
    </svg>
    Your Queries, Simplified
  </div>

  <!-- Heading -->
  <h2 class="heading">Questions? Answers!</h2>
  <p class="subtitle">Find quick answers to the most common questions about our platform</p>

  <!-- FAQ accordion -->
  <div class="faq-list" id="faqList">

    <div class="faq-item">
      <button class="faq-trigger" onclick="toggle(this)">
        <span class="faq-question">Is there a free trial available?</span>
        <span class="chevron-wrap">
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div class="faq-body">
        <div class="faq-answer">
          Yes! We offer a fully-featured free trial so you can explore the platform before committing. No credit card is required — simply sign up and start managing your network within minutes.
        </div>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-trigger" onclick="toggle(this)">
        <span class="faq-question">Is there technical support available?</span>
        <span class="chevron-wrap">
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div class="faq-body">
        <div class="faq-answer">
          Absolutely. Our dedicated support team is available 24/7 via live chat, email, and WhatsApp. We also provide an extensive knowledge base and onboarding guides to help you get set up quickly.
        </div>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-trigger" onclick="toggle(this)">
        <span class="faq-question">Do you support multiple locations?</span>
        <span class="chevron-wrap">
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div class="faq-body">
        <div class="faq-answer">
          Yes — the platform is built to scale across multiple branches, hotspots, or service zones from a single dashboard. You can manage all your Mikrotiks, users, and billing from one central account regardless of how many locations you operate.
        </div>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-trigger" onclick="toggle(this)">
        <span class="faq-question">Can I customize Centipid to fit my brand?</span>
        <span class="chevron-wrap">
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div class="faq-body">
        <div class="faq-answer">
          Yes! You can white-label the platform with your own logo, brand colors, and custom domain. Your customers will experience a fully branded portal without any Centipid branding visible.
        </div>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-trigger" onclick="toggle(this)">
        <span class="faq-question">What payment gateways do you support?</span>
        <span class="chevron-wrap">
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div class="faq-body">
        <div class="faq-answer">
          We support multiple payment gateways including M-Pesa, Airtel Money, Stripe, PayPal, and several regional mobile money providers. You can enable and configure the ones relevant to your market directly from your dashboard.
        </div>
      </div>
    </div>

    <div class="faq-item">
      <button class="faq-trigger" onclick="toggle(this)">
        <span class="faq-question">How does the billing automation work?</span>
        <span class="chevron-wrap">
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div class="faq-body">
        <div class="faq-answer">
          Once a customer subscribes to a package, the system automatically generates invoices, sends payment reminders, collects payments, and activates or suspends their connection based on payment status — all without any manual intervention from your team.
        </div>
      </div>
    </div>

  </div>
</div>

<script>
  function toggle(trigger) {
    const item = trigger.closest('.faq-item');
    const body = item.querySelector('.faq-body');
    const isOpen = item.classList.contains('open');

    /* Close all others (accordion behaviour) */
    document.querySelectorAll('.faq-item.open').forEach(el => {
      if (el !== item) {
        el.classList.remove('open');
        el.querySelector('.faq-body').style.maxHeight = '0';
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      body.style.maxHeight = '0';
    } else {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  }
</script>

</body>
</html>