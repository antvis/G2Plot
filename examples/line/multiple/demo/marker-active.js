import { Line } from '@antv/g2plot';
import { uniq, findIndex } from '@antv/util';

fetch('../data/emissions.json')
  .then((res) => res.json())
  .then((data) => {
    const COLOR_PLATE_10 = [
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E8684A',
      '#6DC8EC',
      '#9270CA',
      '#FF9D4D',
      '#269A99',
      '#FF99C3',
    ];

    const container = document.getElementById('container');
    const containerBox = container.getBoundingClientRect();
    const series = uniq(data.map((d) => d.category));
    const markerSize = 6;

    const linePlot = new Line(container, {
      title: {
        visible: true,
        text: '自定义 marker point 激活样式',
      },
      padding: 'auto',
      forceFit: true,
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      legend: {
        position: 'right-top',
      },
      color: COLOR_PLATE_10,
      point: {
        visible: true,
        shape: {
          fields: ['category'],
          callback: (v) => {
            if (v === 'Gas fuel') {
              return 'square';
            }
            return 'circle';
          },
        },
        style: (seriesField, xField) => {
          let r = markerSize / 2;
          // 自定义规则
          const maxCount = containerBox.width / (r * 4);
          const interval = Math.floor(data.length / maxCount);
          const fieldIdx = data.findIndex((d) => d['year'] === xField);
          if (fieldIdx && interval > 1 && fieldIdx % interval !== 0) {
            r = 0;
          }
          let fill = '';
          let lineWidth = 0;
          if (seriesField === 'Gas fuel') {
            fill = 'transparent';
            lineWidth = 1;
          }

          return {
            lineWidth,
            fill,
            r,
            stroke: COLOR_PLATE_10[findIndex(series, (s) => s === seriesField)] || 'transparent',
          };
        },
      },
      interactions: [{ type: 'marker-active' }, { type: 'element-active' }],
      responsive: true,
      theme: {
        pointStyle: {
          normal: {},
          active: () => {
            return {
              stroke: 'rgba(0, 0, 0, 0.85)',
              r: markerSize / 2,
              lineWidth: 1,
            };
          },
        },
        geometries: {
          point: {
            square: {
              active: {
                style: {
                  stroke: 'rgba(0, 0, 0, 0.85)',
                  lineWidth: 1,
                  r: markerSize / 2,
                },
              },
            },
          },
        },
      },
    });

    linePlot.render();
  });
