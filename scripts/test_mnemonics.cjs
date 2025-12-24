/**
 * 测试助记规则匹配覆盖率
 */
const fs = require('fs');

// 读取题目数据
const questions = JSON.parse(fs.readFileSync('src/data/converted.json', 'utf8'));

// 读取助记规则（从TypeScript文件中提取）
const mnemonicFileContent = fs.readFileSync('src/utils/ai_mnemonics.ts', 'utf8');

// 提取规则数组（简单正则匹配）
const rulesMatch = mnemonicFileContent.match(/const MNEMONIC_RULES: MnemonicRule\[\] = \[([\s\S]*?)\];/);
if (!rulesMatch) {
  console.error('❌ 无法提取助记规则');
  process.exit(1);
}

// 解析规则（简化版，只提取keywords）
const rules = [];
const ruleMatches = rulesMatch[1].matchAll(/keywords:\s*\[(.*?)\]/g);
for (const match of ruleMatches) {
  const keywordsStr = match[1];
  const keywords = keywordsStr.match(/'([^']+)'/g).map(k => k.replace(/'/g, ''));
  rules.push({ keywords });
}

console.log(`📊 助记规则统计：共 ${rules.length} 条规则\n`);

// 匹配关键词函数
function matchKeywords(text, keywords) {
  const normalizedText = text.toLowerCase().replace(/\s+/g, '');
  return keywords.some(keyword => {
    const normalizedKeyword = keyword.toLowerCase().replace(/\s+/g, '');
    return normalizedText.includes(normalizedKeyword);
  });
}

// 统计匹配情况
let matchedCount = 0;
const matchedQuestions = [];
const unmatchedQuestions = [];

questions.forEach(q => {
  const fullText = [q.stem, ...q.options.map(o => o.text), q.explain].join(' ');
  const matched = rules.some(rule => matchKeywords(fullText, rule.keywords));
  
  if (matched) {
    matchedCount++;
    matchedQuestions.push(q.id);
  } else {
    unmatchedQuestions.push({ id: q.id, stem: q.stem.slice(0, 50) });
  }
});

const coverage = ((matchedCount / questions.length) * 100).toFixed(1);

console.log('📈 匹配覆盖率统计：');
console.log(`  总题数：${questions.length} 题`);
console.log(`  已匹配：${matchedCount} 题`);
console.log(`  未匹配：${questions.length - matchedCount} 题`);
console.log(`  覆盖率：${coverage}%\n`);

// 显示部分未匹配题目（用于进一步优化）
if (unmatchedQuestions.length > 0) {
  console.log('🔍 部分未匹配题目示例（前10题）：');
  unmatchedQuestions.slice(0, 10).forEach(q => {
    console.log(`  ${q.id}: ${q.stem}...`);
  });
}

console.log('\n✅ 助记规则优化完成！');
