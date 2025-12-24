/**
 * 考试引擎核心 Hook
 * 管理题目状态、答题记录、错题本、模式切换等核心业务逻辑
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Question, AnswerRecord, WrongQuestion, ExamMode } from '../types';
import { rawQuestions } from '../data/raw_questions';
import { getMnemonic } from '../utils/ai_mnemonics';
import { useShuffleWithSeed, shuffleArray } from './useShuffle';
import { saveProgress, loadProgress } from '../utils/storage';
import { generateExamQuestions } from '../utils/examGenerator';

/** 考试引擎配置 */
interface ExamEngineConfig {
  /** 初始模式 */
  initialMode?: ExamMode;
  /** 初始题号（从0开始） */
  initialIndex?: number;
  /** 是否自动保存进度 */
  autoSave?: boolean;
}

/** 进度统计 */
interface ProgressStats {
  /** 总题数 */
  total: number;
  /** 已完成题数 */
  completed: number;
  /** 答对题数 */
  correct: number;
  /** 答错题数 */
  wrong: number;
  /** 错题总数（去重） */
  uniqueWrong: number;
  /** 正确率（百分比） */
  accuracy: number;
  /** 完成进度（百分比） */
  progress: number;
}

/** 当前题目信息（包含乱序选项） */
interface CurrentQuestionInfo extends Question {
  /** 原始题目索引 */
  index: number;
  /** 是否已完成 */
  isCompleted: boolean;
  /** 是否为错题 */
  isWrong: boolean;
  /** 错误次数 */
  mistakeCount: number;
  /** 用户答案（如果已答） */
  userAnswer?: string;
  /** 是否答对 */
  isCorrect?: boolean;
}

/**
 * 考试引擎 Hook
 * @param config 配置选项
 */
