import DualLine from '../../../src/combo/dual-line';

describe('dualLine', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data1 = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const data2 = [
    { year: '1991', count: 10 },
    { year: '1992', count: 4 },
    { year: '1993', count: 5 },
    { year: '1994', count: 5 },
    { year: '1995', count: 4.9 },
    { year: '1996', count: 35 },
    { year: '1997', count: 7 },
    { year: '1998', count: 1 },
    { year: '1999', count: 20 },
  ];

  it('init', () => {
    const dualLine = new DualLine(canvasDiv, {
      title: {
        visible: true,
        text: '双折线图',
        alignTo: 'left',
      },
      description: {
        visible: true,
        text: '双折线混合图表',
        alignTo: 'left',
      },
      data: [data1, data2],
      xField: 'year',
      yField: ['value', 'count'],
      yAxis: {
        max: 35,
        tickCount: 5,
      },
      tooltip: {
        visible: true,
      },
      lineConfigs: [
        { color: 'green', smooth: false },
        {
          color: 'red',
          smooth: true,
          point: {
            visible: true,
          },
          label: {
            visible: true,
          },
          lineSize: 4,
          lineStyle: {
            opacity: 0.5,
          },
        },
      ],
      legend: {
        visible: true,
        text: {
          style: {
            fill: 'red',
            formatter: () => 'a',
          },
        },
      },
    });
    dualLine.render();
    /*dualLine.updateConfig({
      title: {
        visible: false,
      },
      legend: {
        visible: false,
      },
      lineConfigs: [
        { color: 'red', smooth: true },
        { color: 'green', smooth: true },
      ],
      yAxis: {
        leftConfig: { visible: false },
      },
    });
    dualLine.render();*/
  });
});
