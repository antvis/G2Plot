/**
 * 切换 主题模式组件 白天/黑夜模式
 */
import { Radio as AntdRadio } from 'antd';
import React from 'react';
import { BaseComponent } from '../base/BaseComponent';
import styles from './index.module.less';

export class ThemeStyleSwitcher extends BaseComponent {
  renderContent() {
    const t = (v) => v;
    const changeTheme = (themeType: 'light' | 'dark') => {
      document.body.dataset['theme'] = themeType;
    };

    return (
      <div className={styles.themeStyleSwitcher}>
        <AntdRadio.Group
          className={styles.radioGroup}
          onChange={(e) => changeTheme(e.target.value)}
          defaultValue="light"
        >
          <AntdRadio.Button className={styles.radioButton} value="light">
            {t('白天模式')}
          </AntdRadio.Button>
          <AntdRadio.Button className={styles.radioButton} value="dark">
            {t('黑夜模式')}
          </AntdRadio.Button>
        </AntdRadio.Group>
      </div>
    );
  }
}
