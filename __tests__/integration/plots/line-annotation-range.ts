import { G2PlotLine } from '../../../src';

export function lineAnnotationRange() {
  return {
    type: 'view',
    height: 320,
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/forecast-range.json',
    },
    interactions: [{ type: 'tooltip', series: true }],
    children: [
      {
        type: G2PlotLine,
        encode: {
          x: (d) => new Date(d[0]),
          y: (d) => d[4],
          title: (d) => new Date(d[0]).toDateString(),
          tooltip: (d) => ({ name: 'Value', value: d[4].toFixed(2) }),
        },
        style: { lineWidth: 2 },
        annotations: [
          {
            type: 'line',
            encode: {
              x: (d) => new Date(d[0]),
              y: (d) => d[3],
              lineShape: 'smooth',
              title: null,
            },
            // @todo G2 should support specify zIndex to make sure lineAnnotations is behind acutal line mark.
            style: { stroke: '#FF6B3B', zIndex: -1 },
          },
          {
            type: 'area',
            encode: {
              x: (d) => new Date(d[0]),
              y: (d) => [d[1], d[2]],
              title: null,
              tooltip: (d) => ({
                name: 'Range',
                value: `${d[1].toFixed(2)}-${d[2].toFixed(2)}`,
              }),
            },
            style: { fill: 'orange', fillOpacity: 0.1 },
          },
          {
            type: 'point',
            data: [
              ['01-08', 0.417885699969663],
              ['01-23', 0.706678090635692],
              ['03-12', 6.0515889109663],
            ],
            encode: {
              x: (d) => new Date(d[0]),
              y: (d) => d[1],
              shape: 'point',
              size: 3,
              title: null,
            },
            style: { fill: '#FF6B3B', stroke: '#fff', lineWidth: 1 },
          },
        ],
      },
    ],
  };
}
