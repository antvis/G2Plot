import { each, isArray, isFunction, deepMix } from '@antv/util';
import { Group, BBox } from '@antv/g';
import { View } from '@antv/g2';

const LABEL_MARGIN = 5;

export interface IHeatmapLegend {
    view: View;
    position: string;
    width?: number;
    height?: number;
    plot: any;
}

export default class HeatmapLegend {
    public options: IHeatmapLegend;
    public container: Group;
    protected view: View;
    protected layout: string;
    protected width: number;
    protected height: number;
    protected position: string;
    protected x: number;
    protected y: number;

    constructor(cfg: IHeatmapLegend) {
        this.options = cfg;
        this.view = this.options.view;
        this.init();
    }

    public init(){
        this.layout = this.getLayout();
        this.width = this.options.width ? this.options.width : this.getDefaultWidth();
        this.height = this.options.height ? this.options.height : this.getDefaultHeight();  
        const plotContainer = this.options.plot.container;
        this.container = plotContainer.addGroup();
    }

    public render(){
        const scales = this.view.get('scales');
        const colorField = this.options.plot.options.colorField;
        const colorScale = scales[colorField];
        const {min,max} = colorScale;
        const {color} = this.options.plot.options;
        if(this.layout === 'horizontal') {
            this.renderHorizontal(min,max,color);
        }else{
            this.renderVertical(min,max,color);
        }
        this.legendLayout();
    }

    public clear(){
        if (this.container) {
            this.container.clear();
        }
    }

    public destory(){
        if (this.container) {
            this.container.remove();
        }
    }

    public getBBox(){
        const origin_bbox = this.container.getBBox();
        return new BBox(this.x,this.y,origin_bbox.width,origin_bbox.height);
    }

    protected renderVertical(min,max,colors){
        const gridWidth = this.width;
        const gridHeight = this.height / colors.length;
        const gridLineContainer = new Group();
        // 绘制色彩格子
        each(colors,(c,i)=>{
            const y = gridHeight * i;
            this.container.addShape('rect',{
                attrs:{
                    x:0,
                    y,
                    width: gridWidth,
                    height: gridHeight,
                    fill: c
                }
            });
            const line = gridLineContainer.addShape('path',{
                attrs:{
                    path: [
                        ['M',0,y+gridHeight],
                        ['L',gridWidth,y+gridHeight]
                    ],
                    stroke:'white',
                    lineWidth: 1,
                }
            });
        });
        // 绘制两边的label
        const textMin = this.container.addShape('text',{
            attrs:{
                text: min,
                x: gridWidth / 2,
                y: -LABEL_MARGIN,
                fontSize:12,
                fill:'white',
                textAlign: 'center',
                textBaseline: 'bottom'
            }
        });
        const textMax = this.container.addShape('text',{
            attrs:{
                text: max,
                x: gridWidth / 2,
                y: this.height + LABEL_MARGIN,
                fontSize:12,
                fill:'white',
                textAlign: 'center',
                textBaseline: 'top'
            }
        });
        // 绘制包围线
        const path = gridLineContainer.addShape('path',{
            attrs:{
                path: [['M',0,0],
                       ['L',this.width, 0],
                       ['L',this.width, this.height],
                       ['L',0, this.height],
                       ['L',0, 0],
                    ],
                stroke:'white',
                lineWidth : 1,
                opacity: 0.5
            }
        });
        this.container.add(gridLineContainer);
    }

    protected renderHorizontal(min,max,colors){
        const gridWidth = this.width / colors.length;
        const gridHeight = this.height;
        const gridLineContainer = new Group();
        // 绘制色彩格子
        each(colors,(c,i)=>{
            const x = gridWidth * i;
            this.container.addShape('rect',{
                attrs:{
                    x,
                    y:0,
                    width: gridWidth,
                    height: gridHeight,
                    fill: c
                }
            });
            const line = gridLineContainer.addShape('path',{
                attrs:{
                    path: [
                        ['M',x+gridWidth,0],
                        ['L',x+gridWidth,gridHeight]
                    ],
                    stroke:'white',
                    lineWidth: 1,
                }
            });
        });
        // 绘制两边的label
        const textMin = this.container.addShape('text',{
            attrs:{
                text: min,
                x: 0,
                y: gridHeight + LABEL_MARGIN,
                fontSize:12,
                fill:'white',
                textBaseline: 'top'
            }
        });
        const textMax = this.container.addShape('text',{
            attrs:{
                text: max,
                x: this.width,
                y: gridHeight + LABEL_MARGIN,
                fontSize:12,
                fill:'white',
                textAlign: 'right',
                textBaseline: 'top'
            }
        });
        // 绘制包围线
        const path = gridLineContainer.addShape('path',{
            attrs:{
                path: [['M',0,0],
                       ['L',this.width, 0],
                       ['L',this.width, this.height],
                       ['L',0, this.height],
                       ['L',0, 0],
                    ],
                stroke:'white',
                lineWidth : 1,
                opacity: 0.5
            }
        });
        this.container.add(gridLineContainer);
    }

    protected getLayout(){
        const positions = this.options.position.split('-');
        this.position = positions[0];
        if(positions[0]==='left' || positions[0]==='right'){
            return 'vertical'
        }
        return 'horizontal';
    }

    protected getDefaultWidth(){
        if(this.layout === 'horizontal'){
            const { width } = this.options.plot.options;
            return width * 0.5;
        }
        return 10;
    }

    protected getDefaultHeight(){
        if(this.layout === 'vertical'){
            const { height } = this.options.plot.options;
            return height * 0.5;
        }
        return 10;
    }

    protected legendLayout(){
        const { bleeding } = this.options.plot.getPlotTheme();
        if (isArray(bleeding)) {
            each(bleeding, (it, index) => {
              if (typeof bleeding[index] === 'function') {
                bleeding[index] = bleeding[index](this.options.plot.options);
              }
            });
        }
        const bbox = this.container.getBBox();
        let x = 0;
        let y = 0;
        const positions = this.options.position.split('-');
        const plotWidth = this.options.plot.width;
        const plotHeight = this.options.plot.height;
        // 先确定x
        if(positions[0] === 'left'){
            x = bleeding[3];
        }else if(positions[0] === 'right'){
            x = plotWidth - bleeding[1] - bbox.width;
        }else if(positions[1] === 'center'){
            x = ( plotWidth - bbox.width ) / 2;
        }else if(positions[1] === 'left') {
            x = bleeding[3];
        }else if(positions[1] === 'right') {
            x =  this.options.plot.width - bleeding[1] - bbox.width;
        }
        // 再确定y
        if(positions[0] === 'bottom'){
            y = plotHeight - bleeding[2] - bbox.height;
        }else if(positions[0] === 'top'){
            y = bleeding[0];
        }else if(positions[1] === 'center'){
            y = (plotHeight - bbox.height)/2;
        }else if(positions[1] === 'top'){
            y = bleeding[0];
        }else if(positions[1] === 'bottom'){
            y = plotHeight - bleeding[2] - bbox.height;
        }

        this.x = x;
        this.y = y;

        this.container.translate(x,y);
    }
}