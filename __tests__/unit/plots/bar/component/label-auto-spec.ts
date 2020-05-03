import { each, findIndex } from '@antv/util';
import { Bar, BarConfig, GroupedBar, GroupedBarConfig } from '../../../../../src';
import { createDiv } from '../../../../utils/dom';
import sales from '../../../../data/sales.json';
import subsales from '../../../../data/subsales.json';
import BarAutoLabel from '../../../../../src/plots/bar/component/label-auto';
import { IShape, Element, ORIGIN, FIELD_ORIGIN } from '../../../../../src/dependents';
import { isContrastColorWhite } from '../../../../../src/util/color';

const LABEL_FILL = 'rgba(44, 53, 66, 0.65)';

describe('Bar Auto Label', () => {
  const config: BarConfig = {
    data: sales,
    yField: 'area',
    xField: 'sales',
    width: 400,
    height: 360,
    xAxis: {
      nice: true,
    },
    label: {
      visible: true,
      type: 'bar-auto',
    },
    meta: {
      sales: {
        formatter: (v) => Number(v).toFixed(2),
      },
    },
  };

  it('Enough space: right position', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      width: 600,
      height: 200,
      label: {
        visible: true,
        type: 'bar-auto',
        position: 'right',
        style: {
          fill: LABEL_FILL,
        },
      },
      meta: {
        sales: {
          formatter: (v) => Math.round(Number(v) / 1000000) + 'M',
        },
      },
    });
    plot.render();
    const LABEL_THEME = plot.getLayer().theme.label;
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();

    expect(columnLabel).toBeInstanceOf(BarAutoLabel);
    expect(labelShapes.length).toBe(sales.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const columnBBox = element.shape.getBBox();
      expect(label.get('visible')).toBe(true);
      expect(label.attr('fill')).toBe(LABEL_FILL);
      expect(label.attr('y')).toBe(columnBBox.minY + columnBBox.height / 2);
      expect(label.attr('x')).toBe(columnBBox.maxX + LABEL_THEME.offset);
      expect(label.attr('textAlign')).toBe('left');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('Enough space: in shape', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      width: 800,
      height: 600,
      label: {
        visible: true,
        type: 'bar-auto',
        style: {
          fill: LABEL_FILL,
        },
      },
      meta: {
        sales: {
          formatter: (v) => Math.round(Number(v) / 1000000) + 'M',
        },
      },
    });
    plot.render();
    const LABEL_THEME = plot.getLayer().theme.label;
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();

    expect(columnLabel).toBeInstanceOf(BarAutoLabel);
    expect(labelShapes.length).toBe(sales.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const { shape } = element;
      const fillWhite = isContrastColorWhite(shape.attr('fill'));
      const columnBBox = element.shape.getBBox();
      expect(label.get('visible')).toBe(true);
      expect(label.attr('fill')).toBe(fillWhite ? LABEL_THEME.lightStyle.fill : LABEL_THEME.darkStyle.fill);
      expect(label.attr('y')).toBe(columnBBox.minY + columnBBox.height / 2);
      expect(label.attr('x')).toBe(columnBBox.minX + columnBBox.width / 2);
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('Small space: overflow', () => {
    const plot = new Bar(createDiv(), {
      ...config,
      width: 360,
      height: 280,
      label: {
        visible: true,
        type: 'bar-auto',
        style: {
          fill: LABEL_FILL,
        },
      },
    });
    plot.render();
    const LABEL_THEME = plot.getLayer().theme.label;
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();

    expect(columnLabel).toBeInstanceOf(BarAutoLabel);
    expect(labelShapes.length).toBe(sales.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const columnBBox = element.shape.getBBox();
      const fillWhite = isContrastColorWhite(element.shape.attr('fill'));
      const labelBBox = label.getBBox();
      const isOverflow = labelBBox.width > columnBBox.width;
      expect(label.get('visible')).toBe(true);
      expect(label.attr('fill')).toBe(
        isOverflow ? LABEL_FILL : fillWhite ? LABEL_THEME.lightStyle.fill : LABEL_THEME.darkStyle.fill
      );
      expect(label.attr('y')).toBe(columnBBox.minY + columnBBox.height / 2);
      expect(label.attr('x')).toBe(
        isOverflow ? columnBBox.maxX + LABEL_THEME.offset : columnBBox.minX + columnBBox.width / 2
      );
      expect(label.attr('textBaseline')).toBe('middle');
      expect(label.attr('textAlign')).toBe(isOverflow ? 'left' : 'center');
    });
  });
});

