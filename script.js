/**
 * Lodha Altero Wakad - Advanced Interactive Experience & Animations
 * Design System Reference: Lodha Group (lodhagroup.com)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-Triggered Entrance Animations (Intersection Observer)
  initScrollAnimations();

  // 2. Animated Number Counters
  initNumberCounters();

  // 3. Fluidic Unified Navbar & Smooth Momentum Navigation
  initFluidNavEngine();

  // 4. MahaRERA Drawer Toggle
  initReraDrawer();

  // 5. Floor Plans Explorer (Schematic + High-Definition 3D Plan Toggle)
  initFloorPlans();

  // 6. Rooftop Sanctuary Experience Switcher
  initRooftopTabs();

  // 7. Location Connectivity Categories Switcher
  initLocationTabs();

  // 8. Interactive Financial Hub (EMI & All-Inclusive Cost Sheet)
  initFinancialHub();

  // 9. Gallery Category Filter & Lightbox
  initGallery();

  // 10. Lead Modals (Enquiry & Brochure)
  initModals();

  // 11. Mobile Hamburger Navigation
  initMobileNav();

  // 12. Form Submissions with Toast Feedback
  initFormHandlers();

  // 13. FAQ Accordions
  initFaqAccordions();

  // 14. Interactive Boxing Card Effects & Cursor Glow
  initBoxingCardEffects();

  // 15. Global Multi-Currency Purchasing Engine
  initCurrencyConverter();

  // 16. Progressive Web App (PWA) Offline Service Worker
  initPwaServiceWorker();

  // 17. Architectural Vastu & Sun Path Simulator
  initVastuSimulator();

  // 18. Interactive Competitor Battlecard Selector
  initCompetitorBattlecard();

  // 19. Multi-Intent WhatsApp Concierge Dock
  initWhatsAppConciergeDock();

  // 20. High-Net-Worth Exit-Intent Lead Recovery Modal
  initExitIntentModal();

  // 21. Progressive Web App (PWA) Mobile Install Banner
  initPwaInstallPrompt();
});

/* ============================================================
   1. Scroll-Triggered Entrance Animations
   ============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-init');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   2. Animated Number Counters
   ============================================================ */
function initNumberCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.counterTarget);
        const prefix = el.dataset.counterPrefix || '';
        const suffix = el.dataset.counterSuffix || '';
        const decimals = parseInt(el.dataset.counterDecimals || '0', 10);
        const duration = 1800; // ms
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = target * easeOut;

          el.textContent = `${prefix}${currentVal.toLocaleString('en-IN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          })}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = `${prefix}${target.toLocaleString('en-IN', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals
            })}${suffix}`;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

/* ============================================================
   3. Fluidic Navigation & Smooth Momentum Scroll Engine
   ============================================================ */

/**
 * Fluid Navigation & Butter-Smooth Scroll Engine
 * High-performance, 120Hz native smooth scrolling with layout-thrashing prevention
 */
let isProgrammaticScroll = false;
let scrollTimeout = null;

window.fluidScrollTo = function(targetY, durationOrOnComplete = null, onComplete = null) {
  const safeTargetY = Math.max(0, Math.round(targetY));
  const callback = typeof durationOrOnComplete === 'function' 
    ? durationOrOnComplete 
    : (typeof onComplete === 'function' ? onComplete : null);

  window.scrollTo({
    top: safeTargetY,
    behavior: 'smooth'
  });

  if (callback) {
    setTimeout(callback, 500);
  }
};

// Global reference for updating the magnetic pill
let moveFluidPillTo = null;

function initFluidNavEngine() {
  const desktopNav = document.getElementById('desktopNav');
  const pill = document.getElementById('navFluidPill');
  const links = document.querySelectorAll('.nav-link-refined');
  const navbar = document.getElementById('mainLuxuryNavbar');
  const progressBar = document.getElementById('navScrollProgress');
  const allNavLinks = document.querySelectorAll('.nav-link-refined, .mobile-nav-link');

  // Track nav sections specifically (only sections with links in navigation)
  const navSections = [
    { id: 'overview', el: document.getElementById('overview') },
    { id: 'rooftop', el: document.getElementById('rooftop') },
    { id: 'residences', el: document.getElementById('residences') },
    { id: 'amenities', el: document.getElementById('amenities') },
    { id: 'location', el: document.getElementById('location') },
    { id: 'gallery', el: document.getElementById('gallery') },
    { id: 'calculator', el: document.getElementById('calculator') },
    { id: 'legacy', el: document.getElementById('legacy') }
  ].filter(item => item.el !== null);

  let lastActiveId = '';
  let isNavScrolled = false;

  // 1. Magnetic Pill Setup
  if (desktopNav && pill && links.length) {
    moveFluidPillTo = function(element) {
      if (!element) {
        pill.style.opacity = '0';
        return;
      }
      const navRect = desktopNav.getBoundingClientRect();
      const elemRect = element.getBoundingClientRect();

      const left = elemRect.left - navRect.left;
      const width = elemRect.width;

      if (width <= 0) return;

      pill.style.opacity = '1';
      pill.style.transform = `translateX(${Math.round(left)}px)`;
      pill.style.width = `${Math.round(width)}px`;
    };

    links.forEach(link => {
      link.addEventListener('mouseenter', () => moveFluidPillTo(link));
    });

    desktopNav.addEventListener('mouseleave', () => {
      const activeLink = desktopNav.querySelector('.nav-link-refined.active') || links[0];
      moveFluidPillTo(activeLink);
    });

    window.addEventListener('resize', () => {
      const activeLink = desktopNav.querySelector('.nav-link-refined.active') || links[0];
      moveFluidPillTo(activeLink);
    }, { passive: true });

    // Initial pill position after layout settles
    setTimeout(() => {
      const activeLink = desktopNav.querySelector('.nav-link-refined.active') || links[0];
      moveFluidPillTo(activeLink);
    }, 200);
  }

  // Helper to activate a specific nav link
  function setActiveNavId(id) {
    if (id === lastActiveId) return;
    lastActiveId = id;

    let targetPillLink = null;
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
        if (link.classList.contains('nav-link-refined')) {
          targetPillLink = link;
        }
      } else {
        link.classList.remove('active');
      }
    });

    if (targetPillLink && moveFluidPillTo) {
      moveFluidPillTo(targetPillLink);
    }
  }

  // 2. Intercept Anchor Links for Precise Smooth Scrolling
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    // Immediately close mobile drawer if open & unlock body overflow
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (mobileDrawer) {
      mobileDrawer.classList.add('translate-x-full');
      mobileDrawer.classList.remove('drawer-open');
    }
    document.body.style.overflow = '';

    // Special case: back to hero / top of page
    if (href === '#hero') {
      e.preventDefault();
      isProgrammaticScroll = true;
      clearTimeout(scrollTimeout);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      scrollTimeout = setTimeout(() => { isProgrammaticScroll = false; }, 600);
      setActiveNavId('overview');
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const targetSectionId = href.replace('#', '');
    setActiveNavId(targetSectionId);

    // Dynamic navbar height offset (76px gives ideal padding below fixed nav)
    const navH = 76;
    const targetOffset = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - navH;

    isProgrammaticScroll = true;
    clearTimeout(scrollTimeout);

    window.scrollTo({
      top: Math.max(0, Math.round(targetOffset)),
      behavior: 'smooth'
    });

    scrollTimeout = setTimeout(() => {
      isProgrammaticScroll = false;
    }, 650);
  });

  // 3. High-Performance Fluid Scroll Listener (Zero Layout-Thrashing)
  let ticking = false;

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // A. Reading progress bar (pure style write, no reflow)
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progressPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    }

    // B. Navbar compaction (only update class when state toggles)
    const shouldCompact = scrollY > 40;
    if (navbar && shouldCompact !== isNavScrolled) {
      isNavScrolled = shouldCompact;
      if (isNavScrolled) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
      // Re-align pill once navbar settles
      setTimeout(() => {
        const activeLink = desktopNav?.querySelector('.nav-link-refined.active');
        if (activeLink && moveFluidPillTo) moveFluidPillTo(activeLink);
      }, 250);
    }

    // C. ScrollSpy (only when NOT mid-click programmatic glide)
    if (!isProgrammaticScroll && navSections.length) {
      let currentId = '';

      if (scrollY < 180) {
        currentId = 'overview';
      } else {
        const navH = 80;
        for (let i = navSections.length - 1; i >= 0; i--) {
          const item = navSections[i];
          const rect = item.el.getBoundingClientRect();
          if (rect.top <= navH + 120) {
            currentId = item.id;
            break;
          }
        }
      }

      if (currentId && currentId !== lastActiveId) {
        setActiveNavId(currentId);
      }
    }

    // D. Circular Scroll Progress & Back to Top Button
    const scrollTopBtn = document.getElementById('scrollToTopBtn');
    const circle = document.getElementById('scrollProgressCircle');
    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
      if (circle) {
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        circle.style.strokeDashoffset = `${100 - scrollPercent}`;
      }
    }

    ticking = false;
  };

  // Bind Scroll to Top Click
  const scrollTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isProgrammaticScroll = true;
      clearTimeout(scrollTimeout);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      scrollTimeout = setTimeout(() => { isProgrammaticScroll = false; }, 600);
      setActiveNavId('overview');
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll();
}

/* ============================================================
   4. MahaRERA Slide-out Drawer
   ============================================================ */
function initReraDrawer() {
  const reraContainer = document.getElementById('reraSlideout');
  const reraTab = document.getElementById('reraTab');
  const reraClose = document.getElementById('reraClose');
  const topTrigger = document.getElementById('topReraTrigger');

  if (!reraContainer) return;

  if (reraTab) {
    reraTab.addEventListener('click', (e) => {
      e.stopPropagation();
      reraContainer.classList.toggle('open');
    });
  }

  if (topTrigger) {
    topTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      reraContainer.classList.add('open');
    });
  }

  if (reraClose) {
    reraClose.addEventListener('click', (e) => {
      e.stopPropagation();
      reraContainer.classList.remove('open');
    });
  }

  document.addEventListener('click', (e) => {
    if (!reraContainer.contains(e.target)) {
      reraContainer.classList.remove('open');
    }
  });
}

/* ============================================================
   5. Floor Plans Explorer (Authentic Scraped Imagery & Schematics)
   ============================================================ */
const floorPlanData = {
  '3bhk': {
    title: '3 BHK Grande Sky Residence (Unit 4, Towers T1 & T2)',
    typology: '3 Bed + 3 Bath + Grand Living & Dining + Private Sun Deck',
    tower: 'Towers 1 & 2 • Middle & High Zones',
    carpetArea: '1,185 – 1,396 Sq.Ft. Carpet',
    balconyArea: '120 Sq.Ft. Double Height Deck',
    orientation: 'East-West Cross Ventilation / Vastu Compliant',
    possession: 'Phased from Dec 2028',
    price: '₹2.09 Cr* Onwards (~$250K USD / ~920K AED)',
    highlights: [
      'Authentic Sanctioned Layout from Lodha Altero Wakad',
      'Expansive living room with 10.5 ft floor-to-ceiling clear height',
      'Panoramic double-glazed full height French windows facing lush amenity greens',
      'Dedicated utility zone, separate dry balcony & European sanitary fittings'
    ],
    actualPlanImg: 'assets/plans/plan_3bed_unit4_t1_t2.webp',
    fallbackImg: 'https://www.lodhagroup.com/sites/default/files/styles/webp/public/2025-03/1980265094_Lodha_Wakad_Website_Images_Plans_SC_Unit4_3bed_with_study_T1%26T2_2000x1111px_0.jpg.webp?itok=FCbE9jlG',
    schematicSvg: `
      <svg viewBox="0 0 600 450" class="w-full h-auto blueprint-bg border border-amber-600/30 p-4 shadow-inner">
        <rect x="20" y="20" width="560" height="410" fill="#fdfcf9" stroke="#b89047" stroke-width="2" />
        <rect x="40" y="40" width="260" height="200" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="170" y="130" text-anchor="middle" font-family="Jost" font-size="14" font-weight="600" fill="#1b2026">GRAND LIVING & DINING</text>
        <text x="170" y="155" text-anchor="middle" font-family="Jost" font-size="12" fill="#7d5e23">24'0" x 14'6"</text>
        
        <rect x="40" y="240" width="260" height="60" fill="#f7f3ea" stroke="#b89047" stroke-dasharray="4" stroke-width="1.5" />
        <text x="170" y="275" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#9e7934">SKY DECK / PRIVATE BALCONY</text>
        
        <rect x="320" y="40" width="240" height="150" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="440" y="105" text-anchor="middle" font-family="Jost" font-size="14" font-weight="600" fill="#1b2026">MASTER BEDROOM</text>
        <text x="440" y="125" text-anchor="middle" font-family="Jost" font-size="12" fill="#7d5e23">15'0" x 12'6" + Ensuite</text>

        <rect x="320" y="210" width="240" height="110" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="440" y="260" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">BEDROOM 2</text>
        <text x="440" y="280" text-anchor="middle" font-family="Jost" font-size="12" fill="#7d5e23">12'0" x 11'0"</text>

        <rect x="320" y="335" width="240" height="80" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="440" y="375" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">BEDROOM 3 / GUEST</text>

        <rect x="40" y="315" width="160" height="100" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="120" y="360" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">MODERN KITCHEN</text>
        <text x="120" y="380" text-anchor="middle" font-family="Jost" font-size="11" fill="#7d5e23">11'6" x 9'0"</text>

        <rect x="210" y="315" width="90" height="100" fill="#fdfcf9" stroke="#b89047" stroke-width="1" />
        <text x="255" y="365" text-anchor="middle" font-family="Jost" font-size="11" font-weight="600" fill="#555">ENTRANCE<br/>FOYER</text>
      </svg>
    `
  },
  '3.5bhk': {
    title: '3.5 BHK Royal Suite with Study (Unit 5, Towers T1 & T2)',
    typology: '3 Bed + 3 Bath + Study / WFH Suite + Grand Living + Sundeck',
    tower: 'Towers 1 & 2 • Premium Corners',
    carpetArea: '1,450 – 1,495 Sq.Ft. Carpet',
    balconyArea: '140 Sq.Ft. Panoramic Sundeck',
    orientation: 'Three-Side Open Corner Unit',
    possession: 'Phased from Dec 2028',
    price: '₹2.45 Cr* Onwards (~$295K USD / ~1.08M AED)',
    highlights: [
      'Authentic Unit 5 Layout from Lodha Altero Wakad',
      'Dedicated executive Home Office / Study pod with acoustic insulation',
      'Dual master suites with walk-in wardrobe space and premium en-suite fixtures',
      'Extended corner viewing gallery overlooking Pune skyline & Hinjewadi hills'
    ],
    actualPlanImg: 'assets/plans/plan_3bed_unit5_t1_t2.webp',
    fallbackImg: 'https://www.lodhagroup.com/sites/default/files/styles/webp/public/2025-03/Unit_5_3bed_with_study_T1%26T2_2000x1111px_0.jpg.webp?itok=18WoEJKV',
    schematicSvg: `
      <svg viewBox="0 0 600 450" class="w-full h-auto blueprint-bg border border-amber-600/30 p-4 shadow-inner">
        <rect x="20" y="20" width="560" height="410" fill="#fdfcf9" stroke="#b89047" stroke-width="2" />
        <rect x="40" y="40" width="280" height="210" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="180" y="130" text-anchor="middle" font-family="Jost" font-size="14" font-weight="600" fill="#1b2026">PALATIAL LIVING & DINING</text>
        <text x="180" y="155" text-anchor="middle" font-family="Jost" font-size="12" fill="#7d5e23">26'6" x 15'0"</text>

        <rect x="40" y="250" width="280" height="65" fill="#f7f3ea" stroke="#b89047" stroke-dasharray="4" stroke-width="1.5" />
        <text x="180" y="290" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#9e7934">PANORAMIC SUN DECK</text>

        <rect x="40" y="325" width="130" height="90" fill="#eef2f7" stroke="#b89047" stroke-width="1.5" />
        <text x="105" y="365" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">WFH / STUDY</text>
        <text x="105" y="385" text-anchor="middle" font-family="Jost" font-size="11" fill="#7d5e23">9'0" x 8'6"</text>

        <rect x="180" y="325" width="140" height="90" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="250" y="365" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">CHEF'S KITCHEN</text>

        <rect x="340" y="40" width="220" height="150" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="450" y="105" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">GRAND MASTER SUITE</text>
        <text x="450" y="125" text-anchor="middle" font-family="Jost" font-size="11" fill="#7d5e23">16'0" x 13'0" + Dressing</text>

        <rect x="340" y="200" width="220" height="110" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="450" y="255" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">BEDROOM 2 (ENSUITE)</text>

        <rect x="340" y="320" width="220" height="95" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="450" y="365" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">BEDROOM 3</text>
      </svg>
    `
  },
  '3bhk-study': {
    title: '3 Bed Residence with Study (Master Layout Architecture)',
    typology: '3 Bed + 3 Bath + Study Suite + Dining Foyer + Wrap Balcony',
    tower: 'Master Typical Floor Architecture',
    carpetArea: '1,495 Sq.Ft. Carpet',
    balconyArea: '135 Sq.Ft. Deep Sky Balcony',
    orientation: 'Three-Side Open Panoramic Vastu',
    possession: 'Phased from Dec 2028',
    price: '₹2.52 Cr* Onwards',
    highlights: [
      'Official Master Plan Layout from lodhagroup.com Altero Wakad',
      'Dual balconies providing natural cross breeze and all-day sunlight',
      'Generous walk-in wardrobe niches and private dressing area',
      'Modern open-concept chef kitchen with separate utility yard'
    ],
    actualPlanImg: 'assets/plans/plan_3bed_study_master.webp',
    fallbackImg: 'https://www.lodhagroup.com/sites/default/files/styles/webp/public/2025-04/1994841998_Website_for_Lodha_Altero_3%20Bed%20Residence%20with%20Study-2000x1111_....jpg.webp?itok=7-hyswKq',
    schematicSvg: `
      <svg viewBox="0 0 600 450" class="w-full h-auto blueprint-bg border border-amber-600/30 p-4 shadow-inner">
        <rect x="20" y="20" width="560" height="410" fill="#fdfcf9" stroke="#b89047" stroke-width="2" />
        <rect x="40" y="40" width="300" height="200" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="190" y="130" text-anchor="middle" font-family="Jost" font-size="14" font-weight="600" fill="#1b2026">PALATIAL LIVING & ENTERTAINMENT</text>
        <text x="190" y="155" text-anchor="middle" font-family="Jost" font-size="12" fill="#7d5e23">27'0" x 15'6"</text>
        <rect x="40" y="240" width="300" height="65" fill="#f7f3ea" stroke="#b89047" stroke-dasharray="4" stroke-width="1.5" />
        <text x="190" y="280" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#9e7934">EXTENDED SUNSET DECK</text>
        <rect x="360" y="40" width="200" height="150" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="460" y="105" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">MASTER SUITE</text>
        <rect x="360" y="205" width="200" height="105" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="460" y="255" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">BEDROOM 2</text>
        <rect x="360" y="325" width="200" height="90" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="460" y="370" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">BEDROOM 3</text>
        <rect x="40" y="320" width="140" height="95" fill="#eef2f7" stroke="#b89047" stroke-width="1.5" />
        <text x="110" y="365" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">STUDY ROOM</text>
        <rect x="190" y="320" width="150" height="95" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="265" y="365" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">KITCHEN & YARD</text>
      </svg>
    `
  },
  '4bhk': {
    title: '4 BHK Imperial Sky Residence (Unit 1, Tower T3)',
    typology: '4 Bed + 4 Bath + Servant Quarters + Grand Terrace Deck',
    tower: 'Tower 3 • Signature Sky Residences',
    carpetArea: '1,559 – 2,105 Sq.Ft. Carpet',
    balconyArea: '180 Sq.Ft. Double-Width Balcony',
    orientation: 'Four-Side Panoramic Cross Ventilation',
    possession: 'Phased from Dec 2028',
    price: '₹3.15 Cr* Onwards (~$378K USD / ~1.39M AED)',
    highlights: [
      'Authentic Tower 3 Unit 1 Layout scraped from lodhagroup.com Altero',
      'Private elevator vestibule with secured entrance foyer',
      'Separate service entrance and domestic help quarters with attached washroom',
      'Ultra-luxury master bathroom with five-fixture fittings and rain shower'
    ],
    actualPlanImg: 'assets/plans/plan_4bed_unit1_t3.webp',
    fallbackImg: 'https://www.lodhagroup.com/sites/default/files/styles/webp/public/2025-03/Unit_1_4%20bed_T3_2000x1111px-16_0.jpg.webp?itok=Pl2hahon',
    schematicSvg: `
      <svg viewBox="0 0 600 450" class="w-full h-auto blueprint-bg border border-amber-600/30 p-4 shadow-inner">
        <rect x="20" y="20" width="560" height="410" fill="#fdfcf9" stroke="#b89047" stroke-width="2" />
        <rect x="40" y="40" width="310" height="210" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="195" y="130" text-anchor="middle" font-family="Jost" font-size="15" font-weight="600" fill="#1b2026">IMPERIAL LIVING & DINING</text>
        <text x="195" y="155" text-anchor="middle" font-family="Jost" font-size="12" fill="#7d5e23">30'0" x 16'6"</text>

        <rect x="40" y="250" width="310" height="70" fill="#f7f3ea" stroke="#b89047" stroke-dasharray="4" stroke-width="1.5" />
        <text x="195" y="290" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#9e7934">EXTENDED SUNSET SKY TERRACE</text>

        <rect x="40" y="330" width="130" height="85" fill="#f0ebe1" stroke="#8c7750" stroke-width="1" />
        <text x="105" y="370" text-anchor="middle" font-family="Jost" font-size="11" font-weight="600" fill="#444">STAFF QUARTERS<br/>& TOILET</text>

        <rect x="180" y="330" width="170" height="85" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="265" y="375" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">GOURMET KITCHEN</text>

        <rect x="370" y="40" width="190" height="140" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="465" y="100" text-anchor="middle" font-family="Jost" font-size="13" font-weight="600" fill="#1b2026">PRESIDENTIAL SUITE</text>

        <rect x="370" y="190" width="190" height="75" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="465" y="235" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">SUITE 2 (ENSUITE)</text>

        <rect x="370" y="275" width="190" height="70" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="465" y="315" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">SUITE 3</text>

        <rect x="370" y="355" width="190" height="60" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="465" y="390" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">GUEST SUITE 4</text>
      </svg>
    `
  },
  '5bhk': {
    title: '5 BHK & Duplex Sky Penthouses (Crown Residences)',
    typology: '5 Bed + 6 Bath + Private Plunge Pool + Butler Pantry + Home Cinema',
    tower: 'Towers 1, 2 & 3 • Top Floors (Levels 35–37)',
    carpetArea: '2,600 – 3,416 Sq.Ft. Carpet',
    balconyArea: '350 Sq.Ft. Private Rooftop Deck',
    orientation: '360-Degree Panoramic Penthouse Crown',
    possession: 'Phased from Dec 2028',
    price: '₹5.25 Cr* Onwards (~$630K USD / ~2.31M AED)',
    highlights: [
      'Limited-edition top floor penthouse with personal plunge pool & bar pavilion',
      'Private internal architectural staircase and private high-speed elevator',
      'Exclusive entertainment lounge, media room & family private retreat',
      'Customized Italian bespoke interiors and concierge Butler services'
    ],
    actualPlanImg: 'assets/plans/plan_4bed_unit1_t3.webp',
    fallbackImg: 'https://www.lodhagroup.com/sites/default/files/styles/webp/public/2025-03/Unit_1_4%20bed_T3_2000x1111px-16_0.jpg.webp?itok=Pl2hahon',
    schematicSvg: `
      <svg viewBox="0 0 600 450" class="w-full h-auto blueprint-bg border border-amber-600/30 p-4 shadow-inner">
        <rect x="20" y="20" width="560" height="410" fill="#fdfcf9" stroke="#b89047" stroke-width="2" />
        <rect x="40" y="40" width="340" height="180" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="210" y="115" text-anchor="middle" font-family="Jost" font-size="15" font-weight="600" fill="#1b2026">ROYAL SALON & FORMAL BANQUET</text>
        <text x="210" y="140" text-anchor="middle" font-family="Jost" font-size="12" fill="#7d5e23">36'0" x 20'0"</text>

        <rect x="40" y="230" width="340" height="90" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" />
        <text x="210" y="270" text-anchor="middle" font-family="Jost" font-size="14" font-weight="600" fill="#0369a1">PRIVATE SKY POOL & SUNBATHING PAVILION</text>

        <rect x="40" y="330" width="160" height="85" fill="#fbf0e4" stroke="#b89047" stroke-width="1.5" />
        <text x="120" y="375" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#8a6828">PRIVATE CINEMA / LOUNGE</text>

        <rect x="210" y="330" width="170" height="85" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="295" y="375" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">CHEF SHOW-KITCHEN</text>

        <rect x="395" y="40" width="170" height="150" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="480" y="105" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">MASTER ROYALE</text>
        <text x="480" y="125" text-anchor="middle" font-family="Jost" font-size="10" fill="#7d5e23">Walk-in Boutique + Spa</text>

        <rect x="395" y="200" width="170" height="105" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="480" y="255" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">SUITE 2 & 3</text>

        <rect x="395" y="315" width="170" height="100" fill="#ffffff" stroke="#8c7750" stroke-width="1.5" />
        <text x="480" y="365" text-anchor="middle" font-family="Jost" font-size="12" font-weight="600" fill="#1b2026">SUITE 4 & 5 (ENSUITE)</text>
      </svg>
    `
  }
};

let currentPlanKey = '3bhk';
let currentPlanMode = '3d'; // Default to certified official Lodha high-res plan
let planZoomLevel = 1;

function initFloorPlans() {
  const tabs = document.querySelectorAll('.plan-tab-btn');
  const titleEl = document.getElementById('planTitle');
  const typoEl = document.getElementById('planTypology');
  const carpetEl = document.getElementById('planCarpet');
  const deckEl = document.getElementById('planDeck');
  const orientEl = document.getElementById('planOrient');
  const possEl = document.getElementById('planPossession');
  const priceEl = document.getElementById('planPrice');
  const listEl = document.getElementById('planHighlights');
  const visualEl = document.getElementById('planVisualContainer');
  const modeBtnSchematic = document.getElementById('planModeSchematic');
  const modeBtn3D = document.getElementById('planMode3D');

  if (!tabs.length || !titleEl) return;

  function renderPlan() {
    const data = floorPlanData[currentPlanKey];
    if (!data) return;

    tabs.forEach(btn => {
      if (btn.dataset.plan === currentPlanKey) {
        btn.classList.add('glass-tab-active', 'border-amber-500', 'text-amber-300', 'shadow-lg');
        btn.classList.remove('bg-white', 'text-stone-700', 'border-stone-300');
      } else {
        btn.classList.remove('glass-tab-active', 'border-amber-500', 'text-amber-300', 'shadow-lg');
        btn.classList.add('bg-white', 'text-stone-700', 'border-stone-300');
      }
    });

    titleEl.textContent = data.title;
    typoEl.textContent = data.typology;
    carpetEl.textContent = data.carpetArea;
    deckEl.textContent = data.balconyArea;
    orientEl.textContent = data.orientation;
    possEl.textContent = data.possession;
    priceEl.textContent = data.price;

    listEl.innerHTML = data.highlights.map(item => `
      <li class="flex items-start gap-2.5">
        <span class="text-amber-600 mt-0.5 text-xs">✦</span>
        <span class="text-stone-700 text-sm leading-relaxed">${item}</span>
      </li>
    `).join('');

    // Reset zoom level on plan change
    planZoomLevel = 1;

    // Toggle between Blueprint Schematic and Actual Scraped Visual
    if (currentPlanMode === 'schematic') {
      visualEl.innerHTML = `
        <div class="relative w-full overflow-hidden flex items-center justify-center p-2 rounded">
          ${data.schematicSvg}
        </div>
      `;
      if (modeBtnSchematic && modeBtn3D) {
        modeBtnSchematic.classList.add('bg-amber-600', 'text-white', 'shadow-md');
        modeBtnSchematic.classList.remove('bg-stone-200', 'text-stone-700');
        modeBtn3D.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
        modeBtn3D.classList.add('bg-stone-200', 'text-stone-700');
      }
    } else {
      visualEl.innerHTML = `
        <div class="relative w-full h-[420px] flex items-center justify-center bg-stone-950 overflow-hidden border border-amber-500/30 rounded-lg group shadow-2xl">
          <!-- Glass Canvas Drafting Grid Background -->
          <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px); background-size: 24px 24px;"></div>
          
          <img id="planActiveImg" src="${data.actualPlanImg}" alt="Lodha Altero Wakad ${data.title} Sanctioned Floor Plan Layout" loading="lazy" decoding="async" class="max-w-full max-h-full object-contain filter drop-shadow-2xl transition-transform duration-300 cursor-zoom-in" style="transform: scale(${planZoomLevel});" onerror="this.onerror=null; this.src='${data.fallbackImg}';">
          
          <!-- Zoom & Lightbox Floating Glass Controls Dock -->
          <div class="absolute top-4 right-4 flex items-center gap-2 z-20">
            <button id="zoomInBtn" title="Zoom In" class="plan-control-btn text-sm font-bold">+</button>
            <button id="zoomOutBtn" title="Zoom Out" class="plan-control-btn text-sm font-bold">-</button>
            <button id="zoomResetBtn" title="Reset Zoom" class="plan-control-btn text-xs font-semibold">1:1</button>
            <button id="openPlanLightboxBtn" title="Fullscreen Lightbox" class="plan-control-btn text-xs">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
            </button>
          </div>

          <!-- Official Sanctioned Badge -->
          <div class="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 text-[11px] text-amber-300 border border-amber-500/30 rounded flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Official MahaRERA Certified Floor Plan Architecture</span>
          </div>

          <div class="absolute bottom-4 right-4 bg-stone-950/70 backdrop-blur-sm px-2.5 py-1 text-[10px] text-stone-400 border border-stone-800 rounded">
            Click image or [+] to inspect room measurements
          </div>
        </div>
      `;

      if (modeBtnSchematic && modeBtn3D) {
        modeBtn3D.classList.add('bg-amber-600', 'text-white', 'shadow-md');
        modeBtn3D.classList.remove('bg-stone-200', 'text-stone-700');
        modeBtnSchematic.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
        modeBtnSchematic.classList.add('bg-stone-200', 'text-stone-700');
      }

      // Bind zoom actions
      const img = document.getElementById('planActiveImg');
      const zIn = document.getElementById('zoomInBtn');
      const zOut = document.getElementById('zoomOutBtn');
      const zReset = document.getElementById('zoomResetBtn');
      const fullBtn = document.getElementById('openPlanLightboxBtn');

      if (zIn && img) {
        zIn.addEventListener('click', (e) => {
          e.stopPropagation();
          planZoomLevel = Math.min(planZoomLevel + 0.25, 2.5);
          img.style.transform = `scale(${planZoomLevel})`;
        });
      }

      if (zOut && img) {
        zOut.addEventListener('click', (e) => {
          e.stopPropagation();
          planZoomLevel = Math.max(planZoomLevel - 0.25, 0.75);
          img.style.transform = `scale(${planZoomLevel})`;
        });
      }

      if (zReset && img) {
        zReset.addEventListener('click', (e) => {
          e.stopPropagation();
          planZoomLevel = 1;
          img.style.transform = `scale(1)`;
        });
      }

      if (fullBtn) {
        fullBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const lightboxModal = document.getElementById('lightboxModal');
          const lightboxImg = document.getElementById('lightboxImg');
          const lightboxCaption = document.getElementById('lightboxCaption');
          if (lightboxModal && lightboxImg) {
            lightboxImg.src = data.actualPlanImg;
            if (lightboxCaption) lightboxCaption.innerText = `${data.title} - Official Sanctioned Plan`;
            lightboxModal.classList.add('active');
          }
        });
      }

      if (img) {
        img.addEventListener('click', () => {
          const lightboxModal = document.getElementById('lightboxModal');
          const lightboxImg = document.getElementById('lightboxImg');
          const lightboxCaption = document.getElementById('lightboxCaption');
          if (lightboxModal && lightboxImg) {
            lightboxImg.src = data.actualPlanImg;
            if (lightboxCaption) lightboxCaption.innerText = `${data.title} - Official Sanctioned Plan`;
            lightboxModal.classList.add('active');
          }
        });
      }
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentPlanKey = tab.dataset.plan;
      renderPlan();
    });
  });

  if (modeBtnSchematic) {
    modeBtnSchematic.addEventListener('click', () => {
      currentPlanMode = 'schematic';
      renderPlan();
    });
  }

  if (modeBtn3D) {
    modeBtn3D.addEventListener('click', () => {
      currentPlanMode = '3d';
      renderPlan();
    });
  }

  // Typology Compare Modal Handlers
  const compareBtn = document.getElementById('openComparePlansBtn');
  const compareModal = document.getElementById('planCompareModal');
  const compareClose = document.getElementById('planCompareClose');
  const switchPlanBtns = document.querySelectorAll('[data-switch-plan]');

  if (compareBtn && compareModal) {
    compareBtn.addEventListener('click', () => {
      compareModal.classList.add('active');
    });
  }

  if (compareClose && compareModal) {
    compareClose.addEventListener('click', () => {
      compareModal.classList.remove('active');
    });
  }

  if (compareModal) {
    compareModal.addEventListener('click', (e) => {
      if (e.target === compareModal) compareModal.classList.remove('active');
    });
  }

  switchPlanBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const planKey = btn.dataset.switchPlan;
      if (planKey) {
        currentPlanKey = planKey;
        renderPlan();
        if (compareModal) compareModal.classList.remove('active');
        const residencesSection = document.getElementById('residences');
        if (residencesSection) {
          const currentNavH = document.getElementById('mainLuxuryNavbar')?.offsetHeight || 64;
          const targetOffset = residencesSection.getBoundingClientRect().top + window.pageYOffset - (currentNavH + 16);
          window.fluidScrollTo(targetOffset, 600);
        }
      }
    });
  });

  // Global Plan Viewport Zoom Controls
  const pzIn = document.getElementById('planZoomInBtn');
  const pzOut = document.getElementById('planZoomOutBtn');
  const pzReset = document.getElementById('planZoomResetBtn');
  const pzFull = document.getElementById('planFullscreenBtn');

  if (pzIn) {
    pzIn.addEventListener('click', () => {
      planZoomLevel = Math.min(planZoomLevel + 0.25, 2.5);
      if (visualEl) visualEl.style.transform = `scale(${planZoomLevel})`;
    });
  }
  if (pzOut) {
    pzOut.addEventListener('click', () => {
      planZoomLevel = Math.max(planZoomLevel - 0.25, 0.75);
      if (visualEl) visualEl.style.transform = `scale(${planZoomLevel})`;
    });
  }
  if (pzReset) {
    pzReset.addEventListener('click', () => {
      planZoomLevel = 1;
      if (visualEl) visualEl.style.transform = `scale(1)`;
    });
  }
  if (pzFull) {
    pzFull.addEventListener('click', () => {
      const data = floorPlanData[currentPlanKey];
      const lightboxModal = document.getElementById('lightboxModal');
      const lightboxImg = document.getElementById('lightboxImg');
      const lightboxCaption = document.getElementById('lightboxCaption');
      if (data && lightboxModal && lightboxImg) {
        lightboxImg.src = data.actualPlanImg;
        if (lightboxCaption) lightboxCaption.innerText = `${data.title} - Official Sanctioned Plan`;
        lightboxModal.classList.add('active');
      }
    });
  }

  renderPlan();
}

/* ============================================================
   6. Rooftop Sanctuary Experience Switcher
   ============================================================ */
const rooftopData = {
  pool: {
    title: 'Infinity Sky Pool & Sunken Loungers',
    desc: 'An exquisite 50-meter heated infinity pool positioned G+37 floors above ground, offering uninterrupted horizon views, heated jacuzzis, and submerged daybeds under the starry Pune skies.',
    features: ['50m Olympic-length sky pool', 'Heated jacuzzi spa with hydro jets', 'Dedicated kids splash zone', 'Towel valet & pool lounge service'],
    image: 'assets/gallery/rooftop_pool.jpg',
    fallback: 'https://www.lodhagroup.com/sites/default/files/gallery/grid/1980265094_Lodha_Wakad_Website_Images_Amenities_SC_1000x480-px-07.jpg'
  },
  cafe: {
    title: 'Sky Lounge, Café & Co-Working Pods',
    desc: 'A sophisticated work-from-anywhere rooftop sanctuary featuring high-speed 5G Wi-Fi, artisanal barista coffee bar, private Zoom pods, and breezy open-air conference banquettes.',
    features: ['Artisanal espresso & beverage bar', 'Private acoustic meeting pods', 'High-speed business fiber connection', 'Evening cocktail lounge ambiance'],
    image: 'assets/gallery/sky_cafe.jpg',
    fallback: 'https://www.lodhagroup.com/sites/default/files/gallery/grid/1980265094_Lodha_Wakad_Website_Images_Amenities_SC_1000x480-px-01.jpg'
  },
  gym: {
    title: 'Skyline Fitness Center & Health Club',
    desc: 'India’s highest fitness floor in Wakad, featuring advanced TechnoGym biomechanical cardio stations, Olympic free weights, and panoramic floor-to-ceiling sunrise vistas.',
    features: ['TechnoGym cardio & strength lines', 'Resident personal trainers', 'Steam and restorative saunas', 'Skyline view workout decks'],
    image: 'assets/gallery/fitness_gym.jpg',
    fallback: 'https://www.lodhagroup.com/sites/default/files/gallery/grid/1980265094_Lodha_Wakad_Website_Images_Amenities_SC_1000x480-px-03.jpg'
  },
  yoga: {
    title: 'Sky Yoga Terrace & Zen Sanctuary',
    desc: 'A tranquil open-air wooden deck suspended above the morning mist for sunrise sun salutations, guided mindfulness workshops, and quiet evening reflection.',
    features: ['Sunrise yoga & meditation deck', 'Acupressure pebble walkway', 'Aromatherapy herb garden', 'Sound bath & chime pavilion'],
    image: 'assets/gallery/yoga_terrace.jpg',
    fallback: 'https://www.lodhagroup.com/sites/default/files/gallery/grid/1980265094_Lodha_Wakad_Website_Images_Amenities_SC_1000x480-px-09.jpg'
  },
  padel: {
    title: 'Rooftop Padel & Multi-Sports Arena',
    desc: 'India’s first high-altitude Padel Court in Wakad, alongside half-basketball and pickleball setups, complete with high-tech turf, protective glass enclosures, and floodlit night playing.',
    features: ['High-altitude tournament Padel Court', 'Pickleball & badminton court', 'Floodlights for midnight matches', 'Spectator deck with panorama views'],
    image: 'assets/gallery/amenity_08.jpg',
    fallback: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80'
  },
  stargazing: {
    title: 'Celestial Observatory & Sunset Amphitheatre',
    desc: 'Equipped with computerized celestial telescopes and tiered velvet-finished seating for star-watching sessions, sunset wine tastings, and bespoke open-air acoustic evenings.',
    features: ['Professional astronomical telescope', 'Acoustic evening amphitheatre', 'Sunken fire pit conversation corners', 'Sunset viewing pavilion'],
    image: 'assets/gallery/amenity_02.jpg',
    fallback: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
  }
};

function initRooftopTabs() {
  const tabs = document.querySelectorAll('.rooftop-tab-btn');
  const titleEl = document.getElementById('rooftopTitle');
  const descEl = document.getElementById('rooftopDesc');
  const listEl = document.getElementById('rooftopList');
  const imgEl = document.getElementById('rooftopImg');

  if (!tabs.length || !titleEl) return;

  function setRooftop(key) {
    const item = rooftopData[key];
    if (!item) return;

    tabs.forEach(btn => {
      if (btn.dataset.roof === key) {
        btn.classList.add('glass-tab-active');
      } else {
        btn.classList.remove('glass-tab-active');
      }
    });

    titleEl.textContent = item.title;
    descEl.textContent = item.desc;
    imgEl.src = item.image;
    imgEl.alt = item.title;

    listEl.innerHTML = item.features.map(f => `
      <li class="flex items-center gap-2">
        <span class="text-amber-600 text-xs">◆</span>
        <span class="text-stone-700 text-sm font-medium">${f}</span>
      </li>
    `).join('');
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => setRooftop(btn.dataset.roof));
  });

  setRooftop('pool');
}

/* ============================================================
   7. Location Connectivity Categories Switcher
   ============================================================ */
const locationCategoryData = {
  it: [
    { name: 'Hinjewadi Rajiv Gandhi IT Park (Phase 1, 2 & 3)', dist: '4.5 Km', time: '10 Mins', desc: 'Home to Infosys, TCS, Wipro, Cognizant, and 300+ tech leaders', link: '/transit/hinjewadi-phase-1-to-lodha-altero-wakad' },
    { name: 'Balewadi Tech & Financial District', dist: '3.8 Km', time: '8 Mins', desc: 'Emerging corporate hub along Mumbai-Bengaluru bypass', link: '/transit/balewadi-high-street-to-lodha-altero-wakad' },
    { name: 'Talawade IT Park', dist: '12.0 Km', time: '22 Mins', desc: 'Key industrial and enterprise tech cluster' },
    { name: 'Panchshil Business Park (Baner)', dist: '6.2 Km', time: '12 Mins', desc: 'A-Grade multinational office headquarters', link: '/transit/baner-pashan-link-road-to-lodha-altero-wakad' }
  ],
  transit: [
    { name: 'Mumbai-Pune Expressway (Wakad Toll Plaza)', dist: '1.5 Km', time: '4 Mins', desc: 'Direct seamless gateway to Navi Mumbai & South Mumbai', link: '/transit/mumbai-pune-expressway-to-lodha-altero-wakad' },
    { name: 'Mumbai-Bangalore Highway (NH-48)', dist: '800 Mtrs', time: '2 Mins', desc: 'Immediate arterial connectivity across western corridor', link: '/transit/hinjewadi-phase-1-to-lodha-altero-wakad' },
    { name: 'Wakad Metro Station (Proposed Line 3)', dist: '1.2 Km', time: '3 Mins', desc: 'Direct rapid transit connection to Shivajinagar & Civil Court', link: '/transit/hinjewadi-phase-2-to-lodha-altero-wakad' },
    { name: 'Pune International Airport (Lohegaon)', dist: '22.0 Km', time: '40 Mins', desc: 'Swift access via Hinjewadi-Aundh link road', link: '/transit/pune-airport-lohegaon-to-lodha-altero-wakad' }
  ],
  retail: [
    { name: 'Croma Electronics Wakad', dist: '50 Mtrs', time: '1 Min Walk', desc: 'Directly adjacent to the property for unmatched convenience' },
    { name: 'Phoenix Mall of the Millennium (Wakad)', dist: '2.4 Km', time: '6 Mins', desc: 'Pune’s premier luxury mall with Zara, H&M, PVR INOX & fine dining', link: '/transit/phoenix-mall-millennium-to-lodha-altero-wakad' },
    { name: 'Balewadi High Street', dist: '4.5 Km', time: '10 Mins', desc: 'High-end nightlife, breweries, and gourmet restaurants', link: '/transit/balewadi-high-street-to-lodha-altero-wakad' },
    { name: 'Westend Mall (Aundh)', dist: '7.5 Km', time: '15 Mins', desc: 'Cinepolis IMAX, fashion boutiques and dining hub' }
  ],
  education: [
    { name: 'Indira National School & Institutes', dist: '2.0 Km', time: '5 Mins', desc: 'Premier CBSE schooling and higher management institute' },
    { name: 'The Orchid School (Baner)', dist: '4.8 Km', time: '10 Mins', desc: 'Recognized international curriculum CBSE institution' },
    { name: 'D.Y. Patil International University', dist: '4.0 Km', time: '8 Mins', desc: 'Top-tier engineering, architecture, and medical faculties' },
    { name: 'EuroSchool Wakad & Vibgyor Roots', dist: '1.8 Km', time: '4 Mins', desc: 'Modern international schooling with state-of-the-art sports' }
  ],
  healthcare: [
    { name: 'Jupiter Hospital (Baner)', dist: '5.2 Km', time: '11 Mins', desc: 'Multi-super-specialty quaternary care hospital' },
    { name: 'Ruby Hall Clinic Hinjewadi', dist: '4.0 Km', time: '9 Mins', desc: '24/7 advanced emergency & critical medical care' },
    { name: 'Surya Mother & Child Super Specialty', dist: '1.5 Km', time: '4 Mins', desc: 'Premier pediatric & maternity emergency hospital' },
    { name: 'Lifepoint Multispecialty Hospital', dist: '2.1 Km', time: '5 Mins', desc: 'Comprehensive multi-specialty wellness centre' }
  ]
};

function initLocationTabs() {
  const tabs = document.querySelectorAll('.loc-tab-btn');
  const container = document.getElementById('locationGrid');

  if (!tabs.length || !container) return;

  function renderCategory(cat) {
    const list = locationCategoryData[cat] || [];
    tabs.forEach(t => {
      if (t.dataset.cat === cat) {
        t.classList.add('glass-tab-active');
      } else {
        t.classList.remove('glass-tab-active');
      }
    });

    container.innerHTML = list.map(item => `
      <div class="glass-panel-light glass-interactive boxing-card boxing-beam boxing-corners p-6 shadow-lg shadow-amber-950/5 transition-all duration-300 group tilt-card flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="inline-block bg-amber-500/15 text-amber-800 border border-amber-600/30 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded">
              ${item.dist}
            </span>
            <span class="text-stone-500 text-xs font-medium flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${item.time}
            </span>
          </div>
          <h4 class="font-serif text-lg font-semibold text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
            ${item.name}
          </h4>
          <p class="text-stone-600 text-xs leading-relaxed font-light mb-3">
            ${item.desc}
          </p>
        </div>
        ${item.link ? `
        <div class="pt-2 border-t border-stone-200/60 mt-1">
          <a href="${item.link}" class="inline-flex items-center gap-1 text-[11px] text-amber-900 font-bold hover:text-amber-700 transition-colors">
            <span>Transit Intelligence Guide</span>
            <span>&rarr;</span>
          </a>
        </div>
        ` : ''}
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => renderCategory(tab.dataset.cat));
  });

  renderCategory('it');
}

