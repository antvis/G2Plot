import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';

function propertyMapping(source,target,field){
    if(source[field]){
        target[field] = source.field;
    }
}

export default class AxisParser {
    private plot: any;
    private dim: string;
    private localProps: any;
    public config: any;

    constructor(cfg){
        _.assign(this,cfg);
        this._init();
    }

    private _init(){
        this.config = false;
        /**
         * step 1: 判断axis的visibility
         * step 2: 配置项中只声明了走g2底层的default逻辑
         * TODO： 这样太取巧了，待改造
         */
        if(this._needDraw()) {
           console.log( _.keys(this.localProps) );
            if(this.localProps.style){
                this._styleParser();
            }else{
                this.config = {};
            }  
        }
    }

    private _styleParser(){
        this.config = {};
        const axisComponensMapper = [
            { name: 'line', parser: this._lineParser() },
            { name: 'grid', parser: this._gridParser() },
            { name: 'tickLine', parser: this._tickLineParser() },
            { name: 'label', parser: this._labelParser() },
        ];
        
        _.each(axisComponensMapper,(m)=>{
            if(this.localProps[m.name] && this.localProps[m.name].visible) {
                m.parser;
            }else{
                this.config[m.name] = null;
            }
        });

        /** 特殊的坐标轴组件及配置项 */
        if(this.localProps.title) this._titleParser();
        propertyMapping(this.localProps,this.config,'autoHideLabel');
        propertyMapping(this.localProps,this.config,'autoRotateLabel');
    }

    private _needDraw(){
        /** 如果在图表配置项里没有设置坐标轴整体的visibility则去对应的theme取 */
        const propos = this.plot._initialProps;
        const theme = this.plot.plotTheme;
        const propsConfig = propos[`${this.dim}Axis`]? propos[`${this.dim}Axis`] : {};
        const themeConfig = theme.axis[this.dim];
        const config = _.mix({},themeConfig,propsConfig);
        this.localProps = propsConfig;
        if(config.visible){
            return true;
        }
        return false;
    }

    private _lineParser(){
        this.config.line = this.localProps.line;
        if (this.localProps.line.style) {
            this.config.line = this.localProps.line.style;
        }
    }

    private _gridParser(){
        this.config.grid = this.localProps.grid;
        if (this.localProps.grid.style) {
            this.config.grid = this.localProps.grid.style;
        }
    }

    private _tickLineParser(){
        this.config.tickLine = this.localProps.tickLine;
        if (this.localProps.tickLine.style) {
            this.config.tickLine = this.localProps.tickLine.style;
        }
    }

    private _labelParser(){
        let labelConfig:DataPointType = {};
        /** label style */
        if(this.localProps.label.style){
            labelConfig.textStyle = this.localProps.label.style;
        }
        /** label formatter */
        if(this.localProps.label.formatter) {
            const textFormatter = this.localProps.label.formatter;
            this.config.label = (text) => {
              labelConfig.text = textFormatter(text);
              return labelConfig;
            };
        }else{
            this.config.label = labelConfig;
        } 
    }

    private _titleParser(){
        const titleConfig: DataPointType = {};

        if(!this.localProps.title.visible){
            titleConfig.showTitle = false;
        }else{
            titleConfig.showTitle = true;
        }

        if(this.localProps.title.style){
            titleConfig.textStyle = this.localProps.title.style;
        }

        if(this.localProps.title.text){
            titleConfig.text = this.localProps.title.text;
        }

        this.config.title = titleConfig;
    }

    //tempo
    private _processByDefault(){

    }

}