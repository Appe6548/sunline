// 游戏状态和数据结构

export const LOCATIONS = {
  ENTRANCE: 'entrance',
  STORE: 'store',
  CAFETERIA: 'cafeteria',
  PLAYGROUND: 'playground',
  RESTROOM: 'restroom',
  LABORATORY: 'laboratory',
  CLASSROOM: 'classroom',
  MEDICAL_OFFICE: 'medical_office'
};

export const GAME_STATES = {
  INTRO: 'intro',
  EXPLORING: 'exploring',
  CONVERSATION: 'conversation',
  CHOICE: 'choice',
  GAME_OVER: 'game_over',
  VICTORY: 'victory'
};

export const INITIAL_PLAYER_STATE = {
  health: 100,
  radiation: 0,
  inventory: [],
  currentLocation: LOCATIONS.ENTRANCE,
  gameState: GAME_STATES.INTRO,
  storyProgress: 0,
  discoveredLocations: [LOCATIONS.ENTRANCE],
  hasRadiationDetector: false,
  hasPainkillers: false,
  hasKeyCard: false,
  communicationActive: true
};

export const RADIATION_LEVELS = {
  SAFE: { level: 0, color: '#00ff00', description: '安全' },
  LOW: { level: 25, color: '#ffff00', description: '轻微辐射' },
  MODERATE: { level: 50, color: '#ff8800', description: '中等辐射' },
  HIGH: { level: 75, color: '#ff4400', description: '高辐射' },
  CRITICAL: { level: 90, color: '#ff0000', description: '致命辐射' }
};

export const LOCATION_DATA = {
  [LOCATIONS.ENTRANCE]: {
    name: '学校入口',
    description: '破败的学校大门，铁锈斑斑的牌子上还能看到"阳光学校"几个字。周围散落着探索队的装备...',
    radiationLevel: RADIATION_LEVELS.LOW,
    items: ['辐射检测器'],
    dangers: [],
    connections: [LOCATIONS.STORE, LOCATIONS.CAFETERIA, LOCATIONS.PLAYGROUND]
  },
  [LOCATIONS.STORE]: {
    name: '学校商店',
    description: '货架上摆满了过期的食品，包装已经发霉变色。空气中弥漫着腐败的气味...',
    radiationLevel: RADIATION_LEVELS.MODERATE,
    items: ['过期罐头', '变质面包'],
    dangers: ['食物中毒风险'],
    connections: [LOCATIONS.ENTRANCE, LOCATIONS.CAFETERIA]
  },
  [LOCATIONS.CAFETERIA]: {
    name: '学校食堂',
    description: '餐桌上还残留着未清理的饭菜，已经腐烂发臭。厨房里传来奇怪的声音...',
    radiationLevel: RADIATION_LEVELS.HIGH,
    items: ['脏水', '腐烂食物'],
    dangers: ['严重污染', '未知生物'],
    connections: [LOCATIONS.ENTRANCE, LOCATIONS.STORE, LOCATIONS.CLASSROOM]
  },
  [LOCATIONS.PLAYGROUND]: {
    name: '学校操场',
    description: '操场上散发着令人作呕的恶臭，地面上有奇怪的绿色液体渗出...',
    radiationLevel: RADIATION_LEVELS.CRITICAL,
    items: [],
    dangers: ['毒气', '地面塌陷风险'],
    connections: [LOCATIONS.ENTRANCE, LOCATIONS.RESTROOM]
  },
  [LOCATIONS.RESTROOM]: {
    name: '洗手间',
    description: '极度肮脏，恶臭难忍。墙上有奇怪的涂鸦和血迹...',
    radiationLevel: RADIATION_LEVELS.HIGH,
    items: ['清洁用品'],
    dangers: ['生化污染'],
    connections: [LOCATIONS.PLAYGROUND, LOCATIONS.LABORATORY]
  },
  [LOCATIONS.LABORATORY]: {
    name: '神秘实验室',
    description: '一楼的秘密实验室，门上贴着生化危险标志。里面传来微弱的机器运转声...',
    radiationLevel: RADIATION_LEVELS.CRITICAL,
    items: ['实验记录', '防护服'],
    dangers: ['生化泄漏', '实验体'],
    connections: [LOCATIONS.RESTROOM, LOCATIONS.MEDICAL_OFFICE],
    requiresKeyCard: true
  },
  [LOCATIONS.CLASSROOM]: {
    name: '教室',
    description: '课桌椅散乱，黑板上还写着最后一堂课的内容。书架后面似乎藏着什么...',
    radiationLevel: RADIATION_LEVELS.MODERATE,
    items: ['止痛药', '学生日记'],
    dangers: [],
    connections: [LOCATIONS.CAFETERIA, LOCATIONS.MEDICAL_OFFICE]
  },
  [LOCATIONS.MEDICAL_OFFICE]: {
    name: '医务室',
    description: '门紧锁着，需要特殊权限才能进入。透过窗户能看到里面有重要的医疗设备...',
    radiationLevel: RADIATION_LEVELS.LOW,
    items: ['医疗包', '解毒剂', '关键文件'],
    dangers: [],
    connections: [LOCATIONS.CLASSROOM, LOCATIONS.LABORATORY],
    requiresKeyCard: true
  }
};

