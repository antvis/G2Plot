import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { LooseMap } from '../../interface/types';
import { DataItem } from '../../interface/config';
import squarify from './layout/squarify';

export interface TreemapViewConfig extends ViewConfig {
    data:any;
    maxLevel?: number;
}

export interface TreemapLayerConfig extends TreemapViewConfig, LayerConfig {}

export default class TreemapLayer<T extends TreemapLayerConfig = TreemapLayerConfig> extends ViewLayer<T> {
    public static getDefaultOptions(): Partial<TreemapLayerConfig> {
        return _.deepMix({}, super.getDefaultOptions(), {
            maxLevel: 2,
            padding:[0,0,0,0],
            tooltip:{
                visible: false
            },
            legend:{
                visible: false
            }
        });
    }
    public type: string = 'line';

    protected geometryParser(dim, type) {
        return 'polygon';
    }

    protected processData(){
      const viewRange = this.getViewRange();
      const { data } = this.options;
      const root = squarify(data, viewRange.x, viewRange.y, viewRange.width, viewRange.height);
      const treemapData = [];
      this.getAllNodes(root,treemapData);
      this.options.xField = 'x';
      this.options.yField = 'y';
      return treemapData;
    }

    protected axis(){}
    protected coord() {}
    protected addGeometry(){
        const rect: any = {
            type: 'polygon',
            position: {
              fields: ['x', 'y'],
            },
            color:{
                fields:['brand']
            },
            style:{
                values:[{
                    lineWidth: 2,
                    stroke:'white'
                }]
            }
        };
        this.setConfig('element', rect);
    } 

    private recursive(){
    }
    
    private getAllNodes(data,nodes){
        const viewRange = this.getViewRange();
        _.each(data,(d)=>{
            if(_.hasKey(d,'children')){
                this.getAllNodes(d.children,nodes);
            }
            if(d.x0){
                nodes.push({
                    ...d,
                    x:[d.x0,d.x1,d.x1,d.x0],
                    y:[viewRange.height - d.y1,viewRange.height - d.y1,viewRange.height - d.y0,viewRange.height - d.y0]
                });
            }
        });
    }
}

registerPlotType('treemap', TreemapLayer);