import { Violin } from '../../../../src';
import { VIOLIN_VIEW_ID } from '../../../../src/plots/violin/constant';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

const getViolinShapeType = (violin: Violin) => {
  const g = violin.chart.views.find((view) => view.id === VIOLIN_VIEW_ID).geometries[0];
  // @ts-ignore shapeType 是私有属性
  return g.elements[0].shapeType;
};

describe('violin', () => {
  it('renders hollow/smooth violins determined by options.', () => {
    const violin = new Violin(createDiv(), {
      width: 400,
      height: 500,
      data: BASE_VIOLIN_DATA,
      xField: 'type',
      yField: 'value',
    });

    // Defaults to { smooth: true, hollow: false }
    violin.render();
    expect(getViolinShapeType(violin)).toBe('smooth');

    violin.update({ smooth: false, hollow: false });
    violin.render();
    expect(getViolinShapeType(violin)).toBe('violin');

    violin.update({ smooth: false, hollow: true });
    violin.render();
    expect(getViolinShapeType(violin)).toBe('hollow');

    violin.update({ smooth: true, hollow: true });
    violin.render();
    expect(getViolinShapeType(violin)).toBe('smooth-hollow');

    violin.destroy();
  });
});
