import { Box } from '../../../../src';
import { groupBoxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('grouped box', () => {
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
