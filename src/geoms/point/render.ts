import { deepMix, isFunction } from '@antv/util';
import { Chart, Geometry } from '@antv/g2';
import { Params } from '../../core/adaptor';
import { tooltip } from '../../common/adaptor';
import { flow } from '../../utils';
import { PointGeoConfig } from './types';



/**
 * 绘制 Line
 * @param chart
 * @param options
 */
export default function renderPoint(chart: Chart, pointGeoConfig: PointGeoConfig) {

  // 绘制几何标记
  const point = renderGeometry(chart, pointGeoConfig);

  // 绘制视觉属性
  renderVision(point, pointGeoConfig);  
}


/**
 * 绘制几何标记：数据属性 -> 标记
 * 对应 G2 https://antv-g2.gitee.io/zh/docs/api/interfaces/geometrycfg
 * @param chart 
 * @param lineConfig 
 * @returns line
 */
function renderGeometry(chart: Chart, pointGeoConfig: PointGeoConfig): Geometry {
  return chart.point();
}

/**
 * 绘制视觉通道属性：数据值 -> 视觉通道
 * 对应 G2 https://antv-g2.gitee.io/zh/docs/api/classes/line
 * 
 * @param line 
 * @param lineConfig 
 * @returns line
 */
function renderVision(point: Geometry, pointGeoConfig: PointGeoConfig): Geometry {
  const { xField, yField, seriesField, shape, size, style } = pointGeoConfig;
  // 位置
  point.position(`${xField}*${yField}`);

  // size
  if (isFunction(size)) {
    point.size(`${xField}*${yField}*${seriesField}`, size);
  } else if(size){
    point.size(size);
  }

  // shape
  if (isFunction(shape)) {
    point.shape(`${xField}*${yField}*${seriesField}`, shape);
  } else if(shape){
    point.shape(shape);
  }

  // style
  if (isFunction(style)) {
    point.style(`${xField}*${yField}*${seriesField}`, style);
  } else if(style){
    point.style(style);
  }

  return point;
}