/* ============================================================
   8. Interactive Financial Hub (EMI & All-Inclusive Cost Sheet)
   ============================================================ */
function initFinancialHub() {
  const loanSlider = document.getElementById('emiLoanSlider');
  const loanText = document.getElementById('emiLoanVal');
  const rateSlider = document.getElementById('emiRateSlider');
  const rateText = document.getElementById('emiRateVal');
  const tenureSlider = document.getElementById('emiTenureSlider');
  const tenureText = document.getElementById('emiTenureVal');

  const monthlyEmiDisplay = document.getElementById('emiMonthlyVal');
  const principalDisplay = document.getElementById('emiPrincipalVal');
  const interestDisplay = document.getElementById('emiInterestVal');
  const totalDisplay = document.getElementById('emiTotalVal');
  const barPrincipal = document.getElementById('emiBarPrincipal');
  const barInterest = document.getElementById('emiBarInterest');

  // Mode Switcher Elements
  const btnModeEmi = document.getElementById('calcModeEmi');
  const btnModeCost = document.getElementById('calcModeCost');
  const emiControls = document.getElementById('calcEmiControls');
  const costControls = document.getElementById('calcCostControls');
  const emiResultView = document.getElementById('emiResultView');
  const costSheetResultView = document.getElementById('costSheetResultView');
  const calcActionBtn = document.getElementById('calcActionBtn');
  const calcActionText = document.getElementById('calcActionText');

  // Cost Sheet Elements
  const costTypologyName = document.getElementById('costTypologyName');
  const costTotalVal = document.getElementById('costTotalVal');
  const costBaseVal = document.getElementById('costBaseVal');
  const costStampVal = document.getElementById('costStampVal');
  const costCessVal = document.getElementById('costCessVal');
  const costGstVal = document.getElementById('costGstVal');

  if (!loanSlider) return;

  let currentMode = 'emi';
  let currentBasePrice = 20900000;
  let currentTypologyTitle = '3 BHK Grande Sky Residence';

  function calculateEmi() {
    const P = parseFloat(loanSlider.value) * 100000;
    const annualRate = parseFloat(rateSlider.value);
    const r = (annualRate / 12) / 100;
    const n = parseInt(tenureSlider.value) * 12;

    loanText.textContent = `₹${parseFloat(loanSlider.value).toFixed(1)} Lakhs`;
    rateText.textContent = `${annualRate.toFixed(1)}%`;
    tenureText.textContent = `${tenureSlider.value} Years`;

    let emi = 0;
    if (r > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = P / n;
    }

    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    const principalPct = Math.round((P / totalAmount) * 100);
    const interestPct = 100 - principalPct;

    monthlyEmiDisplay.textContent = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    principalDisplay.textContent = `₹${(P / 10000000).toFixed(2)} Cr`;
    interestDisplay.textContent = `₹${(totalInterest / 10000000).toFixed(2)} Cr`;
    totalDisplay.textContent = `₹${(totalAmount / 10000000).toFixed(2)} Cr`;

    if (barPrincipal && barInterest) {
      barPrincipal.style.width = `${principalPct}%`;
      barInterest.style.width = `${interestPct}%`;
    }
  }

  function calculateCostSheet() {
    const base = currentBasePrice;
    const stampDuty = base * 0.07;
    const metroCess = base * 0.01;
    const gst = base * 0.05;
    const registration = 30000;
    const societyDeposit = 150000;
    const total = base + stampDuty + metroCess + gst + registration + societyDeposit;

    if (costTypologyName) costTypologyName.textContent = currentTypologyTitle;
    if (costBaseVal) costBaseVal.textContent = `₹${(base / 10000000).toFixed(2)} Cr`;
    if (costStampVal) costStampVal.textContent = `₹${(stampDuty / 100000).toFixed(2)} Lakhs`;
    if (costCessVal) costCessVal.textContent = `₹${(metroCess / 100000).toFixed(2)} Lakhs`;
    if (costGstVal) costGstVal.textContent = `₹${(gst / 100000).toFixed(2)} Lakhs`;
    if (costTotalVal) costTotalVal.textContent = `₹${(total / 10000000).toFixed(2)} Cr*`;
  }

  function setMode(mode) {
    currentMode = mode;
    if (mode === 'emi') {
      if (btnModeEmi) {
        btnModeEmi.classList.add('active', 'bg-amber-800', 'text-white', 'font-bold');
        btnModeEmi.classList.remove('text-stone-700');
      }
      if (btnModeCost) {
        btnModeCost.classList.remove('active', 'bg-amber-800', 'text-white', 'font-bold');
        btnModeCost.classList.add('text-stone-700');
      }
      if (emiControls) emiControls.classList.remove('hidden');
      if (costControls) costControls.classList.add('hidden');
      if (emiResultView) emiResultView.classList.remove('hidden');
      if (costSheetResultView) costSheetResultView.classList.add('hidden');
      if (calcActionText) calcActionText.textContent = 'Request Bank Sanction & Payment Plan';
      calculateEmi();
    } else {
      if (btnModeCost) {
        btnModeCost.classList.add('active', 'bg-amber-800', 'text-white', 'font-bold');
        btnModeCost.classList.remove('text-stone-700');
      }
      if (btnModeEmi) {
        btnModeEmi.classList.remove('active', 'bg-amber-800', 'text-white', 'font-bold');
        btnModeEmi.classList.add('text-stone-700');
      }
      if (costControls) costControls.classList.remove('hidden');
      if (emiControls) emiControls.classList.add('hidden');
      if (costSheetResultView) costSheetResultView.classList.remove('hidden');
      if (emiResultView) emiResultView.classList.add('hidden');
      if (calcActionText) calcActionText.textContent = 'Share Cost Sheet Breakdown on WhatsApp (+91 77440 09295)';
      calculateCostSheet();
    }
  }

  if (btnModeEmi && btnModeCost) {
    btnModeEmi.addEventListener('click', () => setMode('emi'));
    btnModeCost.addEventListener('click', () => setMode('cost'));
  }

  // Budget Presets Handler
  const budgetBtns = document.querySelectorAll('.emi-budget-btn');
  budgetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      budgetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const budgetVal = parseFloat(btn.dataset.budget);
      if (!isNaN(budgetVal)) {
        loanSlider.value = budgetVal;
      }
      if (btn.dataset.base) {
        currentBasePrice = parseFloat(btn.dataset.base);
      }
      if (btn.dataset.name) {
        currentTypologyTitle = btn.dataset.name;
      }
      if (currentMode === 'emi') {
        calculateEmi();
      } else {
        calculateCostSheet();
      }
    });
  });

  // Action Button Handler
  if (calcActionBtn) {
    calcActionBtn.addEventListener('click', (e) => {
      if (currentMode === 'cost') {
        e.preventDefault();
        e.stopPropagation();
        const base = currentBasePrice;
        const stampDuty = base * 0.07;
        const metroCess = base * 0.01;
        const gst = base * 0.05;
        const total = base + stampDuty + metroCess + gst + 30000 + 150000;
        const msg = `Hello Lodha Altero Sales Team, please share the official cost sheet and allotment details for ${currentTypologyTitle}:
- Base Price: ₹${(base / 10000000).toFixed(2)} Cr
- Stamp Duty (7%): ₹${(stampDuty / 100000).toFixed(2)} Lakhs
- Metro Cess (1%): ₹${(metroCess / 100000).toFixed(2)} Lakhs
- GST (5%): ₹${(gst / 100000).toFixed(2)} Lakhs
- Registration: ₹30,000
- Estimated Total On-Road: ₹${(total / 10000000).toFixed(2)} Cr
MahaRERA: P52100079692.`;
        window.open(`https://wa.me/917744009295?text=${encodeURIComponent(msg)}`, '_blank');
      }
    });
  }

  // Quick Tenure Buttons Handler
  const tenureBtns = document.querySelectorAll('.emi-tenure-btn');
  tenureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tenureVal = parseInt(btn.dataset.tenure, 10);
      if (!isNaN(tenureVal)) {
        tenureSlider.value = tenureVal;
        calculateEmi();
      }
    });
  });

  loanSlider.addEventListener('input', () => {
    budgetBtns.forEach(b => b.classList.remove('active'));
    calculateEmi();
  });
  rateSlider.addEventListener('input', calculateEmi);
  tenureSlider.addEventListener('input', () => {
    const currentTenure = parseInt(tenureSlider.value, 10);
    tenureBtns.forEach(b => {
      if (parseInt(b.dataset.tenure, 10) === currentTenure) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    calculateEmi();
  });

  calculateEmi();
  calculateCostSheet();
}

/* ============================================================
   15. Global Multi-Currency Purchasing Engine (INR, USD, AED, GBP, SGD)
   ============================================================ */
function initCurrencyConverter() {
  const RATES = {
    INR: { rate: 1, symbol: '₹', code: 'INR' },
    USD: { rate: 86.5, symbol: '$', code: 'USD' },
    AED: { rate: 23.5, symbol: 'د.إ', code: 'AED', suffix: ' AED' },
    GBP: { rate: 110.0, symbol: '£', code: 'GBP' },
    SGD: { rate: 64.5, symbol: 'S$', code: 'SGD' }
  };

  let activeCurrency = 'INR';

  // Check geo-meta tag injected by edge worker
  const geoMeta = document.querySelector('meta[name="viewer-country"]');
  const country = geoMeta ? geoMeta.getAttribute('content') : 'IN';
  if (country === 'US') activeCurrency = 'USD';
  else if (country === 'AE') activeCurrency = 'AED';
  else if (country === 'GB') activeCurrency = 'GBP';
  else if (country === 'SG') activeCurrency = 'SGD';

  function formatPrice(inrVal, currencyCode) {
    if (currencyCode === 'INR') {
      const cr = (inrVal / 10000000).toFixed(2);
      return `₹${cr} Cr* Onwards`;
    }
    const conf = RATES[currencyCode];
    const converted = Math.round(inrVal / conf.rate);
    const cr = (inrVal / 10000000).toFixed(2);
    if (conf.suffix) {
      return `${converted.toLocaleString('en-US')}${conf.suffix}* (₹${cr} Cr)`;
    }
    return `${conf.symbol}${converted.toLocaleString('en-US')}* (₹${cr} Cr)`;
  }

  function updateAllPrices(code) {
    activeCurrency = code;
    document.querySelectorAll('.currency-btn').forEach(btn => {
      if (btn.dataset.currency === code) {
        btn.classList.add('active', 'bg-amber-800', 'text-white', 'font-bold');
        btn.classList.remove('text-stone-700');
      } else {
        btn.classList.remove('active', 'bg-amber-800', 'text-white', 'font-bold');
        btn.classList.add('text-stone-700');
      }
    });

    document.querySelectorAll('.price-val[data-base-price]').forEach(el => {
      const base = parseFloat(el.dataset.basePrice);
      if (!isNaN(base)) {
        el.textContent = formatPrice(base, code);
      }
    });
  }

  document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.currency;
      if (RATES[code]) {
        updateAllPrices(code);
      }
    });
  });

  if (activeCurrency !== 'INR') {
    updateAllPrices(activeCurrency);
  }
}

