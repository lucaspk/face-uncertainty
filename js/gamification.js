(() => {
  const ns = window.FaceUncertainty || (window.FaceUncertainty = {});
  const u = ns.utils;
  const data = ns.data || {
    challenges: window.challenges,
    badges: window.badges,
    reflectionQuestions: window.reflectionQuestions,
    levelSystem: window.levelSystem
  };

  const TOAST_DURATION_MS = 3000;
  const LEVEL_UP_DELAY_MS = 1000;
  const BADGE_NOTIFICATION_BASE_DELAY_MS = 2000;
  const BADGE_NOTIFICATION_STAGGER_MS = 1000;
  const REFLECTION_AUTOSAVE_DEBOUNCE_MS = 400;

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

  const DIFFICULTY_LABELS = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
  };

  const dom = {
    toast: null,
    profileNarrative: null,
    profileXp: null,
    profileLevel: null,
    profileCompleted: null,
    profileBadges: null,
    progressFill: null,
    currentXp: null,
    nextLevelXp: null,
    badgesGrid: null,
    challengesGrid: null,
    modal: null,
    modalTitle: null,
    modalCategory: null,
    modalDifficulty: null,
    modalDescription: null,
    completeButton: null,
    exportButton: null,
    importButton: null,
    importFile: null
  };

  function cacheDom() {
    if (!u) return;
    dom.toast = dom.toast || u.byId('toast');
    dom.profileNarrative = dom.profileNarrative || u.byId('profile-narrative');
    dom.profileXp = dom.profileXp || u.byId('profile-xp');
    dom.profileLevel = dom.profileLevel || u.byId('profile-level');
    dom.profileCompleted = dom.profileCompleted || u.byId('profile-completed');
    dom.profileBadges = dom.profileBadges || u.byId('profile-badges');
    dom.progressFill = dom.progressFill || u.byId('progress-fill');
    dom.currentXp = dom.currentXp || u.byId('current-xp');
    dom.nextLevelXp = dom.nextLevelXp || u.byId('next-level-xp');
    dom.badgesGrid = dom.badgesGrid || u.byId('badges-grid');
    dom.challengesGrid = dom.challengesGrid || u.byId('challenges-grid');
    dom.modal = dom.modal || u.byId('challenge-modal');
    dom.modalTitle = dom.modalTitle || u.byId('modal-challenge-title');
    dom.modalCategory = dom.modalCategory || u.byId('modal-challenge-category');
    dom.modalDifficulty = dom.modalDifficulty || u.byId('modal-challenge-difficulty');
    dom.modalDescription = dom.modalDescription || u.byId('modal-challenge-description');
    dom.completeButton = dom.completeButton || u.byId('complete-challenge');
    dom.exportButton = dom.exportButton || u.byId('export-data');
    dom.importButton = dom.importButton || u.byId('import-data');
    dom.importFile = dom.importFile || u.byId('import-file');
  }

  function getDifficultyLabel(difficulty) {
    return DIFFICULTY_LABELS[difficulty] || difficulty;
  }

  function collectReflectionsFromModal(modalRoot, { trim = false } = {}) {
    const reflections = {};
    u.qsa('.reflection-input', modalRoot).forEach((textarea) => {
      const key = textarea?.dataset?.question;
      if (!key) return;
      const raw = textarea.value == null ? '' : String(textarea.value);
      reflections[key] = trim ? raw.trim() : raw;
    });
    return reflections;
  }

  function getChallengeFilter() {
    const activeBtn = u.qs('.challenge-filter-btn[data-filter].active');
    return (activeBtn && activeBtn.dataset.filter) || 'all';
  }

  function getDifficultyFilter() {
    const activeBtn = u.qs('.challenge-filter-btn[data-difficulty].active');
    return (activeBtn && activeBtn.dataset.difficulty) || 'all';
  }

  function computeLevelProgress(profile) {
    const currentLevel = Number(profile.level) || 1;
    const xpForCurrentLevel = data.levelSystem.xpForLevel(currentLevel - 1);
    const xpForNextLevel = data.levelSystem.xpForLevel(currentLevel);
    const xpInCurrentLevel = (Number(profile.xp) || 0) - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const progress = xpNeeded ? (xpInCurrentLevel / xpNeeded) * 100 : 0;
    return { xpInCurrentLevel, xpNeeded, progress };
  }

  const gamification = {
    showToast(message, type = 'info') {
      cacheDom();
      if (!dom.toast) return;
      dom.toast.textContent = message;
      dom.toast.className = `toast ${type}`;
      dom.toast.classList.add('show');
      setTimeout(() => dom.toast && dom.toast.classList.remove('show'), TOAST_DURATION_MS);
    },

    showLevelUp(newLevel) {
      this.showToast(`🎉 Parabéns! Você alcançou o Nível ${newLevel}!`, 'success');
    },

    showXPGain(amount) {
      this.showToast(`+${amount} XP ganhos!`, 'info');
    },

    showBadgeEarned(badge) {
      this.showToast(`🏆 Nova conquista: ${badge.name}!`, 'success');
    },

    updateProfileNarrative(profile) {
      cacheDom();
      if (!dom.profileNarrative) return;

      const completed = profile.completedChallenges.length;
      const level = profile.level;
      const totalChallenges = data.challenges.length;

      if (completed >= totalChallenges) {
        dom.profileNarrative.innerHTML = `<h3>${MASTER_NARRATIVE.title}</h3><p>${MASTER_NARRATIVE.message}</p>`;
        return;
      }

      const tier = PROFILE_NARRATIVE_TIERS.find((t) => completed <= t.maxCompleted) || PROFILE_NARRATIVE_TIERS[PROFILE_NARRATIVE_TIERS.length - 1];
      const title = tier.title;
      const message = typeof tier.message === 'function' ? tier.message(completed, level) : tier.message;
      dom.profileNarrative.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
    },

    updateProgressBar(profile) {
      cacheDom();
      const { xpInCurrentLevel, xpNeeded, progress } = computeLevelProgress(profile);

      if (dom.progressFill) dom.progressFill.style.width = `${Math.min(progress, 100)}%`;
      if (dom.currentXp) dom.currentXp.textContent = xpInCurrentLevel;
      if (dom.nextLevelXp) dom.nextLevelXp.textContent = xpNeeded;
    },

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

    updateBadgesGrid(profile) {
      cacheDom();
      if (!dom.badgesGrid) return;
      dom.badgesGrid.innerHTML = '';

      data.badges.forEach((badge) => {
        const isUnlocked = profile.earnedBadges.includes(badge.id);
        dom.badgesGrid.appendChild(this.createBadgeElement(badge, isUnlocked));
      });
    },

    updateProfileDisplay() {
      cacheDom();
      const profile = ns.storage.getProfile();

      this.updateProfileNarrative(profile);
      if (dom.profileXp) dom.profileXp.textContent = profile.xp;
      if (dom.profileLevel) dom.profileLevel.textContent = profile.level;
      if (dom.profileCompleted) dom.profileCompleted.textContent = profile.completedChallenges.length;
      if (dom.profileBadges) dom.profileBadges.textContent = profile.earnedBadges.length;

      this.updateProgressBar(profile);
      this.updateBadgesGrid(profile);
    },

    createChallengeCard(challenge, isCompleted) {
      const card = document.createElement('div');
      card.className = `challenge-card ${isCompleted ? 'completed' : ''}`;
      card.innerHTML = `
        <div class="challenge-reward">+${challenge.xp} XP</div>
        <h3>${challenge.title}</h3>
        <p>${challenge.description}</p>
        <div class="challenge-meta">
          <span class="challenge-category">${challenge.category}</span>
          <span class="challenge-difficulty ${challenge.difficulty}">${getDifficultyLabel(challenge.difficulty)}</span>
        </div>
      `;
      card.addEventListener('click', () => this.openChallengeModal(challenge));
      return card;
    },

    renderChallenges() {
      cacheDom();
      if (!dom.challengesGrid) return;

      const profile = ns.storage.getProfile();
      const statusFilter = getChallengeFilter();
      const difficultyFilter = getDifficultyFilter();
      dom.challengesGrid.innerHTML = '';

      const toShow = data.challenges.filter((challenge) => {
        const isCompleted = profile.completedChallenges.includes(challenge.id);
        if (statusFilter === 'completed' && !isCompleted) return false;
        if (statusFilter === 'pending' && isCompleted) return false;
        if (difficultyFilter !== 'all' && challenge.difficulty !== difficultyFilter) return false;
        return true;
      });

      toShow.forEach((challenge) => {
        const isCompleted = profile.completedChallenges.includes(challenge.id);
        dom.challengesGrid.appendChild(this.createChallengeCard(challenge, isCompleted));
      });
    },

    openChallengeModal(challenge) {
      cacheDom();
      if (!dom.modal) return;

      dom.modalTitle.textContent = challenge.title;
      dom.modalCategory.textContent = challenge.category;
      dom.modalDifficulty.textContent = getDifficultyLabel(challenge.difficulty);
      dom.modalDifficulty.className = `challenge-difficulty ${challenge.difficulty}`;
      dom.modalDescription.textContent = challenge.description;

      const reflections = ns.storage.getReflections(challenge.id);
      if (reflections) {
        data.reflectionQuestions.forEach((question) => {
          const textarea = u.qs(`textarea[data-question="${question.key}"]`, dom.modal);
          if (textarea && reflections[question.key] != null) textarea.value = reflections[question.key];
        });
      } else {
        u.qsa('.reflection-input', dom.modal).forEach((textarea) => {
          textarea.value = '';
        });
      }

      dom.modal.dataset.challengeId = challenge.id;
      dom.modal.classList.add('active');
    },

    closeChallengeModal() {
      cacheDom();
      if (dom.modal) dom.modal.classList.remove('active');
    },

    completeChallenge(challengeId) {
      cacheDom();
      if (!dom.modal) return;

      const reflections = collectReflectionsFromModal(dom.modal, { trim: true });

      const result = ns.storage.completeChallenge(challengeId, reflections);
      if (!result.success) {
        this.showToast(result.message, 'error');
        return;
      }

      this.showXPGain(result.xpGained);
      if (result.leveledUp) setTimeout(() => this.showLevelUp(result.newLevel), LEVEL_UP_DELAY_MS);

      if (result.newBadges && result.newBadges.length) {
        result.newBadges.forEach((badge, index) => {
          const delay = BADGE_NOTIFICATION_BASE_DELAY_MS + index * BADGE_NOTIFICATION_STAGGER_MS;
          setTimeout(() => this.showBadgeEarned(badge), delay);
        });
      }

      this.renderChallenges();
      this.updateProfileDisplay();
      this.closeChallengeModal();
    },

    exportData() {
      const dataToExport = ns.storage.exportData();
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

    importData(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          const result = ns.storage.importData(imported);
          if (!result.success) {
            this.showToast(result.message, 'error');
            return;
          }
          this.showToast('Dados importados com sucesso!', 'success');
          this.renderChallenges();
          this.updateProfileDisplay();
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

    setupEventListeners() {
      cacheDom();

      let autosaveTimer = null;
      const scheduleAutosave = (challengeId, patch) => {
        if (!Number.isFinite(Number(challengeId))) return;
        if (autosaveTimer) clearTimeout(autosaveTimer);
        autosaveTimer = setTimeout(() => {
          autosaveTimer = null;
          ns.storage.saveReflections(challengeId, patch);
        }, REFLECTION_AUTOSAVE_DEBOUNCE_MS);
      };

      const flushAutosave = () => {
        cacheDom();
        if (!dom.modal) return;
        const challengeId = Number(dom.modal?.dataset?.challengeId);
        if (!Number.isFinite(challengeId)) return;
        if (autosaveTimer) {
          clearTimeout(autosaveTimer);
          autosaveTimer = null;
        }
        const reflections = collectReflectionsFromModal(dom.modal, { trim: false });
        ns.storage.saveReflections(challengeId, reflections);
      };

      const closeButton = u.qs('.modal-close');
      if (closeButton) closeButton.addEventListener('click', () => {
        flushAutosave();
        this.closeChallengeModal();
      });

      const overlay = u.qs('.modal-overlay');
      if (overlay) overlay.addEventListener('click', () => {
        flushAutosave();
        this.closeChallengeModal();
      });

      if (dom.completeButton) {
        dom.completeButton.addEventListener('click', () => {
          const challengeId = Number(dom.modal?.dataset?.challengeId);
          this.completeChallenge(challengeId);
        });
      }

      if (dom.modal) {
        dom.modal.addEventListener('input', (e) => {
          const target = e.target;
          if (!(target instanceof HTMLTextAreaElement)) return;
          if (!target.classList.contains('reflection-input')) return;
          const challengeId = Number(dom.modal?.dataset?.challengeId);
          const key = target.dataset.question;
          if (!key) return;
          scheduleAutosave(challengeId, { [key]: target.value });
        });

        dom.modal.addEventListener('blur', (e) => {
          const target = e.target;
          if (!(target instanceof HTMLTextAreaElement)) return;
          if (!target.classList.contains('reflection-input')) return;
          const challengeId = Number(dom.modal?.dataset?.challengeId);
          const key = target.dataset.question;
          if (!key) return;
          ns.storage.saveReflections(challengeId, { [key]: target.value });
        }, true);
      }

      u.qsa('.challenges-filter').forEach((group) => {
        u.qsa('.challenge-filter-btn', group).forEach((btn) => {
          btn.addEventListener('click', () => {
            u.qsa('.challenge-filter-btn', group).forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            this.renderChallenges();
          });
        });
      });

      if (dom.exportButton) dom.exportButton.addEventListener('click', () => this.exportData());

      if (dom.importButton && dom.importFile) {
        dom.importButton.addEventListener('click', () => dom.importFile.click());
        dom.importFile.addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (file) this.importData(file);
          e.target.value = '';
        });
      }
    },

    init() {
      cacheDom();
      this.renderChallenges();
      this.updateProfileDisplay();
      this.setupEventListeners();
    }
  };

  ns.gamification = gamification;
  window.gamification = gamification;
})();
