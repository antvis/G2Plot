import { each } from '@antv/util';
import { Column, ColumnConfig } from '../../../../../src';
import { DEFAULT_OFFSET } from '../../../../../src/plots/column/component/label';
import { createDiv } from '../../../../utils/dom';
import sales from '../../../../data/sales.json';
import { IShape } from '@antv/g-base';
import { getGeometryShapes, getGeometryByType } from '../../../../../src/util/view';
import citysaels from '../../../../../examples/data/sales';

const data: { area: string; sales: number }[] = sales;

const config: ColumnConfig = {
  width: 600,
  height: 500,
  data,
  xField: 'area',
  yField: 'sales',
};

describe('Column Label', () => {
  it('basic label', () => {
    const plot = new Column(createDiv(), {
      ...config,
      label: {
        visible: true,
      },
      meta: {
        sales: {
          formatter: (text) => Number(text).toFixed(2),
        },
      },
    });
    plot.render();

    const view = plot.getView();
    const intervals = getGeometryShapes(getGeometryByType(view, 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labels[0].getLabels()).toHaveLength(data.length);
    each(data, (datum, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(labelShapes[idx].attr('text')).toBe(datum['sales'].toFixed(2));
      // default to top position
      expect(labelShapes[idx].attr('y')).toBe(bbox.minY - DEFAULT_OFFSET);
    });
  });

  it('basic position middle', () => {
    const plot = new Column(createDiv(), {
      ...config,
      label: {
        visible: true,
        position: 'middle',
      },
      meta: {
        sales: {
          formatter: (text) => Number(text).toFixed(2),
        },
      },
    });
    plot.render();

    const view = plot.getView();
    const intervals = getGeometryShapes(getGeometryByType(view, 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labels[0].getLabels()).toHaveLength(data.length);
    each(data, (datum, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(labelShapes[idx].attr('text')).toBe(datum['sales'].toFixed(2));
      // middle position
      expect(labelShapes[idx].attr('y')).toBe(bbox.minY + bbox.height / 2);
    });
  });

  it('basic position bottom', () => {
    const plot = new Column(createDiv(), {
      ...config,
      label: {
        visible: true,
        position: 'bottom',
      },
      meta: {
        sales: {
          formatter: (text) => Number(text).toFixed(2),
        },
      },
    });
    plot.render();

    const view = plot.getView();
    const intervals = getGeometryShapes(getGeometryByType(view, 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labels[0].getLabels()).toHaveLength(data.length);
    each(data, (datum, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(labelShapes[idx].attr('text')).toBe(datum['sales'].toFixed(2));
      // middle position
      expect(labelShapes[idx].attr('y')).toBe(bbox.maxY - DEFAULT_OFFSET);
    });
  });

  it('label style', () => {
    const plot = new Column(createDiv(), {
      ...config,
      label: {
        visible: true,
        formatter: (v) => Number(v).toFixed(2),
        style: {
          fill: 'red',
        },
      },
      meta: {},
    });
    plot.render();

    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labels[0].getLabels()).toHaveLength(data.length);
    each(data, (datum, idx) => {
      expect(labelShapes[idx].attr('text')).toBe(datum['sales'].toFixed(2));
      expect(labelShapes[idx].attr('fill')).toBe('red');
    });
  });

  it('label with slider', () => {
    const plot = new Column(createDiv(), {
      ...config,
      data: citysaels,
      xField: '城市',
      yField: '销售额',
      label: {
        visible: true,
      },
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
        sales: {
          formatter: (v) => Number(v).toFixed(2),
        },
      },
    });

    plot.render();

    expect(plot).toBeDefined();
  });
});
