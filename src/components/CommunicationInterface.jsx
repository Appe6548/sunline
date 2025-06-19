import React, { useEffect, useRef, useState } from 'react';
import { STORY_SCENARIOS } from '../gameData';
import { CommunicationEffects } from '../utils/communicationEffects';
import { AudioVisualEffects } from '../utils/audioVisualEffects';
import './CommunicationInterface.css';

const CommunicationInterface = ({ gameHook }) => {
  const { messages, currentScenario, isTyping, makeChoice, typeMessage, gameState } = gameHook;
  const messagesEndRef = useRef(null);
  const [currentStoryData, setCurrentStoryData] = useState(null);
  const [signalStrength, setSignalStrength] = useState(0.7);
  const [interference, setInterference] = useState(0.1);
  const [connectionStatus, setConnectionStatus] = useState({ status: '连接正常', color: '#00ff00' });

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // 新消息到达时的效果
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.speaker === 'survivor' && !lastMessage.isTyping) {
        AudioVisualEffects.playTextSound('notification');
        AudioVisualEffects.hapticFeedback('light');
      } else if (lastMessage.speaker === 'system') {
        AudioVisualEffects.playTextSound('warning');
        AudioVisualEffects.hapticFeedback('medium');
      }
    }
  }, [messages]);

  // 模拟信号强度变化
  useEffect(() => {
    const interval = setInterval(() => {
      const newStrength = CommunicationEffects.simulateSignalStrength(0.7);
      const newInterference = Math.random() * 0.3;

      // 根据游戏状态调整通讯质量
      const emergencyState = CommunicationEffects.getEmergencyCommState(
        gameState.health,
        gameState.radiation
      );

      setSignalStrength(newStrength - emergencyState.interferenceIncrease);
      setInterference(newInterference + emergencyState.interferenceIncrease);

      const status = CommunicationEffects.getConnectionStatus(signalStrength, interference);
      setConnectionStatus(status);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameState.health, gameState.radiation, signalStrength, interference]);

  // 加载当前场景数据
  useEffect(() => {
    const scenario = STORY_SCENARIOS[currentScenario];
    if (scenario) {
      setCurrentStoryData(scenario);
      
      // 如果是系统或幸存者的消息，自动显示
      if (scenario.speaker !== 'player') {
        setTimeout(() => {
          typeMessage(scenario.message, scenario.speaker);
        }, 500);
      }
    }
  }, [currentScenario, typeMessage]);

  const handleChoice = (choice) => {
    // 添加音效和触觉反馈
    AudioVisualEffects.playTextSound('notification');
    AudioVisualEffects.hapticFeedback('light');

    makeChoice(choice.text, choice.nextScenario, choice.id);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getSpeakerName = (speaker) => {
    switch (speaker) {
      case 'survivor': return '李明 [幸存者]';
      case 'player': return '你 [指挥中心]';
      case 'system': return '系统';
      default: return speaker;
    }
  };

  const getSpeakerClass = (speaker) => {
    switch (speaker) {
      case 'survivor': return 'message-survivor';
      case 'player': return 'message-player';
      case 'system': return 'message-system';
      default: return 'message-default';
    }
  };

  return (
    <div className="communication-interface">
      <div className="interface-header">
        <h2 className="terminal-text">通讯记录</h2>
        <div className="signal-strength">
          <span style={{ color: connectionStatus.color }}>
            {connectionStatus.status}:
          </span>
          <div className="signal-bars">
            {[1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`bar ${signalStrength >= (level * 0.25) ? 'active' : ''}`}
                style={{
                  backgroundColor: signalStrength >= (level * 0.25) ? connectionStatus.color : 'rgba(0, 255, 0, 0.3)'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${getSpeakerClass(message.speaker)} ${message.isChoice ? 'choice-message' : ''}`}
            >
              <div className="message-header">
                <span className="speaker-name">
                  {getSpeakerName(message.speaker)}
                </span>
                <span className="message-time">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <div className="message-content">
                {message.isTyping ? (
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  message.message
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="choices-container">
        {currentStoryData && currentStoryData.choices && !isTyping && (
          <div className="choices-list">
            <div className="choices-prompt">选择你的回应:</div>
            {currentStoryData.choices.map((choice, index) => (
              <button
                key={choice.id}
                className="choice-button"
                onClick={() => handleChoice(choice)}
                disabled={isTyping}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="interface-footer">
        <div className="connection-info">
          <span className="connection-status">
            🔗 加密连接 | 频道: 紧急救援 | 延迟: {CommunicationEffects.formatDelay(
              CommunicationEffects.calculateDelay(50, signalStrength, interference)
            )} | 信号: {Math.floor(signalStrength * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunicationInterface;
