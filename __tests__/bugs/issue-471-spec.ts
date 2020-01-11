import * as _ from '@antv/util';
import { Pie } from '../../src';
import { createDiv } from '../utils/dom';

describe('#471 饼图 spider-label 绘制错误', () => {
  const csvData = `Domestic animals,21.7
Human excrements,2.6
Synthetic fertilizers,9
Agricultural crops,3.6
Biomass burning in agriculture and biofuel use,2.7
Fossil fuel combustion,0.1
Industry,0.2
Wild animals,0.1
Undisturbed ecosystems,2.4
Biomass burning in natural ecosystems,3.2
Sea,8.2`;

  const data = csvData.split('\n').map((record) => ({ item: record.split(',')[0], value: record.split(',')[1] }));

  const div = createDiv('pie-cantainer');
  div.style.width = '719px';
  div.style.height = '400px';

  const piePlot = new Pie(div, {
    forceFit: true,
    data,
    angleField: 'value',
    colorField: 'item',
    radius: 0.5,
    label: {
      visible: true,
      alignTo: 'edge',
      type: 'spider',
      formatter: (text, item) => `${item._origin.item}\n${item._origin.value}`,
    },
    legend: {
      visible: false,
    },
  });
  piePlot.render();

  it('label 拉线', () => {
    const labelLines = piePlot
      .getLayer()
      .view.get('elements')[0]
      .get('frontgroundGroup')
      .get('children')[0]
      .get('lineGroup')
      .get('children');
    const center = piePlot
      .getLayer()
      .view.get('coord')
      .getCenter();

    expect(_.every(labelLines.slice(0, 1), (line: any) => line.getBBox().minX >= center.x)).toBe(true);
    expect(_.every(labelLines.slice(2), (line: any) => line.getBBox().maxX <= center.x)).toBe(true);
  });
});
