/**
 * 数据层统一导出
 * 
 * 这个文件负责：
 * 1. 整合原始题目数据和 AI 助记口诀
 * 2. 提供统一的题库访问接口
 * 3. 导出增强后的题目列表
 */

import { rawQuestions, getQuestionBankStats } from './raw_questions';
import { enrichQuestionsWithMnemonics, getMnemonicStats } from '../utils/ai_mnemonics';
import type { Question } from '../types';

/**
 * 完整题库（已添加助记口诀）
 * 
 * 这是应用中使用的主要数据源
 * 所有题目都已经过 AI 助记口诀增强处理
 */
export const questionBank: Question[] = enrichQuestionsWithMnemonics(rawQuestions);

/**
 * 获取题库完整统计信息
 */
export function getFullStats() {
  const bankStats = getQuestionBankStats();
  const mnemonicStats = getMnemonicStats(rawQuestions);

  return {
    questionBank: bankStats,
    mnemonics: mnemonicStats,
    summary: {
      total: bankStats.total,
      isComplete: bankStats.isComplete,
      mnemonicCoverage: mnemonicStats.coverage,
    },
  };
}

/**
 * 打印题库统计信息（用于开发调试）
 */
export function logQuestionBankStats() {
  const stats = getFullStats();
  
  console.group('📚 ExamRank1 题库统计');
  console.log('总题数:', stats.questionBank.total);
  console.log('单选题:', stats.questionBank.single);
  console.log('多选题:', stats.questionBank.multi);
  console.log('判断题:', stats.questionBank.boolean);
  console.log('数据完整:', stats.questionBank.isComplete ? '✅ 是' : '⚠️ 否（待补充）');
  console.log('---');
  console.log('助记覆盖率:', stats.mnemonics.coverage);
  console.log('有助记:', stats.mnemonics.withMnemonic, '题');
  console.log('无助记:', stats.mnemonics.withoutMnemonic, '题');
  console.groupEnd();

  return stats;
}

// 重新导出工具函数
export {
  getQuestionById,
  getQuestionsByType,
  getRandomQuestions,
  getExamQuestions,
} from './raw_questions';

export { getMnemonic } from '../utils/ai_mnemonics';
