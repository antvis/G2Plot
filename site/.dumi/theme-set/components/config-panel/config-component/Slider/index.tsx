import { Slider as AntdSlider, InputNumber as AntdInputNumber } from 'antd';
import React from 'react';
import _ from 'lodash';
import { BaseComponent } from '../base/BaseComponent';
import styles from './index.module.less';

export class Slider extends BaseComponent<{
  showInputNumber?: boolean;
  min?: number;
  max?: number;
}> {
  renderContent() {
    const { config, attributes, onChange } = this.props;
    const value = _.get(attributes, config.attributeId, config.initialValue);

    return (
      <div className={styles.sliderContainer}>
        <AntdSlider
          className={styles.slider}
          value={value}
          min={config.min}
          max={config.max}
          onChange={v => onChange({ [config.attributeId]: v })}
        />
        {config.showInputNumber && (
          <AntdInputNumber
            className={styles.inputNumber}
            value={value}
            max={config.max}
            min={config.min}
            onChange={v => onChange({ [config.attributeId]: v })}
          />
        )}
      </div>
    );
  }
}
