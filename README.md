# 地服公司两场生产运行态势 (Dual Airport Command Dashboard v1.2)

专为双机场联合运行指挥设计的下一代态势感知大屏。本项目采用现代化的可视化技术，强调高性能渲染以及“幽灵态深空科技 (Ghostly Deep Tech)”美学风格。

![Dashboard Preview](./screenshot.png)
*(此处可替换为项目截图)*

## 🎨 视觉风格: 幽灵态深空 (Ghostly Deep Tech)

v1.2 版本进一步优化了视觉系统，旨在打造沉浸式且冷静的指挥中心体验：

- **色调 (Palette)**: 严格控制的冷色调单色系 (Slate / Indigo / Blue / Emerald)，营造专业且高对比度的阅读环境。
- **动态数字**: 关键指标采用 Rajdhani 科技字体，支持数字呼吸灯效果（Breathe Animation）以及极端值自动高亮。
- **液态转场 (Liquid Transitions)**: 页面切换伴随 1500ms 的平滑淡入淡出效果，确保视觉传达的连续性。
- **自适应布局**: 全局采用 Flexbox 与 Grid 混合布局，完美适配超宽屏、4K 指挥大屏及各种常规比例显示器。

## 🚦 看板功能 (Key Features)

项目包含四个核心态势感知页面：

1. **综合运行态势**: 展示 A/B 机场的实时运行统计、始发正常率及两场联合保障情况。
2. **指标看板 (Indicators)**: 核心业务指标（起飞正常率、关门正常率等）的横向对比，自动追踪并高亮代理间的最高/最低绩效。
3. **运营看板 (Operations)**: 宏观展示航班架次、旅客吞吐、货邮吞吐的年度目标达成率及进度。
4. **放行看板 (Release)**: 24小时滚动航班高峰预测，支持计划与实际流量的动态对比。

## ⚙️ 自动化与控制 (Automation)

支持通过 URL 参数控制看板的交互行为：

- **自动翻页**: 默认关闭。
- **开启方式**:
  - `?interval=5`: 开启每 5 秒自动循环翻页。
  - `?auto=true`: 开启翻页（默认 10 秒间隔）。
- **交互控制**: 支持键盘左右方向键手动切换页面。

## 🛠️ 技术栈 (Tech Stack)

基于前沿高性能前端技术栈构建：

- **核心框架**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite 7](https://vitejs.dev/)
- **样式引擎**: [Tailwind CSS v4](https://tailwindcss.com/) (极简实用主义类名管理)
- **数据可视化**: [Recharts](https://recharts.org/) (经过自定义封装的柱状图/曲线图)
- **图标系统**: [Lucide React](https://lucide.dev/)
- **单元测试**: [Vitest](https://vitest.dev/) (配合 React Testing Library 确保 100% 覆盖关键逻辑)

## 🚀 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试套件
npm test
```

### 生产环境

```bash
# 静态资源构建
npm run build

# 预览构建产物
npm run preview
```

## 📂 项目结构

- `/components`: UI 组件库，每个组件包含视图逻辑及对应的 `.spec.tsx` 测试文件。
- `/lib/utils.ts`: 通用工具函数（如类名合并 `cn`）。
- `/operationConstants.ts`: 全局业务模拟数据源及格式化逻辑。
- `ThemeContext.tsx`: 全局深色模式/主题管理上下文。

---
*Designed for ultra-wide command center displays.*
