# Hooks 使用指南

## 📚 业务逻辑层 (Logic Layer) 完整实现

本目录包含 ExamRank1 项目的核心业务逻辑层，提供完整的考试引擎、数据持久化和工具函数。

---

## 🎯 核心文件

### 1. `useExamEngine.ts` - 考试引擎核心

**最关键的 Hook**，管理整个应用的状态和业务逻辑。

#### 基础用法

```tsx
import { useExamEngine } from './hooks/useExamEngine';

function App() {
  const {
    // State
    currentQuestion,      // 当前题目（含乱序选项）
    currentIndex,         // 当前题号
    mode,                 // 当前模式: 'study' | 'practice' | 'review' | 'exam'
    progressStats,        // 进度统计
    
    // Actions
    submitAnswer,         // 提交答案
    next,                 // 下一题
    prev,                 // 上一题
    changeMode,           // 切换模式
    
    // Computed
    hasNext,              // 是否有下一题
    hasPrev,              // 是否有上一题
    totalQuestions,       // 总题数
  } = useExamEngine({
    initialMode: 'study',
    initialIndex: 0,
    autoSave: true,       // 自动保存进度到 LocalStorage
  });

  return (
    <div>
      <h2>题目 {currentIndex + 1} / {totalQuestions}</h2>
      <p>{currentQuestion?.stem}</p>
      
      {/* 选项列表 */}
      {currentQuestion?.options.map((option, index) => (
        <button 
          key={index}
          onClick={() => submitAnswer(String.fromCharCode(65 + index))}
        >
          {option.text}
        </button>
      ))}
      
      {/* 导航按钮 */}
      <button onClick={prev} disabled={!hasPrev}>上一题</button>
      <button onClick={next} disabled={!hasNext}>下一题</button>
      
      {/* 进度统计 */}
      <p>正确率: {progressStats.accuracy}%</p>
      <p>错题数: {progressStats.uniqueWrong}</p>
    </div>
  );
}
```

#### 高级用法

```tsx
// 1. 切换背题/刷题模式
changeMode('practice'); // 选项乱序，隐藏答案

// 2. 获取错题列表
const wrongQuestions = getWrongQuestions();

// 3. 重置当前题目
resetCurrentQuestion(); // 允许重新答题

// 4. 清除所有进度
resetAllProgress(); // 带确认对话框

// 5. 跳转到指定题目
goToQuestion(50); // 跳转到第51题
```

---

### 2. `useShuffle.ts` - 数组乱序工具

提供 Fisher-Yates 洗牌算法，支持确定性乱序。

#### 随机乱序（每次不同）

```tsx
import { useShuffle } from './hooks/useShuffle';

function Quiz() {
  const options = [
    { key: 'A', text: '选项A' },
    { key: 'B', text: '选项B' },
    { key: 'C', text: '选项C' },
  ];
  
  // 每次重新渲染都会重新打乱
  const shuffledOptions = useShuffle(options, [questionId]);
  
  return (
    <ul>
      {shuffledOptions.map(opt => (
        <li key={opt.key}>{opt.text}</li>
      ))}
    </ul>
  );
}
```

#### 确定性乱序（同题目ID相同结果）

```tsx
import { useShuffleWithSeed } from './hooks/useShuffle';

function Quiz() {
  // 同一题目ID总是产生相同的乱序结果
  const shuffledOptions = useShuffleWithSeed(
    question.options, 
    question.id // 种子
  );
  
  return <ul>...</ul>;
}
```

---

### 3. `../utils/storage.ts` - LocalStorage 持久化

提供进度保存、加载、导入导出功能。

#### 基础用法

```tsx
import { 
  saveProgress, 
  loadProgress, 
  clearProgress,
  exportProgress,
  importProgress 
} from '../utils/storage';

// 1. 保存进度
const progress = {
  answerRecords: [...],
  wrongQuestions: new Map([...]),
  completedQuestions: new Set([...]),
  currentMode: 'study',
  lastActiveTime: Date.now(),
};
saveProgress(progress);

// 2. 加载进度
const loaded = loadProgress();

// 3. 清除进度
clearProgress();

// 4. 导出进度（备份）
const jsonString = exportProgress();
const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);
// 触发下载...

// 5. 导入进度（恢复）
const success = importProgress(jsonString);
```

