/**
 * 模型升级回归评审报告
 * 场景：发布维护者用同一批样本比较新旧版本并追踪关键回归。
 * 要点：按示例门槛评审质量和耗时，组合条形图、环形图、箱线图与热力图复核结果。
 */
import { Chart, type G2Spec } from '@antv/g2';

interface Sample {
  id: string;
  task: string;
  name: string;
  critical: boolean;
  baseline: boolean;
  candidate: boolean;
  baselineMs: number;
  candidateMs: number;
}

// 为本场景编写的测试数据。每个 ID 对应同一条用例的两次判定。
const samples: Sample[] = [
  { id: 'QA-01', task: '简答生成', name: '查询营业时间', critical: false, baseline: true, candidate: true, baselineMs: 470, candidateMs: 420 },
  { id: 'QA-02', task: '简答生成', name: '查询场馆位置', critical: false, baseline: true, candidate: true, baselineMs: 510, candidateMs: 475 },
  { id: 'QA-03', task: '简答生成', name: '解释预约限制', critical: false, baseline: true, candidate: true, baselineMs: 495, candidateMs: 455 },
  { id: 'QA-04', task: '简答生成', name: '说明有效期限', critical: false, baseline: true, candidate: true, baselineMs: 540, candidateMs: 500 },
  { id: 'QA-05', task: '简答生成', name: '说明退订流程', critical: false, baseline: true, candidate: true, baselineMs: 460, candidateMs: 430 },
  { id: 'QA-06', task: '简答生成', name: '回答是否免票', critical: false, baseline: true, candidate: true, baselineMs: 520, candidateMs: 480 },
  { id: 'QA-07', task: '简答生成', name: '解释跨日开放时间', critical: false, baseline: false, candidate: true, baselineMs: 610, candidateMs: 540 },
  { id: 'QA-08', task: '简答生成', name: '归纳多条预约规则', critical: false, baseline: false, candidate: true, baselineMs: 590, candidateMs: 520 },
  { id: 'QA-09', task: '简答生成', name: '回答节假日例外', critical: false, baseline: false, candidate: true, baselineMs: 630, candidateMs: 550 },
  { id: 'QA-10', task: '简答生成', name: '回答互相冲突的公告', critical: false, baseline: false, candidate: false, baselineMs: 680, candidateMs: 710 },
  { id: 'EXT-01', task: '字段提取', name: '提取订单编号', critical: false, baseline: true, candidate: true, baselineMs: 390, candidateMs: 365 },
  { id: 'EXT-02', task: '字段提取', name: '提取金额与币种', critical: false, baseline: true, candidate: true, baselineMs: 430, candidateMs: 405 },
  { id: 'EXT-03', task: '字段提取', name: '提取取消原因', critical: false, baseline: true, candidate: true, baselineMs: 450, candidateMs: 430 },
  { id: 'EXT-04', task: '字段提取', name: '提取两条行程', critical: false, baseline: true, candidate: true, baselineMs: 480, candidateMs: 439 },
  { id: 'EXT-05', task: '字段提取', name: '提取空值字段', critical: false, baseline: true, candidate: true, baselineMs: 420, candidateMs: 400 },
  { id: 'EXT-06', task: '字段提取', name: '按要求输出标准日期', critical: false, baseline: true, candidate: false, baselineMs: 490, candidateMs: 515 },
  { id: 'EXT-07', task: '字段提取', name: '提取可选备注', critical: false, baseline: false, candidate: true, baselineMs: 560, candidateMs: 505 },
  { id: 'EXT-08', task: '字段提取', name: '拆分多段地址', critical: false, baseline: false, candidate: false, baselineMs: 650, candidateMs: 695 },
  { id: 'INS-01', task: '指令遵循', name: '限定回答语言', critical: false, baseline: true, candidate: true, baselineMs: 510, candidateMs: 480 },
  { id: 'INS-02', task: '指令遵循', name: '遵守回答字数', critical: false, baseline: true, candidate: true, baselineMs: 530, candidateMs: 488 },
  { id: 'INS-03', task: '指令遵循', name: '保留条目原顺序', critical: false, baseline: true, candidate: true, baselineMs: 550, candidateMs: 510 },
  { id: 'INS-04', task: '指令遵循', name: '只输出指定字段', critical: false, baseline: true, candidate: true, baselineMs: 570, candidateMs: 530 },
  { id: 'INS-05', task: '指令遵循', name: '遵循固定回复模板', critical: false, baseline: true, candidate: true, baselineMs: 620, candidateMs: 980 },
  { id: 'INS-06', task: '指令遵循', name: '材料缺失时明确说明', critical: true, baseline: true, candidate: false, baselineMs: 660, candidateMs: 890 },
];

