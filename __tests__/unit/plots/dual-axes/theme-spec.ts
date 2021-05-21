import { DualAxes, G2 } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

G2.registerTheme('my-theme', {
  components: {
    axis: {
      left: {
        line: {
          style: {
            stroke: '#5B8FF9',
          },
        },
      },
      right: {
        line: {
          style: {
            stroke: '#5B8FF9',
          },
        },
      },
    },
    legend: {
      top: {
        itemName: {
          style: {
            fill: '#5B8FF9',
          },
        },
      },
    },
  },
});

describe('DualAxes theme', () => {
  it('theme', () => {
    const yField = ['pv', 'uv'];
    const dualAxes = new DualAxes(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField,
      theme: 'my-theme',
    });

    dualAxes.render();

    // test legend
    expect(dualAxes.chart.getTheme().components.legend.top.itemName.style.fill).toBe('#5B8FF9');

    const legend = dualAxes.chart.getComponents().find((i) => i.type === 'legend');
    expect(legend.component.cfg.itemName.style.fill).toBe('#5B8FF9');

    const [leftView, rightView] = dualAxes.chart.views;
    const leftViewAxis = leftView.getComponents().find((i) => i.type === 'axis' && i.direction === 'left');
    expect(leftView.getTheme().components.axis.left.line.style.stroke).toBe('#5B8FF9');
    expect(leftViewAxis.component.cfg.line.style.stroke).toBe('#5B8FF9');

    const rightViewAxis = rightView.getComponents().find((i) => i.type === 'axis' && i.direction === 'right');
    expect(rightView.getTheme().components.axis.right.line.style.stroke).toBe('#5B8FF9');
    expect(rightViewAxis.component.cfg.line.style.stroke).toBe('#5B8FF9');

    dualAxes.destroy();
  });
});
