import { Stock } from '../../../../src';
import { Y_FIELD } from '../../../../src/plots/stock/constant';
import { kdata } from '../../../data/stock';
import { createDiv } from '../../../utils/dom';

describe('Stock axis', () => {
  it('axis: options', () => {
    const k = new Stock(createDiv(), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      meta: {
        [Y_FIELD]: {
          nice: true,
        },
      },
    });

    k.render();

    const geometry = k.chart.geometries[0];
    // @ts-ignore
    expect(geometry.scales[Y_FIELD].nice).toBe(true);

    k.destroy();
  });

  it('axis: alias', () => {
    const k = new Stock(createDiv(), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      meta: {
        volumn: { alias: '成交量' },
        start: { alias: '开盘价' },
        end: { alias: '收盘价' },
        max: { alias: '最高价' },
        min: { alias: '最低价' },
      },
    });

    k.render();

    const geometry = k.chart.geometries[0];

    // @ts-ignore
    expect(geometry.scales['start'].alias).toBe('开盘价');
    // @ts-ignore
    expect(geometry.scales['end'].alias).toBe('收盘价');
    // @ts-ignore
    expect(geometry.scales['max'].alias).toBe('最高价');
    // @ts-ignore
    expect(geometry.scales['min'].alias).toBe('最低价');

    k.destroy();
  });
});
