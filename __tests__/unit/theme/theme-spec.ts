import { GroupedColumn, Line } from '../../../src';

const data = [
  {
    date: '2018/8/1',
    type: 'download',
    value: 4623,
  },
  {
    date: '2018/8/1',
    type: 'register',
    value: 2208,
  },
  {
    date: '2018/8/1',
    type: 'bill',
    value: 182,
  },
  {
    date: '2018/8/2',
    type: 'download',
    value: 6145,
  },
  {
    date: '2018/8/2',
    type: 'register',
    value: 2016,
  },
  {
    date: '2018/8/2',
    type: 'bill',
    value: 257,
  },
  {
    date: '2018/8/3',
    type: 'download',
    value: 508,
  },
  {
    date: '2018/8/3',
    type: 'register',
    value: 2916,
  },
  {
    date: '2018/8/3',
    type: 'bill',
    value: 289,
  },
  {
    date: '2018/8/4',
    type: 'download',
    value: 6268,
  },
  {
    date: '2018/8/4',
    type: 'register',
    value: 4512,
  },
  {
    date: '2018/8/4',
    type: 'bill',
    value: 428,
  },
  {
    date: '2018/8/5',
    type: 'download',
    value: 6411,
  },
  {
    date: '2018/8/5',
    type: 'register',
    value: 8281,
  },
  {
    date: '2018/8/5',
    type: 'bill',
    value: 619,
  },
  {
    date: '2018/8/6',
    type: 'download',
    value: 1890,
  },
  {
    date: '2018/8/6',
    type: 'register',
    value: 2008,
  },
  {
    date: '2018/8/6',
    type: 'bill',
    value: 87,
  },
  {
    date: '2018/8/7',
    type: 'download',
    value: 4251,
  },
  {
    date: '2018/8/7',
    type: 'register',
    value: 1963,
  },
  {
    date: '2018/8/7',
    type: 'bill',
    value: 706,
  },
  {
    date: '2018/8/8',
    type: 'download',
    value: 2978,
  },
  {
    date: '2018/8/8',
    type: 'register',
    value: 2367,
  },
  {
    date: '2018/8/8',
    type: 'bill',
    value: 387,
  },
  {
    date: '2018/8/9',
    type: 'download',
    value: 3880,
  },
  {
    date: '2018/8/9',
    type: 'register',
    value: 2956,
  },
  {
    date: '2018/8/9',
    type: 'bill',
    value: 488,
  },
];

describe('defalut light', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.style.display = 'block';
  document.body.appendChild(canvasDiv);

  it('default light', () => {
    const linePlot = new GroupedColumn(canvasDiv, {
      width: 600,
      height: 600,
      theme: 'default-dark',
      data,
      xField: 'date',
      yField: 'value',
      groupField: 'type',
      color: {
        type: 'diverging',
        name: 'grow',
      },
      /*guideLine: [
        {
          type: 'mean',
          text: {
            content: 'test',
          },
        },
      ],*/
    });
    linePlot.render();
  });

  it('single color', () => {
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
      width: 600,
      height: 600,
      theme: 'default-dark',
      data,
      xField: 'year',
      yField: 'value',
      color: 'red',
    });
    linePlot.render();
  });
});
