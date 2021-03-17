import { MultiView } from '@antv/g2plot';
import { groupBy, get } from '@antv/util';

fetch('https://gw.alipayobjects.com/os/antfincdn/HkxWvFrZuC/association-data.json')
  .then((data) => data.json())
  .then((data) => {
    function getDataByArea(area) {
      return get(groupBy(data.line, 'area'), area, []).map((d) => ({
        time: d.time,
        value: Math.random() * d.value,
        area,
      }));
    }

    const plot = new MultiView('container', {
      // 关闭 chart 上的 tooltip，子 view 开启 tooltip
      tooltip: false,
      plots: [
        {
          type: 'line',
          region: { start: { x: 0, y: 0 }, end: { x: 1, y: 0.3 } },
          options: {
            data: data.line,
            xField: 'time',
            yField: 'value',
            seriesField: 'area',
            point: { style: { r: 2.5 } },
            meta: {
              time: { range: [0, 1] },
            },
            interactions: [{ type: 'association-active' }, { type: 'association-highlight' }],
          },
        },
        {
          type: 'line',
          region: { start: { x: 0, y: 0.32 }, end: { x: 0.5, y: 0.65 } },
          options: {
            data: getDataByArea('华东'),
            xField: 'time',
            yField: 'value',
            seriesField: 'area',
            interactions: [{ type: 'association-highlight' }],
            point: {
              style: { r: 2.5 },
              state: {
                active: {
                  style: {
                    lineWidth: 1,
                    r: 3,
                  },
                },
              },
            },
            meta: {
              time: { range: [0, 1] },
            },
            smooth: true,
            tooltip: {
              showCrosshairs: true,
              shared: true,
            },
            state: {
              active: {
                style: {
                  lineWidth: 3,
                },
              },
            },
          },
        },
        {
          type: 'line',
          region: { start: { x: 0.5, y: 0.32 }, end: { x: 1, y: 0.65 } },
          options: {
            data: getDataByArea('华北'),
            xField: 'time',
            yField: 'value',
            seriesField: 'area',
            interactions: [{ type: 'association-highlight' }],
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
        {
          type: 'line',
          region: { start: { x: 0, y: 0.67 }, end: { x: 0.5, y: 1 } },
          options: {
            data: getDataByArea('中南'),
            xField: 'time',
            yField: 'value',
            seriesField: 'area',
            interactions: [{ type: 'association-highlight' }],
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
        {
          type: 'line',
          region: { start: { x: 0.5, y: 0.67 }, end: { x: 1, y: 1 } },
          options: {
            data: getDataByArea('西南'),
            xField: 'time',
            yField: 'value',
            seriesField: 'area',
            interactions: [{ type: 'association-highlight' }],
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
