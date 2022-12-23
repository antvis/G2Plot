import { Checkbox as AntdCheckbox } from 'antd';
import React from 'react';
import _ from 'lodash';
import { BaseComponent } from '../base/BaseComponent';

export class Checkbox extends BaseComponent {
  renderContent() {
    const { config, attributes, onChange } = this.props;
    const value = _.get(attributes, config.attributeId, config.initialValue);

    return (
      <AntdCheckbox
        checked={value}
        onChange={e => onChange({ [config.attributeId]: e.target.checked })}
      />
    );
  }
}
