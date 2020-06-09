import { Pie } from '../../src';
import { createDiv } from '../utils/dom';

describe('#803', () => {
  const div = createDiv('canvas1');
  document.body.appendChild(div);
  const data = [
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

  it('position should be relative', () => {
    const pie = new Pie(div, {
      width: 600,
      height: 600,
      data,
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
        visible: true,
        text: '饼图',
      },
      description: {
        visible: true,
        text: '1.第一行第一行第一行第一行longlonglonglonglonglonglonglonglong\n2.第二行第二行第二行longlong\n3.第三行',
      },
      legend: {
        visible: true,
        // position: 'right-bottom'
      },
    });

    pie.render();

    expect(div.style.position).toBe('relative');
  });
});
