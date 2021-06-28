import { getMeta } from '../../../src/plots/scatter/util';

describe('getMeta', () => {
  it('adjustMeta & data.length === 1', () => {
    // default
    expect(
      getMeta({
        data: [{ gender: 'female', weight: 50, height: 160 }],
        xField: 'weight',
        yField: 'height',
      })
    ).toEqual({
      weight: {
        min: 0,
        max: 100,
      },
      height: {
        min: 0,
        max: 320,
      },
    });

    // isPositiveNumber: false
    expect(
      getMeta({
        data: [{ gender: 'female', weight: -50, height: -160 }],
        xField: 'weight',
        yField: 'height',
      })
    ).toEqual({
      weight: {
        max: 0,
        min: -100,
      },
      height: {
        max: 0,
        min: -320,
      },
    });
    // meta 0
    expect(
      getMeta({
        data: [{ gender: 'female', weight: 50, height: 160 }],
        xField: 'weight',
        yField: 'height',
        meta: {
          weight: {
            min: 0,
            max: 10,
          },
          height: {
            min: 0,
            max: 20,
          },
        },
      })
    ).toEqual({
      weight: {
        min: 0,
        max: 10,
      },
      height: {
        min: 0,
        max: 20,
      },
    });
    // meta undefined or null
    expect(
      getMeta({
        data: [{ gender: 'female', weight: 50, height: 160 }],
        xField: 'weight',
        yField: 'height',
        meta: {
          weight: {
            min: undefined,
            max: null,
          },
          height: {
            min: null,
            max: undefined,
          },
        },
      })
    ).toEqual({
      weight: {
        min: 0,
        max: 100,
      },
      height: {
        min: 0,
        max: 320,
      },
    });

    // other config
    expect(
      getMeta({
        data: [{ gender: 'female', weight: 50, height: 160 }],
        xField: 'weight',
        yField: 'height',
        meta: {
          gender: {
            max: 100,
          },
          weight: {
            range: [0, 1],
          },
          height: {
            values: [1.2, 24],
          },
        },
      })
    ).toEqual({
      gender: {
        max: 100,
      },
      weight: {
        min: 0,
        max: 100,
        range: [0, 1],
      },
      height: {
        min: 0,
        max: 320,
        values: [1.2, 24],
      },
    });

    // 边沿值
    expect(
      getMeta({
        data: [{ gender: 'female', weight: 0, height: 0 }],
        xField: 'weight',
        yField: 'height',
      })
    ).toEqual({
      weight: {
        min: 0,
        max: 0,
      },
      height: {
        min: 0,
        max: 0,
      },
    });

    // x 分类
    expect(
      getMeta({
        data: [{ gender: 'female', weight: 'a', height: 160 }],
        xField: 'weight',
        yField: 'height',
      })
    ).toEqual({
      weight: {},
      height: {
        min: 0,
        max: 320,
      },
    });
  });
});
