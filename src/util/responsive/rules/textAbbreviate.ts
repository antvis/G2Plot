import { Shape } from '@antv/g';

interface TextAbbreviateCfg {
  abbreviateBy?: 'start' | 'middle' | 'end';
}
export default function textAbbreviate(shape: Shape, option: TextAbbreviateCfg) {
  const abbreviateBy = option.abbreviateBy ? option.abbreviateBy : 'end';
  const text = shape.attr('text');
  let abbravateText;
  if (abbreviateBy === 'end') {
    abbravateText = `${text[0]}...`;
  }
  if (abbreviateBy === 'start') {
    abbravateText = `...${text[text.length - 1]}`;
  }
  if (abbreviateBy === 'middle') {
    abbravateText = `${text[0]}...${text[text.length - 1]}`;
  }
  shape.resetMatrix();
  shape.attr({
    text: abbravateText,
    textAlign: 'center',
    textBaseline: 'top',
  });
}
