import { Venn } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('venn 异常分支处理', () => {
  const plot = new Venn(createDiv(), {
    width: 400,
    height: 500,
    data: [],
  });

  it('并集中，出现不存在的集合', () => {
    function render() {
      plot.changeData([
        { sets: ['A'], size: 12, label: 'A' },
        { sets: ['B'], size: 12, label: 'B' },
        { sets: ['C'], size: 12, label: 'C' },
        { sets: ['A', 'B'], size: 2, label: 'A&B' },
        { sets: ['A', 'C'], size: 2, label: 'A&C' },
        { sets: ['B', 'D'], size: 2, label: 'B&C' },
        { sets: ['A', 'B', 'C'], size: 300 },
      ]);
    }
    // 下个 pr 再处理
    expect(render).toThrowError();
  });

  afterAll(() => {
    plot.destroy();
  });
});
