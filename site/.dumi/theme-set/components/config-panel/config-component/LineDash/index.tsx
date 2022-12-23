import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import { InputNumber as AntdInputNumber } from 'antd';
import { AttributeTreeProps } from '../../types';
import styles from './index.module.less';

export const LineDash: React.FC<
  AttributeTreeProps & { displayType?: 'inline' }
> = props => {
  const { config, attributes, onChange, displayType } = props;
  const { displayName } = config;

  const value = _.get(attributes, config.attributeId);
  const dash = _.get(value, 0);
  const gap = _.get(value, 1);

  const onValueChange = (type: 'dash' | 'gap', v) => {
    let newValue =
      type === 'dash' ? _.concat([], value[1], v) : _.concat([], value[0], v);
    onChange({ [config.attributeId]: newValue });
  };

  return (
    <div
      className={cx(styles.lineDash, {
        [styles.inline]: displayType === 'inline',
      })}
    >
      <span>{displayName}</span>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentItemLabel}>dash</span>
          <AntdInputNumber
            value={dash}
            size="small"
            style={{ width: 48 }}
            onChange={value => onValueChange('dash', value)}
          />
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentItemLabel}>gap</span>
          <AntdInputNumber
            size="small"
            value={gap}
            style={{ width: 48 }}
            onChange={value => onValueChange('gap', value)}
          />
        </div>
      </div>
    </div>
  );
};
