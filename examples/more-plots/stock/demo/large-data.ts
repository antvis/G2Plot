import { each } from '@antv/util';
import { Stock } from '@antv/g2plot';
import DataSet from '@antv/data-set';

fetch('https://gw.alipayobjects.com/os/bmw-prod/b341d795-679c-4e69-a3f3-03fcaedce35e.csv')
  .then((csv) => csv.text())
  .then((csv) => {
    const dv = new DataSet.View().source(csv, {
      type: 'csv',
    });

    const data = dv.rows.map((d) => {
      const result = {};
      each(d, (v, k) => {
        result[k] = Number(v);
        if (k === 'date') {
          result[k] = new Date(Number(v)).toISOString().slice(0, 10);
        }
      });
      return result;
    });

    const plot = new Stock('container', {
      data,
      xField: 'date',
      yField: ['open', 'close', 'high', 'low'],
      slider: {
        start: 0.85,
        end: 0.86,
      },
    });

    plot.render();
  });
