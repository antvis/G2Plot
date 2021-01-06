import { getTinyLineData } from '../../../../src/plots/tiny-line/utils';

describe('tineLine-data', () => {
  it('normal data', () => {
    const originalData = [100, 200, 0, -100, -200];
    const data = getTinyLineData(originalData);

    expect(data.length).toEqual(originalData.length);
    expect(data).toEqual([
      { x: 0, y: 100 },
      { x: 1, y: 200 },
      { x: 2, y: 0 },
      { x: 3, y: -100 },
      { x: 4, y: -200 },
    ]);
  });

  it('contain Nil element', () => {
    const originalData = [100, undefined, 0, null, -200];
    const data = getTinyLineData(originalData);

    expect(data.length).toEqual(originalData.length);
    expect(data).toEqual([
      { x: 0, y: 100 },
      { x: 1, y: undefined },
      { x: 2, y: 0 },
      { x: 3, y: null },
      { x: 4, y: -200 },
    ]);
  });

  it('empty data', () => {
    const originalData = [];
    const data = getTinyLineData(originalData);

    expect(data.length).toEqual(0);
  });

  it('invalid data', () => {
    const inValidData_1 = getTinyLineData(undefined);
    expect(inValidData_1).toEqual([]);

    const inValidData_2 = getTinyLineData(null);
    expect(inValidData_2).toEqual([]);
  });
});
