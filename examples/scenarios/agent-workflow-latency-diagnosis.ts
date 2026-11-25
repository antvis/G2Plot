/**
 * Agent 工作流耗时诊断报告
 * 场景：在单个串行工作流中定位慢请求的主要耗时阶段。
 * 要点：从同一批模拟运行记录计算 P95、超时率、阶段占比和最慢请求明细。
 */
import { Chart } from '@antv/g2';

const stages = [
  { key: 'planning', label: '规划' },
  { key: 'retrieval', label: '检索' },
  { key: 'tools', label: '工具执行' },
  { key: 'generation', label: '结果生成' },
] as const;

const slowThresholdMs = 2000;
const timeoutThresholdMs = 3000;

const runs = [
  ...Array.from({ length: 16 }, (_, index) => {
    const sample = index + 1;
    return {
      id: `run-${String(sample).padStart(2, '0')}`,
      planning: 180 + 10 * (sample % 4),
      retrieval: 260 + 20 * (sample % 3),
      tools: 480 + 30 * (sample % 5),
      generation: 420 + 20 * (sample % 4),
    };
  }),
  { id: 'run-17', planning: 210, retrieval: 300, tools: 1280, generation: 450 },
  { id: 'run-18', planning: 220, retrieval: 350, tools: 1630, generation: 500 },
  { id: 'run-19', planning: 220, retrieval: 360, tools: 2010, generation: 610 },
  { id: 'run-20', planning: 230, retrieval: 420, tools: 2250, generation: 700 },
].map((run) => ({
  ...run,
  totalMs: stages.reduce((total, { key }) => total + run[key], 0),
}));

const orderedRuns = [...runs].sort((a, b) => a.totalMs - b.totalMs);
const p95 = orderedRuns[Math.ceil(0.95 * orderedRuns.length) - 1].totalMs;
const timeoutCount = runs.filter((run) => run.totalMs >= timeoutThresholdMs).length;
const timeoutRate = timeoutCount / runs.length;
const slowRuns = runs.filter((run) => run.totalMs >= slowThresholdMs);
const totalSlowMs = slowRuns.reduce((total, run) => total + run.totalMs, 0);
const stageShares = stages
  .map(({ key, label }) => {
    const durationMs = slowRuns.reduce((total, run) => total + run[key], 0);
    return { label, durationMs, share: totalSlowMs ? durationMs / totalSlowMs : 0 };
  })
  .sort((a, b) => b.durationMs - a.durationMs);
const leadingStage = stageShares[0];
const slowestRuns = [...runs]
  .sort((a, b) => b.totalMs - a.totalMs || a.id.localeCompare(b.id))
  .slice(0, 4);

const formatMs = new Intl.NumberFormat('zh-CN').format;
const formatPercent = new Intl.NumberFormat('zh-CN', {
  style: 'percent',
  maximumFractionDigits: 1,
}).format;

const container = document.getElementById('container');
if (!container) throw new Error('Agent 耗时诊断报告需要一个 #container 容器。');

const styles = document.createElement('style');
styles.textContent = `
  .agent-latency-report {
    color: #1c2c3f;
    background: #f1f5f9;
    box-sizing: border-box;
    font: 15px/1.55 system-ui, "Microsoft YaHei", sans-serif;
    padding: clamp(14px, 4vw, 42px);
  }
  .agent-latency-report *, .agent-latency-report *::before,
  .agent-latency-report *::after { box-sizing: inherit; }
  .agent-latency-report .report-body {
    display: grid;
    gap: 16px;
    max-width: 1000px;
    margin-inline: auto;
  }
  .agent-latency-report h1, .agent-latency-report h2, .agent-latency-report p {
    margin: 0;
  }
  .agent-latency-report h1 {
    font-size: clamp(23px, 4vw, 38px);
    line-height: 1.2;
    margin-bottom: 8px;
  }
  .agent-latency-report h2 { font-size: 19px; line-height: 1.35; }
  .agent-latency-report .detail { color: #516279; font-size: 13px; }
  .agent-latency-report .metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .agent-latency-report .card {
    background: #fff;
    border: 1px solid #dce5ef;
    border-radius: 12px;
    min-width: 0;
    padding: clamp(12px, 2.2vw, 20px);
  }
  .agent-latency-report .metric-value {
    display: block;
    font-size: clamp(23px, 4.2vw, 34px);
    font-variant-numeric: tabular-nums;
    line-height: 1.3;
    margin-block: 3px;
  }
  .agent-latency-report .metric-label { color: #42596f; font-weight: 600; }
  .agent-latency-report .diagnosis {
    color: #23499b;
    font-weight: 600;
    margin-top: 5px;
  }
  .agent-latency-report .chart-host { height: 245px; min-width: 0; }
  .agent-latency-report .table-scroll {
    overflow-x: auto;
    margin-top: 10px;
  }
  .agent-latency-report table {
    border-collapse: collapse;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
    min-width: 520px;
    text-align: right;
    white-space: nowrap;
    width: 100%;
  }
  .agent-latency-report th, .agent-latency-report td {
    border-bottom: 1px solid #e2e9f0;
    padding: 9px 12px;
  }
  .agent-latency-report thead { color: #42596f; background: #f2f6fb; }
  .agent-latency-report th:first-child { text-align: left; }
  .agent-latency-report tr:last-child td,
  .agent-latency-report tbody tr:last-child th { border-bottom: 0; }
  .agent-latency-report .timeout { color: #8a351c; font-weight: 600; }
  .agent-latency-report .mobile-hint { display: none; }
  @media (max-width: 650px) {
    .agent-latency-report .mobile-hint { display: inline; }
    .agent-latency-report .chart-host { height: 222px; }
    .agent-latency-report table { min-width: 450px; }
    .agent-latency-report th, .agent-latency-report td { padding-inline: 7px; }
  }
`;

