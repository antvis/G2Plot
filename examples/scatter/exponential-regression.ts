import { Chart } from '@antv/g2';

/**
 * 散点图 + 指数回归拟合线
 * 场景：数据呈指数增长（如用户量、病毒传播、复利累积），用指数曲线拟合整体趋势
 * 要点：回归线用 data.transform 的 { type: 'custom', callback }（G2 核心支持的
 *       数据变换），在 callback 里对 y 取 log 做最小二乘拟合，生成平滑曲线点；
 *       不依赖 @antv/g2-extension-plot 扩展包
 */

// 指数增长数据：y ≈ 3500 * e^(0.18x) + 噪声
const rawData: Array<[number, number]> = [
  [1, 4300], [2, 5100], [3, 5900], [4, 7200], [5, 8100],
  [6, 10500], [7, 12800], [8, 14600], [9, 18200], [10, 21500],
  [11, 26800], [12, 31400], [13, 38200], [14, 45100], [15, 54600],
  [16, 65200], [17, 78900], [18, 94300],
];

// 指数拟合：对 y 取 ln，转线性最小二乘 ln(y) = ln(a) + b*x，再还原 y = a * e^(b*x)
function exponentialRegression(points: Array<[number, number]>) {
  const n = points.length;
  let sumX = 0;
  let sumLnY = 0;
  let sumXLnY = 0;
  let sumXX = 0;
  for (const [x, y] of points) {
    const lnY = Math.log(y);
    sumX += x;
    sumLnY += lnY;
    sumXLnY += x * lnY;
    sumXX += x * x;
  }
  const b = (n * sumXLnY - sumX * sumLnY) / (n * sumXX - sumX * sumX);
  const a = Math.exp((sumLnY - b * sumX) / n);
  return { a, b };
}

const { a, b } = exponentialRegression(rawData);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: rawData,
  children: [
    {
      type: 'point',
      encode: {
        x: (d: [number, number]) => d[0],
        y: (d: [number, number]) => d[1],
        shape: 'point',
      },
      scale: { x: { domain: [0, 18] }, y: { domain: [0, 100000] } },
      style: { fillOpacity: 0.75 },
      axis: { y: { labelFormatter: '~s' } }, // 大数值缩写（如 94.3k）
    },
    {
      type: 'line',
      // 数据变换：用 custom callback 生成回归曲线采样点
      data: {
        transform: [
          {
            type: 'custom',
            callback: (points: Array<[number, number]>) => {
              const xs = points.map((d) => d[0]);
              const xMin = Math.min(...xs);
              const xMax = Math.max(...xs);
              const line: Array<[number, number]> = [];
              const steps = 50;
              for (let i = 0; i <= steps; i += 1) {
                const x = xMin + ((xMax - xMin) * i) / steps;
                line.push([x, a * Math.exp(b * x)]);
              }
              return line;
            },
          },
        ],
      },
      encode: {
        x: (d: [number, number]) => d[0],
        y: (d: [number, number]) => d[1],
        shape: 'smooth',
      },
      style: { stroke: '#30BF78', lineWidth: 2 },
      labels: [
        {
          text: `y = ${a.toFixed(2)}e^(${b.toFixed(2)}x)`,
          selector: 'last',
          textAlign: 'end',
          style: { fontSize: 12, fill: '#30BF78' },
        },
      ],
      tooltip: false,
    },
  ],
});

chart.render();
