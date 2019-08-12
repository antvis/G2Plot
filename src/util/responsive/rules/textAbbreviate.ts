import { Shape } from '@antv/g';

interface TextAbbreviateCfg {
  abbreviateBy?: 'start' | 'middle' | 'end';
}
export default function textAbbreviate(shape: Shape, cfg: TextAbbreviateCfg) {
  const abbreviateBy = cfg.abbreviateBy ? cfg.abbreviateBy : 'end';
  const text = shape.attr('text');
  let abbravateText;
  if (abbreviateBy === 'end') abbravateText = `${text[0]}...`;
  if (abbreviateBy === 'start') abbravateText = `...${text[text.length - 1]}`;
  if (abbreviateBy === 'middle') abbravateText = `${text[0]}...${text[text.length - 1]}`;
  shape.resetMatrix();
  shape.attr({
    text: abbravateText,
    textAlign: 'center',
    textBaseline: 'top',
  });
}
