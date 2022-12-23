import { Input as AntdInput } from 'antd';
import React, { CSSProperties } from 'react';
import _ from 'lodash';
import { BaseComponent } from '../base/BaseComponent';
import styles from './index.module.less';

const DEFAULT_STYLE: CSSProperties = {
  gridTemplateColumns: 'repeat(2, 50%)',
  gridTemplateRows: 'repeat(auto-fill, 1fr)',
};

export class GridLayout extends BaseComponent {
  /**
   * @override
   */
  getWrapperStyle() {
    return {
      display: 'block',
    };
  }

  renderContent() {
    const { config, children } = this.props;
    const style = _.merge(
      {},
      DEFAULT_STYLE,
      _.omit(config, ['attributeId', 'displayName', 'children'])
    );

    return (
      <div className={styles.gridLayout} style={style}>
        {children}
      </div>
    );
  }
}
