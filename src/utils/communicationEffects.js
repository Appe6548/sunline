// 通讯效果和延迟模拟

export const CommunicationEffects = {
  // 计算通讯延迟
  calculateDelay: (messageLength, signalStrength = 0.7, interference = 0) => {
    const baseDelay = 800; // 基础延迟800ms
    const lengthFactor = Math.min(messageLength * 30, 2000); // 根据消息长度增加延迟
    const signalFactor = (1 - signalStrength) * 1000; // 信号强度影响
    const interferenceFactor = interference * 500; // 干扰影响
    
    return baseDelay + lengthFactor + signalFactor + interferenceFactor;
  },

  // 模拟信号干扰
  simulateInterference: (message, interferenceLevel = 0) => {
    if (interferenceLevel === 0) return message;
    
    let interferedMessage = message;
    const interferenceChars = ['█', '▓', '▒', '░', '?', '*', '#'];
    
    // 根据干扰等级随机替换字符
    for (let i = 0; i < message.length; i++) {
      if (Math.random() < interferenceLevel * 0.1) {
        const randomChar = interferenceChars[Math.floor(Math.random() * interferenceChars.length)];
        interferedMessage = interferedMessage.substring(0, i) + randomChar + interferedMessage.substring(i + 1);
      }
    }
    
    return interferedMessage;
  },

  // 模拟打字效果
  simulateTyping: async (message, onProgress, speed = 50) => {
    const words = message.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      onProgress(currentText);
      
      // 随机延迟模拟真实打字
      const delay = speed + Math.random() * 100;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    return currentText;
  },

  // 生成静态噪音效果
  generateStaticNoise: (intensity = 0.3) => {
    const noiseChars = ['▓', '▒', '░', '█', '▄', '▀', '■', '□'];
    const noiseLength = Math.floor(Math.random() * 10 + 5);
    let noise = '';
    
    for (let i = 0; i < noiseLength; i++) {
      if (Math.random() < intensity) {
        noise += noiseChars[Math.floor(Math.random() * noiseChars.length)];
      } else {
        noise += ' ';
      }
    }
    
    return noise;
  },

  // 模拟信号强度变化
  simulateSignalStrength: (baseStrength = 0.7, time = Date.now()) => {
    // 使用时间创建周期性的信号强度变化
    const cycle = Math.sin(time * 0.001) * 0.2;
    const randomFluctuation = (Math.random() - 0.5) * 0.1;
    
    return Math.max(0.1, Math.min(1.0, baseStrength + cycle + randomFluctuation));
  },

  // 创建通讯状态信息
  getConnectionStatus: (signalStrength, interference = 0) => {
    let status = '连接正常';
    let color = '#00ff00';
    
    if (signalStrength < 0.3 || interference > 0.7) {
      status = '信号微弱';
      color = '#ff4444';
    } else if (signalStrength < 0.5 || interference > 0.4) {
      status = '信号不稳定';
      color = '#ffaa44';
    } else if (signalStrength < 0.7 || interference > 0.2) {
      status = '信号良好';
      color = '#ffff00';
    }
    
    return { status, color, strength: signalStrength };
  },

  // 模拟消息传输错误
  simulateTransmissionError: (probability = 0.05) => {
    if (Math.random() < probability) {
      const errors = [
        '传输错误 - 重新发送中...',
        '信号中断 - 正在重连...',
        '数据包丢失 - 请重复...',
        '频道干扰 - 切换频道中...'
      ];
      return errors[Math.floor(Math.random() * errors.length)];
    }
    return null;
  },

  // 创建音频效果提示（文本形式）
  getAudioCue: (type) => {
    const cues = {
      incoming: '📻 [收到信号]',
      outgoing: '📡 [发送中...]',
      error: '⚠️ [连接错误]',
      reconnect: '🔄 [重新连接]',
      static: '📳 [静态噪音]'
    };
    
    return cues[type] || '';
  },

  // 模拟距离对通讯质量的影响
  calculateDistanceEffect: (distance = 1000) => {
    // 距离越远，信号越弱，延迟越高
    const maxDistance = 5000; // 最大有效通讯距离
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    
    return {
      signalLoss: normalizedDistance * 0.5, // 信号损失
      additionalDelay: normalizedDistance * 1000, // 额外延迟
      interference: normalizedDistance * 0.3 // 干扰增加
    };
  },

  // 创建实时通讯效果
  createRealtimeEffect: () => {
    const effects = [
      { type: 'static', duration: 200, intensity: 0.3 },
      { type: 'fade', duration: 500, intensity: 0.2 },
      { type: 'echo', duration: 300, intensity: 0.1 },
      { type: 'distortion', duration: 400, intensity: 0.25 }
    ];
    
    return effects[Math.floor(Math.random() * effects.length)];
  },

  // 格式化延迟显示
  formatDelay: (delayMs) => {
    if (delayMs < 1000) {
      return `${Math.round(delayMs)}ms`;
    } else {
      return `${(delayMs / 1000).toFixed(1)}s`;
    }
  },

  // 模拟紧急情况下的通讯变化
  getEmergencyCommState: (healthLevel, radiationLevel) => {
    let urgency = 0;
    
    if (healthLevel < 30) urgency += 0.4;
    if (radiationLevel > 70) urgency += 0.3;
    if (healthLevel < 10) urgency += 0.3;
    
    return {
      urgency: Math.min(urgency, 1),
      messagePrefix: urgency > 0.5 ? '🚨 [紧急] ' : urgency > 0.2 ? '⚠️ [警告] ' : '',
      speedMultiplier: 1 + urgency * 0.5, // 紧急情况下说话更快
      interferenceIncrease: urgency * 0.2 // 紧急情况可能导致更多干扰
    };
  }
};
