import React from 'react';
import { LOCATION_DATA } from '../gameData';
import './StatusPanel.css';

const StatusPanel = ({ gameState, gameHook }) => {
  const { getCurrentRadiationLevel } = gameHook;
  const radiationLevel = getCurrentRadiationLevel();
  const currentLocation = LOCATION_DATA[gameState.currentLocation];

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
    <div className="status-panel">
      <div className="panel-section">
        <h3 className="panel-title">幸存者状态</h3>
        
        <div className="status-item">
          <label>健康状况:</label>
          <div className="status-bar">
            <div 
              className="status-fill health-fill"
              style={{ 
                width: `${gameState.health}%`,
                backgroundColor: getHealthColor(gameState.health)
              }}
            ></div>
            <span className="status-value" style={{ color: getHealthColor(gameState.health) }}>
              {gameState.health}%
            </span>
          </div>
        </div>

        <div className="status-item">
          <label>辐射水平:</label>
          <div className="status-bar">
            <div 
              className="status-fill radiation-fill"
              style={{ 
                width: `${gameState.radiation}%`,
                backgroundColor: getRadiationColor(gameState.radiation)
              }}
            ></div>
            <span className="status-value" style={{ color: getRadiationColor(gameState.radiation) }}>
              {gameState.radiation}% ({radiationLevel.description})
            </span>
          </div>
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-title">当前位置</h3>
        <div className="location-info">
          <div className="location-name">{currentLocation?.name || '未知'}</div>
          <div className="location-radiation" style={{ color: currentLocation?.radiationLevel.color }}>
            辐射等级: {currentLocation?.radiationLevel.description}
          </div>
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-title">物品栏</h3>
        <div className="inventory">
          {gameState.inventory.length === 0 ? (
            <div className="empty-inventory">无物品</div>
          ) : (
            gameState.inventory.map((item, index) => (
              <div key={index} className="inventory-item">
                <span>{item}</span>
                <button 
                  className="use-button"
                  onClick={() => gameHook.useItem(item)}
                >
                  使用
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-title">已发现地点</h3>
        <div className="discovered-locations">
          {gameState.discoveredLocations.map(locationId => {
            const location = LOCATION_DATA[locationId];
            return (
              <div 
                key={locationId} 
                className={`location-item ${locationId === gameState.currentLocation ? 'current' : ''}`}
              >
                <span>{location.name}</span>
                {locationId !== gameState.currentLocation && (
                  <button 
                    className="move-button"
                    onClick={() => gameHook.moveToLocation(locationId)}
                  >
                    前往
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-title">系统状态</h3>
        <div className="system-info">
          <div className="info-item">
            <span>通讯状态:</span>
            <span className={gameState.communicationActive ? 'status-good' : 'status-bad'}>
              {gameState.communicationActive ? '正常' : '中断'}
            </span>
          </div>
          <div className="info-item">
            <span>辐射检测器:</span>
            <span className={gameState.hasRadiationDetector ? 'status-good' : 'status-bad'}>
              {gameState.hasRadiationDetector ? '已激活' : '未激活'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;
