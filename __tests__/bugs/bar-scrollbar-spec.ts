import { Bar } from '../../src';
import { createDiv } from '../utils/dom';
import { data } from '../data/scales';

describe('Bar: scrollbar', () => {
  const plot = new Bar(createDiv(), {
    forceFit: true,
    title: {
      visible: true,
      text: '基础条形图 - 滚动条',
    },
    data,
    xField: '销售额',
    yField: '城市',
    xAxis: {
      visible: true,
      label: {
        autoHide: true,
      },
    },
    yAxis: {
      visible: true,
      label: {
        autoHide: true,
      },
    },
    label: {
      visible: false,
    },
    interactions: [
      {
        type: 'scrollbar',
        cfg: {
          type: 'horizontal',
        },
      },
    ],
  });

  plot.render();

  it('render: horizontal', async () => {
    const { canvas } = plot;
    expect(canvas).not.toBeNull();
    expect(canvas.getCanvas().destroyed).toBe(false);
  });

  it('render: vertical', async () => {
    plot.updateConfig({
      interactions: [
        {
          type: 'scrollbar',
          cfg: {
            type: 'vertical',
          },
        },
      ],
    });
    plot.render();
    const { canvas } = plot;
    expect(canvas).not.toBeNull();
    expect(canvas.getCanvas().destroyed).toBe(false);
  });
});
