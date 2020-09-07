import { getGeometryLabel } from '@antv/g2';
import { deepMix, isNil, isString } from '@antv/util';
import { parsePercentageToNumber } from '../utils';

const PieLabel = getGeometryLabel('pie');

export class PieInnerLabel extends PieLabel {
  public defaultLayout = 'pie-inner';

  /**
   * 获取 label 的默认配置
   * - 饼图 inner-label 强制不显示 label 牵引线
   */
  protected getDefaultLabelCfg() {
    const cfg = super.getDefaultLabelCfg();
    return deepMix({}, cfg, { labelLine: false });
  }

  /**
   * 获取标签 offset距离（默认 -30% ）
   * todo G2 offset 允许百分比设置后，移除 ts-ignore
   */
  // @ts-ignore
  protected getDefaultOffset(offset: number | string) {
    const coordinate = this.getCoordinate();
    const radius = coordinate.getRadius();
    let innerRadius = 0;
    if (coordinate.innerRadius && coordinate.radius) {
      innerRadius = radius * (coordinate.innerRadius / coordinate.radius);
    }
    let actualOffset = offset;
    if (isString(actualOffset)) {
      actualOffset = (radius - innerRadius) * parsePercentageToNumber(actualOffset);
    }
    return isNil(actualOffset) || actualOffset > 0 ? -(radius - innerRadius) * 0.3 : actualOffset;
  }
}
