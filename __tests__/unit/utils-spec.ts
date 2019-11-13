import { isTextUsable, breakText } from '../../src/util/common';

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
