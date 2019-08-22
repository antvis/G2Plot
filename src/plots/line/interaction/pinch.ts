import MobileInteraction from '../../../interaction/mobileInteraction';

export default class Pinch extends MobileInteraction {
  constructor(cfg) {
    super({
      startEvent: 'pinchStart',
      processEvent: 'pinchMove',
      endEvent: 'pinchEnd',
    });
  }

  public start(ev) {}

  public process(ev) {}

  public end(ev) {}
}
