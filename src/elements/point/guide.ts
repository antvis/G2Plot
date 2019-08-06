import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';
import ElementParser from '../base';

function getValuesByField(field, data) {
    const values = [];
    _.each(data, (d) => {
      const v = d[field];
      values.push(v);
    });
    return _.uniq(values);
}

export default class GuidePointParser extends ElementParser{

    public init(){
        const props = this.plot._initialProps;
        if(!props.xField || !props.yField){
            return;
        }
        this.element = {
            type: 'point',
            position:{
                fields: [props.xField, props.yField]
            } 
        };

        if(this._needParseAttribute('color')) this.parseColor();
        if(this._needParseAttribute('size')) this.parseSize();

    }

    public parseColor(){
        const props = this.plot._initialProps;
        const pointStyleProps = props.point.style;
        const config: DataPointType = {};
        if (props.seriesField) {
            this._parseColorBySeries(props,pointStyleProps,config);
        }else{
            if (pointStyleProps && pointStyleProps.color) {
                config.values = [ pointStyleProps.color ];
            } else if (props.color) {
                this.parseColor();
            }
        }
    }

    private _parseColorBySeries(props, pointStyleProps,config){
        config.fields = [ props.seriesField ];
        if (pointStyleProps && pointStyleProps.color) {
            const count = getValuesByField(props.seriesField, props.data).length;
            const values = [];
            for (let i = 0; i < count; i++) {
                values.push(pointStyleProps.color);
            }
            config.values = values;
          }else if(props.color) {
             config.values = this._parseColor(props,config); 
        }
    }

    private _parseColor(props,config){
        if(_.isString(props.color)){
            config.values = [props.color];
       }else if(_.isFunction(props.color)){
           config.callback = props.color;
       }else if(_.isArray(props.color)){
           config.values = props.color;
       }
    }

    public parseSize(){
        const props = this.plot._initialProps;
        const config:DataPointType = {};
        if(props.point.style && props.point.style.color){
            config.values = [props.point.style.size];
        }else{
            /**Point作为辅助图形没有在style里指定size属性的情况下，设置默认值 */
            config.values = [3];
        }
        this.element.size = config;
    }

    public parseShape(){

    }

    private _needParseAttribute(attr){
        const props = this.plot._initialProps;
        const condition = !props.line.style || props.line.style[attr];
        return condition;
    }


    
}