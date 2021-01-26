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
    total: {
      label: '总计',
    },
  });

  waterfall.render();

  it('legend', () => {
    const legendController = waterfall.chart.getController('legend');
    expect(legendController.getComponents().length).toBe(1);
    // 默认展示：rising, falling & total
    expect(legendController.getComponents()[0].id).toMatch('custom');
    expect(legendController.getComponents()[0].component.get('items').length).toBe(3);
    expect(legendController.getComponents()[0].component.get('items')[2].name).toBe('总计');
    expect(legendController.getComponents()[0].component.get('items')[2].value).toBe('total');

    waterfall.update({ total: { label: '测试' } });
    expect(legendController.getComponents()[0].component.get('items')[2].name).toBe('测试');

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
    // @ts-ignore 默认使用用户定义 yField 展示 tooltip
    expect(waterfall.chart.geometries[0].tooltipOption.fields[0]).toBe('sales');
    // @ts-ignore
    expect(waterfall.chart.options.tooltip.title).toBe('hello world');
  });

  it('tooltip: items', () => {
    const tooltipController = waterfall.chart.getController('tooltip');
    const box = waterfall.chart.geometries[0].elements[0].shape.getBBox();
    // @ts-ignore
    const items = tooltipController.getTooltipItems({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
    // @ts-ignore
    expect(items[0].name).toBe('sales');
    // @ts-ignore
    expect(items[0].value).toBe(`${salesByArea[0].sales}`);
  });

  it('tooltip: not visible', () => {
    waterfall.update({ tooltip: false });
    // @ts-ignore
    expect(waterfall.chart.options.tooltip).toBe(false);
    expect(waterfall.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  afterAll(() => {
    waterfall.destroy();
  });
});
