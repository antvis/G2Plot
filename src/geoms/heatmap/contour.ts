import { registerElement, Element } from '@antv/g2';

class LinearHeatmap extends Element {
  constructor(cfg) {
    super({
      type: 'linearHeatmap',
      shapeType: 'polygon',
      paletteCache: {},
      ...cfg,
    });
  }
}

registerElement('linearHeatmap', LinearHeatmap);
