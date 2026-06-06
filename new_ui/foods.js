// Food database - protein per standard serving
// Used by meal pages to calculate personalized portions
var FOODS = {
  // Breakfast
  egg:       { name: '水煮鸡蛋',   unit: '个',  perUnit: 50,  protein: 6.6, icon: '🥚' },
  eggSteam:  { name: '蒸蛋羹',     unit: '蛋', perUnit: 1,   protein: 6.6, icon: '🥚' },
  eggNative: { name: '土鸡蛋',     unit: '个',  perUnit: 50,  protein: 7.2, icon: '🥚' },
  eggPoach:  { name: '荷包蛋（煮）', unit: '个', perUnit: 1, protein: 6.2, icon: '🥚' },
  eggPreserv:{ name: '松花蛋',     unit: '个',  perUnit: 60,  protein: 8.9, icon: '🥚' },
  milk:      { name: '全脂牛奶',   unit: 'ml', perUnit: 100, protein: 3.3, icon: '🥛' },
  milkLow:   { name: '低脂牛奶',   unit: 'ml', perUnit: 100, protein: 3.8, icon: '🥛' },
  soymilk:   { name: '豆浆',       unit: 'ml', perUnit: 100, protein: 3.0, icon: '🥛' },
  yogurt:    { name: '酸奶',       unit: 'ml', perUnit: 100, protein: 2.8, icon: '🥛' },
  bread:     { name: '馒头',       unit: '个',  perUnit: 100, protein: 7.0, icon: '🍞' },
  roll:      { name: '花卷',       unit: '个',  perUnit: 100, protein: 6.4, icon: '🍞' },
  porridge:  { name: '杂粮粥',     unit: '碗',  perUnit: 1,   protein: 5.0, icon: '🥣' },
  toast:     { name: '全麦面包',   unit: '片',  perUnit: 50,  protein: 3.5, icon: '🍞' },

  // Meat (lunch)
  chickenBreast: { name: '鸡胸脯肉', unit: 'g', perUnit: 100, protein: 24.6, icon: '🍗' },
  porkLean:      { name: '猪瘦肉',   unit: 'g', perUnit: 100, protein: 20.7, icon: '🥩' },
  beefSauce:     { name: '酱牛肉',   unit: 'g', perUnit: 100, protein: 31.4, icon: '🐂' },
  chickenLeg:    { name: '鸡腿肉',   unit: 'g', perUnit: 100, protein: 20.2, icon: '🦆' },
  beefShank:     { name: '牛腱子',   unit: 'g', perUnit: 100, protein: 20.1, icon: '🐂' },
  shrimp:        { name: '虾仁',     unit: 'g', perUnit: 100, protein: 18.2, icon: '🦐' },
  lambLean:      { name: '羊肉（瘦）', unit: 'g', perUnit: 100, protein: 18.5, icon: '🐑' },

  // Fish (dinner)
  bass:      { name: '鲈鱼',     unit: 'g', perUnit: 100, protein: 18.6, icon: '🐟' },
  carp:      { name: '鲫鱼',     unit: 'g', perUnit: 100, protein: 17.1, icon: '🐟' },
  grassCarp: { name: '草鱼',     unit: 'g', perUnit: 100, protein: 16.6, icon: '🐟' },
  hairtail:  { name: '带鱼',     unit: 'g', perUnit: 100, protein: 17.7, icon: '🐟' },
  crab:      { name: '河蟹',     unit: 'g', perUnit: 100, protein: 17.5, icon: '🦀' },
  prawn:     { name: '对虾',     unit: 'g', perUnit: 100, protein: 18.2, icon: '🦐' },
  scallop:   { name: '扇贝',     unit: 'g', perUnit: 100, protein: 5.3,  icon: '🦪' },

  // Tofu
  tofu:      { name: '老豆腐',   unit: 'g', perUnit: 100, protein: 6.6,  icon: '🫘' },
  tofuDry:   { name: '豆腐干',   unit: 'g', perUnit: 100, protein: 14.9, icon: '🫘' },
  qianzhang: { name: '千张',     unit: 'g', perUnit: 100, protein: 24.5, icon: '🫘' },
  fuzhu:     { name: '腐竹（干）', unit: 'g', perUnit: 100, protein: 44.6, icon: '🫘' },
  tofuSkin:  { name: '豆腐皮',   unit: 'g', perUnit: 100, protein: 51.6, icon: '🫘' },
  tofuStrand:{ name: '豆腐丝',   unit: 'g', perUnit: 100, protein: 21.5, icon: '🫘' },

  // Staple
  rice:      { name: '米饭',     unit: 'g', perUnit: 100, protein: 2.6, icon: '🍚' },

  // Snacks
  walnut:   { name: '核桃仁',      unit: 'g', perUnit: 20,  protein: 3.0,  icon: '🥜' },
  peanut:   { name: '花生仁（煮）', unit: 'g', perUnit: 30,  protein: 5.1,  icon: '🥜' },
};

// Get user settings
function getSettings() {
  return JSON.parse(localStorage.getItem('userSettings') || '{"weight":73,"mode":"treatment"}');
}

// Calculate daily protein target
function dailyTarget(settings) {
  var w = settings.weight;
  if (settings.mode === 'treatment') {
    return { lo: Math.round(w * 1.5), hi: Math.round(w * 2.0), mid: Math.round(w * 1.7) };
  } else {
    return { lo: Math.round(w * 0.8), hi: Math.round(w * 1.2), mid: Math.round(w * 1.0) };
  }
}

// Round to practical serving size
function roundServing(grams, unitSize) {
  return Math.round(grams / unitSize) * unitSize;
}

// Scale a food amount proportionally
function scaleAmount(baseGrams, baseWeight, targetWeight, targetFactor, baseFactor) {
  var ratio = (targetWeight * targetFactor) / (baseWeight * baseFactor);
  return Math.round(baseGrams * ratio / 5) * 5; // round to nearest 5g
}
