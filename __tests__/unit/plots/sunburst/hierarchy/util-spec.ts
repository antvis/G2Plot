import { getField, getAllNodes } from '../../../../../src/plots/sunburst/hierarchy/util';

describe('hierarchy/util', () => {
  it('getField', () => {
    expect(
      getField({
        field: '',
        fields: ['b', 'c'],
      })
    ).toBe('');

    expect(
      getField({
        field: 'a',
        fields: ['b', 'c'],
      })
    ).toBe('a');

    expect(
      getField({
        field: ['a'],
        fields: ['b', 'c'],
      })
    ).toBe('a');

    expect(
      getField({
        field: [],
        fields: ['b', 'c'],
      })
    ).toBe(undefined);

    expect(
      getField({
        field: undefined,
        fields: 'b',
      })
    ).toBe('b');

    expect(
      getField({
        field: undefined,
        fields: ['b', 'c'],
      })
    ).toBe('b');

    expect(
      getField(
        {
          field: null,
          fields: [],
        },
        'c'
      )
    ).toBe('c');

    expect(() => {
      getField({
        field: null,
        fields: [],
      });
    }).toThrow();
  });

  it('getAllNodes', () => {
    expect(getAllNodes(null)).toEqual([]);

    expect(getAllNodes({ a: 1 })).toEqual([]);

    const nodes = ['a', 'b', 'c'];
    expect(
      getAllNodes({
        each: (loop) => nodes.forEach(loop),
      })
    ).toEqual(nodes);

    expect(
      getAllNodes({
        eachNode: (loop) => nodes.forEach(loop),
      })
    ).toEqual(nodes);
  });
});
