import { each } from '@antv/util';
import { Column, ColumnConfig } from '../../../../../src';
import { createDiv } from '../../../../utils/dom';
// @ts-ignore
import sales from '../../../../data/sales.json';
import { IShape } from '@antv/g-base';
import { getGeometryShapes, getGeometryByType } from '../../../../../src/util/view';
// @ts-ignore
import citysaels from '../../../../../examples/data/sales';
import { POSITIVE_NEGATIVE_DATA } from '../../../../data/common';
import { DEFAULT_GLOBAL_THEME } from '../../../../../src/theme/default';

const DEFAULT_OFFSET = DEFAULT_GLOBAL_THEME.label.offset;

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

  it('label position /w negative data: top', () => {
    const plot = new Column(createDiv(), {
      ...config,
      data: POSITIVE_NEGATIVE_DATA,
      xField: 'type',
      yField: 'value',
      label: {
        visible: true,
        position: 'top',
      },
    });
    plot.render();
    const intervals = getGeometryShapes(getGeometryByType(plot.getView(), 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    each(labelShapes, (label, idx) => {
      const bbox = intervals[idx].getBBox();
      const value = POSITIVE_NEGATIVE_DATA[idx]['value'];
      expect(label.attr('x')).toBe(bbox.minX + bbox.width / 2);
      expect(label.attr('y')).toBe(value > 0 ? bbox.minY - DEFAULT_OFFSET : bbox.maxY + DEFAULT_OFFSET);
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('label position /w negative data: middle', () => {
    const plot = new Column(createDiv(), {
      ...config,
      data: POSITIVE_NEGATIVE_DATA,
      xField: 'type',
      yField: 'value',
      label: {
        visible: true,
        position: 'middle',
      },
    });
    plot.render();
    const intervals = getGeometryShapes(getGeometryByType(plot.getView(), 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    each(labelShapes, (label, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(label.attr('x')).toBe(bbox.minX + bbox.width / 2);
      expect(label.attr('y')).toBe(bbox.minY + bbox.height / 2);
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('label position /w negative data: bottom', () => {
    const plot = new Column(createDiv(), {
      ...config,
      data: POSITIVE_NEGATIVE_DATA,
      xField: 'type',
      yField: 'value',
      label: {
        visible: true,
        position: 'bottom',
      },
    });
    plot.render();
    const intervals = getGeometryShapes(getGeometryByType(plot.getView(), 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    each(labelShapes, (label, idx) => {
      const bbox = intervals[idx].getBBox();
      const value = POSITIVE_NEGATIVE_DATA[idx]['value'];
      expect(label.attr('x')).toBe(bbox.minX + bbox.width / 2);
      expect(label.attr('y')).toBe(value > 0 ? bbox.maxY - DEFAULT_OFFSET : bbox.minY + DEFAULT_OFFSET);
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
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
