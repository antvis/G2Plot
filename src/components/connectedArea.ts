/**
 * 区域连接组件，用于堆叠柱状图和堆叠条形图
 */
import { Group, Shape } from '@antv/g';
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
    private triggerOn: string;

    constructor(cfg){
        _.assign(this,cfg);
        this._init();
    }

    public draw(){
        const layer = this.view.get('backgroundGroup');
        this.container = layer.addGroup();
        const groupedShapes = this._getGroupedShapes();
        _.each(groupedShapes,(shaps)=>{
            this._drawConnection(shaps);
        });
        if(this.triggerOn){
            this._addInteraction();
        }
    }
    public clear(){
        
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

    private _drawConnection(shapes){
        // tslint:disable-next-line: prefer-for-of
        for(let i = 0; i < shapes.length-1; i++){
            const current = parsePoints(shapes[i]);
            const next = parsePoints(shapes[i+1]);
            const { areaStyle,lineStyle } = getDefaultStyle();
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
                    fill: shapes[i].attr('fill'),
                })
            });
            const line = this.container.addShape('path',{
                attrs:_.mix({} as any,lineStyle,{
                    path:[
                        ['M',current[2].x, current[2].y],
                        ['L',next[1].x, next[1].y]
                    ],
                    stroke: shapes[i].attr('fill'),
                })
            });
            // 在辅助图形上记录数据，用以交互和响应状态量
            const originData = shapes[i].get('origin')._origin;
            area.set('data',originData[this.field]);
            line.set('data',originData[this.field]);
            this.areas.push(area);
            this.lines.push(line);
        }
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
        const { areaStyle,lineStyle } = getDefaultStyle();
        _.each(this.areas,(area)=>{
            const shapeData = area.get('data');
            if(shapeData === data){
                area.attr('opacity',areaStyle.opacity);
            }
        });

        _.each(this.lines,(line)=>{
            const shapeData = line.get('data');
            if(shapeData === data){
                line.attr('opacity',lineStyle.opacity);
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

}