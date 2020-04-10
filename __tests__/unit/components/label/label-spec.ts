import { each } from '@antv/util';
import { Column, ColumnConfig } from '../../../../src';
import { IShape } from '../../../../src/dependents';
import { createDiv } from '../../../utils/dom';
import { wait } from '../../../utils/common';
import { getGeometryShapes, getGeometryByType } from '../../../../src/util/view';
// @ts-ignore
import sales from '../../../data/sales.json';
import { DEFAULT_GLOBAL_THEME } from '../../../../src/theme/default';

const DEFAULT_OFFSET = DEFAULT_GLOBAL_THEME.label.offset;
const SALES_DATA: { area: string; sales: number }[] = sales;
const SALES_DATA_1 = SALES_DATA.slice(0, 4);
const SALES_DATA_2 = SALES_DATA.slice(2);

describe('BaseLabel', () => {
  const config: ColumnConfig = {
    data: SALES_DATA_1,
    xField: 'area',
    yField: 'sales',
    animation: true,
    meta: {
      sales: {
        formatter: (v) => Number(v).toFixed(2),
      },
    },
    label: {
      visible: true,
      type: 'column',
    },
  };

  it('Label animation', async () => {
    const plot = new Column(createDiv(), config);
    plot.render();
    window.__plot__ = plot;

    const getLabelShapes = () => {
      const label = plot.getLayer().getLabels();
      return label.length > 0 ? label[0].getLabels() : [];
    };
    const getIntervals = () => {
      return getGeometryShapes(getGeometryByType(plot.getView(), 'interval'));
    };

    let shapes = getLabelShapes();
    let intervals = getIntervals();
    each(shapes, (shape: IShape, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(shape.attr('y')).toBe(bbox.minY - DEFAULT_OFFSET);
      expect(shape.attr('x')).toBe(bbox.minX + bbox.width / 2);
    });

    await wait(1000);

    plot.changeData(SALES_DATA_2);
    await wait(1000);

    shapes = getLabelShapes();
    intervals = getIntervals();
    each(shapes, (shape: IShape, idx) => {
      const bbox = intervals[idx].getBBox();
      expect(shape.attr('y')).toBe(bbox.minY - DEFAULT_OFFSET);
      expect(shape.attr('x')).toBe(bbox.minX + bbox.width / 2);
    });
  });
});
