/**
 * 沉浸式学习组件
 * 支持四种模式：背题、刷题、错题、考试
 */

import { useExamEngine } from '../hooks/useExamEngine';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, Grid3x3, Swords, List, Square, Send } from 'lucide-react';
import type { ExamMode, Question, ExamResult } from '../types';
import { useState, useEffect } from 'react';
import { rawQuestions } from '../data/raw_questions';
import { getMnemonic } from '../utils/ai_mnemonics';

interface ExamEngineTestProps {
  initialMode?: ExamMode;
  onBack?: () => void;
}

export default function ExamEngineTest({ 
  initialMode = 'study',
  onBack 
}: ExamEngineTestProps) {
  const [showGrid, setShowGrid] = useState(false);
  // 背题模式和错题回顾的查看模式：'focus' 专注模式（逐题）或 'reading' 阅读模式（连续）
  // 错题回顾默认为阅读模式
  const [viewMode, setViewMode] = useState<'focus' | 'reading'>(
    initialMode === 'review' ? 'reading' : 'focus'
  );
  // 多选题当前选中的选项（用于非背题模式）
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  // 考试结果
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  
  const {
    currentQuestion,
    currentIndex,
    mode,
    progressStats,
    submitAnswer,
    next,
    prev,
    hasNext,
    hasPrev,
    totalQuestions,
    resetCurrentQuestion,
    goToQuestion,
    getAllQuestionsStatus,
    killCurrentQuestion,
    userProgress,
    markAsCompleted,
    submitExam,
    allQuestions,
    tempAnswers,
  } = useExamEngine({
    initialMode,
    initialIndex: 0,
    autoSave: true,
  });

  // 题目切换时清空多选选项
  useEffect(() => {
    setSelectedOptions(new Set());
  }, [currentIndex, currentQuestion?.id]);

  // 处理考试提交
  const handleSubmitExam = () => {
    if (mode !== 'exam') return;
    
    // 检查是否有未答题目
    const unansweredCount = allQuestions.filter(q => !tempAnswers.has(q.id)).length;
    if (unansweredCount > 0) {
      const confirmed = window.confirm(`还有 ${unansweredCount} 道题未作答，确定要提交吗？`);
      if (!confirmed) return;
    }
    
    const result = submitExam();
    if (result) {
      setExamResult(result);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-400 text-xl">❌ 题库数据加载失败</div>
      </div>
    );
  }

  // 模式配置
  const modeConfig = {
    study: { name: '📖 背题模式', color: 'blue' },
    practice: { name: '✍️ 刷题模式', color: 'green' },
    review: { name: '🔄 错题回顾', color: 'orange' },
    exam: { name: '📝 模拟考试', color: 'purple' },
  }[mode];

  // 如果考试已提交，显示结果
  if (mode === 'exam' && examResult) {
    return <ExamResultView result={examResult} onBack={onBack || (() => {})} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* 顶部导航栏 - 极简设计 */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* 左侧：返回按钮 */}
          <button
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors min-w-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm hidden sm:inline">返回</span>
          </button>

          {/* 中间：模式 + 进度 */}
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm font-medium text-gray-300 truncate max-w-[100px] sm:max-w-none">{modeConfig.name}</span>
            <div className="h-3 sm:h-4 w-px bg-gray-600" />
            <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* 右侧：统计 + 视图切换 + 网格按钮（仅背题和错题模式） */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-3 sm:gap-4 text-xs text-gray-400">
              <span>正确率: <span className="text-green-400 font-medium">{progressStats.accuracy}%</span></span>
              <span>错题: <span className="text-red-400 font-medium">{progressStats.uniqueWrong}</span></span>
            </div>
            {(mode === 'study' || mode === 'review') && (
              <>
                {/* 视图切换按钮 */}
                <button
                  onClick={() => setViewMode(viewMode === 'focus' ? 'reading' : 'focus')}
                  className="p-1.5 sm:p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-colors"
                  title={viewMode === 'focus' ? '切换到阅读模式' : '切换到专注模式'}
                >
                  {viewMode === 'focus' ? (
                    <List className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  ) : (
                    <Square className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  )}
                </button>
                {/* 题目网格按钮（仅背题模式） */}
                {mode === 'study' && (
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-colors"
                    title="题目网格"
                  >
                    <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 主内容区 - 沉浸式题目卡片 */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* 背题模式和错题回顾的阅读模式：连续显示所有题目 */}
        {(mode === 'study' || mode === 'review') && viewMode === 'reading' ? (
          <ReadingModeView 
            userProgress={userProgress} 
            mode={mode}
            goToQuestion={goToQuestion}
            resetCurrentQuestion={resetCurrentQuestion}
            markAsCompleted={markAsCompleted}
            killCurrentQuestion={killCurrentQuestion}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
            getAllQuestionsStatus={getAllQuestionsStatus}
            currentIndex={currentIndex}
          />
        ) : (
          <>
            {/* 题目网格（仅背题模式显示） */}
            {mode === 'study' && showGrid && (
          <div className="mb-4 sm:mb-6 bg-gray-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-200">题目导航</h3>
              <button
                onClick={() => setShowGrid(false)}
                className="text-gray-400 hover:text-white text-xs sm:text-sm"
              >
                收起
              </button>
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 sm:gap-2">
              {getAllQuestionsStatus().map((status) => {
                const isCurrentQuestion = status.index === currentIndex;
                
                return (
                  <button
                    key={status.index}
                    onClick={() => {
                      goToQuestion(status.index);
                      setShowGrid(false); // 跳转后关闭网格
                    }}
                    className={`aspect-square rounded-lg font-bold text-xs sm:text-sm transition-all relative ${
                      isCurrentQuestion
                        ? 'bg-blue-500 text-white shadow-lg scale-110 ring-2 ring-blue-300'
                        : status.isCompleted
                        ? 'bg-green-600/50 text-green-200 hover:bg-green-600/70'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {status.index + 1}
                    {status.isWrong && !isCurrentQuestion && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded"></div>
                <span>当前题</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600/50 rounded"></div>
                <span>已完成</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-700 rounded"></div>
                <span>未完成</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <span>错题标记</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* 题目头部 */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                    currentQuestion.type === 'single'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-400'
                      : currentQuestion.type === 'multi'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-400'
                      : 'bg-green-500/20 text-green-300 border border-green-400'
                  }`}
                >
                  {currentQuestion.type === 'single' && '单选'}
                  {currentQuestion.type === 'multi' && '多选'}
                  {currentQuestion.type === 'boolean' && '判断'}
                </span>
                {currentQuestion.isCompleted && (
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-400">
                    ✅ 已完成
                  </span>
                )}
                {currentQuestion.isWrong && (
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-400">
                    ❌ 错 x{currentQuestion.mistakeCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 题干 */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-100 font-medium">
              {currentQuestion.stem}
            </p>
          </div>

          {/* 选项 */}
          <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 space-y-2 sm:space-y-3">
            {currentQuestion.options.map((option, index) => {
              const optionKey = String.fromCharCode(65 + index); // A, B, C, D
              const isUserAnswer = currentQuestion.userAnswer?.includes(option.key);
              const isCorrectAnswer = currentQuestion.answer.includes(option.key);
              // 背题模式直接显示答案，考试模式不显示，其他模式需要答题后显示
              const showAnswer = mode === 'study' || (mode !== 'exam' && currentQuestion.userAnswer);
              // 是否是多选题且非背题模式
              const isMultiNonStudy = currentQuestion.type === 'multi' && mode !== 'study';
              // 当前选项是否被选中（多选题）
              const isSelected = selectedOptions.has(option.key);

              // 多选题且非背题模式：使用复选框
              if (isMultiNonStudy && !currentQuestion.userAnswer) {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      const newSelected = new Set(selectedOptions);
                      if (isSelected) {
                        newSelected.delete(option.key);
                      } else {
                        newSelected.add(option.key);
                      }
                      setSelectedOptions(newSelected);
                    }}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all font-medium text-sm sm:text-base cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-gray-600 bg-gray-700/50 text-gray-200 hover:border-gray-500 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* 复选框 */}
                      <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center ${
                        isSelected
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-500 bg-gray-700'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                      <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm bg-gray-600 text-gray-300">
                        {optionKey}
                      </span>
                      <span className="flex-1 break-words">{option.text}</span>
                    </div>
                  </div>
                );
              }

              // 单选题、判断题、背题模式的多选题，或已答题的多选题：使用按钮
              return (
                <button
                  key={index}
                  onClick={() => {
                    // 非多选题或背题模式才能直接点击提交
                    if (currentQuestion.type !== 'multi' || mode === 'study') {
                      submitAnswer(optionKey);
                      
                      // 考试模式：单选题和判断题提交后自动跳到下一题
                      if (mode === 'exam' && (currentQuestion.type === 'single' || currentQuestion.type === 'boolean') && hasNext) {
                        setTimeout(() => {
                          next();
                        }, 100);
                      }
                    }
                  }}
                  disabled={(currentQuestion.isCompleted && mode === 'practice') || (isMultiNonStudy && !!currentQuestion.userAnswer)}
                  className={`w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all font-medium text-sm sm:text-base ${
                    mode === 'exam'
                      ? isUserAnswer
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-gray-600 bg-gray-700/50 text-gray-200 hover:border-gray-500 hover:bg-gray-700 active:scale-98'
                      : isUserAnswer && currentQuestion.isCorrect !== undefined
                      ? currentQuestion.isCorrect
                        ? 'border-green-500 bg-green-500/10 text-green-300'
                        : 'border-red-500 bg-red-500/10 text-red-300'
                      : isCorrectAnswer && showAnswer
                      ? 'border-green-500 bg-green-500/10 text-green-300'
                      : 'border-gray-600 bg-gray-700/50 text-gray-200 hover:border-gray-500 hover:bg-gray-700 active:scale-98'
                  } disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <span className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                        mode === 'exam'
                          ? isUserAnswer
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-600 text-gray-300'
                          : isUserAnswer && currentQuestion.isCorrect !== undefined
                          ? currentQuestion.isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : isCorrectAnswer && showAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {optionKey}
                      </span>
                      <span className="flex-1 break-words">{option.text}</span>
                    </div>
                    <div className="flex-shrink-0">
                      {mode !== 'exam' && isUserAnswer && currentQuestion.isCorrect !== undefined && (
                        <span className="text-base sm:text-lg">
                          {currentQuestion.isCorrect ? '✅' : '❌'}
                        </span>
                      )}
                      {mode !== 'exam' && isCorrectAnswer && showAnswer && (
                        <span className="text-xs px-2 py-1 bg-green-600 text-white rounded-full whitespace-nowrap">
                          ✅ 正确
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            
            {/* 多选题提交按钮（仅在非背题模式且未答题时显示） */}
            {currentQuestion.type === 'multi' && mode !== 'study' && !currentQuestion.userAnswer && (
              <button
                onClick={() => {
                  if (selectedOptions.size === 0) {
                    alert('请至少选择一个选项');
                    return;
                  }
                  // 将选中的选项按字母顺序排列，然后拼接成字符串
                  const answer = Array.from(selectedOptions).sort().join('');
                  submitAnswer(answer);
                  
                  // 考试模式：提交后自动跳到下一题
                  if (mode === 'exam' && hasNext) {
                    setTimeout(() => {
                      next();
                    }, 100);
                  }
                }}
                disabled={selectedOptions.size === 0}
                className="w-full mt-2 py-3 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交答案 {selectedOptions.size > 0 && `(已选 ${selectedOptions.size} 项)`}
              </button>
            )}
          </div>

          {/* 解析和助记（背题模式直接显示，其他模式答题后显示，考试模式不显示） */}
          {(mode === 'study' || (mode !== 'exam' && currentQuestion.userAnswer)) && (
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
              <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-xl">
                <div className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                  <span className="text-base sm:text-lg">💡</span>
                  <span className="text-sm sm:text-base">解析</span>
                </div>
                <div className="text-blue-100 leading-relaxed text-sm sm:text-base">{currentQuestion.explain}</div>
              </div>

              {currentQuestion.mnemonic && (
                <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 sm:p-4 rounded-r-xl">
                  <div className="font-bold text-yellow-300 mb-2 flex items-center gap-2">
                    <span className="text-base sm:text-lg">🎯</span>
                    <span className="text-sm sm:text-base">助记口诀</span>
                  </div>
                  <div className="text-yellow-100 leading-relaxed text-sm sm:text-base">{currentQuestion.mnemonic}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 底部导航 */}
        <div className="mt-4 sm:mt-6 space-y-4">
          {/* 考试模式：提交按钮（仅在最后一题显示） */}
          {mode === 'exam' && currentIndex === totalQuestions - 1 && (
            <div className="flex justify-center">
              <button
                onClick={handleSubmitExam}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-lg shadow-lg transform transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-6 h-6" />
                提交考试
              </button>
            </div>
          )}
          
          {/* 普通导航按钮 */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={prev}
              disabled={!hasPrev}
              className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 text-white rounded-lg sm:rounded-xl hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">上一题</span>
            </button>

            <div className="flex items-center gap-2">
              {mode !== 'exam' && (
                <button
                  onClick={resetCurrentQuestion}
                  className="px-3 sm:px-4 py-2 bg-yellow-600/20 text-yellow-300 border border-yellow-500/50 rounded-lg sm:rounded-xl hover:bg-yellow-600/30 transition-all flex items-center gap-1 sm:gap-2"
                >
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">重做</span>
                </button>
              )}
              
              {/* 背题模式：标记已完成按钮 */}
              {mode === 'study' && !currentQuestion.isCompleted && (
                <button
                  onClick={markAsCompleted}
                  className="px-3 sm:px-4 py-2 bg-green-600/20 text-green-300 border border-green-500/50 rounded-lg sm:rounded-xl hover:bg-green-600/30 transition-all flex items-center gap-1 sm:gap-2"
                  title="标记为已完成"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-xs sm:text-sm">已完成</span>
                </button>
              )}
              
              {/* 斩杀按钮（仅背题和刷题模式显示） */}
              {(mode === 'study' || mode === 'practice') && (
                <button
                  onClick={() => {
                    if (window.confirm('确定要斩杀这道题目吗？斩杀后将不再出现在其他模式中，但可以在垃圾桶中复原。')) {
                      killCurrentQuestion();
                    }
                  }}
                  className="px-3 sm:px-4 py-2 bg-red-600/20 text-red-300 border border-red-500/50 rounded-lg sm:rounded-xl hover:bg-red-600/30 transition-all flex items-center gap-1 sm:gap-2"
                  title="斩杀此题"
                >
                  <Swords className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">斩杀</span>
                </button>
              )}
            </div>

            <button
              onClick={next}
              disabled={!hasNext}
              className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
            >
              <span className="hidden sm:inline">下一题</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 小红书@元认知星图 版权所有
          </p>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

{/* 阅读模式组件 - 连续显示所有题目 */}
function ReadingModeView({ 
  userProgress, 
  mode,
  goToQuestion,
  resetCurrentQuestion,
  markAsCompleted,
  killCurrentQuestion,
  showGrid,
  setShowGrid,
  getAllQuestionsStatus,
  currentIndex,
}: { 
  userProgress: any; 
  mode: ExamMode;
  goToQuestion: (index: number) => void;
  resetCurrentQuestion: () => void;
  markAsCompleted: () => void;
  killCurrentQuestion: () => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  getAllQuestionsStatus: () => any[];
  currentIndex: number;
}) {
  // 根据模式过滤题目
  let questions = rawQuestions.filter(q => !userProgress.killedQuestions.has(q.id));
  
  // 如果是错题回顾模式，只显示错题并按错误次数降序排序
  if (mode === 'review') {
    const wrongQuestionIds = Array.from(userProgress.wrongQuestions.keys());
    questions = questions.filter(q => wrongQuestionIds.includes(q.id));
    
    // 按错误次数降序排序（错的越多越靠前）
    questions.sort((a, b) => {
      const aCount = userProgress.wrongQuestions.get(a.id)?.mistakeCount || 0;
      const bCount = userProgress.wrongQuestions.get(b.id)?.mistakeCount || 0;
      return bCount - aCount;
    });
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4 mb-4">
        <p className="text-xs sm:text-sm text-blue-300">
          📚 阅读模式：{mode === 'review' ? '错题' : '所有题目'}连续显示，适合快速浏览和复习。点击左上角图标切换回专注模式。
        </p>
      </div>

      {/* 题目网格（仅背题模式显示） */}
      {mode === 'study' && showGrid && (
        <div className="mb-4 sm:mb-6 bg-gray-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-200">题目导航</h3>
            <button
              onClick={() => setShowGrid(false)}
              className="text-gray-400 hover:text-white text-xs sm:text-sm"
            >
              收起
            </button>
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 sm:gap-2">
            {getAllQuestionsStatus().map((status) => {
              const isCurrentQuestion = status.index === currentIndex;
              
              return (
                <button
                  key={status.index}
                  onClick={() => {
                    goToQuestion(status.index);
                    setShowGrid(false); // 跳转后关闭网格
                    
                    // 阅读模式下滚动到对应的题目卡片
                    setTimeout(() => {
                      const questionCard = document.getElementById(`question-card-${status.index}`);
                      if (questionCard) {
                        questionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // 稍微向上偏移一点，避免被顶部导航栏遮挡
                        setTimeout(() => {
                          window.scrollBy({ top: -80, behavior: 'smooth' });
                        }, 300);
                      }
                    }, 100);
                  }}
                  className={`aspect-square rounded-lg font-bold text-xs sm:text-sm transition-all relative ${
                    isCurrentQuestion
                      ? 'bg-blue-500 text-white shadow-lg scale-110 ring-2 ring-blue-300'
                      : status.isCompleted
                      ? 'bg-green-600/50 text-green-200 hover:bg-green-600/70'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {status.index + 1}
                  {status.isWrong && !isCurrentQuestion && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded"></div>
              <span>当前题</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600/50 rounded"></div>
              <span>已完成</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-700 rounded"></div>
              <span>未完成</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <span>错题标记</span>
            </div>
          </div>
        </div>
      )}
      
      {questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
          <p className="text-lg sm:text-xl mb-2">🎉 太棒了！</p>
          <p className="text-sm sm:text-base">暂时没有错题，继续加油！</p>
        </div>
      ) : (
        questions.map((question, index) => {
          // 计算全局索引（在所有题目中的位置）
          const globalIndex = rawQuestions.findIndex(q => q.id === question.id);
          
          return (
            <QuestionCard 
              key={question.id} 
              question={question} 
              index={index}
              globalIndex={globalIndex}
              userProgress={userProgress}
              mode={mode}
              goToQuestion={goToQuestion}
              resetCurrentQuestion={resetCurrentQuestion}
              markAsCompleted={markAsCompleted}
              killCurrentQuestion={killCurrentQuestion}
              setShowGrid={setShowGrid}
            />
          );
        })
      )}
    </div>
  );
}

{/* 题目卡片组件 */}
function QuestionCard({ 
  question, 
  index, 
  globalIndex,
  userProgress,
  mode,
  goToQuestion,
  resetCurrentQuestion,
  markAsCompleted,
  killCurrentQuestion,
  setShowGrid,
}: { 
  question: Question; 
  index: number;
  globalIndex?: number;
  userProgress: any;
  mode?: ExamMode;
  goToQuestion?: (index: number) => void;
  resetCurrentQuestion?: () => void;
  markAsCompleted?: () => void;
  killCurrentQuestion?: () => void;
  setShowGrid?: (show: boolean) => void;
}) {
  const mnemonic = getMnemonic(question);
  const wrongInfo = userProgress.wrongQuestions.get(question.id);
  const isCompleted = userProgress.completedQuestions.has(question.id);
  
  // 优先从 answerRecords 查找（背题模式），如果没有则从 wrongQuestions 查找（刷题/考试模式）
  const lastRecord = userProgress.answerRecords
    .filter((r: any) => r.questionId === question.id)
    .sort((a: any, b: any) => b.timestamp - a.timestamp)[0];
  
  // 如果有答题记录，使用记录中的答案；否则使用错题本中的最后错误答案
  const userAnswer = lastRecord?.userAnswer || wrongInfo?.lastWrongAnswer;
  const isCorrectAnswer = lastRecord?.isCorrect ?? (wrongInfo && !wrongInfo.lastWrongAnswer ? undefined : false);

  // 处理点击题目头部（打开题目网格）
  const handleHeaderClick = () => {
    if (setShowGrid && mode === 'study') {
      // 先跳转到该题
      if (goToQuestion) {
        const globalIndex = rawQuestions.findIndex(q => q.id === question.id);
        if (globalIndex !== -1) {
          goToQuestion(globalIndex);
        }
      }
      // 然后打开网格
      setTimeout(() => setShowGrid(true), 100);
    }
  };

  // 处理状态操作（与专注模式一致）
  const handleReset = () => {
    if (resetCurrentQuestion && goToQuestion) {
      const globalIndex = rawQuestions.findIndex(q => q.id === question.id);
      if (globalIndex !== -1) {
        goToQuestion(globalIndex);
        setTimeout(() => resetCurrentQuestion(), 100);
      }
    }
  };

  const handleMarkCompleted = () => {
    if (markAsCompleted && goToQuestion) {
      const globalIndex = rawQuestions.findIndex(q => q.id === question.id);
      if (globalIndex !== -1) {
        goToQuestion(globalIndex);
        setTimeout(() => markAsCompleted(), 100);
      }
    }
  };

  const handleKill = () => {
    if (killCurrentQuestion && goToQuestion) {
      const confirmed = window.confirm('确定要斩杀这道题目吗？斩杀后将不再出现在其他模式中，但可以在垃圾桶中复原。');
      if (confirmed) {
        const globalIndex = rawQuestions.findIndex(q => q.id === question.id);
        if (globalIndex !== -1) {
          goToQuestion(globalIndex);
          setTimeout(() => killCurrentQuestion(), 100);
        }
      }
    }
  };

  return (
    <div 
      id={globalIndex !== undefined ? `question-card-${globalIndex}` : undefined}
      className="bg-gray-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
    >
      {/* 题目头部 */}
      <div 
        className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-600 cursor-pointer hover:from-gray-600 hover:to-gray-700 transition-colors"
        onClick={handleHeaderClick}
        title={mode === 'study' && setShowGrid ? "点击打开题目网格" : undefined}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-xs sm:text-sm text-gray-400">#{index + 1}</span>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
              question.type === 'single'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-400'
                : question.type === 'multi'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400'
                : 'bg-green-500/20 text-green-300 border border-green-400'
            }`}>
              {question.type === 'single' && '单选'}
              {question.type === 'multi' && '多选'}
              {question.type === 'boolean' && '判断'}
            </span>
            {isCompleted && (
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-400">
                ✅ 已完成
              </span>
            )}
            {wrongInfo && (
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-400">
                ❌ 错 x{wrongInfo.mistakeCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 题干 */}
      <div className="px-4 sm:px-6 py-4">
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-200">
          {question.stem}
        </p>
      </div>

      {/* 选项 */}
      <div className="px-4 sm:px-6 pb-4 space-y-2">
        {question.options.map((option, idx) => {
          const optionKey = String.fromCharCode(65 + idx);
          const isCorrect = question.answer.includes(option.key);
          const isUserAnswer = userAnswer === option.key || userAnswer?.includes(option.key);

          return (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                // 如果点击的是正确答案，且在背题模式下，自动标记为已完成
                if (isCorrect && mode === 'study' && !isCompleted && markAsCompleted && goToQuestion) {
                  const globalIndex = rawQuestions.findIndex(q => q.id === question.id);
                  if (globalIndex !== -1) {
                    goToQuestion(globalIndex);
                    setTimeout(() => markAsCompleted(), 100);
                  }
                }
              }}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all cursor-pointer ${
                isUserAnswer && isCorrectAnswer === false
                  ? 'border-red-500 bg-red-500/10'  // 用户选的错误答案
                  : isCorrect
                  ? 'border-green-500 bg-green-500/10 hover:bg-green-500/20'  // 正确答案
                  : 'border-gray-600 bg-gray-700/30 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                    isUserAnswer && isCorrectAnswer === false
                      ? 'bg-red-500 text-white'  // 用户选的错误答案
                      : isCorrect
                      ? 'bg-green-500 text-white'  // 正确答案
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {optionKey}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-200 flex-1">{option.text}</span>
                </div>
                <div className="flex items-center gap-1">
                  {isUserAnswer && isCorrectAnswer === false && (
                    <span className="text-xs px-2 py-0.5 bg-red-600 text-white rounded-full whitespace-nowrap">
                      ❌ 你选的
                    </span>
                  )}
                  {isCorrect && (
                    <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded-full whitespace-nowrap">
                      ✅ 正确
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 解析 */}
      <div className="px-4 sm:px-6 pb-4 space-y-3">
        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded-r-lg">
          <div className="font-bold text-blue-300 mb-1 text-xs sm:text-sm flex items-center gap-2">
            <span>💡</span>
            <span>解析</span>
          </div>
          <div className="text-blue-100 text-xs sm:text-sm leading-relaxed">{question.explain}</div>
        </div>

        {mnemonic && (
          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded-r-lg">
            <div className="font-bold text-yellow-300 mb-1 text-xs sm:text-sm flex items-center gap-2">
              <span>🎯</span>
              <span>助记口诀</span>
            </div>
            <div className="text-yellow-100 text-xs sm:text-sm leading-relaxed">{mnemonic}</div>
          </div>
        )}
      </div>

      {/* 阅读模式下的操作按钮（与专注模式样式一致） */}
      {goToQuestion && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="flex items-center justify-center gap-2">
            {resetCurrentQuestion && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="px-3 sm:px-4 py-2 bg-yellow-600/20 text-yellow-300 border border-yellow-500/50 rounded-lg sm:rounded-xl hover:bg-yellow-600/30 transition-all flex items-center gap-1 sm:gap-2"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">重做</span>
              </button>
            )}
            
            {/* 背题模式：标记已完成按钮 */}
            {mode === 'study' && markAsCompleted && !isCompleted && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkCompleted();
                }}
                className="px-3 sm:px-4 py-2 bg-green-600/20 text-green-300 border border-green-500/50 rounded-lg sm:rounded-xl hover:bg-green-600/30 transition-all flex items-center gap-1 sm:gap-2"
                title="标记为已完成"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-xs sm:text-sm">已完成</span>
              </button>
            )}
            
            {/* 斩杀按钮（仅背题和错题模式显示） */}
            {(mode === 'study' || mode === 'review') && killCurrentQuestion && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleKill();
                }}
                className="px-3 sm:px-4 py-2 bg-red-600/20 text-red-300 border border-red-500/50 rounded-lg sm:rounded-xl hover:bg-red-600/30 transition-all flex items-center gap-1 sm:gap-2"
                title="斩杀此题"
              >
                <Swords className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">斩杀</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

{/* 考试结果展示组件 */}
function ExamResultView({ 
  result, 
  onBack,
}: { 
  result: ExamResult; 
  onBack: () => void;
}) {
  // 获取错题列表
  const wrongQuestions = result.questions.filter(q => {
    const userAnswer = result.userAnswers.get(q.id);
    return userAnswer !== undefined && userAnswer !== q.answer;
  });

  // 格式化时间
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            返回主菜单
          </button>
          <div className="text-sm text-gray-400">
            {new Date(result.submittedAt).toLocaleString('zh-CN')}
          </div>
        </div>

        {/* 成绩卡片 */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-2xl p-8 mb-8 text-center">
          <div className="text-6xl mb-4">
            {result.accuracy >= 90 ? '🎉' : result.accuracy >= 75 ? '😊' : result.accuracy >= 60 ? '😐' : '😥'}
          </div>
          <h2 className="text-4xl font-bold mb-2">
            {result.accuracy >= 90 ? '优秀！' : result.accuracy >= 75 ? '良好！' : result.accuracy >= 60 ? '及格' : '再努力！'}
          </h2>
          <div className="text-5xl font-bold my-6">
            {result.correctCount} / {result.totalCount}
          </div>
          <div className="text-2xl mb-4">
            正确率: <span className="font-bold">{result.accuracy}%</span>
          </div>
          <div className="text-lg text-white/80">
            用时: {formatDuration(result.duration)}
          </div>
        </div>

        {/* 错题展示 */}
        {wrongQuestions.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold text-red-400">
                本次考试错题 ({wrongQuestions.length}道)
              </div>
            </div>
            
            {wrongQuestions.map((question, index) => {
              const mnemonic = getMnemonic(question);
              const userAnswer = result.userAnswers.get(question.id);
              
              return (
                <div
                  key={question.id}
                  className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
                >
                  {/* 题目头部 */}
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 border-b border-gray-600">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-400">错题 #{index + 1}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          question.type === 'single'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-400'
                            : question.type === 'multi'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-400'
                            : 'bg-green-500/20 text-green-300 border border-green-400'
                        }`}>
                          {question.type === 'single' && '单选'}
                          {question.type === 'multi' && '多选'}
                          {question.type === 'boolean' && '判断'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 题干 */}
                  <div className="px-6 py-4">
                    <p className="text-base leading-relaxed text-gray-200">
                      {question.stem}
                    </p>
                  </div>

                  {/* 选项 */}
                  <div className="px-6 pb-4 space-y-2">
                    {question.options.map((option, idx) => {
                      const optionKey = String.fromCharCode(65 + idx);
                      const isCorrect = question.answer.includes(option.key);
                      const isUserAnswer = userAnswer === option.key || userAnswer?.includes(option.key);

                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-2 ${
                            isUserAnswer && !isCorrect
                              ? 'border-red-500 bg-red-500/10'
                              : isCorrect
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-gray-600 bg-gray-700/30'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                                isUserAnswer && !isCorrect
                                  ? 'bg-red-500 text-white'
                                  : isCorrect
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-600 text-gray-300'
                              }`}>
                                {optionKey}
                              </span>
                              <span className="text-sm text-gray-200 flex-1">{option.text}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {isUserAnswer && !isCorrect && (
                                <span className="text-xs px-2 py-0.5 bg-red-600 text-white rounded-full whitespace-nowrap">
                                  ❌ 你选的
                                </span>
                              )}
                              {isCorrect && (
                                <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded-full whitespace-nowrap">
                                  ✅ 正确
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 解析 */}
                  <div className="px-6 pb-4 space-y-3">
                    <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded-r-lg">
                      <div className="font-bold text-blue-300 mb-1 text-sm flex items-center gap-2">
                        <span>💡</span>
                        <span>解析</span>
                      </div>
                      <div className="text-blue-100 text-sm leading-relaxed">{question.explain}</div>
                    </div>

                    {mnemonic && (
                      <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 rounded-r-lg">
                        <div className="font-bold text-yellow-300 mb-1 text-sm flex items-center gap-2">
                          <span>🎯</span>
                          <span>助记口诀</span>
                        </div>
                        <div className="text-yellow-100 text-sm leading-relaxed">{mnemonic}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-2xl font-bold text-gray-200 mb-2">全部答对！</div>
            <div className="text-gray-400">太棒了，没有一道错题！</div>
          </div>
        )}
      </div>
    </div>
  );
}
