import { Area, Lab } from '@antv/g2plot';

const color = ['#5B8FF9', '#5D7092'];

// 创建容器2
const div = document.createElement('div');
div.id = 'container2';
document.querySelector('#container').parentNode.appendChild(div);

fetch('https://gw.alipayobjects.com/os/bmw-prod/b6fde479-c353-47de-a4c0-442d58474b9d.json')
  .then((data) => data.json())
  .then((data) => {
    const area = new Area('container', {
      data,
      xField: 'sessions',
      yField: 'visits',
      seriesField: 'type',
      color,
      padding: 'auto',
      isStack: false,
      appendPadding: [0, 0, 30, 0],
      height: 400,
      tooltip: { shared: true },
      meta: {
        visits: {
          min: 30,
          max: 180,
          tickItnerval: 30,
        },
        sessions: {
          range: [0.05, 0.95],
        },
      },
      yAxis: {
        grid: { line: { style: { lineDash: [4, 2], stroke: '#ddd' } } },
        tickLine: { style: { stroke: '#ddd' } },
      },
      xAxis: false,
      line: {},
      areaStyle: {
        fillOpacity: 0.5,
        fill: `l(90) 0:${color[0]} 0.8:#CDDDFD 1:rgba(255,255,255,0.2)`,
      },
      legend: { position: 'top' },
    });
    area.render();
  });

fetch('https://gw.alipayobjects.com/os/bmw-prod/b0b850d4-a8ce-4abe-8466-232a677af79c.json')
  .then((data) => data.json())
  .then((data) => {
    const uvData = data.uniqueSessions.map((d, idx) => ({
      date: `${idx}`,
      uv: d,
    }));
    const pvData = data.pageSessions.map((d, idx) => ({
      date: `${idx}`,
      pv: d,
    }));
    const directTrafficData = data.directTraffic.map((d, idx) => ({
      date: `${idx}`,
      directTraffic: d,
    }));
    const referringSitesData = data.referringSites.map((d, idx) => ({
      date: `${idx}`,
      referringSites: d,
    }));
    const labChart = new Lab.MultiView('container2', {
      height: 200,
      appendPadding: [25, 0, 0, 0],
      views: [
        {
          region: { start: { x: 0, y: 0 }, end: { x: 11 / 24, y: 1 / 4 } },
          data: uvData,
          meta: {
            uv: {
              min: 0,
            },
          },
          geometries: [
            { type: 'area', xField: 'date', yField: 'uv', mapping: {} },
            { type: 'line', xField: 'date', yField: 'uv', mapping: {} },
            {
              type: 'point',
              xField: 'date',
              yField: 'uv',
              mapping: {
                style: ({ uv }) => {
                  if (uv === Math.min(...uvData.map((d) => d.uv))) {
                    return {
                      r: 2,
                      fill: 'rgba(0,0,0,0.85)',
                      lineWidth: 0,
                    };
                  }
                  return { r: 0 };
                },
              },
            },
          ],
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
        {
          region: { start: { x: 13 / 24, y: 0 }, end: { x: 17 / 18, y: 1 / 4 } },
          data: pvData,
          meta: {
            pv: {
              min: 20,
            },
          },
          geometries: [
            { type: 'area', xField: 'date', yField: 'pv', mapping: {} },
            { type: 'line', xField: 'date', yField: 'pv', mapping: {} },
            {
              type: 'point',
              xField: 'date',
              yField: 'pv',
              mapping: {
                style: ({ pv }) => {
                  if (pv === Math.min(...pvData.map((d) => d.pv))) {
                    return {
                      r: 2,
                      fill: 'rgba(0,0,0,0.85)',
                      lineWidth: 0,
                    };
                  }
                  return { r: 0 };
                },
              },
            },
          ],
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
        {
          region: { start: { x: 0 / 24, y: 3 / 8 }, end: { x: 11 / 24, y: 5 / 8 } },
          data: directTrafficData,
          meta: {
            directTraffic: {
              min: 2000,
            },
          },
          geometries: [
            { type: 'area', xField: 'date', yField: 'directTraffic', mapping: {} },
            { type: 'line', xField: 'date', yField: 'directTraffic', mapping: {} },
            {
              type: 'point',
              xField: 'date',
              yField: 'directTraffic',
              mapping: {
                style: ({ directTraffic }) => {
                  if (directTraffic === Math.min(...directTrafficData.map((d) => d.directTraffic))) {
                    return {
                      r: 2,
                      fill: 'rgba(0,0,0,0.85)',
                      lineWidth: 0,
                    };
                  }
                  return { r: 0 };
                },
              },
            },
          ],
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
        {
          region: { start: { x: 13 / 24, y: 3 / 8 }, end: { x: 17 / 18, y: 5 / 8 } },
          data: referringSitesData,
          meta: {
            referringSites: {
              min: 2800,
            },
          },
          geometries: [
            { type: 'area', xField: 'date', yField: 'referringSites', mapping: {} },
            { type: 'line', xField: 'date', yField: 'referringSites', mapping: {} },
            {
              type: 'point',
              xField: 'date',
              yField: 'referringSites',
              mapping: {
                style: ({ referringSites }) => {
                  if (referringSites === Math.min(...referringSitesData.map((d) => d.referringSites))) {
                    return {
                      r: 2,
                      fill: 'rgba(0,0,0,0.85)',
                      lineWidth: 0,
                    };
                  }
                  return { r: 0 };
                },
              },
            },
          ],
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
      ],
    });
    labChart.render();
  });
