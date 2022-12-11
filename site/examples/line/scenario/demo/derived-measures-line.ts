import { Line } from '@antv/g2plot';

const seriesKey = 'series';
const valueKey = 'value';
function processData(data, yFields, seriesField, meta) {
  const result = [];
  data.forEach((d) => {
    yFields.forEach((yField) => {
      const name = meta?.[yField]?.alias || yField;
      result.push({
        ...d,
        date: d.date,
        [seriesKey]: `${d[seriesField]}:${name}`,
        [valueKey]: d[yField],
        isRCValue: meta?.[yField]?.isRCValue,
      });
    });
  });
  return result;
}

fetch('https://gw.alipayobjects.com/os/antfincdn/Z5m0SU17O1/line-data.json')
  .then((data) => data.json())
  .then((data) => {
    const meta = {
      date: {
        alias: '销售日期',
      },
      price: {
        alias: '单价',
      },
      price_monthRelativeValue: {
        alias: '单价:月同比值',
        isRCValue: true,
      },
      discount: {
        alias: '折扣',
      },
      discount_monthRelativeValue: {
        alias: '折扣:月同比值',
        isRCValue: true,
      },
    };
    const line = new Line('container', {
      data: processData(
        data,
        ['price', 'discount', 'price_monthRelativeValue', 'discount_monthRelativeValue'],
        'channel',
        meta
      ),
      padding: 'auto',
      appendPadding: [0, 8, 0, 0],
      xField: 'date',
      yField: valueKey,
      seriesField: seriesKey,
      rawFields: ['isRCValue'],
      lineStyle: (datum) => {
        if (datum['isRCValue']) {
          return {
            lineDash: [2, 4],
          };
        }
      },
    });

    line.render();
  });
