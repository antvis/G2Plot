import { Chart } from '@antv/g2';

/**
 * 基础点地图
 * 场景：城市门店/网点的地理分布，用点的位置表达经纬度，用颜色区分区域
 * 要点：x 映射经度、y 映射纬度；关闭坐标轴（axis: false）；
 *       scale.x / scale.y 固定经纬度范围，保证不同批次数据的相对位置一致
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
  encode: { x: 'longitude', y: 'latitude', color: 'region', size: 5 },
  scale: {
    // 固定中国经纬度范围，避免数据变化导致点位整体漂移
    x: { domain: [73, 136] },
    y: { domain: [17, 54] },
    color: {
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A', '#9270CA', '#6DC8EC', '#FF9D4D'],
    },
  },
  axis: false,
  legend: { color: { position: 'top' } },
  style: { fillOpacity: 0.85, stroke: '#fff', lineWidth: 1 },
  tooltip: {
    title: 'city',
    items: [{ field: 'orderCount', name: '订单量' }],
  },
});

chart.render();
