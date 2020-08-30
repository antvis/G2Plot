import { Candle } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { kdata } from '../../../data/stock';
import { Y_FIELD } from '../../../../src/plots/stock/constant';

describe('Candle axis', () => {
  it('axis: options', () => {
    const k = new Candle(createDiv(), {
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
  });

  it('axis: alias', () => {
    const k = new Candle(createDiv(), {
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
  });

  // TODO: 图表绘制错误
  // it('axis: yAxis', () => {
  //   const k = new Candle(createDiv(), {
  //     width: 400,
  //     height: 500,
  //     isConnectNulls: true,
  //     data: kdata,
  //     xField: 'x',
  //     yField: ['start', 'end', 'max', 'min'],
  //     xAxis: {
  //       tickCount: 4,
  //     },
  //     yAxis: {
  //       min: 7,
  //       nice: true,
  //     },
  //   });
  //
  //   k.render();
  //
  //   const geometry = k.chart.geometries[0];
  //   const axisOptions = k.chart.getOptions().axes;
  //
  //   // @ts-ignore
  //   expect(axisOptions[YFIELD].minLimit).toBe(7);
  //   expect(geometry.scales[YFIELD].minLimit).toBe(7);
  //   expect(geometry.scales[YFIELD].maxLimit).toBe(8);
  //   // @ts-ignore
  //   expect(geometry.scales[YFIELD].nice).toBe(true);
  // });
});
