import { TinyArea } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1758', () => {
  it('tiny-area line.color', () => {
    const tinyArea = new TinyArea(createDiv('mini 面积图 color 配置不生效'), {
      height: 60,
      width: 300,
      autoFit: false,
      data: new Array(100).fill(0).map(() => Math.random() * 100),
      smooth: true,
      line: {
        color: 'red',
      },
    });

    tinyArea.render();

    expect(tinyArea.chart.geometries[1].elements[0].container.getChildByIndex(0).attr('stroke')).toBe('red');

    tinyArea.destroy();
  });
});