const versions = [
  { key: 'baseline', label: '旧版', color: '#626a77' },
  { key: 'candidate', label: '新版', color: '#364e75' },
] as const;

const outcomes = {
  stablePass: { label: '持续通过', color: '#3a5368', mark: '✓' },
  fixed: { label: '修复', color: '#287666', mark: '↗' },
  regressed: { label: '新增失败', color: '#a33c35', mark: '!' },
  stableFail: { label: '持续失败', color: '#666973', mark: '×' },
} as const;

function outcomeOf(sample: Sample): keyof typeof outcomes {
  if (sample.baseline === sample.candidate) {
    return sample.baseline ? 'stablePass' : 'stableFail';
  }
  return sample.candidate ? 'fixed' : 'regressed';
}

const formatNumber = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });
const percentage = (count: number, total: number) => (total ? count / total * 100 : 0);
const formatRate = (value: number) => `${formatNumber.format(value)}%`;
const milliseconds = (value: number) => `${formatNumber.format(value)} ms`;

function percentile(sorted: number[], fraction: number) {
  const index = (sorted.length - 1) * fraction;
  const lower = Math.floor(index);
  return sorted[lower] + (sorted[Math.ceil(index)] - sorted[lower]) * (index - lower);
}

const paired = samples.map((sample) => ({ ...sample, outcome: outcomeOf(sample) }));
const baselinePassed = paired.filter((sample) => sample.baseline).length;
const candidatePassed = paired.filter((sample) => sample.candidate).length;
const fixed = paired.filter(({ outcome }) => outcome === 'fixed');
const regressions = paired.filter(({ outcome }) => outcome === 'regressed')
  .sort((left, right) => Number(right.critical) - Number(left.critical));
const criticalRegressions = regressions.filter(({ critical }) => critical);
const persistentFailures = paired.filter(({ outcome }) => outcome === 'stableFail');
const candidateFailures = paired.length - candidatePassed;

const tasks = [...new Set([...regressions, ...paired].map(({ task }) => task))];
const taskGroups = tasks.map((task) => ({ task, members: paired.filter((sample) => sample.task === task) }));
const rateData = taskGroups.flatMap(({ task, members }) =>
  versions.map(({ key, label: version }) => {
    const passed = members.filter((sample) => sample[key]).length;
    const rate = percentage(passed, members.length);
    return { task, version, rate, label: formatRate(rate), passed, total: members.length };
  }),
);
const outcomeStyles = Object.values(outcomes);
const transitionData = taskGroups.flatMap(({ task, members }) =>
  Object.entries(outcomes).map(([outcome, { label: result }]) => {
    const count = members.filter((sample) => sample.outcome === outcome).length;
    return { task, result, count, label: count ? String(count) : '' };
  }),
);
const failureData = [
  { ...outcomes.regressed, count: regressions.length },
  { ...outcomes.stableFail, count: persistentFailures.length },
];
const latencyData = versions.flatMap(({ key, label: version }) =>
  paired.map((sample) => ({ version, duration: sample[`${key}Ms`] })),
);
const latencySummary = versions.map(({ label: version }) => {
  const sorted = latencyData.filter((row) => row.version === version).map(({ duration }) => duration).sort((a, b) => a - b);
  return { version, p50: percentile(sorted, 0.5), p95: percentile(sorted, 0.95) };
});
const slowdowns = paired.map(({ id, baselineMs, candidateMs }) => ({
  id, baselineMs, candidateMs, delta: candidateMs - baselineMs,
})).filter(({ delta }) => delta > 0).sort((a, b) => b.delta - a.delta).slice(0, 3);

