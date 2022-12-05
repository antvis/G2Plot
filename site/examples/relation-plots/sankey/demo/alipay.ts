import { Sankey } from '@antv/g2plot';

const DATA = [
  { source: '首次打开', target: '首页 UV', value: 160 },
  { source: '结果页', target: '首页 UV', value: 40 },
  { source: '验证页', target: '首页 UV', value: 10 },
  { source: '我的', target: '首页 UV', value: 10 },
  { source: '朋友', target: '首页 UV', value: 8 },
  { source: '其他来源', target: '首页 UV', value: 27 },
  { source: '首页 UV', target: '理财', value: 30 },
  { source: '首页 UV', target: '扫一扫', value: 40 },
  { source: '首页 UV', target: '服务', value: 35 },
  { source: '首页 UV', target: '蚂蚁森林', value: 25 },
  { source: '首页 UV', target: '跳失', value: 10 },
  { source: '首页 UV', target: '借呗', value: 30 },
  { source: '首页 UV', target: '花呗', value: 40 },
  { source: '首页 UV', target: '其他流向', value: 45 },
];

const sankey = new Sankey('container', {
  data: DATA,
  sourceField: 'source',
  targetField: 'target',
  weightField: 'value',
  nodeWidthRatio: 0.008,
  nodePaddingRatio: 0.03,
});

sankey.render();
