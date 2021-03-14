import { Scatter } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/f950b2f1-038b-47c2-afcc-63001bc8d07c.json')
  .then((res) => res.json())
  .then((data) => {
    const processData = data.map((item) => {
      item['Average annual wage'] = item['Average annual wage'] * 1;
      item['probability'] = item['probability'] * 1;
      item['numbEmployed'] = item['numbEmployed'] * 1;
      return item;
    });
    const labels = ['Airline Pilots, Copilots and Flight Engineers', 'Benefits Managers'];
    const scatterPlot = new Scatter('container', {
      appendPadding: 30,
      data: processData,
      xField: 'probability',
      yField: 'Average annual wage',
      colorField: 'education',
      size: [2, 16],
      sizeField: 'numbEmployed',
      shape: 'circle',
      yAxis: {
        nice: false,
        min: -20000,
        tickCount: 5,
        position: 'right',
        label: {
          formatter: (value) => {
            return Math.floor(value / 1000) + 'K';
          },
        },
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
        line: {
          style: {
            stroke: '#aaa',
          },
        },
      },
      tooltip: {
        fields: ['probability', 'Average annual wage', 'numbEmployed'],
      },
      legend: {
        position: 'top',
      },
      xAxis: {
        min: -0.04,
        max: 1.04,
        nice: false,
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
        line: false,
        label: false,
      },
      label: {
        formatter: (item) => {
          return labels.includes(item['short occupation']) ? item['short occupation'] : '';
        },
        offsetY: -10,
      },
      annotations: [
        {
          type: 'line',
          start: [-0.04, 100000],
          end: [1.04, 30000],
          style: {
            stroke: '#aaa',
          },
        },
        {
          type: 'text',
          position: ['1.03', 'max'],
          content: 'Average annual wage',
          style: {
            textAlign: 'right',
            fontWeight: '500',
            fill: 'rgb(92, 92, 92)',
          },
        },
        {
          type: 'text',
          position: ['1.03', 'min'],
          content: 'Most likely to \nbe automated ',
          style: {
            textAlign: 'right',
            fontWeight: '500',
            fill: 'rgb(92, 92, 92)',
          },
        },
        {
          type: 'text',
          position: ['-0.03', 'min'],
          content: 'Least likely to \nbe automated ',
          style: {
            textAlign: 'left',
            fontWeight: '500',
            fill: 'rgb(92, 92, 92)',
          },
        },
      ],
    });
    scatterPlot.render();
  });
