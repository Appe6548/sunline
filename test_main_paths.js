// 测试主要游戏路径的脚本
import fs from 'fs';

// 读取游戏数据文件
const gameDataContent = fs.readFileSync('./src/gameData.js', 'utf8');

// 提取STORY_SCENARIOS对象
const scenarioMatch = gameDataContent.match(/export const STORY_SCENARIOS = \{([\s\S]*?)\};/);
if (!scenarioMatch) {
  console.error('无法找到STORY_SCENARIOS');
  process.exit(1);
}

// 解析场景数据
const scenarios = {};
const scenarioLines = scenarioMatch[1].split('\n');
let currentScenario = null;
let currentChoices = [];

scenarioLines.forEach(line => {
  const trimmed = line.trim();
  
  // 检测场景ID
  const scenarioMatch = trimmed.match(/^(\w+):\s*\{/);
  if (scenarioMatch) {
    if (currentScenario) {
      scenarios[currentScenario] = currentChoices;
    }
    currentScenario = scenarioMatch[1];
    currentChoices = [];
  }
  
  // 检测nextScenario
  const nextScenarioMatch = trimmed.match(/nextScenario:\s*['"](\w+)['"]/);
  if (nextScenarioMatch && currentScenario) {
    currentChoices.push(nextScenarioMatch[1]);
  }
});

// 添加最后一个场景
if (currentScenario) {
  scenarios[currentScenario] = currentChoices;
}

// 测试主要路径
console.log('🎮 测试主要游戏路径\n');

// 定义几条主要路径
const mainPaths = [
  {
    name: '探索商店路径',
    path: ['intro', 'first_contact', 'location_check', 'store_exploration', 'explore_store']
  },
  {
    name: '探索食堂路径', 
    path: ['intro', 'first_contact', 'location_check', 'cafeteria_exploration', 'explore_cafeteria']
  },
  {
    name: '安全探索路径',
    path: ['intro', 'first_contact', 'situation_report', 'safe_location_search', 'classroom_search']
  },
  {
    name: '真相揭露路径',
    path: ['intro', 'first_contact', 'situation_report', 'equipment_status', 'supply_search', 'storage_discovery', 'map_analysis', 'project_investigation', 'principals_office_search', 'classified_revelation', 'truth_mission', 'evidence_collection', 'data_download', 'emergency_escape', 'victory_ending']
  }
];

// 测试每条路径
mainPaths.forEach(pathTest => {
  console.log(`📍 测试路径: ${pathTest.name}`);
  let pathComplete = true;
  let brokenAt = null;
  
  for (let i = 0; i < pathTest.path.length - 1; i++) {
    const currentScene = pathTest.path[i];
    const nextScene = pathTest.path[i + 1];
    
    if (!scenarios[currentScene]) {
      console.log(`  ❌ 场景不存在: ${currentScene}`);
      pathComplete = false;
      brokenAt = currentScene;
      break;
    }
    
    if (!scenarios[currentScene].includes(nextScene)) {
      console.log(`  ❌ 路径断开: ${currentScene} -> ${nextScene}`);
      pathComplete = false;
      brokenAt = `${currentScene} -> ${nextScene}`;
      break;
    }
  }
  
  if (pathComplete) {
    console.log(`  ✅ 路径完整 (${pathTest.path.length} 个场景)`);
  } else {
    console.log(`  ❌ 路径断开于: ${brokenAt}`);
  }
  console.log('');
});

// 统计可达结局
const endings = Object.keys(scenarios).filter(scene => 
  scenarios[scene].length === 0 && scene.includes('ending')
);

console.log('🏆 可用结局:');
endings.forEach(ending => {
  console.log(`  - ${ending}`);
});

console.log(`\n📊 总结:`);
console.log(`总场景数: ${Object.keys(scenarios).length}`);
console.log(`结局场景数: ${endings.length}`);

// 检查从intro开始的可达性
function findReachableScenes(startScene, visited = new Set()) {
  if (visited.has(startScene) || !scenarios[startScene]) {
    return visited;
  }
  
  visited.add(startScene);
  
  scenarios[startScene].forEach(nextScene => {
    findReachableScenes(nextScene, visited);
  });
  
  return visited;
}

const reachableScenes = findReachableScenes('intro');
const unreachableScenes = Object.keys(scenarios).filter(scene => !reachableScenes.has(scene));

console.log(`可达场景数: ${reachableScenes.size}`);
console.log(`不可达场景数: ${unreachableScenes.length}`);

if (unreachableScenes.length > 0) {
  console.log('\n🔍 不可达场景:');
  unreachableScenes.forEach(scene => {
    console.log(`  - ${scene}`);
  });
}
