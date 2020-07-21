import { Bar, BarConfig } from '../../../../../src';
// @ts-ignore
import sales from '../../../../data/sales.json';
// @ts-ignore
import citysaels from '../../../../../examples/data/sales';
import { createDiv } from '../../../../utils/dom';
import { getGeometryShapes, getGeometryByType } from '../../../../../src/util/view';
import { each } from '@antv/util';
import { IShape } from '../../../../../src/dependents';
import { POSITIVE_NEGATIVE_DATA } from '../../../../data/common';
import { DEFAULT_GLOBAL_THEME } from '../../../../../src/theme/default';

const DEFAULT_OFFSET = DEFAULT_GLOBAL_THEME.label.offset;

const data: { area: string; sales: number }[] = sales;
const cityData: { 城市: string; 销售额: number }[] = citysaels;

const config: BarConfig = {
  width: 500,
  height: 600,
  yField: 'area',
  xField: 'sales',
  data,
};

describe('Bar Label', () => {
  it('basic label', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      label: {
        visible: true,
      },
      meta: {
        sales: {
          formatter: (v) => Number(v).toFixed(2),
        },
      },
    });

    plot.render();

    const view = plot.getView();
    const intervals = getGeometryShapes(getGeometryByType(view, 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labelShapes).toHaveLength(data.length);
    each(intervals, (interval, idx) => {
      const value = interval.get('origin').data['sales'];
      expect(labelShapes[idx].attr('text')).toBe(value.toFixed(2));
    });
  });

  it('label position: left', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      label: {
        visible: true,
        position: 'left',
        adjustPosition: false,
      },
      meta: {
        sales: {
          formatter: (v) => Number(v).toFixed(2),
        },
      },
    });

    plot.render();

    const view = plot.getView();
    const intervals = getGeometryShapes(getGeometryByType(view, 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labelShapes).toHaveLength(data.length);
    each(data, (datum, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(labelShapes[idx].attr('x')).toBe(bbox.minX + DEFAULT_OFFSET);
    });
  });

  it('label position: right', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      label: {
        visible: true,
        position: 'right',
        adjustPosition: false,
      },
      meta: {
        sales: {
          formatter: (v) => Number(v).toFixed(2),
        },
      },
    });

    plot.render();

    const view = plot.getView();
    const intervals = getGeometryShapes(getGeometryByType(view, 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labelShapes).toHaveLength(data.length);
    each(data, (datum, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(labelShapes[idx].attr('x')).toBe(bbox.maxX + DEFAULT_OFFSET);
    });
  });

  it('label position: middle', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      label: {
        visible: true,
        position: 'middle',
        adjustPosition: false,
      },
      meta: {
        sales: {
          formatter: (v) => Number(v).toFixed(2),
        },
      },
    });

    plot.render();

    const view = plot.getView();
    const intervals = getGeometryShapes(getGeometryByType(view, 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labelShapes).toHaveLength(data.length);
    each(data, (datum, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(labelShapes[idx].attr('x')).toBe(bbox.minX + bbox.width / 2);
    });
  });

  it('label position /w negative data: right', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      data: POSITIVE_NEGATIVE_DATA,
      yField: 'type',
      xField: 'value',
      label: {
        visible: true,
        position: 'right',
      },
    });
    plot.render();
    const intervals = getGeometryShapes(getGeometryByType(plot.getView(), 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    each(labelShapes, (label, idx) => {
      const bbox = intervals[idx].getBBox();
      const value = intervals[idx].get('origin').data['value'];
      expect(label.attr('x')).toBe(value > 0 ? bbox.maxX + DEFAULT_OFFSET : bbox.minX - DEFAULT_OFFSET);
      expect(label.attr('y')).toBe(bbox.minY + bbox.height / 2);
      expect(label.attr('textAlign')).toBe(value > 0 ? 'left' : 'right');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('label position /w negative data: middle', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      data: POSITIVE_NEGATIVE_DATA,
      yField: 'type',
      xField: 'value',
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

  it('label position /w negative data: left', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      data: POSITIVE_NEGATIVE_DATA,
      yField: 'type',
      xField: 'value',
      label: {
        visible: true,
        position: 'left',
      },
    });
    plot.render();
    const intervals = getGeometryShapes(getGeometryByType(plot.getView(), 'interval'));
    const labels = plot.getLayer().getLabels();
    const labelShapes: IShape[] = labels[0] && labels[0].getLabels();

    each(labelShapes, (label, idx) => {
      const bbox = intervals[idx].getBBox();
      const value = intervals[idx].get('origin').data['value'];
      expect(label.attr('x')).toBe(value > 0 ? bbox.minX + DEFAULT_OFFSET : bbox.maxX - DEFAULT_OFFSET);
      expect(label.attr('y')).toBe(bbox.minY + bbox.height / 2);
      expect(label.attr('textAlign')).toBe(value > 0 ? 'left' : 'right');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('label style', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      label: {
        visible: true,
        adjustColor: false,
        style: {
          fill: 'red',
        },
      },
      meta: {
        sales: {
          formatter: (v) => Number(v).toFixed(2),
        },
      },
    });

    plot.render();

    const labels = plot.getLayer().getLabels();
    const labelShapes = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels).toHaveLength(1);

    // Label shape
    expect(labelShapes).toHaveLength(data.length);
    each(labelShapes, (label) => {
      expect(label.attr('fill')).toBe('red');
    });
  });

  xit('label with scrollbar', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      data: cityData,
      yField: '城市',
      xField: '销售额',
      label: {
        visible: true,
      },
      interactions: [
        {
          type: 'scrollbar',
          cfg: {
            type: 'vertical',
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

    let labels: IShape[];
    let curData: any[];

    const getData = (offset: number): any[] => {
      const len = cityData.length;
      const cnt = Math.floor(plot.getView().coordinateBBox.height / 32);
      return cityData.slice(len * offset, len * offset + cnt).reverse();
    };
    const getLabelShapes = () => {
      const labels = plot.getLayer().getLabels();
      return labels[0] && labels[0].getLabels();
    };

    // initial state
    labels = getLabelShapes();
    curData = getData(0);
    expect(plot.getLayer().getLabels()).toHaveLength(1);
    expect(labels.length).toBe(curData.length);
    each(labels, (label, idx) => {
      expect(`${label.attr('text')}`).toBe(curData[idx]['销售额'].toFixed(2));
    });

    // simulate scrollbar change
    plot
      .getLayer()
      .getInteractions()[0]
      // @ts-ignore
      .scrollbar.emit('scrollbarchange', {
        ratio: 0.5,
      });
    labels = getLabelShapes();
    curData = getData(0);
    expect(plot.getLayer().getLabels()).toHaveLength(1);
    expect(labels.length).toBe(curData.length);
    each(labels, (label, idx) => {
      expect(`${label.attr('text')}`).toBe(curData[idx]['销售额'].toFixed(2));
    });
  });
});
