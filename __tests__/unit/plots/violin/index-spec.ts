import { group } from '@antv/util';
import { Violin } from '../../../../src';
import {
  MEDIAN_FIELD,
  MIN_MAX_FIELD,
  QUANTILE_FIELD,
  VIOLIN_VIEW_ID,
  VIOLIN_Y_FIELD,
  X_FIELD,
} from '../../../../src/plots/violin/constant';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin', () => {
  it("renders N violins, where N equals to xField's length.", () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
    });

    violin.render();
    const g = violin.chart.views.find((view) => view.id === VIOLIN_VIEW_ID).geometries[0];

    // 个数
    expect(g.elements.length).toBe(group(BASE_VIOLIN_DATA, 'type').length);
    // 类型
    expect(g.type).toBe('violin');

    violin.destroy();
  });

  it("renders N violins, where N equals to (xField * sierisField)'s length.", () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
      seriesField: 'species',
    });

    violin.render();
    const g = violin.chart.views.find((view) => view.id === VIOLIN_VIEW_ID).geometries[0];

    // 个数
    expect(g.elements.length).toBe(group(BASE_VIOLIN_DATA, ['type', 'species']).length);
    // 类型
    expect(g.type).toBe('violin');

    violin.destroy();
  });

  const violin = new Violin(createDiv(), {
    width: 400,
    height: 500,
    data: BASE_VIOLIN_DATA,
    xField: 'type',
    yField: 'value',
    xAxis: {
      tickCount: 5,
    },
    yAxis: {
      // fixme 设置 min 为 10 不生效
      // min: 10,
      minLimit: 10,
      max: 20,
    },
  });

  violin.render();

  it('axis & meta', () => {
    const geometry = violin.chart.views[0].geometries[0];
    const geometry1 = violin.chart.views[1].geometries[0];
    const geometry2 = violin.chart.views[2].geometries[0];
    const geometry3 = violin.chart.views[3].geometries[0];
    expect(geometry.scales[X_FIELD].tickCount).toBe(5);
    expect(geometry.scales[VIOLIN_Y_FIELD].min).toBe(10);
    expect(geometry.scales[VIOLIN_Y_FIELD].max).toBe(20);

    expect(geometry1.scales[MIN_MAX_FIELD].min).toBe(10);
    expect(geometry1.scales[MIN_MAX_FIELD].max).toBe(20);
    // @ts-ignore
    expect(geometry1.scales[MIN_MAX_FIELD].sync).toBe(VIOLIN_Y_FIELD);

    expect(geometry2.scales[QUANTILE_FIELD].min).toBe(10);
    expect(geometry2.scales[QUANTILE_FIELD].max).toBe(20);
    // @ts-ignore
    expect(geometry2.scales[QUANTILE_FIELD].sync).toBe(VIOLIN_Y_FIELD);

    expect(geometry3.scales[MEDIAN_FIELD].min).toBe(10);
    expect(geometry3.scales[MEDIAN_FIELD].max).toBe(20);
    // @ts-ignore
    expect(geometry3.scales[MEDIAN_FIELD].sync).toBe(VIOLIN_Y_FIELD);
  });

  afterAll(() => {
    violin.destroy();
  });
});
