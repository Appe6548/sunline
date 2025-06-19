// 游戏存档和设置管理

export const GameStorage = {
  // 存档键名
  SAVE_KEY: 'sunshine_school_save',
  SETTINGS_KEY: 'sunshine_school_settings',
  STATS_KEY: 'sunshine_school_stats',

  // 默认设置
  DEFAULT_SETTINGS: {
    soundEnabled: true,
    hapticEnabled: true,
    autoSave: true,
    textSpeed: 'normal', // slow, normal, fast
    theme: 'green', // green, amber, blue
    fontSize: 'normal' // small, normal, large
  },

  // 默认统计
  DEFAULT_STATS: {
    gamesPlayed: 0,
    gamesCompleted: 0,
    totalPlayTime: 0,
    bestSurvivalTime: 0,
    choicesMade: 0,
    locationsDiscovered: 0,
    itemsUsed: 0,
    endingsUnlocked: [],
    achievements: []
  },

  // 保存游戏状态
  saveGame: (gameState, messages, currentScenario) => {
    try {
      const saveData = {
        gameState,
        messages,
        currentScenario,
        timestamp: Date.now(),
        version: '1.0'
      };
      
      localStorage.setItem(GameStorage.SAVE_KEY, JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('Failed to save game:', error);
      return false;
    }
  },

  // 加载游戏状态
  loadGame: () => {
    try {
      const saveData = localStorage.getItem(GameStorage.SAVE_KEY);
      if (!saveData) return null;
      
      const parsed = JSON.parse(saveData);
      
      // 检查版本兼容性
      if (parsed.version !== '1.0') {
        console.warn('Save file version mismatch');
        return null;
      }
      
      return parsed;
    } catch (error) {
      console.error('Failed to load game:', error);
      return null;
    }
  },

  // 删除存档
  deleteSave: () => {
    try {
      localStorage.removeItem(GameStorage.SAVE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to delete save:', error);
      return false;
    }
  },

  // 检查是否有存档
  hasSave: () => {
    return localStorage.getItem(GameStorage.SAVE_KEY) !== null;
  },

  // 保存设置
  saveSettings: (settings) => {
    try {
      const mergedSettings = { ...GameStorage.DEFAULT_SETTINGS, ...settings };
      localStorage.setItem(GameStorage.SETTINGS_KEY, JSON.stringify(mergedSettings));
      return true;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
    }
  },

  // 加载设置
  loadSettings: () => {
    try {
      const settings = localStorage.getItem(GameStorage.SETTINGS_KEY);
      if (!settings) return GameStorage.DEFAULT_SETTINGS;
      
      const parsed = JSON.parse(settings);
      return { ...GameStorage.DEFAULT_SETTINGS, ...parsed };
    } catch (error) {
      console.error('Failed to load settings:', error);
      return GameStorage.DEFAULT_SETTINGS;
    }
  },

  // 保存统计数据
  saveStats: (stats) => {
    try {
      const mergedStats = { ...GameStorage.DEFAULT_STATS, ...stats };
      localStorage.setItem(GameStorage.STATS_KEY, JSON.stringify(mergedStats));
      return true;
    } catch (error) {
      console.error('Failed to save stats:', error);
      return false;
    }
  },

  // 加载统计数据
  loadStats: () => {
    try {
      const stats = localStorage.getItem(GameStorage.STATS_KEY);
      if (!stats) return GameStorage.DEFAULT_STATS;
      
      const parsed = JSON.parse(stats);
      return { ...GameStorage.DEFAULT_STATS, ...parsed };
    } catch (error) {
      console.error('Failed to load stats:', error);
      return GameStorage.DEFAULT_STATS;
    }
  },

  // 更新统计数据
  updateStats: (updates) => {
    const currentStats = GameStorage.loadStats();
    const newStats = { ...currentStats, ...updates };
    return GameStorage.saveStats(newStats);
  },

  // 记录游戏完成
  recordGameCompletion: (ending, survivalTime) => {
    const stats = GameStorage.loadStats();
    
    const updates = {
      gamesCompleted: stats.gamesCompleted + 1,
      bestSurvivalTime: Math.max(stats.bestSurvivalTime, survivalTime)
    };
    
    // 记录新结局
    if (!stats.endingsUnlocked.includes(ending)) {
      updates.endingsUnlocked = [...stats.endingsUnlocked, ending];
    }
    
    return GameStorage.updateStats(updates);
  },

  // 记录选择
  recordChoice: () => {
    const stats = GameStorage.loadStats();
    return GameStorage.updateStats({
      choicesMade: stats.choicesMade + 1
    });
  },

  // 记录物品使用
  recordItemUse: () => {
    const stats = GameStorage.loadStats();
    return GameStorage.updateStats({
      itemsUsed: stats.itemsUsed + 1
    });
  },

  // 记录位置发现
  recordLocationDiscovery: (locationCount) => {
    const stats = GameStorage.loadStats();
    return GameStorage.updateStats({
      locationsDiscovered: Math.max(stats.locationsDiscovered, locationCount)
    });
  },

  // 获取游戏进度百分比
  getGameProgress: () => {
    const stats = GameStorage.loadStats();
    const totalEndings = 5; // 总结局数
    const totalLocations = 8; // 总位置数
    
    const endingProgress = (stats.endingsUnlocked.length / totalEndings) * 50;
    const locationProgress = (stats.locationsDiscovered / totalLocations) * 30;
    const gameProgress = (stats.gamesCompleted > 0 ? 20 : 0);
    
    return Math.min(100, endingProgress + locationProgress + gameProgress);
  },

  // 导出存档数据
  exportSave: () => {
    try {
      const saveData = GameStorage.loadGame();
      const settings = GameStorage.loadSettings();
      const stats = GameStorage.loadStats();
      
      const exportData = {
        save: saveData,
        settings,
        stats,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Failed to export save:', error);
      return null;
    }
  },

  // 导入存档数据
  importSave: (importData) => {
    try {
      const data = JSON.parse(importData);
      
      if (data.version !== '1.0') {
        throw new Error('Incompatible save version');
      }
      
      if (data.save) {
        localStorage.setItem(GameStorage.SAVE_KEY, JSON.stringify(data.save));
      }
      
      if (data.settings) {
        GameStorage.saveSettings(data.settings);
      }
      
      if (data.stats) {
        GameStorage.saveStats(data.stats);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import save:', error);
      return false;
    }
  },

  // 清除所有数据
  clearAllData: () => {
    try {
      localStorage.removeItem(GameStorage.SAVE_KEY);
      localStorage.removeItem(GameStorage.SETTINGS_KEY);
      localStorage.removeItem(GameStorage.STATS_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear data:', error);
      return false;
    }
  }
};
