import * as _ from '@antv/util';
import { Shape } from '@antv/g-base';
import { Pie } from '../../src';
import { createDiv } from '../utils/dom';
import { getOverlapArea } from '../../src/plots/pie/component/label/utils';

describe.skip('#485 饼图 outer-label 绘制错误', () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 12232328,
    },
    {
      type: '分类四',
      value: 12222225,
    },
    {
      type: '分类五',
      value: 12222220,
    },
    {
      type: '其它',
      value: 50000024,
    },
  ];
  const div = createDiv('pie-cantainer');
  div.style.width = '719px';
  div.style.height = '400px';
  const piePlot = new Pie(div, {
    forceFit: true,
    title: {
      visible: true,
      text: '多色饼图',
    },
    description: {
      visible: true,
      text:
        '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。',
    },
    padding: 'auto',
    radius: 1,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'outer',
    },
  });
  piePlot.render();

  it('分类一和分类二 的 label 和饼图区域不重叠', () => {
    const labels = piePlot
      .getLayer()
      .view.get('elements')[0]
      .get('labels');
    /** 求两点间距离 */
    function distanceOfPoints(point1, point2): number {
      const delta_x = point1.x - point2.x;
      const delta_y = point1.y - point2.y;
      return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    const center = piePlot
      .getLayer()
      .view.get('coord')
      .getCenter();
    const radius = piePlot
      .getLayer()
      .view.get('coord')
      .getRadius();
    expect(
      _.every(labels, (label: Shape) => {
        const box = label.getBBox();
        const labelCenter = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
        return distanceOfPoints(center, labelCenter) > radius;
      })
    ).toBe(true);
  });
});
