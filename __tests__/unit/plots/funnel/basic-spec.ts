import { get } from '@antv/util';
import { Funnel } from '../../../../src';
import { PV_DATA } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';
import { FUNNEL_CONVERSATION, FUNNEL_PERCENT, FUNNEL_MAPPING_VALUE } from '../../../../src/plots/funnel/constant';

describe('basic funnel', () => {
  let funnel;

  const funnelOption = {
    width: 400,
    height: 400,
    data: PV_DATA,
    xField: 'action',
    yField: 'pv',
    maxSize: 0.8,
    minSize: 0.3,
    tooltip: {
      fields: ['action'],
    },
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

      expect(geometry.tooltipOption.fields.length).toBe(3);

      // position
      const positionFields = geometry.getAttribute('position').getFields();
      expect(positionFields).toHaveLength(2);
      expect(positionFields[0]).toBe('action');
      expect(positionFields[1]).toBe(FUNNEL_MAPPING_VALUE);

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
        expect(item[FUNNEL_MAPPING_VALUE]).toEqual((item.pv / data[0].pv) * 0.5 + 0.3);
        expect(item[FUNNEL_CONVERSATION]).toEqual([get(data, [index - 1, 'pv']), item.pv]);
      });
    });
  });

  describe('pyramid', () => {
    test('transpose', () => {
      funnel.update({
        ...funnelOption,
        shape: 'pyramid',
      });

      const geometry = funnel.chart.geometries[0];
      expect(geometry.labelOption.cfg.layout.type).toBe('interval-adjust-position');
      const shapeFields = geometry.getAttribute('shape').getFields();
      expect(shapeFields[0]).toBe('pyramid');
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
