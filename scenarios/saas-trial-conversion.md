# SaaS 试用转付费诊断报告

> 场景用途：把漏斗、渠道转化对比、指标卡与结论文字组织成一份增长诊断报告，回答“试用链条哪一环流失最重、哪个渠道质量最差”。

## 适用场景

- **目标用户**：SaaS 产品的增长 / 运营团队，负责试用转化与渠道投放决策
- **要回答的问题**：本期试用用户在哪一步掉得最多？哪个渠道的付费转化明显低于整体？应该先修哪一环？
- **何时使用**：需要一次性给出“现状 + 归因 + 行动建议”的周报/月报；单一图表无法覆盖从阶段流失到渠道差异的判断
- **何时不用**：只想看单一趋势 → 用 `charts/line.md`；只想看某个渠道明细 → 用 `charts/bar.md`；没有统一统计口径的数据不适合本场景

## 组成部分与分析目标

| 组成部分 | 作用 | 对应能力 |
|---|---|---|
| 指标卡（4 项） | 给出全局基线：试用量、激活率、付费转化、续订率 | 原生 DOM，数值由源数据计算 |
| 转化漏斗（左） | 定位阶段流失，回答“哪一环掉得最多” | [charts/funnel.md](../charts/funnel.md) |
| 渠道转化条形图（右） | 对比渠道质量，回答“哪个渠道拖后腿” | [charts/bar.md](../charts/bar.md) |
| 结论文字 | 把两处图表读数转成可执行建议，保证与图表同口径 | 由同一份计算结果生成 |

三部分围绕同一目标：指标卡定基线，漏斗与条形图分别回答“链条内”和“渠道间”的问题，结论只做汇总，不引入新数字。

## 输入与数据口径

源数据为两张自包含的长表，均按人员计数，单位统一为“人”：

```ts
const stages = [
  { stage: '注册试用', users: 4820 },
  { stage: '完成引导', users: 3240 },
  { stage: '创建项目', users: 2186 },
  { stage: '邀请成员', users: 1375 },
  { stage: '发起付费', users: 1026 },
  { stage: '30 天续订', users: 654 },
];

const channels = [
  { channel: '自助注册', trials: 2140, paid: 502 },
  { channel: '内容营销', trials: 1180, paid: 268 },
  { channel: '伙伴推荐', trials: 860, paid: 208 },
  { channel: '付费投放', trials: 640, paid: 48 },
];
```

口径与计算方式（全文唯一来源）：

| 指标 | 定义 | 计算 |
|---|---|---|
| 注册试用 | 本期新注册试用人数 | `stages[0].users` = 4,820 |
| 激活率 | 创建首个项目的用户占试用用户比例 | `stages[2].users / stages[0].users` |
| 试用 → 付费转化 | 发起付费用户占试用用户比例 | `stages[4].users / stages[0].users` |
| 30 天续订率 | 付费后 30 天续订占付费用户比例 | `stages[5].users / stages[4].users` |
| 渠道转化率 | 该渠道付费人数 / 该渠道试用人数 | `paid / trials` |

一致性约束：

- 渠道表的 `trials` 合计必须等于 `stages[0].users`（2,140 + 1,180 + 860 + 640 = 4,820）
- 渠道表的 `paid` 合计必须等于 `stages[4].users`（502 + 268 + 208 + 48 = 1,026）
- 指标卡、图表、结论文字都从上述变量计算，不重复硬编码数值

## 实现步骤

1. **从空 `#container` 构建结构**：脚本获取 `#container`，清空后按“标题 → 指标卡 → 双图 → 结论”的顺序创建 DOM，所有样式内联，不依赖外部 CSS。
2. **先算后画**：在渲染任何图表前，把试用总量、激活率、付费转化、续订率、渠道转化率全部算好，后续三处展示共用这些变量。
3. **漏斗图**：`type: 'interval'` + `encode.shape: 'funnel'` + `transform: [{ type: 'symmetryY' }]` + 转置坐标系，关闭坐标轴与图例，标签放在图形内。
4. **渠道条形图**：同一 `interval` 配合转置坐标系，`y` 用百分比数值，固定 `scale.y.domain: [0, 30]`，让四个渠道的柱长可直接比较。
5. **结论文字**：从计算结果里取最大流失环节与最差渠道，动态拼出结论，不写死数字。
6. **布局**：两个图表容器给固定高度（380px），`Chart` 统一 `autoFit: true`，由容器决定尺寸。

关键片段（与案例实现一致）：

```ts-snippet
const funnelChart = new Chart({ container: funnelEl, autoFit: true });
funnelChart.options({
  type: 'interval',
  data: stages,
  encode: { x: 'stage', y: 'users', color: 'stage', shape: 'funnel' },
  coordinate: { transform: [{ type: 'transpose' }] },
  transform: [{ type: 'symmetryY' }],
  axis: false,
  legend: false,
});
```

```ts-snippet
const channelChart = new Chart({ container: channelEl, autoFit: true });
channelChart.options({
  type: 'interval',
  data: channelRows,
  encode: { x: 'channel', y: 'ratePct', color: 'channel' },
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: { y: { domain: [0, 30] } },
  axis: { y: { title: '试用 → 付费转化率（%）' } },
  legend: false,
  labels: [{ text: 'rateLabel', position: 'outside' }],
});
```

## 易错点

| ❌ 错误 | ✅ 正确 |
|---|---|
| 指标卡写死百分比，图表用另一套数据 | 全部从同一组 `stages` / `channels` 计算，改数据后三处同步变化 |
| 渠道试用数合计与漏斗首环节不一致 | 在文档中约束合计相等，并在实现里由同一数据源派生 |
| 漏斗用 `type: 'polygon'` 手绘 | 用 `interval` + `encode.shape: 'funnel'` + `symmetryY` |
| 条形图 `y` 用 0.235 这类小数，柱长差异看不清 | 用百分比数值并把 `scale.y.domain` 固定为 `[0, 30]` |
| 图表容器不设高度，`autoFit` 无参照导致高度塌陷 | 父容器给定 `height`，`Chart` 使用 `autoFit: true` |
| 结论里的数字与图表读数对不上 | 结论文字用模板字符串引用计算结果，禁止手写 |

## 完整案例

| 案例 | 场景 | 关键配置 |
|---|---|---|
| [saas-trial-conversion.ts](../examples/scenarios/saas-trial-conversion.ts) | 试用链条诊断：指标卡 + 漏斗 + 渠道条形 + 动态结论 | 漏斗 `shape: 'funnel'` + `symmetryY`；条形 `y: 'ratePct'`、`scale.y.domain: [0, 30]`；容器 `height: 380px` |

运行方式：在页面中提供空的 `<div id="container"></div>`，引入编译后的案例脚本即可，无需其他 DOM 或外部数据。