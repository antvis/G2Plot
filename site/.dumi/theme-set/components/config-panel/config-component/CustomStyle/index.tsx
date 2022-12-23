import React from 'react';
import { Input as AntdInput } from 'antd';
import _ from 'lodash';
import styles from './index.module.less';
import { BaseComponent } from '../base/BaseComponent';

const { TextArea } = AntdInput;

type SelectConfig = {
  options: { label: string; value: string }[];
};

type State = { value: string };

export class CustomStyle extends BaseComponent<SelectConfig, State> {
  state = {
    value: '',
  };

  static getDerivedStateFromProps(props) {
    const { config, attributes } = props;

    let v = '';
    try {
      v = JSON.stringify(_.get(attributes, config.attributeId), null, '\t');
    } catch (e) {}

    return {
      value: v,
    };
  }

  renderContent() {
    const { config, onChange } = this.props;
    const { value } = this.state;

    const onPressEnter = evt => {
      try {
        const style = JSON.parse(evt.target.value);
        onChange({ [config.attributeId]: style });
      } catch (e) {}
    };

    return (
      <div className={styles.customStyle}>
        <TextArea
          value={value}
          onPressEnter={onPressEnter}
          onChange={e => this.setState({ value: e.target.value })}
          size="small"
          autoSize={{ minRows: 2, maxRows: 10 }}
        />
      </div>
    );
  }
}
