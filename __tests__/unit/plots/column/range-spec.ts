import { Column } from '../../../../src';
import { createDiv } from '../../../utils/dom';
const data = [
  { type: '分类一', values: [76, 100] },
  { type: '分类二', values: [56, 108] },
  { type: '分类三', values: [38, 129] },
  { type: '分类四', values: [58, 155] },
  { type: '分类五', values: [45, 120] },
  { type: '分类六', values: [23, 99] },
  { type: '分类七', values: [18, 56] },
  { type: '分类八', values: [18, 34] },
];
describe('column range', () => {
  it('range: inside content', () => {
    const column = new Column(createDiv('range'), {
      width: 400,
      height: 300,
      data,
      xField: 'type',
      yField: 'values',
      isRange: true,
      label: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    });

    column.render();
    const geometry = column.chart.geometries[0];
    const {
      // @ts-ignore
      labelOption: { cfg },
    } = geometry;
    expect(cfg.style).toEqual({
      fill: '#fff',
    });
    expect(cfg.position).toBe('middle');
    expect(cfg.content).not.toBeUndefined();

    column.destroy();
  });

  it('range: custom content', () => {
    const column = new Column(createDiv('range'), {
      width: 400,
      height: 300,
      data,
      xField: 'type',
      yField: 'values',
      isRange: true,
      label: {
        position: 'top',
        content: 'min',
        style: {
          fill: '#fff',
        },
      },
    });

    column.render();
    const geometry = column.chart.geometries[0];
    const {
      // @ts-ignore
      labelOption: { cfg },
    } = geometry;
    expect(cfg.style).toEqual({
      fill: '#fff',
    });
    expect(cfg.position).toBe('top');
    expect(cfg.content).toBe('min');

    column.destroy();
  });

  it('range: no label', () => {
    const column = new Column(createDiv('range'), {
      width: 400,
      height: 300,
      data,
      xField: 'type',
      yField: 'values',
      isRange: true,
    });

    column.render();
    const geometry = column.chart.geometries[0];
    const { labelOption } = geometry;
    expect(labelOption).not.toBeTruthy();

    column.destroy();
  });
});
