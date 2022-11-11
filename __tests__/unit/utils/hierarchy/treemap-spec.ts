import * as d3Hierarchy from 'd3-hierarchy';
import { getTileMethod, treemap } from '../../../../src/utils/hierarchy/treemap';

const data = {
  children: [
    {
      value: 20,
      children: [
        {
          value: 10,
        },
        {
          value: 10,
        },
      ],
    },
  ],
};

describe('hierarchy/treemap', () => {
  it('treemap', () => {
    expect(() => {
      // @ts-ignore
      treemap([], {
        as: null,
      });
    }).toThrow(`Invalid as: it must be an array with 2 strings (e.g. [ "x", "y" ])!`);

    expect(() => {
      treemap([], {
        // @ts-ignore
        as: ['x', 'y', 'z'],
      });
    }).toThrow(`Invalid as: it must be an array with 2 strings (e.g. [ "x", "y" ])!`);
  });

  it('treemap: ignore parent value', () => {
    const res = treemap(data, { as: ['x', 'y'], field: 'value' });
    const leaves = res[0].leaves();
    leaves.forEach((leaf) => {
      const width = Math.abs(leaf.x[1] - leaf.x[0]);
      const height = Math.abs(leaf.y[2] - leaf.y[1]);
      expect(width * height).toEqual(0.5);
    });
  });

  it('treemap, dont ignore parent value', () => {
    const res = treemap(data, { as: ['x', 'y'], field: 'value', ignoreParentValue: false });

    const leaves = res[0].leaves();

    leaves.forEach((leaf) => {
      const width = Math.abs(leaf.x[1] - leaf.x[0]);
      const height = Math.abs(leaf.y[2] - leaf.y[1]);
      expect(width * height).toEqual(0.25);
    });
  });

  it('getTileMethod', () => {
    // @ts-ignore
    const spy = jest.spyOn(d3Hierarchy.treemapSquarify, 'ratio').mockImplementation((ratio) => {
      return `treemapSquarify_${ratio}`;
    });

    const diceMethod = getTileMethod('treemapDice', 1);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(diceMethod.name).toBe('treemapDice');

    const squarifyMethod = getTileMethod('treemapSquarify', 2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(squarifyMethod).toBe('treemapSquarify_2');
    spy.mockRestore();
  });
});
