/**
 * Create By Bruce Too
 * On 2020-02-14
 */
import { deepMix } from '@antv/util';
import { HtmlTooltip, TooltipCfg } from '../../dependents';

export default class WordCloudTooltips extends HtmlTooltip {
  constructor(cfg: TooltipCfg) {
    const newCfg = deepMix({}, cfg, {
      itemTpl: `<div data-index={index}>
        <span style="background-color:{color};" class="g2-tooltip-marker"></span>
        {name}<span class="g2-tooltip-value">{value}</span></div>`,
    });
    super(newCfg);
  }
}
