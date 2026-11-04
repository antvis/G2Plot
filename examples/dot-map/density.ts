import { Chart } from '@antv/g2';

/**
 * 点密度地图
 * 场景：用点的数量表达总量，适合人口、门店数等可加总的指标；每个点代表一个固定单位
 * 要点：点按省份中心坐标用黄金角螺旋展开，避免完全重叠；
 *       所有点等大、只用颜色区分区域，读者关注的是「点有多少」而不是「点多大」；
 *       点位由数据计算得出，示例数据内联、无外部依赖
 */
const provinces = [
  { province: '广东', region: '华南', longitude: 113.27, latitude: 23.13, population: 12601 },
  { province: '山东', region: '华东', longitude: 117.0, latitude: 36.65, population: 10123 },
  { province: '河南', region: '华中', longitude: 113.65, latitude: 34.76, population: 9872 },
  { province: '江苏', region: '华东', longitude: 118.78, latitude: 32.04, population: 8526 },
  { province: '四川', region: '西南', longitude: 104.07, latitude: 30.57, population: 8368 },
  { province: '河北', region: '华北', longitude: 114.5, latitude: 38.05, population: 7393 },
  { province: '浙江', region: '华东', longitude: 120.15, latitude: 30.28, population: 6627 },
  { province: '湖南', region: '华中', longitude: 112.98, latitude: 28.19, population: 6568 },
  { province: '安徽', region: '华东', longitude: 117.28, latitude: 31.86, population: 6121 },
  { province: '湖北', region: '华中', longitude: 114.3, latitude: 30.59, population: 5844 },
  { province: '广西', region: '华南', longitude: 108.32, latitude: 22.82, population: 5027 },
  { province: '云南', region: '西南', longitude: 102.71, latitude: 25.04, population: 4673 },
  { province: '江西', region: '华东', longitude: 115.89, latitude: 28.68, population: 4515 },
  { province: '辽宁', region: '东北', longitude: 123.43, latitude: 41.8, population: 4197 },
  { province: '福建', region: '华东', longitude: 119.3, latitude: 26.08, population: 4188 },
  { province: '陕西', region: '西北', longitude: 108.94, latitude: 34.34, population: 3952 },
  { province: '贵州', region: '西南', longitude: 106.71, latitude: 26.57, population: 3865 },
  { province: '山西', region: '华北', longitude: 112.55, latitude: 37.87, population: 3466 },
  { province: '重庆', region: '西南', longitude: 106.55, latitude: 29.56, population: 3191 },
  { province: '黑龙江', region: '东北', longitude: 126.63, latitude: 45.75, population: 3062 },
  { province: '新疆', region: '西北', longitude: 87.62, latitude: 43.82, population: 2598 },
  { province: '甘肃', region: '西北', longitude: 103.82, latitude: 36.06, population: 2465 },
  { province: '内蒙古', region: '华北', longitude: 111.75, latitude: 40.84, population: 2401 },
  { province: '吉林', region: '东北', longitude: 125.32, latitude: 43.9, population: 2339 },
  { province: '北京', region: '华北', longitude: 116.41, latitude: 39.9, population: 2186 },
  { province: '天津', region: '华北', longitude: 117.2, latitude: 39.13, population: 1364 },
  { province: '海南', region: '华南', longitude: 110.35, latitude: 20.02, population: 1043 },
  { province: '宁夏', region: '西北', longitude: 106.28, latitude: 38.47, population: 728 },
  { province: '青海', region: '西北', longitude: 101.78, latitude: 36.62, population: 594 },
  { province: '西藏', region: '西南', longitude: 91.11, latitude: 29.65, population: 365 },
];

// 每个点代表 500 万人：数值越大，点越密
const PEOPLE_PER_DOT = 500;

const dots = provinces.flatMap((item) => {
  const count = Math.max(1, Math.round(item.population / PEOPLE_PER_DOT));
  return Array.from({ length: count }, (_, index) => {
    const angle = index * 2.399963; // 黄金角，让点均匀铺开
    const radius = Math.sqrt(index + 0.5) * 0.35;
    return {
      ...item,
      longitude: item.longitude + Math.cos(angle) * radius,
      latitude: item.latitude + Math.sin(angle) * radius,
    };
  });
});

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'point',
  data: dots,
  encode: { x: 'longitude', y: 'latitude', color: 'region', size: 3 },
  scale: {
    x: { domain: [73, 136] },
    y: { domain: [17, 54] },
    color: {
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A', '#9270CA', '#6DC8EC', '#FF9D4D'],
    },
  },
  axis: false,
  legend: { color: { position: 'top' } },
  style: { fillOpacity: 0.75 },
  tooltip: {
    title: 'province',
    items: [{ field: 'population', name: '人口（万人）' }],
  },
});

chart.render();
