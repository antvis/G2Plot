import React, { PureComponent } from 'react';
import { Collapse as AntdCollapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { AttributeTree } from '../../AttributeTree';
import { AttributeTreeProps } from '../../types';
import './index.less';

interface Props
  extends AttributeTreeProps<{
    type: string;
    displayName: string;
    children: any[];
  }> {
  t: Function;
}

export class Collapse extends PureComponent<Props> {
  renderPanel = childrenConfig => {
    const t = v => v;
    if (!childrenConfig) return null;

    return childrenConfig.map((config, index) => {
      if (_.size(config.children) > 0) {
        return (
          <AntdCollapse.Panel
            className="custom-panel"
            key={index.toString()}
            header={t(config.displayName)}
          >
            {_.map(config.children, (childConfig, idx) => {
              return (
                <AttributeTree
                  {...this.props}
                  config={childConfig}
                  key={idx.toString()}
                />
              );
            })}
          </AntdCollapse.Panel>
        );
      }
      return (
        <AntdCollapse.Panel
          className="custom-panel empty-panel"
          key={index.toString()}
          header={config.displayName}
        >
          Empty
        </AntdCollapse.Panel>
      );
    });
  };

  render() {
    const { config } = this.props;

    return (
      <div className="tab attribute-panel-tab">
        <AntdCollapse
          bordered={false}
          defaultActiveKey={['0']}
          className="custom-collapse"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          {this.renderPanel(config.children)}
        </AntdCollapse>
      </div>
    );
  }
}
