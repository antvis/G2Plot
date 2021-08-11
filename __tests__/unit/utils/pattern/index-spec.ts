import { getCanvasPattern, PatternOption } from '../../../../src/utils/pattern/index';

describe('getCanvasPattern', () => {
  it('dot-pattern without cfg', () => {
    const pattern = getCanvasPattern({ type: 'dot' });
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('dot-pattern with cfg', () => {
    const patternOption = {
      type: 'dot',
      cfg: {
        radius: 4,
        padding: 6,
        fill: '#FFF',
        isStagger: true,
        mode: 'repeat',
      },
    } as PatternOption;
    const pattern = getCanvasPattern(patternOption);
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('line-pattern without cfg', () => {
    const pattern = getCanvasPattern({ type: 'line' });
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('line-pattern with cfg', () => {
    const patternOption = {
      type: 'dot',
      cfg: {
        rotation: 0,
        spacing: 12,
        stroke: '#FFF',
        lineWidth: 1,
        mode: 'repeat',
      },
    } as PatternOption;
    const pattern = getCanvasPattern(patternOption);
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('square-pattern without cfg', () => {
    const pattern = getCanvasPattern({ type: 'square' });
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('square-pattern with cfg', () => {
    const patternOption = {
      type: 'dot',
      cfg: {
        size: 4,
        padding: 10,
        backgroundColor: 'transparent',
        fill: 'transparent',
        stroke: '#fff',
        lineWidth: 1,
        isStagger: true,
        mode: 'repeat',
      },
    } as PatternOption;
    const pattern = getCanvasPattern(patternOption);
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('pattern without option', () => {
    //@ts-ignore
    const pattern = getCanvasPattern({});
    expect(pattern).toEqual(undefined);
  });

  it('pattern with error type', () => {
    //@ts-ignore
    const pattern = getCanvasPattern({ type: 'xxx' });
    expect(pattern).toEqual(undefined);
  });
});
