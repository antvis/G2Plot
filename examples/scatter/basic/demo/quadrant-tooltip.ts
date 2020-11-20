import { Scatter } from '@antv/g2plot';
const data = [
  {
    city: '上海',
    搜索UV: 1.5,
    端DAU: 6,
    搜索DAU渗透率: 3,
  },
  {
    city: '台北',
    搜索UV: 2,
    端DAU: 5,
    搜索DAU渗透率: 13,
  },
  {
    city: '北京',
    搜索UV: 7,
    端DAU: 3.6,
    搜索DAU渗透率: 16,
  },
  {
    city: '济南',
    搜索UV: 5,
    端DAU: 5,
    搜索DAU渗透率: 16,
  },
  {
    city: '青岛',
    搜索UV: 2,
    端DAU: 1,
    搜索DAU渗透率: 19,
  },
  {
    city: '杭州',
    搜索UV: 7,
    端DAU: 2,
    搜索DAU渗透率: 90,
  },
  {
    city: '广东',
    搜索UV: 7.4,
    端DAU: 1.5,
    搜索DAU渗透率: 30,
  },
  {
    city: '无锡',
    搜索UV: 1,
    端DAU: 1,
    搜索DAU渗透率: 34,
  },
  {
    city: '重庆',
    搜索UV: 7,
    端DAU: 5,
    搜索DAU渗透率: 46,
  },
  {
    city: '成都',
    搜索UV: 3.4,
    端DAU: 2.3,
    搜索DAU渗透率: 49,
  },
  {
    city: '哈尔滨',
    搜索UV: 0.5,
    端DAU: 6.5,
    搜索DAU渗透率: 51,
  },
  {
    city: '内蒙古',
    搜索UV: 2.5,
    端DAU: 5,
    搜索DAU渗透率: 51,
  },
  {
    city: '云南',
    搜索UV: 1,
    端DAU: 5,
    搜索DAU渗透率: 53,
  },
  {
    city: '河北',
    搜索UV: 6,
    端DAU: 5,
    搜索DAU渗透率: 57,
  },
  {
    city: '陕西',
    搜索UV: 2,
    端DAU: 3,
    搜索DAU渗透率: 57,
  },
  {
    city: '苏州',
    搜索UV: 3,
    端DAU: 4.6,
    搜索DAU渗透率: 65,
  },
  {
    city: '四川',
    搜索UV: 6,
    端DAU: 7,
    搜索DAU渗透率: 68,
  },
  {
    city: '贵阳',
    搜索UV: 5,
    端DAU: 3.4,
    搜索DAU渗透率: 68,
  },
  {
    city: '台湾',
    搜索UV: 5,
    端DAU: 2,
    搜索DAU渗透率: 69,
  },
  {
    city: '哈尔滨',
    搜索UV: 2,
    端DAU: 7,
    搜索DAU渗透率: 78,
  },
  {
    city: '天津',
    搜索UV: 4.4,
    端DAU: 5,
    搜索DAU渗透率: 45,
  },
  {
    city: '长沙',
    搜索UV: 3.4,
    端DAU: 7,
    搜索DAU渗透率: 29,
  },
  {
    city: '沧州',
    搜索UV: 3,
    端DAU: 1,
    搜索DAU渗透率: 94,
  },
  {
    city: '宁波',
    搜索UV: 6,
    端DAU: 3,
    搜索DAU渗透率: 99,
  },
];
const scatterPlot = new Scatter('container', {
  width: 800,
  height: 400,
  autoFit: false,
  appendPadding: 16,
  data,
  xField: '搜索UV',
  yField: '端DAU',
  sizeField: '搜索DAU渗透率',
  size: [12, 30],
  shape: 'circle',
  pointStyle: {
    fill: '#D6E3FD',
    fillOpacity: 0.6,
    stroke: '#6d9bf9',
  },
  tooltip: {
    showTitle: true,
    showMarkers: false,
    fields: ['搜索UV', '端DAU', '搜索DAU渗透率'],
    customContent: (title, items) => {
      const field = items?.[0];
      const formatterInfo = {
        搜索UV: (value) => value + '万',
        端DAU: (value) => value + '万',
        搜索DAU渗透率: () => '%',
      };
      let htmlStr = `<div style="margin:10px 0;font-weight:700;">${field?.data?.city}</div><div class="g2-tooltip-items">`;
      items.forEach((item) => {
        htmlStr += `<div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
                <span class="g2-tooltip-item-label" style="margin-right: 12px;">${item.name}</span>
                <span class="g2-tooltip-item-value">${item.value + formatterInfo[item.name](item.value)}</span>
              </div>`;
      });
      htmlStr += '</div>';
      return htmlStr;
    },
  },
  xAxis: {
    grid: {
      line: {
        style: {
          stroke: '#eee',
        },
      },
    },
    label: {
      formatter: (v) => (v !== '0' ? v + '%' : v),
    },
    line: null,
  },
  label: {
    formatter: (item) => {
      return item.city;
    },
    offsetY: 12,
    style: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.85)',
    },
  },
  yAxis: {
    min: 0,
    line: null,
    label: {
      formatter: (v) => (v !== '0' ? v + '%' : v),
    },
  },
  annotations: [
    {
      type: 'text',
      position: [4, 8],
      content: '搜索DAU渗透率',
      offsetY: -8,
      style: {
        fontSize: 12,
        textAlign: 'center',
      },
    },
    {
      type: 'text',
      position: [8, 4],
      content: '搜索DAU渗透率',
      rotate: Math.PI / 2,
      offsetY: -40,
      offsetX: 8,
      style: {
        fontSize: 12,
      },
    },
    {
      type: 'region',
      start: [7, 7],
      end: [7.8, 7.8],
      top: true,
      style: {
        fill: '#fff',
        fillOpacity: 0.5,
        opacity: 1,
      },
    },
    {
      type: 'region',
      start: [0.2, 7],
      end: [1, 7.8],
      top: true,
      style: {
        fill: '#fff',
        fillOpacity: 0.5,
        opacity: 1,
      },
    },
    {
      type: 'region',
      start: [7, 0.2],
      end: [7.8, 1],
      top: true,
      style: {
        fill: '#fff',
        fillOpacity: 0.5,
        opacity: 1,
      },
    },
  ],
  quadrant: {
    xBaseline: 4,
    yBaseline: 4,
    lineStyle: {
      lineDash: [4, 2],
      lineWidth: 2,
    },
    regionStyle: [
      {
        fill: '#5bd8a6',
        fillOpacity: 0.1,
      },
      {
        fill: '#667796',
        fillOpacity: 0.1,
      },
      {
        fill: '#fff',
      },
      {
        fill: '#f7664e',
        fillOpacity: 0.1,
      },
    ],
    labels: [
      {
        content: '热门市场',
        position: [7.2, 7],
        style: {
          fill: 'rgba(0,0,0, 0.85)',
          textAlign: 'start',
        },
      },
      {
        content: '潜力市场',
        position: [0.2, 7],
        style: {
          fill: 'rgba(0,0,0, 0.85)',
          textAlign: 'start',
        },
      },
      {
        content: '',
      },
      {
        content: '提频市场',
        position: [7.2, 1],
        style: {
          fill: 'rgba(0,0,0, 0.85)',
          textAlign: 'start',
        },
      },
    ],
  },
});
scatterPlot.render();
