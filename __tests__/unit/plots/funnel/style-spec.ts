import { Funnel } from '../../../../src';
import { PV_DATA_COMPARE } from '../../../data/conversion';
import { createDiv } from '../../../utils/dom';

describe('funnel', () => {
  const plot = new Funnel(createDiv(), {
    data: PV_DATA_COMPARE,
    autoFit: true,
    xField: 'action',
    yField: 'pv',
    minSize: 0.3,
    maxSize: 0.8,
    funnelStyle: {
      fill: 'red',
    },
  });

  plot.render();

  it('default', () => {
    expect(plot.type).toBe('funnel');

    const geometry = plot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill')).toEqual('red');

    plot.update({ funnelStyle: () => ({ fill: 'red', stroke: 'blue' }) });
    expect(plot.chart.geometries[0].elements[0].shape.attr('stroke')).toEqual('blue');
  });

  it('对比漏斗图', () => {
    plot.update({ compareField: 'quarter' });
    expect(plot.chart.views.length).toEqual(2);

    const geometry = plot.chart.views[0].geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill')).toEqual('red');
    expect(elements[0].shape.attr('stroke')).toEqual('blue');
    expect(elements[0].shape.attr('lineWidth')).toEqual(1);

    plot.update({ funnelStyle: undefined });
    // 还原默认
    expect(plot.chart.views[0].geometries[0].elements[0].shape.attr('stroke')).toEqual('#fff');

    plot.update({ funnelStyle: { stroke: 'yellow' } });
    expect(plot.chart.views[0].geometries[0].elements[0].shape.attr('stroke')).toEqual('yellow');

    // function
    plot.update({ funnelStyle: () => ({ stroke: 'blue' }) });
    expect(plot.chart.views[0].geometries[0].elements[0].shape.attr('stroke')).toEqual('blue');
  });
});
