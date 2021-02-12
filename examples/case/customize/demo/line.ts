import { MultiView } from '@antv/g2plot';

function fetchAreaData() {
  return fetch('https://gw.alipayobjects.com/os/bmw-prod/b6fde479-c353-47de-a4c0-442d58474b9d.json').then((data) =>
    data.json()
  );
}
function fetchTrendData() {
  return fetch('https://gw.alipayobjects.com/os/bmw-prod/b0b850d4-a8ce-4abe-8466-232a677af79c.json').then((data) =>
    data.json()
  );
}

const DEFAULT_TOOLTIP_OPTIONS = {
  showTitle: false,
  shared: true,
  showMarkers: false,
  customContent: (x, data) => `${data[0]?.data?.y || 0}`, // 默认显示原始数据
  containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
  itemTpl: '<span>{value}</span>',
  domStyles: {
    'g2-tooltip': {
      padding: '2px 4px',
      fontSize: '10px',
    },
  },
  showCrosshairs: true,
  crosshairs: {
    type: 'x',
  },
};

Promise.all([fetchAreaData(), fetchTrendData()]).then(([data1, data2]) => {
  const uvData = data2.uniqueSessions.map((d, idx) => ({
    date: `${idx}`,
    uv: d,
  }));
  const pvData = data2.pageSessions.map((d, idx) => ({
    date: `${idx}`,
    pv: d,
  }));
  const directTrafficData = data2.directTraffic.map((d, idx) => ({
    date: `${idx}`,
    directTraffic: d,
  }));
  const referringSitesData = data2.referringSites.map((d, idx) => ({
    date: `${idx}`,
    referringSites: d,
  }));
  const plot = new MultiView('container', {
    height: 140,
    appendPadding: [20, 0, 0, 0],
    tooltip: false,
    legend: { position: 'top-left' },
  });

  plot.update({
    plots: [
      {
        type: 'area',
        region: {
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0.4 },
        },
        options: {
          data: data1,
          xField: 'sessions',
          yField: 'visits',
          seriesField: 'type',
          isStack: false,
          meta: {
            visits: {
              min: 30,
              max: 180,
              tickItnerval: 30,
            },
            sessions: {
              range: [0, 1],
            },
          },
          yAxis: {
            grid: { line: { style: { lineDash: [4, 2], stroke: '#ddd' } } },
            tickLine: { style: { stroke: '#ddd' } },
          },
          xAxis: false,
          tooltip: { showMarkers: false, showCrosshairs: true, shared: true },
          areaStyle: ({ type }) => {
            const { colors10 } = plot.chart.getTheme();
            return {
              fill:
                type === 'Current Month'
                  ? `l(90) 0.3:${colors10[0]} 1:rgba(255,255,255,0.2)`
                  : `l(90) 0.3:${colors10[1]}  1:rgba(255,255,255,0.2)`,
            };
          },
          line: { style: { lineWidth: 1.5 } },
        },
      },
      {
        type: 'tiny-area',
        region: { start: { x: 0, y: 0.5 }, end: { x: 11 / 24, y: 0.7 } },
        options: {
          data: uvData.map((d) => d.uv),
          tooltip: DEFAULT_TOOLTIP_OPTIONS,
          meta: {
            iv: {
              min: 20,
            },
          },
          line: {
            style: { lineWidth: 1.5 },
          },
          annotations: [
            {
              type: 'text',
              content: 'Unique Sessions',
              position: ['min', 'max'],
              offsetY: -8,
              style: { textAlign: 'left' },
            },
            {
              type: 'text',
              content: `${uvData.reduce((a, b) => a + b.uv, 0)}`,
              position: ['max', 'median'],
              offsetX: 4,
              style: { textAlign: 'left' },
            },
          ],
        },
      },
      {
        type: 'tiny-area',
        region: { start: { x: 13 / 24, y: 0.5 }, end: { x: 17 / 18, y: 0.7 } },
        options: {
          data: pvData.map((d) => d.pv),
          tooltip: DEFAULT_TOOLTIP_OPTIONS,
          meta: {
            pv: {
              min: 20,
            },
          },
          line: {
            style: { lineWidth: 1.5 },
          },
          annotations: [
            {
              type: 'text',
              content: 'Page Sessions',
              position: ['min', 'max'],
              offsetY: -8,
              style: { textAlign: 'left' },
            },
            {
              type: 'text',
              content: `${pvData.reduce((a, b) => a + b.pv, 0)}`,
              position: ['max', 'median'],
              offsetX: 8,
              style: { textAlign: 'left' },
            },
          ],
        },
      },
      {
        type: 'tiny-area',
        region: { start: { x: 0 / 24, y: 0.75 }, end: { x: 11 / 24, y: 0.98 } },
        options: {
          data: directTrafficData.map((d) => d.directTraffic),
          tooltip: DEFAULT_TOOLTIP_OPTIONS,
          meta: {
            directTraffic: {
              min: 2000,
            },
          },
          line: {
            style: { lineWidth: 1.5 },
          },
          annotations: [
            {
              type: 'text',
              content: 'Direct Traffic',
              position: ['min', 'max'],
              offsetY: -8,
              style: { textAlign: 'left' },
            },
            {
              type: 'text',
              position: ['max', 'median'],
              content: `${directTrafficData.reduce((a, b) => a + b.directTraffic, 0)}`,
              offsetX: 8,
              style: { textAlign: 'left' },
            },
          ],
        },
      },
      {
        type: 'tiny-area',
        region: { start: { x: 13 / 24, y: 0.75 }, end: { x: 17 / 18, y: 0.98 } },
        options: {
          data: referringSitesData.map((d) => d.referringSites),
          tooltip: DEFAULT_TOOLTIP_OPTIONS,
          line: {
            style: { lineWidth: 1.5 },
          },
          annotations: [
            {
              type: 'text',
              content: 'Referring Sites',
              position: ['min', 'max'],
              offsetY: -8,
              style: { textAlign: 'left' },
            },
            {
              type: 'text',
              content: `${referringSitesData.reduce((a, b) => a + b.referringSites, 0)}`,
              position: ['max', 'median'],
              offsetX: 8,
              style: { textAlign: 'left' },
            },
          ],
        },
      },
    ],
  });
  plot.render();
});