/* ============================================================
   16. Progressive Web App (PWA) Offline Service Worker
   ============================================================ */
function initPwaServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('[PWA] Service Worker registered:', reg.scope);
      }).catch((err) => {
        console.warn('[PWA] Service Worker registration failed:', err);
      });
    });
  }
}

/* ============================================================
   9. Gallery Category Filter & Advanced Carousel Lightbox
   ============================================================ */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxIndexPill = document.getElementById('lightboxIndexPill');
  const lightboxZoomToggle = document.getElementById('lightboxZoomToggle');

  let activeList = [];
  let currentIndex = 0;
  let isZoomed = false;

  function refreshActiveList() {
    activeList = [];
    galleryItems.forEach(item => {
      if (item.style.display !== 'none') {
        const img = item.querySelector('img');
        const caption = item.querySelector('h5')?.innerText || 'Lodha Altero Wakad';
        activeList.push({ src: img.src, caption });
      }
    });
    if (!activeList.length) {
      activeList = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        caption: item.querySelector('h5')?.innerText || 'Lodha Altero Wakad'
      }));
    }
  }

  function displayLightboxItem(index) {
    if (!activeList.length) refreshActiveList();
    if (index < 0) index = activeList.length - 1;
    if (index >= activeList.length) index = 0;
    currentIndex = index;

    const item = activeList[currentIndex];
    if (lightboxImg && item) {
      lightboxImg.style.opacity = '0';
      lightboxImg.style.transform = 'scale(0.96)';
      
      setTimeout(() => {
        lightboxImg.src = item.src;
        if (lightboxCaption) lightboxCaption.innerText = item.caption;
        if (lightboxIndexPill) lightboxIndexPill.innerText = `Photo ${currentIndex + 1} of ${activeList.length}`;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = isZoomed ? 'scale(1.5)' : 'scale(1)';
      }, 120);
    }
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('glass-tab-active', 'border-amber-600', 'shadow-md');
        b.classList.add('bg-white', 'text-stone-700', 'border-stone-200');
        const badge = b.querySelector('span:last-child');
        if (badge) {
          badge.className = 'px-1.5 py-0.5 rounded-full text-[10px] bg-stone-200 text-stone-700 font-mono';
        }
      });
      btn.classList.add('glass-tab-active', 'border-amber-600', 'shadow-md');
      btn.classList.remove('bg-white', 'text-stone-700', 'border-stone-200');
      const activeBadge = btn.querySelector('span:last-child');
      if (activeBadge) {
        activeBadge.className = 'px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-800 font-mono';
      }

      galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          item.classList.add('reveal-zoom-in', 'reveal-visible');
        } else {
          item.style.display = 'none';
        }
      });

      refreshActiveList();
    });
  });

  refreshActiveList();

  // Click on gallery item to launch lightbox
  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      refreshActiveList();
      const clickedImg = item.querySelector('img')?.src;
      const targetIdx = activeList.findIndex(entry => entry.src === clickedImg);
      currentIndex = targetIdx !== -1 ? targetIdx : idx;
      isZoomed = false;
      if (lightboxImg) lightboxImg.classList.remove('lightbox-img-zoom');
      displayLightboxItem(currentIndex);
      if (lightboxModal) lightboxModal.classList.add('active');
    });
  });

  // Next / Prev Actions
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      displayLightboxItem(currentIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      displayLightboxItem(currentIndex + 1);
    });
  }

  // Zoom Toggle
  if (lightboxZoomToggle) {
    lightboxZoomToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      isZoomed = !isZoomed;
      if (lightboxImg) {
        if (isZoomed) {
          lightboxImg.classList.add('lightbox-img-zoom');
        } else {
          lightboxImg.classList.remove('lightbox-img-zoom');
        }
      }
    });
  }

  // Close handlers
  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      isZoomed = false;
      if (lightboxImg) lightboxImg.classList.remove('lightbox-img-zoom');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        isZoomed = false;
        if (lightboxImg) lightboxImg.classList.remove('lightbox-img-zoom');
      }
    });
  }

  // Keyboard Navigation: ArrowLeft, ArrowRight, Escape
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') {
      displayLightboxItem(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      displayLightboxItem(currentIndex + 1);
    } else if (e.key === 'Escape') {
      lightboxModal.classList.remove('active');
      isZoomed = false;
      if (lightboxImg) lightboxImg.classList.remove('lightbox-img-zoom');
    }
  });

  // Mobile Touch Swipe Handling
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 45;
      if (touchEndX < touchStartX - threshold) {
        // Swiped Left -> Next
        displayLightboxItem(currentIndex + 1);
      } else if (touchEndX > touchStartX + threshold) {
        // Swiped Right -> Prev
        displayLightboxItem(currentIndex - 1);
      }
    }
  }
}

