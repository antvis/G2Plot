import { Funnel } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('funnel state', () => {
  const data = [
    { stage: '简历筛选', number: 253 },
    { stage: '初试人数', number: 151 },
    { stage: '复试人数', number: 113 },
    { stage: '录取人数', number: 87 },
    { stage: '入职人数', number: 59 },
  ];

  const plot = new Funnel(createDiv(), {
    data: data,
    xField: 'stage',
    yField: 'number',
    legend: false,
    state: {
      selected: {
        style: {
          fill: 'red',
          stroke: 'blue',
        },
      },
    },
    animation: false,
  });

  plot.render();
  it('basic funnel', () => {
    let element = plot.chart.geometries[0].elements[0];
    expect(element.getModel().color).not.toBe('red');

    plot.setState('selected', (data: any) => data.stage === '简历筛选');
    element = plot.chart.geometries[0].elements[0];
    expect(element.shape.attr('fill')).toBe('red');
    expect(element.shape.attr('stroke')).toBe('blue');
  });

  it('dynamicHeight funnel', () => {
    plot.update({
      dynamicHeight: true,
    });

    let element = plot.chart.geometries[0].elements[0];
    expect(element.getModel().color).not.toBe('red');

    plot.setState('selected', (data: any) => data.stage === '简历筛选');
    element = plot.chart.geometries[0].elements[0];
    expect(element.shape.attr('fill')).toBe('red');
  });

  it('compare funnel', () => {
    plot.update({
      data: [
        { stage: '简历筛选', number: 253, company: 'A公司' },
        { stage: '初试人数', number: 151, company: 'A公司' },
        { stage: '复试人数', number: 113, company: 'A公司' },
        { stage: '录取人数', number: 87, company: 'A公司' },
        { stage: '入职人数', number: 59, company: 'A公司' },
        { stage: '简历筛选', number: 303, company: 'B公司' },
        { stage: '初试人数', number: 251, company: 'B公司' },
        { stage: '复试人数', number: 153, company: 'B公司' },
        { stage: '录取人数', number: 117, company: 'B公司' },
        { stage: '入职人数', number: 79, company: 'B公司' },
      ],
      minSize: 0.3,
      maxSize: 0.8,
      compareField: 'company',
    });

    let element = plot.chart.views[0].geometries[0].elements[0];
    expect(element.getModel().color).not.toBe('red');
    plot.setState('selected', (data: any) => data.stage === '简历筛选');
    element = plot.chart.views[0].geometries[0].elements[0];
    expect(element.shape.attr('fill')).toBe('red');
  });

  afterAll(() => {
    plot.destroy();
  });
});
