import { Mix } from '@antv/g2plot';

const data1 = [
  { value: 948, type: 'Americano' },
  { value: 879, type: 'Espresso' },
  { value: 683, type: 'Cappuccino' },
  { value: 1083, type: 'Latte' },
  { value: 1004, type: 'Mocca' },
];

const data2 = [
  { value: 1, type: 'Starbucks' },
  { value: 1, type: 'Nescafe' },
  { value: 1, type: 'RoyalCopenhagen' },
  { value: 1, type: 'Maxwell' },
  { value: 1, type: 'UCC' },
  { value: 1, type: 'LAVAZZA' },
  { value: 1, type: 'Grandos' },
  { value: 1, type: 'Wedgwood' },
];

const plot = new Mix('container', {
  tooltip: {
    showMarkers: false,
  },
  plots: [
    {
      type: 'pie',
      region: {
        start: { x: 0.2, y: 0.2 },
        end: { x: 0.8, y: 0.8 },
      },
      options: {
        data: data1,
        angleField: 'value',
        colorField: 'type',
        radius: 0.6,
        label: {
          type: 'inner',
          autoRotate: false,
          formatter: (d) => d.type,
          offset: '-40%',
          style: { textAlign: 'center' },
        },
      },
    },
    {
      type: 'pie',
      options: {
        data: data2,
        angleField: 'value',
        colorField: 'type',
        radius: 0.88,
        innerRadius: 0.68,
        statistic: null,
      },
    },
  ],
});

plot.render();
