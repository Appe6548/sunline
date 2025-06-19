// 自动生成缺失场景的脚本
import fs from 'fs';

// 读取游戏数据文件
const gameDataContent = fs.readFileSync('./src/gameData.js', 'utf8');

// 提取STORY_SCENARIOS对象
const scenarioMatch = gameDataContent.match(/export const STORY_SCENARIOS = \{([\s\S]*?)\};/);
if (!scenarioMatch) {
  console.error('无法找到STORY_SCENARIOS');
  process.exit(1);
}

// 解析现有场景
const existingScenarios = new Set();
const scenarioLines = scenarioMatch[1].split('\n');
let currentScenario = null;

scenarioLines.forEach(line => {
  const trimmed = line.trim();
  const scenarioMatch = trimmed.match(/^(\w+):\s*\{/);
  if (scenarioMatch) {
    existingScenarios.add(scenarioMatch[1]);
  }
});

// 收集所有被引用的场景
const referencedScenarios = new Set();
scenarioLines.forEach(line => {
  const trimmed = line.trim();
  const nextScenarioMatch = trimmed.match(/nextScenario:\s*['"](\w+)['"]/);
  if (nextScenarioMatch) {
    referencedScenarios.add(nextScenarioMatch[1]);
  }
});

// 找出缺失的场景
const missingScenarios = [...referencedScenarios].filter(scenario => !existingScenarios.has(scenario));

console.log(`发现 ${missingScenarios.length} 个缺失场景`);

// 场景模板
const scenarioTemplates = {
  // 医疗相关
  medical: {
    keywords: ['medical', 'treatment', 'aid', 'health', 'medicine', 'care', 'healing', 'bandage', 'antiseptic'],
    template: (id) => ({
      id,
      speaker: 'survivor',
      message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
      choices: [
        { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
        { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
        { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
      ]
    })
  },
  
  // 搜索相关
  search: {
    keywords: ['search', 'find', 'look', 'explore', 'check', 'investigate', 'discover', 'room', 'area'],
    template: (id) => ({
      id,
      speaker: 'survivor',
      message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
      choices: [
        { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
        { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
        { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
      ]
    })
  },
  
  // 安全相关
  safety: {
    keywords: ['safe', 'secure', 'protection', 'shelter', 'hide', 'retreat', 'escape', 'avoid'],
    template: (id) => ({
      id,
      speaker: 'survivor',
      message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
      choices: [
        { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
        { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
        { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
      ]
    })
  },
  
  // 通讯相关
  communication: {
    keywords: ['contact', 'signal', 'communication', 'radio', 'call', 'message', 'transmission'],
    template: (id) => ({
      id,
      speaker: 'survivor',
      message: '我尝试了一些通讯方法。虽然信号不稳定，但我获得了一些有用的信息。',
      choices: [
        { id: 'continue_communication', text: '继续尝试通讯', nextScenario: 'outside_contact' },
        { id: 'focus_on_mission', text: '专注于任务', nextScenario: 'exploration_convergence' },
        { id: 'seek_better_signal', text: '寻找更好的信号', nextScenario: 'search_convergence' }
      ]
    })
  },
  
  // 默认模板
  default: {
    keywords: [],
    template: (id) => ({
      id,
      speaker: 'survivor',
      message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
      choices: [
        { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
        { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
        { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
      ]
    })
  }
};

// 为每个缺失场景选择合适的模板
function selectTemplate(scenarioId) {
  const lowerCaseId = scenarioId.toLowerCase();
  
  for (const [templateName, template] of Object.entries(scenarioTemplates)) {
    if (templateName === 'default') continue;
    
    if (template.keywords.some(keyword => lowerCaseId.includes(keyword))) {
      return template.template(scenarioId);
    }
  }
  
  return scenarioTemplates.default.template(scenarioId);
}

// 生成所有缺失场景
const generatedScenarios = missingScenarios.map(selectTemplate);

// 生成场景代码
const scenarioCode = generatedScenarios.map(scenario => {
  const choicesCode = scenario.choices.map(choice => 
    `      { id: '${choice.id}', text: '${choice.text}', nextScenario: '${choice.nextScenario}' }`
  ).join(',\n');
  
  return `  ${scenario.id}: {
    id: '${scenario.id}',
    speaker: '${scenario.speaker}',
    message: '${scenario.message}',
    choices: [
${choicesCode}
    ]
  }`;
}).join(',\n\n');

console.log('生成的场景代码：\n');
console.log(scenarioCode);

// 保存到文件
fs.writeFileSync('generated_scenarios.txt', scenarioCode);
console.log('\n场景代码已保存到 generated_scenarios.txt');
