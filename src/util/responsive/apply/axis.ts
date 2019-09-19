import * as _ from '@antv/util';
import ShapeNodes from '../node/shapeNodes';
import Responsive from '../responsive';
import ApplyResponsive from './base';

const SCALE_MAPPER = {
    cat:'category',
    timeCat: 'category',
    time: 'dateTime',
    linear: 'linear'
};

function updateTicks(nodes, axis) {
    const tickShape = axis.get('group').get('children')[0];
    const ticks = axis.get('ticks');
    const tickItems = axis.get('tickItems');
    const tickTexts = [];
    _.each(ticks, (tick) => {
      const t = tick as any;
      tickTexts.push(t.text);
    });
    let pathes = [];
    _.each(nodes.nodes, (node) => {
      const n = node as any;
      if (n.width > 0 && n.height > 0) {
        const text = n.shape.get('origin').text;
        const index = tickTexts.indexOf(text);
        const tickItem = tickItems[index];
        pathes.push(['M', tickItem.x1, tickItem.y1], ['L', tickItem.x2, tickItem.y2]);
      }
    });
  
    if (pathes.length === 0) {
      pathes = [['M', 0, 0]];
    }
  
    tickShape.attr('path', pathes);
  }

export default class ApplyResponsiveAxis extends ApplyResponsive {

    private dim: string;

    protected shouldApply(){
        if(!this.responsiveTheme.axis){
            return false;
        }
        if(this.responsiveTheme.axis[this.dim] && this.type){
            return true;
        }
        return false;
    }

    protected apply(){
        const axisIndex = this.dim === 'x' ? 0 : 1;
        const axis = this.plot.plot.get('axisController').axes[ axisIndex ];
        const rawLabels = axis.get('labelRenderer').get('group').get('children');
        const shapes = [];
        for (let i = 0; i < rawLabels.length - 1; i++) {
            shapes.push(rawLabels[i]);
        }
        const shapeNodes = new ShapeNodes({
            shapes,
        });
        const { constraints, rules } = this.responsiveTheme.axis.x[this.type];
        new Responsive({
            nodes: shapeNodes,
            constraints,
            region: this.plot.plot.get('viewRange'),
            rules,
            plot: this.plot,
            onEnd: (nodes) => {
                if (axis.get('tickLine')) {
                    updateTicks(nodes, axis);
                }
            },
        });
    }

    protected getType(){
        const props = this.plot._initialProps;
        const axis = `${this.dim}Axis`;
        const field = `${this.dim}Field`;
        if(props[axis] && props[axis].type && props[axis].type === 'dateTime'){
          return 'dateTime';
        }
        const scaleType = this.plot.plot.get('scales')[props[field]].type;
        return SCALE_MAPPER[scaleType];
    }
    
}