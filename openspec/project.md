# Project Context

## Purpose
本项目旨在为“HNUSEC（海南大学网络安全团队）”开发并维护官方门户网站。该平台作为团队的对外窗口，用于展示团队风采、发布安全文章、集成CTF竞赛入口以及招募新成员，致力于营造一个专业且具有科技感的网络安全学术氛围。

## Tech Stack
- 前端框架：React / Next.js
- 样式处理：Tailwind CSS (配合高度自定义的配置文件)
- 图标库：Lucide React / Phosphor Icons (线性简约风格)
- 字体：系统默认无衬线字体 (标题) + JetBrains Mono / Fira Code (代码及终端展示) 

## Project Conventions

### Code Style
- 遵循领域驱动设计，组件逻辑与 UI 分离。
- 使用 TypeScript 进行严格类型检查。
- 样式命名参考 Tailwind 类名规范，复杂组件提取为独立配置文件。

### Architecture Patterns
- **极简极客风 (Minimalist Tech Style)**：整体界面保持高留白，通过微妙的几何图形和代码片段水印增强行业辨识度。
- **终端模拟设计 (Terminal Simulation)**：关键信息（如团队简介、工具指令）采用模拟终端窗口展示。

### UI/UX Design Specifications (基于截图总结)
- **色调规范**：以浅灰/淡紫白为背景底色 (#F4F4F9 左右)，主色调采用紫罗兰色 (#7B61FF) 作为强调色。
- **按钮设计**：
    - *普通按钮*：圆角矩形（Radius: 6px-8px），细线边框 (1px)，背景透明或极淡灰色，左侧配有线性图标。
    - *强调按钮 (如 HNUCTF)*：实色填充（紫色），白色文字，增加视觉焦点。
    - *幽灵按钮 (底部)*：极简边框，用于次要交互。
- **标题规范**：
    - 主 Logo (HNUSEC)：大写、加粗、无衬线黑体，强调力量感。
    - 副标题：标准黑体，字间距适中，颜色为深灰色。
- **布局元素**：
    - 使用带阴影或细边框的卡片容器包裹代码内容。
    - 装饰性元素：背景包含淡色代码片段 (`sudo nmap`, `function...`) 和坐标轴图形。
    - 时间轴：侧边垂直排列年份标识（如 2018-2025）。

### Testing Strategy
- 确保所有模拟终端组件在不同屏幕尺寸下的响应式兼容。
- 验证深浅色模式切换时的对比度符合安全审计审美。

### Git Workflow
- 功能开发使用 `feat/` 分支，样式调整使用 `style/` 分支，遵循 Conventional Commits。

## Domain Context
HNUSEC 专注于网络攻防技术研究、CTF 竞赛训练、安全意识普及和校园网络安全维护。所有设计语言应体现“安全、严谨、极客、创新”的核心价值。

## Important Constraints
- 界面必须保持极简，严禁过度装饰和高饱和度色彩堆砌。
- 文本内容（尤其是终端模拟器内）需支持 Markdown 格式解析。
- 必须包含深色模式（Dark Mode）的适配逻辑，参考截图右上角的模式切换。

## External Dependencies