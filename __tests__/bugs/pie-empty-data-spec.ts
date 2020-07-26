import { every } from '@antv/util';
import { Pie } from '../../src';
import { wait } from '../utils/common';
import { createDiv } from '../utils/dom';

describe('#1325', () => {
  const config = {
    data: [],
    angleField: 'value',
    colorField: 'type',
    pieStyle: {
      // 不描边,避免影响计算
      lineWidth: 0,
    },
  };
  const dom = createDiv('canvas0');
  const pie = new Pie(dom, {
    ...config,
  });
  pie.render();

  it('数据: 空数组, 2s 后更新为正常数据', async () => {
    const elements = pie.getLayer().getPlot().geometries[0].elements;
    expect(elements.length).toBe(0);

    let labels = pie.getLayer().view.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(0);

    await wait(2000);
    pie.updateConfig({
      data: [
        { type: 'item1', value: 10 },
        { type: 'item2', value: 40 },
        { type: 'item3', value: 0 },
      ],
    });
    pie.render();

    labels = pie.getLayer().view.geometries[0].labelsContainer.getChildren();
    // @ts-ignore
    const label1 = labels[0].getChildren()[0];
    expect(label1.attr('text')).toBe('10');
  });

  it('数据: 全部为 0, 2s 后更新为正常数据', async () => {
    pie.updateConfig({
      ...config,
      data: [
        { type: 'item1', value: 0 },
        { type: 'item2', value: 0 },
      ],
    });
    pie.render();
    const elements = pie.getLayer().getPlot().geometries[0].elements;
    expect(elements.length).toBe(2);
    expect(every(elements, (ele) => ele.getBBox().width > 0)).toBe(true);
    const view = pie.getLayer().view;
    let labels = view.geometries[0].labelsContainer.getChildren();
    // @ts-ignore
    let label1 = labels[0].getChildren()[0];
    expect(label1.attr('text')).toBe('0');

    await wait(2000);
    pie.updateConfig({
      data: [
        { type: 'item1', value: 10 },
        { type: 'item2', value: 40 },
        { type: 'item3', value: 0 },
      ],
    });
    pie.render();

    labels = pie.getLayer().view.geometries[0].labelsContainer.getChildren();
    // @ts-ignore
    label1 = labels[0].getChildren()[0];
    expect(label1.attr('text')).toBe('10');
  });

  it('标签布局: outer, 数据 2s 后更新为正常数据, 再更新为全部为 0, 再更新为 spider 布局', async () => {
    pie.updateConfig({
      data: [],
      label: {
        visible: true,
        type: 'outer',
      },
    });
    pie.render();
    const elements = pie.getLayer().getPlot().geometries[0].elements;
    expect(elements.length).toBe(0);

    await wait(2000);
    pie.updateConfig({
      data: [
        { type: 'item1', value: 10 },
        { type: 'item2', value: 40 },
        { type: 'item3', value: 0 },
      ],
    });
    pie.render();

    let labels = pie.getLayer().view.geometries[0].labelsContainer.getChildren();
    // @ts-ignore
    let label1 = labels[0].getChildren()[0];
    expect(label1.attr('text')).toBe('10');

    await wait(2000);
    pie.updateConfig({
      data: [
        { type: 'item1', value: 0 },
        { type: 'item2', value: 0 },
        { type: 'item3', value: 0 },
      ],
    });
    pie.render();

    labels = pie.getLayer().view.geometries[0].labelsContainer.getChildren();
    // @ts-ignore
    label1 = labels[0].getChildren()[0];
    expect(label1.attr('text')).toBe('0');

    await wait(2000);
    pie.updateConfig({
      data: [
        { type: 'item1', value: 10 },
        { type: 'item2', value: 20 },
        { type: 'item3', value: 10 },
      ],
      label: {
        visible: true,
        type: 'spider',
      },
    });
    pie.render();

    labels = pie.getLayer().view.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(3);
    // @ts-ignore
    expect(labels[0].getChildren()[0].attr('text')).toBe(10);
  });

  afterAll(async () => {
    await wait(3000);
    pie.destroy();
  });
});
