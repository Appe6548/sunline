import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import CommunicationInterface from './components/CommunicationInterface';
import StatusPanel from './components/StatusPanel';
import MobileStatusBar from './components/MobileStatusBar';
import MobileStatusMenu from './components/MobileStatusMenu';
import GameOverScreen from './components/GameOverScreen';
import SettingsPanel from './components/SettingsPanel';
import { GAME_STATES } from './gameData';
import './App.css';

function App() {
  const gameHook = useGameState();
  const { gameState } = gameHook;
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileStatus, setShowMobileStatus] = useState(false);

  if (gameState.gameState === GAME_STATES.GAME_OVER) {
    return <GameOverScreen onRestart={() => window.location.reload()} />;
  }

  if (gameState.gameState === GAME_STATES.VICTORY) {
    return (
      <div className="victory-screen">
        <h1 className="terminal-text">任务完成</h1>
        <p>你成功帮助幸存者逃离了阳光学校...</p>
        <button 
          className="choice-button"
          onClick={() => window.location.reload()}
        >
          重新开始
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="terminal-text">
          <h1>阳光学校 - 紧急通讯系统</h1>
          <div className="connection-status">
            <span className="status-indicator"></span>
            连接状态: {gameState.communicationActive ? '已连接' : '连接中断'}
          </div>
        </div>
        <button
          className="settings-button-header"
          onClick={() => setShowSettings(true)}
          title="设置"
        >
          ⚙️
        </button>
      </header>
      
      <main className="app-main">
        <MobileStatusBar
          gameState={gameState}
          getCurrentRadiationLevel={gameHook.getCurrentRadiationLevel}
          onClick={() => setShowMobileStatus(true)}
        />
        <div className="game-container">
          <StatusPanel gameState={gameState} gameHook={gameHook} />
          <CommunicationInterface gameHook={gameHook} />
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="terminal-text">
          <small>紧急频道 - 仅限救援使用</small>
        </div>
      </footer>

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSettingsChange={(settings) => {
          // 这里可以应用设置变化
          console.log('Settings changed:', settings);
        }}
      />

      <MobileStatusMenu
        gameState={gameState}
        gameHook={gameHook}
        isOpen={showMobileStatus}
        onClose={() => setShowMobileStatus(false)}
      />
    </div>
  );
}

export default App;