const ratesTitle = 'model-regression-rates';
const latencyTitle = 'model-regression-latency';
const rowId = (sampleId: string) => `model-regression-case-${sampleId}`;
const firstCritical = criticalRegressions[0];
const candidateRate = percentage(candidatePassed, paired.length);
const worstDrop = Math.max(0, ...taskGroups.map(({ members }) =>
  percentage(members.filter((sample) => sample.baseline).length - members.filter((sample) => sample.candidate).length, members.length),
));
const limits = { passRate: 80, taskDrop: 10, critical: 0, p95: 800 };
const gates = [
  { name: '整体通过率', limit: `≥ ${formatRate(limits.passRate)}`, actual: formatRate(candidateRate), passed: candidateRate >= limits.passRate, target: ratesTitle },
  { name: '关键回归', limit: `${limits.critical} 条`, actual: `${criticalRegressions.length} 条`, passed: criticalRegressions.length <= limits.critical, target: firstCritical && rowId(firstCritical.id) },
  { name: '任务最大降幅', limit: `≤ ${limits.taskDrop} 个百分点`, actual: `${formatNumber.format(worstDrop)} 个百分点`, passed: worstDrop <= limits.taskDrop, target: ratesTitle },
  { name: 'P95 延迟', limit: `≤ ${milliseconds(limits.p95)}`, actual: milliseconds(latencySummary[1].p95), passed: latencySummary[1].p95 <= limits.p95, target: latencyTitle },
];
const failedGateCount = gates.filter(({ passed }) => !passed).length;

const regressionEvidence: Readonly<Record<string, ReadonlyArray<[string, string]> | undefined>> = {
  'INS-06': [
    ['输入', '活动已开始报名，截止日期未公布。请根据材料回答截止日期。'],
    ['预期', '明确说明材料中没有截止日期。'],
    ['旧版', '材料未提供报名截止日期。'],
    ['新版', '报名于 11 月 30 日截止。'],
  ],
  'EXT-06': [
    ['输入', '订单日期：2026/11/03。请以 YYYY-MM-DD 格式输出。'],
    ['预期', '2026-11-03'],
    ['旧版', '2026-11-03'],
    ['新版', '2026/11/03'],
  ],
};
const matrixSamples = [...regressions, ...paired.filter(({ outcome }) => outcome !== 'regressed')];
const matrixData = matrixSamples.flatMap(({ id, baseline, outcome }) => {
  const before = baseline ? outcomes.stablePass : outcomes.stableFail;
  const after = outcomes[outcome];
  return [
    { id, version: '旧版', result: before.label, mark: before.mark },
    { id, version: '新版', result: after.label, mark: after.mark },
  ];
});

function element<K extends keyof HTMLElementTagNameMap>(tag: K, text = '', className = ''): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}

function swatch(color: string, mark = '') {
  const node = element('span', mark, mark ? 'swatch marked' : 'swatch');
  node.style.backgroundColor = color;
  node.setAttribute('aria-hidden', 'true');
  return node;
}

function legend(items: ReadonlyArray<{ label: string; color: string; mark?: string }>, name: string) {
  const list = element('ul', '', 'legend');
  list.setAttribute('role', 'list');
  list.setAttribute('aria-label', name);
  for (const { label, color, mark } of items) {
    const item = element('li');
    item.append(swatch(color, mark), label);
    list.append(item);
  }
  return list;
}

function panel(title: string, id: string, key?: HTMLElement) {
  const section = element('section', '', 'panel');
  const header = element('div', '', 'panel-header');
  const heading = element('h2', title);
  heading.id = id;
  heading.tabIndex = -1;
  header.append(heading);
  if (key) header.append(key);
  section.append(header);
  return section;
}

function startTable(titleId: string, columns: string[]) {
  const table = element('table');
  table.setAttribute('aria-labelledby', titleId);
  const headings = table.createTHead().insertRow();
  for (const label of columns) {
    const heading = element('th', label);
    heading.scope = 'col';
    headings.append(heading);
  }
  return { table, body: table.createTBody() };
}

