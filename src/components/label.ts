import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';

export default class LabelParser{
    private plot: any;
    public config: any;

    constructor(cfg){
        this.plot = cfg.plot;
        this._init(cfg);
    }

    private _init(cfg){
        const labelProps = this.plot._initialProps.label;
        this.config.field = cfg.field;
        this.config.labelType = cfg.labelType;
        this.config.callback = (val) => {
            return this._parseCallBack(val);
        };
    }

    private _parseCallBack(val){
        const labelProps = this.plot._initialProps.label;
        const config: DataPointType = {};
        this._parseOffset(labelProps,config);
        if(labelProps.formatter){
            config.content = labelProps.formatter(val);
        }
        if(labelProps.style){
            config.textStyle = labelProps.style;
        }
        return config;
    }

    private _parseOffset(props,config){
        const mapper = ['offset','offsetX','offsetY'];
        _.each(mapper,(m)=>{
            if(props[m]) config[m] = props[m];
        });
    }
}