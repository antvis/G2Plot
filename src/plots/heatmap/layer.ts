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
    radius?: number;
    intensity?: number;
}

export interface HeatmapLayerConfig extends HeatmapViewConfig, LayerConfig {}

export default class HeatmapLayer<T extends HeatmapLayerConfig = HeatmapLayerConfig> extends ViewLayer<T> {
    public type: string = 'heatmap';

    public static getDefaultOptions(): any {
        return _.deepMix({}, super.getDefaultOptions(), {
            xAxis: {
                visible: true,
                autoHideLabel: true,
                autoRotateLabel: true,
                autoRotateTitle: false,
                grid: {
                  visible: false,
                },
                line: {
                  visible: true,
                },
                tickLine: {
                  visible: true,
                },
                label: {
                  visible: true,
                },
                title: {
                  visible: true,
                  offset: 12,
                },
              },
            yAxis: {
                visible: true,
                autoHideLabel: true,
                autoRotateLabel: false,
                autoRotateTitle: true,
                grid: {
                  visible: false,
                },
                line: {
                  visible: true,
                },
                tickLine: {
                  visible: true,
                },
                label: {
                  visible: true,
                },
                title: {
                  visible: true,
                  offset: 12,
                },
            },
            color:[
                'rgba(33,102,172,0)',
                'rgb(103,169,207)',
                'rgb(209,229,240)',
                'rgb(253,219,199)',
                'rgb(239,138,98)',
                'rgb(178,24,43)'
            ]
        });
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
                values:this.options.color
            }
        } as any;

        if(this.options.radius) {
            config.radius = this.options.radius;
        }

        if(this.options.intensity) {
            config.intensity = this.options.intensity;
        }
 
        this.setConfig('element', config);
    }

    protected animation(){}
}

registerPlotType('heatmap', HeatmapLayer);