function rowHeading(row: HTMLTableRowElement, text: string) {
  const heading = element('th', text);
  heading.scope = 'row';
  row.append(heading);
  return heading;
}

function chartHost(className: string, headingId: string, description: string) {
  const host = element('div', '', `chart ${className}`);
  host.setAttribute('role', 'img');
  host.setAttribute('aria-labelledby', headingId);
  host.setAttribute('aria-description', description);
  return host;
}

function renderChart(container: HTMLElement, spec: G2Spec) {
  const chart = new Chart({ container, autoFit: true });
  chart.options({ ...spec, legend: false, tooltip: false, animate: false });
  chart.render();
}

function colorScale(items: ReadonlyArray<{ label: string; color: string }>) {
  return { domain: items.map(({ label }) => label), range: items.map(({ color }) => color) };
}

const container = document.getElementById('container');
if (!container) throw new Error('请先创建 #container。');

const report = element('main', '', 'regression-review');
report.lang = 'zh-CN';
report.style.setProperty('--risk', outcomes.regressed.color);
const styles = element('style', `
  .regression-review {
    --ink: #171b21;
    --muted: #595f6a;
    --line: #e1e4e8;
    --focus: #355d96;
    box-sizing: border-box;
    max-inline-size: 75rem;
    margin-inline: auto;
    padding: clamp(1rem, 4vw, 2.75rem);
    container: review / inline-size;
    color: var(--ink);
    background: #fff;
    font: 1rem/1.5 system-ui, sans-serif;
  }
  .regression-review * { box-sizing: border-box; }
  .regression-review :is(h1, h2, p, dl, dd, ul) { margin: 0; }
  .regression-review h1 { font-size: clamp(1.65rem, 3.8vw, 2.5rem); line-height: 1.2; letter-spacing: -.025em; }
  .regression-review h2 { font-size: 1.0625rem; line-height: 1.35; }
  .regression-review .header, .regression-review .panel-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: .625rem 1rem;
  }
  .regression-review .scope { margin-block-start: .45rem; color: var(--muted); font-size: .8125rem; }
  .regression-review .decision { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem; font-size: .875rem; }
  .regression-review .status {
    padding: .25rem .6rem;
    border: 1px solid var(--line);
    border-radius: .375rem;
    font-weight: 650;
  }
  .regression-review .status.blocked {
    border-color: color-mix(in oklab, var(--risk) 20%, white);
    background: color-mix(in oklab, var(--risk) 8%, white);
    color: var(--risk);
  }
  .regression-review .review-link {
    display: inline-flex;
    align-items: center;
    gap: .35rem;
    min-block-size: 2rem;
    color: #314f7b;
    font-weight: 600;
    text-underline-offset: .2em;
  }
  .regression-review :is(a, summary, .matrix-scroll, h2, tr):focus-visible {
    outline: 2px solid var(--focus);
    outline-offset: 3px;
  }
  .regression-review .metrics {
    display: grid;
    grid-template-columns: 1.35fr repeat(2, minmax(0, 1fr));
    border-block: 1px solid var(--line);
    margin-block-start: 1.5rem;
    gap: 1px;
    background: var(--line);
  }
  .regression-review .metric { background: #fff; padding: .85rem 1rem; }
  .regression-review .metric:first-child { padding-inline-start: 0; }
  .regression-review .metric dt { color: var(--muted); font-size: .8125rem; }
  .regression-review .metric dd, .regression-review .donut-total {
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -.035em;
  }
  .regression-review .metric dd { font-size: clamp(1.65rem, 3.4vw, 2.425rem); white-space: nowrap; line-height: 1.25; }
  .regression-review .metric .prior { color: var(--muted); font-weight: 500; }
  .regression-review :is(.comparison, .failure-breakdown) {
    display: grid;
    column-gap: clamp(1.5rem, 4vw, 3.25rem);
  }
  .regression-review .panel { min-inline-size: 0; padding-block: 1.25rem .875rem; border-block-end: 1px solid var(--line); }
  .regression-review .panel-header { margin-block-end: .6rem; }
  .regression-review :is(.gate-link, summary) { color: #314f7b; text-underline-offset: .2em; }
  .regression-review .gate-link { display: inline-block; padding-block: .15rem; }
  .regression-review .legend, .regression-review .risk-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    column-gap: .75rem;
    row-gap: .3rem;
    font-size: .8125rem;
  }
  .regression-review :is(.legend, .risk-list) li { display: flex; gap: .35rem; align-items: center; }
  .regression-review .swatch {
    display: inline-grid;
    place-items: center;
    flex: 0 0 .55rem;
    block-size: .55rem;
    border-radius: .125rem;
  }
  .regression-review .swatch.marked { flex-basis: .9rem; block-size: .9rem; color: #fff; font-size: .6875rem; }
  .regression-review .chart { block-size: 12rem; }
  .regression-review canvas { display: block; }
  .regression-review .failure-breakdown { row-gap: .75rem; }
  .regression-review .failure-detail { min-inline-size: 0; }
  .regression-review :is(.failure-detail, .latency-tables) h3 { margin: 0 0 .25rem; font-size: .875rem; }
  .regression-review .latency-tables { min-inline-size: 0; }
  .regression-review .latency-tables h3:not(:first-child) { margin-block-start: .85rem; }
  .regression-review .evidence { margin-block-start: .25rem; font-size: .8125rem; font-weight: 400; }
  .regression-review .evidence summary { cursor: pointer; inline-size: fit-content; padding-block: .25rem; }
  .regression-review .evidence dl { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: .25rem .6rem; padding-block: .4rem; }
  .regression-review .evidence dt { color: var(--muted); }
  .regression-review .evidence dd { overflow-wrap: anywhere; }
  .regression-review .risk-body { display: flex; align-items: center; gap: .85rem; }
  .regression-review .donut-frame {
    display: grid;
    place-items: center;
    flex: 0 0 clamp(6.5rem, 28%, 8.75rem);
    min-inline-size: 0;
  }
  .regression-review .donut-frame > * { grid-area: 1 / 1; }
  .regression-review .donut { inline-size: 100%; block-size: 7.75rem; }
  .regression-review .donut-total { position: relative; font-size: 1.35rem; }
  .regression-review .risk-list { flex: 1; display: grid; gap: 0; min-inline-size: 0; }
  .regression-review .risk-list li { justify-content: start; padding-block: .4rem; border-block-end: 1px solid var(--line); }
  .regression-review .risk-list strong { margin-inline-start: auto; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .regression-review table { inline-size: 100%; border-collapse: collapse; font-size: .875rem; }
  .regression-review :is(th, td) { text-align: start; padding: .45rem .65rem; border-block-end: 1px solid var(--line); }
  .regression-review tr > :first-child { padding-inline-start: .3rem; }
  .regression-review tr > :nth-child(n + 2) { white-space: nowrap; }
  .regression-review :is(.gate-table, .latency-tables) :is(th, td) { padding-inline: .3rem; }
  .regression-review .gate-table td { white-space: normal; }
  .regression-review .gate-table td:last-child { white-space: nowrap; }
  .regression-review thead { color: var(--muted); font-size: .8125rem; }
  .regression-review tbody th { font-weight: 600; }
  .regression-review tbody tr:last-child > * { border-block-end: 0; }
  .regression-review tbody tr { scroll-margin-block: 2rem; }
  .regression-review tbody tr:target { background: #f4f7fb; }
  .regression-review .sample-id { display: block; margin-block-end: .125rem; color: var(--muted); font: .75rem ui-monospace, monospace; }
  .regression-review .critical { color: var(--risk); font-weight: 650; }
  .regression-review .matrix-panel { border-block-end: 0; }
  .regression-review .matrix-scroll { overflow-x: auto; }
  .regression-review .matrix-scroll::-webkit-scrollbar { height: .375rem; }
  .regression-review .matrix-scroll::-webkit-scrollbar-track { background: #f0f1f3; }
  .regression-review .matrix-scroll::-webkit-scrollbar-thumb { background: #a2a9b5; border-radius: 1rem; }
  .regression-review .matrix { block-size: 6.5rem; min-inline-size: 66rem; }
  @container review (inline-size >= 53rem) {
    .regression-review .comparison { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .regression-review .comparison .panel {
      display: grid;
      grid-row: span 2;
      grid-template-rows: auto 1fr;
      grid-template-rows: subgrid;
    }
    .regression-review .failure-breakdown { grid-template-columns: minmax(0, 4fr) minmax(0, 5fr); }
  }
  @container review (inline-size < 34rem) {
    .regression-review .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .regression-review .metric:first-child { grid-column: 1 / -1; }
    .regression-review .metric:nth-child(2) { padding-inline-start: 0; }
    .regression-review .gate-table { font-size: .8125rem; }
  }
`);

