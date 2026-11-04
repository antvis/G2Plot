/**
 * 基础图钉地图
 * 场景：在地理底图上标注售后服务站的位置，快速查看站点空间分布
 * 要点：geoView 组合 geoPath 底图与 point 标注；经纬度分别映射 x/y；
 *       底图使用内联 GeoJSON，案例无需请求远程数据
 */
import { Chart } from '@antv/g2';

// 简化的冰岛轮廓，仅用于演示内联 GeoJSON 底图
const serviceArea = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Iceland' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-24.5, 65.4],
            [-23.0, 66.4],
            [-19.0, 66.5],
            [-15.0, 65.8],
            [-13.8, 64.8],
            [-16.0, 63.7],
            [-20.0, 63.3],
            [-23.5, 63.8],
            [-24.5, 65.4],
          ],
        ],
      },
    },
  ],
};

const serviceSites = [
  { siteName: 'Reykjavik', longitude: -21.9426, latitude: 64.1466 },
  { siteName: 'Selfoss', longitude: -20.9971, latitude: 63.9335 },
  { siteName: 'Akureyri', longitude: -18.1, latitude: 65.6835 },
  { siteName: 'Egilsstadir', longitude: -14.3948, latitude: 65.2669 },
  { siteName: 'Isafjordur', longitude: -23.126, latitude: 66.0749 },
  { siteName: 'Vestmannaeyjar', longitude: -20.2734, latitude: 63.4427 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'geoView',
  children: [
    {
      type: 'geoPath',
      data: serviceArea,
      style: { fill: '#EAF2F8', stroke: '#8CB3D9', lineWidth: 1 },
      tooltip: false,
    },
    {
      type: 'point',
      data: serviceSites,
      encode: { x: 'longitude', y: 'latitude', size: 7 },
      style: { fill: '#F4664A', stroke: '#fff', lineWidth: 1.5 },
      tooltip: { title: 'siteName' },
    },
  ],
});

chart.render();
