import TinyColumn from '../../../src/tinyPlots/tiny-column';

describe('tiny column', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

  const data = [
    {
      year: '1991',
      value: 31,
    },
    {
      year: '1992',
      value: 41,
    },
    {
      year: '1993',
      value: 35,
    },
    {
      year: '1994',
      value: 55,
    },
    {
      year: '1995',
      value: 49,
    },
    {
      year: '1996',
      value: 15,
    },
    {
      year: '1997',
      value: 17,
    },
    {
      year: '1998',
      value: 29,
    },
    {
      year: '1999',
      value: 33,
    },
  ];

  it.only('图形渲染', () => {
    const tinyColumn = new TinyColumn(canvasDiv, {
      width: 200,
      height: 100,
      data,
      xField: 'year',
      yField: 'value',
      guideLine: [
        {
          type: 'median',
        },
      ],
    });
    tinyColumn.render();
  });
});
