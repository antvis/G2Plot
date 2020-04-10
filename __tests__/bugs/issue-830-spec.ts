import { Pie } from '../../src';
import { createDiv } from '../utils/dom';
import { transform } from '@antv/matrix-util';

describe('#830 饼图旋转角度不正确', () => {
  const div = createDiv('container');
  const data = [
    {
      type: '分类一',
      value: 25,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 25,
    },
    {
      type: '分类四',
      value: 25,
    },
  ];

  it('autoRotate', () => {
    const piePlot = new Pie(div, {
      forceFit: true,
      radius: 0.8,
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'inner',
        formatter: (t, item) => `${item.type}`,
      },
    });

    piePlot.render();
    const label3 = piePlot
      .getLayer()
      .view.geometries[0].labelsContainer.get('children')[2]
      .get('children')[0];
    const x = label3.attr('x');
    const y = label3.attr('y');
    const angle = label3.attr('angle');
    const matrix = transform(label3.getMatrix(), [
      ['t', -x, -y],
      // 第三象限的角度要旋转多 180
      ['r', angle + Math.PI],
      ['t', x, y],
    ]);

    piePlot.updateConfig({
      label: { autoRotate: true },
    });
    piePlot.render();
    const rotatedLabel3 = piePlot
      .getLayer()
      .view.geometries[0].labelsContainer.get('children')[2]
      .get('children')[0];
    const rotatedMatrix = rotatedLabel3.attr('matrix');

    expect(matrix).toEqual(rotatedMatrix);
  });
});
