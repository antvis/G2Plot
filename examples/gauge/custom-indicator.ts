import { Path } from '@antv/g';
import { Chart } from '@antv/g2';

/**
 * 自定义指示器与 Tooltip
 * 场景：需要菱形指针和品牌化悬浮提示的单指标仪表盘
 * 要点：pointerShape 接收点、颜色值和坐标系，返回 @antv/g 图形；
 *       tooltip.items 定义业务内容，interaction.tooltip.render 自定义 HTML
 */
const data = {
  metric: '季度目标完成率',
  completionRate: 72,
  target: 100,
};

type PointerPoint = [number, number];
type PointerCoordinate = { getCenter: () => PointerPoint };

function diamondPointer(
  points: PointerPoint[],
  value: { color: string },
  coordinate: PointerCoordinate,
) {
  const [first, second] = points;
  const x = second ? (first[0] + second[0]) / 2 : first[0];
  const y = second ? (first[1] + second[1]) / 2 : first[1];
  const [cx, cy] = coordinate.getCenter();
  const angle = Math.atan2(y - cy, x - cx);
  const length = Math.hypot(x - cx, y - cy);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const tip: PointerPoint = [cx + cos * length, cy + sin * length];
  const tail: PointerPoint = [cx - cos * 12, cy - sin * 12];
  const left: PointerPoint = [cx - sin * 7, cy + cos * 7];
  const right: PointerPoint = [cx + sin * 7, cy - cos * 7];

  return new Path({
    style: {
      d: `M ${tip[0]} ${tip[1]} L ${left[0]} ${left[1]} L ${tail[0]} ${tail[1]} L ${right[0]} ${right[1]} Z`,
      fill: value.color,
      stroke: '#fff',
      lineWidth: 1,
    },
  });
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      name: data.metric,
      target: data.completionRate,
      total: data.target,
    },
  },
  scale: {
    color: { range: ['#5B8FF9', '#EEF1F6'] },
  },
  style: {
    pointerShape: diamondPointer,
    pinR: 6,
    pinFill: '#5B8FF9',
    textContent: (target: number, total: number) =>
      `${Math.round((target / total) * 100)}%\n${data.metric}`,
    textFontSize: 24,
    textY: '70%',
  },
  tooltip: {
    title: () => data.metric,
    items: [
      () => ({ name: '当前完成率', value: `${data.completionRate}%` }),
      () => ({ name: '满分', value: data.target }),
    ],
  },
  interaction: {
    tooltip: {
      render: (_event, { title, items }) => `
        <div style="padding: 10px 14px; border-radius: 6px; background: #1d1d1d; color: #fff;">
          <strong>${title}</strong>
          ${items
            .map(
              (item) =>
                `<div style="margin-top: 6px;">${item.name}：<b>${item.value}</b></div>`,
            )
            .join('')}
        </div>
      `,
    },
  },
  axis: false,
  legend: false,
});

chart.render();
