import { GeometryLabel, registerGeometryLabel } from '@antv/g2';

// Step 1
// 自定义 Label 类
// 需要继承 GeometryLabel 基类
class VennLabel extends GeometryLabel {
  /**
   * 获取每个 label 的位置
   * @param labelCfg
   * @param mappingData
   * @param index
   * @returns label point
   */
  protected getLabelPoint(labelCfg, mappingData, index: number) {
    const { x, y } = labelCfg.data;
    const { offsetX, offsetY } = labelCfg.customLabelInfo;
    return {
      content: labelCfg.content[index],
      x: x + offsetX,
      y: y + offsetY,
    };
  }
}

// Step 2: 注册 CustomLabel
registerGeometryLabel('venn', VennLabel);
