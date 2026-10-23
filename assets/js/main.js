/**
 * ANFA INTERIOR — Client Experience & Interactive Functions
 * Mobile-Optimized for Moshi, Chikhali, PCMC & Pune
 * Master Craftsman Akhlaque Chaudhary (070402 08012)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initBeforeAfterSlider();
  initRoomExplorer();
  initCostCalculator();
  initPortfolioFilter();
  initVideoModal();
  initFaqAccordion();
  initQuoteForms();
  initHeaderScroll();
});

/* -------------------------------------------------------------
 * 1. Mobile Navigation Drawer & Backdrop
 * ------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!toggleBtn || !mobileMenu) return;

  const hamburgerSvg = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  `;

  const closeSvg = `
    <svg class="w-6 h-6 text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  `;

  function setMenuState(open) {
    if (open) {
      mobileMenu.classList.remove('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.innerHTML = closeSvg;
      document.body.classList.add('mobile-nav-open');
    } else {
      mobileMenu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = hamburgerSvg;
      document.body.classList.remove('mobile-nav-open');
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    setMenuState(!isExpanded);
  });

  const navLinks = mobileMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  // Close when clicking outside of the mobile menu
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      if (!mobileMenu.classList.contains('hidden')) {
        setMenuState(false);
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      setMenuState(false);
    }
  });
}

/* -------------------------------------------------------------
 * 2. Header Scroll Effect
 * ------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
  }, { passive: true });
}

/* -------------------------------------------------------------
 * 3. Before & After Transformation Split Slider (Touch-Friendly)
 * ------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-container');
  if (!container) return;

  const slider = container.querySelector('.before-after-slider');
  const beforeLayer = container.querySelector('.before-layer');
  const beforeImg = beforeLayer ? beforeLayer.querySelector('img') : null;
  const handle = container.querySelector('.slider-handle');

  if (!slider || !beforeLayer || !handle) return;

  function syncImageWidth() {
    if (beforeImg) {
      beforeImg.style.width = `${container.offsetWidth}px`;
      beforeImg.style.maxWidth = 'none';
    }
  }

  function updateSlider(val) {
    const clamped = Math.max(0, Math.min(100, val));
    beforeLayer.style.width = `${clamped}%`;
    handle.style.left = `${clamped}%`;
    slider.value = clamped;
  }

  syncImageWidth();
  window.addEventListener('resize', syncImageWidth, { passive: true });
  window.addEventListener('orientationchange', () => {
    setTimeout(syncImageWidth, 150);
  });

  slider.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  // Smooth Touch & Mouse drag support
  let isDragging = false;

  function getClientX(e) {
    if (e.touches && e.touches.length > 0) return e.touches[0].clientX;
    return e.clientX;
  }

  function handleDrag(e) {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    const x = getClientX(e);
    const pos = ((x - rect.left) / rect.width) * 100;
    updateSlider(pos);
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    handleDrag(e);
  });
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    handleDrag(e);
  }, { passive: true });
  window.addEventListener('touchmove', handleDrag, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchcancel', () => { isDragging = false; });
}

/* -------------------------------------------------------------
 * 4. Room-by-Room Interactive Visual Explorer
 * ------------------------------------------------------------- */