export function useExamEngine(config: ExamEngineConfig = {}) {
  const {
    initialMode = 'study',
    initialIndex = 0,
    autoSave = true,
  } = config;

  // ==================== 错误边界检查 ====================
  if (!rawQuestions || rawQuestions.length === 0) {
    throw new Error('❌ 题库数据为空，请检查 raw_questions.ts');
  }

  // ==================== State 管理 ====================
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mode, setMode] = useState<ExamMode>(initialMode);
  const [userProgress, setUserProgress] = useState(() => loadProgress());
  
  // 题目列表（背题模式使用固定顺序，考试模式使用智能生成，其他模式乱序）
  // 所有模式都要过滤掉已斩杀的题目
  const [shuffledQuestions] = useState(() => {
    // 先过滤掉已斩杀的题目
    const activeQuestions = rawQuestions.filter(q => !userProgress.killedQuestions.has(q.id));
    
    if (initialMode === 'study') {
      return activeQuestions; // 背题模式：固定顺序
    } else if (initialMode === 'review') {
      // 错题回顾模式：只显示错题，并按错误次数降序排序
      const wrongQuestionIds = Array.from(userProgress.wrongQuestions.keys());
      const wrongQuestions = activeQuestions.filter(q => wrongQuestionIds.includes(q.id));
      
      // 按错误次数降序排序（错的越多越靠前）
      return wrongQuestions.sort((a, b) => {
        const aCount = userProgress.wrongQuestions.get(a.id)?.mistakeCount || 0;
        const bCount = userProgress.wrongQuestions.get(b.id)?.mistakeCount || 0;
        return bCount - aCount;
      });
    } else if (initialMode === 'exam') {
      // 考试模式：智能生成（错题优先）
      const examQuestions = generateExamQuestions(userProgress.wrongQuestions);
      // 过滤掉已斩杀的
      return examQuestions.filter(q => !userProgress.killedQuestions.has(q.id));
    }
    return shuffleArray(activeQuestions); // 其他模式：乱序
  });
  
  // 根据模式决定是否显示历史答题记录
  const shouldShowHistory = mode === 'study' || mode === 'review';
  
  // 临时答题记录（仅用于刷题/考试模式的当前会话，不持久化）
  const [tempAnswers, setTempAnswers] = useState<Map<string, { userAnswer: string; isCorrect: boolean }>>(new Map());
  
  // 考试模式专用状态
  const [examStartTime] = useState(() => mode === 'exam' ? Date.now() : 0);
  const [examSubmitted, setExamSubmitted] = useState(false);

  // ==================== 自动保存进度 ====================
  useEffect(() => {
    if (autoSave) {
      saveProgress(userProgress);
    }
  }, [userProgress, autoSave]);

  // ==================== 当前题目处理 ====================
  const currentQuestion = useMemo(() => {
    if (currentIndex < 0 || currentIndex >= shuffledQuestions.length) {
      return null;
    }

    const question = shuffledQuestions[currentIndex];
    
    // 获取助记口诀
    const mnemonic = getMnemonic(question);

    return {
      ...question,
      mnemonic: mnemonic || undefined,
    };
  }, [currentIndex, shuffledQuestions]);

  // ==================== 选项乱序（仅在 practice/exam 模式下） ====================
  const shouldShuffle = mode === 'practice' || mode === 'exam';
  const shuffledOptions = useShuffleWithSeed(
    currentQuestion?.options || [],
    shouldShuffle ? `${currentQuestion?.id || ''}_${mode}` : 'no-shuffle'
  );

  // ==================== 选项映射表（乱序后的key -> 原始key） ====================
  const optionKeyMap = useMemo(() => {
    if (!currentQuestion || !shouldShuffle) {
      return null;
    }

    const map = new Map<string, string>();
    shuffledOptions.forEach((option, index) => {
      // 乱序后使用数字索引作为临时key
      const shuffledKey = String.fromCharCode(65 + index); // 0->A, 1->B, ...
      map.set(shuffledKey, option.key);
    });
    return map;
  }, [currentQuestion, shuffledOptions, shouldShuffle]);

  // ==================== 当前题目完整信息 ====================
  const currentQuestionInfo: CurrentQuestionInfo | null = useMemo(() => {
    if (!currentQuestion) return null;

    const qid = currentQuestion.id;
    const wrongInfo = userProgress.wrongQuestions.get(qid);
    const isCompleted = userProgress.completedQuestions.has(qid);
    
    // 查找答题记录
    let lastRecord = undefined;
    let userAnswer = undefined;
    let isCorrect = undefined;
    
    if (shouldShowHistory) {
      // 背题/错题模式：使用持久化记录
      lastRecord = userProgress.answerRecords
        .filter(r => r.questionId === qid)
        .sort((a, b) => b.timestamp - a.timestamp)[0];
      userAnswer = lastRecord?.userAnswer;
      isCorrect = lastRecord?.isCorrect;
    } else {
      // 刷题/考试模式：使用临时记录（仅当前会话）
      const tempRecord = tempAnswers.get(qid);
      userAnswer = tempRecord?.userAnswer;
      isCorrect = tempRecord?.isCorrect;
    }

    return {
      ...currentQuestion,
      options: shouldShuffle ? shuffledOptions : currentQuestion.options,
      index: currentIndex,
      isCompleted: shouldShowHistory ? isCompleted : false,
      isWrong: shouldShowHistory ? !!wrongInfo : false,
      mistakeCount: shouldShowHistory ? (wrongInfo?.mistakeCount || 0) : 0,
      userAnswer,
      isCorrect,
    };
  }, [currentQuestion, currentIndex, userProgress, shouldShuffle, shuffledOptions, shouldShowHistory, tempAnswers]);

  // ==================== 进度统计 ====================
  const progressStats: ProgressStats = useMemo(() => {
    const total = rawQuestions.length;
    const completed = userProgress.completedQuestions.size;
    const correctRecords = userProgress.answerRecords.filter(r => r.isCorrect);
    const wrongRecords = userProgress.answerRecords.filter(r => !r.isCorrect);
    const uniqueWrong = userProgress.wrongQuestions.size;

    const correct = correctRecords.length;
    const wrong = wrongRecords.length;
    const accuracy = completed > 0 ? (correct / (correct + wrong)) * 100 : 0;
    const progress = (completed / total) * 100;

    return {
      total,
      completed,
      correct,
      wrong,
      uniqueWrong,
      accuracy: Number(accuracy.toFixed(1)),
      progress: Number(progress.toFixed(1)),
    };
  }, [userProgress]);

  // ==================== Actions ====================

  /**
   * 提交答案
   * @param userAnswer 用户选择的答案（可能是乱序后的key）
   */
  const submitAnswer = useCallback((userAnswer: string) => {
    if (!currentQuestion) {
      console.warn('⚠️ 当前没有题目，无法提交答案');
      return;
    }

    const qid = currentQuestion.id;
    
    // 如果选项已乱序，需要映射回原始key
    let actualAnswer = userAnswer;
    if (shouldShuffle && optionKeyMap) {
      actualAnswer = optionKeyMap.get(userAnswer) || userAnswer;
    }

    // 判断答案是否正确
    const isCorrect = actualAnswer === currentQuestion.answer;

    // 所有模式都要处理错题记录，但只有背题/错题模式保存完整的答题记录
    if (shouldShowHistory) {
      // 背题模式和错题回顾模式：保存完整记录
      // 创建答题记录
      const record: AnswerRecord = {
        questionId: qid,
        userAnswer: actualAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect,
        timestamp: Date.now(),
        mode,
      };

      setUserProgress(prev => {
        const newProgress = { ...prev };

        // 添加答题记录
        newProgress.answerRecords = [...prev.answerRecords, record];

        // 标记为已完成
        newProgress.completedQuestions = new Set(prev.completedQuestions);
        newProgress.completedQuestions.add(qid);

        // 处理错题本
        newProgress.wrongQuestions = new Map(prev.wrongQuestions);
        
        // 处理连续答对次数（用于自动斩杀）
        newProgress.consecutiveCorrect = new Map(prev.consecutiveCorrect);
        newProgress.killedQuestions = new Set(prev.killedQuestions);
        
        if (!isCorrect) {
          // 答错：增加错误次数，清零连续答对，保存错误答案
          const existing = prev.wrongQuestions.get(qid);
          const wrongQuestion: WrongQuestion = {
            questionId: qid,
            mistakeCount: (existing?.mistakeCount || 0) + 1,
            lastMistakeTime: Date.now(),
            reviewCount: existing?.reviewCount || 0,
            lastWrongAnswer: actualAnswer,  // 保存错误答案
          };
          newProgress.wrongQuestions.set(qid, wrongQuestion);
          newProgress.consecutiveCorrect.set(qid, 0); // 清零连续答对
        } else {
          // 答对：增加连续答对次数
          const currentStreak = prev.consecutiveCorrect.get(qid) || 0;
          const newStreak = currentStreak + 1;
          newProgress.consecutiveCorrect.set(qid, newStreak);
          
          // 连续3次答对：自动斩杀
          if (newStreak >= 3) {
            newProgress.killedQuestions.add(qid);
            console.log(`⚔️ 自动斩杀: ${qid} (连续3次答对)`);
          }
          
          // 如果曾经错过，增加复习次数
          if (prev.wrongQuestions.has(qid)) {
            const existing = prev.wrongQuestions.get(qid)!;
            newProgress.wrongQuestions.set(qid, {
              ...existing,
              reviewCount: existing.reviewCount + 1,
            });
          }
        }

        // 更新最后活跃时间
        newProgress.lastActiveTime = Date.now();

        return newProgress;
      });

      console.log(`${isCorrect ? '✅' : '❌'} ${qid}: 用户答案 ${actualAnswer}, 正确答案 ${currentQuestion.answer}`);
    } else {
      // 刷题模式和考试模式：不保存完整答题记录，但需要记录错题
      console.log(`${isCorrect ? '✅' : '❌'} ${qid}: 用户答案 ${actualAnswer}, 正确答案 ${currentQuestion.answer} (不保存完整记录)`);
      
      // 保存到临时记录（仅用于当前会话显示答案）
      setTempAnswers(prev => {
        const newMap = new Map(prev);
        newMap.set(qid, { userAnswer: actualAnswer, isCorrect });
        return newMap;
      });
      
      // 关键修改：如果答错，也要记录到错题本（包括错误答案）
      if (!isCorrect) {
        setUserProgress(prev => {
          const newProgress = { ...prev };
          newProgress.wrongQuestions = new Map(prev.wrongQuestions);
          
          const existing = prev.wrongQuestions.get(qid);
          const wrongQuestion: WrongQuestion = {
            questionId: qid,
            mistakeCount: (existing?.mistakeCount || 0) + 1,
            lastMistakeTime: Date.now(),
            reviewCount: existing?.reviewCount || 0,
            lastWrongAnswer: actualAnswer,  // 保存错误答案
          };
          newProgress.wrongQuestions.set(qid, wrongQuestion);
          newProgress.lastActiveTime = Date.now();
          
          return newProgress;
        });
      }
    }
  }, [currentQuestion, shouldShuffle, optionKeyMap, mode, shouldShowHistory]);

  /**
   * 下一题
   */
  const next = useCallback(() => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      console.log('ℹ️ 已经是最后一题');
    }
  }, [currentIndex, shuffledQuestions.length]);

  /**
   * 上一题
   */
  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      console.log('ℹ️ 已经是第一题');
    }
  }, [currentIndex]);

  /**
   * 跳转到指定题号
   * @param index 题号（从0开始）
   */
  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < shuffledQuestions.length) {
      setCurrentIndex(index);
    } else {
      console.warn(`⚠️ 题号 ${index} 超出范围 [0, ${shuffledQuestions.length - 1}]`);
    }
  }, [shuffledQuestions.length]);

  /**
   * 切换模式
   * @param newMode 新模式
   */
  const changeMode = useCallback((newMode: ExamMode) => {
    setMode(newMode);
    setUserProgress(prev => ({
      ...prev,
      currentMode: newMode,
      lastActiveTime: Date.now(),
    }));
    console.log(`🔄 切换模式: ${newMode}`);
  }, []);

  /**
   * 重置当前题目进度（允许重新答题）
   */
  const resetCurrentQuestion = useCallback(() => {
    if (!currentQuestion) return;

    setUserProgress(prev => {
      const newProgress = { ...prev };
      const qid = currentQuestion.id;

      // 移除完成标记
      newProgress.completedQuestions = new Set(prev.completedQuestions);
      newProgress.completedQuestions.delete(qid);

      // 过滤掉该题的答题记录
      newProgress.answerRecords = prev.answerRecords.filter(
        r => r.questionId !== qid
      );

      return newProgress;
    });

    console.log(`🔄 重置题目: ${currentQuestion.id}`);
  }, [currentQuestion]);

  /**
   * 清除所有进度
   */
  const resetAllProgress = useCallback(() => {
    const confirmed = window.confirm('⚠️ 确定要清除所有学习进度吗？此操作不可恢复！');
    if (confirmed) {
      setUserProgress({
        answerRecords: [],
        wrongQuestions: new Map(),
        completedQuestions: new Set(),
        killedQuestions: new Set(),
        consecutiveCorrect: new Map(),
        currentMode: mode,
        lastActiveTime: Date.now(),
        examHistory: [],
      });
      setCurrentIndex(0);
      console.log('✅ 已清除所有进度');
    }
  }, [mode]);

  /**
   * 获取错题列表
   */
  const getWrongQuestions = useCallback(() => {
    return Array.from(userProgress.wrongQuestions.entries()).map(([qid, info]) => {
      const question = shuffledQuestions.find(q => q.id === qid);
      return question ? { ...question, ...info } : null;
    }).filter(Boolean) as (Question & WrongQuestion)[];
  }, [userProgress.wrongQuestions, shuffledQuestions]);

  /**
   * 获取所有题目的完成状态（用于题目网格）
   */
  const getAllQuestionsStatus = useCallback(() => {
    return shuffledQuestions.map((q, index) => ({
      index,
      id: q.id,
      isCompleted: userProgress.completedQuestions.has(q.id),
      isWrong: userProgress.wrongQuestions.has(q.id),
    }));
  }, [shuffledQuestions, userProgress.completedQuestions, userProgress.wrongQuestions]);

  /**
   * 手动斩杀当前题目
   */
  const killCurrentQuestion = useCallback(() => {
    if (!currentQuestion) {
      console.warn('⚠️ 当前没有题目，无法斩杀');
      return;
    }

    const qid = currentQuestion.id;
    setUserProgress(prev => ({
      ...prev,
      killedQuestions: new Set([...prev.killedQuestions, qid]),
      lastActiveTime: Date.now(),
    }));

    console.log(`⚔️ 手动斩杀: ${qid}`);
    
    // 斩杀后自动跳到下一题
    if (currentIndex < shuffledQuestions.length - 1) {
      next();
    }
  }, [currentQuestion, currentIndex, shuffledQuestions.length, next]);

  /**
   * 复原单个题目
   * @param questionId 题目 ID
   */
  const restoreQuestion = useCallback((questionId: string) => {
    setUserProgress(prev => {
      const newKilled = new Set(prev.killedQuestions);
      newKilled.delete(questionId);
      return {
        ...prev,
        killedQuestions: newKilled,
        lastActiveTime: Date.now(),
      };
    });

    console.log(`♻️ 复原题目: ${questionId}`);
  }, []);

  /**
   * 批量复原所有已斩杀题目
   */
  const restoreAllQuestions = useCallback(() => {
    const count = userProgress.killedQuestions.size;
    if (count === 0) {
      console.log('ℹ️ 没有已斩杀的题目');
      return;
    }

    const confirmed = window.confirm(`确定要复原所有 ${count} 道已斩杀的题目吗？`);
    if (confirmed) {
      setUserProgress(prev => ({
        ...prev,
        killedQuestions: new Set(),
        lastActiveTime: Date.now(),
      }));
      console.log(`✅ 已复原 ${count} 道题目`);
    }
  }, [userProgress.killedQuestions.size]);

  /**
   * 标记当前题目为已完成（不需要答题）
   * 用于背题模式记录学习进度
   */
  const markAsCompleted = useCallback(() => {
    if (!currentQuestion) return;

    const qid = currentQuestion.id;
    setUserProgress(prev => {
      const newProgress = { ...prev };
      newProgress.completedQuestions = new Set(prev.completedQuestions);
      newProgress.completedQuestions.add(qid);
      newProgress.lastActiveTime = Date.now();
      return newProgress;
    });
    console.log(`✅ 已标记为完成: ${qid}`);
  }, [currentQuestion]);

  /**
   * 提交考试（仅考试模式）
   */
  const submitExam = useCallback(() => {
    if (mode !== 'exam') {
      console.warn('⚠️ 只有考试模式才能提交');
      return null;
    }

    // 计算成绩
    let correctCount = 0;
    const userAnswersMap = new Map<string, string>();
    
    shuffledQuestions.forEach(q => {
      const tempRecord = tempAnswers.get(q.id);
      if (tempRecord) {
        userAnswersMap.set(q.id, tempRecord.userAnswer);
        if (tempRecord.isCorrect) {
          correctCount++;
        }
      }
    });

    const totalCount = shuffledQuestions.length;
    const accuracy = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
    const duration = Math.floor((Date.now() - examStartTime) / 1000);

    // 创建考试结果
    const examResult: import('../types').ExamResult = {
      id: `exam_${Date.now()}`,
      paperId: `paper_${examStartTime}`,
      startTime: examStartTime,
      submittedAt: Date.now(),
      duration,
      questions: shuffledQuestions,
      userAnswers: userAnswersMap,
      correctCount,
      totalCount,
      accuracy: Number(accuracy.toFixed(1)),
    };

    // 保存到历史记录
    setUserProgress(prev => ({
      ...prev,
      examHistory: [...prev.examHistory, examResult],
      lastActiveTime: Date.now(),
    }));

    // 将错题记录到错题本
    shuffledQuestions.forEach(q => {
      const tempRecord = tempAnswers.get(q.id);
      if (tempRecord && !tempRecord.isCorrect) {
        setUserProgress(prev => {
          const newProgress = { ...prev };
          newProgress.wrongQuestions = new Map(prev.wrongQuestions);
          
          const existing = prev.wrongQuestions.get(q.id);
          const wrongQuestion: WrongQuestion = {
            questionId: q.id,
            mistakeCount: (existing?.mistakeCount || 0) + 1,
            lastMistakeTime: Date.now(),
            reviewCount: existing?.reviewCount || 0,
            lastWrongAnswer: tempRecord.userAnswer,
          };
          newProgress.wrongQuestions.set(q.id, wrongQuestion);
          
          return newProgress;
        });
      }
    });

    setExamSubmitted(true);
    console.log(`✅ 考试已提交: 正确率 ${correctCount}/${totalCount}`);
    return examResult;
  }, [mode, shuffledQuestions, tempAnswers, examStartTime]);

  // ====================返回值 ====================
  return {
    // State
    currentIndex,
    mode,
    currentQuestion: currentQuestionInfo,
    progressStats,
    userProgress,
    examSubmitted,
    examStartTime,
  
    // Actions
    submitAnswer,
    next,
    prev,
    goToQuestion,
    changeMode,
    resetCurrentQuestion,
    resetAllProgress,
    getWrongQuestions,
    getAllQuestionsStatus,
    killCurrentQuestion,
    restoreQuestion,
    restoreAllQuestions,
    markAsCompleted,
    submitExam,
  
    // Computed
    hasNext: currentIndex < shuffledQuestions.length - 1,
    hasPrev: currentIndex > 0,
    isFirstQuestion: currentIndex === 0,
    isLastQuestion: currentIndex === shuffledQuestions.length - 1,
    totalQuestions: shuffledQuestions.length,
    // 考试模式专用：全部题目列表（用于提交后展示）
    allQuestions: mode === 'exam' ? shuffledQuestions : [],
    // 考试模式专用：临时答案
    tempAnswers: mode === 'exam' ? tempAnswers : new Map(),
  };
}
