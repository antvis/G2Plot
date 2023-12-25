import type { DisplayObjectConfig, TextStyleProps as GTextStyleProps } from '@antv/g';
import { Text as GText } from '@antv/g';

export class Text extends GText {
  constructor({ style, ...restOptions }: DisplayObjectConfig<GTextStyleProps> = {}) {
    super({
      style: {
        text: '',
        fontSize: 12,
        textBaseline: 'middle',
        textAlign: 'center',
        fill: '#000',
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontWeight: 'normal',
        lineWidth: 1,
        ...style,
      },
      ...restOptions,
    });
  }
}
