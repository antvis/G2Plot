/**
 * Create By Bruce Too
 * On 2020-02-14
 */
import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import WordCloudLayer, { WordCloudViewConfig } from './layer';
import { registerPlotType } from '../../base/global';

export interface WordCloudPlotConfig extends PlotConfig {
  container?: HTMLDivElement;
}
export interface WordCloudConfig extends WordCloudViewConfig, WordCloudPlotConfig {}

export default class WordCloud extends BasePlot<WordCloudConfig> {
  constructor(container: HTMLElement, props: WordCloudConfig) {
    // only canvas works for now
    props.renderer = 'canvas';
    super(container, props);
  }
  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'wordCloud';
    layerProps.container = this.containerDOM;
    super.createLayers(layerProps);
  }
}
registerPlotType('wordCloud', WordCloudLayer);