const report = document.createElement('main');
report.className = 'agent-latency-report';
report.innerHTML = `
  <div class="report-body">
    <header>
      <h1>Agent 工作流耗时诊断报告</h1>
      <p class="detail" data-role="scope"></p>
    </header>
    <section class="metrics" aria-label="耗时摘要">
      <div class="card">
        <p class="metric-label">端到端 P95</p>
        <strong class="metric-value" data-role="p95"></strong>
        <p class="detail">全量请求 · 最近秩法</p>
      </div>
      <div class="card">
        <p class="metric-label">模拟超时率</p>
        <strong class="metric-value" data-role="timeout-rate"></strong>
        <p class="detail" data-role="timeout-scope"></p>
      </div>
    </section>
    <section class="card" aria-labelledby="agent-latency-stage-title">
      <h2 id="agent-latency-stage-title">慢请求的阶段耗时占比</h2>
      <p class="diagnosis" data-role="diagnosis"></p>
      <p class="detail" data-role="slow-scope"></p>
      <div class="chart-host" role="img"></div>
    </section>
    <section class="card" aria-labelledby="agent-latency-run-title">
      <h2 id="agent-latency-run-title">最慢的四次运行</h2>
      <p class="detail">耗时单位为 ms，按端到端耗时从高到低排列。<span class="mobile-hint">横向滚动查看全部阶段。</span></p>
      <div class="table-scroll" tabindex="0" role="region" aria-label="分阶段耗时明细">
        <table aria-labelledby="agent-latency-run-title">
          <thead><tr>
            <th scope="col">运行 ID</th><th scope="col">端到端</th>
            <th scope="col">规划</th><th scope="col">检索</th>
            <th scope="col">工具执行</th><th scope="col">结果生成</th>
            <th scope="col">状态</th>
          </tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </section>
  </div>
`;
container.append(styles, report);

report.querySelector('[data-role="scope"]')!.textContent =
  `串行工作流 · ${runs.length} 次模拟运行 · 端到端耗时为四个阶段之和`;
report.querySelector('[data-role="p95"]')!.textContent = `${formatMs(p95)} ms`;
report.querySelector('[data-role="timeout-rate"]')!.textContent = formatPercent(timeoutRate);
report.querySelector('[data-role="timeout-scope"]')!.textContent =
  `${timeoutCount}/${runs.length} 条 ≥ ${formatMs(timeoutThresholdMs)} ms`;
report.querySelector('[data-role="diagnosis"]')!.textContent = totalSlowMs
  ? `优先排查${leadingStage.label}，占慢请求累计耗时的 ${formatPercent(leadingStage.share)}。`
  : '本批样本没有慢请求。';
report.querySelector('[data-role="slow-scope"]')!.textContent =
  `${slowRuns.length} 条慢请求（≥ ${formatMs(slowThresholdMs)} ms），累计 ${formatMs(totalSlowMs)} ms`;

const tbody = report.querySelector('tbody')!;
for (const run of slowestRuns) {
  const row = tbody.insertRow();
  const rowHeading = document.createElement('th');
  rowHeading.scope = 'row';
  rowHeading.textContent = run.id;
  row.append(rowHeading);
  for (const duration of [run.totalMs, ...stages.map(({ key }) => run[key])]) {
    row.insertCell().textContent = formatMs(duration);
  }
  const status = row.insertCell();
  const timedOut = run.totalMs >= timeoutThresholdMs;
  status.textContent = timedOut ? '模拟超时' : '未超时';
  status.classList.toggle('timeout', timedOut);
}

const chartHost = report.querySelector<HTMLDivElement>('.chart-host')!;
chartHost.setAttribute(
  'aria-label',
  `慢请求阶段耗时占比：${stageShares.map(({ label, share }) => `${label} ${formatPercent(share)}`).join('、')}`,
);
const chart = new Chart({ container: chartHost, autoFit: true });
chart.options({
  type: 'interval',
  data: stageShares,
  coordinate: { transform: [{ type: 'transpose' }] },
  encode: { x: 'label', y: 'share', color: 'label' },
  scale: {
    x: { domain: stageShares.map(({ label }) => label) },
    y: { domain: [0, 1], nice: false, tickCount: 6 },
    color: { domain: stageShares.map(({ label }) => label), range: ['#355BD6', '#8198BF', '#8198BF', '#8198BF'] },
  },
  axis: {
    x: { title: false, labelAutoHide: false, labelFill: '#516279' },
    y: { title: false, labelFormatter: '.0%', labelAutoRotate: false, labelFill: '#516279', grid: true },
  },
  legend: false,
  labels: [{
    text: ({ share }: { share: number }) => formatPercent(share),
    position: 'right',
    style: { fill: '#1c2c3f', fontWeight: 600, textAlign: 'start', dx: 6 },
  }],
  tooltip: {
    title: 'label',
    items: [
      { field: 'durationMs', name: '累计耗时', valueFormatter: (value) => `${formatMs(Number(value))} ms` },
      { field: 'share', name: '阶段占比', valueFormatter: (value) => formatPercent(Number(value)) },
    ],
  },
});
chart.render();
