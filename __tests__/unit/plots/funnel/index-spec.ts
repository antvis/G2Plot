import { Funnel } from '../../../../src';
import { PV_DATA } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';
import { FUNNEL_PERCENT } from '../../../../src/plots/funnel/constant';

describe('basic funnel', () => {
  let funnel;

  const funnelOption = {
    width: 400,
    height: 400,
    data: PV_DATA,
    xField: 'action',
    yField: 'pv',
  };

  beforeAll(() => {
    funnel = new Funnel(createDiv('basic funnel'), funnelOption);
    funnel.render();
  });

  test('geometry test', () => {
    const geometry = funnel.chart.geometries[0];

    // 数据量
    expect(geometry.elements.length).toBe(PV_DATA.length);

    // geometry
    expect(geometry.type).toBe('interval');
    // @ts-ignore
    expect(geometry.adjustOption[0].type).toBe('symmetric');

    // position
    const positionFields = geometry.getAttribute('position').getFields();
    expect(positionFields).toHaveLength(3);
    expect(positionFields[0]).toBe('action');
    expect(positionFields[1]).toBe('pv');
    expect(positionFields[2]).toBe(FUNNEL_PERCENT);

    // shape
    const shapeFields = geometry.getAttribute('shape').getFields();
    expect(shapeFields[0]).toBe('funnel');

    // color
    const colorFields = geometry.getAttribute('color').getFields();
    expect(colorFields[0]).toBe('action');

    // transpose
    const coordinate = funnel.chart.getCoordinate();
    expect(coordinate.isRect).toBe(true);
    expect(coordinate.isTransposed).toBe(true);
  });

  test('geometry label', () => {
    const geometry = funnel.chart.geometries[0];
    const { labelOption, labelsContainer } = geometry;

    expect(labelOption.fields).toEqual(['action', 'pv', FUNNEL_PERCENT]);
    expect(labelsContainer.cfg.children.length).toBe(5);

    PV_DATA.forEach((pvItem, index) => {
      const tmp = labelsContainer.cfg.children[index].cfg.data;
      expect(tmp.action).toBe(pvItem.action);
      expect(tmp.pv).toBe(pvItem.pv);
      expect(tmp[FUNNEL_PERCENT]).toBe(Math.round((pvItem.pv / PV_DATA[0].pv) * 100) / 100);
    });

    funnel.update({
      ...funnelOption,
      label: false,
    });
    expect(labelsContainer.cfg.children.length).toBe(0);
  });

  test('conversionTag', () => {
    // 默认转化率组件
    const annotation = funnel.chart.getController('annotation').getComponents();
    expect(annotation.length).toEqual(4);
    PV_DATA.forEach((pvItem, index) => {
      if (index === 0) return;
      const content = annotation[index - 1].component.get('text').content;
      expect(content).toBe(`转化率${pvItem[FUNNEL_PERCENT] * 100}%`);
    });

    // 关闭转化率组件
    funnel.update({
      ...funnelOption,
      conversionTag: false,
    });

    expect(funnel.chart.getController('annotation').getComponents().length).toBe(0);

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

    // 自定义转化率组件
    const customAnnotation = funnel.chart.getController('annotation').getComponents();
    expect(customAnnotation.length).toEqual(4);
    PV_DATA.forEach((pvItem, index) => {
      if (index === 0) return;
      const text = customAnnotation[index - 1].component.get('text');
      expect(text.content).toBe(`${pvItem[FUNNEL_PERCENT]}转化`);
      expect(text.style.fill).toBe('#f00');
      expect(text.style.fontSize).toBe(18);
    });
  });

  // test('transpose', () => {
  //   funnel.update({
  //     ...funnelOption,
  //     transpose: true,
  //   });

  //   // transpose
  //   const coordinate = funnel.chart.getCoordinate();
  //   expect(coordinate.isRect).toBe(true);
  //   expect(coordinate.isTransposed).toBe(false);
  // });
});
