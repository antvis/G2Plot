import { Gauge } from '../../../../../src';
import { pick } from '../../../../../src/utils';
import { createDiv } from '../../../../utils/dom';

describe('gauge', () => {
  it('no indicator', async () => {
    const gauge = new Gauge(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.75,

      indicator: false,
    });

    gauge.render();
    expect(gauge.chart.views.length).toBe(1);
    gauge.destroy();
  });

  it('no pin', async () => {
    const gauge = new Gauge(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.75,

      indicator: {
        pointer: {
          style: {
            stroke: 'pink',
          },
        },
        // @ts-ignore
        pin: false,
      },
    });

    gauge.render();

    // @ts-ignore
    expect(gauge.chart.views[0].geometries[0].elements[0].container.getChildren()[0].getChildren().length).toBe(1);
    // @ts-ignore
    expect(gauge.chart.views[0].geometries[0].elements[0].container.getChildren()[0].getChildren()[0].get('name')).toBe(
      'pointer'
    );

    gauge.destroy();
  });

  it('no pointer', async () => {
    const gauge = new Gauge(createDiv(), {
      width: 600,
      height: 300,
      autoFit: false,
      percent: 0.75,

      indicator: {
        // @ts-ignore
        pointer: false,

        pin: {
          style: {
            stroke: 'blue',
          },
        },
      },
      // @ts-ignore
      statistic: false,
    });

    gauge.render();

    // @ts-ignore
    expect(gauge.chart.views[0].geometries[0].elements[0].container.getChildren()[0].getChildren().length).toBe(1);
    // @ts-ignore
    expect(gauge.chart.views[0].geometries[0].elements[0].container.getChildren()[0].getChildren()[0].get('name')).toBe(
      'pin'
    );

    expect(gauge.chart.getController('annotation').getComponents().length).toBe(0);

    gauge.destroy();
  });
});
