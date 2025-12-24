/**
 * LocalStorage 持久化工具
 * 用于保存和加载用户的学习进度
 */

import type { UserProgress } from '../types';

/** LocalStorage 存储键名 */
const STORAGE_KEY = 'rank1_exam_progress';

/**
 * 保存用户进度到 LocalStorage
 * @param progress 用户进度数据
 */
export function saveProgress(progress: UserProgress): void {
  try {
    // 将 Map 和 Set 转换为可序列化的格式
    const serializedProgress = {
      answerRecords: progress.answerRecords,
      wrongQuestions: Array.from(progress.wrongQuestions.entries()),
      completedQuestions: Array.from(progress.completedQuestions),
      killedQuestions: Array.from(progress.killedQuestions),
      consecutiveCorrect: Array.from(progress.consecutiveCorrect.entries()),
      currentMode: progress.currentMode,
      lastActiveTime: progress.lastActiveTime,
      examHistory: progress.examHistory.map(exam => ({
        ...exam,
        userAnswers: Array.from(exam.userAnswers.entries()),
      })),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedProgress));
  } catch (error) {
    console.error('❌ 保存进度失败:', error);
  }
}

/**
 * 从 LocalStorage 加载用户进度
 * @returns 用户进度数据，如果不存在则返回初始数据
 */
export function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
      return getInitialProgress();
    }

    const parsed = JSON.parse(stored);

    // 将序列化的数据还原为 Map 和 Set
    return {
      answerRecords: parsed.answerRecords || [],
      wrongQuestions: new Map(parsed.wrongQuestions || []),
      completedQuestions: new Set(parsed.completedQuestions || []),
      killedQuestions: new Set(parsed.killedQuestions || []),
      consecutiveCorrect: new Map(parsed.consecutiveCorrect || []),
      currentMode: parsed.currentMode || 'study',
      lastActiveTime: parsed.lastActiveTime || Date.now(),
      examHistory: (parsed.examHistory || []).map((exam: any) => ({
        ...exam,
        userAnswers: new Map(exam.userAnswers || []),
      })),
    };
  } catch (error) {
    console.error('❌ 加载进度失败:', error);
    return getInitialProgress();
  }
}

/**
 * 清除所有进度数据
 */
export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ 进度已清除');
  } catch (error) {
    console.error('❌ 清除进度失败:', error);
  }
}

/**
 * 获取初始空进度数据
 */
function getInitialProgress(): UserProgress {
  return {
    answerRecords: [],
    wrongQuestions: new Map(),
    completedQuestions: new Set(),
    killedQuestions: new Set(),
    consecutiveCorrect: new Map(),
    currentMode: 'study',
    lastActiveTime: Date.now(),
    examHistory: [],
  };
}

/**
 * 导出进度数据为 JSON 文件（用于备份）
 */
export function exportProgress(): string {
  const progress = loadProgress();
  return JSON.stringify({
    answerRecords: progress.answerRecords,
    wrongQuestions: Array.from(progress.wrongQuestions.entries()),
    completedQuestions: Array.from(progress.completedQuestions),
    killedQuestions: Array.from(progress.killedQuestions),
    consecutiveCorrect: Array.from(progress.consecutiveCorrect.entries()),
    currentMode: progress.currentMode,
    lastActiveTime: progress.lastActiveTime,
    exportTime: new Date().toISOString(),
  }, null, 2);
}

/**
 * 导入进度数据（从备份文件恢复）
 * @param jsonString JSON 格式的进度数据
 */
export function importProgress(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    
    const progress: UserProgress = {
      answerRecords: data.answerRecords || [],
      wrongQuestions: new Map(data.wrongQuestions || []),
      completedQuestions: new Set(data.completedQuestions || []),
      killedQuestions: new Set(data.killedQuestions || []),
      consecutiveCorrect: new Map(data.consecutiveCorrect || []),
      currentMode: data.currentMode || 'study',
      lastActiveTime: data.lastActiveTime || Date.now(),
      examHistory: (data.examHistory || []).map((exam: any) => ({
        ...exam,
        userAnswers: new Map(exam.userAnswers || []),
      })),
    };

    saveProgress(progress);
    console.log('✅ 进度导入成功');
    return true;
  } catch (error) {
    console.error('❌ 进度导入失败:', error);
    return false;
  }
}
