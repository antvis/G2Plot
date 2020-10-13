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

    const coordinate = funnel.chart.getCoordinate();
    expect(coordinate.isRect).toBe(true);
    expect(coordinate.isTransposed).toBe(false);

    funnelViews.forEach((funnelView) => {
      const geometry = funnelView.geometries[0];
      console.log(geometry);
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
