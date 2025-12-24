# 📚 ExamRank1 - 智能刷题系统

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**一个现代化的网络服务与安全课程复习系统，支持多种学习模式和智能记忆辅助**

[✨ 功能特性](#-功能特性) • [🚀 快速开始](#-快速开始) • [📖 使用指南](#-使用指南) • [🛠️ 技术栈](#️-技术栈)

</div>

---

## ✨ 功能特性

### 🎯 四大学习模式

| 模式 | 图标 | 核心特性 | 适用场景 |
|------|------|---------|---------|
| **背题模式** | 📖 | • 顺序学习<br>• 关键词高亮<br>• AI助记口诀<br>• 即时答案解析 | 初次学习、系统掌握 |
| **刷题模式** | ✍️ | • 选项乱序<br>• 错题强制复习<br>• 自动错题记录 | 巩固记忆、自我测试 |
| **错题回顾** | 🔄 | • 仅显示错题<br>• 按错误次数排序<br>• 支持移出错题本 | 针对性复习、查漏补缺 |
| **模拟考试** | 📝 | • 随机抽题组卷<br>• 延迟反馈<br>• 成绩统计与错题分析 | 考前模拟、检验水平 |

### 💡 智能功能

- **🎯 AI 助记口诀**：每道题目配备专业助记口诀，提升记忆效率
- **📊 进度追踪**：实时显示学习进度、正确率、错题数量
- **💾 自动保存**：基于 LocalStorage 的进度持久化，刷新不丢失
- **🎨 阅读模式**：背题/错题模式支持连续阅读视图，快速浏览复习
- **🗑️ 题目管理**：支持"斩杀"功能，已掌握题目不再显示
- **📱 响应式设计**：完美适配桌面端和移动端

### 🌟 模拟考试亮点

- ✅ 智能组卷：错题优先，确保重点题目出现
- ✅ 延迟反馈：答题时不显示对错，模拟真实考试
- ✅ 自动跳转：单选/判断点击选项自动跳转，多选提交后自动跳转
- ✅ 成绩报告：提交后显示分数、正确率、用时、错题列表
- ✅ 考试存档：支持查看历史考试记录

---

## 🚀 快速开始

### 📋 环境要求

- **Node.js**: >= 18.0.0
- **npm** 或 **pnpm**: 推荐使用 pnpm

### 📦 安装

```bash
# 克隆项目
git clone https://github.com/lvzaixian/ExamRank1.git

# 进入项目目录
cd ExamRank1

# 安装依赖（推荐使用 pnpm）
pnpm install

# 或使用 npm
npm install
```

### 🏃 运行

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

访问 `http://localhost:5173` 开始使用！

---

## 📖 使用指南

### 基础操作

1. **选择学习模式**：首页点击相应的模式卡片
2. **答题操作**：
   - 单选/判断：点击选项即可提交
   - 多选：勾选选项后点击"提交答案"
3. **导航控制**：
   - 使用底部"上一题/下一题"按钮
   - 背题模式支持题目网格快速跳转
4. **状态管理**：
   - 重做：清除当前题目的答题记录
   - 已完成：标记为已掌握
   - 斩杀：移除题目（可在垃圾桶恢复）

### 高级功能

#### 阅读模式（背题/错题模式专属）

- 点击右上角图标切换到阅读模式
- 连续显示所有题目，适合快速浏览
- 支持点击题目头部打开题目网格
- 点击正确答案自动标记为已完成

#### 模拟考试流程

1. 进入模拟考试模式
2. 系统自动生成试卷（错题优先）
3. 按顺序完成所有题目
4. 最后一题点击"提交考试"
5. 查看成绩报告和错题分析

---

## 🛠️ 技术栈

### 核心框架

- **React 19.2.3** - UI 框架
- **TypeScript 5.9.3** - 类型系统
- **Vite 7.2.4** - 构建工具

### 样式方案

- **Tailwind CSS 4.1.18** - 原子化 CSS 框架
- **Lucide React** - 图标库

### 状态管理

- **React Hooks** - 本地状态管理
- **LocalStorage** - 数据持久化

---

## 📁 项目结构

```
ExamRank1/
├── src/
│   ├── components/           # UI 组件层
│   │   ├── ExamEngineTest.tsx    # 考试引擎主组件
│   │   ├── KnowledgeSnapshot.tsx # 知识快照组件
│   │   └── TrashBin.tsx          # 垃圾桶组件
│   │
│   ├── data/                 # 数据层
│   │   ├── raw_questions.ts      # 题目数据
│   │   ├── converted.json        # 转换后的题目数据
│   │   └── index.ts              # 数据导出
│   │
│   ├── hooks/                # 逻辑层
│   │   ├── useExamEngine.ts      # 核心考试引擎 Hook
│   │   └── useShuffle.ts         # 选项乱序 Hook
│   │
│   ├── types/                # 类型定义
│   │   └── index.ts              # TypeScript 类型定义
│   │
│   ├── utils/                # 工具函数
│   │   ├── storage.ts            # LocalStorage 封装
│   │   ├── examGenerator.ts      # 考试生成器
│   │   ├── mnemonic.ts           # 助记口诀工具
│   │   ├── ai_mnemonics.ts       # AI 生成的助记口诀
│   │   ├── dedicated_mnemonics.ts # 专业助记口诀
│   │   └── knowledgeSnapshot.ts  # 知识快照工具
│   │
│   ├── App.tsx               # 主应用组件
│   └── main.tsx              # 应用入口
│
├── scripts/                  # 脚本工具
│   ├── convert_questions.cjs     # 题目格式转换
│   └── generate_exact_mnemonics.cjs # 助记口诀生成
│
├── docs/                     # 文档
│   ├── datasource.html           # 原始题库数据源
│   └── questions.json            # 题目 JSON 数据
│
├── PROJECT_STRUCTURE.md      # 项目结构说明
├── TYPES_ARCHITECTURE.md     # 类型架构文档
└── README.md                 # 项目说明文档
```

---

## 🎨 核心设计

### 数据模型

```typescript
// 题目类型
interface Question {
  id: string;
  type: 'single' | 'multi' | 'boolean';
  stem: string;
  options: Option[];
  answer: string;
  explain: string;
}

// 用户进度
interface UserProgress {
  answerRecords: AnswerRecord[];
  wrongQuestions: Map<string, WrongQuestion>;
  completedQuestions: Set<string>;
  killedQuestions: Set<string>;
  examHistory: ExamResult[];
}
```

### 学习模式

| 模式 | 题目顺序 | 选项乱序 | 显示历史 | 自动保存 |
|------|---------|---------|---------|---------|
| study | 固定顺序 | ❌ | ✅ | ✅ |
| practice | 随机乱序 | ✅ | ❌ | ✅ |
| review | 错误次数降序 | ❌ | ✅ | ✅ |
| exam | 智能生成 | ✅ | ❌ | 仅记录 |

---

## 🔧 开发指南

### 添加新题目

1. 编辑 `src/data/raw_questions.ts`
2. 按照现有格式添加题目数据
3. 运行转换脚本（如需要）

### 自定义助记口诀

编辑 `src/utils/dedicated_mnemonics.ts`：

```typescript
export const dedicatedMnemonics: Record<string, string> = {
  '题目ID': '助记口诀内容',
  // ...
};
```

### 构建部署

```bash
# 构建生产版本
pnpm build

# 输出目录: dist/
# 部署到静态服务器或 GitHub Pages
```

---

## 📊 数据统计

- **题目总数**: 300+ 道
- **覆盖知识点**: 网络服务与安全课程全部章节
- **助记口诀**: 200+ 条专业助记
- **代码量**: 20,000+ 行

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---

## 👨‍💻 作者

**lvzaixian**

- GitHub: [@lvzaixian](https://github.com/lvzaixian)

---

## 🙏 致谢

- 感谢所有贡献者的付出
- 特别感谢网络服务与安全课程的老师们

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！⭐**

Made with ❤️ by lvzaixian

</div>
