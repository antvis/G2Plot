import { IGroup } from '@antv/g2/lib/dependents';
import { Column, ColumnOptions, Bar, BarOptions } from '../../../src';
import { createDiv } from '../../utils/dom';
import { delay } from '../../utils/delay';
import { near } from '../../utils/number';

const DATA = [
  { x: 'A', y: 100 },
  { x: 'B', y: 120 },
  { x: 'C', y: 80 },
];

const DATA_WITH_ZERO = [
  { action: '浏览网站', pv: 12000000 },
  { action: '放入购物车', pv: 8000000 },
  { action: '生成订单', pv: 6000000 },
  { action: '支付订单', pv: 0 },
  { action: '完成交易', pv: 0 },
];

describe('column conversion tag', () => {
  const container = createDiv();

  const options: ColumnOptions = {
    data: DATA,
    autoFit: false,
    width: 600,
    height: 400,
    xField: 'x',
    yField: 'y',
    // label: {},
    yAxis: {
      nice: true,
    },
    conversionTag: {},
    animation: false,
  };
  const plot = new Column(container, options);

  it('render', async () => {
    plot.render();
    await delay(500);

    const shapes = plot.chart.geometries[0].getShapes();
    const shapeBBoxes = shapes.map((shape) => shape.getBBox());
    const totalWidth = shapeBBoxes[1].minX - shapeBBoxes[0].maxX;
    const foreground = plot.chart.foregroundGroup;

    // 整体
    const group: IGroup = foreground.findAllByName('conversion-tag-group')[0] as IGroup;
    expect(group).toBeDefined();
    // 每两条数据之间一个转化率标记，每一个标记有 text/arrow 两个 shape
    expect(group.getChildren()).toHaveLength((DATA.length - 1) * 2);

    // 文本
    const texts = group.findAllByName('conversion-tag-text');
    expect(texts).toHaveLength(DATA.length - 1);
    DATA.forEach((datum, idx) => {
      if (idx > 0) {
        expect(texts[idx - 1].get('type')).toBe('text');
        expect(texts[idx - 1].attr('text')).toBe(((DATA[idx].y / DATA[idx - 1].y) * 100).toFixed(2) + '%');
      }
    });

    // 箭头
    const arrows = group.findAllByName('conversion-tag-arrow');
    expect(arrows).toHaveLength(DATA.length - 1);
    arrows.forEach((arrow) => {
      const bbox = arrow.getBBox();
      // spacing: 8
      expect(near(bbox.width, totalWidth - 8 * 2)).toBeTruthy();
      // size: 32
      expect(near(bbox.height, 32)).toBeTruthy();
    });
  });

  it('update', async () => {
    plot.update({
      ...options,
      conversionTag: {
        spacing: 12,
        size: 40,
      },
    });
    plot.render();

    await delay(500);

    const shapes = plot.chart.geometries[0].getShapes();
    const shapeBBoxes = shapes.map((shape) => shape.getBBox());
    const totalWidth = shapeBBoxes[1].minX - shapeBBoxes[0].maxX;
    const foreground = plot.chart.foregroundGroup;

    // 整体
    const group: IGroup = foreground.findAllByName('conversion-tag-group')[0] as IGroup;
    expect(group).toBeDefined();
    // 每两条数据之间一个转化率标记，每一个标记有 text/arrow 两个 shape
    expect(group.getChildren()).toHaveLength((DATA.length - 1) * 2);

    // 文本
    const texts = group.findAllByName('conversion-tag-text');
    expect(texts).toHaveLength(DATA.length - 1);
    DATA.slice()
      .reverse()
      .forEach((datum, idx) => {
        if (idx > 0) {
          expect(texts[idx - 1].get('type')).toBe('text');
          expect(texts[idx - 1].attr('text')).toBe(((DATA[idx].y / DATA[idx - 1].y) * 100).toFixed(2) + '%');
        }
      });

    // 箭头
    const arrows = group.findAllByName('conversion-tag-arrow');
    expect(arrows).toHaveLength(DATA.length - 1);
    arrows.forEach((arrow) => {
      const bbox = arrow.getBBox();
      // spacing: 12
      expect(near(bbox.width, totalWidth - 12 * 2)).toBeTruthy();
      // size: 40
      expect(near(bbox.height, 40)).toBeTruthy();
    });
  });

  it('clear', async () => {
    plot.update({
      ...options,
      conversionTag: false,
    });
    plot.render();

    await delay(500);

    const foreground = plot.chart.foregroundGroup;
    const group: IGroup = foreground.findAllByName('conversion-tag-group')[0] as IGroup;
    expect(group).toBeUndefined();
  });
});

