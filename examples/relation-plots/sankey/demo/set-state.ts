import { Sankey } from '@antv/g2plot';

const DATA = [
  { source1: '首次打开', target: '首页 UV', value: 160 },
  { source1: '结果页', target: '首页 UV', value: 40 },
  { source1: '验证页', target: '首页 UV', value: 10 },
  { source1: '我的', target: '首页 UV', value: 10 },
  { source1: '朋友', target: '首页 UV', value: 8 },
  { source1: '其他来源', target: '首页 UV', value: 27 },
  { source1: '首页 UV', target: '理财', value: 30 },
  { source1: '首页 UV', target: '扫一扫', value: 40 },
  { source1: '首页 UV', target: '服务', value: 35 },
  { source1: '首页 UV', target: '蚂蚁森林', value: 25 },
  { source1: '首页 UV', target: '跳失', value: 10 },
  { source1: '首页 UV', target: '借呗', value: 30 },
  { source1: '首页 UV', target: '花呗', value: 40 },
  { source1: '首页 UV', target: '其他流向', value: 45 },
];

const sankey = new Sankey('container', {
  data: DATA,
  sourceField: 'source1',
  targetField: 'target',
  weightField: 'value',
  nodeWidthRatio: 0.018,
  nodePaddingRatio: 0.03,
  nodeState: {
    active: {
      style: {
        linewidth: 1.5,
      },
    },
  },
  tooltip: { showTitle: true },
});

sankey.render();
sankey.setState('active', (datum) => {
  return datum.isNode && datum.name === '首次打开';
});
