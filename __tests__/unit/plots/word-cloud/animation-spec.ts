import { WordCloud } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('word-cloud', () => {
  it('animation', () => {
    const cloud = new WordCloud(createDiv(), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
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

    cloud.render();

    // 追加默认的动画配置
    expect(cloud.chart.geometries[0].animateOption).toEqual({
      appear: {
        duration: 450,
        easing: 'easeQuadOut',
        animation: 'zoom-in',
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