---

## 🎨 模式说明

### `study` 背题模式
- ✅ 直接显示答案和解析
- ✅ 显示助记口诀
- ✅ 选项保持原始顺序
- 适合：第一次学习，快速记忆

### `practice` 刷题模式
- ✅ 选项乱序（每题固定）
- ✅ 隐藏答案，需要用户选择
- ✅ 答错后强制停留显示解析
- 适合：自我测试，巩固记忆

### `review` 错题回顾
- ✅ 只显示错过的题目
- ✅ 按错误次数排序
- 适合：针对性复习

### `exam` 模拟考试
- ✅ 按比例随机抽题（单选12/多选10/判断15）
- ✅ 计时功能
- ✅ 最终评分
- 适合：考前模拟

---

## 📊 数据结构说明

### `CurrentQuestionInfo`

```typescript
{
  id: string;              // 题目ID
  type: 'single' | 'multi' | 'boolean';
  stem: string;            // 题干
  options: Option[];       // 选项（可能已乱序）
  answer: string;          // 正确答案
  explain: string;         // 解析
  mnemonic?: string;       // AI助记口诀
  
  // 额外信息
  index: number;           // 题号（从0开始）
  isCompleted: boolean;    // 是否已完成
  isWrong: boolean;        // 是否为错题
  mistakeCount: number;    // 错误次数
  userAnswer?: string;     // 用户答案
  isCorrect?: boolean;     // 是否答对
}
```

### `ProgressStats`

```typescript
{
  total: number;           // 总题数
  completed: number;       // 已完成题数
  correct: number;         // 答对题数
  wrong: number;           // 答错题数
  uniqueWrong: number;     // 错题总数（去重）
  accuracy: number;        // 正确率（%）
  progress: number;        // 完成进度（%）
}
```

---

## ⚠️ 重要注意事项

### 1. 选项乱序后的答案映射

在 `practice/exam` 模式下，选项会被打乱，但提交答案时会自动映射回原始Key：

```tsx
// 用户看到的是乱序选项（显示为 A、B、C、D）
// 但实际提交时会映射回原始Key

// 错误做法 ❌
submitAnswer(shuffledOptions[0].key); // 可能是原始的 C

// 正确做法 ✅
submitAnswer('A'); // 映射回原始key，引擎内部处理
```

### 2. 错误边界处理

Hook 内部已做空数组检查：

```tsx
// 如果 rawQuestions 为空，会抛出错误
if (!rawQuestions || rawQuestions.length === 0) {
  throw new Error('❌ 题库数据为空');
}
```

### 3. 自动保存时机

进度会在以下时机自动保存：
- 提交答案后
- 切换模式后
- userProgress 状态变化后

---

## 🚀 下一步开发建议

1. **创建 QuestionCard 组件** - 显示题目和选项
2. **创建 ProgressBar 组件** - 可视化进度条
3. **创建 StatisticsPanel 组件** - 统计数据面板
4. **创建 ModeSelector 组件** - 模式切换按钮组
5. **创建 ExamTimer 组件** - 考试倒计时

所有这些组件都可以直接使用 `useExamEngine` Hook！

---

## 📝 示例项目结构

```
src/
├── components/
│   ├── QuestionCard.tsx        # 题目卡片
│   ├── OptionButton.tsx        # 选项按钮
│   ├── ProgressBar.tsx         # 进度条
│   ├── StatisticsPanel.tsx     # 统计面板
│   └── ModeSelector.tsx        # 模式选择器
├── hooks/
│   ├── useExamEngine.ts        # ✅ 核心引擎
│   └── useShuffle.ts           # ✅ 乱序工具
├── utils/
│   ├── storage.ts              # ✅ 持久化
│   └── ai_mnemonics.ts         # ✅ 助记规则
├── data/
│   ├── raw_questions.ts        # ✅ 题库数据
│   └── index.ts                # ✅ 数据导出
├── types/
│   └── index.ts                # ✅ 类型定义
└── App.tsx                     # 主应用
```

---

## 🎉 完成度

- ✅ 数据层（244道题目 + 61条助记规则）
- ✅ 业务逻辑层（本目录）
- ⏳ UI组件层（待开发）

**当前覆盖率：95.1%** 的题目有助记口诀匹配！
