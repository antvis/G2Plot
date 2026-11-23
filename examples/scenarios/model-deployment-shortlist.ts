import { Chart } from '@antv/g2';

/** TorchVision v0.25.0 ImageNet-1K public weight metadata, not a hardware benchmark. */
const sourceRoot = 'https://github.com/pytorch/vision/blob/v0.25.0/torchvision/models/';

type Candidate = {
  model: string;
  weights: string;
  accuracy: number;
  gflops: number;
  params: number;
  source: string;
};

export const SNAPSHOT: readonly Candidate[] = [
  { model: 'MobileNet V3 Small', weights: 'MobileNet_V3_Small_Weights.IMAGENET1K_V1', accuracy: 67.668, gflops: 0.06, params: 2542856, source: sourceRoot + 'mobilenetv3.py#L316-L336' },
  { model: 'MobileNet V3 Large', weights: 'MobileNet_V3_Large_Weights.IMAGENET1K_V2', accuracy: 75.274, gflops: 0.22, params: 5483032, source: sourceRoot + 'mobilenetv3.py#L292-L313' },
  { model: 'EfficientNet B0', weights: 'EfficientNet_B0_Weights.IMAGENET1K_V1', accuracy: 77.692, gflops: 0.39, params: 5288548, source: sourceRoot + 'efficientnet.py#L407-L427' },
  { model: 'RegNet Y 400MF', weights: 'RegNet_Y_400MF_Weights.IMAGENET1K_V2', accuracy: 75.804, gflops: 0.40, params: 4344144, source: 'https://docs.pytorch.org/vision/0.25/models/generated/torchvision.models.regnet_y_400mf.html#torchvision.models.RegNet_Y_400MF_Weights' },
  { model: 'ResNet 18', weights: 'ResNet18_Weights.IMAGENET1K_V1', accuracy: 69.758, gflops: 1.81, params: 11689512, source: sourceRoot + 'resnet.py#L292-L310' },
  { model: 'ResNet 50', weights: 'ResNet50_Weights.IMAGENET1K_V2', accuracy: 80.858, gflops: 4.09, params: 25557032, source: sourceRoot + 'resnet.py#L353-L373' },
  { model: 'EfficientNet V2 S', weights: 'EfficientNet_V2_S_Weights.IMAGENET1K_V1', accuracy: 84.228, gflops: 8.37, params: 21458488, source: sourceRoot + 'efficientnet.py#L615-L641' },
];

export const LIMITS = { accuracy: 75, gflops: 0.50, params: 5400000 };
const million = 1000000;
const decisionColors = { domain: ['入围', '未入围'], range: ['#006f62', '#a24c20'] };
const accuracyText = (v: number) => v.toFixed(3) + '%';
const computeText = (v: number) => v.toFixed(2);
const paramsText = (v: number) => (v / million).toFixed(3);

export function evaluate(candidate: Candidate) {
  const failures: string[] = [];
  if (candidate.accuracy < LIMITS.accuracy) failures.push('准确率');
  if (candidate.gflops > LIMITS.gflops) failures.push('运算量');
  if (candidate.params > LIMITS.params) failures.push('参数量');
  return {
    ...candidate,
    paramsM: candidate.params / million,
    failures,
    passesAccuracyAndCompute: candidate.accuracy >= LIMITS.accuracy && candidate.gflops <= LIMITS.gflops,
    status: failures.length ? '未入围' : '入围',
  };
}

export function summarize(rows: ReturnType<typeof evaluate>[]) {
  const eligible = rows.filter((d) => d.failures.length === 0);
  const ordered = eligible.slice().sort((a, b) =>
    b.accuracy - a.accuracy || a.gflops - b.gflops || a.params - b.params || a.model.localeCompare(b.model));
  return {
    eligible: eligible.length,
    total: rows.length,
    accuracyAndCompute: rows.filter((d) => d.passesAccuracyAndCompute).length,
    recommended: ordered[0]?.model ?? null,
  };
}

