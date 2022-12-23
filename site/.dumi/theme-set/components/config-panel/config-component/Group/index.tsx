import React, { PureComponent } from 'react';
import cx from 'classnames';
import { AttributeTreeProps } from '../../types';
import { AttrLabel } from '../common/AttrLabel';
import styles from './index.module.less';

type GroupConfig = {
  displayType?: 'inline';
};

export class Group extends PureComponent<
  AttributeTreeProps<GroupConfig>,
  { collapsed: boolean }
> {
  state = {
    collapsed: false,
  };

  onCollapse = () => {
    this.setState(old => ({
      collapsed: !old.collapsed,
    }));
  };

  render() {
    const { config, children } = this.props;
    return (
      <div className={`${styles.group} ${styles[config.displayType] || ''}`}>
        <AttrLabel
          config={config}
          canCollapse
          collapsed={this.state.collapsed}
          onClick={this.onCollapse}
          style={{ color: 'rgba(0,0,0,0.85)', padding: '4px 0' }}
        />
        <div
          className={cx(styles.content, {
            [styles.contentCollapsed]: this.state.collapsed,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
}
