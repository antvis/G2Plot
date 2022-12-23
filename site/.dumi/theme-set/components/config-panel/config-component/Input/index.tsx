import { Input as AntdInput } from 'antd';
import React from 'react';
import _ from 'lodash';
import { BaseComponent } from '../base/BaseComponent';
import styles from './index.module.less';

export class Input extends BaseComponent {
  renderContent() {
    const { config, attributes, onChange } = this.props;
    const value = _.get(attributes, config.attributeId, config.initialValue);

    return (
      <div className={styles.input}>
        <AntdInput
          value={value}
          onChange={e => onChange({ [config.attributeId]: e.target.value })}
          style={{ width: 78 }}
          size="small"
        />
      </div>
    );
  }
}
