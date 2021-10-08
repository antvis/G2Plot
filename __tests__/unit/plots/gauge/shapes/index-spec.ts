import { IGroup } from '@antv/g2';
import { Gauge } from '../../../../../src';
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

    expect(gauge.chart.views.length).toBe(1);
    gauge.update({ indicator: {} });
    expect(gauge.chart.views.length).toBe(2);

    gauge.destroy();
  });

  function getAllShapes(view) {
    return view.geometries[0].elements.reduce((r, ele) => {
      r.push(...(ele.shape as IGroup).getChildren());
      return r;
    }, []);
  }

  it('meter gauge: custom steps', () => {
    const gauge = new Gauge(createDiv(), {
      type: 'meter',
      percent: 0.75,
      indicator: null,
      meter: { steps: 100 },
    });

    gauge.render();
    expect(gauge.chart.views.length).toBe(1);
    expect(getAllShapes(gauge.chart.views[0]).length).toBe(100);

    for (let i = 0; i < 10; i++) {
      const steps = (100 * Math.random()) | 0;
      gauge.update({ meter: { steps }, range: { ticks: [0, 1 / 3, 2 / 3, 1] } });
      // 存在交接
      expect(getAllShapes(gauge.chart.views[0]).length).toBeGreaterThanOrEqual(steps);
      // 不存在交接
      gauge.update({ meter: { steps }, range: { ticks: [0, 1] } });
      expect(getAllShapes(gauge.chart.views[0]).length).toBe(steps);
    }

    gauge.destroy();
  });

  it('meter gauge: custom stepRatio', () => {
    const gauge = new Gauge(createDiv(), {
      type: 'meter',
      percent: 0.75,
      indicator: null,
      range: { ticks: [0, 1] },
      meter: { steps: 100, stepRatio: 1 },
    });

    gauge.render();
    expect(getAllShapes(gauge.chart.views[0]).length).toBe(1);

    gauge.update({ meter: { steps: 40, stepRatio: 0.2 } });
    expect(getAllShapes(gauge.chart.views[0]).length).toBe(40);

    gauge.update({ meter: { stepRatio: 1.2 } });
    expect(getAllShapes(gauge.chart.views[0]).length).toBe(1);

    gauge.update({ meter: { stepRatio: -0.2 } });
    expect(getAllShapes(gauge.chart.views[0]).length).toBe(1);

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

    expect(gauge.chart.views.length).toBe(1);
    expect(getAllShapes(gauge.chart.views[0]).length).toBeGreaterThanOrEqual(100);

    const bbox1 = getAllShapes(gauge.chart.views[0])[0].getBBox();

    gauge.update({ indicator: {} });
    // indicator 绘制在 view0
    const group2 = getAllShapes(gauge.chart.views[1])[0];
    expect(gauge.chart.views.length).toBe(2);
    expect(bbox1).toEqual(group2.getBBox());

    gauge.destroy();
  });
});
