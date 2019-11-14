import { Axis } from '@antv/component';
import { BBox } from '@antv/g';
import { getScale, Scale } from '@antv/scale';
import * as _ from '@antv/util';
import ViewLayer,{ ViewLayerConfig } from '../../base/view-layer';
import { getGlobalTheme } from '../../theme/global';


export function getAxisData(viewLayer: ViewLayer,props){
    const  { view } = viewLayer;
    const scales = view.get('scales');
    const scalesInfo = [];
   // get xscale info
   if(props.xField){
       const xscale = scales[props.xField];
       const scaleInfo = {
           dim: 'x',
           scale: xscale,
           originalData: props.data
       };
       scalesInfo.push(scaleInfo);  
   }
   // get yscale info
   if(props.yField){
    const yscale = scales[props.yField];
    const scaleInfo = {
        dim: 'y',
        scale: yscale,
        originalData: props.data
    };
    scalesInfo.push(scaleInfo);  
   }
   return scalesInfo; 
}

export function mergeAxis(axisInfo,dim){
    if(dim === 'x'){
        const xAxisInfo = axisInfo.filter((axis)=>{
            if(axis.dim === 'x'){
                return axis;
            }
        });
        return mergeXAxis(xAxisInfo);
    }else{
        const yAxisInfo = axisInfo.filter((axis)=>{
            if(axis.dim === 'y'){
                return axis;
            }
        });
        return mergeYAxis(yAxisInfo);
    }
}

function mergeXAxis(axisInfo){
    // 判断是否能够合并度量
    const isSameScale = sameScaleTest(axisInfo);
    if(!isSameScale){
        return axisInfo[0].scale;
    }
    if(axisInfo[0].scale.type === 'cat'){
        return getCatScale(axisInfo);
    }else{
       return getLinearScale(axisInfo); 
    }
}

function mergeYAxis(axisInfo){
    const isSameScale = sameScaleTest(axisInfo);
    if(!isSameScale){
        return axisInfo.map((axis)=>{
            return axis.scale;
        });
    }else{
        return getLinearScale(axisInfo);
    }
}

function getLinearScale(axisInfo){
    let scaleMin = axisInfo[0].scale.min;
    let scaleMax = axisInfo[0].scale.max;
    for(const axis of axisInfo){
        scaleMin = Math.min(scaleMin,axis.scale.min);
        scaleMax = Math.max(scaleMax,axis.scale.max);
    }
    const LinearScale = getScale('linear');
    const scale = new LinearScale({
        min: scaleMin,
        max: scaleMax
    });

    return scale;
}

function getCatScale(axisInfo){
    const scaleValues = [];
    for(const axis of axisInfo){
        scaleValues.push(...axis.scale.values);
    }    
    // todo: time cat 重新排序
    const CatScale = getScale('cat');
    const scale = new CatScale({
        values: _.uniq(scaleValues)
    });

    return scale;
}

function sameScaleTest(axisInfo){
    const sampleDataSource = axisInfo[0].originalData;
    const sampleField = axisInfo[0].scale.field;
    for(const axis of axisInfo){
        const data = axis.originalData;
        const field = axis.scale.field;
        // 判断数据源和scale字段
        if(data !== sampleDataSource || field !== sampleField){
            return false;
        }
    }
    return true;
}

export function createAxis(){

}