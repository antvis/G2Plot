import { schema, SchemaGeometryOptions, P, Params } from '../../../../src';
import { Y_FIELD } from '../../../../src/plots/stock/constant';
import { getStockData } from '../../../../src/plots/stock/utils';
import { createDiv } from '../../../utils/dom';

describe('adaptor - schema', () => {
  function adaptor(params: Params<SchemaGeometryOptions>): Params<SchemaGeometryOptions> {
    const { chart, options } = params;
    const { data } = options;

    chart.data(data);

    // 直接使用 geometry 进行测试
    schema({
      chart,
      options: {
        ...options,
        schema: {
          shape: 'candle',
        },
      },
    });
    return params;
  }

  function getPlot() {
    const plot = new P(
      createDiv(),
      {
        width: 400,
        height: 300,
        data: getStockData(
          [
            {
              ts_code: '000001.SH',
              trade_date: '2020-03-13',
              close: 2887.4265,
              open: 2804.2322,
              high: 2910.8812,
              low: 2799.9841,
              vol: 366450436,
              amount: 393019665.2,
            },
            {
              ts_code: '000001.SH',
              trade_date: '2020-03-12',
              close: 2923.4856,
              open: 2936.0163,
              high: 2944.4651,
              low: 2906.2838,
              vol: 307778457,
              amount: 328209202.4,
            },
            {
              ts_code: '000001.SH',
              trade_date: '2020-03-11',
              close: 2968.5174,
              open: 3001.7616,
              high: 3010.0286,
              low: 2968.5174,
              vol: 352470970,
              amount: 378766619,
            },
          ],
          ['open', 'close', 'high', 'low']
        ),
        appendPadding: 10,
        xField: 'trade_date',
        yField: Y_FIELD,
        mapping: {},
      },
      adaptor
    );

    plot.render();
    return plot;
  }

  it('default', () => {
    const plot = getPlot();
    expect(plot.chart.geometries[0].elements.length).toBe(3);

    plot.destroy();
  });
});
