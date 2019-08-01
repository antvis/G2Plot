import { Pie } from '../../src';

describe('Pie plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '300px';
  canvasDiv.style.height = '300px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('创建饼图', () => {
    const data = [ {
      type: '分类一',
      value: 27
    }, {
      type: '分类二',
      value: 25
    }, {
      type: '分类三',
      value: 18
    }, {
      type: '分类四',
      value: 15
    }, {
      type: '分类五',
      value: 10
    }, {
      type: 'Other',
      value: 5
    } ];

    const data2 = [ {
      x: '分类一',
      y: 385,
      serie: 'default'
    }, {
      x: '分类二',
      y: 888,
      serie: 'default'
    }, {
      x: '分类三',
      y: 349,
      serie: 'default'
    }, {
      x: '分类四',
      y: 468,
      serie: 'default'
    }, {
      x: '分类五',
      y: 477,
      serie: 'default'
    } ];

    const pie = new Pie(canvasDiv, {
      width: 300,
      height: 300,
      data: data2,
      label: {
        type: 'inner',
        visible: true
      },
      tooltip: {
        visible: false
      },
      angleField: 'y',
      colorField: 'x',
      padding: 'auto',
      animation: false,
      radius: 1,
      innerRadius: 0.5,
      title: {
        text: '环图'
      },
      description: {
        text: '一个简单的环图'
      },
      legend: {
        visible: true,
        position: 'right-bottom'
      }
    });

    pie.render();
  });

});