const header = element('header', '', 'header');
const intro = element('div');
intro.append(
  element('h1', '模型升级回归评审报告'),
  element('p', `测试数据 · ${paired.length} 条用例`, 'scope'),
);
const decision = element('div', '', 'decision');
decision.append(failedGateCount
  ? element('span', `暂缓发布 · ${failedGateCount} 项未通过`, 'status blocked')
  : element('span', '通过示例发布门槛', 'status'));
if (firstCritical) {
  const reviewLink = element('a', `复核 ${firstCritical.id}`, 'review-link');
  const arrow = element('span', '↓');
  arrow.setAttribute('aria-hidden', 'true');
  reviewLink.append(arrow);
  reviewLink.href = `#${rowId(firstCritical.id)}`;
  decision.append(reviewLink);
}
header.append(intro, decision);

const metrics = element('dl', '', 'metrics');
const overall = element('div', '', 'metric');
const overallValue = element('dd');
const priorRate = formatRate(percentage(baselinePassed, paired.length));
const currentRate = formatRate(candidateRate);
overallValue.append(element('span', `${priorRate} → `, 'prior'), currentRate);
overallValue.setAttribute('aria-label', `旧版 ${priorRate}，新版 ${currentRate}`);
overall.append(element('dt', '整体通过率'), overallValue);
metrics.append(overall);
for (const [title, value] of [['修复', fixed.length], ['新增失败', regressions.length]]) {
  const metric = element('div', '', 'metric');
  metric.append(element('dt', String(title)), element('dd', `${value} 条`));
  metrics.append(metric);
}

