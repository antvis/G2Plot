import { PureComponent } from 'react';

export class CollapsePanel extends PureComponent {
  render() {
    const { children } = this.props;
    return children;
  }
}
