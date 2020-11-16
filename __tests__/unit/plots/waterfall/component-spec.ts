import { Waterfall } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('waterfall components', () => {
  const waterfall = new Waterfall(createDiv(), {
    width: 400,
    height: 300,
    data: salesByArea,
    xField: 'area',
    yField: 'sales',
  });

  waterfall.render();

  it('legend', () => {
    const legendController = waterfall.chart.getController('legend');
    expect(legendController.getComponents().length).toBe(1);
    // 默认展示：rising, falling & total
    expect(legendController.getComponents()[0].id).toMatch('custom');
    expect(legendController.getComponents()[0].component.get('items').length).toBe(3);

    waterfall.update({ total: false });
    expect(legendController.getComponents()[0].component.get('items').length).toBe(2);

    waterfall.update({ legend: false });
    expect(legendController.getComponents().length).toBe(0);
  });

  it('tooltip', () => {
    const tooltipController = waterfall.chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.getTooltipCfg().showMarkers).toBe(false);
    waterfall.update({
      tooltip: {
        title: 'hello world',
        showMarkers: true,
      },
    });
    // @ts-ignore
    expect(tooltipController.getTooltipCfg().showMarkers).toBe(true);
    // @ts-ignore
    expect(waterfall.chart.geometries[0].tooltipOption.fields[0]).toBe(
      'sales'
    ) /** 默认使用用户定义 yField 展示 tooltip */;
    // @ts-ignore
    expect(waterfall.chart.options.tooltip.title).toBe('hello world');
    waterfall.update({
      ...waterfall.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(waterfall.chart.options.tooltip).toBe(undefined);
    expect(waterfall.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  afterAll(() => {
    waterfall.destroy();
  });
});
