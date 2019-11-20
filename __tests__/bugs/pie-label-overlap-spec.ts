import { Pie } from '../../src';

describe('#112', () => {
  const createDiv = (id: string) => {
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '600px';
    canvasDiv.style.height = '500px';
    canvasDiv.id = id;
    document.body.appendChild(canvasDiv);
    return canvasDiv;
  };
  const data = [
    {
      x: '分类一',
      y: 985,
      serie: 'default',
    },
    {
      x: '分类二',
      y: 888,
      serie: 'default',
    },
    {
      x: '分类三',
      y: 549,
      serie: 'default',
    },
    {
      x: '分类四',
      y: 468,
      serie: 'default',
    },
    {
      x: '分类五',
      y: 477,
      serie: 'default',
    },
    {
      x: '分类 6',
      y: 200,
      serie: 'default',
    },
    {
      x: '分类 7',
      y: 200,
      serie: 'default',
    },
    {
      x: '分类 8',
      y: 200,
      serie: 'default',
    },
    {
      x: '分类 9',
      y: 100,
      serie: 'default',
    },
    {
      x: '其他',
      y: 200,
      serie: 'default',
    },
  ];

  it('normal', () => {
    const canvasDiv = createDiv('div1');
    const pie = new Pie(canvasDiv, {
      forceFit: true,
      padding: [16, 0, 0, 0],
      data,
      label: {
        visible: true,
        type: 'upgrade-pie',
        style: {
          fontSize: 12,
          lineHeight: 14,
        },
        formatter: (text, item) => {
          return `${item._origin['x']}\n${item._origin['y']}`;
        },
      },
      tooltip: {
        visible: false,
      },
      angleField: 'y',
      colorField: 'x',
      animation: false,
      radius: 0.8,
      title: {
        visible: true,
        text: '饼图 双行label nice looking',
      },
      legend: {
        visible: false,
        // position: 'right-bottom'
      },
    });

    pie.render();
  });

  it('异常', () => {
    const canvasDiv = createDiv('div2');
    const pie = new Pie(canvasDiv, {
      forceFit: true,
      padding: [16, 0, 0, 0],
      data: [
        ...data,
        {
          x: '分类 10',
          y: 111,
          serie: 'default',
        },
      ],
      label: {
        visible: true,
        type: 'upgrade-pie',
        style: {
          fontSize: 12,
          lineHeight: 14,
        },
        formatter: (text, item) => {
          return `${item._origin['x']}\n${item._origin['y']}`;
        },
      },
      tooltip: {
        visible: false,
      },
      angleField: 'y',
      colorField: 'x',
      animation: false,
      radius: 0.8,
      title: {
        visible: true,
        text: '饼图 双行label 拉线存在异常',
      },
      legend: {
        visible: false,
        // position: 'right-bottom'
      },
    });

    pie.render();
  });
});
