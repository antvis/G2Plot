import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { getClipPath } from './index-spec';

describe('liquid', () => {
  const shapes = [
    {
      name: 'diamond',
      clipPath: [['M', 300, 16], ['L', 434, 150], ['L', 300, 284], ['L', 166, 150], ['Z']],
    },
    {
      name: 'triangle',
      clipPath: [['M', 300, 16], ['L', 434, 284], ['L', 166, 284], ['Z']],
    },
    {
      name: 'pin',
      clipPath: [
        ['M', 227.75704198540205, 157.88235294117644],
        ['A', 89.33333333333333, 89.33333333333333, 0, 1, 1, 372.24295801459795, 157.88235294117644],
        ['Q', 300, 257.2, 300, 284],
        ['Q', 300, 257.2, 227.75704198540205, 157.88235294117644],
        ['Z'],
      ],
    },
    {
      name: 'circle',
      clipPath: [['M', 300, 16], ['A', 134, 134, 0, 1, 0, 300, 284], ['A', 134, 134, 0, 1, 0, 300, 16], ['Z']],
    },
  ];

  const shapeProps = {
    width: 600,
    height: 300,
    percent: 0.25,
  };

  it('should render circle if prop shape is not defined', () => {
    const liquid = new Liquid(createDiv(), {
      ...shapeProps,
    });

    liquid.render();
    expect(getClipPath(liquid)).toEqual(shapes[3].clipPath);

    liquid.destroy();
  });

  it('should render circle if prop shape is string but not built-in shapes', () => {
    const liquid = new Liquid(createDiv(), {
      ...shapeProps,
      shape: 'foo',
    });

    liquid.render();
    expect(getClipPath(liquid)).toEqual(shapes[3].clipPath);

    liquid.destroy();
  });

  // builtIn shapes
  for (const { name, clipPath } of shapes) {
    it(`should render built-in shapes(${name}) if prop shape is a string`, () => {
      const liquid = new Liquid(createDiv(), {
        ...shapeProps,
        shape: name,
      });

      liquid.render();
      expect(getClipPath(liquid)).toEqual(clipPath);

      liquid.destroy();
    });
  }

  // custom shapes
  it('should render custom shape if prop shape is a valid function with a array return', () => {
    const liquid = new Liquid(createDiv(), {
      ...shapeProps,
      shape: (x: number, y: number, width: number, height: number) => {
        const r = width / 4;
        const dx = x - width / 2;
        const dy = y - height / 2;
        return [
          ['M', dx, dy + r * 2],
          ['A', r, r, 0, 0, 1, x, dy + r],
          ['A', r, r, 0, 0, 1, dx + width, dy + r * 2],
          ['L', x, dy + height],
          ['L', dx, dy + r * 2],
          ['Z'],
        ];
      },
    });
    liquid.render();
    const clipPath = [
      ['M', 166, 150],
      ['A', 67, 67, 0, 0, 1, 300, 83],
      ['A', 67, 67, 0, 0, 1, 434, 150],
      ['L', 300, 284],
      ['L', 166, 150],
      ['Z'],
    ];
    expect(getClipPath(liquid)).toEqual(clipPath);

    liquid.destroy();
  });
});
