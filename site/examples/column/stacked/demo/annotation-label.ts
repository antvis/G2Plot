import { Column } from '@antv/g2plot';
// 也可以在项目中直接使用 lodash
import { each, groupBy } from '@antv/util';

fetch('https://gw.alipayobjects.com/os/antfincdn/8elHX%26irfq/stack-column-data.json')
  .then((data) => data.json())
  .then((data) => {
    const annotations = [];
    each(groupBy(data, 'year'), (values, k) => {
      const value = values.reduce((a, b) => a + b.value, 0);
      annotations.push({
        type: 'text',
        position: [k, value],
        content: `${value}`,
        style: { textAlign: 'center', fontSize: 14, fill: 'rgba(0,0,0,0.85)' },
        offsetY: -10,
      });
    });

    const plot = new Column('container', {
      data,
      isStack: true,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'bottom', 'middle'
        // 可配置附加的布局方法
        layout: [
          // 柱形图数据标签位置自动调整
          { type: 'interval-adjust-position' },
          // 数据标签防遮挡
          { type: 'interval-hide-overlap' },
          // 数据标签文颜色自动调整
          { type: 'adjust-color' },
        ],
      },
      // 使用 annotation （图形标注）来展示：总数的 label
      annotations,
    });

    plot.render();
  });
