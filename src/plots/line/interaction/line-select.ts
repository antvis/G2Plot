import { get, each, filter } from '@antv/util';
import Interaction from '../../../interaction/core';
import { Geometry } from '../../../dependents';

export default class LineSelect extends Interaction {
  constructor(cfg) {
    super({
      endEvent: 'click',
      ...cfg,
    });
  }

  public start(){
    return;
  }
  
  public end(ev) {
    const target = ev.target;
    const lines: Geometry[] = filter(this.view.geometries, (geom) => geom.type == 'line');
    if (target.get('name') === 'line') {
      const data = get(ev, 'data.data');
      each(lines, (line: Geometry) => {
        each(line.elements, (element) => {
          element.setState('inactive', element.data !== data);
        });
      });
      // TODO： 设置z-index
    } else {
      each(lines, (line: Geometry) => {
        each(line.elements, (element) => {
          element.setState('inactive', false);
        });
      });
      // TODO: 重置z-index
    }
  }
}
