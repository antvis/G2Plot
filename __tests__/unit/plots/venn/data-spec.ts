import { Venn } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('venn 异常分支处理', () => {
  const plot = new Venn(createDiv(), {
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
    data: [],
  });

  it('并集中，出现不存在的集合', () => {
    // @ts-ignore
    const fn = jest.fn();
    window.console.warn = fn;

    plot.changeData([
      { sets: ['A'], size: 12, label: 'A' },
      { sets: ['C'], size: 12, label: 'C' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'D'], size: 2, label: 'B&C' },
      { sets: ['A', 'B', 'C'], size: 30 },
    ]);
    expect(fn).toBeCalledWith('AntV/G2Plot: warn: 交集中不能出现不存在的集合, 请输入合法数据');
    // @ts-ignore
    expect(plot.chart.options.data.length).toBe(3);

    plot.changeData([
      { sets: ['A'], size: 12, label: 'A' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'D'], size: 2, label: 'B&C' },
      { sets: ['A', 'B', 'C'], size: 30 },
    ]);
    expect(fn).toBeCalledWith('AntV/G2Plot: warn: 交集中不能出现不存在的集合, 请输入合法数据');
    // @ts-ignore
    expect(plot.chart.options.data.length).toBe(1);
  });

  it('数据不为空', () => {
    // @ts-ignore
    const fn = jest.fn();
    window.console.warn = fn;

    plot.changeData([]);
    expect(fn).toBeCalledWith('AntV/G2Plot: warn: 数据不能为空');
    // @ts-ignore
    expect(plot.chart.options.data.length).toBe(0);

    plot.changeData(null);
    expect(fn).toBeCalledWith('AntV/G2Plot: warn: 数据不能为空');
    // @ts-ignore
    expect(plot.chart.options.data.length).toBe(0);

    plot.changeData(undefined);
    expect(fn).toBeCalledWith('AntV/G2Plot: warn: 数据不能为空');
    // @ts-ignore
    expect(plot.chart.options.data.length).toBe(0);
  });

  afterAll(() => {
    plot.destroy();
  });
});
