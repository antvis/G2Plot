import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import { CommonReactColor } from '../CommonReactColor';
import { BaseComponent } from '../base/BaseComponent';
import styles from './index.module.less';

type State = {
  colorMap: Record<string, string>;
};

export class CustomThemeColor extends BaseComponent<{}, State> {
  state: State = {
    colorMap: {},
  };

  static getDerivedStateFromProps(props) {
    const { attributes, config } = props;

    const obj = {};
    _.forEach(config.colors10 || attributes.colors10, (color, idx) => {
      obj[idx.toString()] = color;
    });
    return {
      colorMap: obj,
    };
  }

  onColorChange = (idx: number, color: string) => {
    const { attributes, onChange } = this.props;
    const { colorMap } = this.state;

    const newColors10 = _.values(
      _.merge({}, colorMap, { [idx.toString()]: color })
    );
    const newColors20 = attributes.colors20;
    const colorIdx = _.find(newColors20, c => c === color);
    if (colorIdx > -1) {
      newColors20[colorIdx] = color;
    }

    onChange({
      defaultColor: newColors10[0],
      colors10: newColors10,
      colors20: newColors20,
    });
  };

  onWholeClick = () => {
    const { config, onChange } = this.props;
    const { colors10, colors20, sequenceColors } = config;
    if (colors10 && colors20) {
      onChange({
        defaultColor: colors10[0],
        colors10,
        colors20,
        sequenceColors,
      });
    }
  };

  /**
   * @override
   */
  getWrapperStyle() {
    return {
      display: 'block',
    };
  }

  renderContent() {
    const { colorMap } = this.state;
    const { config, attributes } = this.props;
    /** 是否视为一个整体 */
    const { asAWhole } = config;
    /** 颜色。默认使用 colors10  */
    const colors = _.values(colorMap);
    const isSelected =
      asAWhole && _.isEqual(config.colors10, attributes.colors10);

    return (
      <div
        className={cx(styles.colorGroup, { [styles.selected]: isSelected })}
        onClick={asAWhole ? this.onWholeClick : null}
        style={{
          border: isSelected
            ? `1px solid ${colors[0]}`
            : '1px solid transparent',
        }}
      >
        {_.map(colors, (color, idx) => {
          return (
            <CommonReactColor
              key={idx.toString()}
              className={styles.colorItem}
              /** 当视为一个整体时，不允许修改子元素color */
              canChangeColor={!asAWhole}
              color={color}
              onChange={color => this.onColorChange(idx, color)}
            />
          );
        })}
      </div>
    );
  }
}
