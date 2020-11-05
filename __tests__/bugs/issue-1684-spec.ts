import { COMPONENT_TYPE } from '@antv/g2/lib/constant';
import { DualAxes } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1684', () => {
  it('legend leak', () => {
    const data = [
      { year: '1991', value: 3, count: 10 },
      { year: '1992', value: 4, count: 4 },
      { year: '1993', value: 3.5, count: 5 },
      { year: '1994', value: 5, count: 5 },
      { year: '1995', value: 4.9, count: 4.9 },
      { year: '1996', value: 6, count: 35 },
      { year: '1997', value: 7, count: 7 },
      { year: '1998', value: 9, count: 1 },
      { year: '1999', value: 13, count: 20 },
    ];

    const dualAxes = new DualAxes(createDiv(), {
      data: [data, data],
      xField: 'year',
      yField: ['value', 'count'],
      height: 300,
    });

    dualAxes.render();
    dualAxes.update(dualAxes.options);

    // @ts-ignore
    window.dualAxes = dualAxes;

    expect(dualAxes.chart.getOptions().legends).toBeInstanceOf(Object);
    // @ts-ignore
    expect(dualAxes.chart.getOptions().legends.custom).toBe(true);
    // @ts-ignore
    expect(dualAxes.chart.getOptions().legends.items.length).toBe(2);

    expect(dualAxes.chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND).length).toBe(1);
    // @ts-ignore
    expect(dualAxes.chart.getController('legend').container.cfg.children.length).toBe(1);
    // @ts-ignore
    expect(dualAxes.chart.views[0].getController('legend').container.cfg.children.length).toBe(0);
    // @ts-ignore
    expect(dualAxes.chart.views[1].getController('legend').container.cfg.children.length).toBe(0);

    expect(dualAxes.chart.views[0].getOptions().legends).toEqual({
      year: false,
      value: false,
    });
    expect(dualAxes.chart.views[1].getOptions().legends).toEqual({
      year: false,
      count: false,
    });

    dualAxes.destroy();
  });
});
