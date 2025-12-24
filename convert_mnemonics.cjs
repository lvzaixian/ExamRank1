// 从 mnemonic.ts 提取数据并生成 dedicated_mnemonics.ts

const fs = require('fs');
const path = require('path');

// 读取 mnemonic.ts
const mnemonicPath = path.join(__dirname, 'src/utils/mnemonic.ts');
const mnemonicContent = fs.readFileSync(mnemonicPath, 'utf-8');

// 解析 JSON 数组
const jsonMatch = mnemonicContent.match(/\[[\s\S]*\]/);
if (!jsonMatch) {
  console.error('无法解析 mnemonic.ts');
  process.exit(1);
}

const data = JSON.parse(jsonMatch[0]);
console.log(`找到 ${data.length} 道题目的助记内容`);

// 生成 TypeScript 代码
let output = `/**
 * 专属助记口诀数据库 - 新版AI助记
 * 更加生动形象的记忆口诀
 * 
 * 更新时间：2025年12月23日
 */

/**
 * 题目ID到助记口诀的映射表
 */
export const DEDICATED_MNEMONICS: Record<string, string> = {
`;

for (let i = 0; i < data.length; i++) {
  const item = data[i];
  const questionId = `q${String(item.id).padStart(3, '0')}`;
  const mnemonic = item.mnemonic.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  
  output += `  '${questionId}': '${mnemonic}',\n`;
}

output += `};

/**
 * 根据题目ID获取专属助记口诀
 * @param questionId 题目ID(如'q001')
 * @returns 助记口诀,如果没有则返回null
 */
export function getDedicatedMnemonic(questionId: string): string | null {
  return DEDICATED_MNEMONICS[questionId] || null;
}

/**
 * 获取所有题目的助记覆盖率统计
 * @param totalQuestions 题库总数
 * @returns 统计信息
 */
export function getMnemonicCoverageStats(totalQuestions: number) {
  const coveredCount = Object.keys(DEDICATED_MNEMONICS).length;
  const coverage = totalQuestions > 0 ? (coveredCount / totalQuestions * 100).toFixed(1) : '0.0';
  
  return {
    total: totalQuestions,
    covered: coveredCount,
    uncovered: totalQuestions - coveredCount,
    coverage: \`\${coverage}%\`,
  };
}
`;

// 写入文件
const outputPath = path.join(__dirname, 'src/utils/dedicated_mnemonics.ts');
fs.writeFileSync(outputPath, output, 'utf-8');

console.log(`✅ 成功生成 dedicated_mnemonics.ts`);
console.log(`📝 共计 ${data.length} 条助记口诀`);
