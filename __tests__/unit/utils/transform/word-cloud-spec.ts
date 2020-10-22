import DataSet from '@antv/data-set';
import { Tag, Word } from '../../../../src/plots/word-cloud/types';
import { processImageMask } from '../../../../src/plots/word-cloud/utils';
import { wordCloud, transform } from '../../../../src/utils/transform/word-cloud';

const { View } = DataSet;
const options = {
  type: 'tag-cloud',
  fields: ['text', 'value'],
  font: 'Impact',
  fontSize: 10,
  fontWeight: 'bold',
  rotate: 90,
  padding: 2,
  size: [800, 800],
  spiral: 'archimedean',
  timeInterval: 5000,
};
const data = ['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this'].map((d) => {
  return {
    text: d,
    value: 5 + Math.random() * 10,
  };
});

function basicCommon(v: Tag) {
  expect(v.hasText).toBe(true);
  expect(typeof v.text).toBe('string');
  expect(typeof v.value).toBe('number');
  expect(typeof v.font).toBe('string');
  expect(typeof v.style).toBe('string');
  expect(typeof v.weight === 'number' || typeof v.weight === 'string').toBe(true);
  expect(typeof v.rotate).toBe('number');
  expect(typeof v.size).toBe('number');
  expect(typeof v.padding).toBe('number');
  expect(typeof v.width).toBe('number');
  expect(typeof v.height).toBe('number');
  expect(typeof v.x).toBe('number');
  expect(typeof v.y).toBe('number');
}

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
    const result1 = wordCloud(data as Word[], options as any);
    const result2 = dv.rows;

    result1.forEach(removeXY);
    result2.forEach(removeXY);

    expect(result1).toEqual(result2);
  });

  it('default', () => {
    const result = wordCloud(data as Word[]);
    basicCommon(result[0]);
  });

  it('callback', () => {
    const common = (row: Word) => {
      expect(typeof row.text).toBe('string');
      expect(typeof row.value).toBe('number');
    };
    const font = (row: Word) => {
      common(row);
      return 'font-test';
    };
    const fontWeight = (row: Word): any => {
      common(row);
      return 'fontWeight-test';
    };
    const fontSize = (row: Word) => {
      common(row);
      return 11;
    };
    const rotate = (row: Word) => {
      common(row);
      return 22;
    };
    const padding = (row: Word) => {
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

    const result = wordCloud(data as Word[], {
      font,
      fontWeight,
      fontSize,
      rotate,
      padding,
      spiral,
    });
    const firstRow = result[0];
    basicCommon(firstRow);
    expect(firstRow.font).toBe('font-test');
    expect(firstRow.weight).toBe('fontWeight-test');
    expect(firstRow.size).toBe(11);
    expect(firstRow.rotate).toBe(22);
    expect(firstRow.padding).toBe(33);
  });

  it('data is empty', () => {
    const result = wordCloud([]);
    expect(result.length).toBe(2);
  });

  it('image mask', async () => {
    const base64 =
      'data:image/png;base64,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';

    const img = await processImageMask(base64);
    const result = wordCloud(data as Word[], { imageMask: img });
    basicCommon(result[0]);
  });

  it('spiral is rectangular', () => {
    const result = wordCloud(data as Word[], { spiral: 'rectangular' });
    basicCommon(result[0]);
  });
});

describe('transform', () => {
  it('default', () => {
    const result = transform(data as Word[], {
      size: [800, 800],
    });
    basicCommon(result[0]);
  });

  it('image mask with size is 0', async () => {
    const base64 =
      'data:image/png;base64,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';

    const img = await processImageMask(base64);
    const result = transform(data as Word[], {
      size: [0, 0],
      imageMask: img,
    });

    // 画布大小为 0 时，返回的数组应为空数组，但该实现中，
    // 最终会往返回的数组中 push 进两个元素，所以最终长度为 2。
    expect(result.length).toBe(2);
  });

  it('timeInterval is 0', () => {
    const result = transform(data as Word[], {
      size: [800, 800],
      timeInterval: 0,
    });

    // 时间间隔为 0 ，也就是说不给程序运行的时间，
    // 所以最终返回的是空数据，只包含两个占位符数据。
    expect(result.length).toBe(2);
  });

  it('padding is 0', () => {
    const result = transform(data as Word[], {
      size: [800, 800],
      padding: 0,
    });
    basicCommon(result[0]);
  });

  it('rotate is 0', () => {
    const result = transform(data as Word[], {
      size: [800, 800],
      rotate: 0,
    });
    basicCommon(result[0]);
  });
});
