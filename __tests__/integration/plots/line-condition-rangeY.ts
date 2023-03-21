import { Line } from '../../../src';

export function lineConditionRangeY(container, renderer) {
  return new Line(container, {
    renderer,
    type: 'view',
    interactions: [{ type: 'tooltip' }],
    transform: [{ type: 'stackY' }],
    children: [
      {
        type: 'line',
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
      },
    ],
  });
}
