import { Funnel } from '../../../../src';
import { PV_DATA } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';
import { FUNNEL_CONVERSATION, FUNNEL_PERCENT } from '../../../../src/plots/funnel/constant';

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

  afterAll(() => {
    funnel.destroy();
  });

  describe('geometry', () => {
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
      expect(positionFields).toHaveLength(2);
      expect(positionFields[0]).toBe('action');
      expect(positionFields[1]).toBe('pv');

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

      // 判断数据是否正确
      const { data } = funnel.chart.getOptions();
      data.forEach((item, index) => {
        expect(item[FUNNEL_PERCENT]).toEqual(item.pv / data[0].pv);
        expect(item[FUNNEL_CONVERSATION]).toEqual(index === 0 ? 1 : item.pv / data[index - 1].pv);
      });
    });
  });

  describe('transpose', () => {
    test('transpose', () => {
      funnel.update({
        ...funnelOption,
        isTransposed: true,
      });
      // transpose
      const coordinate = funnel.chart.getCoordinate();
      expect(coordinate.isRect).toBe(true);
      expect(coordinate.isTransposed).toBe(false);
    });
  });
});
