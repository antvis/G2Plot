import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import patition from './layout/partition';
import { INTERACTION_MAP } from './interaction';
import SunburstLabel from './components/label';

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
      innerRadius: 0,
      maxLevel: Infinity,
      padding: [0, 0, 0, 0],
      tooltip: {
        showTitle: false,
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
      label:{
        visible: true
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
    super.beforeInit();
    const { data } = this.options;
    const sunburstData = this.getSunburstData(data);
    this.rootData = sunburstData;
    this.adjustLinearScale(sunburstData);

    const { interactions } = this.options;
    if (interactions) {
      _.each(interactions, (interaction) => {
        if (interaction.type === 'drilldown') {
          this.isDrilldown = true;
        }
      });
    }
  }

  protected geometryParser(dim, type) {
    return 'polygon';
  }

  public getSunburstData(data, level?) {
    data.depth = 0;
    const root = patition(data);
    const sunBurstData = [];
    this.getAllNodes(root.children, sunBurstData,level);
    sunBurstData.push({
      ...root,
      x: [root.x0, root.x1, root.x1, root.x0, root.x1],
      y: [root.y1, root.y1, root.y0, root.y0, root.y0],
    });
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
      color: this.getColorConfig(sunburstData),
      tooltip: {
        fields: ['name'],
      },
      label: false,
      style:{
        fields:['depth'],
        callback:(depth)=>{
          if(depth > 0){
            return {
              stroke:'#ffffff',
              lineWidth: 1
            }
          }
        }
      }
    };
    this.setConfig('element', this.rect);
  }

  protected animation() {
    super.animation();
    if (this.isDrilldown) {
      this.rect.animate = false;
    }
  }

  protected applyInteractions() {
    const interactionCfg = this.options.interactions;
    const interactions = this.view.get('interactions');
    _.each(interactionCfg, (inter) => {
      const Ctr = INTERACTION_MAP[inter.type];
      if (Ctr) {
        const interaction = new Ctr(
          _.deepMix(
            {},
            {
              view: this.view,
              plot: this,
              startEvent: 'polygon:click',
            },
            inter.cfg
          )
        );
        interactions[inter.type] = interaction;
      }
    });
  }

  public afterRender(){
    if (this.options.label && this.options.label.visible) {
      const label = new SunburstLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });
      label.render();
    }
    super.afterRender();
  }

  private getAllNodes(data, nodes,level?) {
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

  private getColorConfig(data){
    const { colorField,colors } = this.options;
    if(_.isString(data[0][colorField])){
      const uniqueValues = [];
      let uniqueColors;
      _.each(data,(d)=>{
        const value = d[colorField];
        if(!_.has(value,uniqueValues)){
          uniqueValues.push(value);
        }
      });
      if(colors){
        uniqueColors = colors;
      }else{
        const theme = this.getTheme();
        uniqueColors = uniqueValues.length >= 8 ? theme.colors_20 : theme.colors;
      }
      // zip
      const mappingData = {};
      _.each(uniqueValues,(v,i)=>{
        const index = i<=uniqueValues.length-1? i : i - uniqueValues.length;
        const color = uniqueColors[index];
        mappingData[v] = color;
      });
      return {
        fields:[colorField],
        callback:(v)=>{
          return mappingData[v];
        }
      }
    }else{
      return {
        fields:[colorField],
        values: colors
      };
    }
  }

  private adjustLinearScale(data){
    const { colorField, meta } = this.options;
    if(_.isNumber(data[0][colorField])){
      let min = Infinity;
      let max = -Infinity;
      _.each(data,(d)=>{
        const value = d[colorField];
        min = Math.min(value,min);
        max = Math.max(value,max);
      });
      const origin_meta = meta[colorField];
      meta[colorField] = _.deepMix({},origin_meta,{
        min,
        max
      });
    }
  }

}

registerPlotType('sunburst', SunburstLayer);