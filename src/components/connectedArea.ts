/**
 * 区域连接组件，用于堆叠柱状图和堆叠条形图
 */
import { Group, Shape, Shapes } from '@antv/g';
import { View } from '@antv/g2';
import * as _ from '@antv/util';

function parsePoints(shape){
    const parsedPoints = [];
    const coord = shape.get('coord');
    const points = shape.get('origin').points;
    _.each(points,(p)=>{
        parsedPoints.push(coord.convertPoint(p));
    })
    return parsedPoints;
}

function getDefaultStyle(){
    return {
        areaStyle:{
            opacity: 0.2
        },
        lineStyle:{
            lineWidth: 2,
            opacity: 0.1
        }
    };
}

export default class ConnectedArea {
    private view: View;
    private container: Group;
    private field: string; // 堆叠字段
    private areas: Shape[] = [];
    private lines: Shape[] = [];
    private areaStyle:any;
    private _areaStyle: any = {};
    private lineStyle:any;
    private _lineStyle: any = {};
    private triggerOn: string;
    private animation: boolean;

    constructor(cfg){
        _.assign(this,cfg);
        this._init();
    }

    public draw(){
        const layer = this.view.get('backgroundGroup');
        this.container = layer.addGroup();
        const groupedShapes = this._getGroupedShapes();
        _.each(groupedShapes,(shaps,name)=>{
            this._drawConnection(shaps,name);
        });
        if(this.triggerOn){
            this._addInteraction();
        }else if(this.animation){
            // 如果定义了triggerOn的方式，则组件是响应交互的，初始化为不可见状态，因此无需动画
            this._initialAnimation();
        }
    }
    public clear(){
        if(this.container){
            this.container.clear();
        }
        this.areas= [];
        this.lines = [];
    }

    public destory(){
        if(this.container){
            this.container.remove();
        }
    }

    private _init(){
        this.draw();
        this.view.on('beforerender', () => {
            this.clear();
        });
    }

    private _getGroupedShapes(){
        // 根据堆叠字段对shape进行分组
        const { values } = this.view.get('scales')[this.field];
        const geometry = this.view.get('elements')[0];
        const shapes = geometry.getShapes();
        // 创建分组
        const groups = {};
        _.each(values,(v)=>{
            groups[v]= [];
        });
        // 执行分组
        _.each(shapes,(shape)=>{
            const origin = shape.get('origin')._origin;
            const key = origin[this.field];
            groups[key].push(shape);
        });
        return groups;
    }

    private _drawConnection(shapes,name){
        // tslint:disable-next-line: prefer-for-of
        const originColor = shapes[0].attr('fill');
        this._areaStyle[name] = this._getShapeStyle(originColor, 'area');
        this._lineStyle[name] = this._getShapeStyle(originColor, 'line');
        for(let i = 0; i < shapes.length-1; i++){
            const current = parsePoints(shapes[i]);
            const next = parsePoints(shapes[i+1]);
            // const { areaStyle,lineStyle } = getDefaultStyle();
            const areaStyle  = _.mix({},this._areaStyle[name]);
            const lineStyle =  _.mix({},this._lineStyle[name]);
            if(this.triggerOn){
                areaStyle.opacity = 0;
                lineStyle.opacity = 0;
            }
            const area = this.container.addShape('path',{
                attrs:_.mix({} as any, areaStyle, {
                    path:[
                        [ 'M', current[2].x, current[2].y ],
                        [ 'L', next[1].x, next[1].y ],
                        [ 'L', next[0].x, next[0].y ],
                        [ 'L', current[3].x, current[3].y ],
                    ],
                    // fill: shapes[i].attr('fill'),
                }),
                name:'connectedArea'
            });
            const line = this.container.addShape('path',{
                attrs:_.mix({} as any,lineStyle,{
                    path:[
                        ['M',current[2].x, current[2].y],
                        ['L',next[1].x, next[1].y]
                    ],
                    // stroke: shapes[i].attr('fill'),
                }),
                name:'connectedArea'
            });
            // 在辅助图形上记录数据，用以交互和响应状态量
            const originData = shapes[i].get('origin')._origin;
            area.set('data',originData[this.field]);
            line.set('data',originData[this.field]);
            this.areas.push(area);
            this.lines.push(line);
        }
    }

    private _getShapeStyle(originColor,shapeType){
        const styleName = `${shapeType}Style`;
        // 如果用户自己指定了样式，则不采用默认颜色映射
        if(this[styleName]){
            return this[styleName];
        }
        const defaultStyle = getDefaultStyle()[styleName];
        let mappedStyle:any = { fill: originColor};
        if(shapeType === 'line'){
            mappedStyle = { stroke: originColor };
        }

        return _.mix(defaultStyle,mappedStyle);
    }

    private _addInteraction(){
        const eventName = this.triggerOn;
        this.view.on(`interval:${eventName}`,(e)=>{
            const origin = e.target.get('origin')._origin[this.field];
            this._onActive(origin);
            this._onDisabled(origin);
            this.view.get('canvas').draw();
        });
        // 当鼠标移动到其他区域时取消显示
        this.view.on('mousemove',(e)=>{
            if(e.target.name !== 'interval'){
                this._onDisabled({});
            }
        });
    }

    private _onActive(data){
        _.each(this.areas,(area)=>{
            const shapeData = area.get('data');
            if(shapeData === data){
                area.attr('opacity',this._areaStyle[data].opacity || 1);
            }
        });
        _.each(this.lines,(line)=>{
            const shapeData = line.get('data');
            if(shapeData === data){
                line.attr('opacity',this._lineStyle[data].opacity || 1);
            }
        });
    }

    private _onDisabled(data){
        _.each(this.areas,(area)=>{
            const shapeData = area.get('data');
            if(shapeData !== data){
                area.attr('opacity',0);
            }
        });
        _.each(this.lines,(line)=>{
            const shapeData = line.get('data');
            if(shapeData !== data){
                line.attr('opacity',0);
            }
        });
    }

    private _initialAnimation(){
        // clipIn动画
        const {start,end,width,height} = this.view.get('coord');
        const clipRect = new Shapes.Rect({
            attrs:{
                x: start.x,
                y: end.y,
                width:0,
                height,
            }
        });
        this.container.attr('clip', clipRect);
        this.container.setSilent('animating', true);
        clipRect.animate({
            width
        }, 600, 'easeQuadOut',()=>{},400);
    }
}