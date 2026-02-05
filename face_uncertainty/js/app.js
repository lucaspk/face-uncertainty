// ===========================
// Main Application
// ===========================

const app = {
    currentCardIndex: 0,
    currentSection: 'coping-cards',

    // Initialize the application
    init() {
        this.setupNavigation();
        this.setupCopingCards();
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

            // Refresh content based on section
            if (sectionId === 'profile') {
                gamification.updateProfileDisplay();
            } else if (sectionId === 'challenge') {
                gamification.renderChallenges();
            }
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
                // Create HTML with icon and text
                const iconHtml = card.icon ? `<div class="card-icon">${card.icon}</div>` : '';
                cardElement.innerHTML = `${iconHtml}<div class="card-text">${card.text}</div>`;
                cardElement.style.opacity = '1';
                cardElement.style.transform = 'scale(1)';
            }, 150);
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

        // Only show dots if we have less than 30 cards
        if (copingCards.length > 30) {
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
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;

            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next card
                if (this.currentCardIndex < copingCards.length - 1) {
                    this.currentCardIndex++;
                    this.showCard(this.currentCardIndex);
                }
            }

            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous card
                if (this.currentCardIndex > 0) {
                    this.currentCardIndex--;
                    this.showCard(this.currentCardIndex);
                }
            }
        };

        this.handleSwipe = handleSwipe;
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
