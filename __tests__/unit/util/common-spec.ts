import { isTextUsable, breakText, sortedLastIndex } from '../../../src/util/common';

test('check title description usable', () => {
  expect(isTextUsable(null)).toBe(false);
  expect(isTextUsable(undefined)).toBe(false);
  expect(isTextUsable({ visible: false })).toBe(false);
  expect(isTextUsable({ visible: true })).toBe(false);
  expect(isTextUsable({ visible: true, text: '' })).toBe(false);
  expect(isTextUsable({ visible: true, text: ' ' })).toBe(false);
  expect(isTextUsable({ visible: true, text: 'title' })).toBe(true);
  expect(isTextUsable({})).toBe(false);
});

test('break text by index', () => {
  expect(breakText(['a', 'b', 'c'], [1])).toBe(`a
bc`);
  expect(breakText(['a', 'b', 'c', 'd'], [1, 2])).toBe(`a
b
cd`);
});

test('sortedLastIndex', () => {
  expect(sortedLastIndex([4, 5, 5, 5, 6], 5)).toBe(4);
  expect(sortedLastIndex([2, 3, 4], 1)).toBe(0);
  expect(sortedLastIndex([2, 3, 4], 2)).toBe(1);
  expect(sortedLastIndex([2, 3, 4], 3)).toBe(2);
  expect(sortedLastIndex([2, 3, 4], 4)).toBe(3);
  expect(sortedLastIndex([2, 3, 4], 5)).toBe(3);
});
