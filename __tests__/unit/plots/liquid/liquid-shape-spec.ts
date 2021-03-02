import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('liquid', () => {
  const shapes = [
    {
      name: 'diamond',
      shapePath: [['M', 300, 15], ['L', 435, 150], ['L', 300, 285], ['L', 165, 150], ['Z']],
      clipPath: [['M', 300, 16], ['L', 434, 150], ['L', 300, 284], ['L', 166, 150], ['Z']],
    },
    {
      name: 'triangle',
      shapePath: [['M', 300, 15], ['L', 435, 285], ['L', 165, 285], ['Z']],
      clipPath: [['M', 300, 16], ['L', 434, 284], ['L', 166, 284], ['Z']],
    },
    {
      name: 'pin',
      shapePath: [
        ['M', 219.50155281000758, 195],
        ['A', 108, 108, 0, 1, 1, 380.4984471899925, 195],
        ['Q', 300, 270, 300, 285],
        ['Q', 300, 270, 219.50155281000758, 195],
        ['Z'],
      ],
      clipPath: [
        ['M', 220.0978376040075, 194.66666666666666],
        ['A', 107.2, 107.2, 0, 1, 1, 379.9021623959925, 194.66666666666666],
        ['Q', 300, 268, 300, 284],
        ['Q', 300, 268, 220.0978376040075, 194.66666666666666],
        ['Z'],
      ],
    },
    {
      name: 'circle',
      shapePath: [['M', 300, 15], ['A', 135, 135, 0, 1, 0, 300, 285], ['A', 135, 135, 0, 1, 0, 300, 15], ['Z']],
      clipPath: [['M', 300, 16], ['A', 134, 134, 0, 1, 0, 300, 284], ['A', 134, 134, 0, 1, 0, 300, 16], ['Z']],
    },
  ];

  const shapeProps = {
    width: 600,
    height: 300,
    percent: 0.25,
  };

  const getShapePath = (liquid) => liquid.chart.middleGroup.getChildren()[0].getChildren()[0].attr('path');
  const getClipPath = (liquid) => liquid.chart.middleGroup.findAllByName('waves')[0].get('clipShape').attr('path');

  it('should render circle if prop shape is not defined', () => {
    const liquid = new Liquid(createDiv(), {
      ...shapeProps,
    });

    liquid.render();
    expect(getShapePath(liquid)).toEqual(shapes[3].shapePath);
    expect(getClipPath(liquid)).toEqual(shapes[3].clipPath);

    liquid.destroy();
  });

  it('should render circle if prop shape is string but not built-in shapes', () => {
    const liquid = new Liquid(createDiv(), {
      ...shapeProps,
      shape: 'foo',
    });

    liquid.render();
    expect(getShapePath(liquid)).toEqual(shapes[3].shapePath);
    expect(getClipPath(liquid)).toEqual(shapes[3].clipPath);

    liquid.destroy();
  });

  // builtIn shapes
  for (const { name, shapePath, clipPath } of shapes) {
    it(`should render built-in shapes(${name}) if prop shape is a string`, () => {
      const liquid = new Liquid(createDiv(), {
        ...shapeProps,
        shape: name,
      });

      liquid.render();
      expect(getShapePath(liquid)).toEqual(shapePath);
      expect(getClipPath(liquid)).toEqual(clipPath);

      liquid.destroy();
    });
  }

  // custom shapes
  it('should render custom shape if prop shape is a valid function with a string return', () => {
    const liquid = new Liquid(createDiv(), {
      ...shapeProps,
      shape: (x: number, y: number, width: number, height: number) => {
        const h = height / 2;
        const w = width / 2;
        return `
          M ${x - x / 3} ${y - h}
          L ${x + w} ${y - y / 3}
          L ${x + x / 3} ${y + h}
          L ${x - w} ${y + y / 3}
          Z
        `;
      },
    });
    liquid.render();
    const shapePath = [['M', 200, 15], ['L', 435, 100], ['L', 400, 285], ['L', 165, 200], ['Z']];
    const clipPath = [['M', 200, 16], ['L', 434, 100], ['L', 400, 284], ['L', 166, 200], ['Z']];

    expect(getShapePath(liquid)).toEqual(shapePath);
    expect(getClipPath(liquid)).toEqual(clipPath);

    liquid.destroy();
  });

  it('should render custom shape if prop shape is a valid function with a array return', () => {
    const liquid = new Liquid(createDiv(), {
      ...shapeProps,
      shape: (x: number, y: number, width: number, height: number) => {
        const h = height / 2;
        const w = width / 2;
        return [
          ['M', x - x / 3, y - h],
          ['L', x + w, y - y / 3],
          ['L', x + x / 3, y + h],
          ['L', x - w, y + y / 3],
          ['Z'],
        ];
      },
    });
    liquid.render();

    const shapePath = [['M', 200, 15], ['L', 435, 100], ['L', 400, 285], ['L', 165, 200], ['Z']];
    const clipPath = [['M', 200, 16], ['L', 434, 100], ['L', 400, 284], ['L', 166, 200], ['Z']];
    expect(getShapePath(liquid)).toEqual(shapePath);
    expect(getClipPath(liquid)).toEqual(clipPath);

    liquid.destroy();
  });
});
