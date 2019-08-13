import * as _ from '@antv/util'; 
import BasePlot from '../../base/plot';
import BaseConfig from '../../interface/config';
import { LineStyle } from '../line/index';
import { extractScale } from '../../util/scale';

interface TinyLineConfig extends BaseConfig {
  /** 分组字段 */
  seriesField?: string;
  /** 是否平滑 */
  smooth?: boolean;
  /** 是否连接空数据 */
  connectNulls?: boolean;
  /** 折线extra图形样式 */
  lineStyle?: LineStyle | Function;
}

export default class TinyLine extends BasePlot<TinyLineConfig>{
    line: any;

    protected _setDefaultG2Config(){}

    protected _beforeInit() {
        this.type = 'tinyLine';
    }

    protected _coord(){}

    protected _addElements() {

    }

    protected _annotation(){

    }

    protected _animation(){}

    protected _interactions(){

    }
}