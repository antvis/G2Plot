import { Funnel } from '../../../../src';
import { PV_DATA_COMPARE } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';
import { FUNNEL_PERCENT } from '../../../../src/plots/funnel/constant';

describe('compare funnel', () => {
  let funnel;
  const funnelOption = {
    width: 400,
    height: 400,
    data: PV_DATA_COMPARE,
    autoFit: true,
    xField: 'action',
    yField: 'pv',
    compareField: 'quarter',
  };

  beforeAll(() => {
    funnel = new Funnel(createDiv('basic funnel'), funnelOption);
    funnel.render();
  });

  test('geometry test', () => {
    const funnelViews = funnel.chart.views;

    // transpose
    const coordinate = funnel.chart.getCoordinate();
    expect(coordinate.isRect).toBe(true);
    expect(coordinate.isTransposed).toBe(false);

    funnelViews.forEach((funnelView) => {
      const geometry = funnelView.geometries[0];
      // 数据量
      expect(geometry.elements.length).toBe(5);

      // geometry
      expect(geometry.type).toBe('interval');
      // @ts-ignore

      // position
      const positionFields = geometry.getAttribute('position').getFields();
      expect(positionFields).toHaveLength(3);
      expect(positionFields[0]).toBe('action');
      expect(positionFields[1]).toBe('pv');
      expect(positionFields[2]).toBe(FUNNEL_PERCENT);

      const shapeFields = geometry.getAttribute('shape').getFields();
      expect(shapeFields[0]).toBe('funnel');

      const colorFields = geometry.getAttribute('color').getFields();
      expect(colorFields[0]).toBe('action');
    });
  });

  test('geometry label', () => {
    funnel.chart.views.forEach((funnelView) => {
      const geometry = funnelView.geometries[0];
      const { labelOption, labelsContainer } = geometry;
      expect(labelOption.fields).toEqual(['action', 'pv', FUNNEL_PERCENT]);
      expect(labelsContainer.cfg.children.length).toBe(5);
      expect(labelOption.cfg.style.fill).toBe('#fff');
      expect(labelOption.cfg.style.fontSize).toBe(12);
    });

    // 自定义 label
    funnel.update({
      ...funnelOption,
      label: {
        style: {
          fill: '#f00',
          fontSize: 14,
        },
        callback: (xField, yField) => ({
          content: `${yField}`,
        }),
      },
    });

    funnel.chart.views.forEach((funnelView) => {
      expect(funnelView.geometries[0].labelOption.cfg.style.fill).toBe('#f00');
      expect(funnelView.geometries[0].labelOption.cfg.style.fontSize).toBe(14);
    });

    // 关闭 label
    funnel.update({
      ...funnelOption,
      label: false,
    });

    funnel.chart.views.forEach((funnelView) => {
      expect(funnelView.geometries[0].labelsContainer.cfg.children.length).toBe(0);
    });
  });

  test('conversionTag', () => {
    // 默认转化率组件
    funnel.chart.views.forEach((funnelView) => {
      const { data } = funnelView.getOptions();
      const annotation = funnelView.getController('annotation').getComponents();
      expect(annotation.length).toEqual(5);
      expect(annotation[0].component.cfg.content).toBe(data[0].quarter);
      data.forEach((pvItem, index) => {
        if (index === 0) return;
        expect(annotation[index].component.get('text').content).toBe(`转化率${pvItem[FUNNEL_PERCENT] * 100}%`);
      });
    });

    // 自定义转化率组件
    funnel.update({
      ...funnelOption,
      conversionTag: {
        style: {
          fill: '#f00',
          fontSize: 18,
        },
        formatter: (datum) => `${datum.$$percentage$$}转化`,
      },
    });
    funnel.chart.views.forEach((funnelView) => {
      const { data } = funnelView.getOptions();
      const customAnnotation = funnelView.getController('annotation').getComponents();
      expect(customAnnotation.length).toEqual(5);
      data.forEach((pvItem, index) => {
        if (index === 0) return;
        const text = customAnnotation[index].component.get('text');
        expect(text.content).toBe(`${pvItem[FUNNEL_PERCENT]}转化`);
        expect(text.style.fill).toBe('#f00');
        expect(text.style.fontSize).toBe(18);
      });
    });

    // 关闭转化率组件
    funnel.update({
      ...funnelOption,
      conversionTag: false,
    });

    funnel.chart.views.forEach((funnelView) => {
      expect(funnelView.getController('annotation').getComponents().length).toEqual(1);
    });
  });

  test('transpose', () => {
    funnel.update({
      ...funnelOption,
      transpose: true,
    });

    // transpose
    const coordinate = funnel.chart.getCoordinate();
    expect(coordinate.isRect).toBe(true);
    expect(coordinate.isTransposed).toBe(false);
  });
});
