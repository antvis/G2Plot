import { each, isArray, isFunction, deepMix } from '@antv/util';
import { Group, BBox } from '@antv/g';
import { View } from '@antv/g2';

export interface HeatmapBackgroundConfig {
    type?:string;
    value?:any;
    src?:string;
}

export interface IHeatmapBackground extends HeatmapBackgroundConfig {
    view: View;
    plot: any;
}

export default class HeatmapBackground {
    public options: IHeatmapBackground;
    public container: Group;
    protected view: View;
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;

    constructor(cfg: IHeatmapBackground) {
        this.options = cfg;
        this.view = this.options.view;
        this.init();
    }

    public init(){
        const coord = this.view.get('coord');
        this.width = coord.width;
        this.height = coord.height;
        this.x =  coord.start.x;
        this.y = coord.end.y;
        const plotContainer = this.options.plot.container;
        this.container = plotContainer.addGroup();
        this.container.setZIndex(-100);
    }

    public render(){
        if(this.options.type === 'color'){
            this.renderColorBackground();
        }else if(this.options.type === 'image'){
            this.renderImageBackground();
        }
    }

    public renderColorBackground(){
        this.container.addShape('rect',{
            attrs:{
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                fill: this.options.value
            }
        });
    }

    public renderImageBackground(){
        this.container.addShape('image',{
            attrs:{
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                img: this.options.src
            }
        });
    }

    public clear(){
        if (this.container) {
            this.container.clear();
        }
    }

    public destroy(){
        if (this.container) {
            this.container.remove();
        }
    }
}