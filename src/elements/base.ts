import * as _ from '@antv/util';
import { ElementOption } from '../interface/config';

export default class ElementParser {
    public plot: any;
    private type: string;
    private positionFields: string[];
    public element: ElementOption;

    constructor (cfg){
        _.assign(this,cfg);
        this.init();
    }

    public init(){
        this.element = {
            type: this.type,
            position: {
                fields: this.positionFields
            }
        }; 
    }
}