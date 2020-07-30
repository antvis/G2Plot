import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y with animation', () => {
    const area = new Area(createDiv(), {
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
    });

    area.render();

    // 追加默认的动画配置
    expect(area.chart.geometries[0].animateOption).toEqual({
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
});
