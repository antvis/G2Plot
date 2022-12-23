import React from 'react';
import _ from 'lodash';
import { BaseComponent } from '../base/BaseComponent';
import { ColorPicker } from '../ColorPicker';
import { InputNumber } from '../InputNumber';
import { Select } from '../Select';
import { FONT_WEIGHT_OPITONS } from './constant';
import styles from './index.module.less';

type FontSettingProps = {
  attributeIdMap: {
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: string;
    opacity?: string;
  };
};

/**
 * @description 字体设置
 *
 * 组合套件: 字体颜色 + 字体大小 + 字体 + (字重 + 对齐方式)
 */
export class FontSetting extends BaseComponent<FontSettingProps> {
  renderContent() {
    const { onChange, attributes, config } = this.props;
    const { attributeIdMap = {}, initialValue } = config;
    const {
      fontColor: fontColorId,
      fontFamily: fontFamilyId,
      opacity: opacityId,
      fontSize: fontSizeId,
      fontWeight: fontWeightId,
    } = attributeIdMap;

    return (
      <div className={styles.fontSetting}>
        {/* 透传 onChange，attributes */}
        {fontColorId && (
          <ColorPicker
            className={styles.fontColor}
            attributes={attributes}
            config={{ attributeId: fontColorId }}
            onChange={onChange}
            innerStyle={{ border: 'none' }}
          />
        )}
        {fontSizeId && (
          <InputNumber
            attributes={attributes}
            config={{
              attributeId: fontSizeId,
              initialValue: initialValue?.['fontSize'],
            }}
            onChange={onChange}
          />
        )}
        {opacityId && (
          <InputNumber
            attributes={attributes}
            config={{ attributeId: opacityId }}
            onChange={onChange}
          />
        )}
        {/* {fontFamilyId && (
          <Select attributes={attributes} config={{ attributeId: fontFamilyId, options: [] }} onChange={onChange}  />
        )} */}
        {fontWeightId && (
          <Select
            attributes={attributes}
            config={{ attributeId: fontWeightId, options: FONT_WEIGHT_OPITONS }}
            onChange={onChange}
          />
        )}
      </div>
    );
  }
}
