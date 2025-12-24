const fs = require('fs');

// 读取转换后的JSON数据
const data = JSON.parse(fs.readFileSync('src/data/converted.json', 'utf8'));

// 生成TypeScript文件头部
const header = `/**
 * 原始题库数据
 * 
 * 数据来源：网络服务与安全.html 提取
 * 题目总数：${data.length} 题
 * 题型分布：
 *   - 单选题（single）：${data.filter(q=>q.type==='single').length} 题
 *   - 多选题（multi）：${data.filter(q=>q.type==='multi').length} 题
 *   - 判断题（boolean）：${data.filter(q=>q.type==='boolean').length} 题
 * 
 * 自动生成时间：${new Date().toLocaleString('zh-CN')}
 */

import type { Question } from '../types';

export const rawQuestions: Question[] = `;

// 生成TypeScript文件尾部
const footer = `;

// 重新导出工具函数保持兼容性
export function getQuestionBankStats() {
  const stats = {
    total: rawQuestions.length,
    single: rawQuestions.filter(q => q.type === 'single').length,
    multi: rawQuestions.filter(q => q.type === 'multi').length,
    boolean: rawQuestions.filter(q => q.type === 'boolean').length,
  };
  
  return {
    ...stats,
    isComplete: stats.total >= 244,
  };
}

export function getQuestionById(id: string): Question | undefined {
  return rawQuestions.find(q => q.id === id);
}

export function getQuestionsByType(type: Question['type']): Question[] {
  return rawQuestions.filter(q => q.type === type);
}

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...rawQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, rawQuestions.length));
}

export function getExamQuestions(config: {
  single: number;
  multi: number;
  boolean: number;
}): Question[] {
  const singleQuestions = getQuestionsByType('single')
    .sort(() => Math.random() - 0.5)
    .slice(0, config.single);

  const multiQuestions = getQuestionsByType('multi')
    .sort(() => Math.random() - 0.5)
    .slice(0, config.multi);

  const booleanQuestions = getQuestionsByType('boolean')
    .sort(() => Math.random() - 0.5)
    .slice(0, config.boolean);

  return [...singleQuestions, ...multiQuestions, ...booleanQuestions];
}
`;

// 写入文件
const content = header + JSON.stringify(data, null, 2) + footer;
fs.writeFileSync('src/data/raw_questions.ts', content);

console.log('✅ raw_questions.ts 已生成');
console.log(`📊 总题数: ${data.length}`);
console.log(`📝 单选: ${data.filter(q=>q.type==='single').length}`);
console.log(`📝 多选: ${data.filter(q=>q.type==='multi').length}`);
console.log(`📝 判断: ${data.filter(q=>q.type==='boolean').length}`);
