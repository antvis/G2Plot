import { Heatmap } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/polar-heatmap.json')
  .then((res) => res.json())
  .then((data) => {
    const heatmapPlot = new Heatmap(document.getElementById('container'), {
      data,
      xField: 'time',
      yField: 'week',
      colorField: 'value',
      polar: true, // 极坐标属性
      legend: true,
      color: '#BAE7FF-#1890FF-#1028ff',
      heatmapStyle: {
        stroke: '#f5f5f5',
        opacity: 0.8,
      },
      meta: {
        time: {
          type: 'cat',
        },
        value: {
          min: 0,
          max: 1,
        },
      },
      xAxis: {
        line: null,
        grid: null,
        tickLine: null,
        label: {
          offset: 12,
          style: {
            fill: '#666',
            fontSize: 12,
            textBaseline: 'top',
          },
        },
      },
      yAxis: {
        top: true,
        line: null,
        grid: null,
        tickLine: null,
        label: {
          offset: 0,
          style: {
            fill: '#fff',
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
        },
      },
      tooltip: {
        showMarkers: false,
      },
      interactions: [{ type: 'element-active' }],
    });
    heatmapPlot.render();
  });
