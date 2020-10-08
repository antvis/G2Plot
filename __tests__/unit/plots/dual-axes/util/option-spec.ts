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
    // @ts-ignore
    expect(getOption({ yAxis: [{ a: 1 }, false], geometryOptions: [] })).toEqual({
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

    // @ts-ignore
    expect(getOption({ yAxis: [false, false], geometryOptions: [] }).yAxis).toEqual([false, false]);

    // @ts-ignore
    expect(getOption({ yAxis: [], geometryOptions: [] }).yAxis).toEqual([
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
    expect(getOption({ geometryOptions: [] }).yAxis).toEqual([
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