/* ============================================================
   10. Lead Modals (Enquiry & Brochure)
   ============================================================ */
function initModals() {
  const enquiryTriggers = document.querySelectorAll('[data-open-enquiry]');
  const brochureTriggers = document.querySelectorAll('[data-open-brochure]');
  const chauffeurTriggers = document.querySelectorAll('[data-open-chauffeur]');
  const enquiryModal = document.getElementById('enquiryModal');
  const brochureModal = document.getElementById('brochureModal');
  const chauffeurModal = document.getElementById('chauffeurModal');
  const closeBtns = document.querySelectorAll('.modal-close');
  const closeChauffeurBtns = document.querySelectorAll('[data-close-chauffeur]');

  enquiryTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (enquiryModal) enquiryModal.classList.add('active');
    });
  });

  brochureTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (brochureModal) brochureModal.classList.add('active');
    });
  });

  chauffeurTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (chauffeurModal) chauffeurModal.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (enquiryModal) enquiryModal.classList.remove('active');
      if (brochureModal) brochureModal.classList.remove('active');
    });
  });

  closeChauffeurBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (chauffeurModal) chauffeurModal.classList.remove('active');
    });
  });

  [enquiryModal, brochureModal, chauffeurModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

/* ============================================================
   11. Mobile Hamburger Navigation
   ============================================================ */
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileDrawer) return;

  const openDrawer = () => {
    mobileDrawer.classList.remove('translate-x-full');
    mobileDrawer.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.add('translate-x-full');
    mobileDrawer.classList.remove('drawer-open');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Tap outside backdrop to close
  mobileDrawer.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      closeDrawer();
    }
  });
}

