import { IGroup } from '@antv/g-base';
import { flatten } from '@antv/util';
import { Pie } from '../../../../src';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('pie label', () => {
  const data = POSITIVE_NEGATIVE_DATA.filter((o) => o.value > 0).map((d, idx) =>
    idx === 1 ? { ...d, type: 'item1' } : d
  );

  const config = {
    width: 400,
    height: 300,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {},
  };

  const pie = new Pie(createDiv(), config);
  pie.render();

  it('label: visible', () => {
    const geometry = pie.chart.geometries[0];
    const elements = geometry.elements;
    const labelGroups = geometry.labelsContainer.getChildren();

    expect(elements.length).toBe(data.length);
    expect(labelGroups.length).toBe(data.length);
  });

  it('label: custom content & support percent', () => {
    pie.update({
      data: [
        { type: 'item1', value: 1 },
        { type: 'item2', value: 2 },
        { type: 'item3', value: 2 },
      ],
      label: {
        content: (data, item, idx) => {
          if (idx === 0) {
            return 'hello';
          }
          const { type, value, percent } = data;
          return `${type}: ${value}(${(percent * 100).toFixed(0)}%)`;
        },
      },
    });

    const geometry = pie.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();
    expect(labelGroups.length).toBe(3);
    const label1 = (labelGroups[0] as IGroup).getChildren();
    expect(label1[0].get('type')).toBe('text');
    expect(label1[1].get('type')).toBe('path');
    expect(label1[0].attr('text')).toBe('hello');
    const label2 = (labelGroups[1] as IGroup).getChildren();
    expect(label2[0].attr('text')).toBe('item2: 2(40%)');
  });

  it('label: custom callback', () => {
    pie.update({
      data,
      label: {
        callback: (value, type) => {
          return {
            content: `${type}: ${value}`,
          };
        },
      },
    });
    const geometry = pie.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();

    expect(labelGroups.length).toBe(data.length);
    const label1 = (labelGroups[0] as IGroup).getChildren();
    const label3 = (labelGroups[2] as IGroup).getChildren();
    expect(label1[0].attr('text')).toBe(`${data[0].type}: ${data[0].value}`);
    expect(label3[0].attr('text')).toBe(`${data[2].type}: ${data[2].value}`);
  });

  it('label: offset adaptor', () => {
    pie.update({ label: { type: 'inner', offset: -10 } });
    let geometry = pie.chart.geometries[0];
    // @ts-ignore
    let labelItems = geometry.geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(parseFloat(labelItems[0].offset)).toBeLessThan(0);

    pie.update({ label: { type: 'outer' } });
    geometry = pie.chart.geometries[0];
    // @ts-ignore
    labelItems = geometry.geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(parseFloat(labelItems[0].offset)).not.toBeLessThan(0);

    pie.update({ label: { type: 'inner' } });
    geometry = pie.chart.geometries[0];
    // @ts-ignorelabelGroups
    labelItems = geometry.geometryLabel.getLabelItems(flatten(geometry.dataArray));
    expect(parseFloat(labelItems[0].offset)).toBe(-10);
  });

  afterAll(() => {
    pie.destroy();
  });
});

describe('support template string formatter', () => {
  it('', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 400,
      data: [
        { type: 'item1', value: 1 },
        { type: 'item2', value: 2 },
        { type: 'item3', value: 2 },
      ],
      angleField: 'value',
      colorField: 'type',
      label: {
        content: '{name}: {value}',
      },
    });

    pie.render();
    let labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as IGroup).getChildren()[0].attr('text')).toBe('item1: 1');

    pie.update({
      ...pie.options,
      label: {
        content: '{name}: {value}({percentage})',
      },
    });
    labels = pie.chart.geometries[0].labelsContainer.getChildren();
    // 默认不内置 limit-in-plot 的布局
    expect((labels[0] as IGroup).getChildren()[0].attr('text')).toBe('item1: 1(20.00%)');

    // 添加 limit-in-plot ellipsis
    pie.update({
      ...pie.options,
      label: {
        content: '{name}: {value}({percentage})',
        layout: [{ type: 'limit-in-plot', cfg: { action: 'ellipsis' } }],
      },
    });
    labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as IGroup).getChildren()[0].attr('text')).toBe('item1: 1(2...');

    pie.update({
      ...pie.options,
      label: {
        content: '{name}: {value}({percentage})',
      },
    });
    labels = pie.chart.geometries[0].labelsContainer.getChildren();
    // todo 暂时没有提供精度配置，直接粗暴返回
    expect((labels[0] as IGroup).getChildren()[0].attr('text')).toBe('item1: 1(2...');

    // 移除 limit-in-plot ellipsis
    pie.update({
      ...pie.options,
      label: {
        content: '{name}: {value}({percentage})',
        layout: [],
      },
    });
    labels = pie.chart.geometries[0].labelsContainer.getChildren();
    expect((labels[0] as IGroup).getChildren()[0].attr('text')).toBe('item1: 1(20.00%)');

    pie.destroy();
  });
});
