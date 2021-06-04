import { Violin } from '../../../../src';
import { MIN_MAX_VIEW_ID, QUANTILE_VIEW_ID, MEDIAN_VIEW_ID } from '../../../../src/plots/violin/constant';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin', () => {
  it('renders box views.', () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
    });

    violin.render();
    const minMaxView = violin.chart.views.find((view) => view.id === MIN_MAX_VIEW_ID);
    const quantileView = violin.chart.views.find((view) => view.id === QUANTILE_VIEW_ID);
    const medianView = violin.chart.views.find((view) => view.id === MEDIAN_VIEW_ID);

    expect(minMaxView.geometries[0].type).toBe('interval');
    expect(quantileView.geometries[0].type).toBe('interval');
    expect(medianView.geometries[0].type).toBe('point');

    violin.destroy();
  });

  it("should not render box views when 'box' set to false.", () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
      box: false,
    });

    violin.render();
    const minMaxView = violin.chart.views.find((view) => view.id === MIN_MAX_VIEW_ID);
    const quantileView = violin.chart.views.find((view) => view.id === QUANTILE_VIEW_ID);
    const medianView = violin.chart.views.find((view) => view.id === MEDIAN_VIEW_ID);

    expect(minMaxView).toBeUndefined();
    expect(quantileView).toBeUndefined();
    expect(medianView).toBeUndefined();

    violin.destroy();
  });

  it('should not render box with custom textMap.', () => {
    const textMap = {
      max: '最大值',
      min: '最小值',
      median: '中位值',
      q1: '上四分位点',
      q3: '下四分位点',
    };
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
      box: {
        textMap,
      },
    });

    violin.render();

    // @ts-ignore
    expect(violin.options.box.textMap).toEqual(textMap);

    violin.destroy();
  });
});
