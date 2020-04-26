import DualLine from '../../../src/combo/dualLine';

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
    { year: '1991', value: 10 },
    { year: '1992', value: 4 },
    { year: '1993', value: 5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 35 },
    { year: '1997', value: 7 },
    { year: '1998', value: 1 },
    { year: '1999', value: 20 },
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
      yField: ['value', 'value'],
      legend: {
        position: 'top-left',
      },
    });
    dualLine.render();
  });
});
