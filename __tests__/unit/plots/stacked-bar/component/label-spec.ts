import { each } from '@antv/util';
import { StackedBar, StackedBarConfig } from '../../../../../src';
import { IShape, ORIGIN, FIELD_ORIGIN } from '../../../../../src/dependents';
import subsales from '../../../../data/subsales.json';
import { createDiv } from '../../../../utils/dom';
import { getGeometryShapes, getGeometryByType } from '../../../../../src/util/view';

const data: { area: string; series: string; sales: number }[] = subsales;

const config: StackedBarConfig = {
  width: 600,
  height: 500,
  data,
  yField: 'area',
  xField: 'sales',
  stackField: 'series',
};

describe('StackedColumn Label', () => {
  it('adjust', () => {
    const plot = new StackedBar(createDiv(), {
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

    // Label 组件
    expect(labels).toHaveLength(1);

    // Label Shape
    expect(labelShapes).toHaveLength(data.length);
    each(intervals, (interval, idx) => {
      expect(labelShapes[idx].attr('text')).toBe(labelShapes[idx].get(ORIGIN)[FIELD_ORIGIN]['sales'].toFixed(2));
    });

    // adjust
    each(labelShapes, (shape: IShape, idx) => {
      const intervalRange = intervals[idx].getBBox();
      const shapeRange = shape.getBBox();
      expect(shape.get('visible')).toBe(shapeRange.maxX <= intervalRange.maxX);
    });
  });
});
