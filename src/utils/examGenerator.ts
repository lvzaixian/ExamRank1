/**
 * 模拟考试题目生成器
 * 
 * 功能：
 * - 从题库中智能选择题目生成模拟考试
 * - 错题优先：错题被选中概率更高
 * - 题型配比：12单选 + 10多选 + 15判断 = 37题
 */

import type { Question, WrongQuestion } from '../types';
import { rawQuestions } from '../data/raw_questions';

/**
 * 考试配置
 */
const EXAM_CONFIG = {
  single: 12,    // 单选题数量
  multi: 10,     // 多选题数量
  boolean: 15,   // 判断题数量
};

/**
 * 错题权重倍数
 * 错题被选中的概率是普通题目的这么多倍
 */
const WRONG_QUESTION_WEIGHT = 3;

/**
 * 加权随机选择算法
 * @param items 候选题目列表
 * @param weights 对应权重列表
 * @param count 需要选择的数量
 * @returns 选中的题目数组
 */
function weightedRandomSelect<T>(
  items: T[],
  weights: number[],
  count: number
): T[] {
  if (items.length === 0) return [];
  if (count >= items.length) return [...items];

  const selected: T[] = [];
  const remainingItems = [...items];
  const remainingWeights = [...weights];

  for (let i = 0; i < count; i++) {
    // 计算累积权重
    const totalWeight = remainingWeights.reduce((sum, w) => sum + w, 0);
    
    // 生成随机数
    let random = Math.random() * totalWeight;
    
    // 找到对应的题目
    let selectedIndex = 0;
    for (let j = 0; j < remainingWeights.length; j++) {
      random -= remainingWeights[j];
      if (random <= 0) {
        selectedIndex = j;
        break;
      }
    }

    // 添加到结果并从候选中移除
    selected.push(remainingItems[selectedIndex]);
    remainingItems.splice(selectedIndex, 1);
    remainingWeights.splice(selectedIndex, 1);
  }

  return selected;
}

/**
 * 生成模拟考试题目
 * @param wrongQuestions 错题本（Map<questionId, WrongQuestion>）
 * @returns 考试题目数组（已打乱顺序）
 */
export function generateExamQuestions(
  wrongQuestions: Map<string, WrongQuestion>
): Question[] {
  // 按题型分类
  const singleQuestions = rawQuestions.filter(q => q.type === 'single');
  const multiQuestions = rawQuestions.filter(q => q.type === 'multi');
  const booleanQuestions = rawQuestions.filter(q => q.type === 'boolean');

  // 为每种题型生成权重
  const createWeights = (questions: Question[]) => {
    return questions.map(q => {
      // 如果是错题，权重乘以倍数
      return wrongQuestions.has(q.id) ? WRONG_QUESTION_WEIGHT : 1;
    });
  };

  const singleWeights = createWeights(singleQuestions);
  const multiWeights = createWeights(multiQuestions);
  const booleanWeights = createWeights(booleanQuestions);

  // 按权重随机选择题目
  const selectedSingle = weightedRandomSelect(
    singleQuestions,
    singleWeights,
    EXAM_CONFIG.single
  );

  const selectedMulti = weightedRandomSelect(
    multiQuestions,
    multiWeights,
    EXAM_CONFIG.multi
  );

  const selectedBoolean = weightedRandomSelect(
    booleanQuestions,
    booleanWeights,
    EXAM_CONFIG.boolean
  );

  // 合并所有题目
  const allSelected = [
    ...selectedSingle,
    ...selectedMulti,
    ...selectedBoolean,
  ];

  // Fisher-Yates 洗牌算法打乱题目顺序
  const shuffled = [...allSelected];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * 获取考试配置信息
 */
export function getExamConfig() {
  return {
    ...EXAM_CONFIG,
    total: EXAM_CONFIG.single + EXAM_CONFIG.multi + EXAM_CONFIG.boolean,
  };
}
