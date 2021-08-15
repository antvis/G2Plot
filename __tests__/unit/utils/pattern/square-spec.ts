import { initCanvas } from '../../../../src/utils/pattern/util';
import { drawSquare, defaultSquarePatternCfg, createSquarePattern } from '../../../../src/utils/pattern/square';
import { SquarePatternCfg } from '../../../../src/types/pattern';
import { getPixelColor } from '../../../utils/getPixelColor';
import { deepAssign } from '../../../../src/utils';

describe('utils: square pattern', () => {
  const width = 30,
    height = 30;
  const canvas = initCanvas(width, height);
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  it('createSquarePattern with defaultCfg', () => {
    const pattern = createSquarePattern(defaultSquarePatternCfg as SquarePatternCfg);
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('squareUnitPattern with fill', () => {
    const cfg = deepAssign(defaultSquarePatternCfg, {
      fill: '#898989',
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare(ctx, cfg as SquarePatternCfg, width / 2, height / 2);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, width / 2, height / 2).hex).toEqual('#898989');
    expect(getPixelColor(canvas, width / 2 + cfg.size + 5, height / 2).hex).toEqual('#000000'); // 超出范围
  });

  it('squareUnitPattern with fillOpacity', () => {
    const cfg = deepAssign(defaultSquarePatternCfg, {
      // radius: 4, // 默认
      fill: '#898989',
      fillOpacity: 0.5,
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare(ctx, cfg as SquarePatternCfg, width / 2, height / 2);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, width / 2, height / 2).alpha.toPrecision(1)).toEqual(`${0.5}`);
    expect(getPixelColor(canvas, width / 2 + cfg.size + 5, height / 2).alpha.toPrecision(1)).toEqual(`${0}`); // 透明度为0
  });

  it('squareUnitPattern with size', () => {
    const size = 15;
    const cfg = deepAssign(defaultSquarePatternCfg, {
      fill: '#898989',
      fillOpacity: 1,
      size,
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare(ctx, cfg as SquarePatternCfg, width / 2, height / 2);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, width / 2, height / 2).hex).toEqual('#898989');
    expect(getPixelColor(canvas, width / 2 + size / 2 - 1, height / 2).hex).toEqual('#898989'); // 边界
    expect(getPixelColor(canvas, width / 2 + size / 2 + 5, height / 2).hex).toEqual('#000000'); // 超出边界
  });

  it('squareUnitPattern with stroke and lineWidth', () => {
    const cfg = deepAssign(defaultSquarePatternCfg, {
      size: 15,
      fill: '#ff0000',
      stroke: '#00ff00',
      lineWidth: 4,
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare(ctx, cfg as SquarePatternCfg, width / 2, height / 2);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, width / 2, height / 2).hex).toEqual('#ff0000');
    // 描边
    expect(getPixelColor(canvas, width / 2 + cfg.size / 2 + 1, height / 2).hex).toEqual('#00ff00');
    expect(getPixelColor(canvas, width / 2 + cfg.size / 2 + 5, height / 2 + cfg.size / 2).hex).toEqual('#000000');
  });
});
