import { each, clamp, findIndex } from '@antv/util';
import { Column, ColumnConfig, GroupedColumn, GroupedColumnConfig } from '../../../../../src';
import { createDiv } from '../../../../utils/dom';
import sales from '../../../../data/sales.json';
import subsales from '../../../../data/subsales.json';
import ColumnAutoLabel from '../../../../../src/plots/column/component/label-auto';
import { IShape, Element, ORIGIN, FIELD_ORIGIN } from '../../../../../src/dependents';
import { DEFAULT_GLOBAL_THEME } from '../../../../../src/theme/default';
import { isContrastColorWhite } from '../../../../../src/util/color';

const LABEL_THEME = DEFAULT_GLOBAL_THEME.label;
const LABEL_FILL = 'rgba(44, 53, 66, 0.65)';

describe('Column Auto Label', () => {
  const config: ColumnConfig = {
    data: sales,
    xField: 'area',
    yField: 'sales',
    width: 400,
    height: 360,
    yAxis: {
      nice: true,
    },
    label: {
      visible: true,
      type: 'column-auto',
    },
    meta: {
      sales: {
        formatter: (v) => Number(v).toFixed(2),
      },
    },
  };

  it('Enough space: top position', () => {
    const plot = new Column(createDiv(), {
      ...config,
      width: 600,
      height: 500,
      label: {
        visible: true,
        type: 'column-auto',
        style: {
          fill: LABEL_FILL,
        },
      },
    });
    plot.render();
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();

    expect(columnLabel).toBeInstanceOf(ColumnAutoLabel);
    expect(labelShapes.length).toBe(sales.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const columnBBox = element.shape.getBBox();
      expect(label.get('visible')).toBe(true);
      expect(label.attr('fill')).toBe(LABEL_FILL);
      expect(label.attr('y')).toBe(columnBBox.minY - LABEL_THEME.offset);
      expect(label.attr('x')).toBe(columnBBox.minX + columnBBox.width / 2);
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('Enough space: in shape', () => {
    const plot = new Column(createDiv(), {
      ...config,
      width: 800,
      height: 600,
      label: {
        visible: true,
        type: 'column-auto',
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
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();

    expect(columnLabel).toBeInstanceOf(ColumnAutoLabel);
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

  it('Small space: auto hide', () => {
    const plot = new Column(createDiv(), {
      ...config,
      width: 360,
      height: 280,
      label: {
        visible: true,
        type: 'column-auto',
        style: {
          fill: LABEL_FILL,
        },
      },
    });
    plot.render();
    const coordinateBBox = plot.getView().coordinateBBox;
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();

    expect(columnLabel).toBeInstanceOf(ColumnAutoLabel);
    expect(labelShapes.length).toBe(sales.length);
    const hiddens = ['中南', '西北'];
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const columnBBox = element.shape.getBBox();
      const xValue = label.get(ORIGIN)[FIELD_ORIGIN]['area'];
      const labelBBox = label.getBBox();
      const isHidden = hiddens.includes(xValue);
      expect(label.get('visible')).toBe(!isHidden);
      expect(label.attr('fill')).toBe(LABEL_FILL);
      expect(label.attr('y')).toBe(
        Math.max(columnBBox.minY - LABEL_THEME.offset, coordinateBBox.minY + labelBBox.height / 2)
      );
      expect(label.attr('x')).toBe(
        clamp(
          columnBBox.minX + columnBBox.width / 2,
          coordinateBBox.minX + labelBBox.width / 2,
          coordinateBBox.maxX - labelBBox.width / 2
        )
      );
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });
});

describe('Grouped Column Auto Label', () => {
  const config: GroupedColumnConfig = {
    data: subsales,
    xField: 'area',
    yField: 'sales',
    groupField: 'series',
    yAxis: {
      nice: true,
    },
    label: {
      visible: true,
      type: 'column-auto',
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

  it('Enough space: top position', () => {
    const plot = new GroupedColumn(createDiv(), {
      ...config,
      width: 600,
      height: 600,
      meta: {
        sales: {
          formatter: (v) => Math.round(Number(v) / 1000000) + 'M',
        },
      },
    });
    plot.render();

    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();
    expect(columnLabel).toBeInstanceOf(ColumnAutoLabel);
    expect(labelShapes.length).toBe(subsales.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const columnBBox = element.shape.getBBox();
      expect(label.get('visible')).toBe(true);
      expect(label.attr('fill')).toBe(LABEL_FILL);
      expect(label.attr('x')).toBe(columnBBox.minX + columnBBox.width / 2);
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });

  it('Enough space: in shape', () => {
    const plot = new GroupedColumn(createDiv(), {
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
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = columnLabel.getLabels();
    expect(columnLabel).toBeInstanceOf(ColumnAutoLabel);
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
    const plot = new GroupedColumn(createDiv(), {
      ...config,
      width: 460,
      height: 300,
      xAxis: {
        title: {
          visible: false,
        },
      },
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
    expect(columnLabel).toBeInstanceOf(ColumnAutoLabel);
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
