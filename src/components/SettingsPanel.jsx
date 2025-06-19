import React, { useState, useEffect } from 'react';
import { GameStorage } from '../utils/gameStorage';
import './SettingsPanel.css';

const SettingsPanel = ({ isOpen, onClose, onSettingsChange }) => {
  const [settings, setSettings] = useState(GameStorage.DEFAULT_SETTINGS);
  const [stats, setStats] = useState(GameStorage.DEFAULT_STATS);

  useEffect(() => {
    if (isOpen) {
      setSettings(GameStorage.loadSettings());
      setStats(GameStorage.loadStats());
    }
  }, [isOpen]);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    GameStorage.saveSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleExportSave = () => {
    const exportData = GameStorage.exportSave();
    if (exportData) {
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sunshine_school_save_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImportSave = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const success = GameStorage.importSave(e.target.result);
        if (success) {
          alert('存档导入成功！请刷新页面。');
        } else {
          alert('存档导入失败，请检查文件格式。');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    if (confirm('确定要清除所有游戏数据吗？此操作不可撤销！')) {
      GameStorage.clearAllData();
      alert('所有数据已清除！请刷新页面。');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2 className="terminal-text">游戏设置</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>音效设置</h3>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                />
                启用音效
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.hapticEnabled}
                  onChange={(e) => handleSettingChange('hapticEnabled', e.target.checked)}
                />
                启用触觉反馈
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>游戏设置</h3>
            <div className="setting-item">
              <label>
                文字速度:
                <select
                  value={settings.textSpeed}
                  onChange={(e) => handleSettingChange('textSpeed', e.target.value)}
                >
                  <option value="slow">慢速</option>
                  <option value="normal">正常</option>
                  <option value="fast">快速</option>
                </select>
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                />
                自动存档
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>外观设置</h3>
            <div className="setting-item">
              <label>
                主题颜色:
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                >
                  <option value="green">绿色</option>
                  <option value="amber">琥珀色</option>
                  <option value="blue">蓝色</option>
                </select>
              </label>
            </div>
            <div className="setting-item">
              <label>
                字体大小:
                <select
                  value={settings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                >
                  <option value="small">小</option>
                  <option value="normal">正常</option>
                  <option value="large">大</option>
                </select>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>游戏统计</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">游戏次数:</span>
                <span className="stat-value">{stats.gamesPlayed}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">完成次数:</span>
                <span className="stat-value">{stats.gamesCompleted}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">选择次数:</span>
                <span className="stat-value">{stats.choicesMade}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">发现地点:</span>
                <span className="stat-value">{stats.locationsDiscovered}/8</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">解锁结局:</span>
                <span className="stat-value">{stats.endingsUnlocked.length}/5</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">游戏进度:</span>
                <span className="stat-value">{GameStorage.getGameProgress()}%</span>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>数据管理</h3>
            <div className="data-buttons">
              <button className="setting-button" onClick={handleExportSave}>
                导出存档
              </button>
              <label className="setting-button file-input-label">
                导入存档
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportSave}
                  style={{ display: 'none' }}
                />
              </label>
              <button 
                className="setting-button danger" 
                onClick={handleClearData}
              >
                清除所有数据
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
