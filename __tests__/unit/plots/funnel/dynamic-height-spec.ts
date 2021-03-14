import { get } from '@antv/util';
import { Funnel } from '../../../../src';
import { PV_DATA } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';
import {
  FUNNEL_PERCENT,
  FUNNEL_TOTAL_PERCENT,
  FUNNEL_CONVERSATION,
  PLOYGON_X,
  PLOYGON_Y,
} from '../../../../src/plots/funnel/constant';

describe('dynamicHeight funnel', () => {
  let funnel;

  const funnelOption = {
    width: 400,
    height: 400,
    data: PV_DATA,
    xField: 'action',
    yField: 'pv',
    dynamicHeight: true,
    tooltip: {
      fields: ['action'],
    },
  };

  beforeAll(() => {
    funnel = new Funnel(createDiv('dynamicHeight funnel'), funnelOption);
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
      expect(geometry.type).toBe('polygon');

      expect(geometry.tooltipOption.fields.length).toBe(3);

      // position
      const positionFields = geometry.getAttribute('position').getFields();
      expect(positionFields).toHaveLength(2);
      expect(positionFields[0]).toBe(PLOYGON_X);
      expect(positionFields[1]).toBe(PLOYGON_Y);

      // 判断数据是否正确
      const { data } = funnel.chart.getOptions();
      data.forEach((item, index) => {
        expect(item[PLOYGON_Y][0] - item[PLOYGON_Y][2]).toEqual(item[FUNNEL_TOTAL_PERCENT]);
        expect(item[FUNNEL_PERCENT]).toEqual(item.pv / data[0].pv);
        expect(item[FUNNEL_CONVERSATION]).toEqual([get(data, [index - 1, 'pv']), item.pv]);
      });

      // color
      const colorFields = geometry.getAttribute('color').getFields();
      expect(colorFields[0]).toBe('action');
    });
  });
});
