import { flow } from '../../../src/utils/flow';
import { Plot } from '../../../src/core/plot';
import { pattern } from '../../../src/adaptor/pattern';
import { theme } from '../../../src/adaptor/common';
import { createDiv } from '../../utils/dom';
import { createSquarePattern } from '../../../src/utils/pattern/square';

describe('pattern adaptor', () => {
  class APlot extends Plot<any> {
    type: 'a-plot';

    getDefaultOptions() {
      return {};
    }

    getSchemaAdaptor() {
      return (params: any) => flow(theme, pattern('xxx'))(params);
    }
  }

  const plot = new APlot(createDiv(), {
    color: ['red', 'yellow'],
    xxx: {
      stroke: 'red',
    },
  });

  it('default', () => {
    expect(typeof pattern('xxx')).toBe('function');
    let params = pattern('xxx')({ chart: plot.chart, options: plot.options });
    expect(params.options.xxx.fill).toBeUndefined();

    params = pattern('xxx')({ chart: plot.chart, options: { ...plot.options, pattern: { type: 'dot' } } });
    expect(params.options.xxx).not.toBeUndefined();
    expect(params.options.xxx.call().fill instanceof CanvasPattern).toBe(true);

    // callback
    params = pattern('xxx')({ chart: plot.chart, options: { ...plot.options, pattern: () => ({ type: 'line' }) } });
    expect(params.options.xxx.call().fill instanceof CanvasPattern).toBe(true);

    // canvasPattern
    const suqarePattern = createSquarePattern({ size: 10, padding: 0, isStagger: true });
    params = pattern('xxx')({ chart: plot.chart, options: { ...plot.options, pattern: suqarePattern } });
    expect(params.options.xxx.call().fill instanceof CanvasPattern).toBe(true);
  });

  it('xxx configuration', () => {
    let params = pattern('xxx')({ chart: plot.chart, options: { ...plot.options, pattern: { type: 'dot' } } });
    expect(params.options.xxx.call().stroke).toBe('red');

    params = pattern('xxx')({
      chart: plot.chart,
      options: { ...plot.options, xxx: () => ({ stroke: 'red', fill: 'yellow' }), pattern: null },
    });
    expect(params.options.xxx.call().stroke).toBe('red');
    expect(params.options.xxx.call().fill).toBe('yellow');

    params = pattern('xxx')({
      chart: plot.chart,
      options: { ...plot.options, xxx: () => ({ stroke: 'red', fill: 'yellow' }), pattern: { type: 'dot' } },
    });
    expect(params.options.xxx.call().stroke).toBe('red');
    expect(params.options.xxx.call().fill instanceof CanvasPattern).toBe(true);
  });

  afterAll(() => {
    plot.destroy();
  });
});
