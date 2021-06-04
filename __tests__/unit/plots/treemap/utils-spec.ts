import {
  transformData,
  findInteraction,
  enableInteraction,
  getFommatInteractions,
  getAdjustAppendPadding,
  resetDrillDown,
} from '../../../../src/plots/treemap/utils';

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

// 叶节点有分类，父节点有分类
// 叶节点没有，父节点有
// 叶节点有，父节点没有
// 叶节点没有，父节点没有

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
  it('findInteraction', () => {
    expect(findInteraction(undefined, undefined)).toBeFalsy();
    expect(findInteraction([], undefined)).toBeFalsy();
    expect(
      findInteraction(
        [
          {
            type: 'asas',
          },
        ],
        'test'
      )
    ).toBeUndefined();
    expect(
      findInteraction(
        [
          {
            type: 'treemap-drill-down',
          },
        ],
        'treemap-drill-down'
      )
    ).toBeTruthy();
  });

  it('enableInteraction', () => {
    expect(enableInteraction(undefined, undefined)).toBeFalsy();
    expect(enableInteraction([], undefined)).toBeFalsy();
    expect(
      enableInteraction(
        [
          {
            type: 'asas',
          },
        ],
        'test'
      )
    ).toBeFalsy();
    expect(
      enableInteraction(
        [
          {
            type: 'treemap-drill-down',
          },
        ],
        'treemap-drill-down'
      )
    ).toBeTruthy();
    expect(
      enableInteraction(
        [
          {
            type: 'treemap-drill-down',
            enable: false,
          },
        ],
        'treemap-drill-down'
      )
    ).toBeFalsy();
  });

  it('transformData, basic treemap', () => {
    const data = transformData({
      data: data1,
      colorField: 'name',
      enableDrillDown: false,
      hierarchyConfig: {},
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

    const root = data1.children.reduce((sum, i) => sum + i.value, 0);

    expect(data[0].path.length).toBe(2);
    expect(data[0].path[0].value).toBe(data1.children[0].value);
    expect(data[0].path[1].value).toBe(root);
  });

  it('transformData, nest treemap', () => {
    const data = transformData({
      data: data2,
      colorField: 'name',
      enableDrillDown: false,
      hierarchyConfig: {
        sort: () => 1,
      },
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
    expect(data[0].path.length).toBe(3);
    expect(data[0].path[1].data.children.length).toBe(2);
    expect(data[0].path[1].value).toBe(150);
  });

  it('transformData, nest treemap, colorField', () => {
    const data = transformData({
      data: data3,
      colorField: 'category',
      enableDrillDown: false,
      hierarchyConfig: {},
    });
    data.forEach((d) => {
      expect(d.category).toEqual(d.expectCategory);
    });
  });

  it('transformData, hierarchyConfig', () => {
    const data = transformData({
      data: data1,
      colorField: 'name',
      enableDrillDown: false,
      hierarchyConfig: {
        tile: 'treemapDice',
      },
    });

    const lineArr = data.map((dt) => {
      const w = dt.x[1] - dt.x[0];
      return Number(w.toFixed(3));
    });

    expect(data.length).toBe(3);
    expect(lineArr[1] / lineArr[0]).toEqual(data1.children[1].value / data1.children[0].value);
    expect(lineArr[2] / lineArr[1]).toEqual(data1.children[2].value / data1.children[1].value);
  });

  it('transformData, nest treemap, enableDrillDown', () => {
    const config = {
      colorField: 'category',
      enableDrillDown: true,
      hierarchyConfig: {},
    };

    const data = transformData({
      data: data3,
      ...config,
    });

    expect(data.length).toEqual(2);

    const childData = transformData({
      data: data[0],
      ...config,
    });

    expect(childData[0].path.length).toBe(3);
  });

  it('getFommatInteractions', () => {
    expect(getFommatInteractions({ interactions: undefined })).toEqual(undefined);
    expect(
      getFommatInteractions({
        interactions: undefined,
        hierarchyConfig: {
          tile: 'treemapSlice',
        },
      })
    ).toEqual(undefined);
    expect(
      getFommatInteractions({
        interactions: [],
        hierarchyConfig: {
          tile: 'treemapSlice',
        },
      })
    ).toEqual([]);
    expect(
      getFommatInteractions({
        interactions: [
          {
            type: 'treemap',
          },
        ],
        hierarchyConfig: {
          tile: 'treemapSlice',
        },
      })
    ).toEqual([
      {
        type: 'treemap',
      },
    ]);
    expect(
      getFommatInteractions({
        interactions: [
          {
            type: 'treemap',
          },
          {
            type: 'treemap-drill-down',
          },
        ],
        hierarchyConfig: {
          tile: 'treemapSlice',
        },
      })
    ).toEqual([
      {
        type: 'treemap',
      },
      {
        type: 'treemap-drill-down',
        cfg: {
          hierarchyConfig: {
            tile: 'treemapSlice',
          },
        },
      },
    ]);

    expect(
      getFommatInteractions({
        interactions: [
          {
            type: 'treemap',
          },
          {
            type: 'treemap-drill-down',
          },
        ],
      })
    ).toEqual([
      {
        type: 'treemap',
      },
      {
        type: 'treemap-drill-down',
        cfg: {
          hierarchyConfig: undefined,
        },
      },
    ]);
  });

  it('getAdjustAppendPadding', () => {
    expect(getAdjustAppendPadding(undefined)).toStrictEqual([0, 0, 25, 0]);
    expect(getAdjustAppendPadding(10)).toStrictEqual([10, 10, 35, 10]);
    expect(getAdjustAppendPadding([10])).toStrictEqual([10, 10, 35, 10]);
    expect(getAdjustAppendPadding([10, 20])).toStrictEqual([10, 20, 35, 20]);
    expect(getAdjustAppendPadding([10, 20, 30])).toStrictEqual([10, 20, 55, 20]);
    expect(getAdjustAppendPadding([10, 20, 30, 40])).toStrictEqual([10, 20, 55, 40]);
  });

  it('resetDrillDown', () => {
    expect(() => {
      // @ts-ignore
      resetDrillDown({
        // @ts-ignore
        interactions: {},
      });
    }).not.toThrowError();
  });
});
