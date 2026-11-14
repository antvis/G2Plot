/**
 * 市值涨跌矩形树图（发散色阶）
 * 场景：股票板块热力图，矩形面积代表市值大小，颜色红→黄→绿表示涨跌幅从跌到涨
 * 要点：面积用非负市值字段；颜色回调经 d.data 读取涨跌幅，缺失值回退 0；
 * 发散色阶用 scale.color 的 linear 类型 + 三色 range + domain [-5, 0, 5]
 * （G2 v5 没有注册 diverging 色阶，直接写 type: 'diverging' 会报 Unknown Component）
 */
import { Chart } from '@antv/g2';

type StockNode = {
  data: { name: string; marketCap?: number; changeRate?: number };
  path: string[];
  value: number;
};

const marketData = {
  name: 'A股市场',
  children: [
    {
      name: '半导体',
      children: [
        { name: '芯片设计', marketCap: 1200, changeRate: 3.2 },
        { name: '晶圆制造', marketCap: 980, changeRate: -1.5 },
        { name: '封装测试', marketCap: 640, changeRate: 0.8 },
      ],
    },
    {
      name: '新能源',
      children: [
        { name: '光伏组件', marketCap: 860, changeRate: 1.6 },
        { name: '储能设备', marketCap: 720, changeRate: -0.4 },
      ],
    },
    {
      name: '消费电子',
      children: [
        { name: '手机整机', marketCap: 560, changeRate: -2.8 },
        { name: '智能穿戴', marketCap: 380, changeRate: 2.1 },
        { name: '精密结构件', marketCap: 240 },
      ],
    },
  ],
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'treemap',
  data: { value: marketData },
  encode: {
    value: 'marketCap',
    color: (node: StockNode) => node.data.changeRate ?? 0,
  },
  scale: {
    color: {
      type: 'linear',
      domain: [-5, 0, 5],
      range: ['#D73027', '#FEE08B', '#1A9850'],
    },
  },
  layout: { tile: 'treemapSquarify', paddingInner: 2 },
  style: {
    labelText: (node: StockNode) => {
      const rate = node.data.changeRate;
      const rateText = rate == null ? '—' : `${rate > 0 ? '+' : ''}${rate.toFixed(1)}%`;
      return `${node.data.name}\n${rateText}`;
    },
    labelMaxLines: 2,
    labelFill: '#fff',
    labelFontSize: 12,
    stroke: '#fff',
    lineWidth: 1,
  },
  legend: { color: { position: 'top' } },
  tooltip: {
    title: (node: StockNode) => node.path.join(' / '),
    items: [
      {
        field: 'value',
        name: '市值（亿元）',
      },
      (node: StockNode) => {
        const rate = node.data.changeRate;
        return {
          name: '涨跌幅',
          value: rate == null ? '—' : `${rate > 0 ? '+' : ''}${rate.toFixed(1)}%`,
        };
      },
    ],
  },
});

chart.render();
