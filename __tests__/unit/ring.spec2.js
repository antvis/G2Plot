import { Ring } from '../../src';

describe('ring plot', () => {
  const canvasDiv = document.createElement('div');
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

    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '600px';
    canvasDiv.style.height = '600px';
    canvasDiv.style.left = '30px';
    canvasDiv.style.top = '30px';
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);

    const pie = new Ring(canvasDiv, {
      data,
      padding: 'auto',
      radius: 0.8,
      innerRadius: 0.6,
      angleField: 'value',
      colorField: 'type',
      /* label: {
        type: 'spider',
      },*/
      annotation: [
        { type: 'centralText',
          onActive: true
        }
      ]
    });

    pie.render();
  });

});
