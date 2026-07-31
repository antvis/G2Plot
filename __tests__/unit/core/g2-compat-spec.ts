import { resetLegacyChartState, resizeChart } from '../../../src/core/g2-compat';

describe('g2 compat', () => {
  it('should reset legacy options and views safely', () => {
    const chart: any = {
      options: { data: [{ value: 1 }], animate: false, foo: 'bar' },
      views: [{}],
    };

    resetLegacyChartState(chart);

    expect(chart.options).toEqual({ data: [], animate: true, foo: 'bar' });
    expect(chart.views).toEqual([]);
  });

  it('should be noop for charts without legacy fields', () => {
    const chart: any = {};

    expect(() => resetLegacyChartState(chart)).not.toThrow();
    expect(chart).toEqual({});
  });

  it('should prefer forceFit when available', () => {
    const chart: any = {
      forceFit: jest.fn(),
      changeSize: jest.fn(),
    };

    resizeChart(chart, document.createElement('div'));

    expect(chart.forceFit).toHaveBeenCalledTimes(1);
    expect(chart.changeSize).toHaveBeenCalledTimes(0);
  });

  it('should fallback to changeSize when forceFit is unavailable', () => {
    const container = document.createElement('div');
    container.style.width = '320px';
    container.style.height = '240px';
    container.style.paddingLeft = '0px';
    container.style.paddingRight = '0px';
    container.style.paddingTop = '0px';
    container.style.paddingBottom = '0px';

    const chart: any = {
      changeSize: jest.fn(),
    };

    resizeChart(chart, container);

    expect(chart.changeSize).toHaveBeenCalledWith(320, 240);
  });
});
