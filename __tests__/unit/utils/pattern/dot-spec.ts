import { initCanvas } from '../../../../src/utils/pattern/util';
import { drawDot, defaultDotPatternCfg, createDotPattern } from '../../../../src/utils/pattern/dot';
import { DotPatternCfg } from '../../../../src/types/pattern';
import { getPixelColor } from '../../../utils/getPixelColor';
import { deepAssign } from '../../../../src/utils';

describe('utils: dot pattern', () => {
  const width = 30,
    height = 30;
  const canvas = initCanvas(width, height);
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  it('createDotPattern with defaultCfg', () => {
    const pattern = createDotPattern(defaultDotPatternCfg as DotPatternCfg);
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('dotUnitPattern with fill', () => {
    const cfg = deepAssign(defaultDotPatternCfg, {
      // radius: 4, // 默认
      fill: '#898989',
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDot(ctx, cfg as DotPatternCfg, width / 2, height / 2);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, width / 2, height / 2).hex).toEqual('#898989');
    expect(getPixelColor(canvas, width / 2 + cfg.radius, height / 2 + cfg.radius).hex).toEqual('#000000'); // 超出圆范围, 像素点在右下方
  });

  it('dotUnitPattern with fillOpacity', () => {
    const cfg = deepAssign(defaultDotPatternCfg, {
      // radius: 4, // 默认
      fill: '#898989',
      fillOpacity: 0.5,
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDot(ctx, cfg as DotPatternCfg, width / 2, height / 2);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, width / 2, height / 2).alpha.toPrecision(1)).toEqual(`${0.5}`);
    expect(getPixelColor(canvas, width / 2 + cfg.radius, height / 2 + cfg.radius).alpha.toPrecision(1)).toEqual(`${0}`); // 透明度为0
  });

  it('dotUnitPattern with radius', () => {
    const radius = 15;
    const cfg = deepAssign(defaultDotPatternCfg, {
      fill: '#ff0000',
      fillOpacity: 1,
      radius,
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDot(ctx, cfg as DotPatternCfg, width / 2, height / 2);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, width / 2, height / 2).hex).toEqual('#ff0000');
    expect(getPixelColor(canvas, width / 2 + radius - 1, height / 2).hex).toEqual('#ff0000'); // 圆的边界
    expect(getPixelColor(canvas, width / 2 + radius, height / 2).hex).toEqual('#000000');
  });

  it('dotUnitPattern with stroke and lineWidth', () => {
    const cfg = deepAssign(defaultDotPatternCfg, {
      radius: 10,
      fill: '#ff0000',
      stroke: '#00ff00',
      lineWidth: 2,
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDot(ctx, cfg as DotPatternCfg, width / 2, height / 2);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, width / 2, height / 2).hex).toEqual('#ff0000');
    expect(getPixelColor(canvas, width / 2 + cfg.radius, height / 2).hex).toEqual('#00ff00');
    expect(getPixelColor(canvas, width / 2 + cfg.radius, height / 2 + cfg.radius).hex).toEqual('#000000');
  });
});
