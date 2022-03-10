import { Mix } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/SEif%2696Vd2/line-chart-with-anomaly-detection-style-data.json')
  .then((data) => data.json())
  .then((data) => {
    const { lineData, areaData } = data;
    const anomalyDetectionLineChart = new Mix('container', {
      appendPadding: 8,
      syncViewPadding: true,
      tooltip: {
        shared: true,
        showMarkers: false,
        showCrosshairs: true,
        offsetY: -50,
      },
      legend: {
        position: 'top-left',
        marker: (name, index, item) => {
          return {
            symbol: item.value === 'anomaly' ? 'circle' : 'hyphen',
            style: (oldStyle) => {
              return {
                ...oldStyle,
                r: item.value === 'anomaly' ? 2 : 6,
                fill: oldStyle.stroke,
              };
            },
          };
        },
      },
      plots: [
        {
          type: 'line',
          options: {
            data: lineData,
            xField: 'time',
            yField: 'value',
            seriesField: 'type',
            color: ['#588af1', '#ffa45c', '#f4664a'],
            yAxis: {
              label: {
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
              },
            },
            meta: {
              value: {
                sync: true,
              },
              type: {
                formatter: (v) => {
                  const mapping = {
                    actual: '实际值',
                    base: '基准值',
                    anomaly: '异常值',
                  };
                  return mapping[v];
                },
              },
            },
            lineStyle: ({ type }) => (type === 'anomaly' ? { opacity: 0 } : { opacity: 1 }),
            point: {
              shape: 'circle',
              style: ({ type }) => ({ r: type === 'anomaly' ? 3 : 0 }),
            },
          },
        },
        {
          type: 'area',
          options: {
            data: areaData,
            xField: 'time',
            yField: 'interval',
            color: '#ffd8b8',
            isStack: false,
            meta: {
              interval: {
                sync: 'value',
                nice: true,
                alias: '波动区间',
              },
            },
            legend: false,
            xAxis: false,
            yAxis: false,
          },
        },
      ],
    });

    anomalyDetectionLineChart.render();
  });
