import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { AttrLabel } from '../../common/AttrLabel';
import { AttributeTreeProps } from '../../../types';
import styles from './index.module.less';

type Props<C> = AttributeTreeProps<C> & {
  style?: React.CSSProperties;
  className?: string;
};

export abstract class BaseComponent<C = {}, S = {}, P = {}> extends Component<
  Props<C> & P,
  S
> {
  abstract renderContent(): React.ReactElement | React.ReactElement[];

  /**
   * @override 属性面板组件 wrapper 容器样式
   * @returns
   */
  protected getWrapperStyle(): React.CSSProperties {
    return {};
  }

  render() {
    const { config, style, className } = this.props;
    const wrapperStyle = _.merge({}, this.getWrapperStyle(), style);
    return (
      <div className={cx(styles.attrComponent, className)} style={wrapperStyle}>
        <AttrLabel config={config} />
        {this.renderContent()}
      </div>
    );
  }
}
