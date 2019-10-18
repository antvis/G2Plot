import { Pie } from '../../src';

describe('Pie plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data2 = [
    {
      x: '分类一',
      y: 385,
      serie: 'default',
    },
    {
      x: '分类二',
      y: 888,
      serie: 'default',
    },
    {
      x: '分类三',
      y: 349,
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
  ];

  it('创建饼图', () => {
    const pie = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data: data2,
      label: {
        visible: true,
        type: 'spider',
      },
      tooltip: {
        visible: false,
      },
      angleField: 'y',
      colorField: 'x',
      padding: 'auto',
      animation: false,
      radius: 1,
      title: {
        text: '饼图',
      },
      description: {
        text: '一个简单的饼图',
      },
      legend: {
        visible: true,
        // position: 'right-bottom'
      },
    });

    pie.render();
  });

  it('Events in spider pie', () => {
    const pie = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data: data2,
      label: {
        visible: true,
        type: 'spider',
      },
      tooltip: {
        visible: false,
      },
      angleField: 'y',
      colorField: 'x',
      padding: 'auto',
      animation: false,
      radius: 1,
      title: {
        text: 'spider-pie with events',
      },
      legend: {
        visible: true,
      },
      events: {
        'label:mouseenter': (e) => {
          console.log('label:mouseenter');
        },
        // 两种写法都可以
        onLabelMouseenter: (e) => {
          console.log('onLabelMouseenter');
        },
      },
    });

    pie.render();
  });
});
