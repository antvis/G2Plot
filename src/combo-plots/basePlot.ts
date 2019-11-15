import {Group} from '@antv/g';
import * as _ from '@antv/util';
import { getPlotType } from '../base/global';
import Layer from '../base/layer';
import Plot, { PlotConfig } from '../base/plot';
import ViewLayer from '../base/view-layer';
import '../index';
import * as ComboUtil from './util';
import { getOverlappingPadding } from './util/padding';


export interface ComboPlotConfig extends PlotConfig {
    layers: ViewLayer[]
}

export default class ComboPlot<T extends ComboPlotConfig = ComboPlotConfig> extends Plot<T> {

    protected isOverlapped: boolean;
    protected topLayer: Layer;
    protected backLayer: Layer;
    protected legendInfo: any[];
    protected axisInfo: any[];
    protected legendContainer: Group;
    protected paddingComponents: any[];


    constructor(container: HTMLElement, props: T){
        super(container, props);
    }

    protected createLayers(props: T & { layers?: any }) {
        this.legendInfo = [];
        this.axisInfo = [];
        this.paddingComponents = [];

        this.isOverlapped = this.detectOverlapping(props.layers);
        if(this.isOverlapped){
            /** add top layer for legend & tooltip */
            this.topLayer = new Layer({
                canvas: this.getCanvas(),
                width: this.width,
                height: this.height
            });
        }

        if(props.layers.length>0){
            /** create layers */
            _.each(props.layers,(layerCfg)=>{
                const overlapConfig = this.isOverlapped ? this.getOverlappedConfig(layerCfg) : {};
                const viewLayerCtr = getPlotType(layerCfg.type);
                const viewLayerProps: T = _.deepMix({}, layerCfg, {
                    canvas: this.getCanvas(),
                    x: layerCfg.x ? layerCfg.x : 0,
                    y: layerCfg.y ? layerCfg.y : 0,
                    width: layerCfg.width ? layerCfg.width : this.width,
                    height: layerCfg.height ? layerCfg.height : this.height,
                },overlapConfig);
                const viewLayer = new viewLayerCtr(viewLayerProps);
                viewLayer.render();
                this.axisInfo.push(...ComboUtil.getAxisData(viewLayer,viewLayerProps));
                this.legendInfo.push(...ComboUtil.getLegendData(viewLayer,viewLayerProps));
                this.addLayer(viewLayer);
            });
        }

        if(this.isOverlapped){
            /** add back layer for axis */
            this.backLayer = new Layer({
                canvas: this.getCanvas(),
                width: this.width,
                height: this.height
            });
            const legend = this.overlappingLegend();
            this.paddingComponents.push(legend);
            this.overlappingLayout();
        }
    }

    /** 判断图层是否叠加 */
    protected detectOverlapping(layers){
        /** 图层叠加的判定条件：
         *  layers没有设位置和宽高
         *  layers位置或宽高一致
         */
        let isOverlapped = true;
        let x = null;
        let y = null;
        let width = null;
        let height = null;

        _.each(layers,(layer)=>{
            if(_.has(layer,'x') && layer.x !== x){
                isOverlapped = false;
            }
            x = layer.x;
            if(_.has(layer,'y') && layer.y !== y){
                isOverlapped = false;
            }
            y = layer.y;
            if(_.has(layer,'width') && layer.width !== width){
                isOverlapped = false;
            }
            width = layer.width;
            if(_.has(layer,'height') && layer.height !== height){
                isOverlapped = false;
            }
            height = layer.height;
        });
        return isOverlapped;
    }


    /** 图层叠加时的layer config */
    protected getOverlappedConfig(layerCfg){
        return {
            xAxis:{
                visible: false
            },
            yAxis:{
                visible: false
            },
            legend:{
                visible: false
            },
            padding: [0,0,0,0],
            color: ComboUtil.getColorConfig(layerCfg.type,layerCfg)
        }
    }

    protected overlappingLegend(){
        const legendItems = ComboUtil.mergeLegendData(this.legendInfo);
        this.legendContainer = this.topLayer.container.addGroup();
        return ComboUtil.createLegend(legendItems,this.legendContainer,this.width,this.getCanvas());
    }

    protected overlappingLayout(){
        // 先获取legend的padding
        const legendPadding = getOverlappingPadding(this.layers[0],this.paddingComponents);
        const axisComponents = ComboUtil.axesLayout(this.axisInfo,legendPadding,this.layers[0],this.width,this.height,this.getCanvas());
        this.paddingComponents.push(...axisComponents);
        // 计算padding
        const padding = getOverlappingPadding(this.layers[0],this.paddingComponents);
        // 更新layers
         _.each(this.layers,(layer)=>{
            layer.updateConfig({
                padding
            });
            layer.render();
        }); 
    }

    
}