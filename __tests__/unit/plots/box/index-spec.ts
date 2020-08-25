import { Box } from '../../../../src';
import { boxData, groupBoxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('box', () => {
  it('x*range range.min default as 0', () => {
    const box = new Box(createDiv('x*range range.min default as 0'), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
    });

    box.render();

    const geometry = box.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();

    // 类型
    expect(geometry.type).toBe('schema');
    // 图形元素个数
    expect(box.chart.geometries[0].elements.length).toBe(boxData.length);
    // x & range
    expect(positionFields).toHaveLength(2);

    // range meta default min = 0
    // @ts-ignore
    expect(geometry.scales[Box.RANGE].min).toBe(0);
  });

  it('grouped box', () => {
    const box = new Box(createDiv('grouped box'), {
      width: 400,
      height: 500,
      data: groupBoxData,
      xField: 'type',
      yField: '_bin',
      colorField: 'Species',
      isGroup: true,
    });

    box.render();

    const geometry = box.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'type',
      yField: '_bin',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['Species']);
  });

  it('grouped box /w groupField', () => {
    const box = new Box(createDiv('grouped box'), {
      width: 400,
      height: 500,
      data: groupBoxData,
      xField: 'type',
      yField: '_bin',
      groupField: 'Species',
      isGroup: true,
    });

    box.render();

    const geometry = box.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'type',
      yField: '_bin',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['Species']);
  });

  it('grouped box /w seriesField', () => {
    const box = new Box(createDiv('grouped box'), {
      width: 400,
      height: 500,
      data: groupBoxData,
      xField: 'type',
      yField: '_bin',
      seriesField: 'Species',
      isGroup: true,
    });

    box.render();

    const geometry = box.chart.geometries[0];
    expect(geometry.getAdjust('dodge')).toMatchObject({
      xField: 'type',
      yField: '_bin',
    });
    expect(geometry.getAdjust('stack')).toBeUndefined();
    expect(geometry.getAttribute('color')?.getFields()).toEqual(['Species']);
  });
});
