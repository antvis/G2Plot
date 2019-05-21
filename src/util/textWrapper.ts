import { Text } from '@antv/g';
import * as _ from '@antv/util';

export function textWrapper(text, width, style) {
  let currentWidth = 0;
  let wrapperedText = _.clone(text);
  const tShape = new Text({
    attrs:{
      text: '',
      x: 0,
      y: 0,
      ...style,
    },
  });
  for (let i = 0; i < wrapperedText.length; i++) {
    const t = wrapperedText[i];
    tShape.attr('text', t);
    const textWidth = tShape.getBBox().width;
    currentWidth += textWidth;
    if (currentWidth >= width) {
      wrapperedText = `${wrapperedText.slice(0, i)}\n${wrapperedText.slice(i)}`;
      currentWidth = 0;
    }
  }
  tShape.remove();
  return wrapperedText;
}
