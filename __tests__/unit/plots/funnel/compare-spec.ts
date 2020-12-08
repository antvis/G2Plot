import { maxBy } from '@antv/util';
import { Funnel } from '../../../../src';
import { PV_DATA_COMPARE } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';
import { FUNNEL_PERCENT, FUNNEL_CONVERSATION, FUNNEL_MAPPING_VALUE } from '../../../../src/plots/funnel/constant';

describe('compare funnel', () => {
  let funnel;
  const funnelOption = {
    width: 400,
    height: 400,
    data: PV_DATA_COMPARE,
    autoFit: true,
    xField: 'action',
    yField: 'pv',
    minSize: 0.3,
    maxSize: 0.8,
    compareField: 'quarter',
    tooltip: {
      fields: ['action', 'pv'],
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
        expect(positionFields).toHaveLength(2);
        expect(positionFields[0]).toBe('action');
        expect(positionFields[1]).toBe(FUNNEL_MAPPING_VALUE);

        // geometry tooltip
        expect(geometry.tooltipOption.fields.length).toBe(4);

        const shapeFields = geometry.getAttribute('shape').getFields();
        expect(shapeFields[0]).toBe('funnel');

        const colorFields = geometry.getAttribute('color').getFields();
        expect(colorFields[0]).toBe('action');

        const origin = {
          '2020Q1': PV_DATA_COMPARE.filter((item) => item.quarter === '2020Q1'),
          '2020Q2': PV_DATA_COMPARE.filter((item) => item.quarter === '2020Q2'),
        };

        const max = maxBy(PV_DATA_COMPARE, 'pv').pv;

        const { data } = funnel.chart.getOptions();
        data.forEach((item) => {
          const originData = origin[item.quarter];
          const originIndex = originData.findIndex((jtem) => jtem.pv === item.pv);
          const percent = item.pv / max;
          expect(item[FUNNEL_PERCENT]).toEqual(percent);
          expect(item[FUNNEL_MAPPING_VALUE]).toEqual(0.5 * percent + 0.3);
          expect(item[FUNNEL_CONVERSATION]).toEqual(originIndex === 0 ? 1 : item.pv / originData[originIndex - 1].pv);
        });
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
