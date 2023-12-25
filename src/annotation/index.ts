import { Chart } from '@antv/g2';
import { ANNOTATION_LIST } from '../constants';
import { ConversionTag } from './conversion-tag';
import { BidirectionalBarAxisText } from './bidirectional-bar-axis-text';

const Annotaion = { ConversionTag, BidirectionalBarAxisText };

export class Controller<T extends object> {
  public chart: Chart;
  public config: T;
  public container: Map<string, any> = new Map();

  constructor(chart: Chart, config: T) {
    this.chart = chart;
    this.config = config;
    this.init();
  }

  init() {
    ANNOTATION_LIST.forEach((annotation) => {
      const { key, shape } = annotation;
      const annotationOptions = this.config[key];
      if (annotationOptions) {
        const annotationInstance = new Annotaion[shape](this.chart, annotationOptions);
        const { canvas } = this.chart.getContext();
        canvas.appendChild(annotationInstance);
        this.container.set(key, annotationInstance);
      } else {
        this.container.get(key)?.clear();
      }
    });
  }
  /**
   * Update annotaions
   */
  update() {
    if (!this.container.size) return;
    ANNOTATION_LIST.forEach((annotation) => {
      const { key } = annotation;
      const annotationInstance = this.container.get(key);
      annotationInstance?.update();
    });
  }
}
