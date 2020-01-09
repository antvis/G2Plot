/**
 * Create By Bruce Too
 * On 2019-12-25
 */
import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import WordCloudLayer, { WordCloudViewConfig } from './layer';
import { registerPlotType } from '../../base/global';

export interface WordCloudConfig extends WordCloudViewConfig, PlotConfig {}

export default class WordCloud extends BasePlot<WordCloudConfig> {
  constructor(container: HTMLElement, props: WordCloudConfig) {
    // only canvas works for now
    props.renderer = 'canvas';
    super(container, props);
  }
  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'wordCloud';
    super.createLayers(layerProps);
  }
}
registerPlotType('wordCloud', WordCloudLayer);
