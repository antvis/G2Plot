import React from 'react';
import { InputNumber as AntdInputNumber } from 'antd';
import _ from 'lodash';
import { BaseComponent } from '../base/BaseComponent';
import styles from './index.module.less';

export class InputNumber extends BaseComponent<
  { step?: number },
  null,
  { width?: number }
> {
  renderContent() {
    const { config, attributes, onChange, width = 78 } = this.props;
    const value = _.get(attributes, config.attributeId, config.initialValue);

    return (
      <AntdInputNumber
        value={value}
        step={config.step || 1}
        onChange={v => onChange({ [config.attributeId]: v })}
        style={{ width }}
        size="small"
        className={styles.inputNumber}
      />
    );
  }
}
