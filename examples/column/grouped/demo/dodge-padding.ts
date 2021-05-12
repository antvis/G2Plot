import { Column } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new Column('container', {
      data,
      isGroup: true,
      xField: '月份',
      yField: '月均降雨量',
      seriesField: 'name',
      // 分组柱状图 组内柱子间的间距 (像素级别)
      dodgePadding: 2,
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'middle', 'bottom'
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
    });

    plot.render();
  });