/* ============================================================
   12. Form Submissions with Toast Feedback
   ============================================================ */
function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
    <span class="toast-content"></span>
  `;
  const span = toast.querySelector('.toast-content');
  if (span) span.textContent = String(message || '');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

function initFormHandlers() {
  const forms = document.querySelectorAll('form[data-ajax-form]');
  const pageLoadedTime = Date.now();

  // Populate any timestamp fields
  document.querySelectorAll('.form-timestamp').forEach(input => {
    input.value = pageLoadedTime;
  });

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Anti-Bot Honeypot Check
      const honeypot = form.querySelector('input[name="website_security_token"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot submission blocked via honeypot.');
        return;
      }

      // 2. Minimum Submission Time Delay (Blocks sub-second bot automated submissions)
      if (Date.now() - pageLoadedTime < 1200) {
        showToast('Please wait a moment before submitting.');
        return;
      }

      // 3. Extract & Deep-Sanitize User Inputs
      const sanitizeInput = (val, maxLen = 100) => {
        return String(val || '')
          .replace(/<[^>]*>?/gm, '')
          .replace(/[<>\"\'&;`\\]/g, '')
          .replace(/[\r\n\t]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, maxLen);
      };

      const nameInput = form.querySelector('input[type="text"]:not([name="website_security_token"]):not([name="company_website"]):not([name="fax_number"])');
      const phoneInput = form.querySelector('input[type="tel"]');
      const emailInput = form.querySelector('input[type="email"]');
      const configSelect = form.querySelector('select');
      const intentInput = form.querySelector('input[name="intent"]') ? form.querySelector('input[name="intent"]').value : form.dataset.intent;
      const modalHeading = form.closest('.modal-content')?.querySelector('h2, h3')?.innerText;
      const formHeading = form.querySelector('h2, h3')?.innerText;

      const rawName = nameInput ? nameInput.value : 'Valued Patron';
      const rawPhone = phoneInput ? phoneInput.value : '';
      const rawEmail = emailInput ? emailInput.value.trim().toLowerCase() : '';
      const preference = configSelect ? configSelect.value : '3/4 BHK Sky Residence';
      const intent = intentInput || modalHeading || formHeading || 'Schedule VIP Site Visit & Request Cost Sheet';

      const cleanName = sanitizeInput(rawName, 60) || 'Valued Patron';
      const cleanPhoneDigits = rawPhone.replace(/\D/g, '').slice(0, 15);
      
      // Strict RFC-5322 basic pattern validation to prevent email header injection
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      const cleanEmail = (emailRegex.test(rawEmail) && rawEmail.length <= 100) ? rawEmail : '';
      const cleanPreference = sanitizeInput(preference, 60);
      const cleanIntent = sanitizeInput(intent, 100);

      // 4. Smart Domestic & International Phone Validation
      if (cleanPhoneDigits.length < 8) {
        showToast('Please provide a valid mobile or international phone number.');
        if (phoneInput) phoneInput.focus();
        return;
      }
      
      // Intelligent International & Domestic Phone Standardizer
      let validPhone = cleanPhoneDigits;
      if (cleanPhoneDigits.length === 10 && /^[6-9]/.test(cleanPhoneDigits)) {
        validPhone = `+91 ${cleanPhoneDigits}`;
      } else if (cleanPhoneDigits.startsWith('91') && cleanPhoneDigits.length === 12) {
        validPhone = `+91 ${cleanPhoneDigits.slice(2)}`;
      } else if (cleanPhoneDigits.startsWith('1') && cleanPhoneDigits.length === 11) {
        validPhone = `+1 ${cleanPhoneDigits.slice(1)}`;
      } else if (cleanPhoneDigits.startsWith('971') && cleanPhoneDigits.length >= 11) {
        validPhone = `+971 ${cleanPhoneDigits.slice(3)}`;
      } else if (cleanPhoneDigits.startsWith('44') && cleanPhoneDigits.length >= 11) {
        validPhone = `+44 ${cleanPhoneDigits.slice(2)}`;
      } else if (cleanPhoneDigits.startsWith('65') && cleanPhoneDigits.length >= 10) {
        validPhone = `+65 ${cleanPhoneDigits.slice(2)}`;
      } else if (cleanPhoneDigits.startsWith('61') && cleanPhoneDigits.length >= 10) {
        validPhone = `+61 ${cleanPhoneDigits.slice(2)}`;
      } else {
        validPhone = `+${cleanPhoneDigits}`;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Transmitting Lead to Concierge...';
      }

      // Generate local fallback reference ID
      const fallbackRefId = 'ALT-2026-' + Math.floor(10000 + Math.random() * 90000);

      // Check for automated bot submission in honeypot fields
      const honeypotInput = form.querySelector('input[name="website_security_token"], input[name="company_website"], input[name="fax_number"]');
      const honeypotVal = honeypotInput ? honeypotInput.value.trim() : '';

      // Edge-native submission payload with hardened sanitization
      const leadPayload = {
        name: cleanName,
        phone: validPhone,
        email: cleanEmail,
        typology: cleanPreference,
        intent: cleanIntent,
        company_website: sanitizeInput(honeypotVal, 100),
        source: window.location.pathname ? window.location.pathname.replace(/[^\w\-\/]/g, '').slice(0, 80) : 'Direct Showcase'
      };

      // Asynchronous POST to Edge Lead Webhook
      fetch('/_edge/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      })
      .then(res => res.json())
      .catch(() => ({ success: false }))
      .then(edgeData => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }

        form.reset();

        const parentModal = form.closest('.modal-overlay');
        if (parentModal) {
          parentModal.classList.remove('active');
        }

        const activeRefId = (edgeData && edgeData.leadId) ? edgeData.leadId : fallbackRefId;
        const refIdEl = document.getElementById('bookingRefId');
        if (refIdEl) refIdEl.innerText = activeRefId;

        // Client-side redundant email notification to propsmartrealty@gmail.com
        fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            _subject: `New VIP Lead [${activeRefId}]: Lodha Altero Wakad - ${cleanName} (${validPhone})`,
            _replyto: cleanEmail || 'propsmartrealty@gmail.com',
            _template: 'table',
            _captcha: 'false',
            Project: 'Lodha Altero Wakad, Pune',
            MahaRERA: 'P52100079692',
            Lead_ID: activeRefId,
            Full_Name: cleanName,
            Phone_Number: validPhone,
            Email: cleanEmail || 'Not Provided',
            Preferred_Typology: cleanPreference,
            Customer_Intention: cleanIntent,
            Source_Page: window.location.href,
            Direct_WhatsApp: `https://wa.me/917744009295?text=${encodeURIComponent(`Hi ${cleanName}, thank you for inquiring about Lodha Altero Wakad [Ref: ${activeRefId}].`)}`
          })
        }).catch(() => {});

        // Dynamic Concierge Direct Dispatch Link with Pre-Text Intention
        const waLink = document.getElementById('successWhatsAppLink');
        if (waLink) {
          if (edgeData && edgeData.whatsappRedirectUrl) {
            waLink.href = edgeData.whatsappRedirectUrl;
          } else {
            const encodedMsg = encodeURIComponent(
              `Hi Lodha Altero Wakad Concierge,\n\n` +
              `I have submitted an inquiry on the official website:\n` +
              `• Reference ID: ${activeRefId}\n` +
              `• Name: ${cleanName}\n` +
              `• Mobile: ${validPhone}\n` +
              `• Preferred Typology: ${cleanPreference}\n` +
              `• Intention: ${cleanIntent}\n\n` +
              `Please connect me with the sales director and share official MahaRERA P52100079692 floor plans, cost sheet, and schedule my VIP site visit.`
            );
            waLink.href = `https://wa.me/917744009295?text=${encodedMsg}`;
          }
        }

        const successModal = document.getElementById('bookingSuccessModal');
        if (successModal) {
          successModal.classList.add('active');
        }

        showToast(`VIP Preview Confirmed! Details sent to Concierge Desk & Reference ID: ${activeRefId}`);
      });
    });
  });

  // Wire up Success Modal Close
  const successModal = document.getElementById('bookingSuccessModal');
  const successClose = document.getElementById('successModalClose');
  if (successClose && successModal) {
    successClose.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }
}

