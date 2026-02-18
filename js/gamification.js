// ===========================
// Gamification System
// ===========================

const TOAST_DURATION_MS = 3000;
const LEVEL_UP_DELAY_MS = 1000;
const BADGE_NOTIFICATION_BASE_DELAY_MS = 2000;
const BADGE_NOTIFICATION_STAGGER_MS = 1000;

const PROFILE_NARRATIVE_TIERS = [
    { maxCompleted: 0, title: 'Pronto para começar? ✨', message: 'Sua jornada de crescimento começa agora. Cada desafio é um passo em direção a uma versão mais corajosa de você.' },
    { maxCompleted: 1, title: 'Você deu o primeiro passo! 🌱', message: 'O mais difícil já passou. Continue explorando sua coragem, um desafio de cada vez.' },
    { maxCompleted: 4, title: 'Você está ganhando ritmo! 🚀', message: 'Cada experiência está te tornando mais resiliente. Sua confiança está crescendo.' },
    { maxCompleted: 9, title: 'Progresso notável! 💪', message: (completed) => `Você já completou ${completed} desafios! Está provando para si mesmo que pode enfrentar a incerteza.` },
    { maxCompleted: Infinity, title: 'Você é incrível! 🌟', message: (completed, level) => `${completed} desafios completados, nível ${level}. Você está transformando medo em crescimento.` }
];

const MASTER_NARRATIVE = {
    title: 'Parabéns, você é um mestre! 👑',
    message: 'Você completou todos os desafios! Sua jornada provou que você é capaz de abraçar qualquer incerteza.'
};

