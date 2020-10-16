import DataSet from '@antv/data-set';
import { DataItem, wordCloud } from '../../../../src/utils/transform/word-cloud';

const { View } = DataSet;
const options = {
  type: 'tag-cloud',
  fields: ['text', 'value'],
  fontSize: 10,
  fontWeight: 'bold',
  size: [800, 800],
  padding: 0,
  timeInterval: 5000,
  rotate: 90,
};
const data = ['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this'].map((d) => {
  return {
    text: d,
    value: 5 + Math.random() * 10,
    test: 'haha',
  };
});

describe('word-cloud', () => {
  it('with data-set', () => {
    const dv = new View();
    dv.source(data).transform(options as any);
    // 由于生成的每个单词的 x，y 坐标是比较随机的，每次都不一样，
    // 所以为了测试通过，把 x，y 属性删除。
    function removeXY(v) {
      delete v.x;
      delete v.y;
    }
    const result1 = wordCloud(data, options as any);
    const result2 = dv.rows;

    result1.forEach(removeXY);
    result2.forEach(removeXY);

    expect(result1).toEqual(result2);
  });

  it('default', () => {
    const result = wordCloud(data);
    const firstRow = result[0];

    expect(firstRow.hasText).toBe(true);
    expect(typeof firstRow.x).toBe('number');
    expect(typeof firstRow.y).toBe('number');
    expect(typeof firstRow.text).toBe('string');
    expect(typeof firstRow.size).toBe('number');
    expect(typeof firstRow.font).toBe('string');
  });

  it('callback', () => {
    const common = (row: DataItem) => {
      expect(typeof row.text).toBe('string');
      expect(typeof row.value).toBe('number');
    };
    const font = (row: DataItem) => {
      common(row);
      return 'font-test';
    };
    const fontWeight = (row: DataItem): any => {
      common(row);
      return 'fontWeight-test';
    };
    const fontSize = (row: DataItem) => {
      common(row);
      return 11;
    };
    const rotate = (row: DataItem) => {
      common(row);
      return 22;
    };
    const padding = (row: DataItem) => {
      common(row);
      return 33;
    };
    const spiral = (size: [number, number]) => {
      expect(size.length).toBe(2);
      const e = size[0] / size[1];
      return (t: number) => {
        expect(typeof t).toBe('number');
        return [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
      };
    };

    const result = wordCloud(data, {
      font,
      fontWeight,
      fontSize,
      rotate,
      padding,
      spiral,
    });
    const firstRow = result[0];
    expect(firstRow.hasText).toBe(true);
    expect(typeof firstRow.x).toBe('number');
    expect(typeof firstRow.y).toBe('number');
    expect(typeof firstRow.text).toBe('string');
    expect(firstRow.font).toBe('font-test');
    expect(firstRow.weight).toBe('fontWeight-test');
    expect(firstRow.size).toBe(11);
    expect(firstRow.rotate).toBe(22);
    expect(firstRow.padding).toBe(33);
  });
});
