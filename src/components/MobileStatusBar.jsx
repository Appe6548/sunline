import React from 'react';
import './MobileStatusBar.css';

const MobileStatusBar = ({ gameState, getCurrentRadiationLevel, onClick }) => {
  const radiationLevel = getCurrentRadiationLevel();
  
  const getHealthColor = (health) => {
    if (health > 70) return '#00ff00';
    if (health > 40) return '#ffff00';
    if (health > 20) return '#ff8800';
    return '#ff0000';
  };

  const getRadiationColor = (radiation) => {
    if (radiation < 25) return '#00ff00';
    if (radiation < 50) return '#ffff00';
    if (radiation < 75) return '#ff8800';
    return '#ff0000';
  };

  return (
    <div className="mobile-status-bar" onClick={onClick}>
      <div className="status-item-mobile">
        <div className="status-icon">❤️</div>
        <div className="status-info">
          <div className="status-label">健康</div>
          <div
            className="status-value-mobile"
            style={{ color: getHealthColor(gameState.health) }}
          >
            {gameState.health}%
          </div>
        </div>
      </div>

      <div className="status-item-mobile">
        <div className="status-icon">☢️</div>
        <div className="status-info">
          <div className="status-label">辐射</div>
          <div
            className="status-value-mobile"
            style={{ color: getRadiationColor(gameState.radiation) }}
          >
            {gameState.radiation}%
          </div>
        </div>
      </div>

      <div className="status-item-mobile">
        <div className="status-icon">🎒</div>
        <div className="status-info">
          <div className="status-label">物品</div>
          <div className="status-value-mobile">
            {gameState.inventory.length}
          </div>
        </div>
      </div>

      <div className="status-expand-indicator">
        <span className="expand-text">点击查看详情</span>
        <span className="expand-arrow">▼</span>
      </div>
    </div>
  );
};

export default MobileStatusBar;
