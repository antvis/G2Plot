/**
 * Create By Bruce Too
 * On 2020-01-09
 */
import HtmlTooltip from '@antv/component/lib/tooltip/html';
import { TooltipCfg } from '@antv/component/lib/tooltip/interface';

export default class WordCloudTooltips extends HtmlTooltip {
  constructor(cfg: TooltipCfg) {
    super(cfg);
  }

  public show() {
    const container = this.get('container');
    container.style.visibility = 'visible';
    container.style.display = 'block';
    const crosshairGroup = this.get('crosshairGroup');
    if (crosshairGroup) {
      crosshairGroup.show();
    }
    const markerGroup = this.get('markerGroup');
    if (markerGroup) {
      markerGroup.show();
    }
    this.set('visible', true);
  }

  public hide() {
    const container = this.get('container');
    container.style.visibility = 'hidden';
    container.style.display = 'none';
    const crosshairGroup = this.get('crosshairGroup');
    if (crosshairGroup) {
      crosshairGroup.hide();
    }
    const markerGroup = this.get('markerGroup');
    if (markerGroup) {
      markerGroup.hide();
    }
    this.set('visible', false);
  }
}
