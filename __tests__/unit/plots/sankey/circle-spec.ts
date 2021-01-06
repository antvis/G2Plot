import { cutoffCircle } from '../../../../src/plots/sankey/circle';
import { ENERGY_RELATIONS } from '../../../data/sankey-energy';

describe('sankey ', () => {
  it('cutoffCircle', () => {
    let data = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
      { source: 'a', target: 'c' },
      { source: 'c', target: 'd' },
    ];

    // 不成环
    expect(cutoffCircle(data, 'source', 'target')).toEqual([
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
      { source: 'a', target: 'c' },
      { source: 'c', target: 'd' },
    ]);

    // 两节点环
    data = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'a' },
    ];

    expect(cutoffCircle(data, 'source', 'target')).toEqual([{ source: 'a', target: 'b' }]);

    // 三节点环
    data = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
      { source: 'c', target: 'a' },
    ];

    expect(cutoffCircle(data, 'source', 'target')).toEqual([
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
    ]);

    // 多个环
    data = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
      { source: 'c', target: 'a' },
      { source: 'a', target: 'd' },
      { source: 'd', target: 'e' },
      { source: 'e', target: 'a' },
    ];

    expect(cutoffCircle(data, 'source', 'target')).toEqual([
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
      { source: 'a', target: 'd' },
      { source: 'd', target: 'e' },
    ]);

    // 一条边产生两个环
    data = [
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
      { source: 'c', target: 'a' }, // 它带来两个环
      { source: 'a', target: 'd' },
      { source: 'd', target: 'c' },
    ];

    expect(cutoffCircle(data, 'source', 'target')).toEqual([
      { source: 'a', target: 'b' },
      { source: 'b', target: 'c' },
      { source: 'a', target: 'd' },
      { source: 'd', target: 'c' },
    ]);

    // 稍微正式一点的数据
    expect(cutoffCircle(ENERGY_RELATIONS, 'source', 'target')).toEqual(ENERGY_RELATIONS);
    expect(cutoffCircle(ENERGY_RELATIONS, 'source', 'target')).not.toBe(ENERGY_RELATIONS);

    // 空数据
    expect(cutoffCircle(null, 'source', 'target')).toEqual([]);
    expect(cutoffCircle(undefined, 'source', 'target')).toEqual([]);
  });
});
