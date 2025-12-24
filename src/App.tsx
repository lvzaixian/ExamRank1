import React, { useEffect, useState } from 'react';
import { BookOpen, Brain, RotateCcw, FileText, Database, Trash2, Sparkles } from 'lucide-react';
import { getFullStats } from './data';
import ExamEngineTest from './components/ExamEngineTest';
import TrashBin from './components/TrashBin';
import KnowledgeSnapshot from './components/KnowledgeSnapshot';
import { loadProgress, saveProgress } from './utils/storage';
import type { ExamMode } from './types';

function App() {
  const [stats, setStats] = useState<ReturnType<typeof getFullStats> | null>(null);
  const [currentMode, setCurrentMode] = useState<ExamMode | null>(null);
  const [showTrashBin, setShowTrashBin] = useState(false);
  const [showSnapshot, setShowSnapshot] = useState(false);
  const [userProgress, setUserProgress] = useState(() => loadProgress());

  // 每次显示垃圾桶时重新加载数据
  useEffect(() => {
    if (showTrashBin) {
      setUserProgress(loadProgress());
    }
  }, [showTrashBin]);

  // 每次从学习模式返回时也重新加载
  useEffect(() => {
    if (!currentMode) {
      setUserProgress(loadProgress());
    }
  }, [currentMode]);

  useEffect(() => {
    // 加载题库统计信息
    const questionStats = getFullStats();
    setStats(questionStats);
    
    // 在控制台输出详细统计
    console.group('📚 ExamRank1 题库统计');
    console.log('总题数:', questionStats.questionBank.total);
    console.log('单选题:', questionStats.questionBank.single);
    console.log('多选题:', questionStats.questionBank.multi);
    console.log('判断题:', questionStats.questionBank.boolean);
    console.log('数据完整:', questionStats.questionBank.isComplete ? '✅ 是' : '⚠️ 否（待补充）');
    console.log('---');
    console.log('助记覆盖率:', questionStats.mnemonics.coverage);
    console.log('有助记:', questionStats.mnemonics.withMnemonic, '题');
    console.log('无助记:', questionStats.mnemonics.withoutMnemonic, '题');
    console.groupEnd();
  }, []);

  // 处理复原单个题目
  const handleRestore = (questionId: string) => {
    const newKilled = new Set(userProgress.killedQuestions);
    newKilled.delete(questionId);
    const newProgress = {
      ...userProgress,
      killedQuestions: newKilled,
      lastActiveTime: Date.now(),
    };
    setUserProgress(newProgress);
    saveProgress(newProgress);
  };

  // 处理批量复原
  const handleRestoreAll = () => {
    const count = userProgress.killedQuestions.size;
    if (count === 0) return;
    
    if (window.confirm(`确定要复原所有 ${count} 道已斩杀的题目吗？`)) {
      const newProgress = {
        ...userProgress,
        killedQuestions: new Set<string>(),
        lastActiveTime: Date.now(),
      };
      setUserProgress(newProgress);
      saveProgress(newProgress);
    }
  };

  // 处理在垃圾桶中复习题目
  const handleReview = (_questionId: string) => {
    // 关闭垃圾桶，进入背题模式并跳转到该题
    alert('此功能将在垃圾桶中查看题目，不需跳转到其他模式');
  };

  // 如果显示知识快照
  if (showSnapshot) {
    return <KnowledgeSnapshot onBack={() => setShowSnapshot(false)} />;
  }

  // 如果显示垃圾桶
  if (showTrashBin) {
    return (
      <TrashBin
        killedQuestions={userProgress.killedQuestions}
        onBack={() => setShowTrashBin(false)}
        onRestore={handleRestore}
        onRestoreAll={handleRestoreAll}
        onReview={handleReview}
      />
    );
  }

  // 如果选择了模式，显示学习界面
  if (currentMode) {
    return (
      <ExamEngineTest 
        initialMode={currentMode} 
        onBack={() => setCurrentMode(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 sm:mb-4">
            ExamRank1
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            网络服务与安全 - 期末突击复习系统
          </p>
        </div>

        {/* 知识快照按钮 - 突出显示 */}
        <div className="max-w-6xl mx-auto mb-8">
          <button
            onClick={() => setShowSnapshot(true)}
            className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-7 h-7" />
            <div className="text-left">
              <div className="font-bold text-xl">📸 知识快照</div>
              <div className="text-sm opacity-90">5分钟快速梳理244道题核心知识点 · 背题前必看</div>
            </div>
            <Sparkles className="w-7 h-7" />
          </button>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* 背题模式 */}
          <ModeCard
            icon={<BookOpen className="w-12 h-12" />}
            title="背题模式"
            description="顺序学习，高亮关键词，助记"
            color="bg-blue-500"
            hoverColor="hover:bg-blue-600"
            onClick={() => setCurrentMode('study')}
          />

          {/* 刷题模式 */}
          <ModeCard
            icon={<Brain className="w-12 h-12" />}
            title="刷题模式"
            description="选项乱序，错题强制复习"
            color="bg-green-500"
            hoverColor="hover:bg-green-600"
            onClick={() => setCurrentMode('practice')}
          />

          {/* 错题回顾 */}
          <ModeCard
            icon={<RotateCcw className="w-12 h-12" />}
            title="错题回顾"
            description="专注错题，针对性复习"
            color="bg-orange-500"
            hoverColor="hover:bg-orange-600"
            onClick={() => setCurrentMode('review')}
          />

          {/* 模拟考试 */}
          <ModeCard
            icon={<FileText className="w-12 h-12" />}
            title="模拟考试"
            description="真实模拟，计时评分"
            color="bg-purple-500"
            hoverColor="hover:bg-purple-600"
            onClick={() => setCurrentMode('exam')}
          />
        </div>

        {/* 垃圾桶按钮 */}
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8">
          <button
            onClick={() => setShowTrashBin(true)}
            className="w-full sm:w-auto mx-auto flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-bold text-base sm:text-lg">
              垃圾桶
              {userProgress.killedQuestions.size > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                  {userProgress.killedQuestions.size}
                </span>
              )}
            </span>
          </button>
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">
            查看和管理已斩杀的题目
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-12 sm:mt-16 text-center">
          {/* 题库状态卡片 */}
          {stats && (
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-2xl mx-auto mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">题库状态</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.questionBank.total}</div>
                  <div className="text-xs text-gray-600 mt-1">总题数</div>
                </div>
                <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.questionBank.single}</div>
                  <div className="text-xs text-gray-600 mt-1">单选题</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">{stats.questionBank.multi}</div>
                  <div className="text-xs text-gray-600 mt-1">多选题</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.questionBank.boolean}</div>
                  <div className="text-xs text-gray-600 mt-1">判断题</div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-0 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-600">助记覆盖率: </span>
                    <span className="font-bold text-indigo-600">{stats.mnemonics.coverage}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">数据完整: </span>
                    <span className={`font-bold ${stats.questionBank.isComplete ? 'text-green-600' : 'text-orange-600'}`}>
                      {stats.questionBank.isComplete ? '✅ 是' : '⚠️ 待补充'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-gray-500">
            <p className="text-sm">
              ✅ 项目架构已完成 | 数据层已就绪 | 类型系统已就绪
            </p>
            <p className="text-xs mt-2">
              技术栈: React + TypeScript + Tailwind CSS + Vite
            </p>
          </div>
          
          {/* 版权信息 */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              © 2025 小红书@元认知星图 版权所有
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ModeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  onClick?: () => void;
}

function ModeCard({ icon, title, description, color, hoverColor, onClick }: ModeCardProps) {
  return (
    <div
      onClick={onClick}
      className={`${color} ${hoverColor} rounded-xl p-5 sm:p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer`}
    >
      <div className="flex justify-center mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold text-center mb-2">{title}</h3>
      <p className="text-sm text-center opacity-90">{description}</p>
    </div>
  );
}

export default App;