export const STORY_SCENARIOS = {
  intro: {
    id: 'intro',
    speaker: 'system',
    message: '通讯建立中... 信号微弱... 连接成功！',
    choices: [
      { id: 'start', text: '开始通讯', nextScenario: 'first_contact' }
    ]
  },
  first_contact: {
    id: 'first_contact',
    speaker: 'survivor',
    message: '喂？有人吗？我是探索队成员李明，我和队伍失散了！这里的辐射很强，我需要帮助！',
    choices: [
      { id: 'help', text: '我来帮助你，告诉我你的情况', nextScenario: 'situation_report' },
      { id: 'location', text: '你现在在哪里？', nextScenario: 'location_check' }
    ]
  },
  situation_report: {
    id: 'situation_report',
    speaker: 'survivor',
    message: '我现在在学校入口附近，辐射检测器显示这里的辐射水平在上升。我的防护服有些破损，健康状况还算稳定，但我担心时间不多了...',
    choices: [
      { id: 'equipment_check', text: '检查你的装备和物资', nextScenario: 'equipment_status' },
      { id: 'explore_safe', text: '寻找相对安全的地方', nextScenario: 'safe_location_search' },
      { id: 'find_team', text: '尝试联系你的队友', nextScenario: 'team_contact_attempt' }
    ]
  },
  location_check: {
    id: 'location_check',
    speaker: 'survivor',
    message: '我在阳光学校的正门入口。这个地方...很诡异。到处都是废墟，空气中有种奇怪的味道。我能看到几个方向可以探索：商店、食堂和操场。',
    choices: [
      { id: 'check_store', text: '先去商店看看，可能有有用的物资', nextScenario: 'explore_store' },
      { id: 'check_cafeteria', text: '去食堂，也许能找到食物', nextScenario: 'explore_cafeteria' },
      { id: 'avoid_playground', text: '操场看起来很危险，先避开', nextScenario: 'safe_exploration' }
    ]
  },
  equipment_status: {
    id: 'equipment_status',
    speaker: 'survivor',
    message: '让我检查一下...我有一个破损的辐射检测器，还能工作但读数不太准确。还有一些基本的医疗用品，但数量有限。我的通讯设备还能正常工作，这是好消息。',
    choices: [
      { id: 'repair_detector', text: '尝试修理辐射检测器', nextScenario: 'detector_repair' },
      { id: 'conserve_supplies', text: '节约使用医疗用品', nextScenario: 'supply_management' },
      { id: 'explore_for_supplies', text: '探索周围寻找更多物资', nextScenario: 'supply_search' }
    ]
  },
  explore_store: {
    id: 'explore_store',
    speaker: 'survivor',
    message: '我进入了商店...天哪，这里的气味太可怕了。货架上的食品都已经过期很久，有些包装已经破裂发霉。但是...等等，我在角落里发现了一些密封的罐头，看起来还能食用。',
    choices: [
      { id: 'take_canned_food', text: '拿走那些罐头，但要小心检查', nextScenario: 'canned_food_decision' },
      { id: 'avoid_food', text: '太危险了，不要碰任何食物', nextScenario: 'store_other_items' },
      { id: 'quick_search', text: '快速搜索其他有用物品然后离开', nextScenario: 'store_quick_search' }
    ]
  },
  explore_cafeteria: {
    id: 'explore_cafeteria',
    speaker: 'survivor',
    message: '食堂里的情况比我想象的还要糟糕...餐桌上还有腐烂的食物，散发着恶臭。但是我注意到厨房里有个冷藏室，门是关着的。另外，我听到了奇怪的声音从厨房深处传来...',
    choices: [
      { id: 'check_freezer', text: '检查冷藏室，可能有保存完好的食物', nextScenario: 'freezer_investigation' },
      { id: 'investigate_sound', text: '小心调查那个奇怪的声音', nextScenario: 'kitchen_sound_check' },
      { id: 'leave_cafeteria', text: '这里太危险，立即离开', nextScenario: 'cafeteria_retreat' }
    ]
  },
  canned_food_decision: {
    id: 'canned_food_decision',
    speaker: 'survivor',
    message: '我仔细检查了这些罐头...有几个看起来还是密封完好的，生产日期虽然有些久远但应该还能食用。不过我的辐射检测器在这些罐头附近有轻微的反应...',
    choices: [
      { id: 'eat_canned_food', text: '冒险食用，我需要补充体力', nextScenario: 'food_consumption_risk' },
      { id: 'save_for_later', text: '先收起来，等找到更安全的地方再决定', nextScenario: 'food_storage' },
      { id: 'test_radiation', text: '用检测器仔细测试辐射水平', nextScenario: 'radiation_test_food' }
    ]
  },
  freezer_investigation: {
    id: 'freezer_investigation',
    speaker: 'survivor',
    message: '冷藏室的门很重...我费了很大力气才打开。里面一片漆黑，但是...等等，我的手电筒照到了什么。这里有一些冷冻食品，虽然电力早就断了，但低温似乎延缓了腐败过程。',
    choices: [
      { id: 'take_frozen_food', text: '拿一些看起来还能吃的冷冻食品', nextScenario: 'frozen_food_risk' },
      { id: 'search_deeper', text: '继续搜索冷藏室深处', nextScenario: 'freezer_deep_search' },
      { id: 'leave_freezer', text: '感觉不对劲，赶紧离开', nextScenario: 'freezer_escape' }
    ]
  },
  kitchen_sound_check: {
    id: 'kitchen_sound_check',
    speaker: 'survivor',
    message: '我小心地朝声音的方向走去...那声音越来越清楚了，像是...像是什么东西在移动。我的心跳加速了。突然，一只变异的老鼠从垃圾堆里窜了出来！它的体型比正常老鼠大了好几倍！',
    choices: [
      { id: 'avoid_creature', text: '保持距离，不要惊动它', nextScenario: 'creature_avoidance' },
      { id: 'scare_away', text: '制造噪音把它吓跑', nextScenario: 'creature_scare' },
      { id: 'retreat_immediately', text: '立即后退离开厨房', nextScenario: 'kitchen_retreat' }
    ]
  },
  creature_avoidance: {
    id: 'creature_avoidance',
    speaker: 'survivor',
    message: '我屏住呼吸，尽量不发出声音。变异老鼠似乎没有注意到我，它在垃圾堆里翻找着什么。我注意到它的眼睛发出奇怪的绿光...这一定是辐射造成的变异。我需要小心地绕过它。',
    choices: [
      { id: 'sneak_past', text: '小心翼翼地绕过它', nextScenario: 'successful_sneak' },
      { id: 'wait_it_out', text: '等它离开再行动', nextScenario: 'waiting_game' },
      { id: 'observe_creature', text: '仔细观察这个变异生物', nextScenario: 'creature_study' }
    ]
  },
  creature_scare: {
    id: 'creature_scare',
    speaker: 'survivor',
    message: '我拿起一个空罐子扔向墙壁，发出巨大的声响。变异老鼠被吓了一跳，发出刺耳的尖叫声，然后迅速逃向厨房深处。但是...这个声音可能会引来其他东西的注意。',
    choices: [
      { id: 'quick_search_kitchen', text: '趁机快速搜索厨房', nextScenario: 'kitchen_quick_search' },
      { id: 'leave_immediately', text: '立即离开，避免引来更多麻烦', nextScenario: 'cafeteria_exit' },
      { id: 'prepare_defense', text: '准备应对可能出现的其他威胁', nextScenario: 'defense_preparation' }
    ]
  },
  successful_sneak: {
    id: 'successful_sneak',
    speaker: 'survivor',
    message: '我成功地绕过了变异老鼠，来到了厨房的另一侧。这里有一个储物柜，里面可能有有用的东西。我还发现了一扇通向后院的门，但门上有很多锈迹，不知道还能不能打开。',
    choices: [
      { id: 'check_storage', text: '检查储物柜', nextScenario: 'storage_discovery' },
      { id: 'try_back_door', text: '尝试打开后门', nextScenario: 'back_door_attempt' },
      { id: 'return_safely', text: '拿到想要的东西后安全返回', nextScenario: 'safe_return' }
    ]
  },
  storage_discovery: {
    id: 'storage_discovery',
    speaker: 'survivor',
    message: '储物柜里有一些清洁用品和...等等，这是什么？一张学校的平面图！上面标注着一些我之前不知道的区域，包括一个地下室入口。这可能很重要。',
    choices: [
      { id: 'study_map', text: '仔细研究这张地图', nextScenario: 'map_analysis' },
      { id: 'take_supplies', text: '拿走清洁用品和地图', nextScenario: 'supplies_taken' },
      { id: 'explore_basement', text: '根据地图寻找地下室入口', nextScenario: 'basement_search' }
    ]
  },
  map_analysis: {
    id: 'map_analysis',
    speaker: 'survivor',
    message: '根据地图，我发现学校的布局比我想象的复杂。除了我已知的区域，还有一个地下实验室、一个紧急避难所，以及一条通往外界的秘密通道。地图上还标注着"项目阳光"的字样...',
    choices: [
      { id: 'investigate_project', text: '寻找关于"项目阳光"的更多信息', nextScenario: 'project_investigation' },
      { id: 'find_shelter', text: '寻找紧急避难所', nextScenario: 'shelter_search' },
      { id: 'locate_exit', text: '寻找秘密通道出口', nextScenario: 'secret_exit_search' }
    ]
  },
  project_investigation: {
    id: 'project_investigation',
    speaker: 'survivor',
    message: '我决定深入调查"项目阳光"。根据地图指示，相关资料应该在一楼的神秘实验室里。但要进入那里，我需要找到钥匙卡。地图显示钥匙卡可能在校长办公室或者医务室里。',
    choices: [
      { id: 'find_principals_office', text: '寻找校长办公室', nextScenario: 'principals_office_search' },
      { id: 'head_to_medical', text: '前往医务室寻找钥匙卡', nextScenario: 'medical_office_approach' },
      { id: 'explore_lab_exterior', text: '先去实验室外围探查', nextScenario: 'lab_exterior_recon' }
    ]
  },
  principals_office_search: {
    id: 'principals_office_search',
    speaker: 'survivor',
    message: '我找到了校长办公室，门虽然锁着但已经有些松动。办公室里一片狼藉，但我在办公桌的抽屉里发现了一张钥匙卡和一份标着"绝密"的文件。文件提到了一个名为"阳光计划"的实验...',
    choices: [
      { id: 'read_classified_file', text: '仔细阅读绝密文件', nextScenario: 'classified_revelation' },
      { id: 'take_keycard_leave', text: '拿走钥匙卡，立即离开', nextScenario: 'keycard_acquired' },
      { id: 'search_office_thoroughly', text: '彻底搜索办公室', nextScenario: 'office_thorough_search' }
    ]
  },
  classified_revelation: {
    id: 'classified_revelation',
    speaker: 'survivor',
    message: '文件内容让我震惊...阳光学校原来是一个秘密研究基地，"阳光计划"是一个关于人体辐射适应性的实验。学生们...他们都是实验对象。这里发生的"事故"根本不是意外，而是实验失控的结果！',
    choices: [
      { id: 'expose_truth', text: '我必须把真相告诉外界', nextScenario: 'truth_mission' },
      { id: 'find_survivors', text: '寻找可能还活着的实验对象', nextScenario: 'survivor_search' },
      { id: 'destroy_evidence', text: '销毁这些罪恶的证据', nextScenario: 'evidence_destruction' }
    ]
  },
  truth_mission: {
    id: 'truth_mission',
    speaker: 'survivor',
    message: '我必须活着离开这里，把真相公之于众。但首先，我需要收集更多证据。实验室里应该有更详细的资料，还有那些受害者的记录。我感到愤怒，但也更加坚定了逃离的决心。',
    choices: [
      { id: 'gather_evidence', text: '前往实验室收集证据', nextScenario: 'evidence_collection' },
      { id: 'find_escape_route', text: '寻找最安全的逃生路线', nextScenario: 'escape_planning' },
      { id: 'contact_outside', text: '尝试联系外界救援', nextScenario: 'outside_contact' }
    ]
  },
  evidence_collection: {
    id: 'evidence_collection',
    speaker: 'survivor',
    message: '我使用钥匙卡进入了实验室。这里的景象更加可怕...培养皿里还有未知的生物样本，电脑屏幕上显示着人体实验的数据。我找到了一个移动硬盘，里面应该有所有的实验记录。',
    choices: [
      { id: 'download_all_data', text: '下载所有实验数据', nextScenario: 'data_download' },
      { id: 'destroy_lab', text: '摧毁实验室，防止悲剧重演', nextScenario: 'lab_destruction' },
      { id: 'escape_with_evidence', text: '带着证据立即逃离', nextScenario: 'evidence_escape' }
    ]
  },
  data_download: {
    id: 'data_download',
    speaker: 'survivor',
    message: '数据下载完成了。我现在掌握了足够的证据来揭露这个阴谋。但是警报响了！安全系统被触发了，我必须立即离开。我听到了脚步声...有人来了！',
    choices: [
      { id: 'run_to_exit', text: '冲向最近的出口', nextScenario: 'emergency_escape' },
      { id: 'hide_and_wait', text: '找地方躲起来', nextScenario: 'hiding_attempt' },
      { id: 'confront_arrivals', text: '准备面对来者', nextScenario: 'final_confrontation' }
    ]
  },
  emergency_escape: {
    id: 'emergency_escape',
    speaker: 'survivor',
    message: '我拼命奔跑，冲出了学校。外面的新鲜空气让我感到重生。我成功了！我带着真相逃了出来。现在我要把这些证据交给媒体，让全世界知道阳光学校的真相！',
    choices: [
      { id: 'victory_truth', text: '任务完成 - 真相大白', nextScenario: 'victory_ending' }
    ]
  },
  lab_destruction: {
    id: 'lab_destruction',
    speaker: 'survivor',
    message: '我启动了实验室的自毁程序。这个邪恶的地方将被彻底摧毁，再也不会有人受到伤害。爆炸声响起，我感受到了正义的力量。虽然我可能无法活着离开，但我阻止了更多的悲剧。',
    choices: [
      { id: 'heroic_sacrifice', text: '英勇牺牲 - 拯救未来', nextScenario: 'sacrifice_ending' }
    ]
  },
  final_confrontation: {
    id: 'final_confrontation',
    speaker: 'survivor',
    message: '一群穿着防护服的人出现了。他们是实验的幕后黑手！领头的人说："你看到了不该看的东西。"但我不会屈服，我要为所有受害者讨回公道！',
    choices: [
      { id: 'fight_back', text: '奋起反抗', nextScenario: 'resistance_ending' },
      { id: 'negotiate', text: '尝试谈判', nextScenario: 'negotiation_ending' },
      { id: 'broadcast_truth', text: '立即广播真相', nextScenario: 'broadcast_ending' }
    ]
  },
  victory_ending: {
    id: 'victory_ending',
    speaker: 'system',
    message: '🎉 胜利结局：真相揭露者 🎉\n\n你成功帮助李明逃离了阳光学校，并揭露了"阳光计划"的真相。媒体报道震惊了全世界，相关责任人被绳之以法。李明成为了英雄，拯救了无数可能成为实验对象的无辜生命。',
    choices: []
  },
  sacrifice_ending: {
    id: 'sacrifice_ending',
    speaker: 'system',
    message: '🔥 英勇结局：无名英雄 🔥\n\n李明选择了牺牲自己来摧毁邪恶的实验室。虽然他没能活着离开，但他的行为阻止了更多的悲剧发生。后来的调查者发现了他留下的线索，最终揭露了真相。他将被永远铭记。',
    choices: []
  },
  resistance_ending: {
    id: 'resistance_ending',
    speaker: 'system',
    message: '⚔️ 反抗结局：最后的战士 ⚔️\n\n在激烈的对抗中，李明虽然寡不敌众，但他的勇气感动了一些良心未泯的研究人员。他们联手反抗，最终制服了幕后黑手。正义得到了伸张，真相得以大白。',
    choices: []
  },
  // 添加缺失的场景
  safe_location_search: {
    id: 'safe_location_search',
    speaker: 'survivor',
    message: '我在寻找相对安全的地方...找到了一个看起来结构还算稳固的教室。这里的辐射水平稍微低一些，我可以在这里休息一下。',
    choices: [
      { id: 'search_classroom', text: '仔细搜索教室', nextScenario: 'classroom_search' },
      { id: 'rest_here', text: '在这里休息恢复体力', nextScenario: 'rest_recovery' },
      { id: 'continue_searching', text: '继续寻找更安全的地方', nextScenario: 'continue_safe_search' }
    ]
  },
  team_contact_attempt: {
    id: 'team_contact_attempt',
    speaker: 'survivor',
    message: '我尝试用无线电联系队友...只有静电噪音。等等，我听到了微弱的信号！但很快就消失了。看来他们可能还活着，但距离很远或者信号被干扰了。',
    choices: [
      { id: 'continue_contact', text: '继续尝试联系', nextScenario: 'continue_contact' },
      { id: 'move_toward_signal', text: '朝信号方向移动', nextScenario: 'move_toward_signal' },
      { id: 'stop_contact', text: '停止联系，避免暴露位置', nextScenario: 'stop_contact' }
    ]
  },
  safe_exploration: {
    id: 'safe_exploration',
    speaker: 'survivor',
    message: '我决定避开看起来危险的操场，选择更安全的路线。我沿着建筑物的边缘行走，发现了一条通往后院的小径。这里相对安静，辐射水平也较低。',
    choices: [
      { id: 'explore_backyard', text: '探索后院区域', nextScenario: 'backyard_exploration' },
      { id: 'find_building_entrance', text: '寻找其他建筑入口', nextScenario: 'building_entrance_search' },
      { id: 'return_main', text: '返回主要区域', nextScenario: 'return_main_area' }
    ]
  },
  detector_repair: {
    id: 'detector_repair',
    speaker: 'survivor',
    message: '我尝试修理辐射检测器...经过一番努力，我成功让它的读数更加准确了。现在我可以更好地监控周围的辐射水平。',
    choices: [
      { id: 'scan_area', text: '用修好的检测器扫描周围', nextScenario: 'radiation_scan' },
      { id: 'continue_exploring', text: '继续探索寻找更多物资', nextScenario: 'continue_exploration' },
      { id: 'repair_other_equipment', text: '寻找其他需要修理的设备', nextScenario: 'equipment_repair_search' }
    ]
  },
  supply_management: {
    id: 'supply_management',
    speaker: 'survivor',
    message: '我决定谨慎使用医疗用品。我检查了一下，有几片止痛药和一些绷带。我需要在真正需要的时候才使用它们。',
    choices: [
      { id: 'use_painkiller', text: '立即使用一片止痛药', nextScenario: 'immediate_medication' },
      { id: 'save_supplies', text: '保存所有药品以备不时之需', nextScenario: 'save_medication' },
      { id: 'find_more_medical', text: '寻找更多医疗用品', nextScenario: 'medical_supply_search' }
    ]
  },
  supply_search: {
    id: 'supply_search',
    speaker: 'survivor',
    message: '我开始仔细搜索周围区域...在一个废弃的储物柜里，我发现了一些有用的东西：一个手电筒、一些电池，还有一瓶清洁用的酒精。',
    choices: [
      { id: 'use_flashlight', text: '用手电筒探索更深的区域', nextScenario: 'deep_exploration' },
      { id: 'clean_wounds', text: '用酒精清洁伤口', nextScenario: 'wound_cleaning' },
      { id: 'search_more_areas', text: '继续搜索其他区域', nextScenario: 'area_search_continue' },
      { id: 'check_storage', text: '仔细检查储物柜', nextScenario: 'storage_discovery' }
    ]
  },
  store_other_items: {
    id: 'store_other_items',
    speaker: 'survivor',
    message: '我避开了可疑的食物，转而搜索其他有用的物品。在收银台后面，我发现了一个急救包和一些清洁用品。虽然不是食物，但这些东西可能很有用。',
    choices: [
      { id: 'use_first_aid', text: '立即使用急救包治疗', nextScenario: 'first_aid_treatment' },
      { id: 'save_first_aid', text: '保存急救包以备后用', nextScenario: 'save_first_aid' },
      { id: 'clean_environment', text: '用清洁用品清理周围环境', nextScenario: 'environment_cleaning' }
    ]
  },
  store_quick_search: {
    id: 'store_quick_search',
    speaker: 'survivor',
    message: '我快速搜索商店，避免在这个污染严重的地方停留太久。在一个角落里，我发现了一张学校的平面图！这可能很重要。',
    choices: [
      { id: 'study_map', text: '仔细研究这张地图', nextScenario: 'map_analysis' },
      { id: 'take_map_leave', text: '拿走地图立即离开', nextScenario: 'quick_exit_with_map' },
      { id: 'search_more_items', text: '继续快速搜索其他有用物品', nextScenario: 'continue_quick_search' }
    ]
  },
  // 添加更多缺失的结局场景
  hiding_attempt: {
    id: 'hiding_attempt',
    speaker: 'survivor',
    message: '我找到了一个隐蔽的地方躲了起来...等他们离开后，我悄悄地带着证据逃了出去。虽然过程惊险，但我成功了。',
    choices: [
      { id: 'stealth_escape', text: '潜伏者结局 - 隐秘英雄', nextScenario: 'stealth_ending' }
    ]
  },
  negotiation_ending: {
    id: 'negotiation_ending',
    speaker: 'system',
    message: '🤝 智慧结局：谈判专家 🤝\n\n通过巧妙的谈判和道德感化，李明成功说服了部分研究人员。他们意识到实验的邪恶本质，决定与李明合作揭露真相。通过内部人员的帮助，真相得以安全传播到外界。',
    choices: []
  },
  broadcast_ending: {
    id: 'broadcast_ending',
    speaker: 'system',
    message: '📡 传播结局：真相广播者 📡\n\n李明冒着生命危险，通过学校的紧急广播系统向全世界传播了真相。虽然他可能无法安全逃脱，但真相已经传播开来。全世界都知道了阳光学校的秘密，正义终将得到伸张。',
    choices: []
  },
  stealth_ending: {
    id: 'stealth_ending',
    speaker: 'system',
    message: '🕵️ 隐秘结局：潜伏者 🕵️\n\n李明选择了更谨慎的方式，成功躲过了追捕并带着证据逃离。虽然过程更加惊险，但最终真相还是得以揭露。有时候，智慧比勇气更重要。',
    choices: []
  },
  survivor_search: {
    id: 'survivor_search',
    speaker: 'survivor',
    message: '我决定寻找可能还活着的实验对象...在地下室找到了几个还活着的受害者。他们虚弱但还有希望。我必须带他们一起逃离！',
    choices: [
      { id: 'rescue_survivors', text: '救援者结局 - 人道主义英雄', nextScenario: 'rescue_ending' }
    ]
  },
  rescue_ending: {
    id: 'rescue_ending',
    speaker: 'system',
    message: '🛡️ 人道结局：救援者 🛡️\n\n李明选择了拯救幸存者而不是追求个人安全。虽然增加了逃脱的难度，但他成功救出了几名实验受害者。他们的证词成为了揭露真相的关键证据。',
    choices: []
  },
  evidence_destruction: {
    id: 'evidence_destruction',
    speaker: 'survivor',
    message: '我决定销毁这些罪恶的证据...也许有些真相永远不应该被揭露。我点燃了文件，看着它们化为灰烬。',
    choices: [
      { id: 'destruction_complete', text: '毁灭者结局 - 埋葬真相', nextScenario: 'destruction_ending' }
    ]
  },
  destruction_ending: {
    id: 'destruction_ending',
    speaker: 'system',
    message: '🔥 毁灭结局：真相埋葬者 🔥\n\n李明选择了销毁所有证据，让真相永远埋葬在历史中。也许他认为有些秘密太过可怕，不应该被世人知晓。真相随着火焰一起消失了。',
    choices: []
  },
  // 添加一些中间场景
  cafeteria_retreat: {
    id: 'cafeteria_retreat',
    speaker: 'survivor',
    message: '我决定立即离开这个危险的地方。在离开时，我注意到食堂的后门是开着的，通向一个我之前没有注意到的区域。',
    choices: [
      { id: 'explore_back_area', text: '通过后门探索新区域', nextScenario: 'back_door_exploration' },
      { id: 'return_to_main', text: '返回相对安全的主要区域', nextScenario: 'return_to_main' },
      { id: 'observe_back_door', text: '在后门附近观察一下再决定', nextScenario: 'back_door_observation' }
    ]
  },
  kitchen_retreat: {
    id: 'kitchen_retreat',
    speaker: 'survivor',
    message: '我迅速后退离开厨房，心跳还在加速。那只变异老鼠让我意识到这个地方比我想象的更加危险。我需要更加小心。',
    choices: [
      { id: 'find_safer_route', text: '寻找更安全的探索路线', nextScenario: 'safer_route_search' },
      { id: 'rest_and_plan', text: '找个地方休息并制定计划', nextScenario: 'rest_and_planning' },
      { id: 'continue_cautiously', text: '更加谨慎地继续探索', nextScenario: 'cautious_exploration' }
    ]
  },
  classroom_search: {
    id: 'classroom_search',
    speaker: 'survivor',
    message: '我仔细搜索这间教室...在讲台的抽屉里，我发现了一些有趣的东西：一份学校的紧急疏散计划，还有一张标注着"禁止进入"的区域地图。',
    choices: [
      { id: 'study_evacuation_plan', text: '仔细研究疏散计划', nextScenario: 'evacuation_plan_study' },
      { id: 'check_restricted_map', text: '查看禁区地图', nextScenario: 'restricted_area_map' },
      { id: 'search_other_classrooms', text: '搜索其他教室', nextScenario: 'other_classrooms_search' }
    ]
  },
  rest_recovery: {
    id: 'rest_recovery',
    speaker: 'survivor',
    message: '我在教室里休息了一会儿，感觉好了一些。但是休息时我听到了远处传来的奇怪声音...像是机械运转的声音。',
    choices: [
      { id: 'investigate_mechanical_sound', text: '朝机械声音的方向调查', nextScenario: 'mechanical_sound_investigation' },
      { id: 'ignore_sound', text: '忽略声音，继续休息', nextScenario: 'continue_rest' },
      { id: 'leave_to_investigate', text: '离开教室寻找声音来源', nextScenario: 'sound_source_search' }
    ]
  },
  // 添加更多中间场景
  continue_contact: {
    id: 'continue_contact',
    speaker: 'survivor',
    message: '我继续尝试联系队友...这次我听到了更清楚的信号！是队长的声音："...在地下室...危险...不要来..."信号又断了。',
    choices: [
      { id: 'find_basement', text: '立即寻找地下室入口', nextScenario: 'basement_search' },
      { id: 'get_more_info', text: '继续尝试联系获取更多信息', nextScenario: 'more_contact_attempts' },
      { id: 'heed_warning', text: '遵循队长的警告，不去地下室', nextScenario: 'heed_warning' }
    ]
  },
  move_toward_signal: {
    id: 'move_toward_signal',
    speaker: 'survivor',
    message: '我朝着信号的方向移动...来到了学校的实验楼附近。这里的辐射水平明显更高，我的检测器发出了警告声。但我注意到实验楼的门上有一个电子锁。',
    choices: [
      { id: 'hack_lock', text: '尝试破解电子锁', nextScenario: 'electronic_lock_hack' },
      { id: 'find_alternative', text: '寻找其他进入实验楼的方法', nextScenario: 'alternative_entry' },
      { id: 'retreat_radiation', text: '辐射太高，先撤退', nextScenario: 'radiation_retreat' }
    ]
  },
  stop_contact: {
    id: 'stop_contact',
    speaker: 'survivor',
    message: '我决定停止联系，避免暴露位置。这是明智的选择，因为我刚才听到了脚步声...有人或者什么东西在附近移动。',
    choices: [
      { id: 'hide_observe', text: '躲藏起来观察', nextScenario: 'hide_and_observe' },
      { id: 'stealth_follow', text: '悄悄跟踪声音来源', nextScenario: 'stealth_follow' },
      { id: 'quick_escape', text: '快速离开这个区域', nextScenario: 'quick_escape' }
    ]
  },
  backyard_exploration: {
    id: 'backyard_exploration',
    speaker: 'survivor',
    message: '后院比我想象的要大。这里有一个小花园，虽然植物都已经枯萎，但我注意到有一个小屋，看起来像是园艺工具房。门是半开的。',
    choices: [
      { id: 'enter_tool_shed', text: '进入工具房搜索', nextScenario: 'tool_shed_search' },
      { id: 'check_garden', text: '检查花园区域', nextScenario: 'garden_inspection' },
      { id: 'find_exit', text: '寻找其他出口', nextScenario: 'exit_search' }
    ]
  },
  building_entrance_search: {
    id: 'building_entrance_search',
    speaker: 'survivor',
    message: '我沿着建筑物寻找其他入口...发现了一扇侧门，看起来通向学校的行政区域。门没有锁，但里面一片漆黑。',
    choices: [
      { id: 'enter_admin_area', text: '进入行政区域', nextScenario: 'admin_area_exploration' },
      { id: 'use_flashlight', text: '用手电筒照明后进入', nextScenario: 'flashlight_exploration' },
      { id: 'find_safer_entrance', text: '继续寻找更安全的入口', nextScenario: 'safer_entrance_search' }
    ]
  },
  return_main_area: {
    id: 'return_main_area',
    speaker: 'survivor',
    message: '我决定返回主要区域。虽然没有发现什么特别的东西，但至少我对这个地方有了更好的了解。现在我需要决定下一步的行动。',
    choices: [
      { id: 'plan_next_move', text: '制定下一步计划', nextScenario: 'planning_phase' },
      { id: 'explore_different_area', text: '探索不同的区域', nextScenario: 'area_selection' },
      { id: 'rest_and_recover', text: '找个地方休息恢复', nextScenario: 'recovery_phase' }
    ]
  },
  // 添加一些结局前的关键场景
  escape_planning: {
    id: 'escape_planning',
    speaker: 'survivor',
    message: '我需要仔细规划逃生路线。根据我收集的信息，有几条可能的路径：正门（风险高但直接）、后门（相对安全但可能被锁）、或者寻找地图上标注的秘密通道。',
    choices: [
      { id: 'use_main_exit', text: '冒险使用正门', nextScenario: 'main_exit_attempt' },
      { id: 'try_back_exit', text: '尝试后门路线', nextScenario: 'back_exit_attempt' },
      { id: 'find_secret_passage', text: '寻找秘密通道', nextScenario: 'secret_passage_search' }
    ]
  },
  outside_contact: {
    id: 'outside_contact',
    speaker: 'survivor',
    message: '我尝试联系外界救援...信号很弱，但我成功连接到了紧急频道。"这里是李明，我在阳光学校，发现了重要情况，需要立即支援！"',
    choices: [
      { id: 'wait_for_rescue', text: '等待救援到达', nextScenario: 'rescue_wait' },
      { id: 'transmit_evidence', text: '立即传输证据', nextScenario: 'evidence_transmission' },
      { id: 'request_evacuation', text: '请求紧急撤离', nextScenario: 'evacuation_request' }
    ]
  },
  // 添加缺失的场景
  situation_report: {
    id: 'situation_report',
    speaker: 'survivor',
    message: '我现在在学校入口附近，辐射检测器显示这里的辐射水平在上升。我的防护服有些破损，健康状况还算稳定，但我担心时间不多了...',
    choices: [
      { id: 'equipment_check', text: '检查你的装备和物资', nextScenario: 'equipment_status' },
      { id: 'find_safe_place', text: '寻找相对安全的地方', nextScenario: 'safe_location_search' },
      { id: 'contact_team', text: '尝试联系你的队友', nextScenario: 'team_contact_attempt' }
    ]
  },
  location_check: {
    id: 'location_check',
    speaker: 'survivor',
    message: '我在阳光学校的正门入口。这个地方...很诡异。到处都是废墟，空气中有种奇怪的味道。我能看到几个方向可以探索：商店、食堂和操场。',
    choices: [
      { id: 'check_store', text: '先去商店看看，可能有有用的物资', nextScenario: 'store_exploration' },
      { id: 'check_cafeteria', text: '去食堂，也许能找到食物', nextScenario: 'cafeteria_exploration' },
      { id: 'avoid_playground', text: '操场看起来很危险，先避开', nextScenario: 'safe_exploration' }
    ]
  },
  equipment_status: {
    id: 'equipment_status',
    speaker: 'survivor',
    message: '让我检查一下...我有一个破损的辐射检测器，还能工作但读数不太准确。还有一些基本的医疗用品，但数量有限。我的通讯设备还能正常工作，这是好消息。',
    choices: [
      { id: 'repair_detector', text: '尝试修理辐射检测器', nextScenario: 'detector_repair' },
      { id: 'conserve_supplies', text: '节约使用医疗用品', nextScenario: 'supply_management' },
      { id: 'explore_for_supplies', text: '探索周围寻找更多物资', nextScenario: 'supply_search' }
    ]
  },
  supplies_taken: {
    id: 'supplies_taken',
    speaker: 'survivor',
    message: '我拿走了清洁用品和地图。这些物品可能在后面的探索中很有用。现在我需要决定下一步的行动。',
    choices: [
      { id: 'plan_next_move', text: '制定下一步计划', nextScenario: 'planning_phase' },
      { id: 'continue_exploring', text: '继续探索其他区域', nextScenario: 'area_selection' },
      { id: 'study_map_later', text: '找个安全的地方研究地图', nextScenario: 'map_study_safe' }
    ]
  },
  basement_search: {
    id: 'basement_search',
    speaker: 'survivor',
    message: '根据地图，我找到了地下室入口。门是锁着的，但我注意到旁边有一个通风口。这里的辐射水平比地面更高，我的检测器发出了警告声。',
    choices: [
      { id: 'force_door', text: '尝试强行打开门', nextScenario: 'basement_entry_force' },
      { id: 'use_ventilation', text: '通过通风口进入', nextScenario: 'ventilation_entry' },
      { id: 'retreat_high_radiation', text: '辐射太高，先撤退', nextScenario: 'radiation_retreat' }
    ]
  },
  quick_exit_with_map: {
    id: 'quick_exit_with_map',
    speaker: 'survivor',
    message: '我拿走地图后立即离开了商店。虽然没有深入搜索，但至少我获得了重要的信息。现在我需要找个安全的地方研究这张地图。',
    choices: [
      { id: 'find_safe_spot', text: '寻找安全的地方', nextScenario: 'safe_spot_search' },
      { id: 'study_map_immediately', text: '立即研究地图', nextScenario: 'map_analysis' },
      { id: 'continue_exploration', text: '继续探索其他区域', nextScenario: 'area_selection' }
    ]
  },
  continue_quick_search: {
    id: 'continue_quick_search',
    speaker: 'survivor',
    message: '我继续快速搜索...在货架后面发现了一个急救包！虽然有些旧了，但里面的物品看起来还能使用。',
    choices: [
      { id: 'take_first_aid', text: '拿走急救包', nextScenario: 'first_aid_acquired' },
      { id: 'check_contents', text: '检查急救包内容', nextScenario: 'first_aid_inspection' },
      { id: 'leave_store_now', text: '现在就离开商店', nextScenario: 'store_exit' }
    ]
  },
  planning_phase: {
    id: 'planning_phase',
    speaker: 'survivor',
    message: '我需要仔细规划下一步行动。根据目前的情况，我有几个选择：继续探索寻找更多线索，寻找队友，或者尝试找到安全的出口。',
    choices: [
      { id: 'investigate_clues', text: '深入调查发现的线索', nextScenario: 'clue_investigation' },
      { id: 'search_teammates', text: '优先寻找队友', nextScenario: 'teammate_search' },
      { id: 'find_exit', text: '寻找安全出口', nextScenario: 'exit_search' }
    ]
  },
  // 继续添加更多场景
  area_selection: {
    id: 'area_selection',
    speaker: 'survivor',
    message: '我需要选择下一个探索的区域。根据我目前掌握的信息，有几个地方值得调查：教学楼、实验室区域，或者行政办公区。',
    choices: [
      { id: 'explore_teaching_building', text: '探索教学楼', nextScenario: 'teaching_building_exploration' },
      { id: 'investigate_lab_area', text: '调查实验室区域', nextScenario: 'lab_area_investigation' },
      { id: 'check_admin_area', text: '检查行政办公区', nextScenario: 'admin_area_exploration' }
    ]
  },
  map_study_safe: {
    id: 'map_study_safe',
    speaker: 'survivor',
    message: '我找到了一个相对安全的角落来研究地图。仔细观察后，我发现了一些重要信息：地图上标注着"项目阳光"的字样，还有一些被标记为"禁止进入"的区域。',
    choices: [
      { id: 'investigate_project_sunshine', text: '调查"项目阳光"', nextScenario: 'project_sunshine_investigation' },
      { id: 'explore_forbidden_areas', text: '探索禁止进入的区域', nextScenario: 'forbidden_area_exploration' },
      { id: 'look_for_more_clues', text: '寻找更多线索', nextScenario: 'additional_clue_search' }
    ]
  },
  safe_spot_search: {
    id: 'safe_spot_search',
    speaker: 'survivor',
    message: '我在寻找安全的地方...找到了一间看起来结构还算稳固的教室。这里的辐射水平较低，我可以在这里休息并研究地图。',
    choices: [
      { id: 'rest_and_study', text: '休息并研究地图', nextScenario: 'rest_and_map_study' },
      { id: 'search_classroom', text: '搜索教室', nextScenario: 'classroom_search' },
      { id: 'continue_searching_safer', text: '继续寻找更安全的地方', nextScenario: 'continue_safe_search' }
    ]
  },
  first_aid_acquired: {
    id: 'first_aid_acquired',
    speaker: 'survivor',
    message: '我拿到了急救包。里面有绷带、止痛药和一些消毒用品。这些物品可能在紧急情况下救我一命。',
    choices: [
      { id: 'use_immediately', text: '立即使用一些物品治疗', nextScenario: 'immediate_treatment' },
      { id: 'save_for_emergency', text: '保存以备紧急情况', nextScenario: 'emergency_reserve' },
      { id: 'continue_store_search', text: '继续搜索商店', nextScenario: 'store_continued_search' }
    ]
  },
  first_aid_inspection: {
    id: 'first_aid_inspection',
    speaker: 'survivor',
    message: '我仔细检查了急救包的内容...大部分物品都还能使用，但有些药品已经过期了。不过在这种情况下，过期的药品总比没有好。',
    choices: [
      { id: 'take_usable_items', text: '只拿有用的物品', nextScenario: 'selective_items_taken' },
      { id: 'take_everything', text: '全部拿走', nextScenario: 'all_items_taken' },
      { id: 'leave_expired_items', text: '留下过期物品', nextScenario: 'expired_items_left' }
    ]
  },
  store_exit: {
    id: 'store_exit',
    speaker: 'survivor',
    message: '我离开了商店。虽然这里有些有用的物品，但污染程度太高，不宜久留。现在我需要决定下一个目标。',
    choices: [
      { id: 'head_to_cafeteria', text: '前往食堂', nextScenario: 'cafeteria_exploration' },
      { id: 'explore_other_areas', text: '探索其他区域', nextScenario: 'area_selection' },
      { id: 'find_safe_place', text: '寻找安全的地方休息', nextScenario: 'safe_location_search' }
    ]
  },
  clue_investigation: {
    id: 'clue_investigation',
    speaker: 'survivor',
    message: '我决定深入调查已经发现的线索。"项目阳光"这个名字让我感到不安，我需要找到更多相关信息。',
    choices: [
      { id: 'search_documents', text: '寻找相关文件', nextScenario: 'document_search' },
      { id: 'investigate_lab', text: '调查实验室', nextScenario: 'laboratory_investigation' },
      { id: 'check_admin_records', text: '查看行政记录', nextScenario: 'admin_records_check' }
    ]
  },
  teammate_search: {
    id: 'teammate_search',
    speaker: 'survivor',
    message: '我决定优先寻找我的队友。他们可能还活着，需要我的帮助。我需要系统地搜索可能的藏身地点。',
    choices: [
      { id: 'check_safe_rooms', text: '检查安全室', nextScenario: 'safe_rooms_check' },
      { id: 'follow_radio_signals', text: '跟踪无线电信号', nextScenario: 'radio_signal_tracking' },
      { id: 'search_systematically', text: '系统性搜索', nextScenario: 'systematic_search' }
    ]
  },

  // 第一批缺失场景 - 基础探索场景
  store_exploration: {
    id: 'store_exploration',
    speaker: 'survivor',
    message: '我进入了学校商店。这里的气味让人作呕，货架上的食品都已经过期很久。但是我需要仔细搜索，也许能找到有用的东西。',
    choices: [
      { id: 'search_shelves', text: '搜索货架寻找物资', nextScenario: 'explore_store' },
      { id: 'check_storage_room', text: '检查储藏室', nextScenario: 'store_storage_check' },
      { id: 'leave_store_quickly', text: '快速离开，这里太危险', nextScenario: 'store_exit' }
    ]
  },

  cafeteria_exploration: {
    id: 'cafeteria_exploration',
    speaker: 'survivor',
    message: '我走向食堂。还没进门就闻到了腐败的恶臭。透过窗户，我能看到里面一片狼藉，但也许厨房里还有些有用的东西。',
    choices: [
      { id: 'enter_cafeteria', text: '进入食堂搜索', nextScenario: 'explore_cafeteria' },
      { id: 'check_kitchen_first', text: '直接去厨房', nextScenario: 'kitchen_direct_entry' },
      { id: 'avoid_cafeteria', text: '太危险了，去别的地方', nextScenario: 'safe_exploration' }
    ]
  },

  store_storage_check: {
    id: 'store_storage_check',
    speaker: 'survivor',
    message: '储藏室的门半开着，里面堆满了箱子。大部分都已经发霉了，但我在角落里发现了一个密封的金属箱。',
    choices: [
      { id: 'open_metal_box', text: '打开金属箱', nextScenario: 'metal_box_discovery' },
      { id: 'search_other_boxes', text: '搜索其他箱子', nextScenario: 'box_search' },
      { id: 'leave_storage', text: '离开储藏室', nextScenario: 'store_exit' }
    ]
  },

  kitchen_direct_entry: {
    id: 'kitchen_direct_entry',
    speaker: 'survivor',
    message: '我直接进入了厨房。这里比食堂主区域稍微好一些，但仍然很危险。我听到了奇怪的声音从深处传来...',
    choices: [
      { id: 'investigate_sound', text: '调查声音来源', nextScenario: 'kitchen_sound_check' },
      { id: 'search_kitchen_quickly', text: '快速搜索厨房', nextScenario: 'kitchen_quick_search' },
      { id: 'retreat_to_main_area', text: '退回到主区域', nextScenario: 'cafeteria_retreat' }
    ]
  },

  metal_box_discovery: {
    id: 'metal_box_discovery',
    speaker: 'survivor',
    message: '金属箱里有一些令人惊喜的发现：一个完好的急救包、一些能量棒，还有一张标着"紧急疏散路线"的地图！',
    choices: [
      { id: 'study_evacuation_map', text: '仔细研究疏散地图', nextScenario: 'evacuation_plan_study' },
      { id: 'use_first_aid_now', text: '立即使用急救包', nextScenario: 'first_aid_treatment' },
      { id: 'save_supplies', text: '保存所有物资', nextScenario: 'supplies_saved' }
    ]
  },

  box_search: {
    id: 'box_search',
    speaker: 'survivor',
    message: '我搜索了其他箱子，大部分都已经腐烂了。但我找到了一些清洁用品和一个手电筒，电池还有电！',
    choices: [
      { id: 'use_flashlight', text: '用手电筒探索更深的区域', nextScenario: 'deep_exploration' },
      { id: 'clean_area', text: '用清洁用品清理周围', nextScenario: 'environment_cleaning' },
      { id: 'continue_searching', text: '继续搜索其他地方', nextScenario: 'area_selection' }
    ]
  },

  supplies_saved: {
    id: 'supplies_saved',
    speaker: 'survivor',
    message: '我小心地收好了所有物资。这些东西可能在关键时刻救我一命。现在我感觉更有信心了。',
    choices: [
      { id: 'continue_exploration', text: '继续探索', nextScenario: 'area_selection' },
      { id: 'find_safe_spot', text: '找个安全的地方休息', nextScenario: 'safe_location_search' },
      { id: 'contact_outside', text: '尝试联系外界', nextScenario: 'outside_contact' }
    ]
  },

  // 食物和辐射相关场景
  food_consumption_risk: {
    id: 'food_consumption_risk',
    speaker: 'survivor',
    message: '我冒险吃了一些罐头食品。虽然味道很奇怪，但确实补充了一些体力。不过我感觉有些不适，可能是轻微的食物中毒...',
    choices: [
      { id: 'rest_recover', text: '休息一下等待恢复', nextScenario: 'rest_recovery' },
      { id: 'find_medicine', text: '寻找药物治疗', nextScenario: 'medical_supply_search' },
      { id: 'continue_despite_illness', text: '忍着不适继续行动', nextScenario: 'continue_exploration' }
    ]
  },

  food_storage: {
    id: 'food_storage',
    speaker: 'survivor',
    message: '我决定先把食物收起来，等找到更安全的地方再决定是否食用。这是明智的选择，现在不是冒险的时候。',
    choices: [
      { id: 'find_safe_eating_spot', text: '寻找安全的地方进食', nextScenario: 'safe_spot_search' },
      { id: 'test_food_safety', text: '先测试食物的安全性', nextScenario: 'radiation_test_food' },
      { id: 'continue_without_eating', text: '暂时不吃，继续探索', nextScenario: 'area_selection' }
    ]
  },

  radiation_test_food: {
    id: 'radiation_test_food',
    speaker: 'survivor',
    message: '我用辐射检测器仔细检测了食物。检测器显示辐射水平在可接受范围内，但仍然比正常水平高。这是个艰难的选择...',
    choices: [
      { id: 'eat_carefully', text: '小心地少量食用', nextScenario: 'careful_consumption' },
      { id: 'discard_food', text: '丢弃食物，太危险了', nextScenario: 'food_discarded' },
      { id: 'save_for_emergency', text: '保存起来，紧急时再用', nextScenario: 'emergency_food_storage' }
    ]
  },

  // 第二批缺失场景 - 食物处理和医疗场景
  careful_consumption: {
    id: 'careful_consumption',
    speaker: 'survivor',
    message: '我小心地吃了一点食物。虽然味道不好，但确实补充了一些体力。我感觉稍微好了一些，但仍需要保持警惕。',
    choices: [
      { id: 'monitor_health', text: '密切监控身体状况', nextScenario: 'health_monitoring' },
      { id: 'continue_cautiously', text: '谨慎地继续行动', nextScenario: 'cautious_exploration' },
      { id: 'rest_after_eating', text: '吃完后休息一下', nextScenario: 'rest_recovery' }
    ]
  },

  food_discarded: {
    id: 'food_discarded',
    speaker: 'survivor',
    message: '我决定丢弃这些食物。虽然很饿，但健康更重要。我需要寻找其他更安全的食物来源。',
    choices: [
      { id: 'search_safer_food', text: '寻找更安全的食物', nextScenario: 'safe_food_search' },
      { id: 'focus_on_escape', text: '专注于寻找出路', nextScenario: 'escape_planning' },
      { id: 'find_water_source', text: '寻找清洁的水源', nextScenario: 'water_search' }
    ]
  },

  emergency_food_storage: {
    id: 'emergency_food_storage',
    speaker: 'survivor',
    message: '我把食物小心地包装好，作为紧急储备。在这种环境下，即使是有风险的食物也可能成为救命稻草。',
    choices: [
      { id: 'continue_exploration', text: '继续探索寻找更多物资', nextScenario: 'area_selection' },
      { id: 'mark_food_location', text: '标记食物位置以备后用', nextScenario: 'location_marking' },
      { id: 'search_for_medicine', text: '寻找药物以防食物中毒', nextScenario: 'medical_supply_search' }
    ]
  },

  health_monitoring: {
    id: 'health_monitoring',
    speaker: 'survivor',
    message: '我仔细检查自己的身体状况。目前没有明显的不良反应，但我需要继续观察。辐射检测器显示我的辐射暴露量在缓慢增加。',
    choices: [
      { id: 'take_preventive_measures', text: '采取预防措施', nextScenario: 'preventive_care' },
      { id: 'continue_monitoring', text: '继续监控并行动', nextScenario: 'monitored_exploration' },
      { id: 'seek_medical_help', text: '寻找医疗帮助', nextScenario: 'medical_office_approach' }
    ]
  },

  safe_food_search: {
    id: 'safe_food_search',
    speaker: 'survivor',
    message: '我开始寻找更安全的食物来源。也许在某个密封的储藏室里，或者在医务室里有一些应急食品。',
    choices: [
      { id: 'check_medical_office', text: '检查医务室', nextScenario: 'medical_office_approach' },
      { id: 'look_for_vending_machines', text: '寻找自动售货机', nextScenario: 'vending_machine_search' },
      { id: 'explore_staff_areas', text: '探索教职工区域', nextScenario: 'staff_area_exploration' }
    ]
  },

  water_search: {
    id: 'water_search',
    speaker: 'survivor',
    message: '我需要找到清洁的水源。脱水在这种环境下可能比辐射更快地要了我的命。我记得学校应该有饮水机。',
    choices: [
      { id: 'find_water_fountain', text: '寻找饮水机', nextScenario: 'water_fountain_search' },
      { id: 'check_bottled_water', text: '寻找瓶装水', nextScenario: 'bottled_water_search' },
      { id: 'test_tap_water', text: '测试自来水', nextScenario: 'tap_water_test' }
    ]
  },

  location_marking: {
    id: 'location_marking',
    speaker: 'survivor',
    message: '我在地图上标记了这个位置，以防以后需要回来取食物。这种系统性的方法可能会救我一命。',
    choices: [
      { id: 'create_supply_map', text: '创建物资地图', nextScenario: 'supply_mapping' },
      { id: 'continue_systematic_search', text: '继续系统性搜索', nextScenario: 'systematic_search' },
      { id: 'plan_return_route', text: '规划返回路线', nextScenario: 'route_planning' }
    ]
  },

  preventive_care: {
    id: 'preventive_care',
    speaker: 'survivor',
    message: '我采取了一些预防措施：检查防护服的密封性，清洁暴露的皮肤，并服用了一些维生素片。每一个小细节都可能很重要。',
    choices: [
      { id: 'improve_protection', text: '进一步改善防护', nextScenario: 'protection_enhancement' },
      { id: 'document_exposure', text: '记录辐射暴露情况', nextScenario: 'exposure_documentation' },
      { id: 'continue_with_caution', text: '谨慎地继续行动', nextScenario: 'cautious_exploration' }
    ]
  },

  monitored_exploration: {
    id: 'monitored_exploration',
    speaker: 'survivor',
    message: '我一边密切监控自己的健康状况，一边继续探索。定期检查辐射水平和身体反应已经成为了习惯。',
    choices: [
      { id: 'set_health_alerts', text: '设置健康警报', nextScenario: 'health_alert_system' },
      { id: 'explore_systematically', text: '系统性地探索', nextScenario: 'systematic_search' },
      { id: 'prioritize_safety', text: '优先考虑安全', nextScenario: 'safety_first_exploration' }
    ]
  },

  // 第三批缺失场景 - 冷冻食品和生物遭遇场景
  frozen_food_risk: {
    id: 'frozen_food_risk',
    speaker: 'survivor',
    message: '我拿了一些看起来还能吃的冷冻食品。虽然已经解冻了，但在这种情况下，任何食物都是珍贵的。不过我担心细菌感染的风险...',
    choices: [
      { id: 'cook_food_first', text: '尝试加热食物杀菌', nextScenario: 'food_heating_attempt' },
      { id: 'eat_frozen_food_raw', text: '直接食用，承担风险', nextScenario: 'raw_food_consumption' },
      { id: 'save_frozen_food', text: '保存起来，寻找加热方法', nextScenario: 'frozen_food_storage' }
    ]
  },

  freezer_deep_search: {
    id: 'freezer_deep_search',
    speaker: 'survivor',
    message: '我深入搜索冷藏室的深处...在最里面发现了一个紧急储备箱！里面有一些密封的应急食品和一个小型医疗包。',
    choices: [
      { id: 'take_emergency_supplies', text: '拿走应急物资', nextScenario: 'emergency_supplies_acquired' },
      { id: 'check_expiration_dates', text: '检查食品保质期', nextScenario: 'expiration_check' },
      { id: 'search_for_more', text: '继续搜索是否还有其他东西', nextScenario: 'thorough_freezer_search' }
    ]
  },

  freezer_escape: {
    id: 'freezer_escape',
    speaker: 'survivor',
    message: '我感觉这个冷藏室有些不对劲，决定立即离开。刚走出来，我就听到里面传来了奇怪的声音...我的直觉救了我一命。',
    choices: [
      { id: 'investigate_sound_outside', text: '在外面调查声音', nextScenario: 'sound_investigation_safe' },
      { id: 'leave_cafeteria_immediately', text: '立即离开食堂', nextScenario: 'cafeteria_exit' },
      { id: 'warn_others', text: '尝试警告可能的其他幸存者', nextScenario: 'warning_broadcast' }
    ]
  },

  food_heating_attempt: {
    id: 'food_heating_attempt',
    speaker: 'survivor',
    message: '我寻找加热食物的方法...找到了一个还能工作的微波炉！虽然功率不稳定，但应该能杀死大部分细菌。',
    choices: [
      { id: 'use_microwave', text: '使用微波炉加热食物', nextScenario: 'microwave_heating' },
      { id: 'find_alternative_heating', text: '寻找其他加热方法', nextScenario: 'alternative_heating' },
      { id: 'risk_cold_food', text: '算了，直接吃冷的', nextScenario: 'raw_food_consumption' }
    ]
  },

  raw_food_consumption: {
    id: 'raw_food_consumption',
    speaker: 'survivor',
    message: '我冒险直接吃了解冻的食物。味道很糟糕，但确实补充了体力。现在我只能祈祷不会食物中毒...',
    choices: [
      { id: 'monitor_for_illness', text: '密切监控身体反应', nextScenario: 'illness_monitoring' },
      { id: 'find_medicine_quickly', text: '快速寻找药物预防', nextScenario: 'preventive_medicine_search' },
      { id: 'continue_despite_risk', text: '不管了，继续行动', nextScenario: 'risky_continuation' }
    ]
  },

  frozen_food_storage: {
    id: 'frozen_food_storage',
    speaker: 'survivor',
    message: '我把冷冻食品小心地包装好保存。也许稍后能找到安全的加热方法。在这种环境下，计划和耐心很重要。',
    choices: [
      { id: 'search_for_heat_source', text: '寻找热源', nextScenario: 'heat_source_search' },
      { id: 'continue_food_search', text: '继续寻找其他食物', nextScenario: 'safe_food_search' },
      { id: 'focus_on_other_priorities', text: '专注于其他优先事项', nextScenario: 'priority_reassessment' }
    ]
  },

  // 生物遭遇相关场景
  waiting_game: {
    id: 'waiting_game',
    speaker: 'survivor',
    message: '我耐心地等待变异老鼠离开。几分钟后，它终于爬走了。我可以安全地继续探索厨房了。',
    choices: [
      { id: 'explore_kitchen_safely', text: '安全地探索厨房', nextScenario: 'kitchen_safe_exploration' },
      { id: 'follow_creature_path', text: '跟踪生物的去向', nextScenario: 'creature_tracking' },
      { id: 'avoid_creature_area', text: '避开生物活动区域', nextScenario: 'creature_avoidance_route' }
    ]
  },

  creature_study: {
    id: 'creature_study',
    speaker: 'survivor',
    message: '我仔细观察这只变异老鼠。它的体型比正常老鼠大了三倍，眼睛发出绿光，皮毛有奇怪的斑点。这明显是辐射变异的结果...',
    choices: [
      { id: 'document_mutation', text: '记录变异特征', nextScenario: 'mutation_documentation' },
      { id: 'assess_threat_level', text: '评估威胁等级', nextScenario: 'threat_assessment' },
      { id: 'retreat_quietly', text: '悄悄撤退', nextScenario: 'quiet_retreat' }
    ]
  },

  kitchen_quick_search: {
    id: 'kitchen_quick_search',
    speaker: 'survivor',
    message: '我趁着变异老鼠被吓跑的机会，快速搜索厨房。找到了一些有用的东西：刀具、清洁用品，还有一个紧急医疗包！',
    choices: [
      { id: 'take_knife_for_protection', text: '拿刀作为防护武器', nextScenario: 'weapon_acquisition' },
      { id: 'grab_medical_kit', text: '拿走医疗包', nextScenario: 'medical_kit_acquired' },
      { id: 'take_everything_quickly', text: '快速拿走所有有用物品', nextScenario: 'quick_supply_grab' }
    ]
  },

  // 第四批缺失场景 - 安全和防护场景
  cafeteria_exit: {
    id: 'cafeteria_exit',
    speaker: 'survivor',
    message: '我快速离开了食堂。外面的空气虽然仍有辐射，但比食堂里的恶臭好多了。我需要决定下一步去哪里。',
    choices: [
      { id: 'head_to_classroom', text: '前往教室区域', nextScenario: 'classroom_area_approach' },
      { id: 'explore_playground', text: '探索操场', nextScenario: 'playground_exploration' },
      { id: 'return_to_entrance', text: '返回学校入口', nextScenario: 'entrance_return' }
    ]
  },

  defense_preparation: {
    id: 'defense_preparation',
    speaker: 'survivor',
    message: '我准备应对可能出现的威胁。找到了一些可以用作武器的厨具，并在附近找了一个有利的位置。',
    choices: [
      { id: 'set_up_barricade', text: '设置路障', nextScenario: 'barricade_setup' },
      { id: 'find_escape_route', text: '寻找逃生路线', nextScenario: 'escape_route_planning' },
      { id: 'wait_and_observe', text: '等待并观察', nextScenario: 'observation_mode' }
    ]
  },

  weapon_acquisition: {
    id: 'weapon_acquisition',
    speaker: 'survivor',
    message: '我拿起了一把看起来还算锋利的厨刀。虽然不是理想的武器，但在这种环境下，任何防护手段都是必要的。',
    choices: [
      { id: 'practice_weapon_use', text: '熟悉武器使用', nextScenario: 'weapon_familiarization' },
      { id: 'find_better_weapon', text: '寻找更好的武器', nextScenario: 'better_weapon_search' },
      { id: 'continue_with_knife', text: '带着刀继续探索', nextScenario: 'armed_exploration' }
    ]
  },

  medical_kit_acquired: {
    id: 'medical_kit_acquired',
    speaker: 'survivor',
    message: '我拿到了医疗包！里面有绷带、消毒剂、止痛药和一些基本的医疗用品。这可能会救我一命。',
    choices: [
      { id: 'use_medical_supplies_now', text: '立即使用一些医疗用品', nextScenario: 'immediate_medical_care' },
      { id: 'save_for_emergency', text: '保存以备紧急情况', nextScenario: 'medical_supplies_saved' },
      { id: 'check_medical_contents', text: '仔细检查医疗包内容', nextScenario: 'medical_kit_inspection' }
    ]
  },

  quick_supply_grab: {
    id: 'quick_supply_grab',
    speaker: 'survivor',
    message: '我快速收集了所有有用的物品。现在我的背包重了不少，但这些物资可能在关键时刻派上用场。',
    choices: [
      { id: 'organize_supplies', text: '整理物资', nextScenario: 'supply_organization' },
      { id: 'leave_immediately', text: '立即离开这个区域', nextScenario: 'quick_area_exit' },
      { id: 'find_safe_storage', text: '寻找安全的储存地点', nextScenario: 'safe_storage_search' }
    ]
  },

  // 后门和逃生相关场景
  back_door_attempt: {
    id: 'back_door_attempt',
    speaker: 'survivor',
    message: '我尝试打开后门...门很重，锈迹斑斑，但经过一番努力，我成功打开了它！外面是一个小院子，看起来相对安全。',
    choices: [
      { id: 'explore_courtyard', text: '探索小院子', nextScenario: 'courtyard_exploration' },
      { id: 'use_as_escape_route', text: '将此作为逃生路线', nextScenario: 'escape_route_secured' },
      { id: 'return_and_mark_exit', text: '返回并标记这个出口', nextScenario: 'exit_marking' }
    ]
  },

  safe_return: {
    id: 'safe_return',
    speaker: 'survivor',
    message: '我安全地返回了相对安全的区域。虽然没有发现什么惊人的东西，但至少我对这个地方有了更好的了解。',
    choices: [
      { id: 'plan_next_exploration', text: '计划下一次探索', nextScenario: 'exploration_planning' },
      { id: 'rest_and_recover', text: '休息恢复体力', nextScenario: 'rest_recovery' },
      { id: 'contact_outside_help', text: '尝试联系外界帮助', nextScenario: 'outside_contact' }
    ]
  },

  // 地图和避难所相关场景
  shelter_search: {
    id: 'shelter_search',
    speaker: 'survivor',
    message: '根据地图，我开始寻找紧急避难所。地图显示它应该在地下室附近，但我需要找到正确的入口。',
    choices: [
      { id: 'follow_map_exactly', text: '严格按照地图指示', nextScenario: 'map_guided_search' },
      { id: 'search_basement_area', text: '搜索地下室区域', nextScenario: 'basement_area_search' },
      { id: 'look_for_shelter_signs', text: '寻找避难所标志', nextScenario: 'shelter_sign_search' }
    ]
  },

  secret_exit_search: {
    id: 'secret_exit_search',
    speaker: 'survivor',
    message: '我开始寻找地图上标注的秘密通道。这可能是我安全逃离这里的最佳机会。通道入口应该在行政楼附近。',
    choices: [
      { id: 'search_admin_building', text: '搜索行政楼', nextScenario: 'admin_building_search' },
      { id: 'look_for_hidden_doors', text: '寻找隐藏的门', nextScenario: 'hidden_door_search' },
      { id: 'check_basement_tunnels', text: '检查地下通道', nextScenario: 'tunnel_exploration' }
    ]
  },

  // 医务室和实验室相关场景
  medical_office_approach: {
    id: 'medical_office_approach',
    speaker: 'survivor',
    message: '我来到了医务室门前。门上有电子锁，但我注意到旁边的窗户有一条裂缝。我可能可以从那里进入。',
    choices: [
      { id: 'try_electronic_lock', text: '尝试破解电子锁', nextScenario: 'electronic_lock_hack' },
      { id: 'enter_through_window', text: '从窗户进入', nextScenario: 'window_entry' },
      { id: 'look_for_keycard', text: '寻找钥匙卡', nextScenario: 'keycard_search' }
    ]
  },

  lab_exterior_recon: {
    id: 'lab_exterior_recon',
    speaker: 'survivor',
    message: '我在实验室外围进行侦察。这里的辐射水平明显更高，我的检测器发出了警告声。建筑物看起来很坚固，但也很危险。',
    choices: [
      { id: 'assess_entry_points', text: '评估进入点', nextScenario: 'entry_point_assessment' },
      { id: 'monitor_radiation_levels', text: '监控辐射水平', nextScenario: 'radiation_monitoring' },
      { id: 'retreat_for_now', text: '暂时撤退', nextScenario: 'tactical_retreat' }
    ]
  },

  // 第五批缺失场景 - 钥匙卡和办公室场景
  keycard_acquired: {
    id: 'keycard_acquired',
    speaker: 'survivor',
    message: '我拿到了钥匙卡！这张卡片可能是进入限制区域的关键。现在我可以探索之前无法进入的地方了。',
    choices: [
      { id: 'head_to_lab', text: '前往实验室', nextScenario: 'laboratory_entry' },
      { id: 'check_medical_office', text: '检查医务室', nextScenario: 'medical_office_entry' },
      { id: 'explore_restricted_areas', text: '探索其他限制区域', nextScenario: 'restricted_area_exploration' }
    ]
  },

  office_thorough_search: {
    id: 'office_thorough_search',
    speaker: 'survivor',
    message: '我彻底搜索了校长办公室。在一个隐藏的抽屉里，我发现了更多文件和一个小型保险箱。这些可能包含重要信息。',
    choices: [
      { id: 'try_to_open_safe', text: '尝试打开保险箱', nextScenario: 'safe_opening_attempt' },
      { id: 'read_hidden_documents', text: '阅读隐藏文件', nextScenario: 'hidden_documents_reading' },
      { id: 'take_everything', text: '拿走所有发现的物品', nextScenario: 'office_items_collected' }
    ]
  },

  evidence_escape: {
    id: 'evidence_escape',
    speaker: 'survivor',
    message: '我带着关键证据准备逃离。警报声越来越响，我必须快速找到出路。每一秒都很关键！',
    choices: [
      { id: 'use_main_exit', text: '冲向主要出口', nextScenario: 'main_exit_attempt' },
      { id: 'find_secret_passage', text: '寻找秘密通道', nextScenario: 'secret_passage_search' },
      { id: 'hide_until_safe', text: '先躲起来等待时机', nextScenario: 'hiding_attempt' }
    ]
  },

  // 安全搜索和探索场景
  continue_safe_search: {
    id: 'continue_safe_search',
    speaker: 'survivor',
    message: '我继续寻找更安全的地方。经过仔细搜索，我发现了一个看起来很坚固的储藏室，门可以从内部锁上。',
    choices: [
      { id: 'enter_storage_room', text: '进入储藏室', nextScenario: 'storage_room_entry' },
      { id: 'keep_searching', text: '继续寻找更好的地方', nextScenario: 'better_location_search' },
      { id: 'set_up_temporary_shelter', text: '在这里建立临时避难所', nextScenario: 'temporary_shelter_setup' }
    ]
  },

  // 辐射和设备相关场景
  radiation_scan: {
    id: 'radiation_scan',
    speaker: 'survivor',
    message: '我用修好的检测器扫描周围区域。结果显示这里的辐射分布很不均匀，有些区域相对安全，而有些区域极其危险。',
    choices: [
      { id: 'map_radiation_zones', text: '绘制辐射区域地图', nextScenario: 'radiation_mapping' },
      { id: 'find_safe_path', text: '寻找安全路径', nextScenario: 'safe_path_finding' },
      { id: 'investigate_high_radiation', text: '调查高辐射区域', nextScenario: 'high_radiation_investigation' }
    ]
  },

  continue_exploration: {
    id: 'continue_exploration',
    speaker: 'survivor',
    message: '我决定继续探索。虽然有些风险，但我需要找到更多线索和物资。每个新发现都可能是生存的关键。',
    choices: [
      { id: 'explore_new_areas', text: '探索新区域', nextScenario: 'new_area_exploration' },
      { id: 'revisit_previous_locations', text: '重新检查之前的地点', nextScenario: 'location_revisit' },
      { id: 'follow_map_clues', text: '跟随地图线索', nextScenario: 'map_clue_following' }
    ]
  },

  equipment_repair_search: {
    id: 'equipment_repair_search',
    speaker: 'survivor',
    message: '我寻找其他需要修理的设备。在一个工具箱里，我发现了一些电子元件和工具，可能可以修理其他设备。',
    choices: [
      { id: 'repair_communication_device', text: '修理通讯设备', nextScenario: 'communication_repair' },
      { id: 'fix_lighting_equipment', text: '修理照明设备', nextScenario: 'lighting_repair' },
      { id: 'save_repair_materials', text: '保存修理材料', nextScenario: 'repair_materials_saved' }
    ]
  },

  // 医疗和健康相关场景
  immediate_medication: {
    id: 'immediate_medication',
    speaker: 'survivor',
    message: '我立即服用了一片止痛药。疼痛减轻了一些，我感觉稍微好了一点。但我需要节约使用剩余的药物。',
    choices: [
      { id: 'rest_after_medication', text: '服药后休息一下', nextScenario: 'medication_rest' },
      { id: 'continue_with_relief', text: '趁着疼痛减轻继续行动', nextScenario: 'pain_relief_action' },
      { id: 'monitor_medication_effects', text: '监控药物效果', nextScenario: 'medication_monitoring' }
    ]
  },

  save_medication: {
    id: 'save_medication',
    speaker: 'survivor',
    message: '我决定保存所有药品以备不时之需。在这种环境下，医疗用品比黄金还珍贵。我需要在真正需要时才使用它们。',
    choices: [
      { id: 'create_medical_inventory', text: '建立医疗物品清单', nextScenario: 'medical_inventory' },
      { id: 'find_more_medicine', text: '寻找更多药物', nextScenario: 'additional_medicine_search' },
      { id: 'continue_without_medication', text: '不用药物继续行动', nextScenario: 'unmedicated_continuation' }
    ]
  },

  medical_supply_search: {
    id: 'medical_supply_search',
    speaker: 'survivor',
    message: '我开始寻找更多医疗用品。学校应该有医务室，那里可能有我需要的药物和医疗设备。',
    choices: [
      { id: 'locate_medical_office', text: '定位医务室', nextScenario: 'medical_office_location' },
      { id: 'check_first_aid_stations', text: '检查急救站', nextScenario: 'first_aid_station_check' },
      { id: 'search_teacher_areas', text: '搜索教师区域', nextScenario: 'teacher_area_search' }
    ]
  },

  // 第六批缺失场景 - 深度探索和伤口处理
  deep_exploration: {
    id: 'deep_exploration',
    speaker: 'survivor',
    message: '我用手电筒照亮了更深的区域。这里很少有人来过，灰尘很厚，但也意味着可能有未被发现的有用物品。',
    choices: [
      { id: 'search_hidden_rooms', text: '搜索隐藏房间', nextScenario: 'hidden_room_discovery' },
      { id: 'follow_maintenance_tunnels', text: '跟随维修通道', nextScenario: 'maintenance_tunnel_exploration' },
      { id: 'investigate_basement_levels', text: '调查地下层', nextScenario: 'basement_level_investigation' }
    ]
  },

  wound_cleaning: {
    id: 'wound_cleaning',
    speaker: 'survivor',
    message: '我用酒精清洁了一些小伤口。虽然很疼，但这是必要的预防感染措施。在这种环境下，即使小伤口也可能变得危险。',
    choices: [
      { id: 'bandage_wounds', text: '包扎伤口', nextScenario: 'wound_bandaging' },
      { id: 'apply_antiseptic', text: '涂抹消毒剂', nextScenario: 'antiseptic_application' },
      { id: 'monitor_healing', text: '监控愈合情况', nextScenario: 'healing_monitoring' }
    ]
  },

  area_search_continue: {
    id: 'area_search_continue',
    speaker: 'survivor',
    message: '我继续搜索其他区域。每个角落都可能隐藏着重要的物品或信息。我需要保持系统性和耐心。',
    choices: [
      { id: 'search_systematically', text: '系统性搜索', nextScenario: 'systematic_area_search' },
      { id: 'focus_on_promising_areas', text: '专注于有希望的区域', nextScenario: 'promising_area_focus' },
      { id: 'quick_survey_all_areas', text: '快速调查所有区域', nextScenario: 'rapid_area_survey' }
    ]
  },

  // 急救和医疗处理场景
  first_aid_treatment: {
    id: 'first_aid_treatment',
    speaker: 'survivor',
    message: '我立即使用急救包进行治疗。清洁伤口，涂抹消毒剂，包扎好伤口。我感觉好多了，健康状况有所改善。',
    choices: [
      { id: 'rest_after_treatment', text: '治疗后休息', nextScenario: 'post_treatment_rest' },
      { id: 'continue_with_improved_health', text: '健康改善后继续行动', nextScenario: 'improved_health_action' },
      { id: 'save_remaining_supplies', text: '保存剩余医疗用品', nextScenario: 'remaining_supplies_saved' }
    ]
  },

  save_first_aid: {
    id: 'save_first_aid',
    speaker: 'survivor',
    message: '我决定保存急救包以备紧急情况。虽然现在有些不适，但我的伤势还不算严重，可以坚持一段时间。',
    choices: [
      { id: 'find_safer_treatment_location', text: '寻找更安全的治疗地点', nextScenario: 'safe_treatment_location' },
      { id: 'continue_despite_discomfort', text: '忍受不适继续行动', nextScenario: 'discomfort_continuation' },
      { id: 'monitor_condition_closely', text: '密切监控身体状况', nextScenario: 'condition_monitoring' }
    ]
  },

  environment_cleaning: {
    id: 'environment_cleaning',
    speaker: 'survivor',
    message: '我用清洁用品清理了周围环境。虽然不能完全消除污染，但至少减少了一些健康风险。这里现在稍微安全一些了。',
    choices: [
      { id: 'establish_clean_zone', text: '建立清洁区域', nextScenario: 'clean_zone_establishment' },
      { id: 'continue_cleaning_other_areas', text: '继续清洁其他区域', nextScenario: 'extended_cleaning' },
      { id: 'use_area_as_base', text: '将此区域作为基地', nextScenario: 'base_establishment' }
    ]
  },

  // 后门和观察相关场景
  back_door_exploration: {
    id: 'back_door_exploration',
    speaker: 'survivor',
    message: '我通过后门进入了一个新区域。这里看起来是学校的后勤区域，有一些储藏室和工具间。',
    choices: [
      { id: 'search_storage_rooms', text: '搜索储藏室', nextScenario: 'storage_rooms_search' },
      { id: 'check_utility_areas', text: '检查工具间', nextScenario: 'utility_areas_check' },
      { id: 'explore_service_corridors', text: '探索服务走廊', nextScenario: 'service_corridor_exploration' }
    ]
  },

  return_to_main: {
    id: 'return_to_main',
    speaker: 'survivor',
    message: '我返回到主要区域。虽然没有发现什么特别的东西，但至少我对学校的布局有了更好的了解。',
    choices: [
      { id: 'plan_next_move', text: '计划下一步行动', nextScenario: 'next_move_planning' },
      { id: 'rest_and_recover', text: '休息恢复体力', nextScenario: 'rest_and_recovery' },
      { id: 'review_findings', text: '回顾发现的信息', nextScenario: 'findings_review' }
    ]
  },

  back_door_observation: {
    id: 'back_door_observation',
    speaker: 'survivor',
    message: '我在后门附近观察了一会儿。这里相对安静，但我注意到地面上有一些奇怪的痕迹，像是有什么东西经常经过这里。',
    choices: [
      { id: 'investigate_tracks', text: '调查这些痕迹', nextScenario: 'track_investigation' },
      { id: 'set_up_observation_post', text: '建立观察点', nextScenario: 'observation_post_setup' },
      { id: 'avoid_tracked_area', text: '避开有痕迹的区域', nextScenario: 'tracked_area_avoidance' }
    ]
  },

  // 厨房撤退和规划场景
  safer_route_search: {
    id: 'safer_route_search',
    speaker: 'survivor',
    message: '我开始寻找更安全的探索路线。通过仔细观察，我发现了一条绕过危险区域的路径。',
    choices: [
      { id: 'follow_safe_route', text: '沿着安全路线前进', nextScenario: 'safe_route_following' },
      { id: 'mark_dangerous_areas', text: '标记危险区域', nextScenario: 'danger_zone_marking' },
      { id: 'create_route_map', text: '创建路线地图', nextScenario: 'route_map_creation' }
    ]
  },

  rest_and_planning: {
    id: 'rest_and_planning',
    speaker: 'survivor',
    message: '我找了个相对安全的地方休息并制定计划。我需要仔细考虑下一步的行动，不能再盲目探索了。',
    choices: [
      { id: 'analyze_current_situation', text: '分析当前情况', nextScenario: 'situation_analysis' },
      { id: 'set_exploration_priorities', text: '设定探索优先级', nextScenario: 'exploration_priorities' },
      { id: 'plan_escape_strategy', text: '规划逃生策略', nextScenario: 'escape_strategy_planning' }
    ]
  },

  cautious_exploration: {
    id: 'cautious_exploration',
    speaker: 'survivor',
    message: '我更加谨慎地继续探索。每一步都小心翼翼，时刻注意周围的危险信号。这种方法虽然慢，但更安全。',
    choices: [
      { id: 'use_stealth_approach', text: '采用隐蔽方式', nextScenario: 'stealth_exploration' },
      { id: 'test_each_area_first', text: '先测试每个区域', nextScenario: 'area_testing' },
      { id: 'maintain_escape_routes', text: '保持逃生路线', nextScenario: 'escape_route_maintenance' }
    ]
  },

  // 第七批缺失场景 - 高频引用的关键场景
  systematic_search: {
    id: 'systematic_search',
    speaker: 'survivor',
    message: '我开始系统性地搜索每个区域。这种方法虽然耗时，但能确保不遗漏任何重要的物品或信息。我制定了一个搜索计划。',
    choices: [
      { id: 'search_by_priority', text: '按优先级搜索', nextScenario: 'priority_based_search' },
      { id: 'search_room_by_room', text: '逐个房间搜索', nextScenario: 'room_by_room_search' },
      { id: 'focus_on_key_areas', text: '专注于关键区域', nextScenario: 'key_area_focus' }
    ]
  },

  electronic_lock_hack: {
    id: 'electronic_lock_hack',
    speaker: 'survivor',
    message: '我尝试破解电子锁。虽然我不是专家，但我记得一些基本的技巧。经过几次尝试，锁发出了"嘀"的一声...',
    choices: [
      { id: 'lock_successfully_opened', text: '成功打开锁', nextScenario: 'lock_opened_success' },
      { id: 'lock_partially_bypassed', text: '部分绕过安全系统', nextScenario: 'partial_bypass' },
      { id: 'lock_triggered_alarm', text: '触发了警报系统', nextScenario: 'alarm_triggered' }
    ]
  },

  main_exit_attempt: {
    id: 'main_exit_attempt',
    speaker: 'survivor',
    message: '我冲向学校的主要出口。这是最直接的路线，但也是最危险的。我能听到身后传来的声音，必须快速行动！',
    choices: [
      { id: 'run_at_full_speed', text: '全速奔跑', nextScenario: 'full_speed_escape' },
      { id: 'use_cover_while_moving', text: '利用掩护移动', nextScenario: 'covered_movement' },
      { id: 'create_distraction', text: '制造干扰', nextScenario: 'distraction_creation' }
    ]
  },

  secret_passage_search: {
    id: 'secret_passage_search',
    speaker: 'survivor',
    message: '我根据地图寻找秘密通道。在一面看似普通的墙后面，我发现了一个隐藏的开关。这可能是我的救命稻草！',
    choices: [
      { id: 'activate_hidden_switch', text: '激活隐藏开关', nextScenario: 'hidden_passage_opened' },
      { id: 'examine_mechanism_first', text: '先检查机关', nextScenario: 'mechanism_examination' },
      { id: 'look_for_other_passages', text: '寻找其他通道', nextScenario: 'alternative_passage_search' }
    ]
  },

  evacuation_plan_study: {
    id: 'evacuation_plan_study',
    speaker: 'survivor',
    message: '我仔细研究疏散计划。这份文件显示了学校的所有出口和安全路线，还标注了一些我之前不知道的紧急避难点。',
    choices: [
      { id: 'follow_evacuation_route', text: '按照疏散路线行动', nextScenario: 'evacuation_route_following' },
      { id: 'check_emergency_shelters', text: '检查紧急避难点', nextScenario: 'emergency_shelter_check' },
      { id: 'combine_with_other_maps', text: '与其他地图对比', nextScenario: 'map_comparison' }
    ]
  },

  // 辐射相关场景
  radiation_retreat: {
    id: 'radiation_retreat',
    speaker: 'survivor',
    message: '辐射水平太高了，我必须立即撤退。我的检测器发出了刺耳的警报声，继续前进可能会致命。',
    choices: [
      { id: 'find_protective_equipment', text: '寻找防护设备', nextScenario: 'protective_equipment_search' },
      { id: 'wait_for_levels_to_drop', text: '等待辐射水平下降', nextScenario: 'radiation_waiting' },
      { id: 'find_alternative_route', text: '寻找替代路线', nextScenario: 'alternative_route_search' }
    ]
  },

  // 教室和学习区域场景
  classroom_area_approach: {
    id: 'classroom_area_approach',
    speaker: 'survivor',
    message: '我来到了教学区域。走廊里很安静，但我能感觉到这里曾经充满了学生的欢声笑语。现在只剩下令人不安的寂静。',
    choices: [
      { id: 'enter_nearest_classroom', text: '进入最近的教室', nextScenario: 'nearest_classroom_entry' },
      { id: 'check_teachers_lounge', text: '检查教师休息室', nextScenario: 'teachers_lounge_check' },
      { id: 'explore_hallway_first', text: '先探索走廊', nextScenario: 'hallway_exploration' }
    ]
  },

  playground_exploration: {
    id: 'playground_exploration',
    speaker: 'survivor',
    message: '我来到了操场。这里的情况比我想象的还要糟糕。地面上有奇怪的绿色液体，空气中弥漫着刺鼻的气味。',
    choices: [
      { id: 'avoid_contaminated_areas', text: '避开污染区域', nextScenario: 'contamination_avoidance' },
      { id: 'investigate_green_substance', text: '调查绿色物质', nextScenario: 'substance_investigation' },
      { id: 'retreat_immediately', text: '立即撤退', nextScenario: 'playground_retreat' }
    ]
  },

  entrance_return: {
    id: 'entrance_return',
    speaker: 'survivor',
    message: '我返回到学校入口。这里相对安全，我可以重新评估情况。也许我应该重新考虑我的策略。',
    choices: [
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'situation_reassessment' },
      { id: 'try_different_approach', text: '尝试不同的方法', nextScenario: 'different_approach' },
      { id: 'contact_outside_again', text: '再次尝试联系外界', nextScenario: 'outside_contact_retry' }
    ]
  },

  // 逃生和出口相关场景
  exit_search: {
    id: 'exit_search',
    speaker: 'survivor',
    message: '我开始寻找安全的出口。除了主要入口，应该还有其他的逃生路线。我需要找到一个不会被发现的出口。',
    choices: [
      { id: 'check_fire_exits', text: '检查消防出口', nextScenario: 'fire_exit_check' },
      { id: 'look_for_service_exits', text: '寻找服务出口', nextScenario: 'service_exit_search' },
      { id: 'explore_basement_exits', text: '探索地下室出口', nextScenario: 'basement_exit_exploration' }
    ]
  },

  // 管理和行政区域场景
  admin_area_exploration: {
    id: 'admin_area_exploration',
    speaker: 'survivor',
    message: '我进入了行政办公区域。这里有校长办公室、教务处和其他管理部门。可能有重要的文件和信息。',
    choices: [
      { id: 'search_principals_office', text: '搜索校长办公室', nextScenario: 'principals_office_search' },
      { id: 'check_administrative_files', text: '检查行政文件', nextScenario: 'administrative_files_check' },
      { id: 'look_for_security_office', text: '寻找保安室', nextScenario: 'security_office_search' }
    ]
  },

  // 通用回流场景 - 第一批
  // 休息和恢复相关
  rest_recovery: {
    id: 'rest_recovery',
    speaker: 'survivor',
    message: '我找了个相对安全的地方休息。虽然环境不理想，但我确实需要恢复一些体力。休息时我听到了一些奇怪的声音...',
    choices: [
      { id: 'investigate_sounds', text: '调查奇怪的声音', nextScenario: 'mechanical_sound_investigation' },
      { id: 'continue_resting', text: '继续休息，忽略声音', nextScenario: 'continue_rest' },
      { id: 'find_sound_source', text: '寻找声音来源', nextScenario: 'sound_source_search' }
    ]
  },

  mechanical_sound_investigation: {
    id: 'mechanical_sound_investigation',
    speaker: 'survivor',
    message: '我小心地朝声音方向调查...发现是一台还在运转的通风设备。这意味着这个区域可能还有电力供应，也许我能找到其他有用的设备。',
    choices: [
      { id: 'check_power_systems', text: '检查电力系统', nextScenario: 'power_system_check' },
      { id: 'look_for_working_equipment', text: '寻找其他工作设备', nextScenario: 'equipment_search' },
      { id: 'return_to_rest', text: '返回休息地点', nextScenario: 'safe_rest_return' }
    ]
  },

  continue_rest: {
    id: 'continue_rest',
    speaker: 'survivor',
    message: '我决定继续休息，忽略那些声音。经过一段时间的休息，我感觉好多了。现在我需要决定下一步的行动。',
    choices: [
      { id: 'plan_next_action', text: '规划下一步行动', nextScenario: 'action_planning' },
      { id: 'explore_nearby', text: '探索附近区域', nextScenario: 'nearby_exploration' },
      { id: 'check_health_status', text: '检查身体状况', nextScenario: 'health_check' }
    ]
  },

  sound_source_search: {
    id: 'sound_source_search',
    speaker: 'survivor',
    message: '我决定寻找声音的确切来源。跟随声音，我来到了一个机械室。这里有各种管道和设备，看起来像是学校的基础设施中心。',
    choices: [
      { id: 'explore_mechanical_room', text: '探索机械室', nextScenario: 'mechanical_room_exploration' },
      { id: 'check_utility_systems', text: '检查公用设施系统', nextScenario: 'utility_system_check' },
      { id: 'look_for_maintenance_tools', text: '寻找维修工具', nextScenario: 'maintenance_tools_search' }
    ]
  },

  // 联系和通讯相关
  continue_contact: {
    id: 'continue_contact',
    speaker: 'survivor',
    message: '我继续尝试联系队友...这次我听到了更清楚的信号！虽然断断续续，但我能确定他们还活着。',
    choices: [
      { id: 'attempt_more_contact', text: '继续尝试建立联系', nextScenario: 'more_contact_attempts' },
      { id: 'heed_their_warning', text: '听从他们的警告', nextScenario: 'heed_warning' },
      { id: 'trace_signal_location', text: '追踪信号位置', nextScenario: 'signal_tracing' }
    ]
  },

  more_contact_attempts: {
    id: 'more_contact_attempts',
    speaker: 'survivor',
    message: '我持续尝试联系...终于建立了稳定的通讯！队友告诉我他们被困在地下室，情况很危险，但还能坚持一段时间。',
    choices: [
      { id: 'plan_rescue_mission', text: '计划救援行动', nextScenario: 'rescue_planning' },
      { id: 'get_location_details', text: '获取详细位置信息', nextScenario: 'location_details' },
      { id: 'coordinate_escape', text: '协调共同逃生', nextScenario: 'escape_coordination' }
    ]
  },

  heed_warning: {
    id: 'heed_warning',
    speaker: 'survivor',
    message: '我决定听从队友的警告，不去寻找他们。他们说那个区域太危险了，让我专注于自己的安全。这是个艰难但明智的决定。',
    choices: [
      { id: 'focus_on_escape', text: '专注于寻找出路', nextScenario: 'escape_focus' },
      { id: 'gather_evidence_alone', text: '独自收集证据', nextScenario: 'solo_evidence_gathering' },
      { id: 'find_alternative_help', text: '寻找其他帮助', nextScenario: 'alternative_help_search' }
    ]
  },

  // 移动和探索相关
  move_toward_signal: {
    id: 'move_toward_signal',
    speaker: 'survivor',
    message: '我朝着信号的方向移动...来到了一个我之前没有探索过的区域。这里的辐射水平稍高，但还在可承受范围内。',
    choices: [
      { id: 'find_alternative_entry', text: '寻找其他进入方式', nextScenario: 'alternative_entry' },
      { id: 'continue_despite_radiation', text: '不顾辐射继续前进', nextScenario: 'radiation_risk_advance' },
      { id: 'retreat_and_replan', text: '撤退并重新规划', nextScenario: 'tactical_retreat' }
    ]
  },

  alternative_entry: {
    id: 'alternative_entry',
    speaker: 'survivor',
    message: '我寻找其他进入方式...在建筑物的侧面发现了一个维修入口。虽然有些狭窄，但看起来可以通过。',
    choices: [
      { id: 'use_maintenance_entrance', text: '使用维修入口', nextScenario: 'maintenance_entrance_use' },
      { id: 'check_entrance_safety', text: '检查入口安全性', nextScenario: 'entrance_safety_check' },
      { id: 'look_for_other_options', text: '寻找其他选择', nextScenario: 'other_options_search' }
    ]
  },

  // 通用回流场景 - 第二批
  // 隐蔽和观察相关
  stop_contact: {
    id: 'stop_contact',
    speaker: 'survivor',
    message: '我决定停止联系，保持隐蔽。这是明智的选择，因为我听到了脚步声...有什么东西在附近移动。',
    choices: [
      { id: 'hide_and_observe', text: '躲藏并观察', nextScenario: 'hide_and_observe' },
      { id: 'stealth_follow', text: '悄悄跟踪', nextScenario: 'stealth_follow' },
      { id: 'quick_escape', text: '快速逃离', nextScenario: 'quick_escape' }
    ]
  },

  hide_and_observe: {
    id: 'hide_and_observe',
    speaker: 'survivor',
    message: '我找了个隐蔽的地方躲起来观察...看到了一些穿着防护服的人在巡逻。他们似乎在寻找什么，我必须保持安静。',
    choices: [
      { id: 'wait_for_them_to_leave', text: '等他们离开', nextScenario: 'patrol_waiting' },
      { id: 'try_to_overhear', text: '尝试偷听对话', nextScenario: 'eavesdropping_attempt' },
      { id: 'plan_evasion_route', text: '规划逃避路线', nextScenario: 'evasion_planning' }
    ]
  },

  stealth_follow: {
    id: 'stealth_follow',
    speaker: 'survivor',
    message: '我小心地跟踪那些声音...发现是一队搜索人员。他们似乎在寻找幸存者，但我不确定他们的意图是善是恶。',
    choices: [
      { id: 'reveal_yourself', text: '主动现身', nextScenario: 'self_revelation' },
      { id: 'continue_following', text: '继续跟踪', nextScenario: 'continued_tracking' },
      { id: 'retreat_silently', text: '悄悄撤退', nextScenario: 'silent_retreat' }
    ]
  },

  quick_escape: {
    id: 'quick_escape',
    speaker: 'survivor',
    message: '我快速离开了这个区域。虽然不知道那是什么，但保持距离总是更安全的选择。现在我需要找个新的地方继续我的任务。',
    choices: [
      { id: 'find_new_safe_area', text: '寻找新的安全区域', nextScenario: 'new_safe_area_search' },
      { id: 'continue_original_mission', text: '继续原定任务', nextScenario: 'mission_continuation' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'situation_reassessment' }
    ]
  },

  // 后院和户外探索
  backyard_exploration: {
    id: 'backyard_exploration',
    speaker: 'survivor',
    message: '我来到了学校的后院区域。这里相对开阔，但也意味着更容易被发现。我看到了一些有趣的建筑物。',
    choices: [
      { id: 'check_tool_shed', text: '检查工具棚', nextScenario: 'tool_shed_search' },
      { id: 'explore_garden_area', text: '探索花园区域', nextScenario: 'garden_inspection' },
      { id: 'look_for_exits', text: '寻找出口', nextScenario: 'exit_search' }
    ]
  },

  tool_shed_search: {
    id: 'tool_shed_search',
    speaker: 'survivor',
    message: '工具棚里有各种园艺和维修工具。虽然大部分都生锈了，但我找到了一些还能使用的东西：一把锤子、一些绳子，还有一个手电筒。',
    choices: [
      { id: 'take_useful_tools', text: '拿走有用的工具', nextScenario: 'tools_acquired' },
      { id: 'search_for_more_items', text: '继续搜索更多物品', nextScenario: 'extended_tool_search' },
      { id: 'use_shed_as_shelter', text: '将工具棚作为临时避难所', nextScenario: 'shed_shelter' }
    ]
  },

  garden_inspection: {
    id: 'garden_inspection',
    speaker: 'survivor',
    message: '花园区域大部分植物都已经枯萎，但我注意到有些区域的土壤颜色异常。这可能是污染的迹象，我需要小心。',
    choices: [
      { id: 'test_soil_contamination', text: '测试土壤污染', nextScenario: 'soil_contamination_test' },
      { id: 'avoid_contaminated_areas', text: '避开污染区域', nextScenario: 'contamination_avoidance' },
      { id: 'look_for_clean_areas', text: '寻找清洁区域', nextScenario: 'clean_area_search' }
    ]
  },

  // 建筑入口探索
  building_entrance_search: {
    id: 'building_entrance_search',
    speaker: 'survivor',
    message: '我沿着建筑物寻找其他入口...发现了几个可能的选择：一扇侧门、一些窗户，还有一个看起来像是紧急出口的门。',
    choices: [
      { id: 'try_side_door', text: '尝试侧门', nextScenario: 'side_door_attempt' },
      { id: 'use_flashlight_exploration', text: '用手电筒仔细探索', nextScenario: 'flashlight_exploration' },
      { id: 'find_safer_entrance', text: '寻找更安全的入口', nextScenario: 'safer_entrance_search' }
    ]
  },

  flashlight_exploration: {
    id: 'flashlight_exploration',
    speaker: 'survivor',
    message: '我用手电筒仔细照亮了周围区域。在光线的帮助下，我发现了一些之前没注意到的细节：墙上的标记、地面的痕迹，还有一个半隐藏的入口。',
    choices: [
      { id: 'investigate_wall_markings', text: '调查墙上的标记', nextScenario: 'wall_markings_investigation' },
      { id: 'follow_ground_traces', text: '跟随地面痕迹', nextScenario: 'ground_traces_following' },
      { id: 'use_hidden_entrance', text: '使用隐藏入口', nextScenario: 'hidden_entrance_use' }
    ]
  },

  safer_entrance_search: {
    id: 'safer_entrance_search',
    speaker: 'survivor',
    message: '我继续寻找更安全的入口...在建筑物的另一侧找到了一个看起来很少使用的门。门没有锁，而且周围没有警报装置。',
    choices: [
      { id: 'enter_through_safe_door', text: '通过安全门进入', nextScenario: 'safe_door_entry' },
      { id: 'check_door_thoroughly', text: '彻底检查门的安全性', nextScenario: 'door_safety_check' },
      { id: 'continue_perimeter_search', text: '继续搜索周边', nextScenario: 'perimeter_search_continuation' }
    ]
  },

  // 通用回流场景 - 第三批
  // 恢复和主要区域相关
  return_main_area: {
    id: 'return_main_area',
    speaker: 'survivor',
    message: '我决定返回到主要区域。虽然没有发现什么特别的东西，但至少我对这个地方有了更好的了解。现在我需要决定下一步的行动。',
    choices: [
      { id: 'rest_and_recover', text: '休息恢复体力', nextScenario: 'recovery_phase' },
      { id: 'plan_systematic_exploration', text: '计划系统性探索', nextScenario: 'systematic_exploration_planning' },
      { id: 'reassess_priorities', text: '重新评估优先级', nextScenario: 'priority_reassessment' }
    ]
  },

  recovery_phase: {
    id: 'recovery_phase',
    speaker: 'survivor',
    message: '我找了个相对安全的地方进行恢复。检查装备，整理物资，评估身体状况。经过一段时间的休整，我感觉好多了。',
    choices: [
      { id: 'continue_with_renewed_energy', text: '以新的精力继续', nextScenario: 'renewed_exploration' },
      { id: 'plan_next_phase', text: '规划下一阶段', nextScenario: 'next_phase_planning' },
      { id: 'check_communication_status', text: '检查通讯状态', nextScenario: 'communication_status_check' }
    ]
  },

  // 逃生规划相关
  escape_planning: {
    id: 'escape_planning',
    speaker: 'survivor',
    message: '我需要仔细规划逃生路线。根据我收集的信息，有几条可能的路径可以选择。每条路线都有其风险和优势。',
    choices: [
      { id: 'choose_main_exit', text: '选择主要出口路线', nextScenario: 'main_exit_attempt' },
      { id: 'try_back_exit', text: '尝试后门路线', nextScenario: 'back_exit_attempt' },
      { id: 'look_for_secret_route', text: '寻找秘密路线', nextScenario: 'secret_route_search' }
    ]
  },

  back_exit_attempt: {
    id: 'back_exit_attempt',
    speaker: 'survivor',
    message: '我决定尝试后门路线。这条路线相对隐蔽，但可能会遇到一些障碍。我小心地朝后门方向移动。',
    choices: [
      { id: 'proceed_cautiously', text: '谨慎前进', nextScenario: 'cautious_back_exit' },
      { id: 'move_quickly', text: '快速移动', nextScenario: 'rapid_back_exit' },
      { id: 'scout_area_first', text: '先侦察区域', nextScenario: 'back_exit_scouting' }
    ]
  },

  // 外界联系相关
  outside_contact: {
    id: 'outside_contact',
    speaker: 'survivor',
    message: '我尝试联系外界救援...信号很弱，但我成功连接到了紧急频道。"这里是李明，我在阳光学校，发现了重要情况，需要立即支援！"',
    choices: [
      { id: 'wait_for_rescue', text: '等待救援到达', nextScenario: 'rescue_wait' },
      { id: 'transmit_evidence', text: '立即传输证据', nextScenario: 'evidence_transmission' },
      { id: 'request_evacuation', text: '请求紧急撤离', nextScenario: 'evacuation_request' }
    ]
  },

  rescue_wait: {
    id: 'rescue_wait',
    speaker: 'survivor',
    message: '我在等待救援队到达...时间过得很慢，每一分钟都感觉像一个小时。我必须保持警惕，同时准备好在救援到达时快速行动。',
    choices: [
      { id: 'prepare_for_rescue', text: '为救援做准备', nextScenario: 'rescue_preparation' },
      { id: 'continue_gathering_evidence', text: '继续收集证据', nextScenario: 'evidence_gathering_while_waiting' },
      { id: 'secure_area', text: '确保区域安全', nextScenario: 'area_securing' }
    ]
  },

  evidence_transmission: {
    id: 'evidence_transmission',
    speaker: 'survivor',
    message: '我开始传输收集到的证据...数据传输很慢，但我必须确保这些重要信息能够安全到达外界。这可能是揭露真相的唯一机会。',
    choices: [
      { id: 'ensure_complete_transmission', text: '确保完整传输', nextScenario: 'complete_transmission' },
      { id: 'prioritize_key_evidence', text: '优先传输关键证据', nextScenario: 'priority_evidence_transmission' },
      { id: 'prepare_backup_plan', text: '准备备用计划', nextScenario: 'backup_plan_preparation' }
    ]
  },

  evacuation_request: {
    id: 'evacuation_request',
    speaker: 'survivor',
    message: '我请求紧急撤离...指挥中心回应说他们正在派遣撤离小组，但需要一些时间。我必须坚持到他们到达。',
    choices: [
      { id: 'find_safe_extraction_point', text: '寻找安全撤离点', nextScenario: 'extraction_point_search' },
      { id: 'prepare_for_extraction', text: '为撤离做准备', nextScenario: 'extraction_preparation' },
      { id: 'maintain_communication', text: '保持通讯联系', nextScenario: 'communication_maintenance' }
    ]
  },

  // 地下室相关
  basement_search: {
    id: 'basement_search',
    speaker: 'survivor',
    message: '根据地图，我找到了地下室入口。这里的辐射水平比地面更高，我的检测器发出了警告声。但我可能需要进入寻找重要信息。',
    choices: [
      { id: 'force_basement_door', text: '强行打开地下室门', nextScenario: 'basement_entry_force' },
      { id: 'use_ventilation_shaft', text: '通过通风管道进入', nextScenario: 'ventilation_entry' },
      { id: 'retreat_due_to_radiation', text: '因辐射过高而撤退', nextScenario: 'radiation_retreat' }
    ]
  },

  basement_entry_force: {
    id: 'basement_entry_force',
    speaker: 'survivor',
    message: '我用力推开地下室的门...门发出刺耳的声音，但最终打开了。里面一片漆黑，空气中弥漫着奇怪的气味。我的辐射检测器疯狂地响着。',
    choices: [
      { id: 'enter_with_protection', text: '做好防护后进入', nextScenario: 'protected_basement_entry' },
      { id: 'use_flashlight_first', text: '先用手电筒照明', nextScenario: 'basement_illumination' },
      { id: 'retreat_immediately', text: '立即撤退', nextScenario: 'basement_retreat' }
    ]
  },

  ventilation_entry: {
    id: 'ventilation_entry',
    speaker: 'survivor',
    message: '我决定通过通风管道进入地下室。管道很狭窄，但我勉强能够通过。这种方式更隐蔽，但也更危险。',
    choices: [
      { id: 'crawl_through_carefully', text: '小心爬行通过', nextScenario: 'careful_ventilation_crawl' },
      { id: 'move_quickly_through', text: '快速通过管道', nextScenario: 'rapid_ventilation_passage' },
      { id: 'check_air_quality_first', text: '先检查空气质量', nextScenario: 'air_quality_check' }
    ]
  },

  // 通用汇聚场景 - 让多个分支回流到主要路径
  // 通用探索汇聚点
  exploration_convergence: {
    id: 'exploration_convergence',
    speaker: 'survivor',
    message: '经过一番探索，我收集了一些有用的信息和物资。现在我需要决定下一步的重要行动：是继续深入调查，还是专注于寻找出路。',
    choices: [
      { id: 'continue_investigation', text: '继续深入调查', nextScenario: 'project_investigation' },
      { id: 'focus_on_escape', text: '专注于寻找出路', nextScenario: 'escape_planning' },
      { id: 'gather_more_evidence', text: '收集更多证据', nextScenario: 'evidence_collection' }
    ]
  },

  // 通用医疗汇聚点
  medical_convergence: {
    id: 'medical_convergence',
    speaker: 'survivor',
    message: '我处理了一些健康问题，现在感觉好多了。虽然情况仍然危险，但我有信心继续我的任务。',
    choices: [
      { id: 'return_to_exploration', text: '返回探索', nextScenario: 'area_selection' },
      { id: 'seek_safer_area', text: '寻找更安全的区域', nextScenario: 'safe_location_search' },
      { id: 'continue_mission', text: '继续主要任务', nextScenario: 'mission_continuation' }
    ]
  },

  // 通用搜索汇聚点
  search_convergence: {
    id: 'search_convergence',
    speaker: 'survivor',
    message: '我的搜索有了一些收获。找到了一些有用的物品和信息。现在我需要决定如何利用这些发现。',
    choices: [
      { id: 'analyze_findings', text: '分析发现的信息', nextScenario: 'findings_analysis' },
      { id: 'continue_systematic_search', text: '继续系统性搜索', nextScenario: 'systematic_search' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' }
    ]
  },

  // 通用安全汇聚点
  safety_convergence: {
    id: 'safety_convergence',
    speaker: 'survivor',
    message: '我找到了一个相对安全的位置，可以暂时休息和重新规划。这里的辐射水平较低，我可以安全地评估当前情况。',
    choices: [
      { id: 'plan_next_phase', text: '规划下一阶段行动', nextScenario: 'next_phase_planning' },
      { id: 'contact_outside_help', text: '尝试联系外界', nextScenario: 'outside_contact' },
      { id: 'prepare_for_final_push', text: '为最后冲刺做准备', nextScenario: 'final_preparation' }
    ]
  },

  // 现在创建大量通用场景，让它们都指向这些汇聚点
  // 教室相关通用场景
  restricted_area_map: {
    id: 'restricted_area_map',
    speaker: 'survivor',
    message: '我发现了一张标注着禁区的地图。这些信息很有价值，让我对学校的危险区域有了更清楚的认识。',
    choices: [
      { id: 'study_restricted_areas', text: '研究禁区信息', nextScenario: 'exploration_convergence' },
      { id: 'avoid_dangerous_zones', text: '避开危险区域', nextScenario: 'safety_convergence' },
      { id: 'plan_safe_route', text: '规划安全路线', nextScenario: 'escape_planning' }
    ]
  },

  other_classrooms_search: {
    id: 'other_classrooms_search',
    speaker: 'survivor',
    message: '我搜索了其他教室，找到了一些学习用品和个人物品。虽然大部分都没什么用，但我发现了一些有趣的线索。',
    choices: [
      { id: 'examine_clues', text: '仔细检查线索', nextScenario: 'search_convergence' },
      { id: 'continue_classroom_search', text: '继续搜索教室', nextScenario: 'exploration_convergence' },
      { id: 'move_to_other_areas', text: '转移到其他区域', nextScenario: 'area_selection' }
    ]
  },

  // 联系相关通用场景
  signal_tracing: {
    id: 'signal_tracing',
    speaker: 'survivor',
    message: '我尝试追踪信号的来源...虽然没有找到确切位置，但我对队友的大概方位有了更好的了解。',
    choices: [
      { id: 'continue_search_for_team', text: '继续寻找队友', nextScenario: 'teammate_search' },
      { id: 'focus_on_own_mission', text: '专注于自己的任务', nextScenario: 'exploration_convergence' },
      { id: 'prepare_rescue_attempt', text: '准备救援尝试', nextScenario: 'safety_convergence' }
    ]
  },

  // 移动相关通用场景
  radiation_risk_advance: {
    id: 'radiation_risk_advance',
    speaker: 'survivor',
    message: '我决定冒着辐射风险继续前进。虽然检测器在警告，但我觉得这个风险是值得的。我必须小心监控自己的状况。',
    choices: [
      { id: 'monitor_radiation_carefully', text: '仔细监控辐射水平', nextScenario: 'medical_convergence' },
      { id: 'push_through_quickly', text: '快速通过危险区域', nextScenario: 'exploration_convergence' },
      { id: 'find_protection', text: '寻找防护措施', nextScenario: 'safety_convergence' }
    ]
  },

  tactical_retreat: {
    id: 'tactical_retreat',
    speaker: 'survivor',
    message: '我决定战术性撤退。有时候退一步是为了更好地前进。我需要重新评估情况，制定更好的计划。',
    choices: [
      { id: 'replan_approach', text: '重新规划方法', nextScenario: 'exploration_convergence' },
      { id: 'find_alternative_route', text: '寻找替代路线', nextScenario: 'area_selection' },
      { id: 'gather_more_information', text: '收集更多信息', nextScenario: 'search_convergence' }
    ]
  },

  // 批量通用场景 - 第一批
  // 建筑入口相关
  side_door_attempt: {
    id: 'side_door_attempt',
    speaker: 'survivor',
    message: '我尝试打开侧门...经过一番努力，门终于打开了。里面是一个储藏室，有一些有用的物品。',
    choices: [
      { id: 'search_storage_room', text: '搜索储藏室', nextScenario: 'search_convergence' },
      { id: 'use_as_safe_point', text: '作为安全点使用', nextScenario: 'safety_convergence' },
      { id: 'continue_exploration', text: '继续探索', nextScenario: 'exploration_convergence' }
    ]
  },

  // 规划相关
  systematic_exploration_planning: {
    id: 'systematic_exploration_planning',
    speaker: 'survivor',
    message: '我制定了一个系统性的探索计划。这种有条理的方法应该能帮我更有效地收集信息和物资。',
    choices: [
      { id: 'execute_plan', text: '执行计划', nextScenario: 'systematic_search' },
      { id: 'modify_plan', text: '修改计划', nextScenario: 'exploration_convergence' },
      { id: 'start_with_priority_areas', text: '从优先区域开始', nextScenario: 'area_selection' }
    ]
  },

  priority_reassessment: {
    id: 'priority_reassessment',
    speaker: 'survivor',
    message: '我重新评估了当前的优先级。考虑到新的信息和情况变化，我需要调整我的行动计划。',
    choices: [
      { id: 'focus_on_survival', text: '专注于生存', nextScenario: 'safety_convergence' },
      { id: 'prioritize_mission', text: '优先考虑任务', nextScenario: 'exploration_convergence' },
      { id: 'balance_both', text: '平衡两者', nextScenario: 'search_convergence' }
    ]
  },

  // 逃生相关
  secret_route_search: {
    id: 'secret_route_search',
    speaker: 'survivor',
    message: '我寻找秘密路线...虽然没有找到明显的隐藏通道，但我发现了一些可能有用的路径。',
    choices: [
      { id: 'try_alternative_path', text: '尝试替代路径', nextScenario: 'exploration_convergence' },
      { id: 'return_to_main_routes', text: '返回主要路线', nextScenario: 'escape_planning' },
      { id: 'continue_searching', text: '继续寻找', nextScenario: 'search_convergence' }
    ]
  },

  // 区域探索相关
  teaching_building_exploration: {
    id: 'teaching_building_exploration',
    speaker: 'survivor',
    message: '我进入了教学楼。这里有很多教室和办公室，可能隐藏着重要的信息或物资。',
    choices: [
      { id: 'search_classrooms', text: '搜索教室', nextScenario: 'classroom_area_approach' },
      { id: 'check_faculty_offices', text: '检查教师办公室', nextScenario: 'search_convergence' },
      { id: 'explore_systematically', text: '系统性探索', nextScenario: 'systematic_search' }
    ]
  },

  lab_area_investigation: {
    id: 'lab_area_investigation',
    speaker: 'survivor',
    message: '我来到了实验室区域。这里的辐射水平明显更高，但也可能是找到关键信息的地方。',
    choices: [
      { id: 'enter_with_caution', text: '谨慎进入', nextScenario: 'laboratory_entry' },
      { id: 'investigate_from_outside', text: '从外部调查', nextScenario: 'lab_exterior_recon' },
      { id: 'find_protective_gear', text: '寻找防护装备', nextScenario: 'safety_convergence' }
    ]
  },

  // 地图研究相关
  project_sunshine_investigation: {
    id: 'project_sunshine_investigation',
    speaker: 'survivor',
    message: '我深入研究"项目阳光"的相关信息...这个项目比我想象的更加复杂和危险。我必须收集更多证据。',
    choices: [
      { id: 'gather_more_evidence', text: '收集更多证据', nextScenario: 'evidence_collection' },
      { id: 'investigate_lab_connection', text: '调查与实验室的联系', nextScenario: 'lab_area_investigation' },
      { id: 'seek_administrative_records', text: '寻找行政记录', nextScenario: 'admin_area_exploration' }
    ]
  },

  forbidden_area_exploration: {
    id: 'forbidden_area_exploration',
    speaker: 'survivor',
    message: '我决定探索被标记为禁区的区域。这里显然很危险，但也可能隐藏着最重要的秘密。',
    choices: [
      { id: 'proceed_with_extreme_caution', text: '极度谨慎地前进', nextScenario: 'exploration_convergence' },
      { id: 'prepare_safety_measures', text: '准备安全措施', nextScenario: 'safety_convergence' },
      { id: 'document_findings_first', text: '先记录发现', nextScenario: 'search_convergence' }
    ]
  },

  additional_clue_search: {
    id: 'additional_clue_search',
    speaker: 'survivor',
    message: '我继续寻找额外的线索...在一些不起眼的地方发现了更多信息片段。这些线索正在拼凑出一个更完整的图景。',
    choices: [
      { id: 'piece_together_information', text: '拼凑信息', nextScenario: 'search_convergence' },
      { id: 'look_for_verification', text: '寻找验证', nextScenario: 'exploration_convergence' },
      { id: 'prepare_evidence_package', text: '准备证据包', nextScenario: 'evidence_collection' }
    ]
  },

  // 休息和地图研究
  rest_and_map_study: {
    id: 'rest_and_map_study',
    speaker: 'survivor',
    message: '我找了个安全的地方休息并研究地图。通过仔细分析，我对学校的布局和危险区域有了更深的理解。',
    choices: [
      { id: 'plan_efficient_route', text: '规划高效路线', nextScenario: 'exploration_convergence' },
      { id: 'identify_key_locations', text: '识别关键位置', nextScenario: 'area_selection' },
      { id: 'prepare_for_next_phase', text: '为下一阶段做准备', nextScenario: 'safety_convergence' }
    ]
  },

  // 自动生成的缺失场景 - 第一批
  immediate_treatment: {
    id: 'immediate_treatment',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  emergency_reserve: {
    id: 'emergency_reserve',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  store_continued_search: {
    id: 'store_continued_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  selective_items_taken: {
    id: 'selective_items_taken',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  all_items_taken: {
    id: 'all_items_taken',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  expired_items_left: {
    id: 'expired_items_left',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  document_search: {
    id: 'document_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  laboratory_investigation: {
    id: 'laboratory_investigation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  admin_records_check: {
    id: 'admin_records_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  safe_rooms_check: {
    id: 'safe_rooms_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  radio_signal_tracking: {
    id: 'radio_signal_tracking',
    speaker: 'survivor',
    message: '我尝试了一些通讯方法。虽然信号不稳定，但我获得了一些有用的信息。',
    choices: [
      { id: 'continue_communication', text: '继续尝试通讯', nextScenario: 'outside_contact' },
      { id: 'focus_on_mission', text: '专注于任务', nextScenario: 'exploration_convergence' },
      { id: 'seek_better_signal', text: '寻找更好的信号', nextScenario: 'search_convergence' }
    ]
  },

  staff_area_exploration: {
    id: 'staff_area_exploration',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  water_fountain_search: {
    id: 'water_fountain_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  bottled_water_search: {
    id: 'bottled_water_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  tap_water_test: {
    id: 'tap_water_test',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  supply_mapping: {
    id: 'supply_mapping',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  route_planning: {
    id: 'route_planning',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  protection_enhancement: {
    id: 'protection_enhancement',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  exposure_documentation: {
    id: 'exposure_documentation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  health_alert_system: {
    id: 'health_alert_system',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  safety_first_exploration: {
    id: 'safety_first_exploration',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  emergency_supplies_acquired: {
    id: 'emergency_supplies_acquired',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  expiration_check: {
    id: 'expiration_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  thorough_freezer_search: {
    id: 'thorough_freezer_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  sound_investigation_safe: {
    id: 'sound_investigation_safe',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  warning_broadcast: {
    id: 'warning_broadcast',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  microwave_heating: {
    id: 'microwave_heating',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  alternative_heating: {
    id: 'alternative_heating',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  illness_monitoring: {
    id: 'illness_monitoring',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  preventive_medicine_search: {
    id: 'preventive_medicine_search',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  risky_continuation: {
    id: 'risky_continuation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  heat_source_search: {
    id: 'heat_source_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  kitchen_safe_exploration: {
    id: 'kitchen_safe_exploration',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  creature_tracking: {
    id: 'creature_tracking',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  creature_avoidance_route: {
    id: 'creature_avoidance_route',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  mutation_documentation: {
    id: 'mutation_documentation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  threat_assessment: {
    id: 'threat_assessment',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  quiet_retreat: {
    id: 'quiet_retreat',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  barricade_setup: {
    id: 'barricade_setup',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  escape_route_planning: {
    id: 'escape_route_planning',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  observation_mode: {
    id: 'observation_mode',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  weapon_familiarization: {
    id: 'weapon_familiarization',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  better_weapon_search: {
    id: 'better_weapon_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  armed_exploration: {
    id: 'armed_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  immediate_medical_care: {
    id: 'immediate_medical_care',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  medical_supplies_saved: {
    id: 'medical_supplies_saved',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  medical_kit_inspection: {
    id: 'medical_kit_inspection',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  supply_organization: {
    id: 'supply_organization',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  quick_area_exit: {
    id: 'quick_area_exit',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  safe_storage_search: {
    id: 'safe_storage_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  courtyard_exploration: {
    id: 'courtyard_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  escape_route_secured: {
    id: 'escape_route_secured',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  exit_marking: {
    id: 'exit_marking',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  exploration_planning: {
    id: 'exploration_planning',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  map_guided_search: {
    id: 'map_guided_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  basement_area_search: {
    id: 'basement_area_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  shelter_sign_search: {
    id: 'shelter_sign_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  admin_building_search: {
    id: 'admin_building_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  hidden_door_search: {
    id: 'hidden_door_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  tunnel_exploration: {
    id: 'tunnel_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  window_entry: {
    id: 'window_entry',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  keycard_search: {
    id: 'keycard_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  entry_point_assessment: {
    id: 'entry_point_assessment',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  radiation_monitoring: {
    id: 'radiation_monitoring',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  laboratory_entry: {
    id: 'laboratory_entry',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  medical_office_entry: {
    id: 'medical_office_entry',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  restricted_area_exploration: {
    id: 'restricted_area_exploration',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  safe_opening_attempt: {
    id: 'safe_opening_attempt',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  hidden_documents_reading: {
    id: 'hidden_documents_reading',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  office_items_collected: {
    id: 'office_items_collected',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  storage_room_entry: {
    id: 'storage_room_entry',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  better_location_search: {
    id: 'better_location_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  temporary_shelter_setup: {
    id: 'temporary_shelter_setup',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  radiation_mapping: {
    id: 'radiation_mapping',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  safe_path_finding: {
    id: 'safe_path_finding',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  high_radiation_investigation: {
    id: 'high_radiation_investigation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  new_area_exploration: {
    id: 'new_area_exploration',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  location_revisit: {
    id: 'location_revisit',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  map_clue_following: {
    id: 'map_clue_following',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  communication_repair: {
    id: 'communication_repair',
    speaker: 'survivor',
    message: '我尝试了一些通讯方法。虽然信号不稳定，但我获得了一些有用的信息。',
    choices: [
      { id: 'continue_communication', text: '继续尝试通讯', nextScenario: 'outside_contact' },
      { id: 'focus_on_mission', text: '专注于任务', nextScenario: 'exploration_convergence' },
      { id: 'seek_better_signal', text: '寻找更好的信号', nextScenario: 'search_convergence' }
    ]
  },

  lighting_repair: {
    id: 'lighting_repair',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  repair_materials_saved: {
    id: 'repair_materials_saved',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  medication_rest: {
    id: 'medication_rest',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  pain_relief_action: {
    id: 'pain_relief_action',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  medication_monitoring: {
    id: 'medication_monitoring',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  medical_inventory: {
    id: 'medical_inventory',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  additional_medicine_search: {
    id: 'additional_medicine_search',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  unmedicated_continuation: {
    id: 'unmedicated_continuation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  medical_office_location: {
    id: 'medical_office_location',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  first_aid_station_check: {
    id: 'first_aid_station_check',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  teacher_area_search: {
    id: 'teacher_area_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  hidden_room_discovery: {
    id: 'hidden_room_discovery',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  maintenance_tunnel_exploration: {
    id: 'maintenance_tunnel_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  basement_level_investigation: {
    id: 'basement_level_investigation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  wound_bandaging: {
    id: 'wound_bandaging',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  antiseptic_application: {
    id: 'antiseptic_application',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  healing_monitoring: {
    id: 'healing_monitoring',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  systematic_area_search: {
    id: 'systematic_area_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  promising_area_focus: {
    id: 'promising_area_focus',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  rapid_area_survey: {
    id: 'rapid_area_survey',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  post_treatment_rest: {
    id: 'post_treatment_rest',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  improved_health_action: {
    id: 'improved_health_action',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  remaining_supplies_saved: {
    id: 'remaining_supplies_saved',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  safe_treatment_location: {
    id: 'safe_treatment_location',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  discomfort_continuation: {
    id: 'discomfort_continuation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  condition_monitoring: {
    id: 'condition_monitoring',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  clean_zone_establishment: {
    id: 'clean_zone_establishment',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  extended_cleaning: {
    id: 'extended_cleaning',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  base_establishment: {
    id: 'base_establishment',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  storage_rooms_search: {
    id: 'storage_rooms_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  utility_areas_check: {
    id: 'utility_areas_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  service_corridor_exploration: {
    id: 'service_corridor_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  next_move_planning: {
    id: 'next_move_planning',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  rest_and_recovery: {
    id: 'rest_and_recovery',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  findings_review: {
    id: 'findings_review',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  track_investigation: {
    id: 'track_investigation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  observation_post_setup: {
    id: 'observation_post_setup',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  tracked_area_avoidance: {
    id: 'tracked_area_avoidance',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  safe_route_following: {
    id: 'safe_route_following',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  danger_zone_marking: {
    id: 'danger_zone_marking',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  route_map_creation: {
    id: 'route_map_creation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  situation_analysis: {
    id: 'situation_analysis',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  exploration_priorities: {
    id: 'exploration_priorities',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  escape_strategy_planning: {
    id: 'escape_strategy_planning',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  stealth_exploration: {
    id: 'stealth_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  area_testing: {
    id: 'area_testing',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  escape_route_maintenance: {
    id: 'escape_route_maintenance',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  priority_based_search: {
    id: 'priority_based_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  room_by_room_search: {
    id: 'room_by_room_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  key_area_focus: {
    id: 'key_area_focus',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  lock_opened_success: {
    id: 'lock_opened_success',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  partial_bypass: {
    id: 'partial_bypass',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  alarm_triggered: {
    id: 'alarm_triggered',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  full_speed_escape: {
    id: 'full_speed_escape',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  covered_movement: {
    id: 'covered_movement',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  distraction_creation: {
    id: 'distraction_creation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  hidden_passage_opened: {
    id: 'hidden_passage_opened',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  mechanism_examination: {
    id: 'mechanism_examination',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  alternative_passage_search: {
    id: 'alternative_passage_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  evacuation_route_following: {
    id: 'evacuation_route_following',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  emergency_shelter_check: {
    id: 'emergency_shelter_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  map_comparison: {
    id: 'map_comparison',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  protective_equipment_search: {
    id: 'protective_equipment_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  radiation_waiting: {
    id: 'radiation_waiting',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  alternative_route_search: {
    id: 'alternative_route_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  nearest_classroom_entry: {
    id: 'nearest_classroom_entry',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  teachers_lounge_check: {
    id: 'teachers_lounge_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  hallway_exploration: {
    id: 'hallway_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  contamination_avoidance: {
    id: 'contamination_avoidance',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  substance_investigation: {
    id: 'substance_investigation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  playground_retreat: {
    id: 'playground_retreat',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  situation_reassessment: {
    id: 'situation_reassessment',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  different_approach: {
    id: 'different_approach',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  outside_contact_retry: {
    id: 'outside_contact_retry',
    speaker: 'survivor',
    message: '我尝试了一些通讯方法。虽然信号不稳定，但我获得了一些有用的信息。',
    choices: [
      { id: 'continue_communication', text: '继续尝试通讯', nextScenario: 'outside_contact' },
      { id: 'focus_on_mission', text: '专注于任务', nextScenario: 'exploration_convergence' },
      { id: 'seek_better_signal', text: '寻找更好的信号', nextScenario: 'search_convergence' }
    ]
  },

  fire_exit_check: {
    id: 'fire_exit_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  service_exit_search: {
    id: 'service_exit_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  basement_exit_exploration: {
    id: 'basement_exit_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  administrative_files_check: {
    id: 'administrative_files_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  security_office_search: {
    id: 'security_office_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  power_system_check: {
    id: 'power_system_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  equipment_search: {
    id: 'equipment_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  safe_rest_return: {
    id: 'safe_rest_return',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  action_planning: {
    id: 'action_planning',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  nearby_exploration: {
    id: 'nearby_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  health_check: {
    id: 'health_check',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  mechanical_room_exploration: {
    id: 'mechanical_room_exploration',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  utility_system_check: {
    id: 'utility_system_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  maintenance_tools_search: {
    id: 'maintenance_tools_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  rescue_planning: {
    id: 'rescue_planning',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  location_details: {
    id: 'location_details',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  escape_coordination: {
    id: 'escape_coordination',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  escape_focus: {
    id: 'escape_focus',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  solo_evidence_gathering: {
    id: 'solo_evidence_gathering',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  alternative_help_search: {
    id: 'alternative_help_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  maintenance_entrance_use: {
    id: 'maintenance_entrance_use',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  entrance_safety_check: {
    id: 'entrance_safety_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  other_options_search: {
    id: 'other_options_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  patrol_waiting: {
    id: 'patrol_waiting',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  eavesdropping_attempt: {
    id: 'eavesdropping_attempt',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  evasion_planning: {
    id: 'evasion_planning',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  self_revelation: {
    id: 'self_revelation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  continued_tracking: {
    id: 'continued_tracking',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  silent_retreat: {
    id: 'silent_retreat',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  new_safe_area_search: {
    id: 'new_safe_area_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  mission_continuation: {
    id: 'mission_continuation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  tools_acquired: {
    id: 'tools_acquired',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  extended_tool_search: {
    id: 'extended_tool_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  shed_shelter: {
    id: 'shed_shelter',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  soil_contamination_test: {
    id: 'soil_contamination_test',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  clean_area_search: {
    id: 'clean_area_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  wall_markings_investigation: {
    id: 'wall_markings_investigation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  ground_traces_following: {
    id: 'ground_traces_following',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  hidden_entrance_use: {
    id: 'hidden_entrance_use',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  safe_door_entry: {
    id: 'safe_door_entry',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  door_safety_check: {
    id: 'door_safety_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  perimeter_search_continuation: {
    id: 'perimeter_search_continuation',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  renewed_exploration: {
    id: 'renewed_exploration',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  next_phase_planning: {
    id: 'next_phase_planning',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  communication_status_check: {
    id: 'communication_status_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  cautious_back_exit: {
    id: 'cautious_back_exit',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  rapid_back_exit: {
    id: 'rapid_back_exit',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  back_exit_scouting: {
    id: 'back_exit_scouting',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  rescue_preparation: {
    id: 'rescue_preparation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  evidence_gathering_while_waiting: {
    id: 'evidence_gathering_while_waiting',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  area_securing: {
    id: 'area_securing',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  complete_transmission: {
    id: 'complete_transmission',
    speaker: 'survivor',
    message: '我尝试了一些通讯方法。虽然信号不稳定，但我获得了一些有用的信息。',
    choices: [
      { id: 'continue_communication', text: '继续尝试通讯', nextScenario: 'outside_contact' },
      { id: 'focus_on_mission', text: '专注于任务', nextScenario: 'exploration_convergence' },
      { id: 'seek_better_signal', text: '寻找更好的信号', nextScenario: 'search_convergence' }
    ]
  },

  priority_evidence_transmission: {
    id: 'priority_evidence_transmission',
    speaker: 'survivor',
    message: '我尝试了一些通讯方法。虽然信号不稳定，但我获得了一些有用的信息。',
    choices: [
      { id: 'continue_communication', text: '继续尝试通讯', nextScenario: 'outside_contact' },
      { id: 'focus_on_mission', text: '专注于任务', nextScenario: 'exploration_convergence' },
      { id: 'seek_better_signal', text: '寻找更好的信号', nextScenario: 'search_convergence' }
    ]
  },

  backup_plan_preparation: {
    id: 'backup_plan_preparation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  extraction_point_search: {
    id: 'extraction_point_search',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  extraction_preparation: {
    id: 'extraction_preparation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  communication_maintenance: {
    id: 'communication_maintenance',
    speaker: 'survivor',
    message: '我尝试了一些通讯方法。虽然信号不稳定，但我获得了一些有用的信息。',
    choices: [
      { id: 'continue_communication', text: '继续尝试通讯', nextScenario: 'outside_contact' },
      { id: 'focus_on_mission', text: '专注于任务', nextScenario: 'exploration_convergence' },
      { id: 'seek_better_signal', text: '寻找更好的信号', nextScenario: 'search_convergence' }
    ]
  },

  protected_basement_entry: {
    id: 'protected_basement_entry',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  basement_illumination: {
    id: 'basement_illumination',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  basement_retreat: {
    id: 'basement_retreat',
    speaker: 'survivor',
    message: '我采取了一些安全措施。在这种危险的环境中，谨慎总是明智的选择。',
    choices: [
      { id: 'maintain_safety', text: '保持安全状态', nextScenario: 'safety_convergence' },
      { id: 'cautious_advance', text: '谨慎前进', nextScenario: 'exploration_convergence' },
      { id: 'plan_next_move', text: '规划下一步', nextScenario: 'search_convergence' }
    ]
  },

  careful_ventilation_crawl: {
    id: 'careful_ventilation_crawl',
    speaker: 'survivor',
    message: '我处理了一些医疗问题。虽然条件有限，但我尽力照顾自己的健康。现在我感觉好一些了。',
    choices: [
      { id: 'continue_with_care', text: '小心地继续行动', nextScenario: 'medical_convergence' },
      { id: 'rest_more', text: '多休息一会儿', nextScenario: 'safety_convergence' },
      { id: 'resume_mission', text: '恢复任务', nextScenario: 'exploration_convergence' }
    ]
  },

  rapid_ventilation_passage: {
    id: 'rapid_ventilation_passage',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  air_quality_check: {
    id: 'air_quality_check',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  findings_analysis: {
    id: 'findings_analysis',
    speaker: 'survivor',
    message: '我进行了一番搜索。虽然没有发现什么特别重要的东西，但我对这个区域有了更好的了解。',
    choices: [
      { id: 'continue_searching', text: '继续搜索', nextScenario: 'search_convergence' },
      { id: 'move_to_new_area', text: '转移到新区域', nextScenario: 'area_selection' },
      { id: 'analyze_findings', text: '分析发现', nextScenario: 'exploration_convergence' }
    ]
  },

  final_preparation: {
    id: 'final_preparation',
    speaker: 'survivor',
    message: '我继续我的行动。每一步都让我更接近目标，虽然路途充满挑战，但我必须坚持下去。',
    choices: [
      { id: 'keep_going', text: '继续前进', nextScenario: 'exploration_convergence' },
      { id: 'reassess_situation', text: '重新评估情况', nextScenario: 'search_convergence' },
      { id: 'find_safe_spot', text: '寻找安全点', nextScenario: 'safety_convergence' }
    ]
  },

  vending_machine_search: {
    id: 'vending_machine_search',
    speaker: 'survivor',
    message: '我找到了学校的自动售货机。虽然大部分商品都已经过期，但我发现了一些密封包装的零食和饮料，看起来还能食用。',
    choices: [
      { id: 'take_sealed_snacks', text: '拿走密封零食', nextScenario: 'search_convergence' },
      { id: 'check_expiration_dates', text: '检查保质期', nextScenario: 'exploration_convergence' },
      { id: 'look_for_other_machines', text: '寻找其他售货机', nextScenario: 'area_selection' }
    ]
  }
};
