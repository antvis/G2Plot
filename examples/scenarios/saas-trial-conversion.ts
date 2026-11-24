import { Chart } from '@antv/g2';

/**
 * SaaS 试用转付费诊断报告
 * 用途：把漏斗、渠道转化对比、指标卡与结论文字组合成一份可直接交付的增长诊断
 * 场景：面向 SaaS 增长团队，判断试用链条中哪一环流失最重、哪个渠道质量最差
 * 关键要点：所有数值都由同一份源数据计算，指标卡、图表、结论三处口径一致；图表父容器给定固定高度，Chart 使用 autoFit
 */

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

const num = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const pct = (v: number) => `${Math.round(v * 1000) / 10}%`;

const totalTrials = stages[0].users;
const totalPaid = stages[4].users;
const activation = stages[2].users / totalTrials;
const payRate = totalPaid / totalTrials;
const retention = stages[5].users / totalPaid;

const channelRows = channels.map((c) => {
  const rate = c.paid / c.trials;
  return {
    ...c,
    rate,
    ratePct: Math.round(rate * 1000) / 10,
    rateLabel: pct(rate),
  };
});
const worst = channelRows.reduce((a, b) => (a.rate <= b.rate ? a : b));
const dropRate = (i: number) => 1 - stages[i].users / stages[i - 1].users;

const root = document.getElementById('container');
if (!root) {
  throw new Error('案例需要一个 #container 容器');
}
root.innerHTML = '';

const page = document.createElement('div');
page.style.cssText =
  'font-family: system-ui, -apple-system, "PingFang SC", sans-serif; color: #1d1d1d; padding: 8px;';

const head = document.createElement('div');
head.innerHTML = `<h2 style="margin: 0 0 4px; font-size: 18px;">SaaS 试用转付费诊断</h2>
<p style="margin: 0 0 16px; font-size: 12px; color: #8c8c8c;">统计范围：2026 年 10 月新注册试用用户；单位：人；环节转化率 = 本环节人数 / 注册试用人数</p>`;

const kpis = [
  { label: '注册试用', value: num(totalTrials), note: '本期新增，口径见上方' },
  { label: '激活率（创建项目）', value: pct(activation), note: `${num(stages[2].users)} 人` },
  { label: '试用 → 付费转化', value: pct(payRate), note: `${num(totalPaid)} 人` },
  { label: '30 天续订率', value: pct(retention), note: `${num(stages[5].users)} 人` },
];

const kpiRow = document.createElement('div');
kpiRow.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;';
kpiRow.innerHTML = kpis
  .map(
    (k) => `<div style="flex: 1 1 160px; border: 1px solid #eee; border-radius: 8px; padding: 12px;">
<div style="font-size: 12px; color: #8c8c8c;">${k.label}</div>
<div style="font-size: 22px; font-weight: 600; margin: 6px 0 2px;">${k.value}</div>
<div style="font-size: 11px; color: #a0a0a0;">${k.note}</div></div>`,
  )
  .join('');

const grid = document.createElement('div');
grid.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';

const funnelEl = document.createElement('div');
funnelEl.style.cssText = 'flex: 1 1 360px; height: 380px;';
const channelEl = document.createElement('div');
channelEl.style.cssText = 'flex: 1 1 360px; height: 380px;';
grid.append(funnelEl, channelEl);

const insight = document.createElement('div');
insight.style.cssText =
  'margin-top: 16px; font-size: 13px; line-height: 1.9; background: #fafafa; border-radius: 8px; padding: 12px 16px;';
insight.innerHTML = `<strong>结论</strong>
<ul style="margin: 6px 0 0; padding-left: 18px;">
<li>「${stages[1].stage}」→「${stages[2].stage}」是本链条最大流失点，流失 ${pct(dropRate(2))}；优先优化首次创建项目的引导。</li>
<li>「${worst.channel}」渠道转化率仅 ${pct(worst.rate)}，低于整体 ${pct(payRate)}；若追平整体水平，按其 ${num(worst.trials)} 个试用量可多转化约 ${Math.round(worst.trials * payRate - worst.paid)} 人。</li>
<li>30 天续订率 ${pct(retention)} 说明付费后留存不是当前瓶颈，本轮重点应放在激活环节。</li>
</ul>`;

page.append(head, kpiRow, grid, insight);
root.appendChild(page);

const funnelChart = new Chart({ container: funnelEl, autoFit: true });
funnelChart.options({
  type: 'interval',
  data: stages,
  encode: { x: 'stage', y: 'users', color: 'stage', shape: 'funnel' },
  coordinate: { transform: [{ type: 'transpose' }] },
  transform: [{ type: 'symmetryY' }],
  axis: false,
  legend: false,
  labels: [
    {
      text: (d: { stage: string; users: number }) => `${d.stage} ${num(d.users)}`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }],
    },
  ],
});
funnelChart.render();

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
channelChart.render();