import { Box } from '../../../../src';
import { BOX_RANGE } from '../../../../src/plots/box/constant';
import { boxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('box axis', () => {
  it('meta', () => {
    const box = new Box(createDiv(), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      meta: {
        [BOX_RANGE]: {
          nice: true,
        },
      },
    });

    box.render();

    const geometry = box.chart.geometries[0];
    // @ts-ignore
    expect(geometry.scales[BOX_RANGE].nice).toBe(true);

    box.destroy();
  });

  it('xAxis', () => {
    const box = new Box(createDiv(), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      xAxis: {
        label: {
          rotate: -Math.PI / 2,
        },
      },
    });

    box.render();
    const axisOptions = box.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions.x.label.rotate).toBe(-Math.PI / 2);

    box.destroy();
  });

  it('yAxis', () => {
    const box = new Box(createDiv(), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      yAxis: {
        minLimit: 0,
        maxLimit: 50,
        nice: true,
      },
    });

    box.render();

    const geometry = box.chart.geometries[0];
    const axisOptions = box.chart.getOptions().axes;

    // @ts-ignore
    expect(axisOptions[BOX_RANGE].minLimit).toBe(0);
    expect(geometry.scales[BOX_RANGE].minLimit).toBe(0);
    expect(geometry.scales[BOX_RANGE].maxLimit).toBe(50);
    // @ts-ignore
    expect(geometry.scales[BOX_RANGE].nice).toBe(true);

    box.destroy();
  });
});
