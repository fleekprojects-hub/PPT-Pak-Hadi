/**
 * FLEEK RETAIL OMNI-CORE // KIIWII.BEE (PAK DOMINICUS HADI)
 * Presentation Controller & Interactive Simulators
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const slides = document.querySelectorAll('.slide-panel');
  const slideCounter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('deckProgressBar');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const printBtn = document.getElementById('printDeckBtn');
  const navToggleBtn = document.getElementById('navToggleBtn');
  const navDrawer = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const htmlElement = document.documentElement;
  const deckToast = document.getElementById('deckToast');
  const deckToastText = document.getElementById('deckToastText');

  let currentIndex = 0;
  const totalSlides = slides.length;
  let isTransitioning = false;
  const cooldownMs = 600;

  // Slide IDs array
  const slideIds = [
    'opening',
    'reality-check',
    'architecture',
    'mobile-first',
    'demo-stock-checker',
    'demo-bazaar-reconciliation',
    'demo-vision-ai',
    'e2e-journey',
    'vendor-comparison',
    'commercial-quote',
    'timeline',
    'closing-cta'
  ];

  function updateDeckUI() {
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active');
        anime({
          targets: slide.querySelectorAll('.animate-text'),
          translateY: [15, 0],
          opacity: [0, 1],
          easing: 'easeOutCubic',
          duration: 500,
          delay: anime.stagger(60)
        });
      } else {
        slide.classList.remove('active');
      }
    });

    if (slideCounter) {
      const padCurrent = String(currentIndex + 1).padStart(2, '0');
      const padTotal = String(totalSlides).padStart(2, '0');
      slideCounter.textContent = `${padCurrent} / ${padTotal}`;
    }

    if (progressBar) {
      const pct = ((currentIndex + 1) / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    navLinks.forEach((link, idx) => {
      if (idx === currentIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.goToSlide = function(index) {
    if (index < 0 || index >= totalSlides || isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    updateDeckUI();
    setTimeout(() => {
      isTransitioning = false;
    }, cooldownMs);
  };

  window.nextSlide = function() {
    if (currentIndex < totalSlides - 1) {
      window.goToSlide(currentIndex + 1);
    }
  };

  window.prevSlide = function() {
    if (currentIndex > 0) {
      window.goToSlide(currentIndex - 1);
    }
  };

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      window.nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      window.prevSlide();
    }
  });

  // Wheel with cooldown
  let wheelTimer = null;
  window.addEventListener('wheel', (e) => {
    if (isTransitioning) return;
    if (wheelTimer) return;

    if (e.deltaY > 35) {
      window.nextSlide();
      wheelTimer = setTimeout(() => { wheelTimer = null; }, cooldownMs);
    } else if (e.deltaY < -35) {
      window.prevSlide();
      wheelTimer = setTimeout(() => { wheelTimer = null; }, cooldownMs);
    }
  }, { passive: true });

  // Touch navigation
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;
    if (Math.abs(diffY) > 50 && !isTransitioning) {
      if (diffY > 0) {
        window.nextSlide();
      } else {
        window.prevSlide();
      }
    }
  }, { passive: true });

  // Drawer Interactions
  if (navToggleBtn && navDrawer && navOverlay) {
    navToggleBtn.addEventListener('click', () => {
      navDrawer.classList.toggle('open');
      navOverlay.classList.toggle('open');
    });

    navOverlay.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      navOverlay.classList.remove('open');
    });

    const closeNavBtn = document.getElementById('closeNavBtn');
    if (closeNavBtn) {
      closeNavBtn.addEventListener('click', () => {
        navDrawer.classList.remove('open');
        navOverlay.classList.remove('open');
      });
    }

    navLinks.forEach((link, idx) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.goToSlide(idx);
        navDrawer.classList.remove('open');
        navOverlay.classList.remove('open');
      });
    });
  }

  // Theme Toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      showToast(`Tema beralih ke: ${newTheme.toUpperCase()} MODE`);
    });
  }

  // Print PDF
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  function showToast(msg) {
    if (!deckToast || !deckToastText) return;
    deckToastText.textContent = msg;
    deckToast.classList.add('show');
    setTimeout(() => {
      deckToast.classList.remove('show');
    }, 2800);
  }

  // ============================================================
  // 🔥 DEMO 1: TELEGRAM MULTI-LOCATION STOCK CHECKER (SLIDE 05)
  // ============================================================
  const sampleStockData = {
    'C187': {
      sku: 'C187',
      name: 'Kemeja Linen Oversized',
      price: 'Rp 189.000',
      variants: [
        { color: 'Sage Green', bazaar: 2, gudang: 18, toko: 4, total: 24, status: 'READY' },
        { color: 'Terracotta', bazaar: 0, gudang: 12, toko: 3, total: 15, status: 'HABIS DI BAZAAR' },
        { color: 'Broken White', bazaar: 3, gudang: 25, toko: 6, total: 34, status: 'READY' },
        { color: 'Oatmeal', bazaar: 1, gudang: 8, toko: 2, total: 11, status: 'READY' }
      ]
    },
    'C241': {
      sku: 'C241',
      name: 'Kulot Linen High-Waist',
      price: 'Rp 215.000',
      variants: [
        { color: 'Charcoal Black', bazaar: 4, gudang: 30, toko: 5, total: 39, status: 'READY' },
        { color: 'Beige Sand', bazaar: 0, gudang: 14, toko: 4, total: 18, status: 'HABIS DI BAZAAR' },
        { color: 'Olive Green', bazaar: 2, gudang: 9, toko: 1, total: 12, status: 'READY' }
      ]
    },
    'C302': {
      sku: 'C302',
      name: 'Outer Kimono Linen Set',
      price: 'Rp 249.000',
      variants: [
        { color: 'Dusty Rose', bazaar: 1, gudang: 6, toko: 2, total: 9, status: 'LIMITED' },
        { color: 'Denim Blue', bazaar: 3, gudang: 15, toko: 4, total: 22, status: 'READY' }
      ]
    }
  };

  window.triggerStockQuery = function(skuKey = 'C187', btnEl = null) {
    const chatBody = document.getElementById('tgStockChatBody');
    const badge = document.getElementById('tgStockQueryBadge');
    if (!chatBody) return;

    if (btnEl) {
      document.querySelectorAll('.sku-select-chip').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }

    const item = sampleStockData[skuKey] || sampleStockData['C187'];
    chatBody.innerHTML = '';

    // Inbound user query
    const userMsg = document.createElement('div');
    userMsg.className = 'tg-bubble inbound';
    userMsg.innerHTML = `cek stok ${item.sku} <div class="tg-time">14:22</div>`;
    chatBody.appendChild(userMsg);

    // AI Response simulation
    setTimeout(() => {
      const rowsHtml = item.variants.map(v => {
        const bzColor = v.bazaar === 0 ? '#ef4444' : '#10b981';
        return `• <b>${v.color}</b>: Meja Bazaar <b style="color:${bzColor}">${v.bazaar} pcs</b> | Gudang <b style="color:#06b6d4">${v.gudang} pcs</b> | Toko <b style="color:#f59e0b">${v.toko} pcs</b>`;
      }).join('<br>');

      const replyMsg = document.createElement('div');
      replyMsg.className = 'tg-bubble outbound';
      replyMsg.innerHTML = `
        📦 <b>[STOCK REAL-TIME // ${item.sku}]</b><br>
        <b>${item.name}</b> (${item.price})<br><br>
        ${rowsHtml}<br><br>
        💡 <i>Staf Tips: Jika warna di bazaar habis (Terracotta), tawarkan kirim sameday dari Gudang atau ambil di Toko Fisik!</i>
        <div class="tg-time">14:22</div>
      `;
      chatBody.appendChild(replyMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 300);

    if (badge) {
      badge.textContent = `Query: ${item.sku} (${item.name})`;
    }
  };

  // ============================================================
  // 🔥 DEMO 2: BAZAAR HANDOVER & RECONCILIATION (SLIDE 06)
  // ============================================================
  const sampleReconciliation = [
    { sku: 'C187-SGE', name: 'Kemeja Sage Green', bawa: 30, laku: 22, kembali: 8, selisih: 0, hpp: 95000 },
    { sku: 'C187-TER', name: 'Kemeja Terracotta', bawa: 25, laku: 19, kembali: 5, selisih: -1, hpp: 95000 },
    { sku: 'C241-BLK', name: 'Kulot Charcoal', bawa: 40, laku: 31, kembali: 9, selisih: 0, hpp: 110000 },
    { sku: 'C241-BGE', name: 'Kulot Beige Sand', bawa: 35, laku: 24, kembali: 10, selisih: -1, hpp: 110000 },
    { sku: 'C302-ROSE', name: 'Outer Dusty Rose', bawa: 20, laku: 15, kembali: 5, selisih: 0, hpp: 125000 }
  ];

  window.renderReconciliationTable = function() {
    const tbody = document.getElementById('reconciliationTableBody');
    const pcsBadge = document.getElementById('reconLostPcsBadge');
    const valBadge = document.getElementById('reconLostValBadge');
    if (!tbody) return;

    tbody.innerHTML = '';
    let totalLostPcs = 0;
    let totalLostVal = 0;

    sampleReconciliation.forEach((item, idx) => {
      const isSelisih = item.selisih !== 0;
      if (isSelisih) {
        totalLostPcs += Math.abs(item.selisih);
        totalLostVal += Math.abs(item.selisih) * item.hpp;
      }

      const selisihLabel = isSelisih 
        ? `<span style="color:#ef4444; font-weight:700;">${item.selisih} pcs (Hilang)</span>` 
        : `<span style="color:#10b981; font-weight:700;">✓ Cocok (0)</span>`;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="font-family:var(--font-mono); color:var(--fashion-terracotta);">${idx + 1}</td>
        <td><b style="color:#fff;">${item.name}</b><br><span style="font-size:0.64rem; color:var(--home-fg-3); font-family:var(--font-mono);">${item.sku}</span></td>
        <td><span style="font-family:var(--font-mono);">${item.bawa}</span></td>
        <td><span style="font-family:var(--font-mono); color:#10b981;">${item.laku}</span></td>
        <td><span style="font-family:var(--font-mono);">${item.kembali}</span></td>
        <td>${selisihLabel}</td>
      `;
      tbody.appendChild(row);
    });

    if (pcsBadge) pcsBadge.textContent = `${totalLostPcs} Pcs Selisih`;
    if (valBadge) valBadge.textContent = `Nominal Selisih: Rp ${totalLostVal.toLocaleString('id-ID')}`;
  };

  // ============================================================
  // 🔥 DEMO 3: VISION AI AUTO-SKU GENERATOR (SLIDE 07)
  // ============================================================
  const sampleVisionModels = {
    'linen-dress': {
      title: 'Midi Dress Kerut Linen',
      color: 'Terracotta Rust',
      fabric: 'Pure French Linen 100%',
      collar: 'V-Neck Ruffle',
      sleeve: 'Short Puff Sleeve',
      sku: 'D412-TER',
      barcode: '899120412019',
      jubelioCategory: 'Pakaian Wanita > Dress > Midi Dress'
    },
    'linen-shirt': {
      title: 'Kemeja Santai Loose-Fit',
      color: 'Sage Herbal Green',
      fabric: 'Slub Linen Rayon Blend',
      collar: 'Mandarin Collar',
      sleeve: 'Long Sleeve (Roll-Up)',
      sku: 'S195-SGE',
      barcode: '899120195034',
      jubelioCategory: 'Pakaian Wanita > Kemeja & Blouse'
    }
  };

  window.triggerVisionAi = function(modelKey = 'linen-dress', btnEl = null) {
    const resultBox = document.getElementById('visionResultBox');
    if (!resultBox) return;

    if (btnEl) {
      document.querySelectorAll('.vision-chip-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }

    const data = sampleVisionModels[modelKey] || sampleVisionModels['linen-dress'];
    resultBox.innerHTML = `
      <div style="font-family:var(--font-mono); font-size:0.68rem; color:var(--fashion-cyan); margin-bottom:0.4rem;">
        ⚡ VISION AI PROCESSING COMPLETED (0.84s)
      </div>
      <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:0.73rem;">
        <div><b>Model Terdeteksi:</b> <span style="color:#fff;">${data.title}</span></div>
        <div><b>Warna & Bahan:</b> <span style="color:#fff;">${data.color} (${data.fabric})</span></div>
        <div><b>Detail Kerah & Lengan:</b> <span style="color:#fff;">${data.collar} • ${data.sleeve}</span></div>
        <div style="padding-top:0.35rem; border-top:1px solid #282826; display:flex; justify-content:space-between; align-items:center;">
          <div><b>Auto-Generated SKU:</b> <span style="color:var(--fashion-terracotta); font-family:var(--font-mono); font-weight:700;">${data.sku}</span></div>
          <span style="background:var(--fashion-terracotta-dim); color:var(--fashion-terracotta); font-size:0.6rem; padding:2px 6px; border-radius:3px;">BARCODE READY</span>
        </div>
        <div style="font-size:0.66rem; color:var(--home-fg-3);">
          Format Ekspor Jubelio: <code>${data.jubelioCategory}</code> | CSV Ready
        </div>
      </div>
    `;
  };

  // ============================================================
  // OPEX CALCULATOR (SLIDE 10)
  // ============================================================
  window.updateKiiWiiCostCalculation = function(val) {
    const eventCount = parseInt(val, 10);
    const eventDisplay = document.getElementById('eventVolumeDisplay');
    const totalCostDisplay = document.getElementById('totalOpexDisplay');
    const serverCostDisplay = document.getElementById('serverCostDisplay');

    if (eventDisplay) eventDisplay.textContent = `${eventCount} bazaar event / bulan`;

    // Fixed VPS Rp 150.000
    const vps = 150000;
    // Token Vision AI & Bot Telegram (~Rp 15.000 per event cycle)
    const token = eventCount * 18000;
    const total = vps + token;

    if (serverCostDisplay) serverCostDisplay.textContent = `~Rp ${token.toLocaleString('id-ID')}`;
    if (totalCostDisplay) totalCostDisplay.textContent = `~Rp ${total.toLocaleString('id-ID')}`;
  };

  // Initial Load
  updateDeckUI();
  window.triggerStockQuery('C187');
  window.renderReconciliationTable();
  window.triggerVisionAi('linen-dress');
});
