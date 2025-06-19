import React, { useState } from 'react';
import { LOCATION_DATA } from '../gameData';
import './MobileStatusMenu.css';

const MobileStatusMenu = ({ gameState, gameHook, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('status');
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

  if (!isOpen) return null;

  return (
    <div className="mobile-status-overlay">
      <div className="mobile-status-menu">
        <div className="mobile-status-header">
          <h2 className="terminal-text">幸存者状态</h2>
          <button className="close-button-mobile" onClick={onClose}>✕</button>
        </div>

        <div className="mobile-tabs">
          <button 
            className={`tab-button ${activeTab === 'status' ? 'active' : ''}`}
            onClick={() => setActiveTab('status')}
          >
            状态
          </button>
          <button 
            className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            物品
          </button>
          <button 
            className={`tab-button ${activeTab === 'locations' ? 'active' : ''}`}
            onClick={() => setActiveTab('locations')}
          >
            地点
          </button>
        </div>

        <div className="mobile-tab-content">
          {activeTab === 'status' && (
            <div className="status-tab">
              <div className="status-section-mobile">
                <h3>生命体征</h3>
                
                <div className="status-item-large">
                  <div className="status-icon-large">❤️</div>
                  <div className="status-details">
                    <label>健康状况:</label>
                    <div className="status-bar-large">
                      <div 
                        className="status-fill-large health-fill"
                        style={{ 
                          width: `${gameState.health}%`,
                          backgroundColor: getHealthColor(gameState.health)
                        }}
                      ></div>
                      <span className="status-value-large" style={{ color: getHealthColor(gameState.health) }}>
                        {gameState.health}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="status-item-large">
                  <div className="status-icon-large">☢️</div>
                  <div className="status-details">
                    <label>辐射水平:</label>
                    <div className="status-bar-large">
                      <div 
                        className="status-fill-large radiation-fill"
                        style={{ 
                          width: `${gameState.radiation}%`,
                          backgroundColor: getRadiationColor(gameState.radiation)
                        }}
                      ></div>
                      <span className="status-value-large" style={{ color: getRadiationColor(gameState.radiation) }}>
                        {gameState.radiation}% ({radiationLevel.description})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="status-section-mobile">
                <h3>当前位置</h3>
                <div className="location-info-mobile">
                  <div className="location-name-mobile">{currentLocation?.name || '未知'}</div>
                  <div className="location-description-mobile">{currentLocation?.description}</div>
                  <div className="location-radiation-mobile" style={{ color: currentLocation?.radiationLevel.color }}>
                    辐射等级: {currentLocation?.radiationLevel.description}
                  </div>
                </div>
              </div>

              <div className="status-section-mobile">
                <h3>系统状态</h3>
                <div className="system-info-mobile">
                  <div className="info-item-mobile">
                    <span>通讯状态:</span>
                    <span className={gameState.communicationActive ? 'status-good' : 'status-bad'}>
                      {gameState.communicationActive ? '正常' : '中断'}
                    </span>
                  </div>
                  <div className="info-item-mobile">
                    <span>辐射检测器:</span>
                    <span className={gameState.hasRadiationDetector ? 'status-good' : 'status-bad'}>
                      {gameState.hasRadiationDetector ? '已激活' : '未激活'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="inventory-tab">
              <div className="status-section-mobile">
                <h3>物品栏 ({gameState.inventory.length})</h3>
                <div className="inventory-mobile">
                  {gameState.inventory.length === 0 ? (
                    <div className="empty-inventory-mobile">无物品</div>
                  ) : (
                    gameState.inventory.map((item, index) => (
                      <div key={index} className="inventory-item-mobile">
                        <div className="item-info">
                          <span className="item-name">{item}</span>
                        </div>
                        <button 
                          className="use-button-mobile"
                          onClick={() => gameHook.useItem(item)}
                        >
                          使用
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="locations-tab">
              <div className="status-section-mobile">
                <h3>已发现地点 ({gameState.discoveredLocations.length}/8)</h3>
                <div className="discovered-locations-mobile">
                  {gameState.discoveredLocations.map(locationId => {
                    const location = LOCATION_DATA[locationId];
                    return (
                      <div 
                        key={locationId} 
                        className={`location-item-mobile ${locationId === gameState.currentLocation ? 'current' : ''}`}
                      >
                        <div className="location-info">
                          <div className="location-name">{location.name}</div>
                          <div className="location-status" style={{ color: location.radiationLevel.color }}>
                            {location.radiationLevel.description}
                          </div>
                        </div>
                        {locationId !== gameState.currentLocation && (
                          <button 
                            className="move-button-mobile"
                            onClick={() => {
                              gameHook.moveToLocation(locationId);
                              onClose();
                            }}
                          >
                            前往
                          </button>
                        )}
                        {locationId === gameState.currentLocation && (
                          <div className="current-indicator">当前位置</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileStatusMenu;
