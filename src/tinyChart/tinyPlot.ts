import * as _ from '@antv/util';
import BasePlot from '../Base/plot';
import BaseConfig from '../interface/config';
import {getComponent} from '../components/factory';
import '../geoms/line/mini';

export interface TinyConfig extends BaseConfig {
    indicator?: any
}

export default class TinyPlot<T extends TinyConfig = TinyConfig> extends BasePlot<T>{

    protected _setDefaultG2Config() { }

    protected _beforeInit() {
        const props = this._initialProps;
        const defaultProps = this._getDefaultProps();
        this._initialProps = _.deepMix({}, props, defaultProps);
    }

    protected _coord() { }

    protected _addElements() { }

    protected _annotation() {
        const props = this._initialProps;
        const config = [];
        _.each(props.guideLine, (line) => {
            const guideLine = getComponent('guideLine', {
                plot: this,
                cfg: line
              })
            config.push(guideLine);
        });
        this._setConfig('annotations', config);
    }

    protected _animation() { }

    protected _interactions() { }

    private _getDefaultProps() {
        return {
            padding: [0, 0, 0, 0],
            legend: {
                visible: false
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                visible: false
            },
            tooltip: {
                visible: false
            }
        };
    }
}