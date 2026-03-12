(() => {
  const ns = window.FaceUncertainty || (window.FaceUncertainty = {});
  const u = ns.utils;

  function nowIso() {
    return new Date().toISOString();
  }

  function createDefaultProfile() {
    const createdAt = nowIso();
    return {
      xp: 0,
      level: 1,
      completedChallenges: [],
      earnedBadges: [],
      reflections: {},
      createdAt,
      lastUpdated: createdAt
    };
  }

  function normalizeImportedData(importedData, levelSystem) {
    if (!u?.isPlainObject(importedData)) return null;

    const xp = Number(importedData.xp) || 0;
    const completedChallenges = Array.isArray(importedData.completedChallenges)
      ? importedData.completedChallenges.map(Number).filter(Number.isFinite)
      : [];
    const earnedBadges = Array.isArray(importedData.earnedBadges)
      ? importedData.earnedBadges.map(Number).filter(Number.isFinite)
      : [];

    const reflections = u.isPlainObject(importedData.reflections) ? importedData.reflections : {};
    const createdAt = typeof importedData.createdAt === 'string' ? importedData.createdAt : nowIso();

    const level = levelSystem ? levelSystem.calculateLevel(xp) : (Number(importedData.level) || 1);

    return {
      xp,
      level,
      completedChallenges,
      earnedBadges,
      reflections,
      createdAt,
      lastUpdated: nowIso()
    };
  }

  function countReflectionsWithContent(reflections) {
    if (!u?.isPlainObject(reflections)) return 0;
    return Object.values(reflections).filter((reflection) => {
      if (!u.isPlainObject(reflection)) return false;
      return Object.values(reflection).some((val) => typeof val === 'string' && val.trim().length > 0);
    }).length;
  }

  function countCompletedInCategory(completedIds, challenges, category) {
    const byId = new Map((challenges || []).map((c) => [c.id, c]));
    return (completedIds || []).reduce((acc, id) => {
      const ch = byId.get(id);
      return ch && ch.category === category ? acc + 1 : acc;
    }, 0);
  }

  function meetsBadgeRequirement(badge, data, deps) {
    const req = badge?.requirement;
    if (!req || !req.type) return false;

    switch (req.type) {
      case 'challenges_completed':
        return (data.completedChallenges?.length || 0) >= (Number(req.value) || 0);
      case 'reflections_written':
        return countReflectionsWithContent(data.reflections) >= (Number(req.value) || 0);
      case 'level':
        return (Number(data.level) || 1) >= (Number(req.value) || 0);
      case 'category':
        return countCompletedInCategory(data.completedChallenges, deps.challenges, req.value) >= (Number(req.count) || 0);
      default:
        return false;
    }
  }

  function createStorage({ storageKey, levelSystem, challenges, badges }) {
    const key = storageKey || 'face_uncertainty_data';

    function readRaw() {
      return localStorage.getItem(key);
    }

    function writeRaw(data) {
      data.lastUpdated = nowIso();
      localStorage.setItem(key, JSON.stringify(data));
    }

    function initializeData() {
      const initial = createDefaultProfile();
      writeRaw(initial);
      return initial;
    }

    function getData() {
      const raw = readRaw();
      if (!raw) return initializeData();

      const parsed = u ? u.safeJsonParse(raw, null) : null;
      if (!parsed) return initializeData();

      const normalized = normalizeImportedData(parsed, levelSystem);
      if (!normalized) return initializeData();

      return normalized;
    }

    function saveData(data) {
      try {
        writeRaw(data);
        return true;
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
      }
    }

    function addXP(amount) {
      const data = getData();
      const delta = Number(amount) || 0;
      data.xp = (Number(data.xp) || 0) + delta;

      const newLevel = levelSystem ? levelSystem.calculateLevel(data.xp) : (Number(data.level) || 1);
      const oldLevel = Number(data.level) || 1;
      const leveledUp = newLevel > oldLevel;
      data.level = newLevel;

      saveData(data);
      return { leveledUp, newLevel, totalXP: data.xp };
    }

    function checkBadges(data) {
      const newBadges = [];
      (badges || []).forEach((badge) => {
        if (data.earnedBadges.includes(badge.id)) return;
        if (!meetsBadgeRequirement(badge, data, { challenges })) return;
        data.earnedBadges.push(badge.id);
        newBadges.push(badge);
      });
      return newBadges;
    }

    function completeChallenge(challengeId, reflections) {
      const data = getData();
      const id = Number(challengeId);
      if (!Number.isFinite(id)) return { success: false, message: 'Desafio inválido' };

      if (data.completedChallenges.includes(id)) {
        return { success: false, message: 'Desafio já completado' };
      }

      const challenge = (challenges || []).find((c) => c.id === id);
      if (!challenge) return { success: false, message: 'Desafio não encontrado' };

      data.completedChallenges.push(id);
      data.reflections[id] = { ...(reflections || {}), completedAt: nowIso() };

      const xpBefore = Number(data.xp) || 0;
      data.xp = xpBefore + (Number(challenge.xp) || 0);

      const oldLevel = Number(data.level) || 1;
      const newLevel = levelSystem ? levelSystem.calculateLevel(data.xp) : oldLevel;
      const leveledUp = newLevel > oldLevel;
      data.level = newLevel;

      const newBadges = checkBadges(data);

      saveData(data);

      return {
        success: true,
        xpGained: Number(challenge.xp) || 0,
        leveledUp,
        newLevel,
        totalXP: data.xp,
        newBadges
      };
    }

    function saveReflections(challengeId, reflections) {
      const data = getData();
      const id = Number(challengeId);
      if (!Number.isFinite(id)) return { success: false, message: 'Desafio inválido' };
      if (!u?.isPlainObject(reflections)) return { success: false, message: 'Reflexões inválidas' };

      const existing = u.isPlainObject(data.reflections?.[id]) ? data.reflections[id] : {};
      const next = { ...existing };
      Object.keys(reflections).forEach((k) => {
        const v = reflections[k];
        next[k] = v == null ? '' : String(v);
      });
      next.updatedAt = nowIso();

      if (!u.isPlainObject(data.reflections)) data.reflections = {};
      data.reflections[id] = next;

      const ok = saveData(data);
      return ok ? { success: true } : { success: false, message: 'Erro ao salvar' };
    }

    function isChallengeCompleted(challengeId) {
      const data = getData();
      return data.completedChallenges.includes(Number(challengeId));
    }

    function getReflections(challengeId) {
      const data = getData();
      return data.reflections[Number(challengeId)] || null;
    }

    function getEarnedBadges() {
      const data = getData();
      return (badges || []).filter((badge) => data.earnedBadges.includes(badge.id));
    }

    function exportData() {
      const data = getData();
      return { ...data, exportedAt: nowIso(), version: '1.0' };
    }

    function importData(importedData) {
      try {
        const valid = normalizeImportedData(importedData, levelSystem);
        if (!valid) return { success: false, message: 'Dados inválidos' };

        const newBadges = checkBadges(valid);
        if (newBadges.length) valid.earnedBadges = valid.earnedBadges;

        saveData(valid);
        return { success: true, message: 'Dados importados com sucesso' };
      } catch (error) {
        console.error('Error importing data:', error);
        return { success: false, message: 'Erro ao importar dados' };
      }
    }

    function clearData() {
      try {
        localStorage.removeItem(key);
        return { success: true, message: 'Dados limpos com sucesso' };
      } catch (error) {
        console.error('Error clearing data:', error);
        return { success: false, message: 'Erro ao limpar dados' };
      }
    }

    function getStatistics() {
      const data = getData();
      const categoryStats = {};
      const difficultyStats = { easy: 0, medium: 0, hard: 0 };
      const byId = new Map((challenges || []).map((c) => [c.id, c]));

      data.completedChallenges.forEach((id) => {
        const challenge = byId.get(id);
        if (!challenge) return;
        categoryStats[challenge.category] = (categoryStats[challenge.category] || 0) + 1;
        if (difficultyStats[challenge.difficulty] != null) difficultyStats[challenge.difficulty]++;
      });

      const completedCount = data.completedChallenges.length;
      const totalCount = (challenges || []).length;

      return {
        totalChallenges: totalCount,
        completedChallenges: completedCount,
        completionRate: totalCount ? ((completedCount / totalCount) * 100).toFixed(1) : '0',
        totalReflections: Object.keys(data.reflections || {}).length,
        categoryStats,
        difficultyStats,
        earnedBadges: data.earnedBadges.length,
        totalBadges: (badges || []).length
      };
    }

    return {
      getData,
      initializeData,
      saveData,
      getProfile: getData,
      updateProfile(updates) {
        const data = getData();
        const updated = { ...data, ...(updates || {}) };
        return saveData(updated);
      },
      addXP,
      completeChallenge,
      saveReflections,
      isChallengeCompleted,
      getReflections,
      checkBadges,
      getEarnedBadges,
      exportData,
      importData,
      clearData,
      getStatistics
    };
  }

  const deps = ns.data || {
    challenges: window.challenges,
    badges: window.badges,
    levelSystem: window.levelSystem
  };

  ns.storage = createStorage({
    storageKey: 'face_uncertainty_data',
    levelSystem: deps.levelSystem,
    challenges: deps.challenges,
    badges: deps.badges
  });

  window.storage = ns.storage;

  document.addEventListener('DOMContentLoaded', () => {
    ns.storage.getData();
  });
})();
