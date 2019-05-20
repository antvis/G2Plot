import { Pie } from '../../src';

describe('Pie plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
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

    const pie = new Pie(canvasDiv, {
      data,
      padding: 'auto',
      angleField: 'value',
      colorField: 'type',
      label: {
        type: 'spider',
        /* style: {
          lineWidth: 2,
          text: {
            fontSize: 14,
            fill: '#ccc'
          },
          anchorSize: 3
        }*/
      }
    });

    pie.render();

  });

});
