// ===========================
// Main Application
// ===========================

const SECTION_REFRESH = {
    profile: () => gamification.updateProfileDisplay(),
    challenge: () => gamification.renderChallenges()
};

const SWIPE_THRESHOLD = 50;
const CARD_ANIMATION_DURATION_MS = 150;
const MAX_CARDS_FOR_PROGRESS_DOTS = 30;

const app = {
    currentCardIndex: 0,
    currentSection: 'coping-cards',

    // Initialize the application
    init() {
        this.initTheme();
        this.setupNavigation();
        this.setupCopingCards();
        this.setupThemeToggle();
        gamification.init();
        this.loadSection(this.currentSection);
    },

    // Setup navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));

                // Add active class to clicked link
                link.classList.add('active');

                // Get section
                const section = link.dataset.section;
                this.loadSection(section);
            });
        });
    },

    // Load section
    loadSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
            this.currentSection = sectionId;

            const refresh = SECTION_REFRESH[sectionId];
            if (refresh) refresh();
        }
    },

    // Setup Coping Cards
    setupCopingCards() {
        const startButton = document.getElementById('start-cards');
        const prevButton = document.querySelector('.card-nav-prev');
        const nextButton = document.querySelector('.card-nav-next');

        // Start cards
        if (startButton) {
            startButton.addEventListener('click', () => {
                const deckCover = document.querySelector('.deck-cover');
                const cardViewer = document.querySelector('.card-viewer');
                const ritualIntro = document.querySelector('.card-ritual-intro');

                if (deckCover && cardViewer) {
                    deckCover.classList.remove('active');
                    cardViewer.classList.add('active');

                    // UX: Show ritual introduction
                    if (ritualIntro) {
                        ritualIntro.style.display = 'block';
                    }

                    this.currentCardIndex = 0;
                    this.showCard(this.currentCardIndex);
                    this.updateProgressDots(this.currentCardIndex);
                }
            });
        }

        // Previous card
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (this.currentCardIndex > 0) {
                    this.currentCardIndex--;
                    this.showCard(this.currentCardIndex);
                }
            });
        }

        // Next card
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (this.currentCardIndex < copingCards.length - 1) {
                    this.currentCardIndex++;
                    this.showCard(this.currentCardIndex);
                }
            });
        }

        // Swipe support for mobile
        this.setupSwipeSupport();
    },

    // Show specific card
    showCard(index) {
        const card = copingCards[index];
        const cardElement = document.querySelector('.coping-card');
        const currentCardElement = document.querySelector('.current-card');
        const totalCardsElement = document.querySelector('.total-cards');
        const prevButton = document.querySelector('.card-nav-prev');
        const nextButton = document.querySelector('.card-nav-next');

        if (cardElement && card) {
            // Add fade animation
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'scale(0.95)';

            setTimeout(() => {
                const iconHtml = card.icon ? `<div class="card-icon">${card.icon}</div>` : '';
                cardElement.innerHTML = `${iconHtml}<div class="card-text">${card.text}</div>`;
                cardElement.style.opacity = '1';
                cardElement.style.transform = 'scale(1)';
            }, CARD_ANIMATION_DURATION_MS);
        }

        // Update counter
        if (currentCardElement) {
            currentCardElement.textContent = index + 1;
        }

        if (totalCardsElement) {
            totalCardsElement.textContent = copingCards.length;
        }

        // Update button states
        if (prevButton) {
            prevButton.disabled = index === 0;
        }

        if (nextButton) {
            nextButton.disabled = index === copingCards.length - 1;
        }

        // UX: Update progress dots
        this.updateProgressDots(index);
    },

    // UX: Visual progress indicator using dots
    updateProgressDots(currentIndex) {
        const dotsContainer = document.getElementById('card-progress-dots');
        if (!dotsContainer) return;

        if (copingCards.length > MAX_CARDS_FOR_PROGRESS_DOTS) {
            dotsContainer.style.display = 'none';
            return;
        }

        // Create dots on first call
        if (dotsContainer.children.length === 0) {
            copingCards.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = 'progress-dot';
                dot.addEventListener('click', () => {
                    this.currentCardIndex = i;
                    this.showCard(i);
                });
                dotsContainer.appendChild(dot);
            });
        }

        // Update active dot
        const dots = dotsContainer.querySelectorAll('.progress-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    },

    // Setup swipe support for cards
    setupSwipeSupport() {
        const cardContainer = document.querySelector('.card-container');
        if (!cardContainer) return;

        let touchStartX = 0;
        let touchEndX = 0;

        cardContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        cardContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - SWIPE_THRESHOLD && this.currentCardIndex < copingCards.length - 1) {
                this.currentCardIndex++;
                this.showCard(this.currentCardIndex);
            } else if (touchEndX > touchStartX + SWIPE_THRESHOLD && this.currentCardIndex > 0) {
                this.currentCardIndex--;
                this.showCard(this.currentCardIndex);
            }
        }, { passive: true });
    },

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only in coping cards section
            if (this.currentSection !== 'coping-cards') return;

            // Check if card viewer is active
            const cardViewer = document.querySelector('.card-viewer.active');
            if (!cardViewer) return;

            if (e.key === 'ArrowLeft') {
                // Previous card
                if (this.currentCardIndex > 0) {
                    this.currentCardIndex--;
                    this.showCard(this.currentCardIndex);
                }
            } else if (e.key === 'ArrowRight') {
                // Next card
                if (this.currentCardIndex < copingCards.length - 1) {
                    this.currentCardIndex++;
                    this.showCard(this.currentCardIndex);
                }
            }
        });
    },

    // Initialize theme from localStorage or system preference
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        this.setTheme(theme);
    },

    // Set theme
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle button icons
        const lightIcon = document.querySelector('.theme-icon-light');
        const darkIcon = document.querySelector('.theme-icon-dark');
        
        if (lightIcon && darkIcon) {
            if (theme === 'dark') {
                lightIcon.style.display = 'none';
                darkIcon.style.display = 'block';
            } else {
                lightIcon.style.display = 'block';
                darkIcon.style.display = 'none';
            }
        }
    },

    // Setup theme toggle button
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    }
};

// ===========================
// Initialize on DOM ready
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    app.setupKeyboardNavigation();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Log welcome message
    console.log('%cFace a Incerteza 🌱', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('Aplicação carregada com sucesso!');
});

// ===========================
// Service Worker Registration (Optional)
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable offline support
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('ServiceWorker registered:', registration);
        //     })
        //     .catch(error => {
        //         console.log('ServiceWorker registration failed:', error);
        //     });
    });
}
