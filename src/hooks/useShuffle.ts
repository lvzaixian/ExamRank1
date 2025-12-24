/**
 * 数组乱序工具 Hook
 * 使用 Fisher-Yates 洗牌算法实现数组随机打乱
 */

import { useMemo } from 'react';

/**
 * Fisher-Yates 洗牌算法
 * 时间复杂度 O(n)，空间复杂度 O(n)
 * @param array 原始数组
 * @returns 打乱后的新数组（不修改原数组）
 */
export function shuffleArray<T>(array: T[]): T[] {
  // 创建副本，避免修改原数组
  const shuffled = [...array];
  
  // Fisher-Yates 算法：从后向前遍历
  for (let i = shuffled.length - 1; i > 0; i--) {
    // 生成 0 到 i 之间的随机索引
    const randomIndex = Math.floor(Math.random() * (i + 1));
    
    // 交换元素
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * 数组乱序 Hook
 * 返回打乱后的数组，依赖项变化时重新打乱
 * 
 * @param array 原始数组
 * @param dependencies 依赖项数组，当依赖变化时重新打乱
 * @returns 打乱后的数组
 * 
 * @example
 * ```tsx
 * const options = [{key: 'A', text: '选项A'}, {key: 'B', text: '选项B'}];
 * const shuffledOptions = useShuffle(options, [questionId]);
 * ```
 */
export function useShuffle<T>(
  array: T[],
  dependencies: React.DependencyList = []
): T[] {
  return useMemo(() => {
    if (!array || array.length === 0) {
      return [];
    }
    return shuffleArray(array);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array.length, ...dependencies]);
}

/**
 * 带种子的确定性随机数生成器（用于题目级别的固定乱序）
 * 同一个种子总是产生相同的随机序列
 * @param seed 种子值（通常使用题目ID）
 */
function seededRandom(seed: string): () => number {
  // 使用简单的哈希函数将字符串转为数字
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转为32位整数
  }
  
  // 线性同余生成器
  let current = Math.abs(hash);
  return function() {
    current = (current * 1103515245 + 12345) & 0x7fffffff;
    return current / 0x7fffffff;
  };
}

/**
 * 确定性乱序（同一题目ID总是相同的乱序结果）
 * 适用于需要保持选项乱序一致性的场景
 * @param array 原始数组
 * @param seed 种子值（通常使用题目ID）
 * @returns 打乱后的数组
 */
export function shuffleArrayWithSeed<T>(array: T[], seed: string): T[] {
  const shuffled = [...array];
  const random = seededRandom(seed);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * 带种子的乱序 Hook（确定性乱序）
 * 同一个种子总是产生相同的乱序结果，适合题目选项打乱
 * 
 * @param array 原始数组
 * @param seed 种子值（通常使用题目ID）
 * @returns 打乱后的数组
 * 
 * @example
 * ```tsx
 * // 同一题目的选项总是以相同的顺序乱序
 * const shuffledOptions = useShuffleWithSeed(question.options, question.id);
 * ```
 */
export function useShuffleWithSeed<T>(
  array: T[],
  seed: string
): T[] {
  return useMemo(() => {
    if (!array || array.length === 0) {
      return [];
    }
    return shuffleArrayWithSeed(array, seed);
  }, [array, seed]);
}
