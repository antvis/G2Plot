import { isLine, isColumn, getGeometryOption, getDefaultYAxis } from '../../../../../src/plots/dual-axes/util/option';

import { AxisType } from '../../../../../src/plots/dual-axes/types';

const DEFAULT_LEFT_YAXIS_CONFIG = {
  nice: true,
  label: {
    autoHide: true,
    autoRotate: false,
  },
  position: 'left',
};

const DEFAULT_RIGHT_YAXIS_CONFIG = {
  nice: true,
  label: {
    autoHide: true,
    autoRotate: false,
  },
  position: 'right',
  grid: null,
};

describe('DualAxes option', () => {
  it('isLine, isColumn', () => {
    expect(isLine({})).toBe(false);
    expect(isLine({ geometry: 'line' })).toBe(true);
    expect(isLine({ geometry: 'column' })).toBe(false);

    expect(isColumn({})).toBe(false);
    expect(isColumn({ geometry: 'line' })).toBe(false);
    expect(isColumn({ geometry: 'column' })).toBe(true);
  });

  it('getDefaultYAxis', () => {
    expect(getDefaultYAxis(['yField1', 'yField2'], undefined)).toEqual({
      yField1: DEFAULT_LEFT_YAXIS_CONFIG,
      yField2: DEFAULT_RIGHT_YAXIS_CONFIG,
    });

    expect(getDefaultYAxis(['yField1', 'yField2'], {})).toEqual({
      yField1: DEFAULT_LEFT_YAXIS_CONFIG,
      yField2: DEFAULT_RIGHT_YAXIS_CONFIG,
    });

    // @ts-ignore
    expect(getDefaultYAxis(['yField1', 'yField2'], { yField1: { a: 1 }, yField2: false })).toEqual({
      yField1: {
        ...DEFAULT_LEFT_YAXIS_CONFIG,
        a: 1,
      },
      yField2: false,
    });

    expect(getDefaultYAxis(['yField1', 'yField2'], [])).toEqual({
      yField1: DEFAULT_LEFT_YAXIS_CONFIG,
      yField2: DEFAULT_RIGHT_YAXIS_CONFIG,
    });

    // @ts-ignore
    expect(getDefaultYAxis(['yField1', 'yField2'], [{ a: 1 }, false])).toEqual({
      yField1: {
        ...DEFAULT_LEFT_YAXIS_CONFIG,
        a: 1,
      },
      yField2: false,
    });
  });

  it('getGeometryOption', () => {
    expect(getGeometryOption('test', 'yField1', undefined, AxisType.Left)).toEqual({
      geometry: 'line',
      color: '#5B8FF9',
    });

    // @ts-ignore
    expect(getGeometryOption('test', 'yField1', { a: 1 }, AxisType.Left)).toEqual({
      geometry: 'line',
      color: '#5B8FF9',
      a: 1,
    });

    expect(getGeometryOption('test', 'yField1', { geometry: 'column' }, AxisType.Left)).toEqual({
      geometry: 'column',
    });

    const label = getGeometryOption('test', 'yField1', { geometry: 'column', isRange: true, label: {} }, AxisType.Left)
      .label;

    expect(
      label && typeof label.content === 'function' && label.content({ yField1: [40, 50] }, { _origin: [40, 50] }, 1)
    ).toEqual('40-50');

    expect(
      label && typeof label.content === 'function' && label.content({ yField: [40, 50] }, { _origin: [40, 50] }, 1)
    ).toBeUndefined();
  });
});
