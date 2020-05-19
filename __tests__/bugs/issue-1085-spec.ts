import { StackedRose } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1085', () => {
  const data = [
    {
      type: '分类一',
      value: 27,
      user: '用户一',
    },
    {
      type: '分类二',
      value: 25,
      user: '用户一',
    },
    {
      type: '分类三',
      value: 18,
      user: '用户一',
    },
    {
      type: '分类四',
      value: 15,
      user: '用户一',
    },
    {
      type: '分类五',
      value: 10,
      user: '用户一',
    },
    {
      type: '其它',
      value: 5,
      user: '用户一',
    },
    {
      type: '分类一',
      value: 7,
      user: '用户二',
    },
    {
      type: '分类二',
      value: 5,
      user: '用户二',
    },
    {
      type: '分类三',
      value: 38,
      user: '用户二',
    },
    {
      type: '分类四',
      value: 5,
      user: '用户二',
    },
    {
      type: '分类五',
      value: 20,
      user: '用户二',
    },
    {
      type: '其它',
      value: 15,
      user: '用户二',
    },
  ];

  it('padding erroe in polar coord', () => {
    const rosePlot = new StackedRose(createDiv(), {
      radius: 0.8,
      data,
      radiusField: 'value',
      categoryField: 'type',
      stackField: 'user',
      label: {
        visible: true,
        type: 'inner',
      },
      legend: {
        visible: false,
      },
    });
    rosePlot.render();
    const layer = rosePlot.getLayers()[0];
    const { padding } = layer.options;
    expect(padding[0]).toBeLessThan(30);
    expect(padding[1]).toBeLessThan(30);
    expect(padding[2]).toBeLessThan(30);
    expect(padding[3]).toBeLessThan(30);
  });
});