const css = `
.model-shortlist { --ink:#122631; --muted:#425862; --paper:#fff; --border:#d3dfe1;
  font:16px/1.5 system-ui,sans-serif; color:var(--ink); background:#eff4f2; padding:clamp(14px,3vw,36px);
  max-width:1320px; margin:0 auto; }
.model-shortlist, .model-shortlist * { box-sizing:border-box; }
.model-shortlist header { padding:4px 0 12px; }
.model-shortlist h1 { margin:4px 0 8px; font-size:clamp(25px,4vw,42px); line-height:1.16; }
.model-shortlist h2 { margin:0 0 8px; font-size:19px; }
.model-shortlist p { margin:4px 0 8px; }
.model-shortlist .eyebrow { font-weight:750; color:#006f62; letter-spacing:.06em; }
.model-shortlist .caption { color:var(--muted); font-size:.9rem; }
.model-shortlist .metrics, .model-shortlist .charts { display:grid; gap:12px; margin:12px 0; }
.model-shortlist .metrics { grid-template-columns:repeat(3,minmax(0,1fr)); }
.model-shortlist .charts { grid-template-columns:repeat(2,minmax(0,1fr)); }
.model-shortlist .panel { min-width:0; border:1px solid var(--border); padding:14px; background:var(--paper); border-radius:12px; }
.model-shortlist .figure-chart { height:300px; min-width:0; }
.model-shortlist .metric-label { font-size:.875rem; color:var(--muted); }
.model-shortlist .metric-value { font-size:clamp(20px,2.4vw,30px); line-height:1.2; font-weight:750; overflow-wrap:anywhere; margin-top:4px; }
.model-shortlist .table-scroll { overflow:auto; }
.model-shortlist table { border-collapse:collapse; width:100%; font-size:.875rem; }
.model-shortlist caption { text-align:left; color:var(--muted); margin-bottom:10px; }
.model-shortlist th, .model-shortlist td { border-bottom:1px solid var(--border); padding:8px; text-align:left; }
.model-shortlist thead th { background:#f6f9f8; white-space:nowrap; }
.model-shortlist td.number { text-align:right; font-variant-numeric:tabular-nums; white-space:nowrap; }
.model-shortlist .pass { color:#006f62; font-weight:750; }
.model-shortlist .fail { color:#a24c20; font-weight:750; }
.model-shortlist .status { display:inline-block; margin-right:14px; }
.model-shortlist a { color:#005847; text-underline-offset:2px; }
.model-shortlist a:focus-visible,.model-shortlist .table-scroll:focus-visible { outline:3px solid #006f62; outline-offset:2px; }
.model-shortlist .chart-warning { color:#843c16; font-weight:700; }
@media (max-width:760px) { .model-shortlist .charts { grid-template-columns:1fr; } }
@media (max-width:510px) { .model-shortlist .metrics { grid-template-columns:1fr; } .model-shortlist .panel { padding:9px; } }
`;

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function summaryCard(label: string, value: string) {
  const panel = element('div', 'panel');
  panel.append(element('div', 'metric-label', label), element('div', 'metric-value', value));
  return panel;
}

function chartPanel(title: string, description: string) {
  const figure = element('section', 'panel');
  const container = element('div', 'figure-chart');
  container.setAttribute('role', 'img');
  container.setAttribute('aria-label', title + '；' + description + '；下方表格提供等价数值');
  figure.append(element('h2', '', title), element('p', 'caption', description), container);
  return { figure, container };
}

function evidencePanel(rows: ReturnType<typeof evaluate>[]) {
  const panel = element('section', 'panel');
  panel.append(element('h2', '', '证据表｜逐条复核'));
  const scroll = element('div', 'table-scroll');
  scroll.tabIndex = 0;
  scroll.setAttribute('role', 'region');
  scroll.setAttribute('aria-label', '模型指标和来源，可横向滚动');
  const table = element('table');
  table.append(element('caption', '', '版本、来源、原始数值与不达标原因；参数量以百万展示，筛选使用整数参数数目'));
  const head = table.createTHead().insertRow();
  for (const label of ['模型', '权重枚举 / 源码', 'Top-1 (%)', 'GFLOPS', '参数量 (百万)', '筛选结果']) {
    const th = element('th', '', label);
    th.scope = 'col';
    head.append(th);
  }
  const tbody = table.createTBody();
  for (const item of rows) {
    const tr = tbody.insertRow();
    const label = element('th', '', item.model);
    label.scope = 'row';
    tr.append(label);
    const a = element('a', '', item.weights);
    a.href = item.source;
    tr.insertCell().append(a);
    for (const value of [accuracyText(item.accuracy), computeText(item.gflops), paramsText(item.params)]) {
      tr.append(element('td', 'number', value));
    }
    tr.append(element('td', item.failures.length ? 'fail' : 'pass',
      item.failures.length ? '未入围：' + item.failures.join('、') : '入围'));
  }
  scroll.append(table);
  panel.append(scroll);
  return panel;
}

