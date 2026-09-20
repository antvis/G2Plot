# G2Plot v3：Prompt 驱动的可视化组件知识库

- 日期：2026-09-20
- 分支：`v3`
- 状态：已确认，待实施

## 1. 背景与定位

G2Plot v2 是基于 G2 4.x 的 JS 运行时图表库，官方已声明不会基于 G2 v5 封装 v3。

v3 重新定义为一个**非 JS 运行时库**的产品：一套「提示词 + G2 v5 案例代码」的结构化知识库，供 AI Coding Agent 读取后为开发者生成图表代码。

典型使用链路：

```
开发者: "我要做一个多折线图，数据是 xxx"
  → AI Coding Agent 匹配到 charts/line.md
  → 按提示词中的数据要求 + 内联案例代码
  → 生成原生 G2 v5 代码，写入开发者项目
```

### 与 GPT-Vis 的差异化

| | GPT-Vis | G2Plot v3 |
|---|---|---|
| 场景 | 运行时渲染 | 出码（codegen） |
| 产物 | 私有 vis 语法，运行时由库渲染 | 开发者项目中的原生 G2 v5 代码 |
| 代码归属 | 依赖 GPT-Vis 运行时 | 代码归开发者，可自由修改 |

两者互补，不构成重复建设。

### 核心价值：防 v4/v2 幻觉

G2 v4 → v5 API 破坏性变化（`.position('time*value')` → `.encode('x', 'time')`），AI 训练语料中大量 v4 / G2Plot v2 写法，生成 v5 代码幻觉严重。每个图表文件内置「易错点（v4 → v5）」对照是本库的核心差异化内容。

## 2. 产品形态

**纯 Skill 形态**（已确认方案 A）。内容即产品，无运行时、无 CLI（CLI 作为后续可选增强）、无 MCP Server。

全 Agent 兼容：Claude Code、CodeFuse、Cursor、通用 markdown 消费。通过「单一内容源 + 多处入口适配」实现——图表知识只维护一份（`charts/*.md`），`SKILL.md` / `AGENTS.md` 只做索引与转发。

## 3. 仓库结构

```
G2Plot (v3 分支)
├── AGENTS.md                    # 通用 Agent 入口（Cursor / Copilot 等）
├── README.md                    # 人类可读说明 + 手动用法
├── skills/
│   └── g2plot-v3/
│       └── SKILL.md             # Skill 标准入口：图表选型决策树 + 文件索引
├── charts/                      # 提示词文件：选型 + 数据要求 + 内联精简片段
│   ├── line.md
│   └── ...
├── examples/                    # ★ 事实源：完整可运行案例（按图表/变体组织）
│   ├── line/
│   │   ├── basic.ts
│   │   └── multi-series.ts
│   └── ...
├── references/                  # 跨图表共享知识
│   ├── g2-v5-cheatsheet.md      # v5 API 速查（spec / encode / transform）
│   ├── v4-to-v5-migration.md    # v4→v5 差异对照
│   └── data-patterns.md         # 常见数据格式与转换模式
├── scripts/
│   └── validate.ts              # 提取 md 中 ts 代码块做编译校验
└── docs/design-docs/            # 设计文档
```

已确认的决策：
- **examples/ 独立目录**（2026-09-20 修订）：完整可运行案例放 examples/<chart>/<variant>.ts，作为事实源被 tsc 直接强校验；md 中只内联教学精简片段。校验可靠性与 IDE 支持优于纯内联方案
- **渐进式披露**：SKILL.md 只放选型决策树和索引，Agent 按需加载单个图表文件

## 4. 内容标准

### 4.1 charts/xxx.md 统一模板

```markdown
# Line 折线图

## 何时使用 / 何时不用
（帮 AI 做对选型：连续变量趋势用 line；类别对比用 column；占比用 pie）

## 数据要求
（字段类型、series 分组字段、示例数据）

## 基础实现（G2 v5）
（核心 spec 精简片段内联，完整版指向 examples/<chart>/basic.ts）

## 常见变体
（每个变体：一句话说明 + 差异代码片段 + 指向 examples/<chart>/<variant>.ts）

## 易错点（v4 → v5）
（❌ 旧写法 → ✅ 新写法 对照表）
```

### 4.2 SKILL.md 职责

仅包含：
- 图表选型决策树（数据特征 / 意图 → 图表类型 → 读哪个文件）
- 图表文件索引表
- references/ 的使用指引

不包含具体图表代码。

### 4.3 代码示例规范

- 统一使用 G2 v5 spec 写法：

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'line',
  data: [/* ... */],
  encode: { x: 'time', y: 'value' },
});

chart.render();
```

- 示例数据自包含（不依赖外部接口），字段名语义化
- **examples/ 是事实源**：完整案例以 examples/<chart>/<variant>.ts 为准，md 内联片段是从中提炼的教学精简版，两者需保持同步
- examples/ 下每个 .ts 文件必须能被 scripts/validate.ts 编译通过；md 内联代码块同样纳入校验

## 5. MVP 范围

首批 10 个高频图表（与 v2 分类对齐）：

| 图表 | 文件 | 覆盖变体 |
|---|---|---|
| 折线图 | charts/line.md | 基础、多系列、平滑、阶梯 |
| 柱状图 | charts/column.md | 基础、分组、堆叠、百分比 |
| 条形图 | charts/bar.md | 基础、分组、堆叠 |
| 饼图 | charts/pie.md | 基础、环图、玫瑰图 |
| 面积图 | charts/area.md | 基础、堆叠、百分比 |
| 散点图 | charts/scatter.md | 基础、气泡图 |
| 双轴图 | charts/dual-axes.md | 柱线混合 |
| 雷达图 | charts/radar.md | 基础、多系列 |
| 热力图 | charts/heatmap.md | 基础、日历热力 |
| 漏斗图 | charts/funnel.md | 基础、对比漏斗 |

跑通流程（含校验）后，再按 v2 的 36 个图表补齐剩余 26 个。

## 6. 质量保障

- `scripts/validate.ts` 两级校验：
  1. **强校验（主）**：`tsc` 直接编译 `examples/**/*.ts`，类型对齐 @antv/g2 v5（不渲染）
  2. **弱校验（保底）**：提取 md 中的 ts 代码块做编译，防止内联片段腐烂
- 提交前本地跑通，后续接 CI
- 每个图表内容以「AI 生成正确率」为验收标准：用真实 Agent 跑一遍出码流程，验证生成代码可用

## 7. 分支与命名

- 分支：`v3`，基于 master 正常 checkout，v2 代码文件已通过单个 commit 删除，完整 commit 历史与贡献记录保留
- skill 名：`g2plot-v3`（仓库内延续 v3 概念；若未来对外正式发布，需再评估与官方命名冲突问题）

## 8. 实施路线图

1. 仓库骨架：AGENTS.md、skills/g2plot-v3/SKILL.md（决策树先行，索引随图表补充）
2. references/ 三份共享文档（v5 速查、v4→v5 对照、数据模式）——先写它们，图表文件会引用
3. scripts/validate.ts + 最小 package.json/tsconfig
4. charts/ 首批 10 个图表，每个写完即过 validate
5. 真实 Agent 出码验收（每个图表至少 1 次端到端生成验证）
6. 补齐剩余 26 个图表（后续迭代）
