import { Radar } from '@antv/g2plot';
import { DataSet } from '@antv/data-set';

fetch('https://gw.alipayobjects.com/os/bmw-prod/bda695a8-cd9f-4b78-a423-3d6d547c10c3.json')
  .then((data) => data.json())
  .then((data) => {
    const { DataView } = DataSet;
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['a', 'b'], // 展开字段集
      key: 'user', // key字段
      value: 'score', // value字段
    });

    const radarPlot = new Radar('container', {
      data: dv.rows,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      meta: {
        score: {
          alias: '分数',
          min: 0,
          max: 80,
        },
      },
      xAxis: {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      },
      // 开启辅助点
      point: {
        size: 2,
      },
    });
    radarPlot.render();
  });
