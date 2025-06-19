import { useState, useCallback, useEffect } from 'react';
import { INITIAL_PLAYER_STATE, GAME_STATES, LOCATION_DATA, RADIATION_LEVELS, STORY_SCENARIOS } from '../gameData';
import { GameMechanics } from '../utils/gameMechanics';

export const useGameState = () => {
  const [gameState, setGameState] = useState(INITIAL_PLAYER_STATE);
  const [messages, setMessages] = useState([]);
  const [currentScenario, setCurrentScenario] = useState('intro');
  const [isTyping, setIsTyping] = useState(false);

  // 更新玩家状态
  const updatePlayerState = useCallback((updates) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  // 添加消息到对话历史
  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, {
      ...message,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    }]);
  }, []);

  // 模拟打字效果
  const typeMessage = useCallback(async (message, speaker = 'survivor') => {
    setIsTyping(true);
    
    // 添加"正在输入"指示器
    const typingIndicator = {
      id: 'typing',
      speaker,
      message: '正在输入...',
      isTyping: true,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, typingIndicator]);
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // 移除打字指示器并添加真实消息
    setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
    
    addMessage({
      speaker,
      message,
      isComplete: true
    });
    
    setIsTyping(false);
  }, [addMessage]);

  // 获取选择效果的函数
  const getChoiceEffects = useCallback((choiceId, scenarioId) => {
    const effects = {
      health: 0,
      radiation: 0,
      items: [],
      discoveredLocation: null
    };

    // 根据具体的选择ID和场景ID定义效果
    const choiceEffectsMap = {
      // 第一层选择
      'help': { health: 0, radiation: 0, items: [] },
      'location': { health: 0, radiation: 0, items: [] },

      // 装备和安全选择
      'equipment_check': { health: 5, radiation: 0, items: ['辐射检测器'] },
      'explore_safe': { health: 10, radiation: -5, items: [] },
      'find_team': { health: 0, radiation: 5, items: [] },

      // 探索相关选择
      'check_store': { health: -5, radiation: 10, items: [], discoveredLocation: 'store' },
      'check_cafeteria': { health: -10, radiation: 15, items: [], discoveredLocation: 'cafeteria' },
      'avoid_playground': { health: 5, radiation: 5, items: [] },

      // 商店选择
      'take_canned_food': { health: -5, radiation: 5, items: ['过期罐头'] },
      'avoid_food': { health: 0, radiation: 0, items: ['清洁用品'] },
      'quick_search': { health: -2, radiation: 8, items: ['学校地图'] },

      // 食堂选择
      'check_freezer': { health: -5, radiation: 0, items: ['冷冻食品'] },
      'investigate_sound': { health: -5, radiation: 0, items: [] },
      'leave_cafeteria': { health: 0, radiation: 0, items: [] },

      // 变异生物遭遇
      'avoid_creature': { health: 0, radiation: 0, items: [] },
      'scare_away': { health: -2, radiation: 3, items: [] },
      'retreat_immediately': { health: 0, radiation: 0, items: [] },

      // 关键地图分析
      'study_map': { health: 0, radiation: 0, items: ['项目阳光线索'] },
      'read_classified_file': { health: 0, radiation: 0, items: ['绝密文件', '钥匙卡'] },
      'download_all_data': { health: 0, radiation: 0, items: ['实验数据'] },

      // 安全和医疗
      'rest_here': { health: 15, radiation: -5, items: [] },
      'search_classroom': { health: 0, radiation: 0, items: ['疏散计划', '禁区地图'] },
      'use_first_aid': { health: 25, radiation: 0, items: [] },

      // 新添加的场景效果
      // 食物相关
      'eat_carefully': { health: 5, radiation: 2, items: [] },
      'discard_food': { health: -2, radiation: 0, items: [] },
      'save_for_emergency': { health: 0, radiation: 0, items: ['应急食品'] },
      'cook_food_first': { health: 8, radiation: 1, items: [] },
      'eat_frozen_food_raw': { health: 3, radiation: 5, items: [] },

      // 医疗和健康
      'use_medical_supplies_now': { health: 20, radiation: 0, items: [] },
      'save_for_emergency': { health: 0, radiation: 0, items: ['医疗包'] },
      'bandage_wounds': { health: 10, radiation: 0, items: [] },
      'apply_antiseptic': { health: 8, radiation: 0, items: [] },
      'take_preventive_measures': { health: 5, radiation: -3, items: [] },

      // 探索和搜索
      'search_systematically': { health: -3, radiation: 2, items: ['有用物品'] },
      'quick_survey_all_areas': { health: -5, radiation: 5, items: ['基本物资'] },
      'search_hidden_rooms': { health: -2, radiation: 3, items: ['隐藏物品'] },
      'follow_maintenance_tunnels': { health: -8, radiation: 8, items: ['维修工具'] },

      // 武器和防护
      'take_knife_for_protection': { health: 0, radiation: 0, items: ['厨刀'] },
      'grab_medical_kit': { health: 0, radiation: 0, items: ['医疗包'] },
      'take_everything_quickly': { health: -3, radiation: 2, items: ['混合物资'] },

      // 钥匙卡和访问
      'try_electronic_lock': { health: 0, radiation: 0, items: [] },
      'enter_through_window': { health: -5, radiation: 0, items: [] },
      'activate_hidden_switch': { health: 0, radiation: 0, items: ['秘密通道访问'] },

      // 逃生和撤退
      'run_at_full_speed': { health: -10, radiation: 0, items: [] },
      'use_cover_while_moving': { health: -5, radiation: 0, items: [] },
      'create_distraction': { health: -3, radiation: 0, items: [] },

      // 辐射防护
      'find_protective_equipment': { health: 0, radiation: -10, items: ['防护设备'] },
      'wait_for_levels_to_drop': { health: -5, radiation: -5, items: [] },
      'find_alternative_route': { health: -2, radiation: 0, items: [] },

      // 环境清洁
      'clean_area': { health: 3, radiation: -2, items: [] },
      'establish_clean_zone': { health: 5, radiation: -5, items: [] },
      'use_area_as_base': { health: 10, radiation: -3, items: [] }
    };

    return choiceEffectsMap[choiceId] || effects;
  }, []);

  // 处理选择的效果
  const processChoiceEffects = useCallback((choiceId, scenarioId) => {
    // 根据选择ID应用游戏效果
    const effects = getChoiceEffects(choiceId, scenarioId);

    if (effects.health !== 0) {
      updatePlayerState(prevState => ({
        ...prevState,
        health: Math.max(0, Math.min(100, prevState.health + effects.health))
      }));
    }

    if (effects.radiation !== 0) {
      updatePlayerState(prevState => ({
        ...prevState,
        radiation: Math.max(0, Math.min(100, prevState.radiation + effects.radiation))
      }));
    }

    if (effects.items && effects.items.length > 0) {
      updatePlayerState(prevState => ({
        ...prevState,
        inventory: [...prevState.inventory, ...effects.items]
      }));
    }

    if (effects.discoveredLocation) {
      updatePlayerState(prevState => ({
        ...prevState,
        discoveredLocations: [...new Set([...prevState.discoveredLocations, effects.discoveredLocation])]
      }));
    }
  }, [updatePlayerState, getChoiceEffects]);

  // 处理玩家选择
  const makeChoice = useCallback(async (choiceText, nextScenario, choiceId) => {
    // 添加玩家的选择到消息历史
    addMessage({
      speaker: 'player',
      message: choiceText,
      isChoice: true
    });

    // 处理选择效果
    if (choiceId) {
      processChoiceEffects(choiceId, currentScenario);
    }

    // 延迟后更新场景并显示消息
    setTimeout(() => {
      setCurrentScenario(nextScenario);

      const scenario = STORY_SCENARIOS[nextScenario];
      if (scenario) {
        typeMessage(scenario.message, scenario.speaker);
      }
    }, 1000);
  }, [addMessage, currentScenario, processChoiceEffects, typeMessage]);



  // 移动到新位置
  const moveToLocation = useCallback((locationId) => {
    const location = LOCATION_DATA[locationId];
    if (!location) return;

    // 检查是否需要钥匙卡
    if (location.requiresKeyCard && !gameState.hasKeyCard) {
      typeMessage(`${location.name}需要钥匙卡才能进入，门紧锁着...`);
      return;
    }

    // 计算移动成本
    const movementCost = GameMechanics.calculateMovementCost(
      gameState.currentLocation,
      locationId,
      gameState
    );

    // 应用移动效果
    const newState = GameMechanics.applyEffects(movementCost, gameState);

    // 更新位置和发现的地点
    updatePlayerState({
      ...newState,
      currentLocation: locationId,
      discoveredLocations: [...new Set([...gameState.discoveredLocations, locationId])]
    });

    // 添加位置描述消息
    let message = `我到达了${location.name}。${location.description}`;
    if (movementCost.message) {
      message += ` ${movementCost.message}`;
    }
    typeMessage(message);

    // 检查随机事件
    const randomEvent = GameMechanics.generateRandomEvent(gameState);
    if (randomEvent) {
      setTimeout(() => {
        typeMessage(randomEvent.message);
        if (randomEvent.effects) {
          const eventState = GameMechanics.applyEffects(randomEvent.effects, gameState);
          updatePlayerState(eventState);
        }
      }, 2000);
    }
  }, [gameState, updatePlayerState, typeMessage]);

  // 使用物品
  const useItem = useCallback((itemId) => {
    const effects = GameMechanics.processItemUsage(itemId, gameState);

    // 应用效果
    const newState = GameMechanics.applyEffects(effects, gameState);

    // 更新库存
    const inventory = effects.removeItem
      ? gameState.inventory.filter(item => item !== itemId)
      : gameState.inventory;

    // 更新特殊状态
    const specialUpdates = {};
    if (itemId === '辐射检测器') {
      specialUpdates.hasRadiationDetector = true;
    }
    if (itemId === '止痛药') {
      specialUpdates.hasPainkillers = true;
    }

    updatePlayerState({
      ...newState,
      inventory,
      ...specialUpdates
    });

    typeMessage(effects.message);
  }, [gameState, updatePlayerState, typeMessage]);

  // 消费食物
  const consumeFood = useCallback((foodType) => {
    const effects = GameMechanics.processFoodConsumption(foodType, gameState);

    // 应用效果
    const newState = GameMechanics.applyEffects(effects, gameState);

    // 从库存中移除食物
    const inventory = gameState.inventory.filter(item => item !== foodType);

    updatePlayerState({
      ...newState,
      inventory
    });

    typeMessage(effects.message);
  }, [gameState, updatePlayerState, typeMessage]);

  // 处理环境危险
  const handleEnvironmentalHazard = useCallback((hazardType) => {
    const effects = GameMechanics.processEnvironmentalHazard(hazardType, gameState);

    // 应用效果
    const newState = GameMechanics.applyEffects(effects, gameState);

    updatePlayerState(newState);
    typeMessage(effects.message);
  }, [gameState, updatePlayerState, typeMessage]);

  // 检查游戏结束条件
  useEffect(() => {
    const endConditions = GameMechanics.checkGameEndConditions(gameState, currentScenario);

    if (endConditions.isGameOver) {
      updatePlayerState({ gameState: GAME_STATES.GAME_OVER });
      typeMessage(`通讯中断... ${endConditions.reason}...`, 'system');
    } else if (endConditions.isVictory) {
      updatePlayerState({ gameState: GAME_STATES.VICTORY });
      typeMessage(`任务完成！${endConditions.reason}！`, 'system');
    }
  }, [gameState, currentScenario, updatePlayerState, typeMessage]);



  // 获取当前辐射等级
  const getCurrentRadiationLevel = useCallback(() => {
    const radiation = gameState.radiation;
    if (radiation < 25) return RADIATION_LEVELS.SAFE;
    if (radiation < 50) return RADIATION_LEVELS.LOW;
    if (radiation < 75) return RADIATION_LEVELS.MODERATE;
    if (radiation < 90) return RADIATION_LEVELS.HIGH;
    return RADIATION_LEVELS.CRITICAL;
  }, [gameState.radiation]);

  return {
    gameState,
    messages,
    currentScenario,
    isTyping,
    updatePlayerState,
    addMessage,
    typeMessage,
    makeChoice,
    moveToLocation,
    useItem,
    consumeFood,
    handleEnvironmentalHazard,
    getCurrentRadiationLevel
  };
};
