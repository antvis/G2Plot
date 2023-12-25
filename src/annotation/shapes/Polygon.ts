import type { DisplayObjectConfig, PolygonStyleProps as GPolygonStyleProps } from '@antv/g';
import { Polygon as GPolygon } from '@antv/g';

export class Polygon extends GPolygon {
  constructor({ style, ...restOptions }: DisplayObjectConfig<GPolygonStyleProps> = {}) {
    super({
      style: {
        fill: '#eee',
        ...style,
      },
      ...restOptions,
    });
  }
}
