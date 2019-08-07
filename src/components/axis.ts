import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';

export default class AxisParser {
    private plot: any;
    private dim: string;
    private localProps: any;
    public config: any;

    constructor(cfg){
        _.assign(this,cfg);
        this.init();
    }

    public init(){
        this.config = null;
        if(this._needDraw()) this.styleParser();
    }

    public styleParser(){
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
        if(this.localProps.autoHideLabel) this.config.autoHideLabel = this.localProps.autoHideLabel;
        if(this.localProps.autoRotateLabel) this.config.autoRotateLabel = this.localProps.autoRotateLabel;
    }

    private _needDraw(){
        const propos = this.plot._initialProps;
        const theme = this.plot.plotTheme;
        const propsConfig = propos[`${this.dim}Axis`]? propos[`${this.dim}Axis`] : {};
        const themeConfig = theme.axis[this.dim];
        const config = _.mix({},themeConfig,propsConfig);
        this.localProps = config;
        if(config.visible){
            return true;
        }
        return false;
    }

    private _lineParser(){
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

        this.config.title = titleConfig;
    }

}