export function mount(container: HTMLElement) {
  const rows = SNAPSHOT.map(evaluate);
  const summary = summarize(rows);
  const root = element('article', 'model-shortlist');
  const styles = element('style', '', css);
  const header = element('header');
  header.append(
    element('p', 'eyebrow', '模型选型 · TorchVision v0.25.0 · ImageNet-1K'),
    element('h1', '', '七款图像分类权重，哪些值得先上设备实测？'),
    element('p', '', '示例入围规则：Top-1 ≥ ' + LIMITS.accuracy + '%，GFLOPS ≤ ' + computeText(LIMITS.gflops) +
      '，参数量 ≤ ' + (LIMITS.params / million).toFixed(2) + ' 百万；三条同时满足'),
    element('p', 'caption', '选定权重的公开快照，不是全量模型排名；训练、预处理和输入尺寸可能不同；GFLOPS 不是延迟，参数量不是内存'),
  );
  const legend = element('p', 'caption');
  legend.append(element('span', 'status pass', '● 入围'), element('span', 'status fail', '● 未入围'));
  const metrics = element('div', 'metrics');
  metrics.append(
    summaryCard('通过全部门槛', summary.eligible + ' / ' + summary.total),
    summaryCard('通过准确率与运算量两条门槛', summary.accuracyAndCompute + ' / ' + summary.total),
    summaryCard('入围中 Top-1 最高', summary.recommended ?? '无'),
  );
  const charts = element('div', 'charts');
  const scatter = chartPanel('准确率 × 运算量', '左上方向同时偏向低运算量与高准确率；虚线显示前两条门槛');
  const bars = chartPanel('参数量｜第三条门槛', '按参数数目从小到大对比，横轴单位为百万；虚线为 5.40 百万门槛');
  charts.append(scatter.figure, bars.figure);
  root.append(styles, header, legend, metrics, charts, evidencePanel(rows));
  container.append(root);

  const scatterChart = new Chart({ container: scatter.container, autoFit: true });
  scatterChart.options({
    type: 'view',
    axis: { x: { title: 'GFLOPS' }, y: { title: 'ImageNet-1K Top-1 (%)' } },
    children: [
      {
        type: 'point',
        data: [...rows],
        encode: { x: 'gflops', y: 'accuracy', color: 'status' },
        scale: { color: decisionColors, x: { domain: [0, 9], nice: false }, y: { domain: [64, 87], nice: false } },
        legend: false,
        style: { shape: 'point', r: 6, fillOpacity: 0.94, stroke: '#ffffff', lineWidth: 1 },
        tooltip: { title: 'model', items: ['gflops', 'accuracy', 'status'] },
      },
      {
        type: 'line',
        data: [{ x: 0, y: LIMITS.accuracy }, { x: 9, y: LIMITS.accuracy }],
        encode: { x: 'x', y: 'y' },
        style: { stroke: '#556875', lineDash: [4, 4] },
        tooltip: false,
      },
      {
        type: 'line',
        data: [{ x: LIMITS.gflops, y: 64 }, { x: LIMITS.gflops, y: 87 }],
        encode: { x: 'x', y: 'y' },
        style: { stroke: '#556875', lineDash: [4, 4] },
        tooltip: false,
      },
    ],
    animate: false,
  });

  const parameterOrder = rows.slice().sort((a, b) => a.params - b.params);
  const barChart = new Chart({ container: bars.container, autoFit: true });
  barChart.options({
    type: 'view',
    coordinate: { transform: [{ type: 'transpose' }] },
    axis: { x: { title: false, labelAutoHide: false }, y: { title: '参数量（百万）' } },
    children: [
      {
        type: 'interval',
        data: parameterOrder,
        encode: { x: 'model', y: 'paramsM', color: 'status' },
        scale: { color: decisionColors, x: { domain: parameterOrder.map((row) => row.model) }, y: { domain: [0, 28], nice: false } },
        legend: false,
        tooltip: { title: 'model', items: [{ field: 'paramsM', name: '参数量（百万）', valueFormatter: (v: number) => v.toFixed(3) }, 'status'] },
      },
      {
        type: 'line',
        data: parameterOrder.map((d) => ({ model: d.model, ceiling: LIMITS.params / million })),
        encode: { x: 'model', y: 'ceiling' },
        style: { stroke: '#556875', lineDash: [4, 4] },
        tooltip: false,
      },
    ],
    animate: false,
  });

  let destroyed = false;
  const ready = Promise.all([scatterChart.render(), barChart.render()]).then(() => {
    if (!destroyed) root.dataset.ready = 'true';
  }).catch((error: unknown) => {
    if (destroyed) return;
    root.dataset.ready = 'error';
    header.append(element('p', 'chart-warning', '图表未能渲染；仍可在证据表核对指标'));
    throw error;
  });

  return {
    ready,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      scatterChart.destroy();
      barChart.destroy();
      root.remove();
    },
  };
}

const container = typeof document === 'undefined' ? null : document.getElementById('container');
if (container) {
  // The ready promise carries the failure; imperative hosts can subscribe via mount().
  mount(container).ready.catch(() => undefined);
}