const gateTitle = 'model-regression-gates';
const gateSection = panel('示例发布门槛', gateTitle);
const gateTable = startTable(gateTitle, ['指标', '门槛', '新版', '结果']);
gateTable.table.className = 'gate-table';
for (const { name, limit, actual, passed, target } of gates) {
  const row = gateTable.body.insertRow();
  const heading = rowHeading(row, name);
  if (!passed && target) {
    const link = element('a', name, 'gate-link');
    link.href = `#${target}`;
    heading.replaceChildren(link);
  }
  row.insertCell().textContent = limit;
  row.insertCell().textContent = actual;
  const status = row.insertCell();
  status.textContent = passed ? '通过' : '未通过';
  if (!passed) status.className = 'critical';
}
gateSection.append(gateTable.table);

const ratesPanel = panel('任务通过率', ratesTitle, legend(versions, '版本'));
const rateChart = chartHost('rate-chart', ratesTitle,
  rateData.map(({ task, version, label, passed, total }) => `${task}，${version} ${label}（${passed}/${total}）`).join('；'),
);
ratesPanel.append(rateChart);

const transitionsTitle = 'model-regression-transitions';
const changePanel = panel('任务结果变化', transitionsTitle, legend(
  outcomeStyles.map(({ label, color }) => ({ label, color })),
  '结果变化',
));
const transitionChart = chartHost('transition-chart', transitionsTitle,
  tasks.map((task) => {
    const counts = transitionData.filter((record) => record.task === task);
    return `${task}：${counts.map(({ result, count }) => `${result} ${count} 条`).join('、')}`;
  }).join('；'),
);
changePanel.append(transitionChart);

