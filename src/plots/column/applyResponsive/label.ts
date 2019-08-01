import ShapeNodes from '../../../util/responsive/shapeNodes';
import Responsive from '../../../util/responsive/responsive';
import responsiveTheme from '../../../theme/responsive';
import * as _ from '@antv/util';

export default function responsiveLabel(plot){
    /** 判断是否应用响应式规则 */
    if(isTopLabel(plot)){
        const element = plot.plot.get('elements')[0];
        const labelsContainer = element.get('labelController').labelsContainer;
        const labelFiled = plot.column.label.fields[0];
        console.log(labelFiled);
        const labelShapes = element.get('labels');
        const nodes = new ShapeNodes({
            shapes:labelShapes,
        });
        const region = plot.plot.get('panelRange');
        const { constraints, rules } = responsiveTheme.labels.column;
        new Responsive({
            nodes,
            constraints,
            rules,
            region,
            cfg:{
                labelsContainer,
                element
            }
        });
    }
}

function isTopLabel(plot){
    if(plot.column.label){
        if(!plot.column.label.position || plot.column.label.position === 'top' ){
            return true;
        }
    }
    return false;
}

function getStateNodes(nodes,field){
    

}