function initRoomExplorer() {
  const roomTabs = document.querySelectorAll('.room-tab-btn');
  const roomDisplayImg = document.getElementById('roomExplorerImage');
  const roomTitle = document.getElementById('roomExplorerTitle');
  const roomDesc = document.getElementById('roomExplorerDesc');
  const roomFeatures = document.getElementById('roomExplorerFeatures');
  const roomBudget = document.getElementById('roomExplorerBudget');

  if (!roomTabs.length || !roomDisplayImg) return;

  const roomData = {
    living: {
      title: 'Living Room & Entertainment Zone',
      image: 'assets/images/modern-tv-unit-pcmc.jpg',
      desc: 'The social centerpiece of your flat. Designed with acoustic fluted charcoal louvers, Italian Statuario marble PVC sheeting, floating console, and warm ambient profile lighting.',
      features: ['Concealed cabling & soundbar niche', 'Saint-Gobain false ceiling with cove light', 'Shoe credenza with louvered ventilation'],
      budget: '₹85,000 – ₹1,40,000'
    },
    kitchen: {
      title: 'Heavy Indian Modular Kitchen',
      image: 'assets/images/modular-kitchen-structure.jpg',
      desc: 'Engineered for heavy Indian cooking. 100% IS:710 Boiling Waterproof Marine Plywood base and wall carcases, mirror-finish acrylic shutters, and German soft-close tandem drawers.',
      features: ['Hafele/Hettich 35kg tandem drawers', 'Granite / Quartz heat-resistant countertop', 'Dedicated thali, cutlery, spice pull-out & tall pantry'],
      budget: '₹1,20,000 – ₹2,20,000'
    },
    master: {
      title: 'Master Bedroom & Sliding Wardrobe',
      image: 'assets/images/sliding-wardrobe-bedroom.jpg',
      desc: 'Floor-to-ceiling 9.5-ft sliding wardrobe with upper lofts for luggage, aluminum profile handles, king-size hydraulic storage bed, and illuminated dressing mirror.',
      features: ['Heavy-duty soft-close sliding wardrobe', 'Full-height loft storage for suitcases & quilts', 'Hydraulic bed storage & vanity mirror'],
      budget: '₹1,20,000 – ₹1,90,000'
    },
    mandir: {
      title: 'Vastu Mandir & Foyer Safety Door',
      image: 'assets/images/mandir-tvunit-chikhali-sec16.jpg',
      desc: 'Custom CNC laser-cut jali mandir unit with ambient backlighting, brass bell hooks, pooja storage drawers, and matching entrance safety door with ventilated shoe console.',
      features: ['Custom CNC laser-cut jali & OM motif', 'Dedicated storage for pooja samagri & agarbatti', 'Vastu-compliant northeast placement with warm LED'],
      budget: '₹35,000 – ₹65,000'
    }
  };

  roomTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roomTabs.forEach(t => t.classList.remove('active', 'border-stone-900', 'bg-stone-900', 'text-white'));
      roomTabs.forEach(t => t.classList.add('bg-white', 'text-stone-800', 'border-stone-200'));

      tab.classList.add('active', 'border-stone-900', 'bg-stone-900', 'text-white');
      tab.classList.remove('bg-white', 'text-stone-800', 'border-stone-200');

      const roomKey = tab.getAttribute('data-room');
      const data = roomData[roomKey];
      if (!data) return;

      // Smooth transition
      roomDisplayImg.style.opacity = '0.3';
      setTimeout(() => {
        roomDisplayImg.src = data.image;
        if (roomTitle) roomTitle.textContent = data.title;
        if (roomDesc) roomDesc.textContent = data.desc;
        if (roomBudget) roomBudget.textContent = data.budget;

        if (roomFeatures) {
          roomFeatures.innerHTML = data.features.map(f => `<li class="flex items-center gap-2"><span class="text-brass font-bold">―</span><span>${f}</span></li>`).join('');
        }
        roomDisplayImg.style.opacity = '1';
      }, 150);
    });
  });
}

/* -------------------------------------------------------------
 * 5. Interactive Interior Cost Calculator
 * ------------------------------------------------------------- */