/* ============================================================
   13. FAQ Accordions
   ============================================================ */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ============================================================
   14. Interactive Boxing Card Effects & Cursor Glow
   ============================================================ */
function initBoxingCardEffects() {
  const cards = document.querySelectorAll('.boxing-card, .tilt-card, .boxing-beam');
  cards.forEach(card => {
    card.classList.add('boxing-cursor-glow');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ============================================================
   17. Architectural Vastu & Sun Path Simulator
   ============================================================ */
function initVastuSimulator() {
  const timeBtns = document.querySelectorAll('.vastu-time-btn');
  const sunPhase = document.getElementById('vastuSunPhase');
  const headline = document.getElementById('vastuHeadline');
  const sunIcon = document.getElementById('vastuSunIcon');
  const narrative = document.getElementById('vastuNarrative');
  const lightVal = document.getElementById('vastuLightVal');
  const breezeVal = document.getElementById('vastuBreezeVal');

  if (!timeBtns.length || !headline) return;

  const VASTU_DATA = {
    morning: {
      phase: 'Sunrise Stage • East-Facing Illumination',
      headline: 'Morning Golden Light across Master Balconies',
      icon: '🌅',
      narrative: 'At dawn, unobstructed sunlight from the Sahyadri horizon directly energizes the East and North-East facing private viewing decks of Towers 1 & 2, filling master suites with pure natural morning radiance in full accordance with Ishan Vastu principles.',
      light: '100% East Decks',
      breeze: 'Optimal 3-Side'
    },
    noon: {
      phase: 'Zenith Stage • Thermal & Acoustic Buffer',
      headline: 'High Solar Altitude with Zero Harsh Glare',
      icon: '☀️',
      narrative: 'At solar peak, deep cantilevered 6-foot balconies cast architectural cooling shadows over primary living spaces. High-performance DGU low-E glazing rejects 76% infrared heat, maintaining ambient interior thermal comfort without excessive HVAC consumption.',
      light: 'Indirect Diffuse 78%',
      breeze: 'Continuous Cross-Draft'
    },
    sunset: {
      phase: 'Golden Twilight • West Sahyadri Sunset Vistas',
      headline: 'Spectacular Sahyadri Sunset over Horizon Decks',
      icon: '🌇',
      narrative: 'As the sun descends over the Western Ghats ridge, South-West master sanctuaries and rooftop lounge decks are bathed in soft amber twilight. Nairutya quadrant positioning anchors grounded domestic tranquility and acoustic insulation from the evening breeze.',
      light: 'Warm Twilight 3000K',
      breeze: 'Cool Evening Westerlies'
    }
  };

  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const timeKey = btn.dataset.time;
      const data = VASTU_DATA[timeKey];
      if (!data) return;

      timeBtns.forEach(b => {
        b.classList.remove('active', 'bg-amber-800', 'text-white', 'shadow-xs', 'font-bold');
        b.classList.add('text-stone-700', 'font-semibold');
      });
      btn.classList.add('active', 'bg-amber-800', 'text-white', 'shadow-xs', 'font-bold');
      btn.classList.remove('text-stone-700');

      if (sunPhase) sunPhase.textContent = data.phase;
      if (headline) headline.textContent = data.headline;
      if (sunIcon) sunIcon.textContent = data.icon;
      if (narrative) narrative.textContent = data.narrative;
      if (lightVal) lightVal.textContent = data.light;
      if (breezeVal) breezeVal.textContent = data.breeze;
    });
  });
}

/* ============================================================
   18. Interactive Competitor Battlecard Selector
   ============================================================ */
