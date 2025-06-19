// 音效和视觉效果管理器

export const AudioVisualEffects = {
  // 播放文本音效（使用Web Audio API模拟）
  playTextSound: (type = 'typing') => {
    if (typeof window === 'undefined' || !window.AudioContext) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch (type) {
        case 'typing':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
          
        case 'notification':
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
          
        case 'warning':
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.6);
          break;
          
        case 'error':
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
          break;
      }
    } catch (error) {
      console.log('Audio not supported');
    }
  },

  // 创建屏幕震动效果
  screenShake: (intensity = 'medium', duration = 500) => {
    if (typeof document === 'undefined') return;
    
    const body = document.body;
    const intensityMap = {
      light: 2,
      medium: 5,
      heavy: 10
    };
    
    const shakeIntensity = intensityMap[intensity] || 5;
    
    body.style.animation = `shake ${duration}ms ease-in-out`;
    
    // 添加震动关键帧
    if (!document.getElementById('shake-keyframes')) {
      const style = document.createElement('style');
      style.id = 'shake-keyframes';
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-${shakeIntensity}px); }
          20% { transform: translateX(${shakeIntensity}px); }
          30% { transform: translateX(-${shakeIntensity}px); }
          40% { transform: translateX(${shakeIntensity}px); }
          50% { transform: translateX(-${shakeIntensity}px); }
          60% { transform: translateX(${shakeIntensity}px); }
          70% { transform: translateX(-${shakeIntensity}px); }
          80% { transform: translateX(${shakeIntensity}px); }
          90% { transform: translateX(-${shakeIntensity}px); }
        }
      `;
      document.head.appendChild(style);
    }
    
    setTimeout(() => {
      body.style.animation = '';
    }, duration);
  },

  // 创建闪烁效果
  flashEffect: (color = '#ff0000', duration = 200) => {
    if (typeof document === 'undefined') return;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${color};
      opacity: 0.3;
      pointer-events: none;
      z-index: 9999;
      animation: flash ${duration}ms ease-out;
    `;
    
    // 添加闪烁关键帧
    if (!document.getElementById('flash-keyframes')) {
      const style = document.createElement('style');
      style.id = 'flash-keyframes';
      style.textContent = `
        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 0.3; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, duration);
  },

  // 创建打字机效果
  typewriterEffect: async (element, text, speed = 50) => {
    if (!element) return;
    
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      
      // 随机化打字速度
      const randomDelay = speed + Math.random() * 30;
      await new Promise(resolve => setTimeout(resolve, randomDelay));
      
      // 在某些字符后添加额外停顿
      if (['.', '!', '?', '，', '。'].includes(text[i])) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
  },

  // 创建脉冲效果
  pulseEffect: (element, color = '#00ff00', duration = 1000) => {
    if (!element) return;
    
    const originalBoxShadow = element.style.boxShadow;
    
    element.style.animation = `pulse-glow ${duration}ms ease-in-out infinite`;
    
    // 添加脉冲关键帧
    if (!document.getElementById('pulse-keyframes')) {
      const style = document.createElement('style');
      style.id = 'pulse-keyframes';
      style.textContent = `
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px ${color}; }
          50% { box-shadow: 0 0 20px ${color}, 0 0 30px ${color}; }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      element.style.animation = '';
      element.style.boxShadow = originalBoxShadow;
    };
  },

  // 创建粒子效果
  createParticles: (container, count = 20, color = '#00ff00') => {
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${color};
        pointer-events: none;
        animation: particle-float ${2000 + Math.random() * 3000}ms ease-out forwards;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 5000);
    }
    
    // 添加粒子动画关键帧
    if (!document.getElementById('particle-keyframes')) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.textContent = `
        @keyframes particle-float {
          0% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(-100px) scale(0); 
          }
        }
      `;
      document.head.appendChild(style);
    }
  },

  // 创建进度条动画
  animateProgressBar: (element, fromValue, toValue, duration = 1000) => {
    if (!element) return;
    
    const startTime = Date.now();
    const difference = toValue - fromValue;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = fromValue + (difference * easeOutQuart);
      
      element.style.width = `${currentValue}%`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  },

  // 触觉反馈（移动设备）
  hapticFeedback: (type = 'light') => {
    if (navigator.vibrate) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50],
        double: [10, 50, 10],
        warning: [100, 50, 100, 50, 100]
      };
      
      navigator.vibrate(patterns[type] || patterns.light);
    }
  }
};
