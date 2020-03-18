import { IShape } from '@antv/g-base';

interface TextWrapperCfg {
  lineNumber: number;
}

export default function textWrapper(shape: IShape, option: TextWrapperCfg) {
  const text = shape.attr('text');
  const step = Math.ceil(text.length / option.lineNumber);
  let wrapperText = '';
  for (let i = 1; i < option.lineNumber; i++) {
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