describe('Grouped Bar Auto Label', () => {
  const config: GroupedBarConfig = {
    data: subsales,
    yField: 'area',
    xField: 'sales',
    groupField: 'series',
    xAxis: {
      nice: true,
    },
    label: {
      visible: true,
      type: 'bar-auto',
      style: {
        fill: LABEL_FILL,
      },
    },
    meta: {
      sales: {
        formatter: (v) => Number(v).toFixed(2),
      },
    },
  };

  it('Enough space: right position', () => {
    const plot = new GroupedBar(createDiv(), {
      ...config,
      width: 800,
      height: 500,
      meta: {
        sales: {
          formatter: (v) => Math.round(Number(v) / 1000000) + 'M',
        },
      },
    });
    plot.render();
    const LABEL_THEME = plot.getLayer().theme.label;
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();
    expect(columnLabel).toBeInstanceOf(BarAutoLabel);
    expect(labelShapes.length).toBe(subsales.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const columnBBox = element.shape.getBBox();
      expect(label.get('visible')).toBe(true);
      expect(label.attr('fill')).toBe(LABEL_FILL);
      expect(label.attr('x')).toBe(columnBBox.maxX + LABEL_THEME.offset);
      expect(label.attr('y')).toBe(columnBBox.minY + columnBBox.height / 2);
      expect(label.attr('textAlign')).toBe('left');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('Enough space: in shape', () => {
    const plot = new GroupedBar(createDiv(), {
      ...config,
      width: 1000,
      height: 600,
      meta: {
        sales: {
          formatter: (v) => Math.round(Number(v) / 1000000) + 'M',
        },
      },
    });
    plot.render();
    const LABEL_THEME = plot.getLayer().theme.label;
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();
    expect(columnLabel).toBeInstanceOf(BarAutoLabel);
    expect(labelShapes.length).toBe(subsales.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const { shape } = element;
      const fillWhite = isContrastColorWhite(shape.attr('fill'));
      const columnBBox = element.shape.getBBox();
      expect(label.get('visible')).toBe(true);
      expect(label.attr('fill')).toBe(fillWhite ? LABEL_THEME.lightStyle.fill : LABEL_THEME.darkStyle.fill);
      expect(label.attr('x')).toBe(columnBBox.minX + columnBBox.width / 2);
      expect(label.attr('y')).toBe(columnBBox.minY + columnBBox.height / 2);
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('Small space: auto hide', () => {
    const plot = new GroupedBar(createDiv(), {
      ...config,
      width: 460,
      height: 300,
      yAxis: {
        title: {
          visible: false,
        },
      },
      meta: {
        sales: {
          formatter: (v) => Math.round(Number(v) / 1000) + 'k',
        },
      },
    });
    plot.render();
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();
    expect(columnLabel).toBeInstanceOf(BarAutoLabel);
    expect(labelShapes.length).toBe(subsales.length);
    const hiddens = [
      {
        area: '西北',
        series: '公司',
      },
      {
        area: '西南',
        series: '公司',
      },
    ];
    each(labelShapes, (label: IShape) => {
      const data = label.get(ORIGIN)[FIELD_ORIGIN];
      const isHidden = findIndex(hiddens, (item) => item.area === data['area'] && item.series === data['series']) >= 0;
      expect(label.get('visible')).toBe(!isHidden);
      expect(label.attr('fill')).toBe(LABEL_FILL);
    });
  });
});
