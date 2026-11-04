/**
 * 分类气泡图钉地图
 * 场景：对比不同门店类型的位置分布，并用气泡大小表示月订单量
 * 要点：color 映射门店类型，size 映射数值；sqrt 比例尺限制气泡范围；
 *       labels 显示门店名称，overlapDodgeY 减少标签重叠
 */
import { Chart } from '@antv/g2';

// 简化的冰岛轮廓，仅用于演示内联 GeoJSON 底图
const retailArea = {
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

const retailStores = [
  {
    storeName: 'Reykjavik Flagship',
    longitude: -21.9426,
    latitude: 64.1466,
    storeType: '旗舰店',
    monthlyOrders: 1280,
  },
  {
    storeName: 'Selfoss Partner',
    longitude: -20.9971,
    latitude: 63.9335,
    storeType: '合作点',
    monthlyOrders: 360,
  },
  {
    storeName: 'Akureyri Store',
    longitude: -18.1,
    latitude: 65.6835,
    storeType: '标准店',
    monthlyOrders: 720,
  },
  {
    storeName: 'Egilsstadir Partner',
    longitude: -14.3948,
    latitude: 65.2669,
    storeType: '合作点',
    monthlyOrders: 240,
  },
  {
    storeName: 'Isafjordur Store',
    longitude: -23.126,
    latitude: 66.0749,
    storeType: '标准店',
    monthlyOrders: 480,
  },
  {
    storeName: 'Vestmannaeyjar Partner',
    longitude: -20.2734,
    latitude: 63.4427,
    storeType: '合作点',
    monthlyOrders: 180,
  },
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
      data: retailArea,
      style: { fill: '#F3F6F9', stroke: '#A9B7C6', lineWidth: 1 },
      tooltip: false,
    },
    {
      type: 'point',
      data: retailStores,
      encode: {
        x: 'longitude',
        y: 'latitude',
        color: 'storeType',
        size: 'monthlyOrders',
      },
      scale: {
        color: { range: ['#5B8FF9', '#5AD8A6', '#F6BD16'] },
        size: { type: 'sqrt', range: [6, 18] },
      },
      style: { fillOpacity: 0.85, stroke: '#fff', lineWidth: 1.5 },
      legend: { color: { position: 'top' }, size: false },
      labels: [
        {
          text: 'storeName',
          position: 'top',
          style: { fontSize: 10, fill: '#1D2129' },
          transform: [{ type: 'overlapDodgeY' }],
        },
      ],
      tooltip: {
        title: 'storeName',
        items: [
          { field: 'storeType', name: '门店类型' },
          {
            field: 'monthlyOrders',
            name: '月订单量',
            valueFormatter: (value) => `${Number(value).toLocaleString()} 单`,
          },
        ],
      },
    },
  ],
});

chart.render();
