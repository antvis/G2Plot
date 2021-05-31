import { Violin } from '../../../../src';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin legend', () => {
  const violin = new Violin(createDiv(), {
    width: 400,
    height: 500,
    data: BASE_VIOLIN_DATA,
    xField: 'type',
    yField: 'value',
    animation: {
      enter: {
        animation: 'fade-in',
      },
      leave: {
        animation: 'fade-out',
      },
    },
  });

  violin.render();

  it('default', () => {
    // 新的 geometry violin 暂时未追加
    expect(violin.chart.views[0].geometries[0].animateOption).toEqual({
      enter: {
        animation: 'fade-in',
      },
      leave: {
        animation: 'fade-out',
      },
    });

    // 追加默认的动画配置
    expect(violin.chart.views[1].geometries[0].animateOption).toMatchObject({
      appear: {
        duration: 450,
        easing: 'easeQuadOut',
      },
      update: {
        duration: 400,
        easing: 'easeQuadInOut',
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

  it('update', () => {
    violin.update({
      animation: {
        appear: {
          animation: 'fade-in',
        },
        leave: {
          animation: 'wave-out',
        },
      },
    });
    expect(violin.chart.views[0].geometries[0].animateOption).toEqual({
      appear: {
        animation: 'fade-in',
      },
      enter: {
        animation: 'fade-in',
      },
      leave: {
        animation: 'wave-out',
      },
    });
  });

  afterAll(() => {
    violin.destroy();
  });
});
