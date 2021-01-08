import { transformData } from '../../../../src/plots/treemap/utils';
import { Treemap } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { treemap } from '../../../../src/utils/hierarchy/treemap';

const data1 = {
  name: 'root',
  children: [
    {
      name: '分类 1',
      value: 100,
      ext: '自定义数据',
    },
    {
      name: '分类 2',
      value: 50,
    },
    {
      name: '分类 3',
      value: 50,
    },
  ],
};

const data2 = {
  name: 'root',
  children: [
    {
      name: '三星',
      children: [
        {
          name: '三星1',
          value: 100,
        },
        {
          name: '三星2',
          value: 50,
        },
      ],
    },
    {
      name: '小米',
      children: [
        {
          name: '小米1',
          value: 10,
          ext: '自定义数据',
        },
        {
          name: '小米2',
          value: 20,
        },
      ],
    },
  ],
};

// 自己有分类，父类有分类
// 没有，父类有
// 自己有，父类没有，
// 自己没有，父类没有

const data3 = {
  name: 'root',
  children: [
    {
      name: '分类1',
      category: 'A',
      children: [
        {
          name: '分类1.1',
          children: [
            {
              name: '分类1.1.1',
              children: [
                {
                  name: '分类1.1.1.1',
                  category: 'A.A',
                  expectCategory: 'A.A',
                  value: 50,
                },
                {
                  name: '分类1.1.1.2',
                  expectCategory: 'A',
                  value: 50,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: '分类2',
      children: [
        {
          name: '分类2.1',
          value: 10,
          category: 'B.B',
          expectCategory: 'B.B',
        },
        {
          name: '分类2.1',
          value: 10,
          expectCategory: undefined,
        },
      ],
    },
  ],
};

describe('treemap transformData', () => {
  it('transformData, basic treemap', () => {
    const data = transformData({
      data: data1,
      colorField: 'name',
    });

    const areaArr = data.map((dt) => {
      const w = dt.x[1] - dt.x[0];
      const h = dt.y[1] - dt.y[2];
      return Number((w * h).toFixed(3));
    });

    expect(data.length).toBe(3);
    expect(areaArr[1] / areaArr[0]).toEqual(data1.children[1].value / data1.children[0].value);
    expect(areaArr[2] / areaArr[1]).toEqual(data1.children[2].value / data1.children[1].value);

    expect(data[0].ext).toBe('自定义数据');
  });

  it('transformData, nest treemap', () => {
    const data = transformData({
      data: data2,
      colorField: 'name',
    });

    const areaArr = data.map((dt) => {
      const w = dt.x[1] - dt.x[0];
      const h = dt.y[1] - dt.y[2];
      return Number((w * h).toFixed(3));
    });

    expect(data.length).toBe(4);
    expect((areaArr[1] / areaArr[0]).toFixed(1)).toEqual(
      (data2.children[0].children[1].value / data2.children[0].children[0].value).toFixed(1)
    );
    expect((areaArr[3] / areaArr[2]).toFixed(1)).toEqual(
      (data2.children[1].children[1].value / data2.children[1].children[0].value).toFixed(1)
    );
    expect((areaArr[3] / areaArr[1]).toFixed(1)).toEqual(
      (data2.children[1].children[1].value / data2.children[0].children[1].value).toFixed(1)
    );

    expect(data[2].ext).toBe('自定义数据');
  });

  it('transformData, nest treemap, colorField', () => {
    const data = transformData({
      data: data3,
      colorField: 'category',
    });
    data.forEach((d) => {
      expect(d.category).toEqual(d.expectCategory);
    });
  });
});