const detailTitle = 'model-regression-detail';
const failureDetail = element('div', '', 'failure-detail');
const detailHeading = element('h3', '新增失败明细');
detailHeading.id = detailTitle;
const { table, body } = startTable(detailTitle, ['样本', '任务', '级别']);
for (const sample of regressions) {
  const row = body.insertRow();
  row.id = rowId(sample.id);
  row.tabIndex = -1;
  const name = rowHeading(row, sample.name);
  name.prepend(element('small', sample.id, 'sample-id'));
  const evidence = regressionEvidence[sample.id];
  if (evidence) {
    const disclosure = element('details', '', 'evidence');
    const summary = element('summary', '判定证据');
    summary.setAttribute('aria-label', `判定证据 ${sample.id}`);
    const outputs = element('dl');
    for (const [label, value] of evidence) outputs.append(element('dt', label), element('dd', value));
    disclosure.append(summary, outputs);
    name.append(disclosure);
  }
  row.insertCell().textContent = sample.task;
  const severity = row.insertCell();
  severity.textContent = sample.critical ? '关键' : '一般';
  if (sample.critical) severity.className = 'critical';
}
failureDetail.append(detailHeading, table);

const riskTitle = 'model-regression-risk';
const riskPanel = panel('新版失败', riskTitle);
const riskBody = element('div', '', 'risk-body');
const donutFrame = element('div', '', 'donut-frame');
const donut = chartHost('donut', riskTitle, `共 ${candidateFailures} 条。` +
  failureData.map(({ label, count }) => `${label} ${count} 条，占 ${formatRate(percentage(count, candidateFailures))}。`).join(''),
);
const donutTotal = element('div', `${candidateFailures} 条`, 'donut-total');
donutTotal.setAttribute('aria-hidden', 'true');
donutFrame.append(donut, donutTotal);
const riskList = element('ul', '', 'risk-list');
riskList.setAttribute('role', 'list');
for (const { label, color, count } of failureData) {
  const item = element('li');
  item.append(swatch(color), label, element('strong', `${count} 条 · ${formatRate(percentage(count, candidateFailures))}`));
  riskList.append(item);
}
riskBody.append(donutFrame, riskList);
const failureBreakdown = element('div', '', 'failure-breakdown');
failureBreakdown.append(riskBody, failureDetail);
riskPanel.append(failureBreakdown);

const latencyPanel = panel('端到端延迟', latencyTitle);
const latencyChart = chartHost('latency-chart', latencyTitle,
  latencySummary.map(({ version, p50, p95 }) => `${version}：P50 ${milliseconds(p50)}，P95 ${milliseconds(p95)}`).join('；'),
);
const latencyLayout = element('div', '', 'failure-breakdown');
const latencyTables = element('div', '', 'latency-tables');
const quantileTitle = element('h3', '延迟分位');
quantileTitle.id = 'model-regression-percentiles';
const quantiles = startTable(quantileTitle.id, ['分位', ...versions.map(({ label }) => label)]);
for (const [label, key] of [['P50', 'p50'], ['P95', 'p95']] as const) {
  const row = quantiles.body.insertRow();
  rowHeading(row, label);
  for (const stats of latencySummary) row.insertCell().textContent = milliseconds(stats[key]);
}
const slowdownTitle = element('h3', '耗时增幅前三');
slowdownTitle.id = 'model-regression-slowdowns';
const slowTable = startTable(slowdownTitle.id, ['样本', '旧版', '新版', '增加']);
for (const { id, baselineMs, candidateMs, delta } of slowdowns) {
  const row = slowTable.body.insertRow();
  rowHeading(row, id);
  row.insertCell().textContent = milliseconds(baselineMs);
  row.insertCell().textContent = milliseconds(candidateMs);
  row.insertCell().textContent = `+${milliseconds(delta)}`;
}
latencyTables.append(quantileTitle, quantiles.table, slowdownTitle, slowTable.table);
latencyLayout.append(latencyChart, latencyTables);
latencyPanel.append(latencyLayout);

