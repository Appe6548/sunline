# 音效功能说明 (基于 Tone.js)

## 概述
为 Sunline 文字冒险游戏添加了基于 **Tone.js** 的专业音效系统，通过程序化合成音频，无需外部音频文件，提供丰富的沉浸式音效体验。

## 技术架构

### 使用 Tone.js 库
- **Tone.js**: 强大的 JavaScript 音频合成库
- **程序化音效**: 所有音效都通过代码实时合成
- **无文件依赖**: 不需要预先准备 mp3 或 wav 文件
- **高性能**: 基于 Web Audio API，低延迟播放

## 音效系统结构

### 1. 合成器（"乐器"）
每种音效都对应一个专门的合成器：

- **message**: 消息提示音 - 柔和的正弦波合成器
- **select**: 选项点击音 - 清脆的方波合成器
- **discover**: 发现物品音 - 明亮的三角波合成器
- **warning**: 警告音 - 刺耳的锯齿波合成器
- **ending**: 结局音效 - 多音和弦合成器
- **horror**: 恐怖音效 - 低频噪音合成器
- **heartbeat**: 心跳音效 - 低频膜合成器

### 2. 背景氛围音
- **循环氛围音**: 使用 Tone.Loop 创建无限循环的低音
- **随机触发**: 每8分钟随机播放一次，营造荒凉氛围
- **动态频率**: 40-100Hz 的低频范围，模拟末世环境

## 音效类型详解

### 1. 交互音效
- **按钮点击**: 清脆的 E5 音符，16分音符时长
- **消息提示**: G4-C5 上升音调序列，营造接收感
- **打字指示**: 轻微的 C6 高频音，模拟打字声

### 2. 状态音效
- **辐射警报**: A3 重复音符，刺耳的锯齿波
- **心跳循环**: C1 低频脉冲，1.2秒间隔循环
- **生命危险**: 当生命值 ≤ 30 时自动启动心跳循环

### 3. 场景特定音效
- **发现物品**: C5-E5-G5 上升三音符序列
- **恐怖场景**: C1-C3 低频噪音，营造不安感
- **警告场景**: A3 重复警报音，不同时长表示危险程度

### 4. 结局音效
- **好结局**: 大调和弦进行 (C-F-G-C)，愉悦上升
- **坏结局**: 小调和弦进行，不和谐音，压抑下沉

## 智能音效系统

### 内容识别播放
根据消息内容自动选择音效：
```javascript
if (text.includes('辐射') || text.includes('警报') || text.includes('危险')) {
    playSound('warning'); // 警告音
} else if (text.includes('找到') || text.includes('发现')) {
    playSound('discover'); // 发现音
} else if (specialClass === 'diary-entry') {
    playSound('horror'); // 恐怖音
}
```

### 场景音效映射
特定场景自动触发对应音效：
- `goToPlayground`: 辐射警报
- `mysteriousLab`: 恐怖氛围
- `enterMedicalOffice`: 发现成功音
- `armTheBomb`: 高强度警报

## 用户控制功能

### 音效开关
- 右上角音效按钮（🔊/🔇）
- 实时开关所有音效
- 保持氛围音循环状态

### 自动初始化
- 首次点击选项按钮时自动初始化
- 符合浏览器自动播放策略
- 优雅的加载提示和错误处理

## 音效参数详解

### 音符和时长
```javascript
playSound(soundType, note, duration, volume)
// 示例：
playSound('message', 'G4', '8n', 0.5)
// G4音符，8分音符时长，50%音量
```

### 音符说明
- **C4**: 中央C，标准参考音
- **A3**: 低音A，警报常用
- **G4-C5**: 中高音区，消息提示
- **C1-C2**: 极低音，恐怖/心跳效果

### 时长说明
- **32n**: 32分音符（极短）
- **16n**: 16分音符（短促）
- **8n**: 8分音符（标准）
- **4n**: 4分音符（中等）
- **2n**: 2分音符（长）
- **1n**: 全音符（很长）

## 性能优化

### 资源管理
- 合成器复用，避免重复创建
- 循环音效智能管理
- 自动清理不用的音频节点

### 内存优化
- 按需创建音效
- 及时释放循环资源
- 防止音效堆积

## 开发接口

### 核心函数
```javascript
// 播放单次音效
playSound('select', 'E5', '16n', 0.6);

// 播放结局音效
playEndingSound(true); // true=好结局，false=坏结局

// 心跳循环控制
startHeartbeatLoop();
stopHeartbeatLoop();
```

### 扩展新音效
```javascript
// 在 createSynths() 中添加新合成器
this.synths.newSound = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.1, decay: 0.3, sustain: 0.1, release: 0.5 }
}).toDestination();

// 在 playSound() 中添加播放逻辑
case 'newSound':
    synth.triggerAttackRelease("C4", "4n");
    break;
```

## 浏览器兼容性

- **现代浏览器**: Chrome 66+, Firefox 60+, Safari 14+, Edge 79+
- **移动端**: iOS Safari 14+, Chrome Mobile 66+
- **优雅降级**: 音效失败不影响游戏功能
- **自动播放**: 符合各浏览器的自动播放策略

## 音效列表

| 音效类型 | 触发条件 | 音符/参数 | 描述 |
|---------|---------|-----------|------|
| select | 点击选项 | E5, 16n | 清脆点击音 |
| message | 收到消息 | G4→C5 | 上升提示音 |
| discover | 发现物品 | C5→E5→G5 | 三音符成功音 |
| warning | 危险警报 | A3×3 | 重复警报音 |
| horror | 恐怖场景 | C1-C3噪音 | 低频不安音 |
| heartbeat | 生命≤30 | C1脉冲 | 1.2s循环心跳 |
| ending | 游戏结局 | 和弦进行 | 大调/小调结局 |

这个基于 Tone.js 的音效系统提供了专业级的音频体验，通过程序化合成实现了丰富多样的音效，完美契合游戏的各种场景和情绪需求。
