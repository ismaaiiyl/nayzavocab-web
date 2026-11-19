/**
 * NAYZA VOCAB — CLIENT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INTERACTIVE MOCKUP TABS
  initMockupTabs();

  // 2. FAQ ACCORDION
  initFaqAccordion();

  // 3. MOBILE MENU
  initMobileMenu();

  // 4. CURRENT YEAR
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/**
 * Interactive Phone Mockup Screenshot Switcher
 */
function initMockupTabs() {
  const tabs = document.querySelectorAll('.mockup-tab-btn');
  const screenImg = document.getElementById('mockup-screen-img');
  const captionEl = document.getElementById('mockup-screen-desc');
  if (!tabs.length || !screenImg) return;

  const screens = {
    dashboard: {
      src: 'assets/screenshots/dashboard.jpg',
      alt: 'Nayza Vocab Bosh sahifa',
      desc: '📊 <strong>Bosh sahifa:</strong> Kunlik statistika, takrorlash navbati va Spaced Repetition mashqlari.'
    },
    intro: {
      src: 'assets/screenshots/intro.jpg',
      alt: 'Nayza Vocab Kirish ekrani',
      desc: "🚀 <strong>Kirish sahifasi:</strong> Nayzadek o'tkir xotira bilan xorijiy tillarni samarali o'rganishni boshlash."
    },
    'test-screen': {
      src: 'assets/screenshots/test-screen.jpg',
      alt: 'Nayza Vocab Test va Mashq',
      desc: '🎯 <strong>Test & Mashq:</strong> 4 ta javob variantli interaktiv testlar va xotirani mustahkamlash mashqlari.'
    },
    'test-result': {
      src: 'assets/screenshots/test-result.jpg',
      alt: 'Nayza Vocab Test Natijalari',
      desc: '🏆 <strong>Natijalar & Tahlil:</strong> To\'g\'ri javoblar, aniqlik foizi va xatolar ustida qayta ishlash.'
    },
    'cloud-library': {
      src: 'assets/screenshots/cloud-library.png',
      alt: 'Nayza Vocab Cloud Kutubxona',
      desc: '☁️ <strong>Cloud Kutubxona:</strong> Minglab darsliklarni qidirish va tayyor kitoblarni bir zumda yuklab olish.'
    },
    library: {
      src: 'assets/screenshots/library.png',
      alt: "Nayza Vocab Lug'atlar to'plami",
      desc: "📚 <strong>Lug'atlar:</strong> Shaxsiy lug'at to'plamlari, xotira darajalari va joriy kolleksiyalar ro'yxati."
    },
    settings: {
      src: 'assets/screenshots/settings.png',
      alt: 'Nayza Vocab Sozlamalar',
      desc: '⚙️ <strong>Sozlamalar:</strong> Audio talaffuz tezligi, 6 xil til, bildirishnomalar va Offline Import/Export.'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.screen;
      const data = screens[target];
      if (data) {
        screenImg.style.opacity = '0';
        if (captionEl) captionEl.style.opacity = '0';

        setTimeout(() => {
          screenImg.src = data.src;
          screenImg.alt = data.alt;
          screenImg.style.opacity = '1';

          if (captionEl) {
            captionEl.innerHTML = data.desc;
            captionEl.style.opacity = '1';
          }
        }, 150);
      }
    });
  });

  // Link gallery screen cards to mockup tabs
  const screenCards = document.querySelectorAll('.screen-card');
  const cardScreenMap = [
    'dashboard',
    'test-screen',
    'test-result',
    'cloud-library',
    'library',
    'intro',
    'settings'
  ];

  screenCards.forEach((card, idx) => {
    card.style.cursor = 'pointer';
    card.title = 'Ushbu ekranni mockupta ko\'rish uchun bosing';
    card.addEventListener('click', () => {
      const targetScreen = cardScreenMap[idx];
      const matchingTab = document.querySelector(`.mockup-tab-btn[data-screen="${targetScreen}"]`);
      if (matchingTab) {
        matchingTab.click();
        const heroEl = document.getElementById('hero');
        if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
      }
    });
  });
}

/**
 * Mobile Navigation Drawer Toggle & Auto-Close
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.textContent = isOpen ? '✕' : '☰';
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Auto-close menu when clicking any nav link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.textContent = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
