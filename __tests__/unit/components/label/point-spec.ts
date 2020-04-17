import { Line, LineConfig } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { each } from '@antv/util';
import sales from '../../../data/sales.json';
import citysaels from '../../../../examples/data/sales.json';

const SALES_DATA: { area: string; sales: number }[] = sales;

describe('Line Point Label', () => {
  const config: LineConfig = {
    width: 600,
    height: 500,
    data: SALES_DATA,
    xField: 'area',
    yField: 'sales',
    yAxis: {
      nice: true,
    },
    label: {
      visible: true,
      type: 'point',
    },
    meta: {
      sales: {
        formatter: (v) => Number(v).toFixed(2),
      },
    },
  };

  it('basic', () => {
    const plot = new Line(createDiv(), config);
    plot.render();

    const labels = plot.getLayer().getLabels();
    const labelShapes = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels.length).toBe(1);

    // Label shape
    expect(labelShapes.length).toBe(SALES_DATA.length);
    each(labelShapes, (label, idx) => {
      expect(label.attr('text')).toBe(SALES_DATA[idx]['sales'].toFixed(2));
      expect(label.attr('fill')).toBe(plot.getLayer().theme.label.style.fill);
    });
  });

  it('label style', () => {
    const plot = new Line(createDiv(), {
      ...config,
      label: {
        visible: true,
        style: {
          fill: 'red',
          stroke: 'yellow',
        },
      },
    });
    plot.render();

    const labels = plot.getLayer().getLabels();
    const labelShapes = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels.length).toBe(1);

    // Label shape
    expect(labelShapes.length).toBe(SALES_DATA.length);
    each(labelShapes, (label, idx) => {
      expect(label.attr('text')).toBe(SALES_DATA[idx]['sales'].toFixed(2));
      expect(label.attr('fill')).toBe('red');
      expect(label.attr('stroke')).toBe('yellow');
    });
  });

  it('label with slider', () => {
    const plot = new Line(createDiv(), {
      ...config,
      data: citysaels,
      xField: '城市',
      yField: '销售额',
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 0.02,
          },
        },
      ],
      meta: {
        销售额: {
          formatter: (v) => Number(v).toFixed(2),
        },
      },
    });
    plot.render();
    const getData = (range: [number, number]): any[] => {
      const len = citysaels.length;
      return citysaels.slice(len * range[0], len * range[1]);
    };
    const getLabelShapes = () => {
      const label = plot.getLayer().getLabels()[0];
      return label ? label.getLabels() : [];
    };

    // initial state
    expect(plot.getLayer().getLabels()).toHaveLength(1);
    expect(getLabelShapes().length).toBe(getData([0, 0.02]).length);
    each(getLabelShapes(), (label, idx) => {
      const data = getData([0, 0.02]);
      expect(`${label.attr('text')}`).toBe(data[idx]['销售额'].toFixed(2));
    });

    // simulate slider change
    plot
      .getLayer()
      .getInteractions()[0]
      // @ts-ignore
      .slider.emit('sliderchange', [0.05, 0.1]);
    expect(plot.getLayer().getLabels()).toHaveLength(1);
  });
});
