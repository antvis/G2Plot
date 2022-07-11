import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  const line = new Line(createDiv(), {
    width: 400,
    height: 300,
    data: partySupport.filter((o) => ['FF'].includes(o.type)),
    xField: 'date',
    yField: 'value',
    appendPadding: 10,
    smooth: true,
    animation: {
      enter: {
        animation: 'fade-in',
      },
      leave: {
        animation: 'fade-out',
      },
    },
    point: {},
  });

  line.render();

  it('x*y with animation', () => {
    // 追加默认的动画配置
    expect(line.chart.geometries[0].animateOption).toEqual({
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
      appear: {
        duration: 450,
        easing: 'easeQuadOut',
      },
      update: {
        duration: 400,
        easing: 'easeQuadInOut',
      },
    });
  });

  it('x*y with animation callback', () => {
    line.update({
      animation: (type) => ({
        appear: {
          animation: type === 'line' ? 'wave-in' : 'fade-in',
          duration: type === 'line' ? 4500 : 1000,
          delay: type === 'line' ? 0 : 4500,
          easing: 'easeQuadIn',
        },
      }),
    });

    // 追加默认的动画配置
    expect(line.chart.geometries[0].animateOption).toMatchObject({
      appear: {
        animation: 'wave-in',
        duration: 4500,
        delay: 0,
        easing: 'easeQuadIn',
      },
    });

    // 追加默认的动画配置
    expect(line.chart.geometries[1].animateOption).toMatchObject({
      appear: {
        animation: 'fade-in',
        duration: 1000,
        delay: 4500,
        easing: 'easeQuadIn',
      },
    });

    line.destroy();
  });
});
