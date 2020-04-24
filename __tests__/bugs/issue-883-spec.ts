import { Line } from '../../src';

describe('#883', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('guidline暂时只支持非转置坐标系', () => {
    const data = [
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

    const linePlot = new Line(canvasDiv, {
      data,
      xField: 'value',
      yField: 'year',
      guideLine: [
        {
          type: 'mean',
        },
      ],
    });
    linePlot.render();
    linePlot.destroy();
  });
});
