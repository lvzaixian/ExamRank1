/**
 * 垃圾桶组件 - 管理已斩杀的题目
 * 支持查看、复习、单个复原和批量复原
 */

import { ArrowLeft, Trash2, RotateCcw, RefreshCw } from 'lucide-react';
import { rawQuestions } from '../data/raw_questions';
import type { Question } from '../types';

interface TrashBinProps {
  killedQuestions: Set<string>;
  onBack: () => void;
  onRestore: (questionId: string) => void;
  onRestoreAll: () => void;
  onReview: (questionId: string) => void;
}

export default function TrashBin({
  killedQuestions,
  onBack,
  onRestore,
  onRestoreAll,
  onReview,
}: TrashBinProps) {
  // 获取所有已斩杀的题目
  const killedQuestionsList = rawQuestions.filter(q => killedQuestions.has(q.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* 顶部导航 */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">返回</span>
          </button>

          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" />
            <h1 className="text-base sm:text-lg font-bold">垃圾桶</h1>
            <span className="text-xs sm:text-sm text-gray-400">
              ({killedQuestionsList.length} 题)
            </span>
          </div>

          {killedQuestionsList.length > 0 && (
            <button
              onClick={onRestoreAll}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-xs sm:text-sm"
            >
              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">批量复原</span>
              <span className="sm:hidden">复原</span>
            </button>
          )}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {killedQuestionsList.length === 0 ? (
          // 空状态
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
            <Trash2 className="w-16 h-16 sm:w-20 sm:h-20 mb-4 opacity-50" />
            <h2 className="text-lg sm:text-xl font-bold mb-2">垃圾桶是空的</h2>
            <p className="text-sm sm:text-base text-center">
              还没有斩杀任何题目<br />
              在背题或刷题模式中可以手动斩杀题目
            </p>
          </div>
        ) : (
          // 题目列表
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-300">
                💡 提示：这些题目已被斩杀，不会在其他模式中出现。您可以单个复原或批量复原它们。
              </p>
            </div>

            {killedQuestionsList.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                onRestore={() => onRestore(question.id)}
                onReview={() => onReview(question.id)}
              />
            ))}
          </div>
        )}
        
        {/* 版权信息 */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-gray-700 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 小红书@元认知星图 版权所有
          </p>
        </div>
      </div>
    </div>
  );
}

interface QuestionCardProps {
  question: Question;
  index: number;
  onRestore: () => void;
  onReview: () => void;
}

function QuestionCard({ question, index, onRestore, onReview }: QuestionCardProps) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-700 overflow-hidden">
      {/* 题目头部 */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-600">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
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
            <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-400">
              ⚔️ 已斩杀
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReview}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-yellow-600/20 text-yellow-300 border border-yellow-500/50 rounded-lg hover:bg-yellow-600/30 transition-colors"
            >
              复习
            </button>
            <button
              onClick={onRestore}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-600/20 text-blue-300 border border-blue-500/50 rounded-lg hover:bg-blue-600/30 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>复原</span>
            </button>
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

          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${
                isCorrect
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-gray-600 bg-gray-700/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                  isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {optionKey}
                </span>
                <span className="text-xs sm:text-sm text-gray-200 flex-1">{option.text}</span>
                {isCorrect && (
                  <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded-full whitespace-nowrap">
                    正确
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 解析 */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded-r-lg">
          <div className="font-bold text-blue-300 mb-1 text-xs sm:text-sm flex items-center gap-2">
            <span>💡</span>
            <span>解析</span>
          </div>
          <div className="text-blue-100 text-xs sm:text-sm leading-relaxed">{question.explain}</div>
        </div>
      </div>
    </div>
  );
}
