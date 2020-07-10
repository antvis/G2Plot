import { RangeBar } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1059', () => {
  const data = [
    { type: '分类一', values: [76, 100] },
    { type: '分类二', values: [56, 108] },
    { type: '分类三', values: [38, 129] },
    { type: '分类四', values: [58, 155] },
    { type: '分类五', values: [45, 120] },
    { type: '分类六', values: [23, 99] },
    { type: '分类七', values: [18, 56] },
    { type: '分类八', values: [18, 34] },
    { type: '分类九', values: [76, 100] },
    { type: '分类十', values: [56, 108] },
    { type: '分类十一', values: [38, 129] },
    { type: '分类十二', values: [58, 155] },
    { type: '分类十三', values: [45, 120] },
    { type: '分类十四', values: [23, 99] },
  ];
  const plot = new RangeBar(createDiv(), {
    title: {
      visible: true,
      text: '区间条形图',
    },
    data,
    xField: 'values',
    yField: 'type',
    interactions: [
      {
        type: 'scrollbar',
        cfg: {
          type: 'vertical',
        },
      },
    ],
  });

  plot.render();

  it('render', async () => {
    const { canvas } = plot;
    expect(canvas).not.toBeNull();
    expect(canvas.getCanvas().destroyed).toBe(false);
  });
});
