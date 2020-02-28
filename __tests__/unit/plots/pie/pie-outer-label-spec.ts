import { Pie } from '../../../../src';
import { Shape, BBox } from '@antv/g-canvas';
import * as _ from '@antv/util';
import { getGeometryLabel } from '@antv/g2';
import { createDiv } from '../../../utils/dom';
import Polar from '@antv/coord/lib/coord/polar';

describe.skip('pie outer label', () => {
  it('outer label is defined', () => {
    expect(getGeometryLabel('outer')).not.toBeDefined();
  });

  it.skip('normal label', () => {
    const div = createDiv('pie1');
    const labelOffset = 10;
    const Radius = 0.6;
    const piePlot = new Pie(div, {
      width: 500,
      height: 600,
      padding: [0, 0, 0, 0],
      data: [
        { type: '分类1', value: 1 },
        { type: '分类2', value: 1 },
        { type: '分类3', value: 1 },
        { type: '分类4', value: 1 },
        { type: '分类5', value: 1 },
        { type: '分类6', value: 1 },
        { type: '分类7', value: 1 },
        { type: '分类8', value: 1 },
        { type: '分类9', value: 1 },
        { type: '分类10', value: 1 },
      ],
      radius: Radius,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'outer',
        offset: labelOffset,
        formatter: (text, item) => `${item._origin.type} (${item._origin.value})`,
        style: {
          fontSize: 12,
          lineWidth: 0,
        },
      },
      legend: {
        visible: false,
      },
    });
    piePlot.render();

    // @ts-ignore
    const pieElement = piePlot.getLayer().view.geometries[0];
    const center = (pieElement.coordinate as Polar).getCenter();
    const radius = (pieElement.coordinate as Polar).getRadius();
    expect(center).toEqual({ x: 250, y: 300 });
    expect(radius).toBe((500 * Radius) / 2);
    const labelShapes: Shape[] = pieElement.labelsContainer.getChildren();
    expect(_.some(labelShapes, (l) => !l.get('visible'))).toBe(false);
    const labelBox: BBox = labelShapes[2].getBBox();
    expect((labelBox.minY + labelBox.maxY) / 2).toEqual(center.y);
    // 4px for text-line distance
    const MARGIN = 4;
    expect(labelBox.x).toEqual(center.x + radius + labelOffset + MARGIN);
    /** dx^2 + dy^2 = dist^2 */
    const box: BBox = _.head(labelShapes).getBBox();
    const dist = Math.sqrt(
      Math.pow(Math.abs(box.x - center.x), 2) + Math.pow(Math.abs(center.y - (box.y + box.height / 2)), 2)
    );
    /** 三角形，两边之和 大于 第三边 */
    expect(dist).toBeLessThan(radius + labelOffset + MARGIN);

    piePlot.destroy();
    document.body.removeChild(div);
  });

  it('full of label, 均匀', () => {
    const div = createDiv('pie2');
    const labelOffset = 10;
    const Height = 600;
    const Radius = 0.6;
    const Data = [];
    for (let i = 0; i < 100; i++) {
      Data.push({ type: `分类 ${i + 1}`, value: 1 });
    }
    const piePlot = new Pie(div, {
      width: 500,
      height: Height,
      padding: [0, 0, 0, 0],
      data: Data,
      radius: Radius,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'outer',
        offset: labelOffset,
        formatter: (text, item) => `${item._origin.type} (${item._origin.value})`,
        style: {
          fontSize: 12,
          lineWidth: 0,
        },
      },
      legend: {
        visible: false,
      },
    });
    piePlot.render();

    // @ts-ignore
    const pieElement = piePlot.getLayer().view.geometries[0];
    const center = (pieElement.coordinate as Polar).getCenter();
    const radius = (pieElement.coordinate as Polar).getRadius();
    expect(center).toEqual({ x: 250, y: 300 });
    expect(radius).toBe((500 * Radius) / 2);
    const labelShapes: Shape[] = pieElement.labelsContainer.getChildren();
    // 算法增强后 所有label可见
    expect(_.every(labelShapes, (l) => l.get('visible'))).toBe(true);
    // label fontsize: 12px, label margin: 2px, buffer: 4
    expect(_.filter(labelShapes, (l) => l.get('visible')).length).toBeGreaterThanOrEqual(
      Math.floor(Height / 14) * 2 - 4
    );
    // piePlot.destroy();
    // document.body.removeChild(div);
  });

  it('case: full in quartant4', () => {
    const div = createDiv('pie3');
    const labelOffset = 10;
    const Height = 600;
    const Radius = 0.6;
    const Data = [
      { type: '分类 1', value: 20 },
      { type: '分类 2', value: 20 },
      { type: '分类 3', value: 20 },
    ];
    for (let i = 4; i < 24; i++) {
      Data.push({ type: `分类 ${i}`, value: 1 + 0.001 * i });
    }
    const piePlot = new Pie(div, {
      width: 500,
      height: Height,
      padding: [0, 0, 0, 0],
      data: Data,
      radius: Radius,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'outer',
        offset: labelOffset,
        formatter: (text, item) => `${item._origin.type} (${item._origin.value})`,
        style: {
          fontSize: 12,
          lineWidth: 0,
        },
      },
      legend: {
        visible: false,
      },
    });
    piePlot.render();

    // @ts-ignore
    const pieElement = piePlot.getLayer().view.geometries[0];
    const labelShapes: Shape[] = pieElement.labelsContainer.getChildren();
    expect(_.some(labelShapes, (l) => !l.get('visible'))).toBe(false);
    expect(_.some(labelShapes, (l) => Number.isNaN(l.getBBox().x) || Number.isNaN(l.getBBox().y))).toBe(false);
    piePlot.destroy();
    document.body.removeChild(div);
  });

  it('case: full in quartant3', () => {
    const div = createDiv('pie4');
    const labelOffset = 10;
    const Height = 600;
    const Radius = 0.6;
    const Data = [
      { type: '分类 1', value: 20 },
      { type: '分类 2', value: 20 },
    ];
    for (let i = 3; i < 23; i++) {
      Data.push({ type: `分类 ${i}`, value: 1 });
    }
    Data.push({ type: '其他', value: 20 });
    const piePlot = new Pie(div, {
      width: 500,
      height: Height,
      padding: [0, 0, 0, 0],
      data: Data,
      radius: Radius,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'outer',
        offset: labelOffset,
        formatter: (text, item) => `${item._origin.type} (${item._origin.value})`,
        style: {
          fontSize: 12,
          lineWidth: 0,
        },
      },
      legend: {
        visible: false,
      },
    });
    piePlot.render();

    // @ts-ignore
    const pieElement = piePlot.getLayer().view.geometries[0];
    const labelShapes: Shape[] = pieElement.labelsContainer.getChildren();
    expect(_.some(labelShapes, (l) => Number.isNaN(l.getBBox().x) || Number.isNaN(l.getBBox().y))).toBe(false);
    expect(_.some(labelShapes, (l) => !l.get('visible'))).toBe(false);
    piePlot.destroy();
    document.body.removeChild(div);
  });

  it('case: full in quartant3 and quartant4', () => {
    const div = createDiv('pie5');
    const labelOffset = 10;
    const Height = 600;
    const Radius = 0.6;
    const Data = [
      { type: '分类 1', value: 20 },
      { type: '分类 2', value: 20 },
    ];
    for (let i = 3; i < 43; i++) {
      Data.push({ type: `分类 ${i}`, value: 1 });
    }
    const piePlot = new Pie(div, {
      width: 500,
      height: Height,
      padding: [0, 0, 0, 0],
      data: Data,
      radius: Radius,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'outer',
        offset: labelOffset,
        formatter: (text, item) => `${item._origin.type} (${item._origin.value})`,
        style: {
          fontSize: 12,
          lineWidth: 0,
        },
      },
      legend: {
        visible: false,
      },
    });
    piePlot.render();

    // @ts-ignore
    const pieElement = piePlot.getLayer().view.geometries[0];
    const labelShapes: Shape[] = pieElement.labelsContainer.getChildren();
    expect(_.some(labelShapes, (l) => Number.isNaN(l.getBBox().x) || Number.isNaN(l.getBBox().y))).toBe(false);
    expect(_.some(labelShapes, (l) => !l.get('visible'))).toBe(false);
    piePlot.destroy();
    document.body.removeChild(div);
  });

  it('case: full in quartant2', () => {
    const div = createDiv('pie6');
    const labelOffset = 10;
    const Height = 600;
    const Radius = 0.6;
    const Data = [{ type: '分类 1', value: 20 }];
    for (let i = 2; i < 22; i++) {
      Data.push({ type: `分类 ${i}`, value: 1 });
    }
    Data.push({ type: '分类 22', value: 20 });
    Data.push({ type: '分类 23', value: 20 });
    const piePlot = new Pie(div, {
      width: 500,
      height: Height,
      padding: [0, 0, 0, 0],
      data: Data,
      radius: Radius,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'outer',
        offset: labelOffset,
        formatter: (text, item) => `${item._origin.type} (${item._origin.value})`,
        style: {
          fontSize: 12,
          lineWidth: 0,
        },
      },
      legend: {
        visible: false,
      },
    });
    piePlot.render();

    // @ts-ignore
    const pieElement = piePlot.getLayer().view.geometries[0];
    const labelShapes: Shape[] = pieElement.labelsContainer.getChildren();
    expect(_.some(labelShapes, (l) => Number.isNaN(l.getBBox().x) || Number.isNaN(l.getBBox().y))).toBe(false);
    expect(_.some(labelShapes, (l) => !l.get('visible'))).toBe(false);
    // piePlot.destroy();
    // document.body.removeChild(div);
  });

  it('case: full in quartant1', () => {
    const div = createDiv('pie7');
    const labelOffset = 10;
    const Height = 600;
    const Radius = 0.6;
    const Data = [];
    for (let i = 1; i < 21; i++) {
      Data.push({ type: `分类 ${i}`, value: 1 });
    }
    Data.push({ type: '分类 21', value: 20 });
    Data.push({ type: '分类 22', value: 20 });
    Data.push({ type: '分类 23', value: 20 });
    const piePlot = new Pie(div, {
      width: 500,
      height: Height,
      padding: [0, 0, 0, 0],
      data: Data,
      radius: Radius,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'outer',
        offset: labelOffset,
        formatter: (text, item) => `${item._origin.type} (${item._origin.value})`,
        style: {
          fontSize: 12,
          lineWidth: 0,
        },
      },
      legend: {
        visible: false,
      },
    });
    piePlot.render();

    // @ts-ignore
    const pieElement = piePlot.getLayer().view.geometries[0];
    const labelShapes: Shape[] = pieElement.labelsContainer.getChildren();
    expect(_.some(labelShapes, (l) => Number.isNaN(l.getBBox().x) || Number.isNaN(l.getBBox().y))).toBe(false);
    expect(_.some(labelShapes, (l) => !l.get('visible'))).toBe(false);
    piePlot.destroy();
    document.body.removeChild(div);
  });

  it('bug-1', () => {
    const data = [
      {
        name: 'Chrome',
        y: 61.41,
      },
      {
        name: 'Internet Explorer',
        y: 11.84,
      },
      {
        name: 'Firefox',
        y: 10.85,
      },
      {
        name: 'Edge',
        y: 4.67,
      },
      {
        name: 'Safari',
        y: 4.18,
      },
      {
        name: 'Sogou Explorer',
        y: 1.64,
      },
      {
        name: 'Opera',
        y: 1.6,
      },
      {
        name: 'QQ',
        y: 1.2,
      },
      {
        name: 'Other',
        y: 2.61,
      },
    ];

    const div = createDiv('pie-bug-1');
    const piePlot = new Pie(div, {
      width: 490,
      height: 480,
      title: {
        visible: true,
        text: '饼图-外部图形标签(outer label)',
      },
      description: {
        visible: true,
        text: '当把饼图label的类型设置为outer时，标签在切片外部拉线显示。设置offset控制标签的偏移值。',
      },
      radius: 0.8,
      data,
      angleField: 'y',
      colorField: 'name',
      legend: {
        visible: false,
      },
      label: {
        type: 'outer',
        visible: true,
        style: {
          fill: 'rgba(0, 0, 0, 0.65)',
          stroke: '#FFF',
          fontSize: 12,
          lineHeight: 14,
        },
        formatter: (text, item) => {
          return `${item._origin.name}: ${item._origin.y}`;
        },
      },
    });

    piePlot.render();
    // @ts-ignore
    const pieElement = piePlot.getLayer().view.geometries[0];
    const labelShapes: Shape[] = pieElement.labelsContainer.getChildren();
    expect(_.some(labelShapes, (l) => Number.isNaN(l.getBBox().x) || Number.isNaN(l.getBBox().y))).toBe(false);
    expect(_.some(labelShapes, (l) => !l.get('visible'))).toBe(false);
  });
});
