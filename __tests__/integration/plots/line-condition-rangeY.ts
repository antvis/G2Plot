import { G2PlotLine } from '../../../src';
import type { G2PlotLineOptions } from '../../../src';

export function lineConditionRangeY() {
  const options: G2PlotLineOptions = {
    type: G2PlotLine,
    height: 320,
    data: {
      type: 'fetch',
      value: 'data/requests.json',
    },
    encode: {
      x: (d) => new Date(d.Time),
      y: 'value',
      color: 'key',
    },
    isStack: true,
    scale: { y: { nice: true } },
    axis: { y: { title: false } },
    conditionRangeY: {
      data: [
        { value: 3500, operator: 'gt', type: 'success' },
        { value: [2000, 3500], operator: 'in', type: 'info' },
        { value: [2000, 500], operator: 'in', type: 'warning' },
        { value: [500, 0], operator: 'in', type: 'error' },
      ],
      style: {
        fill: (_, idx) => {
          if (idx === 3) return 'lightskyblue';
        },
      },
    },
  };

  return {
    type: 'view',
    interactions: [{ type: 'tooltip' }],
    children: [options],
  };
}
