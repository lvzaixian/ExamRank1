import React, { useEffect, useState } from 'react';
import { BookOpen, Brain, RotateCcw, FileText, Database } from 'lucide-react';
import { getFullStats } from './data';
import ExamEngineTest from './components/ExamEngineTest';

function App() {
  const [stats, setStats] = useState<ReturnType<typeof getFullStats> | null>(null);
  const [showTest, setShowTest] = useState(false);

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

  if (showTest) {
    return <ExamEngineTest />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ExamRank1
          </h1>
          <p className="text-xl text-gray-600">
            网络服务与安全 - 期末突击复习系统
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* 背题模式 */}
          <ModeCard
            icon={<BookOpen className="w-12 h-12" />}
            title="背题模式"
            description="顺序学习，高亮关键词，AI助记"
            color="bg-blue-500"
            hoverColor="hover:bg-blue-600"
            onClick={() => setShowTest(true)}
          />

          {/* 刷题模式 */}
          <ModeCard
            icon={<Brain className="w-12 h-12" />}
            title="刷题模式"
            description="选项乱序，错题强制复习"
            color="bg-green-500"
            hoverColor="hover:bg-green-600"
          />

          {/* 错题回顾 */}
          <ModeCard
            icon={<RotateCcw className="w-12 h-12" />}
            title="错题回顾"
            description="专注错题，针对性复习"
            color="bg-orange-500"
            hoverColor="hover:bg-orange-600"
          />

          {/* 模拟考试 */}
          <ModeCard
            icon={<FileText className="w-12 h-12" />}
            title="模拟考试"
            description="真实模拟，计时评分"
            color="bg-purple-500"
            hoverColor="hover:bg-purple-600"
          />
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          {/* 题库状态卡片 */}
          {stats && (
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Database className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-bold text-gray-800">题库状态</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{stats.questionBank.total}</div>
                  <div className="text-xs text-gray-600 mt-1">总题数</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{stats.questionBank.single}</div>
                  <div className="text-xs text-gray-600 mt-1">单选题</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-orange-600">{stats.questionBank.multi}</div>
                  <div className="text-xs text-gray-600 mt-1">多选题</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-600">{stats.questionBank.boolean}</div>
                  <div className="text-xs text-gray-600 mt-1">判断题</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-around text-sm">
                  <div>
                    <span className="text-gray-600">AI助记覆盖率: </span>
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
      className={`${color} ${hoverColor} rounded-xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer`}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
      <p className="text-sm text-center opacity-90">{description}</p>
    </div>
  );
}

export default App;
