// 自动添加剩余场景的脚本
import fs from 'fs';

// 读取生成的场景
const generatedScenarios = fs.readFileSync('./generated_scenarios.txt', 'utf8');

// 读取当前游戏数据文件
let gameDataContent = fs.readFileSync('./src/gameData.js', 'utf8');

// 找到STORY_SCENARIOS的结束位置
const scenarioEndMatch = gameDataContent.match(/(\s+)radio_signal_tracking:[\s\S]*?\}\s*\};/);
if (!scenarioEndMatch) {
  console.error('无法找到插入位置');
  process.exit(1);
}

// 获取需要添加的场景（跳过已经添加的前12个）
const scenarioLines = generatedScenarios.split('\n');
let startIndex = 0;
let scenarioCount = 0;

// 找到第13个场景的开始位置
for (let i = 0; i < scenarioLines.length; i++) {
  if (scenarioLines[i].trim().match(/^\w+:\s*\{/)) {
    scenarioCount++;
    if (scenarioCount === 13) {
      startIndex = i;
      break;
    }
  }
}

// 获取剩余场景
const remainingScenarios = scenarioLines.slice(startIndex).join('\n');

// 在radio_signal_tracking场景后插入剩余场景
const insertPosition = gameDataContent.indexOf('  radio_signal_tracking: {');
const afterRadioSignal = gameDataContent.indexOf('  }', insertPosition + 1);
const nextScenarioStart = gameDataContent.indexOf('\n}', afterRadioSignal);

const beforeInsertion = gameDataContent.substring(0, nextScenarioStart);
const afterInsertion = gameDataContent.substring(nextScenarioStart);

const newContent = beforeInsertion + ',\n\n  ' + remainingScenarios.trim() + afterInsertion;

// 写入新文件
fs.writeFileSync('./src/gameData.js', newContent);

console.log('✅ 成功添加所有剩余场景到游戏数据文件');
console.log('🎮 现在运行验证脚本检查结果...');
