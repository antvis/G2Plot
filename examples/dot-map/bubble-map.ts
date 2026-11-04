import { Chart } from '@antv/g2';

/**
 * 气泡点地图（大小编码）
 * 场景：在地理点位上同时表达量级差异，如各城市订单量、门店数、用户数
 * 要点：encode.size 映射数值，scale.size 用 sqrt 避免面积失真；
 *       点加白色描边区分重叠；size 图例无实际意义，用 legend.size: false 隐藏
 */
const data = [
  { city: '北京', region: '华北', longitude: 116.41, latitude: 39.9, orderCount: 12800 },
  { city: '上海', region: '华东', longitude: 121.47, latitude: 31.23, orderCount: 15600 },
  { city: '广州', region: '华南', longitude: 113.26, latitude: 23.13, orderCount: 11200 },
  { city: '深圳', region: '华南', longitude: 114.06, latitude: 22.55, orderCount: 13400 },
  { city: '杭州', region: '华东', longitude: 120.16, latitude: 30.27, orderCount: 9600 },
  { city: '南京', region: '华东', longitude: 118.8, latitude: 32.06, orderCount: 7400 },
  { city: '成都', region: '西南', longitude: 104.07, latitude: 30.57, orderCount: 8800 },
  { city: '重庆', region: '西南', longitude: 106.55, latitude: 29.56, orderCount: 7200 },
  { city: '武汉', region: '华中', longitude: 114.3, latitude: 30.59, orderCount: 7600 },
  { city: '西安', region: '西北', longitude: 108.94, latitude: 34.34, orderCount: 5400 },
  { city: '沈阳', region: '东北', longitude: 123.43, latitude: 41.8, orderCount: 4200 },
  { city: '乌鲁木齐', region: '西北', longitude: 87.62, latitude: 43.82, orderCount: 1800 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data,
  encode: { x: 'longitude', y: 'latitude', size: 'orderCount', color: 'region' },
  scale: {
    x: { domain: [73, 136] },
    y: { domain: [17, 54] },
    size: { type: 'sqrt', range: [6, 34] },
    color: {
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A', '#9270CA', '#6DC8EC', '#FF9D4D'],
    },
  },
  axis: false,
  legend: { color: { position: 'top' }, size: false },
  labels: [
    {
      text: 'city',
      position: 'top',
      transform: [{ type: 'overlapDodgeY' }],
      style: { fontSize: 10, fill: '#595959' },
    },
  ],
  style: { fillOpacity: 0.8, stroke: '#fff', lineWidth: 1 },
  tooltip: {
    title: 'city',
    items: [{ field: 'orderCount', name: '订单量', valueFormatter: (v) => `${v} 单` }],
  },
});

chart.render();
