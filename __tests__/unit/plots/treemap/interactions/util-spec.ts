import { isTopParentNode } from '../../../../../src/plots/treemap/interactions/util';

describe('treemap interactions utl', () => {
  it('isTopParentNode', () => {
    expect(isTopParentNode(undefined)).toBeFalsy();
    expect(
      isTopParentNode({
        event: undefined,
      })
    ).toBeFalsy();
    expect(
      isTopParentNode({
        event: {
          data: {
            data: {
              name: 'xxx',
            },
          },
        },
      })
    ).toBeFalsy();
    expect(
      isTopParentNode({
        event: {
          data: {
            data: {
              name: 'xxx',
              children: [
                {
                  name: '123',
                },
              ],
            },
          },
        },
      })
    ).toBeFalsy();
    expect(
      isTopParentNode({
        event: {
          data: {
            data: {
              name: 'xxx',
              depth: 1,
              children: [
                {
                  name: '123',
                },
              ],
            },
          },
        },
      })
    ).toBeTruthy();
  });
});
