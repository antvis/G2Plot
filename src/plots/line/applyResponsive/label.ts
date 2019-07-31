import ShapeNodes from '../../../util/responsive/shapeNodes';
import Responsive from '../../../util/responsive/responsive';
import responsiveTheme from '../../../theme/responsive';
import * as _ from '@antv/util';

export default function responsivePointLabel(plot){
    /**判断是否应用响应式规则 */
    if(isPointLabel(plot)){
        console.log(plot.plot.get('elements'));
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