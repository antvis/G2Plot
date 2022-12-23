import { Select as AntdSelect } from 'antd';
import React from 'react';
import _ from 'lodash';
import { BaseComponent } from '../base/BaseComponent';
import styles from './index.module.less';

const { Option } = AntdSelect;

type SelectConfig = {
  options: { label: string; value: string }[];
};

export class Select extends BaseComponent<SelectConfig> {
  renderContent() {
    const { config, attributes, onChange } = this.props;
    const value = _.get(attributes, config.attributeId);

    const style = config.displayName
      ? { width: '78px' }
      : { width: '100%', minWidth: '78px' };

    return (
      <AntdSelect
        value={value}
        onChange={v => onChange({ [config.attributeId]: v })}
        style={style}
        size="small"
        className={styles.select}
      >
        {_.map(config.options, (option, idx) => {
          return (
            <Option key={idx.toString()} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </AntdSelect>
    );
  }
}
