// 游戏机制和逻辑处理

export const GameMechanics = {
  // 计算辐射伤害
  calculateRadiationDamage: (currentRadiation, timeExposed = 1) => {
    if (currentRadiation < 25) return 0;
    if (currentRadiation < 50) return Math.floor(timeExposed * 0.5);
    if (currentRadiation < 75) return Math.floor(timeExposed * 1);
    if (currentRadiation < 90) return Math.floor(timeExposed * 2);
    return Math.floor(timeExposed * 5); // 致命辐射
  },

  // 处理食物消费
  processFoodConsumption: (foodType, playerState) => {
    const effects = {
      health: 0,
      radiation: 0,
      message: ''
    };

    switch (foodType) {
      case '过期罐头':
        // 50% 概率获得健康，50% 概率食物中毒
        if (Math.random() > 0.5) {
          effects.health = 15;
          effects.message = '罐头虽然过期但还能食用，我感觉好了一些。';
        } else {
          effects.health = -10;
          effects.radiation = 5;
          effects.message = '糟糕...这个罐头已经变质了，我感觉很不舒服。';
        }
        break;
      
      case '冷冻食品':
        // 30% 概率安全，70% 概率有问题
        if (Math.random() > 0.7) {
          effects.health = 20;
          effects.message = '冷冻食品保存得还不错，补充了一些体力。';
        } else {
          effects.health = -5;
          effects.radiation = 10;
          effects.message = '食物已经开始腐败，但我别无选择...';
        }
        break;
      
      case '变质面包':
        effects.health = -15;
        effects.radiation = 8;
        effects.message = '面包已经发霉了，但我太饿了...这可能是个错误的决定。';
        break;
      
      default:
        effects.message = '我不确定这个食物是否安全...';
    }

    return effects;
  },

  // 处理环境危险
  processEnvironmentalHazard: (hazardType, playerState) => {
    const effects = {
      health: 0,
      radiation: 0,
      message: ''
    };

    switch (hazardType) {
      case '生化污染':
        effects.health = -20;
        effects.radiation = 15;
        effects.message = '我接触到了生化污染物质，感觉身体在恶化...';
        break;
      
      case '毒气':
        effects.health = -25;
        effects.message = '毒气让我呼吸困难，必须尽快离开这里！';
        break;
      
      case '地面塌陷风险':
        if (Math.random() > 0.7) {
          effects.health = -30;
          effects.message = '地面突然塌陷！我受了伤，但还能继续行动...';
        } else {
          effects.message = '我小心地避开了不稳定的地面。';
        }
        break;
      
      case '实验体':
        effects.health = -40;
        effects.radiation = 20;
        effects.message = '我遭遇了实验室的变异生物！它攻击了我！';
        break;
      
      default:
        effects.message = '这里有未知的危险...';
    }

    return effects;
  },

  // 处理物品使用
  processItemUsage: (itemType, playerState) => {
    const effects = {
      health: 0,
      radiation: 0,
      message: '',
      removeItem: true
    };

    switch (itemType) {
      case '止痛药':
        effects.health = 25;
        effects.message = '止痛药缓解了我的痛苦，感觉好多了。';
        break;
      
      case '医疗包':
        effects.health = 50;
        effects.message = '医疗包里的药品和绷带帮助我恢复了不少健康。';
        break;
      
      case '解毒剂':
        effects.radiation = -30;
        effects.health = 10;
        effects.message = '解毒剂减少了我体内的辐射，感觉清醒了许多。';
        break;
      
      case '防护服':
        effects.radiation = -20;
        effects.message = '穿上防护服后，我感觉辐射的影响减少了。';
        break;
      
      case '辐射检测器':
        effects.message = '辐射检测器现在可以准确显示周围的辐射水平了。';
        effects.removeItem = false; // 检测器不消耗
        break;
      
      case '清洁用品':
        effects.health = 5;
        effects.radiation = -5;
        effects.message = '用清洁用品简单清理了一下，感觉稍微好了一些。';
        break;
      
      default:
        effects.message = `我不知道如何使用${itemType}...`;
        effects.removeItem = false;
    }

    return effects;
  },

  // 检查游戏结束条件
  checkGameEndConditions: (playerState, currentScenario) => {
    const conditions = {
      isGameOver: false,
      isVictory: false,
      reason: ''
    };

    // 死亡条件
    if (playerState.health <= 0) {
      conditions.isGameOver = true;
      conditions.reason = '健康状况恶化导致通讯中断';
    } else if (playerState.radiation >= 100) {
      conditions.isGameOver = true;
      conditions.reason = '辐射水平过高导致设备故障';
    }

    // 所有胜利结局场景
    const victoryScenarios = [
      'victory_ending',           // 结局1: 真相揭露者
      'sacrifice_ending',         // 结局2: 无名英雄
      'resistance_ending',        // 结局3: 最后战士
      'negotiation_ending',       // 结局4: 谈判专家
      'broadcast_ending',         // 结局5: 真相广播者
      'stealth_ending',          // 结局6: 潜伏者
      'rescue_ending',           // 结局7: 救援者
      'destruction_ending',      // 结局8: 毁灭者
      'emergency_escape',        // 紧急逃脱
      'lab_destruction'          // 实验室毁灭
    ];

    if (victoryScenarios.includes(currentScenario)) {
      conditions.isVictory = true;
      conditions.reason = '任务完成';
    }

    // 传统胜利条件（到达医务室）
    if (playerState.hasKeyCard && playerState.currentLocation === 'medical_office') {
      conditions.isVictory = true;
      conditions.reason = '成功找到了关键信息和逃生路线';
    }

    return conditions;
  },

  // 计算移动成本
  calculateMovementCost: (fromLocation, toLocation, playerState) => {
    const cost = {
      health: 0,
      radiation: 0,
      message: ''
    };

    // 基础移动成本
    cost.health = -2;
    cost.radiation = 1;

    // 特殊位置的额外成本
    if (toLocation === 'playground') {
      cost.health -= 5;
      cost.radiation += 10;
      cost.message = '操场的恶臭和毒气让我感觉很不舒服...';
    } else if (toLocation === 'laboratory') {
      cost.radiation += 15;
      cost.message = '实验室的辐射水平很高，我必须小心行动。';
    } else if (toLocation === 'restroom') {
      cost.health -= 3;
      cost.radiation += 5;
      cost.message = '洗手间的环境让我感到恶心...';
    }

    return cost;
  },

  // 生成随机事件
  generateRandomEvent: (playerState) => {
    const events = [
      {
        probability: 0.1,
        type: 'equipment_malfunction',
        message: '我的设备出现了故障，辐射检测器读数不稳定...',
        effects: { radiation: 5 }
      },
      {
        probability: 0.05,
        type: 'find_supplies',
        message: '我在废墟中发现了一些有用的物资！',
        effects: { health: 10 },
        addItem: '医疗用品'
      },
      {
        probability: 0.08,
        type: 'radiation_spike',
        message: '辐射水平突然升高！我必须尽快找到掩护！',
        effects: { radiation: 15, health: -5 }
      },
      {
        probability: 0.03,
        type: 'communication_interference',
        message: '通讯出现了干扰...信号不稳定...',
        effects: {}
      }
    ];

    for (const event of events) {
      if (Math.random() < event.probability) {
        return event;
      }
    }

    return null;
  },

  // 应用游戏效果
  applyEffects: (effects, playerState) => {
    const newState = { ...playerState };

    if (effects.health) {
      newState.health = Math.max(0, Math.min(100, newState.health + effects.health));
    }

    if (effects.radiation) {
      newState.radiation = Math.max(0, Math.min(100, newState.radiation + effects.radiation));
    }

    return newState;
  }
};
