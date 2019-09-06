/**
 * 区域连接组件，用于堆叠柱状图和堆叠条形图
 */
import { Group } from '@antv/g';
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

export default class ConnectedArea {
    private view: View;
    private container: Group;
    private field: string; // 堆叠字段

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
            const path = [
                 [ 'M', current[2].x, current[2].y ],
                 [ 'L', next[1].x, next[1].y ],
                 [ 'L', next[0].x, next[0].y ],
                 [ 'L', current[3].x, current[3].y ],
            ];
            this.container.addShape('path',{
                attrs:{
                    path,
                    fill:shapes[i].attr('fill'),
                    opacity: 0.2
                }
            });
        }
    }

}