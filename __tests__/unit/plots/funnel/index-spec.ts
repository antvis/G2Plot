import { Funnel, FUNNEL_CONVERSATION_FIELD } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/funnel/constant';
import { createDiv } from '../../../utils/dom';

describe('funnel', () => {
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
  });

  plot.render();

  it('defaultOptions', () => {
    expect(plot.type).toBe('funnel');

    expect(Funnel.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
    // @ts-ignore
    expect(plot.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });

  it('static properties', () => {
    expect(Funnel.CONVERSATION_FIELD).toBeDefined();
    // 兼容旧的
    expect(Funnel.CONVERSATION_FIELD).toBe(FUNNEL_CONVERSATION_FIELD);
    expect(Funnel.PERCENT_FIELD).toBeDefined();
    expect(Funnel.TOTAL_PERCENT_FIELD).toBeDefined();
  });
});
