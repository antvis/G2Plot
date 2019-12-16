import { registerElement, Element } from '@antv/g2';
import { each } from '@antv/util';
import { sturges } from '../../util/math';

const radius  = 10;
const decreaseRatio = 0.05;


class ContourHeatmap extends Element {
  constructor(cfg) {
    super({
      type: 'contourHeatmap',
      shapeType: 'point',
      paletteCache: {},
      ...cfg,
    });
  }

  public draw(data){
    const { width,height,start,end } = this.get('coord');
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const colorScale = this.getColorScale();
    const xMin = xScale.min;
    const xMax = xScale.max;
    const yMin = yScale.min;
    const yMax = yScale.max;
    const colorMin = colorScale.min;
    const colorMax = colorScale.max;
    const threshold = sturges(data);    
    // create binary data

  }

  public clear(){

  }

private calDensity(x,y,data){
  const density  = 0;
  each(data,(d)=>{
    const dist = Math.sqrt((d.x - x) * (d.x - x) + (d.y -y) * (d.y - y));
    console.log(dist);
  });

}

  private getColorScale(){
    const scales = this.get("scales");
    const colorField = this.get('color').fields[0];
    return scales[colorField];
  }

  private matchingSquar(values,threshold){

  }

}

registerElement('contourHeatmap', ContourHeatmap);
