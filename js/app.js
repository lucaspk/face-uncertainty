(() => {
  const ns = window.FaceUncertainty || (window.FaceUncertainty = {});
  const u = ns.utils;
  const data = ns.data || { copingCards: window.copingCards };

  const SECTION_REFRESH = {
    profile: () => ns.gamification.updateProfileDisplay(),
    challenge: () => ns.gamification.renderChallenges()
  };

  const SWIPE_THRESHOLD = 50;
  const CARD_ANIMATION_DURATION_MS = 150;
  const MAX_CARDS_FOR_PROGRESS_DOTS = 30;

  const dom = {
    navLinks: null,
    sections: null,
    startButton: null,
    prevButton: null,
    nextButton: null,
    deckCover: null,
    cardViewer: null,
    ritualIntro: null,
    cardContainer: null,
    copingCard: null,
    currentCard: null,
    totalCards: null,
    dotsContainer: null,
    themeToggle: null,
    lightIcon: null,
    darkIcon: null
  };

  function cacheDom() {
    if (!u) return;
    dom.navLinks = dom.navLinks || u.qsa('.nav-link');
    dom.sections = dom.sections || u.qsa('.section');
    dom.startButton = dom.startButton || u.byId('start-cards');
    dom.prevButton = dom.prevButton || u.qs('.card-nav-prev');
    dom.nextButton = dom.nextButton || u.qs('.card-nav-next');
    dom.deckCover = dom.deckCover || u.qs('.deck-cover');
    dom.cardViewer = dom.cardViewer || u.qs('.card-viewer');
    dom.ritualIntro = dom.ritualIntro || u.qs('.card-ritual-intro');
    dom.cardContainer = dom.cardContainer || u.qs('.card-container');
    dom.copingCard = dom.copingCard || u.qs('.coping-card');
    dom.currentCard = dom.currentCard || u.qs('.current-card');
    dom.totalCards = dom.totalCards || u.qs('.total-cards');
    dom.dotsContainer = dom.dotsContainer || u.byId('card-progress-dots');
    dom.themeToggle = dom.themeToggle || u.byId('theme-toggle');
    dom.lightIcon = dom.lightIcon || u.qs('.theme-icon-light');
    dom.darkIcon = dom.darkIcon || u.qs('.theme-icon-dark');
  }

  const app = {
    currentCardIndex: 0,
    currentSection: 'coping-cards',

    init() {
      cacheDom();
      this.initTheme();
      this.setupNavigation();
      this.setupCopingCards();
      this.setupThemeToggle();
      this.setupKeyboardNavigation();
      ns.gamification.init();
      this.loadSection(this.currentSection);
    },

    setupNavigation() {
      cacheDom();
      dom.navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          dom.navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
          this.loadSection(link.dataset.section);
        });
      });
    },

    loadSection(sectionId) {
      cacheDom();
      dom.sections.forEach((section) => section.classList.remove('active'));

      const section = u.byId(sectionId);
      if (!section) return;

      section.classList.add('active');
      this.currentSection = sectionId;

      const refresh = SECTION_REFRESH[sectionId];
      if (refresh) refresh();
    },

    setCardIndex(index) {
      const max = data.copingCards.length - 1;
      const next = u.clamp(index, 0, max);
      this.currentCardIndex = next;
      this.showCard(next);
    },

    stepCard(delta) {
      this.setCardIndex(this.currentCardIndex + delta);
    },

    setupCopingCards() {
      cacheDom();

      if (dom.startButton) {
        dom.startButton.addEventListener('click', () => {
          if (dom.deckCover && dom.cardViewer) {
            dom.deckCover.classList.remove('active');
            dom.cardViewer.classList.add('active');
          }
          if (dom.ritualIntro) dom.ritualIntro.style.display = 'block';

          this.setCardIndex(0);
          this.updateProgressDots(0);
        });
      }

      if (dom.prevButton) dom.prevButton.addEventListener('click', () => this.stepCard(-1));
      if (dom.nextButton) dom.nextButton.addEventListener('click', () => this.stepCard(1));

      this.setupSwipeSupport();
    },

    showCard(index) {
      cacheDom();
      const card = data.copingCards[index];
      if (dom.copingCard && card) {
        dom.copingCard.style.opacity = '0';
        dom.copingCard.style.transform = 'scale(0.95)';

        setTimeout(() => {
          const iconHtml = card.icon ? `<div class="card-icon">${card.icon}</div>` : '';
          dom.copingCard.innerHTML = `${iconHtml}<div class="card-text">${card.text}</div>`;
          dom.copingCard.style.opacity = '1';
          dom.copingCard.style.transform = 'scale(1)';
        }, CARD_ANIMATION_DURATION_MS);
      }

      if (dom.currentCard) dom.currentCard.textContent = index + 1;
      if (dom.totalCards) dom.totalCards.textContent = data.copingCards.length;

      if (dom.prevButton) dom.prevButton.disabled = index === 0;
      if (dom.nextButton) dom.nextButton.disabled = index === data.copingCards.length - 1;

      this.updateProgressDots(index);
    },

    updateProgressDots(currentIndex) {
      cacheDom();
      if (!dom.dotsContainer) return;

      if (data.copingCards.length > MAX_CARDS_FOR_PROGRESS_DOTS) {
        dom.dotsContainer.style.display = 'none';
        return;
      }

      if (dom.dotsContainer.children.length === 0) {
        data.copingCards.forEach((_, i) => {
          const dot = document.createElement('div');
          dot.className = 'progress-dot';
          dot.addEventListener('click', () => this.setCardIndex(i));
          dom.dotsContainer.appendChild(dot);
        });
      }

      u.qsa('.progress-dot', dom.dotsContainer).forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    },

    setupSwipeSupport() {
      cacheDom();
      if (!dom.cardContainer) return;

      let touchStartX = 0;
      let touchEndX = 0;

      dom.cardContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      dom.cardContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - SWIPE_THRESHOLD) this.stepCard(1);
        else if (touchEndX > touchStartX + SWIPE_THRESHOLD) this.stepCard(-1);
      }, { passive: true });
    },

    setupKeyboardNavigation() {
      document.addEventListener('keydown', (e) => {
        if (this.currentSection !== 'coping-cards') return;
        if (!u.qs('.card-viewer.active')) return;

        if (e.key === 'ArrowLeft') this.stepCard(-1);
        else if (e.key === 'ArrowRight') this.stepCard(1);
      });
    },

    initTheme() {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
      this.setTheme(theme);
    },

    setTheme(theme) {
      cacheDom();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      if (dom.lightIcon && dom.darkIcon) {
        const isDark = theme === 'dark';
        dom.lightIcon.style.display = isDark ? 'none' : 'block';
        dom.darkIcon.style.display = isDark ? 'block' : 'none';
      }
    },

    setupThemeToggle() {
      cacheDom();
      if (!dom.themeToggle) return;

      dom.themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
      });
    }
  };

  ns.app = app;
  window.app = app;

  document.addEventListener('DOMContentLoaded', () => {
    app.init();
    document.documentElement.style.scrollBehavior = 'smooth';
    if (ns.DEBUG) console.log('App ready');
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {});
  }
})();