function initCompetitorBattlecard() {
  const compSelect = document.getElementById('competitorSelect');
  const compHeader = document.getElementById('compTableHeader');
  const compBody = document.getElementById('compTableBody');
  const compLink = document.getElementById('compDetailLink');

  if (!compSelect || !compBody) return;

  const COMPETITORS = {
    'kolte-patil': {
      name: 'Kolte Patil 24K Glamore (Wakad)',
      link: '/compare/lodha-altero-vs-kolte-patil-24k-wakad',
      metrics: [
        { label: 'Tower Elevation & Floors', altero: 'G+37 Sky Tower (~120m Height)', comp: 'G+28 (~90m Height)', win: true },
        { label: 'Floor-to-Ceiling Clear Height', altero: '10.5 Ft Grand Clear Height', comp: '9.5 Ft Standard Clear', win: true },
        { label: 'Signature Rooftop Sky Club', altero: '25,000 sq.ft. on 37th Floor (Heated Pool, Padel Court)', comp: 'Ground & Podium Amenities Only', win: true },
        { label: 'Hinjewadi Phase 1 Commute', altero: '8–10 Mins via Direct 36m BRTS Arterial', comp: '12–15 Mins via Congested Internal Wakad Lanes', win: true },
        { label: 'Main Road Frontage Width', altero: 'Direct on 36-Metre Arterial DP Road', comp: '18-Metre Internal Access Road', win: true },
        { label: 'Municipal Governance Quality', altero: 'PCMC High-Priority Urban Infrastructure', comp: 'PCMC Urban Jurisdiction', win: false },
        { label: 'Starting Price (All-Inclusive)', altero: '₹2.09 Cr* (3 BHK Grande 1,185 sq.ft.)', comp: '₹1.95 Cr* (3 BHK Standard 1,050 sq.ft.)', win: false }
      ]
    },
    'godrej-woodsville': {
      name: 'Godrej Woodsville (Hinjewadi Ph 1)',
      link: '/compare/lodha-altero-vs-godrej-woodsville-hinjewadi',
      metrics: [
        { label: 'Tower Elevation & Floors', altero: 'G+37 Sky Tower (~120m Height)', comp: 'G+32 (~102m Height)', win: true },
        { label: 'Floor-to-Ceiling Clear Height', altero: '10.5 Ft Grand Clear Height', comp: '9.6 Ft Conventional Clear', win: true },
        { label: 'Signature Rooftop Sky Club', altero: '25,000 sq.ft. on 37th Floor (Heated Pool, Padel Court)', comp: 'Restricted Rooftop Viewing Deck Only', win: true },
        { label: 'Hinjewadi Phase 1 Commute', altero: '8–10 Mins (Datta Mandir Road Bypass)', comp: '15–20 Mins (Maan Road Bottlenecks)', win: true },
        { label: 'Main Road Frontage Width', altero: 'Direct on 36-Metre Arterial DP Road', comp: '24-Metre Sector Road', win: true },
        { label: 'Municipal Governance Quality', altero: 'PCMC Direct Water & Paved Infrastructure', comp: 'PMRDA Planning (Panchayat Water Reliance)', win: true },
        { label: 'Starting Price (All-Inclusive)', altero: '₹2.09 Cr* (3 BHK Grande 1,185 sq.ft.)', comp: '₹1.75 Cr* (3 BHK Compact 980 sq.ft.)', win: false }
      ]
    },
    'vtp-bellissimo': {
      name: 'VTP Bellissimo (Hinjewadi Ph 1)',
      link: '/compare/lodha-altero-vs-vtp-bellissimo-hinjewadi',
      metrics: [
        { label: 'Tower Elevation & Floors', altero: 'G+37 Sky Tower (~120m Height)', comp: 'G+33 High Rise', win: true },
        { label: 'Floor-to-Ceiling Clear Height', altero: '10.5 Ft Grand Clear Height', comp: '9.5 Ft Standard Clear', win: true },
        { label: 'Signature Rooftop Sky Club', altero: '25,000 sq.ft. on 37th Floor (Heated Pool, Padel Court)', comp: 'Township Podium Club Life', win: true },
        { label: 'Hinjewadi Phase 1 Commute', altero: '8–10 Mins (Datta Mandir Rd to Shivaji Chowk)', comp: '12–18 Mins via Phase 1 Choke Point', win: true },
        { label: 'Main Road Frontage Width', altero: 'Direct on 36-Metre Arterial DP Road', comp: 'Township Internal Feeder Roads', win: true },
        { label: 'Municipal Governance Quality', altero: 'PCMC Urban Jurisdiction', comp: 'PMRDA Planning Area', win: true },
        { label: 'Starting Price (All-Inclusive)', altero: '₹2.09 Cr* (3 BHK Grande 1,185 sq.ft.)', comp: '₹1.80 Cr* (3 BHK 1,020 sq.ft.)', win: false }
      ]
    },
    'kohinoor-courtyard': {
      name: 'Kohinoor Courtyard One (Wakad)',
      link: '/compare/lodha-altero-vs-kohinoor-courtyard-wakad',
      metrics: [
        { label: 'Tower Elevation & Floors', altero: 'G+37 Sky Tower (~120m Height)', comp: 'G+22 Mid-Rise Elevation', win: true },
        { label: 'Floor-to-Ceiling Clear Height', altero: '10.5 Ft Grand Clear Height', comp: '9.4 Ft Standard Clear', win: true },
        { label: 'Signature Rooftop Sky Club', altero: '25,000 sq.ft. on 37th Floor (Heated Pool, Padel Court)', comp: 'Ground Club & Podium Lawn', win: true },
        { label: 'Hinjewadi Phase 1 Commute', altero: '8–10 Mins via Direct 36m BRTS Arterial', comp: '12–16 Mins via Kaspate Wasti Traffic', win: true },
        { label: 'Main Road Frontage Width', altero: 'Direct on 36-Metre Arterial DP Road', comp: '15-Metre Access Road', win: true },
        { label: 'Municipal Governance Quality', altero: 'PCMC Urban Core Infrastructure', comp: 'PCMC Jurisdiction', win: false },
        { label: 'Starting Price (All-Inclusive)', altero: '₹2.09 Cr* (3 BHK Grande 1,185 sq.ft.)', comp: '₹1.65 Cr* (3 BHK 990 sq.ft.)', win: false }
      ]
    },
    'pride-world-city': {
      name: 'Pride World City (Charholi Pune)',
      link: '/compare/lodha-altero-wakad-vs-pride-world-city-charholi',
      metrics: [
        { label: 'Tower Elevation & Floors', altero: 'G+37 Sky Tower (~120m Height)', comp: 'G+14 to G+24 Mid-Rise Clusters', win: true },
        { label: 'Floor-to-Ceiling Clear Height', altero: '10.5 Ft Grand Clear Height', comp: '9.5 Ft Standard Clear', win: true },
        { label: 'Signature Rooftop Sky Club', altero: '25,000 sq.ft. on 37th Floor (Heated Pool, Padel Court)', comp: 'Township Level Podium Clubs', win: true },
        { label: 'Hinjewadi Phase 1 Commute', altero: '8–10 Mins (Direct West Pune Highway)', comp: '50–65 Mins (Cross-City East Pune)', win: true },
        { label: 'Main Road Frontage Width', altero: 'Direct on 36-Metre Arterial DP Road', comp: 'Charholi-Alandi Link Road', win: true },
        { label: 'Municipal Governance Quality', altero: 'PCMC Prime West Sector', comp: 'PCMC Far East Perimeter', win: true },
        { label: 'Starting Price (All-Inclusive)', altero: '₹2.09 Cr* (3 BHK Grande 1,185 sq.ft.)', comp: '₹1.50 Cr* (3 BHK 950 sq.ft.)', win: false }
      ]
    },
    'kalpataru-jade': {
      name: 'Kalpataru Jade Residences (Baner)',
      link: '/compare/lodha-altero-vs-kalpataru-jade-baner',
      metrics: [
        { label: 'Tower Elevation & Floors', altero: 'G+37 Sky Tower (~120m Height)', comp: 'G+21 to G+25 Towers', win: true },
        { label: 'Floor-to-Ceiling Clear Height', altero: '10.5 Ft Grand Clear Height', comp: '10.0 Ft Premium Clear', win: true },
        { label: 'Signature Rooftop Sky Club', altero: '25,000 sq.ft. on 37th Floor (Heated Pool, Padel Court)', comp: 'Central Park & Ground Clubhouse', win: true },
        { label: 'Hinjewadi Phase 1 Commute', altero: '8–10 Mins (Direct without Toll)', comp: '20–25 Mins via Baner-Pashan Highway', win: true },
        { label: 'Main Road Frontage Width', altero: 'Direct on 36-Metre Arterial DP Road', comp: 'Pan Card Club Road (Baner)', win: true },
        { label: 'Municipal Governance Quality', altero: 'PCMC Urban Core (Wide Grid Roads)', comp: 'PMC Baner Sector', win: false },
        { label: 'Starting Price (All-Inclusive)', altero: '₹2.09 Cr* (3 BHK Grande 1,185 sq.ft.)', comp: '₹2.95 Cr* (3 BHK Ultra-Luxury 1,350 sq.ft.)', win: true }
      ]
    },
    'anp-universe': {
      name: 'ANP Universe (Balewadi)',
      link: '/compare/lodha-altero-vs-anp-universe-balewadi',
      metrics: [
        { label: 'Tower Elevation & Floors', altero: 'G+37 Sky Tower (~120m Height)', comp: 'G+30 Towers', win: true },
        { label: 'Floor-to-Ceiling Clear Height', altero: '10.5 Ft Grand Clear Height', comp: '9.8 Ft Clear', win: true },
        { label: 'Signature Rooftop Sky Club', altero: '25,000 sq.ft. on 37th Floor (Heated Pool, Padel Court)', comp: 'Podium Skywalk Features', win: true },
        { label: 'Hinjewadi Phase 1 Commute', altero: '8–10 Mins', comp: '18–22 Mins via Balewadi High St Traffic', win: true },
        { label: 'Main Road Frontage Width', altero: 'Direct on 36-Metre Arterial DP Road', comp: 'Balewadi Link Road', win: true },
        { label: 'Municipal Governance Quality', altero: 'PCMC Urban Core Infrastructure', comp: 'PMC Balewadi Sector', win: false },
        { label: 'Starting Price (All-Inclusive)', altero: '₹2.09 Cr* (3 BHK Grande 1,185 sq.ft.)', comp: '₹2.25 Cr* (3 BHK 1,100 sq.ft.)', win: false }
      ]
    },
    'rohan-tarang': {
      name: 'Rohan Tarang (Wakad)',
      link: '/compare/lodha-altero-vs-rohan-tarang-wakad',
      metrics: [
        { label: 'Tower Elevation & Floors', altero: 'G+37 Sky Tower (~120m Height)', comp: 'G+14 Mid-Rise Elevation', win: true },
        { label: 'Floor-to-Ceiling Clear Height', altero: '10.5 Ft Grand Clear Height', comp: '9.2 Ft Standard Clear', win: true },
        { label: 'Signature Rooftop Sky Club', altero: '25,000 sq.ft. on 37th Floor (Heated Pool, Padel Court)', comp: 'Podium Common Amenities', win: true },
        { label: 'Hinjewadi Phase 1 Commute', altero: '8–10 Mins (Direct)', comp: '12–15 Mins via Internal Lanes', win: true },
        { label: 'Main Road Frontage Width', altero: 'Direct on 36-Metre Arterial DP Road', comp: '12-Metre Sub-Road', win: true },
        { label: 'Municipal Governance Quality', altero: 'PCMC Urban Core Infrastructure', comp: 'PCMC Jurisdiction', win: false },
        { label: 'Starting Price (All-Inclusive)', altero: '₹2.09 Cr* (3 BHK Grande 1,185 sq.ft.)', comp: '₹1.45 Cr* (3 BHK Compact 880 sq.ft.)', win: false }
      ]
    }
  };

  function renderCompetitor(key) {
    const comp = COMPETITORS[key] || COMPETITORS['kolte-patil'];
    if (compHeader) compHeader.textContent = comp.name;
    if (compLink) compLink.href = comp.link;

    if (compBody) {
      compBody.innerHTML = comp.metrics.map(m => `
        <tr class="hover:bg-amber-500/5 transition-colors">
          <td class="p-3 font-semibold text-stone-800">${m.label}</td>
          <td class="p-3 font-bold text-amber-950 bg-amber-500/10 ${m.win ? 'border-l-2 border-amber-600' : ''}">
            <div class="flex items-center gap-1.5">
              ${m.win ? '<span class="text-emerald-700 text-xs font-black">★</span>' : ''}
              <span>${m.altero}</span>
            </div>
          </td>
          <td class="p-3 text-stone-600">${m.comp}</td>
        </tr>
      `).join('');
    }
  }

  compSelect.addEventListener('change', (e) => {
    renderCompetitor(e.target.value);
  });

  renderCompetitor(compSelect.value || 'kolte-patil');
}

/* ============================================================
   19. Multi-Intent WhatsApp Concierge Dock
   ============================================================ */
function initWhatsAppConciergeDock() {
  const modal = document.getElementById('whatsappConciergeModal');
  const triggers = document.querySelectorAll('[data-open-whatsapp-concierge]');
  const closeBtns = document.querySelectorAll('[data-close-whatsapp]');

  if (!modal) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ============================================================
   20. High-Net-Worth Exit-Intent Lead Recovery Modal
   ============================================================ */
function initExitIntentModal() {
  const modal = document.getElementById('exitIntentModal');
  const closeBtns = document.querySelectorAll('[data-close-exit-intent]');

  if (!modal) return;

  let hasShown = false;
  try {
    hasShown = sessionStorage.getItem('altero_exit_shown') === 'true';
  } catch (e) {}

  if (hasShown) return;

  const triggerModal = () => {
    if (hasShown) return;
    hasShown = true;
    try {
      sessionStorage.setItem('altero_exit_shown', 'true');
    } catch (e) {}
    modal.classList.add('active');
  };

  // 1. Desktop Exit Intent (Cursor leaves top of viewport)
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 10 && !hasShown) {
      triggerModal();
    }
  });

  // 2. Mobile Inactivity / Scroll Reversal Trigger
  let maxScroll = 0;
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > maxScroll) maxScroll = currentScrollY;

    // If scrolled past 55% of page and scrolls up rapidly > 300px
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 1000 && maxScroll / docHeight > 0.55) {
      if (maxScroll - currentScrollY > 300 && !hasShown) {
        triggerModal();
      }
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ============================================================
   21. Progressive Web App (PWA) Mobile Install Banner
   ============================================================ */
function initPwaInstallPrompt() {
  const banner = document.getElementById('pwaInstallBanner');
  const installBtn = document.getElementById('pwaInstallBtn');
  const dismissBtn = document.getElementById('pwaDismissBtn');

  if (!banner) return;

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Check if dismissed previously this session
    try {
      if (sessionStorage.getItem('altero_pwa_dismissed') === 'true') return;
    } catch (err) {}

    banner.classList.remove('hidden');
    banner.classList.add('flex');
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      banner.classList.add('hidden');
      banner.classList.remove('flex');
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        showToast('Lodha Altero Portal Installed Successfully!');
      }
      deferredPrompt = null;
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
      banner.classList.remove('flex');
      try {
        sessionStorage.setItem('altero_pwa_dismissed', 'true');
      } catch (err) {}
    });
  }
}


