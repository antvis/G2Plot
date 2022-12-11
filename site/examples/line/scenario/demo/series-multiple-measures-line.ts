import { Line } from '@antv/g2plot';

const seriesKey = 'series';
const valueKey = 'value';
function processData(data, yFields, seriesField, meta) {
  const result = [];
  data.forEach((d) => {
    yFields.forEach((yField) => {
      const name = meta?.[yField]?.alias || yField;
      result.push({ ...d, date: d.date, [seriesKey]: `${d[seriesField]}:${name}`, [valueKey]: d[yField] });
    });
  });
  return result;
}

fetch('https://gw.alipayobjects.com/os/antfincdn/UjzkGj7yin/multiple-measures-line-data.json')
  .then((data) => data.json())
  .then((data) => {
    const meta = {
      date: {
        alias: '销售日期',
      },
      price: {
        alias: '单价',
      },
      discount_price: {
        alias: '折扣单价',
      },
    };
    const line = new Line('container', {
      data: processData(data, ['price', 'discount_price'], 'channel', meta),
      padding: 'auto',
      xField: 'date',
      yField: valueKey,
      seriesField: seriesKey,
      appendPadding: [0, 8, 0, 0],
    });

    line.render();
  });
