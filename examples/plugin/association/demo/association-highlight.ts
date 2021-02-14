import { MultiView } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/HkxWvFrZuC/association-data.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new MultiView('container', {
      // 关闭 chart 上的 tooltip，子 view 开启 tooltip
      tooltip: false,
      plots: [
        {
          type: 'bar',
          region: { start: { x: 0, y: 0 }, end: { x: 0.45, y: 0.45 } },
          options: {
            data: data.bar,
            xField: 'count',
            yField: 'area',
            seriesField: 'cat',
            isStack: true,
            tooltip: {
              shared: true,
              showCrosshairs: false,
              showMarkers: false,
            },
            label: {},
            interactions: [{ type: 'active-region' }],
          },
        },
        {
          type: 'pie',
          region: { start: { x: 0.5, y: 0 }, end: { x: 1, y: 0.45 } },
          options: {
            data: data.pie,
            angleField: 'bill',
            colorField: 'area',
            tooltip: {
              showMarkers: false,
            },
            interactions: [
              { type: 'element-active' },
              {
                type: 'association-tooltip',
                cfg: {
                  start: [
                    {
                      trigger: 'element:mousemove',
                      action: 'association:showTooltip',
                      arg: { dim: 'x', linkField: 'area' },
                    },
                  ],
                },
              },
              {
                type: 'association-highlight',
                cfg: {
                  start: [
                    {
                      trigger: 'element:mousemove',
                      action: 'association:highlight',
                      arg: { linkField: 'area' },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'area',
          region: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.95 } },
          options: {
            data: data.line,
            xField: 'time',
            yField: 'value',
            seriesField: 'area',
            line: {},
            point: { style: { r: 2.5 } },
            meta: {
              time: { range: [0, 1] },
            },
            smooth: true,
            tooltip: {
              showCrosshairs: true,
              shared: true,
            },
          },
        },
      ],
    });

    plot.render();
  });
