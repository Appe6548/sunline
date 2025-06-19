// 游戏流程验证脚本
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

console.log('🎮 游戏流程验证报告\n');
console.log('📊 场景统计:');
console.log(`总场景数: ${Object.keys(scenarios).length}`);

// 检查断开的连接
const allScenarios = Object.keys(scenarios);
const referencedScenarios = new Set();
const brokenLinks = [];

Object.entries(scenarios).forEach(([scenarioId, nextScenarios]) => {
  nextScenarios.forEach(nextScenario => {
    referencedScenarios.add(nextScenario);
    if (!allScenarios.includes(nextScenario)) {
      brokenLinks.push(`${scenarioId} -> ${nextScenario}`);
    }
  });
});

console.log(`引用的场景数: ${referencedScenarios.size}`);
console.log(`断开的连接数: ${brokenLinks.length}\n`);

if (brokenLinks.length > 0) {
  console.log('❌ 断开的连接:');
  brokenLinks.forEach(link => {
    console.log(`  ${link}`);
  });
  console.log('');
}

// 检查孤立的场景（没有被引用的场景，除了intro）
const orphanedScenarios = allScenarios.filter(scenario => 
  scenario !== 'intro' && !referencedScenarios.has(scenario)
);

if (orphanedScenarios.length > 0) {
  console.log('🔍 孤立的场景（可能无法到达）:');
  orphanedScenarios.forEach(scenario => {
    console.log(`  ${scenario}`);
  });
  console.log('');
}

// 检查结局场景（没有选择的场景）
const endingScenarios = Object.entries(scenarios)
  .filter(([_, choices]) => choices.length === 0)
  .map(([scenarioId, _]) => scenarioId);

console.log('🏆 结局场景:');
endingScenarios.forEach(scenario => {
  console.log(`  ${scenario}`);
});

console.log(`\n总结:`);
console.log(`✅ 完整场景: ${allScenarios.length - brokenLinks.length}`);
console.log(`❌ 断开连接: ${brokenLinks.length}`);
console.log(`🔍 孤立场景: ${orphanedScenarios.length}`);
console.log(`🏆 结局场景: ${endingScenarios.length}`);

if (brokenLinks.length === 0) {
  console.log('\n🎉 游戏流程完整！所有场景都正确连接。');
} else {
  console.log('\n⚠️  发现断开的连接，需要修复。');
}
