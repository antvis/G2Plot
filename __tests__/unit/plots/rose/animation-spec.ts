import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose', () => {
  it('animation', () => {
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      appendPadding: 10,
      animation: {
        enter: {
          animation: 'fade-in',
        },
        leave: {
          animation: 'fade-out',
        },
      },
    });

    rose.render();

    // 追加默认的动画配置
    expect(rose.chart.geometries[0].animateOption).toEqual({
      appear: {
        duration: 450,
        easing: 'easeQuadOut',
      },
      update: {
        duration: 400,
        easing: 'easeQuadInOut',
        animation: null,
      },
      enter: {
        duration: 400,
        easing: 'easeQuadInOut',
        animation: 'fade-in',
      },
      leave: {
        duration: 350,
        easing: 'easeQuadIn',
        animation: 'fade-out',
      },
    });
  });
});