const gamification = {
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), TOAST_DURATION_MS);
    },

    // Show level up notification
    showLevelUp(newLevel) {
        this.showToast(`🎉 Parabéns! Você alcançou o Nível ${newLevel}!`, 'success');
    },

    // Show XP gain notification
    showXPGain(amount) {
        this.showToast(`+${amount} XP ganhos!`, 'info');
    },

    // Show badge earned notification
    showBadgeEarned(badge) {
        this.showToast(`🏆 Nova conquista: ${badge.name}!`, 'success');
    },

    // Update profile display
    updateProfileDisplay() {
        const profile = storage.getProfile();

        // UX: Dynamic motivational narrative based on progress
        this.updateProfileNarrative(profile);

        // Update XP
        const xpElement = document.getElementById('profile-xp');
        if (xpElement) {
            xpElement.textContent = profile.xp;
        }

        // Update level
        const levelElement = document.getElementById('profile-level');
        if (levelElement) {
            levelElement.textContent = profile.level;
        }

        // Update completed challenges count
        const completedElement = document.getElementById('profile-completed');
        if (completedElement) {
            completedElement.textContent = profile.completedChallenges.length;
        }

        // Update badges count
        const badgesElement = document.getElementById('profile-badges');
        if (badgesElement) {
            badgesElement.textContent = profile.earnedBadges.length;
        }

        // Update progress bar
        this.updateProgressBar(profile);

        // Update badges grid
        this.updateBadgesGrid(profile);
    },

    updateProfileNarrative(profile) {
        const narrativeElement = document.getElementById('profile-narrative');
        if (!narrativeElement) return;

        const completed = profile.completedChallenges.length;
        const level = profile.level;
        const totalChallenges = challenges.length;

        if (completed >= totalChallenges) {
            narrativeElement.innerHTML = `<h3>${MASTER_NARRATIVE.title}</h3><p>${MASTER_NARRATIVE.message}</p>`;
            return;
        }

        const tier = PROFILE_NARRATIVE_TIERS.find(t => completed <= t.maxCompleted) || PROFILE_NARRATIVE_TIERS[PROFILE_NARRATIVE_TIERS.length - 1];
        const title = tier.title;
        const message = typeof tier.message === 'function' ? tier.message(completed, level) : tier.message;
        narrativeElement.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
    },

    // Update progress bar for next level
    updateProgressBar(profile) {
        const currentLevel = profile.level;
        const xpForCurrentLevel = levelSystem.xpForLevel(currentLevel - 1);
        const xpForNextLevel = levelSystem.xpForLevel(currentLevel);
        const xpInCurrentLevel = profile.xp - xpForCurrentLevel;
        const xpNeeded = xpForNextLevel - xpForCurrentLevel;
        const progress = (xpInCurrentLevel / xpNeeded) * 100;

        const progressFill = document.getElementById('progress-fill');
        const currentXP = document.getElementById('current-xp');
        const nextLevelXP = document.getElementById('next-level-xp');

        if (progressFill) {
            progressFill.style.width = `${Math.min(progress, 100)}%`;
        }

        if (currentXP) {
            currentXP.textContent = xpInCurrentLevel;
        }

        if (nextLevelXP) {
            nextLevelXP.textContent = xpNeeded;
        }
    },

    // Update badges grid
    updateBadgesGrid(profile) {
        const badgesGrid = document.getElementById('badges-grid');
        if (!badgesGrid) return;

        badgesGrid.innerHTML = '';

        badges.forEach(badge => {
            const isUnlocked = profile.earnedBadges.includes(badge.id);
            const badgeElement = this.createBadgeElement(badge, isUnlocked);
            badgesGrid.appendChild(badgeElement);
        });
    },

    // Create badge element
    createBadgeElement(badge, isUnlocked) {
        const div = document.createElement('div');
        div.className = `badge ${isUnlocked ? 'unlocked' : 'locked'}`;
        div.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
        `;
        return div;
    },

    // Get current challenge filter (all | completed | pending)
    getChallengeFilter() {
        const activeBtn = document.querySelector('.challenge-filter-btn.active');
        return (activeBtn && activeBtn.dataset.filter) || 'all';
    },

    // Render challenges grid (respects filter: all, completed, pending)
    renderChallenges() {
        const challengesGrid = document.getElementById('challenges-grid');
        if (!challengesGrid) return;

        const profile = storage.getProfile();
        const filter = this.getChallengeFilter();
        challengesGrid.innerHTML = '';

        const toShow = challenges.filter(challenge => {
            const isCompleted = profile.completedChallenges.includes(challenge.id);
            if (filter === 'all') return true;
            if (filter === 'completed') return isCompleted;
            if (filter === 'pending') return !isCompleted;
            return true;
        });

        toShow.forEach(challenge => {
            const isCompleted = profile.completedChallenges.includes(challenge.id);
            const challengeCard = this.createChallengeCard(challenge, isCompleted);
            challengesGrid.appendChild(challengeCard);
        });
    },

    // Create challenge card element
    createChallengeCard(challenge, isCompleted) {
        const card = document.createElement('div');
        card.className = `challenge-card ${isCompleted ? 'completed' : ''}`;

        // UX: Show XP reward upfront for motivation
        card.innerHTML = `
            <div class="challenge-reward">+${challenge.xp} XP</div>
            <h3>${challenge.title}</h3>
            <p>${challenge.description}</p>
            <div class="challenge-meta">
                <span class="challenge-category">${challenge.category}</span>
                <span class="challenge-difficulty ${challenge.difficulty}">${this.getDifficultyLabel(challenge.difficulty)}</span>
            </div>
        `;

        // Add click handler
        card.addEventListener('click', () => {
            this.openChallengeModal(challenge);
        });

        return card;
    },

    // Get difficulty label in Portuguese
    getDifficultyLabel(difficulty) {
        const labels = {
            easy: 'Fácil',
            medium: 'Médio',
            hard: 'Difícil'
        };
        return labels[difficulty] || difficulty;
    },

    // Open challenge modal
    openChallengeModal(challenge) {
        const modal = document.getElementById('challenge-modal');
        const title = document.getElementById('modal-challenge-title');
        const category = document.getElementById('modal-challenge-category');
        const difficulty = document.getElementById('modal-challenge-difficulty');
        const description = document.getElementById('modal-challenge-description');

        // Set content
        title.textContent = challenge.title;
        category.textContent = challenge.category;
        difficulty.textContent = this.getDifficultyLabel(challenge.difficulty);
        difficulty.className = `challenge-difficulty ${challenge.difficulty}`;
        description.textContent = challenge.description;

        // Load existing reflections if completed
        const reflections = storage.getReflections(challenge.id);
        if (reflections) {
            reflectionQuestions.forEach(question => {
                const textarea = modal.querySelector(`textarea[data-question="${question.key}"]`);
                if (textarea && reflections[question.key]) {
                    textarea.value = reflections[question.key];
                }
            });
        } else {
            // Clear textareas
            modal.querySelectorAll('.reflection-input').forEach(textarea => {
                textarea.value = '';
            });
        }

        // Store current challenge ID
        modal.dataset.challengeId = challenge.id;

        // Show modal
        modal.classList.add('active');
    },

    // Close challenge modal
    closeChallengeModal() {
        const modal = document.getElementById('challenge-modal');
        modal.classList.remove('active');
    },

    // Complete challenge
    completeChallenge(challengeId) {
        const modal = document.getElementById('challenge-modal');

        // Gather reflections
        const reflections = {};
        modal.querySelectorAll('.reflection-input').forEach(textarea => {
            const question = textarea.dataset.question;
            reflections[question] = textarea.value.trim();
        });

        // Save to storage
        const result = storage.completeChallenge(challengeId, reflections);

        if (result.success) {
            // Show XP notification
            this.showXPGain(result.xpGained);

            if (result.leveledUp) {
                setTimeout(() => this.showLevelUp(result.newLevel), LEVEL_UP_DELAY_MS);
            }

            if (result.newBadges && result.newBadges.length > 0) {
                result.newBadges.forEach((badge, index) => {
                    const delay = BADGE_NOTIFICATION_BASE_DELAY_MS + index * BADGE_NOTIFICATION_STAGGER_MS;
                    setTimeout(() => this.showBadgeEarned(badge), delay);
                });
            }

            // Update UI
            this.renderChallenges();
            this.updateProfileDisplay();

            // Close modal
            this.closeChallengeModal();
        } else {
            this.showToast(result.message, 'error');
        }
    },

    exportData() {
        const dataToExport = storage.exportData();
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `face-uncertainty-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showToast('Dados exportados com sucesso!', 'success');
    },

    // Import data from JSON file
    importData(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                const result = storage.importData(data);

                if (result.success) {
                    this.showToast('Dados importados com sucesso!', 'success');
                    // Refresh UI
                    this.renderChallenges();
                    this.updateProfileDisplay();
                } else {
                    this.showToast(result.message, 'error');
                }
            } catch (error) {
                this.showToast('Erro ao ler arquivo JSON', 'error');
                console.error('Import error:', error);
            }
        };

        reader.onerror = () => {
            this.showToast('Erro ao ler arquivo', 'error');
        };

        reader.readAsText(file);
    },

    // Initialize gamification system
    init() {
        // Render challenges
        this.renderChallenges();

        // Update profile display
        this.updateProfileDisplay();

        // Add event listeners
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        // Modal close button
        const closeButton = document.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeChallengeModal());
        }

        // Modal overlay
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closeChallengeModal());
        }

        // Complete challenge button
        const completeButton = document.getElementById('complete-challenge');
        if (completeButton) {
            completeButton.addEventListener('click', () => {
                const modal = document.getElementById('challenge-modal');
                const challengeId = parseInt(modal.dataset.challengeId);
                this.completeChallenge(challengeId);
            });
        }

        // Challenge filter buttons
        document.querySelectorAll('.challenge-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.challenge-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderChallenges();
            });
        });

        // Export data button
        const exportButton = document.getElementById('export-data');
        if (exportButton) {
            exportButton.addEventListener('click', () => this.exportData());
        }

        // Import data button
        const importButton = document.getElementById('import-data');
        const importFile = document.getElementById('import-file');

        if (importButton && importFile) {
            importButton.addEventListener('click', () => {
                importFile.click();
            });

            importFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.importData(file);
                }
                // Reset file input
                e.target.value = '';
            });
        }
    }
};
