/**
 * ExamRank1 核心类型定义
 * 网络服务与安全期末复习系统
 */

// ==================== 题目相关类型 ====================

/**
 * 选项接口
 */
export interface Option {
  /** 选项标识 (如 A, B, C, D) */
  key: string;
  /** 选项文本内容 */
  text: string;
}

/**
 * 题目类型枚举
 */
export type QuestionType = 'single' | 'multi' | 'boolean';

/**
 * 题目接口
 */
export interface Question {
  /** 题目唯一标识符 */
  id: string;
  /** 题目类型 */
  type: QuestionType;
  /** 题干内容 */
  stem: string;
  /** 选项列表 */
  options: Option[];
  /** 正确答案 (单选: "A", 多选: "AB", 判断: "true"/"false") */
  answer: string;
  /** 答案解析 */
  explain: string;
  /** 关键词列表 (用于高亮显示) */
  keywords?: string[];
  /** AI 助记口诀 */
  mnemonic?: string;
}

// ==================== 用户进度相关类型 ====================

/**
 * 答题记录接口
 */
export interface AnswerRecord {
  /** 题目 ID */
  questionId: string;
  /** 用户答案 */
  userAnswer: string;
  /** 正确答案 */
  correctAnswer: string;
  /** 是否正确 */
  isCorrect: boolean;
  /** 答题时间戳 */
  timestamp: number;
  /** 答题模式 */
  mode: ExamMode;
}

/**
 * 错题记录接口
 */
export interface WrongQuestion {
  /** 题目 ID */
  questionId: string;
  /** 错误次数 */
  mistakeCount: number;
  /** 最后答错时间 */
  lastMistakeTime: number;
  /** 复习次数 */
  reviewCount: number;
  /** 最后一次的错误答案 */
  lastWrongAnswer?: string;
}

/**
 * 用户进度接口
 */
export interface UserProgress {
  /** 答题记录列表 */
  answerRecords: AnswerRecord[];
  /** 错题本 */
  wrongQuestions: Map<string, WrongQuestion>;
  /** 已完成题目 ID 集合 */
  completedQuestions: Set<string>;
  /** 已斩杀题目 ID 集合 */
  killedQuestions: Set<string>;
  /** 题目连续答对次数记录 */
  consecutiveCorrect: Map<string, number>;
  /** 当前模式 */
  currentMode: ExamMode;
  /** 最后活跃时间 */
  lastActiveTime: number;
  /** 考试历史记录 */
  examHistory: ExamResult[];
}

// ==================== 考试模式相关类型 ====================

/**
 * 考试模式枚举
 */
export type ExamMode = 'study' | 'practice' | 'review' | 'exam';

/**
 * 考试配置接口
 */
export interface ExamConfig {
  /** 单选题数量 */
  singleCount: number;
  /** 多选题数量 */
  multiCount: number;
  /** 判断题数量 */
  booleanCount: number;
  /** 是否乱序选项 */
  shuffleOptions: boolean;
  /** 是否限时 */
  timed: boolean;
  /** 时长(分钟) */
  duration?: number;
}

/**
 * 试卷接口
 */
export interface ExamPaper {
  /** 试卷 ID */
  id: string;
  /** 试卷标题 */
  title: string;
  /** 题目列表 */
  questions: Question[];
  /** 考试配置 */
  config: ExamConfig;
  /** 创建时间 */
  createdAt: number;
}

/**
 * 考试结果接口（存档记录）
 */
export interface ExamResult {
  /** 考试记录 ID */
  id: string;
  /** 试卷 ID */
  paperId: string;
  /** 考试开始时间 */
  startTime: number;
  /** 考试提交时间 */
  submittedAt: number;
  /** 用时(秒) */
  duration: number;
  /** 题目列表（含答案） */
  questions: Question[];
  /** 用户答案映射 */
  userAnswers: Map<string, string>;
  /** 正确题数 */
  correctCount: number;
  /** 总题数 */
  totalCount: number;
  /** 正确率（百分比） */
  accuracy: number;
}

// ==================== 组件 Props 类型 ====================

/**
 * 题目卡片组件 Props
 */
export interface QuestionCardProps {
  question: Question;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  showExplanation: boolean;
  highlightKeywords: boolean;
  shuffleOptions: boolean;
}

/**
 * 选项按钮组件 Props
 */
export interface OptionButtonProps {
  option: Option;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled: boolean;
  onClick: () => void;
}

/**
 * 进度条组件 Props
 */
export interface ProgressProps {
  current: number;
  total: number;
  correctCount: number;
  wrongCount: number;
}

/**
 * 统计面板组件 Props
 */
export interface StatsProps {
  totalQuestions: number;
  completedQuestions: number;
  correctRate: number;
  wrongQuestionCount: number;
}

// ==================== LocalStorage 数据结构 ====================

/**
 * LocalStorage 存储的用户数据结构
 */
export interface StorageData {
  /** 答题记录 */
  answerRecords: AnswerRecord[];
  /** 错题本 (序列化为数组) */
  wrongQuestions: [string, WrongQuestion][];
  /** 已完成题目 ID 列表 */
  completedQuestions: string[];
  /** 已斩杀题目 ID 列表 */
  killedQuestions: string[];
  /** 题目连续答对次数 (序列化为数组) */
  consecutiveCorrect: [string, number][];
  /** 当前模式 */
  currentMode: ExamMode;
  /** 最后活跃时间 */
  lastActiveTime: number;
  /** 数据版本号 */
  version: string;
  /** 考试历史记录 */
  examHistory: ExamResult[];
}

// ==================== 工具函数类型 ====================

/**
 * 题目过滤器函数类型
 */
export type QuestionFilter = (question: Question) => boolean;

/**
 * 题目排序函数类型
 */
export type QuestionSorter = (a: Question, b: Question) => number;
