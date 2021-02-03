import { IGroup } from '@antv/g2';
import { Gauge } from '../../../../../src';
import { MASK_VIEW_ID } from '../../../../../src/plots/gauge/constant';
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

  it('meter gauge', () => {
    const gauge = new Gauge(createDiv(), {
      type: 'meter',
      percent: 0.75,
      indicator: null,
    });

    gauge.render();

    expect(gauge.chart.views.length).toBe(2);

    gauge.update({ indicator: {} });
    expect(gauge.chart.views.length).toBe(3);
    expect(gauge.chart.views[2].id).toBe(MASK_VIEW_ID);

    gauge.destroy();
  });

  it('meter gauge: custom steps', () => {
    const gauge = new Gauge(createDiv(), {
      type: 'meter',
      percent: 0.75,
      indicator: null,
      meter: { steps: 100 },
    });

    gauge.render();

    expect(gauge.chart.views.length).toBe(2);
    const maskShape = gauge.chart.views[1].geometries[0].elements[0].shape as IGroup;
    expect(maskShape.getChildren().length).toBe(99);

    gauge.destroy();
  });

  it('meter gauge: custom stepRatio', () => {
    const gauge = new Gauge(createDiv(), {
      type: 'meter',
      percent: 0.75,
      indicator: null,
      meter: { steps: 100, stepRatio: 1 },
    });

    gauge.render();

    expect(gauge.chart.views.length).toBe(2);
    let maskShape = gauge.chart.views[1].geometries[0].elements[0].shape as IGroup;
    expect(maskShape.getChildren().length).toBe(0);

    gauge.update({ meter: { steps: 40, stepRatio: 0.2 } });
    maskShape = gauge.chart.views[1].geometries[0].elements[0].shape as IGroup;
    expect(maskShape.getChildren().length).toBe(39);

    gauge.update({ meter: { stepRatio: 1.2 } });
    maskShape = gauge.chart.views[1].geometries[0].elements[0].shape as IGroup;
    expect(maskShape.getChildren().length).toBe(0);

    gauge.update({ meter: { stepRatio: -0.2 } });
    maskShape = gauge.chart.views[1].geometries[0].elements[0].shape as IGroup;
    expect(maskShape.getChildren().length).toBe(0);

    gauge.destroy();
  });

  it('meter gauge: custom steps with indicator', () => {
    const gauge = new Gauge(createDiv(), {
      type: 'meter',
      percent: 0.75,
      indicator: null,
      meter: { steps: 100 },
    });

    gauge.render();

    expect(gauge.chart.views.length).toBe(2);
    const maskShape1 = gauge.chart.views[1].geometries[0].elements[0].shape as IGroup;
    expect(maskShape1.getChildren().length).toBe(99);

    const shape1 = maskShape1.getChildren()[0].getBBox();

    gauge.update({ indicator: {} });
    expect(gauge.chart.views.length).toBe(3);
    const maskShape2 = gauge.chart.views[2].geometries[0].elements[0].shape as IGroup;
    expect(shape1).toEqual(maskShape2.getChildren()[0].getBBox());

    gauge.destroy();
  });

  it('meter gauge: custom theme.background', () => {
    const gauge = new Gauge(createDiv(), {
      type: 'meter',
      percent: 0.75,
      indicator: null,
      theme: { background: 'red' },
    });

    gauge.render();

    expect(gauge.chart.views.length).toBe(2);
    let maskShape = gauge.chart.views[1].geometries[0].elements[0].shape as IGroup;
    expect(maskShape.getChildren()[0].attr('fill')).toBe('red');

    gauge.update({ theme: 'dark' });
    maskShape = gauge.chart.views[1].geometries[0].elements[0].shape as IGroup;
    expect(maskShape.getChildren()[0].attr('fill')).toBe(gauge.chart.getTheme().background);

    gauge.destroy();
  });
});