const matrixTitle = 'model-regression-matrix';
const matrixPanel = panel('样本结果', matrixTitle, legend([
  { ...outcomes.stablePass, label: '通过' },
  outcomes.fixed,
  outcomes.regressed,
  { ...outcomes.stableFail, label: '失败' },
], '样本判定'));
matrixPanel.classList.add('matrix-panel');
const matrix = chartHost('matrix', matrixTitle,
  `共 ${paired.length} 条样本。修复：${fixed.map(({ id }) => id).join('、')}。` +
  `新增失败：${regressions.map(({ id }) => id).join('、')}。` +
  `持续失败：${persistentFailures.map(({ id }) => id).join('、')}。其余样本两版均通过。`,
);
const matrixScroll = element('div', '', 'matrix-scroll');
matrixScroll.tabIndex = 0;
matrixScroll.setAttribute('role', 'region');
matrixScroll.setAttribute('aria-labelledby', matrixTitle);
matrixScroll.append(matrix);
matrixPanel.append(matrixScroll);

const comparison = element('div', '', 'comparison');
comparison.append(ratesPanel, changePanel);
report.append(styles, header, metrics, gateSection, comparison, riskPanel, latencyPanel, matrixPanel);
container.append(report);

const axisLabel = { title: false, labelFill: '#595f6a', labelOpacity: 1 } as const;
const insideLabel = { text: 'label', position: 'inside', style: { fill: '#fff', fontWeight: 700 } } as const;
const taskScale = { domain: tasks, paddingInner: 0.3 };
renderChart(rateChart, {
  type: 'interval',
  data: rateData,
  encode: { x: 'task', y: 'rate', color: 'version' },
  transform: [{ type: 'dodgeX' }],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: {
    x: taskScale,
    y: { domain: [0, 100], nice: false, tickCount: 6 },
    color: colorScale(versions),
  },
  axis: { x: axisLabel, y: { ...axisLabel, labelFormatter: (value: number) => `${value}%` } },
  labels: [insideLabel],
  style: { radius: 3 },
});
renderChart(transitionChart, {
  type: 'interval',
  data: transitionData,
  encode: { x: 'task', y: 'count', color: 'result' },
  transform: [{ type: 'stackY' }],
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: {
    x: taskScale,
    y: { domain: [0, Math.max(...taskGroups.map(({ members }) => members.length))], nice: false, tickCount: 6 },
    color: colorScale(outcomeStyles),
  },
  axis: { x: axisLabel, y: { ...axisLabel, labelFormatter: (value: number) => `${value} 条` } },
  labels: [insideLabel],
  style: { stroke: '#fff', lineWidth: 1 },
});
renderChart(donut, {
  type: 'interval',
  data: failureData,
  encode: { y: 'count', color: 'label' },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', innerRadius: 0.67, outerRadius: 0.86 },
  scale: { color: colorScale(failureData) },
  style: { stroke: '#fff', lineWidth: 3 },
});
renderChart(latencyChart, {
  type: 'boxplot',
  data: latencyData,
  encode: { x: 'version', y: 'duration', color: 'version' },
  coordinate: { transform: [{ type: 'transpose' }] },
  scale: {
    x: { domain: versions.map(({ label }) => label), paddingInner: 0.55 },
    y: { tickCount: 5 },
    color: colorScale(versions),
  },
  axis: { x: axisLabel, y: { ...axisLabel, labelFormatter: (value: number) => `${value} ms` } },
  style: { boxFillOpacity: 0.25, boxLineWidth: 1.5, pointR: 3 },
});
renderChart(matrix, {
  type: 'cell',
  data: matrixData,
  encode: { x: 'id', y: 'version', color: 'result' },
  scale: {
    x: { domain: matrixSamples.map(({ id }) => id) },
    y: { domain: versions.map(({ label }) => label) },
    color: colorScale(outcomeStyles),
  },
  axis: {
    x: { ...axisLabel, labelAutoHide: false, labelFontSize: 10, tick: false },
    y: { ...axisLabel, labelFontSize: 11, tick: false },
  },
  labels: [{ text: 'mark', style: { fill: '#fff', fontSize: 13, fontWeight: 700 } }],
  style: { inset: 2 },
});

