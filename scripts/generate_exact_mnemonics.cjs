/**
 * 生成精确匹配的助记口诀
 * 读取raw_questions.ts，为每道题生成对应的助记口诀
 */

const fs = require('fs');
const path = require('path');

// 读取题库文件
const questionsFilePath = path.join(__dirname, '../src/data/raw_questions.ts');
const content = fs.readFileSync(questionsFilePath, 'utf8');

// 提取题目数组部分
const match = content.match(/export const rawQuestions: Question\[\] = \[([\s\S]*)\];/);
if (!match) {
  console.error('无法解析题库文件');
  process.exit(1);
}

// 解析题目（使用eval，仅用于开发环境）
let questions;
try {
  questions = eval('[' + match[1] + ']');
  console.log(`✓ 成功读取 ${questions.length} 道题目`);
} catch (error) {
  console.error('解析题目失败:', error.message);
  process.exit(1);
}

// 生成助记口诀
const mnemonics = {};

questions.forEach((q, index) => {
  const { id, stem, type, answer, explain } = q;
  
  // 提取题目关键信息
  const shortStem = stem.length > 40 ? stem.substring(0, 40) + '...' : stem;
  
  // 基于题目内容生成助记口诀
  let mnemonic = '';
  
  // 这里只是示例，实际需要根据每道题的具体内容定制
  mnemonic = `📝 ${shortStem} → 答案:${answer}`;
  
  mnemonics[id] = mnemonic;
  
  // 每50题输出进度
  if ((index + 1) % 50 === 0) {
    console.log(`  已处理 ${index + 1}/${questions.length} 题`);
  }
});

// 输出结果到文件
const outputPath = path.join(__dirname, 'mnemonics_mapping.json');
fs.writeFileSync(outputPath, JSON.stringify({ questions, mnemonics }, null, 2), 'utf8');

console.log(`\n✓ 题目信息已导出到: ${outputPath}`);
console.log(`\n请检查题目列表，手动为每道题编写精确的助记口诀`);
