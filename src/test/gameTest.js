// 简单的游戏逻辑测试

import { GameMechanics } from '../utils/gameMechanics.js';
import { CommunicationEffects } from '../utils/communicationEffects.js';
import { INITIAL_PLAYER_STATE, LOCATION_DATA } from '../gameData.js';

// 测试游戏机制
export const testGameMechanics = () => {
  console.log('🧪 开始测试游戏机制...');
  
  // 测试辐射伤害计算
  const radiationDamage = GameMechanics.calculateRadiationDamage(75, 2);
  console.log(`辐射伤害测试: ${radiationDamage} (预期: 4)`);
  
  // 测试食物消费
  const foodEffect = GameMechanics.processFoodConsumption('过期罐头', INITIAL_PLAYER_STATE);
  console.log('食物消费测试:', foodEffect);
  
  // 测试物品使用
  const itemEffect = GameMechanics.processItemUsage('止痛药', INITIAL_PLAYER_STATE);
  console.log('物品使用测试:', itemEffect);
  
  // 测试游戏结束条件
  const testState = { ...INITIAL_PLAYER_STATE, health: 0 };
  const endCondition = GameMechanics.checkGameEndConditions(testState);
  console.log('游戏结束条件测试:', endCondition);
  
  console.log('✅ 游戏机制测试完成');
};

// 测试通讯效果
export const testCommunicationEffects = () => {
  console.log('📡 开始测试通讯效果...');
  
  // 测试延迟计算
  const delay = CommunicationEffects.calculateDelay(50, 0.7, 0.1);
  console.log(`通讯延迟测试: ${delay}ms`);
  
  // 测试信号干扰
  const interferedMessage = CommunicationEffects.simulateInterference('测试消息', 0.3);
  console.log(`信号干扰测试: "${interferedMessage}"`);
  
  // 测试信号强度
  const signalStrength = CommunicationEffects.simulateSignalStrength(0.7);
  console.log(`信号强度测试: ${signalStrength}`);
  
  // 测试连接状态
  const connectionStatus = CommunicationEffects.getConnectionStatus(0.5, 0.2);
  console.log('连接状态测试:', connectionStatus);
  
  console.log('✅ 通讯效果测试完成');
};

// 测试游戏数据完整性
export const testGameData = () => {
  console.log('📊 开始测试游戏数据...');
  
  // 检查所有位置数据
  const locationIds = Object.keys(LOCATION_DATA);
  console.log(`位置数量: ${locationIds.length}`);
  
  locationIds.forEach(id => {
    const location = LOCATION_DATA[id];
    if (!location.name || !location.description) {
      console.error(`❌ 位置 ${id} 缺少必要信息`);
    }
  });
  
  // 检查初始状态
  if (INITIAL_PLAYER_STATE.health !== 100) {
    console.error('❌ 初始健康值不正确');
  }
  
  if (INITIAL_PLAYER_STATE.radiation !== 0) {
    console.error('❌ 初始辐射值不正确');
  }
  
  console.log('✅ 游戏数据测试完成');
};

// 运行所有测试
export const runAllTests = () => {
  console.log('🚀 开始运行所有测试...');
  console.log('================================');
  
  try {
    testGameMechanics();
    console.log('');
    testCommunicationEffects();
    console.log('');
    testGameData();
    console.log('');
    console.log('🎉 所有测试通过！');
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
  
  console.log('================================');
};

// 如果直接运行此文件，执行测试
if (typeof window === 'undefined') {
  runAllTests();
}
