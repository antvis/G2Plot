import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import '../../geoms/heatmap/linear';


export interface HeatmapViewConfig extends ViewConfig {
    colorField: string;
}

export interface HeatmapLayerConfig extends HeatmapViewConfig, LayerConfig {}

export default class HeatmapLayer<T extends HeatmapLayerConfig = HeatmapLayerConfig> extends ViewLayer<T> {
    public type: string = 'heatmap';

    public static getDefaultOptions(): any {
        return super.getDefaultOptions();
    }

    protected scale(){
        const props = this.options;
        const scales = {};
        /** 配置x-scale */
        scales[props.xField] = {};
        if (_.has(props, 'xAxis')) {
            extractScale(scales[props.xField], props.xAxis);
        }
        /** 配置y-scale */
        scales[props.yField] = {};
        if (_.has(props, 'yAxis')) {
            extractScale(scales[props.yField], props.yAxis);
        }
        this.setConfig('scales', scales);
        super.scale();
    }

    protected coord() {}

    protected geometryParser(dim,type) {
        return 'heatmap';
    }

    protected addGeometry(){
        const config = {
            type:'linearHeatmap',
            position:{
                fields:[this.options.xField,this.options.yField]
            },
            color:{
                fields:[this.options.colorField],
                values:['green']
            }
        };
 
        this.setConfig('element', config);
    }

    protected animation(){}
}

registerPlotType('heatmap', HeatmapLayer);