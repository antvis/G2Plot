import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import patition from './layout/partition';

export interface SunburstViewConfig extends ViewConfig {
  data: any;
  maxLevel?: number;
  colorField: string;
  colors?: string[];
  radius?: number;
  innerRadius?: number;
}

export interface SunburstLayerConfig extends SunburstViewConfig, LayerConfig {}

export default class SunburstLayer<T extends SunburstLayerConfig = SunburstLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<SunburstLayerConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {
      radius: 0.8,
      innerRadius: 0.2,
      maxLevel: 10,
      padding: [0, 0, 0, 0],
      tooltip: {
        visible: true,
        shared: false,
        crosshairs: false
      },
      legend: {
        visible: false,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      xField: 'x',
      yField: 'y',
      meta: {
        x: {
          nice: false,
        },
        y: {
          nice: false,
        },
      },
    });
  }
  public type: string = 'sunburst';
  public rootData: any;
  public rect: any;
  private isDrilldown: boolean;

  public beforeInit() {
    const { interactions } = this.options;
    if (interactions) {
      _.each(interactions, (interaction) => {
        if (interaction.type === 'drilldown') {
          this.isDrilldown = true;
          this.options.maxLevel = 1;
        }
      });
    }
  }

  protected geometryParser(dim, type) {
    return 'polygon';
  }

  public getSunburstData(data, level?) {
    data.depth = 0;
    const root = patition(data).children;
    const sunBurstData = [];
    this.getAllNodes(root, sunBurstData, level);
    sunBurstData.sort((a, b) => {
      return a.depth - b.depth;
    });
    this.options.xField = 'x';
    this.options.yField = 'y';
    return sunBurstData;
  }

  protected processData() {
    return this.rootData;
  }

  public beforInit() {
    super.beforeInit();
    const { data } = this.options;
    const sunburstData = this.getSunburstData(data);
    this.rootData = sunburstData;
  }

  protected coord() {
    const props = this.options;
    const coordConfig: any = {
      type: 'theta',
      cfg: {
        radius: props.radius,
        innerRadius: props.innerRadius,
      },
    };
    this.setConfig('coord', coordConfig);
  }

  protected addGeometry() {
    const { data, colorField, color } = this.options;
    const sunburstData = this.getSunburstData(data);
    this.rootData = sunburstData;
    this.rect = {
      type: 'polygon',
      position: {
        fields: ['x', 'y'],
      },
      color: {
        fields: [colorField],
        values: color,
      },
      tooltip: {
        fields: ['name'],
      },
      label: {
        fields: ['name'],
      },
    };
    this.setConfig('element', this.rect);
  }

  protected animation() {
    super.animation();
    if (this.isDrilldown) {
      this.rect.animate = false;
    }
  }

  private getAllNodes(data, nodes, level?) {
    const max = level ? level : this.options.maxLevel;
    _.each(data, (d) => {
      if (_.hasKey(d, 'x0') && d.depth <= max) {
        nodes.push({
          ...d,
          y: [d.x0, d.x1, d.x1, d.x0],
          x: [d.y1, d.y1, d.y0, d.y0],
        });
      }
      if (_.hasKey(d, 'children')) {
        this.getAllNodes(d.children, nodes);
      }
    });
  }
}

registerPlotType('sunburst', SunburstLayer);
