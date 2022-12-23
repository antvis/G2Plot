import React from 'react';
import _ from 'lodash';
import { BaseComponent } from '../base/BaseComponent';
import { CommonReactColor } from '../CommonReactColor';

export class ColorPicker extends BaseComponent<
  { step?: number },
  null,
  { innerStyle?: React.CSSProperties }
> {
  onColorChange = color => {
    const { config, onChange } = this.props;
    onChange({ [config.attributeId]: color });
  };

  renderContent() {
    const { config, attributes, innerStyle } = this.props;
    const color =
      _.get(attributes, config.attributeId, config.initialValue) ||
      'transparent';

    return (
      <CommonReactColor
        color={color}
        onChange={this.onColorChange}
        style={innerStyle}
      />
    );
  }
}
