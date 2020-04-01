import { each } from '@antv/util';
import { Area, AreaConfig } from '../../../../src';
import sales from '../../../data/sales.json';
import { createDiv } from '../../../utils/dom';

const SALES_DATA: { area: string; sales: number }[] = sales;

describe('Area Label', () => {
  const config: AreaConfig = {
    data: SALES_DATA,
    xField: 'area',
    yField: 'sales',
    label: {
      visible: true,
    },
    meta: {
      sales: {
        formatter: (v) => Number(v).toFixed(2),
      },
    },
  };

  it('point label', () => {
    const plot = new Area(createDiv(), config);
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
});
