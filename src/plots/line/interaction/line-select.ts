import { Interaction } from '../../../dependents';

export default class LineSelect extends Interaction {
  // TODO:
  // constructor(cfg) {
  //   super({
  //     endEvent: 'click',
  //     ...cfg,
  //   });
  // }
  // public end(ev) {
  //   const target = ev.target;
  //   if (target.name === 'line') {
  //     const data = ev.data[0]._origin;
  //     this.view.setInactive((obj) => {
  //       return obj !== data;
  //     });
  //     // TODO： 设置z-index
  //   } else {
  //     this.view.setInactive(() => {
  //       return false;
  //     });
  //     // TODO: 重置z-index
  //   }
  // }
}
