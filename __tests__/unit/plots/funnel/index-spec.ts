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
    expect(labelsContainer.cfg.children.length).toEqual(5);

    PV_DATA.forEach((pvItem, index) => {
      const tmp = labelsContainer.cfg.children[index].cfg.data;
      expect(tmp.action).toBe(pvItem.action);
      expect(tmp.pv).toBe(pvItem.pv);
      expect(tmp[FUNNEL_PERCENT]).toBe(Math.round((pvItem.pv / PV_DATA[0].pv) * 100) / 100);
    });
    console.log(funnel);

    funnel.update({
      ...funnelOption,
      label: false,
    });
    expect(labelsContainer.cfg.children.length).toEqual(0);
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
