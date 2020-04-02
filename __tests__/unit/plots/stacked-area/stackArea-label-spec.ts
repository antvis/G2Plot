import { each } from '@antv/util';
import { StackedArea, StackAreaConfig } from '../../../../src';
import subsales from '../../../data/subsales.json';
import { createDiv } from '../../../utils/dom';

const SUB_SALES_DATA: { area: string; series: string; sales: number }[] = subsales;

describe('StackArea Label', () => {
  const config: StackAreaConfig = {
    data: SUB_SALES_DATA,
    xField: 'area',
    yField: 'sales',
    stackField: 'series',
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

  it('point basic', () => {
    const plot = new StackedArea(createDiv(), config);
    plot.render();

    const labels = plot.getLayer().getLabels();
    const labelShapes = labels[0] && labels[0].getLabels();

    // Label 组件渲染
    expect(labels.length).toBe(1);

    // Label shape
    expect(labelShapes.length).toBe(SUB_SALES_DATA.length);
    each(labelShapes, (label) => {
      const origin = label.get('origin')['_origin'];
      expect(label.attr('text')).toBe(origin['sales'].toFixed(2));
      expect(label.attr('fill')).toBe(plot.getLayer().theme.label.style.fill);
    });
  });
});
