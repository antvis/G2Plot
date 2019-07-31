import ShapeNodes from '../../../util/responsive/shapeNodes';
import Responsive from '../../../util/responsive/responsive';
import responsiveTheme from '../../../theme/responsive';
import * as _ from '@antv/util';

export default function responsivePointLabel(plot){
    /**判断是否应用响应式规则 */
    if(isPointLabel(plot)){
        const labelShapes = plot.plot.get('elements')[0].get('labels');
        const nodes = new ShapeNodes({
            shapes:labelShapes,
        });
        const tolerance = getGlobalTolerance(nodes.nodes);
        const { constraints, rules } = responsiveTheme.labels.line;
        new Responsive({
            nodes,
            constraints,
            rules,
            cfg:{
                tolerance
            }
        });
    }
}

function isPointLabel(plot){
    if(plot.line.label && plot.line.label.labelType && plot.line.label.labelType === 'point'){
        return true;
    }
    return false;
}

function getGlobalTolerance(nodes){
    const nodesClone = _.deepMix([],nodes);
    nodesClone.sort((a,b)=>{
        return b.width - a.width;
    });
    return Math.round(nodesClone[0].width);
}

function getLocalMaxMin(width,nodes){
    const batchNumber = 20;
    const batchSize = width / 20;
    const batches = [];
    /** 创建batch */
    for(let i =0; i<batchNumber; i++){
        const localLeft = i * batchSize;
        const localRight = (i+1) * batchSize;
        const batchData = {
            range: [localLeft, localRight],
            nodes: [],
            min: Infinity,
            max: -Infinity
        };
        batches.push(batchData);
    }
    /** 将nodes填入batch */
    _.each(nodes,(node)=>{
        const batchIndex = Math.floor(nodes.center / batchSize);
        batches[batchIndex].nodes.push(node);
    });

}
