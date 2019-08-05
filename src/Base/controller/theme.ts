import * as _ from '@antv/util';
import Theme from '../../theme';
import { processAxisVisible } from '../../util/axis';
import * as G2 from '@antv/g2';

/**
 * 负责图表theme的管理
 */

const G2DefaultTheme = G2.Global.theme;

 export default class ThemeController {
    private plot: any;
    public plotTheme: any;
    public theme: any;

    constructor(cfg) {
        _.assign(this,cfg);
        this._init();
    }

    private _init(){
        this.plotTheme = this._getTheme();
        this.theme = this._G2ThemeParser();
    }

    private _getTheme(){
        const props = this.plot._initialProps;
        let userPlotTheme = {};
        const propsTheme = props.theme;
        if (propsTheme) {
            // theme 以 name 的方式配置
            if (_.isString(propsTheme)) {
                userPlotTheme = Theme.getThemeByName(propsTheme).getPlotTheme(this.plot.type);
            } else {
                userPlotTheme = props.theme;
            }
        }
        const globalTheme = Theme.getCurrentTheme();
        
        return _.deepMix({}, globalTheme.getPlotTheme(this.plot.type), userPlotTheme);
    }

    private _G2ThemeParser(){
        const plotG2Theme = Theme.convert2G2Theme(this.plotTheme);
        const g2Theme = _.deepMix({}, G2DefaultTheme, plotG2Theme);
        this._processVisible(g2Theme);
        return g2Theme;
    }

    private _processVisible(theme) {
        processAxisVisible(theme.axis.left);
        processAxisVisible(theme.axis.right);
        processAxisVisible(theme.axis.top);
        processAxisVisible(theme.axis.bottom);
        return theme;
    }
 }