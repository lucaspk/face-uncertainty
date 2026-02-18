// ===========================
// Local Storage Manager
// ===========================

const STORAGE_KEY = 'face_uncertainty_data';

// Default user profile structure
const defaultProfile = {
    xp: 0,
    level: 1,
    completedChallenges: [],
    earnedBadges: [],
    reflections: {},
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
};

// ===========================
// Storage Operations
// ===========================

const storage = {
    // Get all data from localStorage
    getData() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
            return this.initializeData();
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return this.initializeData();
        }
    },

    // Initialize data with default values
    initializeData() {
        const initialData = { ...defaultProfile };
        this.saveData(initialData);
        return initialData;
    },

    // Save all data to localStorage
    saveData(data) {
        try {
            data.lastUpdated = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    // Get profile data
    getProfile() {
        return this.getData();
    },

    // Update profile data
    updateProfile(updates) {
        const data = this.getData();
        const updatedData = { ...data, ...updates };
        return this.saveData(updatedData);
    },

    // Add XP
    addXP(amount) {
        const data = this.getData();
        data.xp += amount;

        // Recalculate level
        const newLevel = levelSystem.calculateLevel(data.xp);
        const leveledUp = newLevel > data.level;
        data.level = newLevel;

        this.saveData(data);
        return { leveledUp, newLevel, totalXP: data.xp };
    },

    // Complete a challenge
    completeChallenge(challengeId, reflections) {
        const data = this.getData();

        // Check if already completed
        if (data.completedChallenges.includes(challengeId)) {
            return { success: false, message: 'Desafio já completado' };
        }

        // Find challenge data
        const challenge = challenges.find(c => c.id === challengeId);
        if (!challenge) {
            return { success: false, message: 'Desafio não encontrado' };
        }

        // Add to completed challenges
        data.completedChallenges.push(challengeId);

        // Save reflections
        data.reflections[challengeId] = {
            ...reflections,
            completedAt: new Date().toISOString()
        };

        // Persist completion and reflections first so addXP sees them when it calls getData()
        this.saveData(data);

        // Add XP (getData() inside addXP will now include the new completion)
        const xpResult = this.addXP(challenge.xp);

        // Check for new badges using fresh data (with updated XP/level)
        const freshData = this.getData();
        const newBadges = this.checkBadges(freshData);
        this.saveData(freshData);

        return {
            success: true,
            xpGained: challenge.xp,
            ...xpResult,
            newBadges
        };
    },

    // Check if challenge is completed
    isChallengeCompleted(challengeId) {
        const data = this.getData();
        return data.completedChallenges.includes(challengeId);
    },

    // Get reflections for a challenge
    getReflections(challengeId) {
        const data = this.getData();
        return data.reflections[challengeId] || null;
    },

    // Check for newly earned badges
    checkBadges(data) {
        const newBadges = [];

        badges.forEach(badge => {
            // Skip if already earned
            if (data.earnedBadges.includes(badge.id)) {
                return;
            }

            let earned = false;

            switch (badge.requirement.type) {
                case 'challenges_completed':
                    earned = data.completedChallenges.length >= badge.requirement.value;
                    break;

                case 'reflections_written':
                    const reflectionsCount = Object.keys(data.reflections).filter(key => {
                        const reflection = data.reflections[key];
                        return Object.values(reflection).some(val =>
                            val && typeof val === 'string' && val.trim().length > 0
                        );
                    }).length;
                    earned = reflectionsCount >= badge.requirement.value;
                    break;

                case 'level':
                    earned = data.level >= badge.requirement.value;
                    break;

                case 'category':
                    const categoryCount = data.completedChallenges.filter(id => {
                        const challenge = challenges.find(c => c.id === id);
                        return challenge && challenge.category === badge.requirement.value;
                    }).length;
                    earned = categoryCount >= badge.requirement.count;
                    break;
            }

            if (earned) {
                data.earnedBadges.push(badge.id);
                newBadges.push(badge);
            }
        });

        return newBadges;
    },

    // Get earned badges
    getEarnedBadges() {
        const data = this.getData();
        return badges.filter(badge => data.earnedBadges.includes(badge.id));
    },

    // Export all data as JSON
    exportData() {
        const data = this.getData();
        const exportData = {
            ...data,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
        return exportData;
    },

    // Import data from JSON
    importData(importedData) {
        try {
            // Validate data structure
            if (!importedData || typeof importedData !== 'object') {
                return { success: false, message: 'Dados inválidos' };
            }

            // Ensure all required fields exist
            const validData = {
                xp: importedData.xp || 0,
                level: importedData.level || 1,
                completedChallenges: Array.isArray(importedData.completedChallenges)
                    ? importedData.completedChallenges
                    : [],
                earnedBadges: Array.isArray(importedData.earnedBadges)
                    ? importedData.earnedBadges
                    : [],
                reflections: importedData.reflections || {},
                createdAt: importedData.createdAt || new Date().toISOString(),
                lastUpdated: new Date().toISOString()
            };

            // Save imported data
            this.saveData(validData);

            return { success: true, message: 'Dados importados com sucesso' };
        } catch (error) {
            console.error('Error importing data:', error);
            return { success: false, message: 'Erro ao importar dados' };
        }
    },

    // Clear all data (reset)
    clearData() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { success: true, message: 'Dados limpos com sucesso' };
        } catch (error) {
            console.error('Error clearing data:', error);
            return { success: false, message: 'Erro ao limpar dados' };
        }
    },

    // Get statistics
    getStatistics() {
        const data = this.getData();

        // Category breakdown
        const categoryStats = {};
        data.completedChallenges.forEach(id => {
            const challenge = challenges.find(c => c.id === id);
            if (challenge) {
                categoryStats[challenge.category] = (categoryStats[challenge.category] || 0) + 1;
            }
        });

        // Difficulty breakdown
        const difficultyStats = { easy: 0, medium: 0, hard: 0 };
        data.completedChallenges.forEach(id => {
            const challenge = challenges.find(c => c.id === id);
            if (challenge) {
                difficultyStats[challenge.difficulty]++;
            }
        });

        return {
            totalChallenges: challenges.length,
            completedChallenges: data.completedChallenges.length,
            completionRate: (data.completedChallenges.length / challenges.length * 100).toFixed(1),
            totalReflections: Object.keys(data.reflections).length,
            categoryStats,
            difficultyStats,
            earnedBadges: data.earnedBadges.length,
            totalBadges: badges.length
        };
    }
};

// ===========================
// Initialize on load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Ensure data is initialized
    storage.getData();
});
