import { LinePatternCfg } from '../../../../src/types/pattern';
import { deepAssign } from '../../../../src/utils';
import { createLinePattern, defaultLinePatternCfg, drawLine } from '../../../../src/utils/pattern/line';
import { initCanvas } from '../../../../src/utils/pattern/util';
import { getPixelColor } from '../../../utils/getPixelColor';

describe('utils: line pattern', () => {
  const width = 30,
    height = 30;
  const canvas = initCanvas(width, height);
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  it('createLinePattern with defaultCfg', () => {
    const pattern = createLinePattern(defaultLinePatternCfg as LinePatternCfg);
    expect(pattern.toString()).toEqual('[object CanvasPattern]');
  });

  it('lineUnitPattern with stroke and strokeWidth', () => {
    const cfg = deepAssign(defaultLinePatternCfg, {
      stroke: '#ff0000',
      lineWidth: 2,
    });
    const d = `
      M 0 0 L ${width} 0
      M 0 ${height} L ${width} ${height}
    `;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(ctx, cfg as LinePatternCfg, d);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, 0, 0).hex).toEqual('#ff0000');
    expect(getPixelColor(canvas, 0, height - 1).hex).toEqual('#000000');
  });

  it('lineUnitPattern with strokeOpacity', () => {
    const cfg = deepAssign(defaultLinePatternCfg, {
      stroke: '#ff0000',
      lineWidth: 2,
      strokeOpacity: 0.5,
    });
    const d = `
      M 0 0 L ${width} 0
      M 0 ${height} L ${width} ${height}
    `;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(ctx, cfg as LinePatternCfg, d);
    // 传入的是呈现的位置
    expect(getPixelColor(canvas, 0, 0).alpha.toPrecision(1)).toEqual(`${0.5}`);
    expect(getPixelColor(canvas, 0, height - 1).alpha.toPrecision(1)).toEqual(`${0.5}`);
    expect(getPixelColor(canvas, width / 2, height / 2).alpha.toPrecision(1)).toEqual(`${0}`);
  });
});
