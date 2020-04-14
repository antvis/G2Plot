import BaseInteraction from './base';

export default class BrushInteraction extends BaseInteraction {

    protected brushShape;

    protected start(){
        console.log('brush');
    }

    protected process(){

    }

    protected end(){

    }

    protected reset(){

    }

    protected clear(){

    }

    protected getDefaultCfg() {
        return {
          startEvent: 'dragstart',
          processEvent: 'drag',
          endEvent: 'dragend',
          resetEvent: 'dblclick',
        };
    }
}

BaseInteraction.registerInteraction('drilldown', BrushInteraction);