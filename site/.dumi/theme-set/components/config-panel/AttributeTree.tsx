import React, { PureComponent } from 'react';
import _ from 'lodash';
import configComponents from './config-component';
import { AttributeTreeProps } from './types';

function titleCase(type: string) {
  const s = _.camelCase(type);
  return s ? `${s[0].toUpperCase()}${s.substring(1)}` : s;
}

export class AttributeTree extends PureComponent<AttributeTreeProps> {
  /** 递归渲染 */
  renderChildren = (children: AttributeTreeProps['config']['children']) => {
    return _.map(children, (child, idx) => {
      return <AttributeTree {...this.props} key={`${idx}`} config={child} />;
    });
  };

  /** 获取组件状态 */
  getStatus(): string[] {
    const { config, attributes } = this.props;

    const status = [];
    const relations = _.filter(
      this.props.relations,
      r => r.toAttributeId === config.attributeId
    );
    _.each(relations, ({ fromAttributeId, value, operator, action }) => {
      const fromAttributeValue = _.get(attributes, fromAttributeId);
      if (operator === '=' && fromAttributeValue === value) {
        status.push(action);
      } else if (operator === '!=' && fromAttributeValue !== value) {
        status.push(action);
      }
    });
    return status;
  }

  render() {
    const { config } = this.props;
    const Component = configComponents[titleCase(config.type)];

    const status = this.getStatus();
    const show =
      Component && config.show !== false && _.indexOf(status, 'hidden') === -1;

    // 默认展示
    return show ? (
      <Component {...this.props}>
        {this.renderChildren(config.children)}
      </Component>
    ) : null;
  }
}
