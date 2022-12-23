import React from 'react';
import cx from 'classnames';
import { BaseComponent } from '../base/BaseComponent';
import { ColorPicker } from '../ColorPicker';
import { InputNumber } from '../InputNumber';
import { LineDash } from '../LineDash';
import styles from './index.module.less';

type LineSettingProps = {
  attributeIdMap: {
    // 线粗细
    lineWidth?: string;
    // 线颜色
    lineColor?: string;
    // 线 line-dash
    lineDash?: string;
    // 线长度
    length?: string;
  };
};

/**
 * @description 线设置
 *
 * 组合套件
 */
export class LineSetting extends BaseComponent<LineSettingProps> {
  /**
   * @override
   */
  getWrapperStyle() {
    const { config } = this.props;
    const { lineDash: lineDashId, length: lengthId } = config.attributeIdMap;
    if (lineDashId || lengthId) {
      return {
        paddingBottom: lineDashId ? '16px' : 0,
      };
    }
    return {};
  }

  renderContent() {
    const { onChange, attributes, config } = this.props;
    const { attributeIdMap = {} } = config;
    const {
      lineWidth: lineWidthId,
      lineColor: lineColorId,
      lineDash: lineDashId,
      length: lengthId,
    } = attributeIdMap;

    const inline = !(lineDashId || lengthId);

    return (
      <div className={styles.lineSetting}>
        {/* 透传 onChange，attributes */}
        {lineColorId && (
          <ColorPicker
            className={cx(styles.lineColor, { [styles.inline]: inline })}
            attributes={attributes}
            config={{ attributeId: lineColorId }}
            onChange={onChange}
            innerStyle={{ border: 'none' }}
          />
        )}
        {lineWidthId && (
          <InputNumber
            attributes={attributes}
            config={{ attributeId: lineWidthId }}
            onChange={onChange}
            width={lineDashId ? 56 : undefined}
          />
        )}
        {lengthId && (
          <InputNumber
            attributes={attributes}
            config={{ attributeId: lengthId }}
            onChange={onChange}
          />
        )}
        {lineDashId && (
          <LineDash
            attributes={attributes}
            config={{ attributeId: lineDashId }}
            onChange={onChange}
            displayType="inline"
          />
        )}
      </div>
    );
  }
}
