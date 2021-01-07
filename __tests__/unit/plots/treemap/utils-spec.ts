import { transformData } from '../../../../src/plots/treemap/utils';

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
});
