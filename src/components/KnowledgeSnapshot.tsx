import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Sparkles, CheckCircle } from 'lucide-react';
import { getAllModules, getSnapshotStats, type KnowledgeModule } from '../utils/knowledgeSnapshot';

interface KnowledgeSnapshotProps {
  onBack: () => void;
}

export default function KnowledgeSnapshot({ onBack }: KnowledgeSnapshotProps) {
  const [selectedModule, setSelectedModule] = useState<KnowledgeModule | null>(null);
  const modules = getAllModules();
  const stats = getSnapshotStats();

  // 当选择模块或返回模块列表时，滚动到页面顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedModule]);

  // 如果选择了模块，显示详细卡片
  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                setSelectedModule(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              返回模块列表
            </button>
            <div className="text-sm text-gray-500">
              {selectedModule.cards.length} 个知识卡片
            </div>
          </div>

          {/* Module Title */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">{selectedModule.icon}</div>
            <h2 className="text-3xl font-bold text-gray-800">{selectedModule.name}</h2>
          </div>

          {/* Knowledge Cards */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {selectedModule.cards.map((card, index) => (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    selectedModule.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    selectedModule.color === 'green' ? 'bg-green-100 text-green-600' :
                    selectedModule.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    selectedModule.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                    selectedModule.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                    selectedModule.color === 'cyan' ? 'bg-cyan-100 text-cyan-600' :
                    selectedModule.color === 'pink' ? 'bg-pink-100 text-pink-600' :
                    selectedModule.color === 'red' ? 'bg-red-100 text-red-600' :
                    selectedModule.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Key Points */}
                <div className="space-y-3 mb-4">
                  {card.keyPoints.map((point, idx) => {
                    const iconColor = 
                      selectedModule.color === 'blue' ? 'text-blue-500' :
                      selectedModule.color === 'green' ? 'text-green-500' :
                      selectedModule.color === 'purple' ? 'text-purple-500' :
                      selectedModule.color === 'orange' ? 'text-orange-500' :
                      selectedModule.color === 'indigo' ? 'text-indigo-500' :
                      selectedModule.color === 'cyan' ? 'text-cyan-500' :
                      selectedModule.color === 'pink' ? 'text-pink-500' :
                      selectedModule.color === 'red' ? 'text-red-500' :
                      selectedModule.color === 'teal' ? 'text-teal-500' :
                      'text-gray-500';
                    
                    return (
                      <div key={idx} className="flex items-start gap-3 group">
                        <CheckCircle className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
                        <div 
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: point }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Tips */}
                {card.tips && (
                  <div className={`border-l-4 p-4 rounded-r-lg ${
                    selectedModule.color === 'blue' ? 'bg-blue-50 border-blue-400' :
                    selectedModule.color === 'green' ? 'bg-green-50 border-green-400' :
                    selectedModule.color === 'purple' ? 'bg-purple-50 border-purple-400' :
                    selectedModule.color === 'orange' ? 'bg-orange-50 border-orange-400' :
                    selectedModule.color === 'indigo' ? 'bg-indigo-50 border-indigo-400' :
                    selectedModule.color === 'cyan' ? 'bg-cyan-50 border-cyan-400' :
                    selectedModule.color === 'pink' ? 'bg-pink-50 border-pink-400' :
                    selectedModule.color === 'red' ? 'bg-red-50 border-red-400' :
                    selectedModule.color === 'teal' ? 'bg-teal-50 border-teal-400' :
                    'bg-gray-50 border-gray-400'
                  }`}>
                    <div className="text-sm text-gray-700">{card.tips}</div>
                  </div>
                )}

                {/* Related Questions */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>相关题目: {card.relatedQuestions.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 默认显示模块列表
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              onBack();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            返回主菜单
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">知识快照</h1>
            <Sparkles className="w-10 h-10 text-indigo-600" />
          </div>
          <p className="text-lg text-gray-600 mb-2">
            📸 5-10分钟快速建立知识框架
          </p>
          <p className="text-sm text-gray-500">
            基于244道题目提炼的核心知识点 · 背题前必看
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{stats.modules}</div>
              <div className="text-sm text-gray-500">知识模块</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.cards}</div>
              <div className="text-sm text-gray-500">知识卡片</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">{stats.keyPoints}</div>
              <div className="text-sm text-gray-500">核心要点</div>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => {
                setSelectedModule(module);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border-2 ${
                module.color === 'blue' ? 'border-blue-200' :
                module.color === 'green' ? 'border-green-200' :
                module.color === 'purple' ? 'border-purple-200' :
                module.color === 'orange' ? 'border-orange-200' :
                module.color === 'indigo' ? 'border-indigo-200' :
                module.color === 'cyan' ? 'border-cyan-200' :
                module.color === 'pink' ? 'border-pink-200' :
                module.color === 'red' ? 'border-red-200' :
                module.color === 'teal' ? 'border-teal-200' :
                'border-gray-200'
              }`}
            >
              {/* Icon */}
              <div className="text-5xl text-center mb-4">{module.icon}</div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                {module.name}
              </h3>
              
              {/* Stats */}
              <div className="flex justify-center gap-4 text-sm">
                <div className="text-center">
                  <div className={`text-lg font-bold ${
                    module.color === 'blue' ? 'text-blue-600' :
                    module.color === 'green' ? 'text-green-600' :
                    module.color === 'purple' ? 'text-purple-600' :
                    module.color === 'orange' ? 'text-orange-600' :
                    module.color === 'indigo' ? 'text-indigo-600' :
                    module.color === 'cyan' ? 'text-cyan-600' :
                    module.color === 'pink' ? 'text-pink-600' :
                    module.color === 'red' ? 'text-red-600' :
                    module.color === 'teal' ? 'text-teal-600' :
                    'text-gray-600'
                  }`}>
                    {module.cards.length}
                  </div>
                  <div className="text-gray-500 text-xs">知识卡片</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${
                    module.color === 'blue' ? 'text-blue-600' :
                    module.color === 'green' ? 'text-green-600' :
                    module.color === 'purple' ? 'text-purple-600' :
                    module.color === 'orange' ? 'text-orange-600' :
                    module.color === 'indigo' ? 'text-indigo-600' :
                    module.color === 'cyan' ? 'text-cyan-600' :
                    module.color === 'pink' ? 'text-pink-600' :
                    module.color === 'red' ? 'text-red-600' :
                    module.color === 'teal' ? 'text-teal-600' :
                    'text-gray-600'
                  }`}>
                    {module.cards.reduce((sum, c) => sum + c.keyPoints.length, 0)}
                  </div>
                  <div className="text-gray-500 text-xs">核心要点</div>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 line-clamp-2">
                  {module.cards.map(c => c.title).join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            使用建议
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">
                1
              </div>
              <p><strong>快速浏览</strong>：5-10分钟浏览全部模块，建立知识地图</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">
                2
              </div>
              <p><strong>重点标记</strong>：用<mark className="bg-yellow-300 text-gray-800 px-1">高亮</mark>和<strong>粗体</strong>快速定位核心概念</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">
                3
              </div>
              <p><strong>记忆技巧</strong>：关注💡提示和⚠️易错点，辅助记忆</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">
                4
              </div>
              <p><strong>配合背题</strong>：浏览后立即进入背题模式，效果最佳</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
