import {
  isLine,
  isColumn,
  getGeometryOption,
  getCompatibleYAxis,
  getYAxisWithDefault,
} from '../../../../../src/plots/dual-axes/util/option';
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

  it('getCompatibleYAxis', () => {
    expect(getCompatibleYAxis(['yField1', 'yField2'], undefined)).toEqual({
      yField1: undefined,
      yField2: undefined,
    });

    expect(getCompatibleYAxis(['yField1', 'yField2'], [{ nice: false }])).toEqual({
      yField1: { nice: false },
      yField2: undefined,
    });

    expect(getCompatibleYAxis(['yField1', 'yField2'], [false])).toEqual({
      yField1: false,
      yField2: undefined,
    });

    expect(getCompatibleYAxis(['yField1', 'yField2'], { yField1: { nice: true } })).toEqual({
      yField1: { nice: true },
      yField2: undefined,
    });

    expect(getCompatibleYAxis(['yField1', 'yField2'], { yField1: { nice: true }, yField2: false })).toEqual({
      yField1: { nice: true },
      yField2: false,
    });
  });

  it('getDefaultYAxis', () => {
    expect(getYAxisWithDefault(undefined, AxisType.Left)).toEqual(DEFAULT_LEFT_YAXIS_CONFIG);
    expect(getYAxisWithDefault({}, AxisType.Left)).toEqual(DEFAULT_LEFT_YAXIS_CONFIG);
    expect(getYAxisWithDefault(false, AxisType.Left)).toBe(false);
    expect(getYAxisWithDefault({ type: 'cat' }, AxisType.Left)).toEqual({ ...DEFAULT_LEFT_YAXIS_CONFIG, type: 'cat' });
    expect(getYAxisWithDefault({ nice: false }, AxisType.Left)).toEqual({ ...DEFAULT_LEFT_YAXIS_CONFIG, nice: false });

    expect(getYAxisWithDefault(undefined, AxisType.Right)).toEqual(DEFAULT_RIGHT_YAXIS_CONFIG);
    expect(getYAxisWithDefault({}, AxisType.Right)).toEqual(DEFAULT_RIGHT_YAXIS_CONFIG);
    expect(getYAxisWithDefault(false, AxisType.Right)).toBe(false);
    expect(getYAxisWithDefault({ type: 'cat' }, AxisType.Right)).toEqual({
      ...DEFAULT_RIGHT_YAXIS_CONFIG,
      type: 'cat',
    });
    expect(getYAxisWithDefault({ nice: false }, AxisType.Right)).toEqual({
      ...DEFAULT_RIGHT_YAXIS_CONFIG,
      nice: false,
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
