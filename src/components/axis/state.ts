import * as _ from '@antv/util';

// 对axis label和label样式进行缓存
let labels;
let originAttrs;

function onActive(plot,condition){

}

function onDisable(plot,condition){
    if(!labels){
        getAllAxisLabels(plot);
    }
    _.each(labels,(label,index)=>{
    });
}

function getAllAxisLabels(plot){
    labels = [];
    originAttrs = [];
    const axes = plot.plot.get('axisController').axes;
    _.each(axes,(axis)=>{
        const labelShapes = axis.get('labelRenderer').get('group').get('children');
        _.each(labelShapes,(shape)=>{
            if(shape.type === 'text'){
                labels.push(shape);
                originAttrs.push(shape.attr());
            }
        });
    });
}

export default {
    active: onActive,
    selected: onActive,
    disable: onDisable,
};