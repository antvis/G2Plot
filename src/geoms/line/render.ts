import { deepMix, isFunction } from '@antv/util';
import { Chart, Geometry } from '@antv/g2';
import { Params } from '../../core/adaptor';
import { tooltip } from '../../common/adaptor';
import { flow } from '../../utils';
import { LineGeoConfig } from './types';



/**
 * 绘制 Line
 * @param chart
 * @param options
 */
export default function renderLine(chart: Chart, lineGeoConfig: LineGeoConfig) {

  // 绘制几何标记
  const line = renderGeometry(chart, lineGeoConfig);

  // 绘制视觉属性
  renderVision(line, lineGeoConfig);  
  
}


/**
 * 绘制几何标记：数据属性 -> 标记
 * 对应 G2 https://antv-g2.gitee.io/zh/docs/api/interfaces/pathcfg
 * @param chart 
 * @param lineGeoConfig 
 * @returns line
 */
function renderGeometry(chart: Chart, lineGeoConfig: LineGeoConfig): Geometry {
  const geometry = 
    chart
      .line({ connectNulls: lineGeoConfig.connectNulls });
  return geometry;
}

/**
 * 绘制视觉通道属性：数据值 -> 视觉通道
 * 对应 G2 https://antv-g2.gitee.io/zh/docs/api/classes/line
 * 
 * @param line 
 * @param lineGeoConfig 
 * @returns line
 */
function renderVision(line: Geometry, lineGeoConfig: LineGeoConfig): Geometry {
  const { xField, yField, seriesField } = lineGeoConfig;
  // 位置
  line.position(`${xField}*${yField}`);
  
 
    
}
