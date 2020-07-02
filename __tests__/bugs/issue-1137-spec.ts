import { Bar } from '../../src';
import { createDiv } from '../utils/dom';
import { wait } from '../utils/common';

const getData = (cnt: number) => {
  return new Array(cnt)
    .fill({
      name: '',
      value: 0,
    })
    .map((val, idx) => ({
      name: `name_${idx}`,
      value: Math.floor(Math.random() * 100),
    }));
};

describe('#1137', () => {
  const plot = new Bar(createDiv(), {
    localRefresh: false,
    data: getData(50),
    xField: 'value',
    yField: 'name',
    label: {
      visible: true,
      type: 'bar-auto',
    },
    animation: true,
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
  setTimeout(() => {
    plot.changeData(getData(100));
  }, 1000);

  it('test', async () => {
    await wait(2000);
    const view = plot.getView();
    const label = plot.getLayer().getLabels()[0];
    const geometry = view.geometries[0];

    // 滚动条是否生效了
    expect(geometry.elements).toHaveLength(16);

    // 数据标签
    label.getLabels().forEach((item) => {
      expect(item.attr('stroke')).toBeUndefined();
    });
  });
});
