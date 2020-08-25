import { Box } from '@antv/g2plot';

const data = [
  { Species: 'I. setosa', type: 'SepalLength', value: 5.1, _bin: [4.3, 4.8, 5, 5.2, 5.8] },
  { Species: 'I. setosa', type: 'SepalWidth', value: 3.5, _bin: [2.3, 3.2, 3.4, 3.7, 4.4] },
  { Species: 'I. setosa', type: 'PetalLength', value: 1.4, _bin: [1, 1.4, 1.5, 1.6, 1.9] },
  { Species: 'I. setosa', type: 'PetalWidth', value: 0.2, _bin: [0.1, 0.2, 0.2, 0.3, 0.6] },
  { Species: 'I. versicolor', type: 'SepalLength', value: 7, _bin: [4.9, 5.6, 5.9, 6.3, 7] },
  { Species: 'I. versicolor', type: 'SepalWidth', value: 3.2, _bin: [2, 2.5, 2.8, 3, 3.4] },
  { Species: 'I. versicolor', type: 'PetalLength', value: 4.7, _bin: [3, 4, 4.35, 4.6, 5.1] },
  { Species: 'I. versicolor', type: 'PetalWidth', value: 1.4, _bin: [1, 1.2, 1.3, 1.5, 1.8] },
  { Species: 'I. virginica', type: 'SepalLength', value: 6.3, _bin: [4.9, 6.2, 6.5, 6.9, 7.9] },
  { Species: 'I. virginica', type: 'SepalWidth', value: 3.3, _bin: [2.2, 2.8, 3, 3.2, 3.8] },
  { Species: 'I. virginica', type: 'PetalLength', value: 6, _bin: [4.5, 5.1, 5.55, 5.9, 6.9] },
  { Species: 'I. virginica', type: 'PetalWidth', value: 2.5, _bin: [1.4, 1.8, 2, 2.3, 2.5] },
];

const groupBoxPlot = new Box('container', {
  data,
  xField: 'type',
  yField: '_bin',
  colorField: 'Species',
  isGroup: true,
});

groupBoxPlot.render();
