import { measureTextWidth } from '../../../src/utils/measure-text';

const FONT = {
  fontSize: 10,
  fontFamily: 'serif',
};

describe('measure-text', () => {
  it('measureTextWidth', () => {
    expect(measureTextWidth('蚂蚁')).toEqual(measureTextWidth('蚂') + measureTextWidth('蚁'));
    expect(measureTextWidth('蚂蚁')).toEqual(measureTextWidth('阿里'));

    expect(measureTextWidth('蚂蚁', FONT)).toBe(20);
    expect(measureTextWidth('东...', FONT)).toBeLessThan(measureTextWidth('东北', FONT));
  });

  it('change font', () => {
    const newFont = { ...FONT, fontSize: 20 };
    expect(measureTextWidth('蚂蚁', FONT)).not.toEqual(measureTextWidth('阿里', newFont));
    expect(measureTextWidth('hello', newFont)).not.toEqual(measureTextWidth('hello', FONT));
  });
});
