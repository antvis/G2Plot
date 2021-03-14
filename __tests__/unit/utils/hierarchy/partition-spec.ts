import { partition } from '../../../../src/utils/hierarchy/partition';

describe('hierarchy/partition', () => {
  it('partition', () => {
    expect(() => {
      // @ts-ignore
      partition([], {
        as: null,
      });
    }).toThrow(`Invalid as: it must be an array with 2 strings (e.g. [ "x", "y" ])!`);

    expect(() => {
      partition([], {
        // @ts-ignore
        as: ['x', 'y', 'z'],
      });
    }).toThrow(`Invalid as: it must be an array with 2 strings (e.g. [ "x", "y" ])!`);
  });
});
