





<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Social Proof Section</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    /* ── Section wrapper ── */
    .sp-section {
      padding: 3.5rem 0 3rem;
      background: #ffffff;
      text-align: center;
      overflow: hidden;
    }

    /* ── Heading ── */
    .sp-heading {
      font-size: 1.35rem;
      line-height: 1.55;
      margin-bottom: 2.2rem;
      color: #888;
      font-weight: 400;
    }
    .sp-heading strong {
      display: block;
      color: #111;
      font-weight: 700;
      font-size: 1.4rem;
    }

    /* ── Marquee track wrapper (handles gradient edges) ── */
    .sp-track-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    /* Left fade */
    .sp-track-wrap::before {
      content: '';
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 140px;
      background: linear-gradient(to right, #ffffff 20%, transparent 100%);
      z-index: 2;
      pointer-events: none;
    }

    /* Right fade */
    .sp-track-wrap::after {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: 140px;
      background: linear-gradient(to left, #ffffff 20%, transparent 100%);
      z-index: 2;
      pointer-events: none;
    }

    /* ── Scrolling track ── */
    .sp-track {
      display: flex;
      align-items: center;
      gap: 3.5rem;
      width: max-content;
      padding: 0.5rem 0;
      animation: marquee 30s linear infinite;
    }

    /* Pause on hover (optional — remove if you don't want this) */
    .sp-track:hover {
      animation-play-state: paused;
    }

    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ── Individual logo pill ── */
    .sp-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0.45;
      font-size: 15px;
      font-weight: 700;
      color: #111;
      white-space: nowrap;
      letter-spacing: -0.02em;
      transition: opacity 0.25s ease;
      user-select: none;
    }

    .sp-logo:hover {
      opacity: 1;
    }

    .sp-logo svg {
      flex-shrink: 0;
    }
  </style>
</head>
<body>

<section class="sp-section">

  <p class="sp-heading">
    Trusted by experts.
    <strong>Used by the leaders.</strong>
  </p>

  <div class="sp-track-wrap">
    <!-- JS will populate and double the logos here -->
    <div class="sp-track" id="sp-track"></div>
  </div>

</section>

<script>
  /*
   * Logo data — add/remove logos here.
   * Each entry: { name: string, svg: string }
   * SVGs are kept minimal/inline. Replace with your actual brand SVGs.
   */
  const logos = [
    {
      name: "NVIDIA",
      svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8.5 5C6 5 4 7 4 9.5V12h2V9.5C6 8.1 7.1 7 8.5 7H12V5H8.5Z" fill="#76b900"/>
        <path d="M12 5v2h3.5C16.9 7 18 8.1 18 9.5V12h2V9.5C20 7 18 5 15.5 5H12Z" fill="#76b900"/>
        <path d="M4 12v2.5C4 17 6 19 8.5 19H12v-2H8.5C7.1 17 6 15.9 6 14.5V12H4Z" fill="#76b900"/>
        <path d="M18 12v2.5c0 1.4-1.1 2.5-2.5 2.5H12v2h3.5C18 19 20 17 20 14.5V12h-2Z" fill="#76b900"/>
      </svg>`
    },
    {
      name: "Supabase",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.33 12.56.63 13.34 1.29 13.34h9.893l.107 9.618c.015.986 1.26 1.41 1.874.637l9.262-11.65c.434-.51.134-1.29-.526-1.29h-9.893L11.9 1.036z" fill="#3ecf8e"/>
      </svg>`
    },
    {
      name: "OpenAI",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
        <path d="M22.28 9.27a5.77 5.77 0 0 0-.5-4.74 5.84 5.84 0 0 0-6.29-2.8A5.84 5.84 0 0 0 11.1.82a5.83 5.83 0 0 0-5.57 4.04 5.83 5.83 0 0 0-3.9 2.83 5.84 5.84 0 0 0 .72 6.86 5.77 5.77 0 0 0 .5 4.74 5.84 5.84 0 0 0 6.29 2.8A5.83 5.83 0 0 0 12.9 23.2a5.84 5.84 0 0 0 5.57-4.04 5.83 5.83 0 0 0 3.9-2.83 5.84 5.84 0 0 0-.72-6.86z"/>
      </svg>`
    },
    {
      name: "TURSO",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#4ff8d2" opacity="0.25"/>
        <path d="M7 8h10M7 12h10M7 16h6" stroke="#4ff8d2" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: "Vercel",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
        <path d="M12 2L2 19.5h20L12 2z"/>
      </svg>`
    },
    {
      name: "Cloudflare",
      svg: `<svg width="22" height="16" viewBox="0 0 52 28" fill="none">
        <path d="M34.5 20.5l1.5-5c.2-.6-.3-1.2-1-1.2H12c-.5 0-.9.4-1 .8l-1.5 5c-.2.6.3 1.2 1 1.2h22.9c.5 0 1-.4 1.1-.8z" fill="#f6821f"/>
        <path d="M36.5 13.5l1-3.3c.2-.4-.1-.8-.5-.9h-.4l-1.4.4C34.5 6.3 31.5 4 28 4c-2.3 0-4.4 1-5.8 2.7-.7-.5-1.6-.7-2.5-.7-2.5 0-4.5 2-4.5 4.5 0 .3 0 .5.1.8C13.3 11.7 12 13.3 12 15.2c0 1.9 1.5 3.4 3.4 3.4H36c1.5 0 2.7-1.2 2.7-2.7 0-.6-.2-1.2-.5-1.7l-1.7.3z" fill="#fbad41"/>
      </svg>`
    },
    {
      name: "GitHub",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
      </svg>`
    },
    {
      name: "Stripe",
      svg: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#635bff">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C4.576 23.082 7.501 24 10.9 24c2.616 0 4.729-.596 6.28-1.724 1.618-1.188 2.452-2.992 2.452-5.29 0-4.11-2.508-5.842-5.656-7.836z"/>
      </svg>`
    }
  ];

  const track = document.getElementById('sp-track');

  /*
   * We render logos TWICE so the marquee loops seamlessly.
   * The animation moves exactly 50% (one full set), then resets to 0 — creating a seamless loop.
   */
  const allLogos = [...logos, ...logos];

  allLogos.forEach(logo => {
    const el = document.createElement('div');
    el.className = 'sp-logo';
    el.innerHTML = logo.svg + `<span>${logo.name}</span>`;
    track.appendChild(el);
  });
</script>

</body>
</html>