describe('bar conversion tag', () => {
  const container = createDiv();

  const options: BarOptions = {
    data: DATA,
    autoFit: false,
    width: 600,
    height: 400,
    xField: 'y',
    yField: 'x',
    label: {},
    yAxis: {
      nice: true,
    },
    conversionTag: {},
    animation: false,
  };
  const plot = new Bar(container, options);

  it('render', async () => {
    plot.render();

    await delay(500);

    const shapes = plot.chart.geometries[0].getShapes();
    const shapeBBoxes = shapes.map((shape) => shape.getBBox());
    const totalHeight = shapeBBoxes[0].minY - shapeBBoxes[1].maxY;
    const foreground = plot.chart.foregroundGroup;

    // 整体
    const group: IGroup = foreground.findAllByName('conversion-tag-group')[0] as IGroup;
    expect(group).toBeDefined();
    // 每两条数据之间一个转化率标记，每一个标记有 text/arrow 两个 shape
    expect(group.getChildren()).toHaveLength((DATA.length - 1) * 2);

    // 文本
    const texts = group.findAllByName('conversion-tag-text');
    expect(texts).toHaveLength(DATA.length - 1);
    DATA.forEach((datum, idx) => {
      if (idx > 0) {
        expect(texts[idx - 1].get('type')).toBe('text');
        expect(texts[idx - 1].attr('text')).toBe(((DATA[idx].y / DATA[idx - 1].y) * 100).toFixed(2) + '%');
      }
    });

    // 箭头
    const arrows = group.findAllByName('conversion-tag-arrow');
    expect(arrows).toHaveLength(DATA.length - 1);
    arrows.forEach((arrow) => {
      const bbox = arrow.getBBox();
      // spacing: 12
      expect(near(bbox.height, totalHeight - 12 * 2)).toBeTruthy();
      // size: 80
      expect(near(bbox.width, 80)).toBeTruthy();
    });
  });

  it('update', async () => {
    plot.update({
      ...options,
      conversionTag: {
        size: 100,
        spacing: 24,
      },
    });
    plot.render();

    await delay(500);

    const shapes = plot.chart.geometries[0].getShapes();
    const shapeBBoxes = shapes.map((shape) => shape.getBBox());
    const totalHeight = shapeBBoxes[0].minY - shapeBBoxes[1].maxY;
    const foreground = plot.chart.foregroundGroup;

    // 整体
    const group: IGroup = foreground.findAllByName('conversion-tag-group')[0] as IGroup;
    expect(group).toBeDefined();
    // 每两条数据之间一个转化率标记，每一个标记有 text/arrow 两个 shape
    expect(group.getChildren()).toHaveLength((DATA.length - 1) * 2);

    // 文本
    const texts = group.findAllByName('conversion-tag-text');
    expect(texts).toHaveLength(DATA.length - 1);
    DATA.forEach((datum, idx) => {
      if (idx > 0) {
        expect(texts[idx - 1].get('type')).toBe('text');
        expect(texts[idx - 1].attr('text')).toBe(((DATA[idx].y / DATA[idx - 1].y) * 100).toFixed(2) + '%');
      }
    });

    // 箭头
    const arrows = group.findAllByName('conversion-tag-arrow');
    expect(arrows).toHaveLength(DATA.length - 1);
    arrows.forEach((arrow) => {
      const bbox = arrow.getBBox();
      // spacing: 24
      expect(near(bbox.height, totalHeight - 24 * 2)).toBeTruthy();
      // size: 100
      expect(near(bbox.width, 100)).toBeTruthy();
    });
  });

  it('clear', async () => {
    plot.update({
      ...options,
      conversionTag: false,
    });
    plot.render();

    await delay(500);

    const foreground = plot.chart.foregroundGroup;
    const group: IGroup = foreground.findAllByName('conversion-tag-group')[0] as IGroup;
    expect(group).toBeUndefined();
  });
});

describe('zero data no NaN', () => {
  const container = createDiv();

  const plot = new Bar(container, {
    data: DATA_WITH_ZERO,
    autoFit: false,
    width: 600,
    height: 400,
    xField: 'pv',
    yField: 'action',
    label: {},
    yAxis: {
      nice: true,
    },
    conversionTag: {},
  });
  plot.render();

  it('text', () => {
    const foreground = plot.chart.foregroundGroup;

    // 整体
    const group: IGroup = foreground.findAllByName('conversion-tag-group')[0] as IGroup;
    // 文本
    const texts = group.findAllByName('conversion-tag-text');
    expect(texts).toHaveLength(DATA_WITH_ZERO.length - 1);
    DATA_WITH_ZERO.forEach((datum, idx) => {
      if (idx > 0) {
        const prev = DATA_WITH_ZERO[idx - 1].pv;
        const next = DATA_WITH_ZERO[idx].pv;
        let v;
        if (prev === next) {
          v = '0.00%';
        } else if (prev === 0) {
          v = '∞';
        } else if (next === 0) {
          v = '-∞';
        } else {
          v = ((next / prev) * 100).toFixed(2) + '%';
        }
        expect(texts[idx - 1].get('type')).toBe('text');
        expect(texts[idx - 1].attr('text')).toBe(v);
      }
    });
  });
});
