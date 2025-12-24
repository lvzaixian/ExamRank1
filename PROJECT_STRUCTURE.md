# ExamRank1 - 网络服务与安全期末复习系统

## 📁 项目结构说明

```
ExamRank1/
├── src/
│   ├── components/           # UI 组件层
│   │   ├── layout/          # 布局组件 (Header, Footer, Sidebar)
│   │   ├── exam/            # 考试相关组件 (QuestionCard, OptionButton, ExplanationPanel)
│   │   └── dashboard/       # 面板组件 (Progress, Stats, WrongQuestionList)
│   │
│   ├── data/                # 数据层
│   │   ├── question_bank.ts # 原始题目数据 (从 HTML 提取后存放于此)
│   │   └── mnemonics.ts     # AI 助记口诀映射表
│   │
│   ├── hooks/               # 逻辑层 (Custom Hooks)
│   │   ├── useExamEngine.ts # 核心引擎: 题目切换、计分、错题记录
│   │   └── useShuffle.ts    # 选项乱序工具 Hook
│   │
│   ├── types/               # TypeScript 类型定义 (Single Source of Truth)
│   │   └── index.ts         # ✅ 已完成: 核心接口定义
│   │
│   ├── utils/               # 工具函数层
│   │   ├── storage.ts       # LocalStorage 持久化逻辑
│   │   └── cleaner.ts       # 数据清洗与验证
│   │
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # Tailwind CSS 全局样式
│
├── tailwind.config.js       # Tailwind CSS 配置
├── postcss.config.js        # PostCSS 配置
└── package.json             # 项目依赖
```

## 🎯 核心功能模块

### 1️⃣ 背题模式 (Study Mode)
- 顺序展示所有题目
- 支持高亮关键词
- 显示 AI 助记口诀
- 立即显示答案解析

### 2️⃣ 刷题模式 (Practice Mode)
- 选项随机乱序
- 选错后强制停留并显示解析
- 自动记录错题

### 3️⃣ 错题回顾 (Review Mode)
- 仅显示历史错题
- 按错误次数排序
- 支持移出错题本

### 4️⃣ 模拟考试 (Exam Mode)
- 随机抽取题目 (单选12/多选10/判断15)
- 计时功能
- 提交后显示成绩报告

## 🛠️ 技术栈

- **构建工具**: Vite
- **框架**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **数据持久化**: LocalStorage

## 📦 已安装依赖

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "typescript": "~5.6.2",
    "vite": "^6.0.1",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20"
  }
}
```

## 🚀 快速开始

```bash
# 安装依赖 (已完成)
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## ✅ 当前进度

- [x] 项目初始化 (Vite + React + TypeScript)
- [x] Tailwind CSS 配置
- [x] 项目目录结构搭建
- [x] 核心类型定义 (`src/types/index.ts`)
- [ ] 数据层: 题目数据结构 (`src/data/question_bank.ts`)
- [ ] 工具层: LocalStorage 封装 (`src/utils/storage.ts`)
- [ ] 逻辑层: 考试引擎 Hook (`src/hooks/useExamEngine.ts`)
- [ ] UI 层: 题目卡片组件 (`src/components/exam/QuestionCard.tsx`)
- [ ] 主应用整合 (`src/App.tsx`)

## 📝 下一步

1. 从 `网络服务与安全.html` 提取题目数据
2. 创建 `question_bank.ts` 数据文件
3. 实现 `useExamEngine` 核心逻辑
4. 开发 UI 组件
5. 整合功能模块
