import { Line } from '@antv/g2plot';
import DataSet from '@antv/data-set';
import * as _ from '@antv/util';

fetch('https://gw.alipayobjects.com/os/bmw-prod/49a2fe69-ae03-4799-88e2-55c096a54d45.json')
  .then((res) => res.json())
  .then((originalData) => {
    const color = ['#5B8FF9', '#C2C8D5', '#BEDED1', '#EFE0B5', '#B5D7E5', '#F4DBC6'];
    const colorMap = {
      code: color[0],
      code_去年同期: color[1],
      code_上月同期: color[2],
      code_上周同期: color[3],
    };
    const markerMap = {
      code: 'circle',
      code_去年同期: 'circle',
      code_上月同期: 'square',
      code_上周同期: 'triangle',
    };
    const dv = new DataSet().createView().source(originalData);
    dv.transform({
      type: 'fold',
      fields: ['code', 'code_去年同期', 'code_上月同期', 'code_上周同期'], // 展开字段集
      key: 'type', // key字段
      value: 'value', // value字段
    });
    const line = new Line('container', {
      data: dv.rows,
      padding: 'auto',
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color,
      meta: {
        value: {
          formatter: (v) => `${(v / 10000).toFixed(2)} 万`,
        },
        type: {
          formatter: (type) => {
            return type === 'code' ? 'xxx 指标' : type.slice(5);
          },
        },
      },
      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      yAxis: {
        tickCount: 5,
        label: {
          formatter: (v, item) => `${(Number(item.id) / 10000).toFixed(0)} 万`,
        },
      },
      tooltip: {
        showMarkers: false,
      },
      point: {
        style: ({ date, value, type }) => {
          const dataIndex = dv.rows.findIndex((r) => r.date === date);
          // every 30 dataPoints show a point, strategy depends by yourself
          if (dataIndex % 30 === 0) {
            return {
              r: 2,
              stroke: colorMap[type],
              fill: type !== 'code' ? colorMap[type] : '#fff',
            };
          }
          return {
            fill: 'transparent',
            stroke: 'transparent',
            lineWidth: 0,
          };
        },
        shape: ({ date, value, type }) => {
          return markerMap[type];
        },
      },
      lineStyle: ({ date, value, type }) => {
        if (type === 'code') {
          return {
            lineWidth: 2,
          };
        }
        return {
          lineWidth: 1,
        };
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    });

    line.render();
  });
