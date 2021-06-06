import { isParentNode } from '../../../src/interactions/drill-down';

describe('drill-down interaction', () => {
  it('utils: is-parent-node', () => {
    expect(isParentNode(undefined)).toBeFalsy();
    expect(
      isParentNode({
        event: undefined,
      })
    ).toBeFalsy();
    expect(
      isParentNode({
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
      isParentNode({
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
    ).toBeTruthy();
    expect(
      isParentNode({
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
