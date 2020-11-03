import { points2Path, smoothBezier, catmullRom2bezier, getSplinePath } from '../../../src/utils/path';

describe('path', () => {
  it('points2Path', () => {
    expect(points2Path([], false)).toEqual([]);
    expect(points2Path([{ x: 100, y: 100 }], false)).toEqual([['M', 100, 100]]);
    expect(points2Path([{ x: 100, y: 100 }], true)).toEqual([['M', 100, 100], ['Z']]);
  });

  it('smoothBezier', () => {
    expect(
      smoothBezier(
        [
          [0, 0],
          [0.1, 0.1],
        ],
        0.4,
        true,
        [
          [0.04, 0.04],
          [0.1, 0.1],
        ]
      )
    ).toEqual([
      [0, 0],
      [0.1, 0.1],
      [0.1, 0.1],
      [0, 0],
    ]);
    expect(
      smoothBezier(
        [
          [0, 0],
          [0.1, 0.1],
        ],
        0.4,
        false,
        [
          [0.04, 0.04],
          [0.1, 0.1],
        ]
      )
    ).toEqual([
      [0, 0],
      [0.1, 0.1],
    ]);
    expect(
      smoothBezier(
        [
          [0, 0],
          [0.1, 0.1],
        ],
        0.4,
        false,
        undefined
      )
    ).toEqual([
      [0, 0],
      [0.1, 0.1],
    ]);
    expect(
      smoothBezier(
        [
          [0, 0],
          [0.1, 0.1],
        ],
        0.4,
        true,
        undefined
      )
    ).toEqual([
      [0, 0],
      [0.1, 0.1],
      [0.1, 0.1],
      [0, 0],
    ]);

    expect(
      smoothBezier(
        [
          [0, 0],
          [0.1, 0.1],
          [0, 0],
        ],
        1,
        false,
        undefined
      )
    ).toEqual([
      [0, 0],
      [0.1, 0.1],
      [0.1, 0.1],
      [0, 0],
    ]);
  });

  it('catmullRom2bezier', () => {
    expect(
      catmullRom2bezier([0, 0, 0.1, 0.1], true, [
        [0.04, 0.04],
        [0.1, 0.1],
      ])
    ).toEqual([
      ['C', 0, 0, 0.1, 0.1, 0.1, 0.1],
      ['C', 0.1, 0.1, 0, 0, 0, 0],
    ]);
    expect(
      catmullRom2bezier([0, 0, 0.1, 0.1], false, [
        [0.04, 0.04],
        [0.1, 0.1],
      ])
    ).toEqual([['C', 0, 0, 0.1, 0.1, 0.1, 0.1]]);

    expect(catmullRom2bezier([0, 0, 0.1, 0.1], true, undefined)).toEqual([
      ['C', 0, 0, 0.1, 0.1, 0.1, 0.1],
      ['C', 0.1, 0.1, 0, 0, 0, 0],
    ]);
    expect(catmullRom2bezier([0, 0, 0.1, 0.1], false, undefined)).toEqual([['C', 0, 0, 0.1, 0.1, 0.1, 0.1]]);
  });

  it('getSplinePath same points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.1 },
      { x: 0.1, y: 0.1 },
      { x: 0.2, y: 0.2 },
    ];
    const path = getSplinePath(points);
    expect(path).toEqual([
      ['M', 0, 0],
      ['C', 0, 0, 0.06, 0.06, 0.1, 0.1],
      ['C', 0.14, 0.14, 0.2, 0.2, 0.2, 0.2],
    ]);
  });

  it('getSplinePath(), two points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.1 },
    ];
    const path = getSplinePath(points);
    expect(path).toEqual([
      ['M', 0, 0],
      ['L', 0.1, 0.1],
    ]);
  });

  it('getSplinePath(), two points isInCircle', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.1 },
    ];
    const path = getSplinePath(points, true);
    expect(path).toEqual([['M', 0, 0], ['L', 0.1, 0.1], ['Z']]);
  });

  it('getSplinePath(), more than two points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.5 },
      { x: 0.2, y: 0.1 },
    ];
    const path = getSplinePath(points);
    expect(path.length).toBe(3);
  });

  it('getSplinePath(), more than two points isInCircle', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.1 },
      { x: 0.1, y: 0.3 },
    ];
    const path = getSplinePath(points, true);
    expect(path.length).toBe(4);
  });
});
