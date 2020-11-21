import {
  isLine,
  isColumn,
  getGeometryOption,
  transArrayToObject,
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

const ARRAY_TIP = 'ARRAY_TIP';

describe('DualAxes option', () => {
  it('isLine, isColumn', () => {
    expect(isLine({})).toBe(false);
    expect(isLine({ geometry: 'line' })).toBe(true);
    expect(isLine({ geometry: 'column' })).toBe(false);

    expect(isColumn({})).toBe(false);
    expect(isColumn({ geometry: 'line' })).toBe(false);
    expect(isColumn({ geometry: 'column' })).toBe(true);
  });

  it('transArrayToObject', () => {
    expect(transArrayToObject(['yField1', 'yField2'], undefined, undefined)).toEqual({
      yField1: undefined,
      yField2: undefined,
    });

    expect(transArrayToObject(['yField1', 'yField2'], [{ nice: false }], ARRAY_TIP)).toEqual({
      yField1: { nice: false },
      yField2: undefined,
    });

    expect(transArrayToObject(['yField1', 'yField2'], [false], ARRAY_TIP)).toEqual({
      yField1: false,
      yField2: undefined,
    });

    expect(transArrayToObject(['yField1', 'yField2'], { yField1: { nice: true } }, ARRAY_TIP)).toEqual({
      yField1: { nice: true },
      yField2: undefined,
    });

    expect(transArrayToObject(['yField1', 'yField2'], { yField1: { nice: true }, yField2: false }, ARRAY_TIP)).toEqual({
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

    // @ts-ignore
    expect(getYAxisWithDefault({ type: 'log' }, 'xxx')).toEqual({ type: 'log' });
  });

  it('getGeometryOption', () => {
    expect(getGeometryOption('test', 'yField1', undefined)).toEqual({
      geometry: 'line',
    });

    // @ts-ignore
    expect(getGeometryOption('test', 'yField1', { a: 1 })).toEqual({
      geometry: 'line',
      a: 1,
    });

    expect(getGeometryOption('test', 'yField1', { geometry: 'column' })).toEqual({
      geometry: 'column',
    });

    const label = getGeometryOption('test', 'yField1', { geometry: 'column', isRange: true, label: {} }).label;

    expect(
      label && typeof label.content === 'function' && label.content({ yField1: [40, 50] }, { _origin: [40, 50] }, 1)
    ).toEqual('40-50');

    expect(
      label && typeof label.content === 'function' && label.content({ yField: [40, 50] }, { _origin: [40, 50] }, 1)
    ).toBeUndefined();
  });
});
