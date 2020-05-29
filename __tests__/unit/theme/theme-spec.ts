import { convertThemeToG2Theme } from '../../../src/theme/theme';
import { G2PlotTheme, G2Theme } from '../../../src/theme/interface';

describe('将 plot 注册的主题转换为 G2 主题', () => {
  test('basic usage', () => {
    const lineTheme: G2PlotTheme = {
      lineStyle: {
        normal: {
          storke: '#666',
          lineWidth: 1,
          strokeOpacity: 1,
          fill: null,
          lineAppendWidth: 10,
        },
        active: {
          lineWidth: 2,
        },
        selected: {
          lineWidth: 2,
        },
        disable: {
          strokeOpacity: 1,
        },
      },
      pointStyle: {
        normal: {},
        active: {},
        selected: {},
        disable: {},
      },
    };

    const g2Theme: G2Theme = {
      line: {
        line: {
          default: {
            style: { storke: '#666', lineWidth: 1, strokeOpacity: 1, fill: null, lineAppendWidth: 10 },
          },
          active: {
            style: { lineWidth: 2 },
          },
          selected: {
            style: { lineWidth: 2 },
          },
          inactive: {
            style: { strokeOpacity: 1 },
          },
        },
      },
      point: {
        circle: {
          default: { style: {} },
          active: { style: {} },
          selected: { style: {} },
          inactive: { style: {} },
        },
      },
    };

    expect(convertThemeToG2Theme('line', lineTheme)).toEqual({ geometries: g2Theme });
  });
});