function initCostCalculator() {
  const calcContainer = document.getElementById('interiorCalculator');
  if (!calcContainer) return;

  let config = '2bhk';
  let scope = 'turnkey';
  let finish = 'premium';

  const pricingMatrix = {
    '1bhk': {
      turnkey: { essential: [2.5, 3.2], premium: [3.5, 4.5], luxury: [4.8, 6.2] },
      kitchen_only: { essential: [0.9, 1.2], premium: [1.3, 1.7], luxury: [1.8, 2.4] },
      woodwork: { essential: [1.8, 2.3], premium: [2.5, 3.2], luxury: [3.5, 4.5] }
    },
    '2bhk': {
      turnkey: { essential: [3.8, 4.8], premium: [5.2, 6.8], luxury: [7.2, 9.5] },
      kitchen_only: { essential: [1.1, 1.5], premium: [1.6, 2.2], luxury: [2.3, 3.1] },
      woodwork: { essential: [2.6, 3.4], premium: [3.8, 4.9], luxury: [5.2, 6.8] }
    },
    '3bhk': {
      turnkey: { essential: [5.5, 6.9], premium: [7.5, 9.8], luxury: [10.5, 14.5] },
      kitchen_only: { essential: [1.3, 1.8], premium: [1.9, 2.6], luxury: [2.8, 3.8] },
      woodwork: { essential: [3.8, 4.9], premium: [5.4, 7.2], luxury: [7.8, 10.5] }
    },
    'villa': {
      turnkey: { essential: [9.0, 12.0], premium: [13.0, 18.0], luxury: [19.0, 28.0] },
      kitchen_only: { essential: [2.0, 2.8], premium: [3.0, 4.2], luxury: [4.5, 6.5] },
      woodwork: { essential: [6.5, 8.5], premium: [9.5, 13.0], luxury: [14.0, 20.0] }
    }
  };

  setupButtonGroup('configOptions', (val) => {
    config = val;
    updateCalculation();
  });

  setupButtonGroup('scopeOptions', (val) => {
    scope = val;
    updateCalculation();
  });

  setupButtonGroup('finishOptions', (val) => {
    finish = val;
    updateCalculation();
  });

  function setupButtonGroup(containerId, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = container.querySelectorAll('.calc-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-value');
        callback(val);
      });
    });
  }

  function updateCalculation() {
    const [minPrice, maxPrice] = pricingMatrix[config][scope][finish];
    const minEl = document.getElementById('calcMinPrice');
    const maxEl = document.getElementById('calcMaxPrice');
    const timelineEl = document.getElementById('calcTimeline');
    const summaryEl = document.getElementById('calcSummaryText');
    const whatsappBtn = document.getElementById('calcWhatsAppBtn');

    if (minEl && maxEl) {
      minEl.textContent = `₹${minPrice.toFixed(1)} Lakh`;
      maxEl.textContent = `₹${maxPrice.toFixed(1)} Lakh`;
    }

    let days = '35 – 45 Working Days';
    if (scope === 'kitchen_only') days = '15 – 20 Working Days';
    else if (config === '3bhk' || config === 'villa') days = '45 – 60 Working Days';
    if (timelineEl) timelineEl.textContent = days;

    const configNames = { '1bhk': '1 BHK Flat', '2bhk': '2 BHK Flat', '3bhk': '3 BHK Flat', 'villa': 'Rowhouse / Villa' };
    const scopeNames = { 'turnkey': 'Complete Turnkey', 'kitchen_only': 'Modular Kitchen Only', 'woodwork': 'Custom Woodwork & Furniture' };
    const finishNames = { 'essential': 'Essential (Commercial Ply)', 'premium': 'Premium (BWP Marine Ply + Acrylic)', 'luxury': 'Luxury (HDHMR + PU / Glass)' };

    if (summaryEl) {
      summaryEl.textContent = `${configNames[config]} • ${scopeNames[scope]} • ${finishNames[finish]}`;
    }

    if (whatsappBtn) {
      const msg = encodeURIComponent(
        `Hello ANFA Interior! I calculated an estimate on your website for:\n- Flat: ${configNames[config]}\n- Scope: ${scopeNames[scope]}\n- Finish: ${finishNames[finish]}\n- Estimated Budget: ₹${minPrice.toFixed(1)}L - ₹${maxPrice.toFixed(1)}L\nI'd like to book a free site consultation in Moshi/Chikhali/PCMC.`
      );
      whatsappBtn.href = `https://wa.me/917040208012?text=${msg}`;
    }
  }

  updateCalculation();
}

/* -------------------------------------------------------------
 * 6. Portfolio Filter Tabs (Touch & Mobile Scroll Friendly)
 * ------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterTabs.length || !galleryItems.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category')?.split(' ') || [];
        if (filterVal === 'all' || itemCategories.includes(filterVal)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 7. YouTube Video Modal (Playsinline & Scroll Lock)
 * ------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoModalIframe');
  const closeBtn = document.getElementById('closeVideoModal');
  const triggers = document.querySelectorAll('[data-video-id]');

  if (!modal || !iframe) return;

  function openModal(videoId) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }

  function closeModal() {
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = btn.getAttribute('data-video-id');
      if (videoId) openModal(videoId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* -------------------------------------------------------------
 * 8. FAQ Accordion
 * ------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      faqItems.forEach(other => {
        const otherAnswer = other.querySelector('.faq-answer');
        const otherIcon = other.querySelector('.faq-icon');
        if (otherAnswer) otherAnswer.classList.add('hidden');
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* -------------------------------------------------------------
 * 9. Consultation Forms & WhatsApp Action
 * ------------------------------------------------------------- */
function initQuoteForms() {
  const forms = document.querySelectorAll('.consultation-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || 'Client';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const location = form.querySelector('[name="location"]')?.value || 'PCMC';
      const flatType = form.querySelector('[name="flat_type"]')?.value || '2 BHK';
      const requirements = form.querySelector('[name="requirements"]')?.value || 'Complete Interior Consultation';

      const cleanedPhone = phone.replace(/[^0-9]/g, '');
      if (cleanedPhone.length < 10) {
        alert('Please enter a valid 10-digit mobile number so Akhlaque can contact you.');
        return;
      }

      const message = encodeURIComponent(
        `Hello ANFA Interior Team! I would like to book an in-person site consultation:\n- Name: ${name}\n- Phone: ${cleanedPhone}\n- Society / Area: ${location}\n- Configuration: ${flatType}\n- Scope: ${requirements}\nPlease let me know when you can visit my flat.`
      );

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `Connecting to WhatsApp...`;
        submitBtn.disabled = true;
        setTimeout(() => {
          window.open(`https://wa.me/917040208012?text=${message}`, '_blank');
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          form.reset();
        }, 500);
      }
    });
  });
}
