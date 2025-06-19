import React from 'react';
import './GameOverScreen.css';

const GameOverScreen = ({ onRestart }) => {
  return (
    <div className="game-over-screen">
      <div className="game-over-content">
        <div className="static-effect"></div>
        
        <div className="game-over-header">
          <h1 className="terminal-text glitch">通讯中断</h1>
          <div className="signal-lost">
            <span>信号丢失...</span>
            <div className="signal-bars-dead">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>

        <div className="game-over-message">
          <div className="error-code">错误代码: COMM_FAILURE_001</div>
          <div className="error-description">
            与幸存者的通讯连接已断开。<br/>
            可能原因：设备故障、辐射干扰或...更糟的情况。
          </div>
        </div>

        <div className="game-over-stats">
          <div className="stat-item">
            <span className="stat-label">任务状态:</span>
            <span className="stat-value failed">失败</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">幸存者状态:</span>
            <span className="stat-value unknown">未知</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">最后信号:</span>
            <span className="stat-value">阳光学校内部</span>
          </div>
        </div>

        <div className="game-over-actions">
          <button 
            className="restart-button terminal-text"
            onClick={onRestart}
          >
            重新建立连接
          </button>
          <div className="restart-hint">
            也许这次你能做得更好...
          </div>
        </div>

        <div className="memorial">
          <div className="memorial-text">
            "在废墟中，希望是最珍贵的资源。"
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
