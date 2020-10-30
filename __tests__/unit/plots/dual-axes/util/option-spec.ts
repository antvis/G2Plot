import { isLine, isColumn, getOption } from '../../../../../src/plots/dual-axes/util/option';

describe('DualAxes option', () => {
  it('isLine, isColumn', () => {
    expect(isLine({})).toBe(false);
    expect(isLine({ geometry: 'line' })).toBe(true);
    expect(isLine({ geometry: 'column' })).toBe(false);

    expect(isColumn({})).toBe(false);
    expect(isColumn({ geometry: 'line' })).toBe(false);
    expect(isColumn({ geometry: 'column' })).toBe(true);
  });

  it('yAxis option', () => {
    expect(
      // @ts-ignore
      getOption({ xField: 'test', yField: ['test1', 'test2'], yAxis: [{ a: 1 }, false], geometryOptions: [] })
    ).toEqual({
      xField: 'test',
      yField: ['test1', 'test2'],
      yAxis: [
        {
          nice: true,
          label: {
            autoHide: true,
            autoRotate: false,
          },
          a: 1,
        },
        false,
      ],
      geometryOptions: [
        {
          geometry: 'line',
          color: '#5B8FF9',
        },
        {
          geometry: 'line',
          color: '#E76C5E',
        },
      ],
    });

    expect(
      // @ts-ignore
      getOption({ xField: 'test', yField: ['test1', 'test2'], yAxis: [false, false], geometryOptions: [] }).yAxis
    ).toEqual([false, false]);

    // @ts-ignore
    expect(getOption({ xField: 'test', yField: ['test1', 'test2'], yAxis: [], geometryOptions: [] }).yAxis).toEqual([
      {
        nice: true,
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      {
        nice: true,
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
    ]);

    // @ts-ignore
    expect(getOption({ xField: 'test', yField: ['test1', 'test2'], geometryOptions: [] }).yAxis).toEqual([
      {
        nice: true,
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      {
        nice: true,
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
    ]);
  });
});
