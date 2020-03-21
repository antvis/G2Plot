import { each, filter, get } from '@antv/util';
import Interaction from '../../../interaction/core';
import { Geometry } from '../../../dependents';

export default class LineActive extends Interaction {
  constructor(cfg) {
    super({
      /** 没有用 line:mouseenter 和 line:mouseleave 事件，是因为可能在多条折线的情况下，从一条线滑动到另一条会同时触发process和reset，使画面出现闪动 */
      processEvent: 'mousemove',
      ...cfg,
    });
  }

  public start(){
    return;
  }

  public process(ev) {
    const lines: Geometry[] = filter(this.view.geometries, (geom) => geom.type == 'line');
    const target = ev.target;
    if (target.get('name') === 'line') {
      const data = get(ev, 'data.data');
      each(lines, (line: Geometry) => {
        each(line.elements, (element) => {
          element.setState('active', element.data === data);
        });
      });
    } else {
      each(lines, (line: Geometry) => {
        each(line.elements, (element) => {
          element.setState('active', false);
        });
      });
    }
  }
}
