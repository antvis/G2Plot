import { Shape } from '@antv/g';

interface TextWrapperCfg {
    lineNumber: number;
  }

export default function textWrapper(shape: Shape, cfg: TextWrapperCfg) {
    const text = shape.attr('text');
    const step = Math.ceil(text.length / cfg.lineNumber);
    let wrapperText = '';
    for (let i = 1; i < cfg.lineNumber; i++) {
      const index = step * i;
      wrapperText = `${text.slice(0, index)}\n${text.slice(index)}`;
    }
    const fontSize = shape.attr('fontSize');
    shape.attr({
      text: wrapperText,
      lineHeight: fontSize,
      textAlign: 'center',
      textBaseline: 'top',
    });
}