import { Funnel } from '../../src';
import { createDiv } from '../utils/dom';

const DATA1 = [
  { stage: '简历筛选', number: 253 },
  { stage: '初试人数', number: 151 },
  { stage: '复试人数', number: 0 },
  { stage: '录取人数', number: 87 },
  { stage: '入职人数', number: null },
  { stage: '离职人数', number: 10 },
  { stage: '回流人数' },
];

const DATA2 = [
  { stage: '简历筛选', number: 253, company: 'A公司' },
  { stage: '初试人数', number: 151, company: 'A公司' },
  { stage: '复试人数', number: 0, company: 'A公司' },
  { stage: '录取人数', number: 87, company: 'A公司' },
  { stage: '入职人数', number: null, company: 'A公司' },
  { stage: '离职人数', number: 10, company: 'A公司' },
  { stage: '回流人数', company: 'A公司' },
  { stage: '简历筛选', number: 303, company: 'B公司' },
  { stage: '初试人数', number: 0, company: 'B公司' },
  { stage: '复试人数', number: 153, company: 'B公司' },
  { stage: '录取人数', number: 117, company: 'B公司' },
  { stage: '入职人数', number: 79, company: 'B公司' },
  { stage: '离职人数', number: 15, company: 'B公司' },
  { stage: '回流人数', company: 'B公司' },
];

describe('#2124', () => {
  it('Funnel 数据为 null, 0, undefined 不能报错', async () => {
    const plot = new Funnel(createDiv(), {
      data: DATA1,
      xField: 'stage',
      yField: 'number',
      legend: false,
      minSize: 0.1,
    });

    plot.render();

    expect(
      plot.chart
        .getController('annotation')
        .getComponents()
        .map((co) => co.component.cfg.text.content)
    ).toEqual(['转化率: 59.68%', '转化率: 0.00%', '转化率: ∞', '转化率: -', '转化率: -', '转化率: -']);

    plot.destroy();
  });

  it('对称漏斗图', () => {
    const plot = new Funnel(createDiv(), {
      data: DATA2,
      xField: 'stage',
      yField: 'number',
      compareField: 'company',
      meta: {
        stage: {
          alias: '行为',
        },
        pv: {
          alias: '人数',
          formatter: (v) => `${v}次`,
        },
      },
      tooltip: {
        fields: ['stage', 'number', 'company'],
        formatter: (v) => ({
          name: `${v.company}的${v.stage}`,
          value: v.number,
        }),
      },
      legend: false,
    });

    plot.render();

    expect(
      plot.chart.views[0]
        .getController('annotation')
        .getComponents()
        .filter((co) => co.component.cfg.type === 'line')
        .map((co) => co.component.cfg.text.content)
    ).toEqual(['转化率: 59.68%', '转化率: 0.00%', '转化率: ∞', '转化率: -', '转化率: -', '转化率: -']);

    expect(
      plot.chart.views[1]
        .getController('annotation')
        .getComponents()
        .filter((co) => co.component.cfg.type === 'line')
        .map((co) => co.component.cfg.text.content)
    ).toEqual(['转化率: 0.00%', '转化率: ∞', '转化率: 76.47%', '转化率: 67.52%', '转化率: 18.99%', '转化率: -']);

    plot.destroy();
  });

  it('动态高度漏斗图', async () => {
    const plot = new Funnel(createDiv(), {
      data: DATA1,
      xField: 'stage',
      yField: 'number',
      dynamicHeight: true,
      legend: false,
      minSize: 0.1,
    });

    plot.render();

    expect(
      plot.chart
        .getController('annotation')
        .getComponents()
        .map((co) => co.component.cfg.text.content)
    ).toEqual(['转化率: 59.68%', '转化率: 0.00%', '转化率: ∞', '转化率: -', '转化率: -', '转化率: -']);

    plot.destroy();
  });
});
