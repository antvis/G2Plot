import { each } from '@antv/util';
import { StackedColumn, StackColumnConfig } from '../../../../../src';
import { IShape, Element } from '../../../../../src/dependents';
import subsales from '../../../../data/subsales.json';
import { createDiv } from '../../../../utils/dom';
import StackedColumnAutoLabel from '../../../../../src/plots/stacked-column/component/label-auto';
import { isContrastColorWhite } from '../../../../../src/util/color';

const LABEL_FILL = '#2c3542';
const FILL_OPACITY = 0.85;
const DATA: { area: string; series: string; sales: number }[] = subsales;

describe('StackColumn Auto Label', () => {
  const config: StackColumnConfig = {
    data: DATA,
    xField: 'area',
    yField: 'sales',
    stackField: 'series',
    label: {
      visible: true,
      type: 'stacked-column-auto',
      style: {
        fill: LABEL_FILL,
        fillOpacity: FILL_OPACITY,
      },
    },
    xAxis: {
      title: {
        visible: true,
      },
    },
    yAxis: {
      title: {
        visible: true,
      },
    },
    meta: {
      sales: {
        formatter: (v) => Math.round(Number(v) / 1000) + 'k',
      },
    },
    animation: false,
  };

  it('InShape /wo stroke', () => {
    const plot = new StackedColumn(createDiv(), { ...config, width: 800, height: 600 });
    plot.render();
    const LABEL_THEME = plot.getLayer().theme.label;
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = labels[0] && labels[0].getLabels();

    expect(columnLabel).toBeInstanceOf(StackedColumnAutoLabel);
    expect(labelShapes.length).toBe(DATA.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const columnBBox = element.shape.getBBox();
      const labelBBox = label.getBBox();
      const show = columnBBox.height >= labelBBox.height;
      const fillWhite = isContrastColorWhite(element.shape.attr('fill'));
      expect(label.get('visible')).toBe(show);
      if (show) {
        expect(label.attr('fill')).toBe(fillWhite ? LABEL_THEME.lightStyle.fill : LABEL_THEME.darkStyle.fill);
        expect(label.attr('fillOpacity')).toBe(
          fillWhite ? LABEL_THEME.lightStyle.fillOpacity : LABEL_THEME.darkStyle.fillOpacity
        );
        expect(label.attr('y')).toBe(columnBBox.minY + columnBBox.height / 2);
        expect(label.attr('textBaseline')).toBe('middle');
        expect(label.attr('stroke')).toBeUndefined();
      }
      expect(label.attr('x')).toBe(columnBBox.minX + columnBBox.width / 2);
      expect(label.attr('textAlign')).toBe('center');
    });
  });

  it('InShape /w stroke', () => {
    const plot = new StackedColumn(createDiv(), { ...config, width: 600, height: 600 });
    plot.render();
    const LABEL_THEME = plot.getLayer().theme.label;
    const labels = plot.getLayer().getLabels();
    const columnLabel = labels[0];
    const labelShapes = labels[0] && labels[0].getLabels();

    expect(columnLabel).toBeInstanceOf(StackedColumnAutoLabel);
    expect(labelShapes.length).toBe(DATA.length);
    each(labelShapes, (label: IShape) => {
      const element: Element = label.get('element');
      const columnBBox = element.shape.getBBox();
      const labelBBox = label.getBBox();
      const show = columnBBox.height >= labelBBox.height;
      const fillWhite = isContrastColorWhite(element.shape.attr('fill'));
      const stroke = columnBBox.width < labelBBox.width;
      expect(label.get('visible')).toBe(show);
      if (show) {
        if (stroke) {
          expect(label.attr('fill')).toBe(LABEL_FILL);
          expect(label.attr('fillOpacity')).toBe(FILL_OPACITY);
          expect(label.attr('stroke')).toBe(LABEL_THEME.lightStyle.stroke);
        } else {
          expect(label.attr('fill')).toBe(fillWhite ? LABEL_THEME.lightStyle.fill : LABEL_THEME.darkStyle.fill);
          expect(label.attr('fillOpacity')).toBe(
            fillWhite ? LABEL_THEME.lightStyle.fillOpacity : LABEL_THEME.darkStyle.fillOpacity
          );
          expect(label.attr('stroke')).toBeUndefined();
        }
        expect(label.attr('y')).toBe(columnBBox.minY + columnBBox.height / 2);
        expect(label.attr('textBaseline')).toBe('middle');
      }
      expect(label.attr('x')).toBe(columnBBox.minX + columnBBox.width / 2);
      expect(label.attr('textAlign')).toBe('center');
    });
  });
});
