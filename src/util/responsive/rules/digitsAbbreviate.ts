import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import { getMedian } from '../../math';

interface DigitsAbbreviateCfg {
  unit?: 'k' | 'm' | 'b' | 't' | 'auto';
  formatter?: Function;
  decimal?: number;
}
const unitMapper = {
  k: { number: 1e3, index: 0 },
  m: { number: 1e6, index: 1 },
  b: { number: 1e9, index: 2 },
  t: { number: 1e12, index: 3 },
};

// https://gist.github.com/MartinMuzatko/1060fe584d17c7b9ca6e
// https://jburrows.wordpress.com/2014/11/18/abbreviating-numbers/
/*tslint:disable*/

export default function digitsAbbreviate(shape: Shape, cfg: DigitsAbbreviateCfg, index, responsive) {
    const nodes = responsive.nodes.nodes;
    const number = parseFloat(shape.get('origin').text);
    if (number === 0) {
        return;
    }
    if (cfg.formatter) {
        shape.attr('text', cfg.formatter(number));
        return;
    } if (cfg.unit) {
        const { num, unitname } = abbravateDigitsByUnit(cfg, number);
        shape.attr('text', num + unitname);
    } else {
        /**自动换算逻辑 */
        //根据中位数得到换算单位
        const numbers = extractNumbers(nodes);
        const median = getMedian(numbers);
        const unitname = getUnitByNumber(median);
        //根据数值的interval计算换算后保留的浮点数
        const unitNumber = unitMapper[unitname].number;
        const interval = getLinearNodesInterval(nodes);
        const decimal = getDigitsDecimal(interval, unitNumber);
        const { num } = abbravateDigitsByUnit({ unit: unitname, decimal }, number);
        shape.attr('text', num + unitname);
    }
}

function abbravateDigitsByUnit(cfg, number) {
    const units = ['k', 'm', 'b', 't'];
    let num;
    let unitname;
    if (cfg.unit === 'auto') {
        /** auto formatt k-m-b-t */
        const order = Math.floor(Math.log(number) / Math.log(1000));
        unitname = units[order - 1];
        num = (number / 1000 ** order).toFixed(cfg.decimal);
    } else if (cfg.unit) {
        const unit = unitMapper[cfg.unit];
        unitname = cfg.unit;
        num = (number / unit.number).toFixed(cfg.decimal);
    }
    return { num, unitname };
}

function getUnitByNumber(number) {
    const units = ['k', 'm', 'b', 't'];
    const order = Math.floor(Math.log(number) / Math.log(1000));
    return units[order - 1];
}

function extractNumbers(nodes) {
    const numbers = [];
    _.each(nodes, (node) => {
        const n = node as any;
        const number = parseFloat(n.shape.get('origin').text);
        numbers.push(number);
    });
    return numbers;
}

function getLinearNodesInterval(nodes) {
    if (nodes.length >= 2) {
        const a = parseFloat(nodes[0].shape.get('origin').text);
        const b = parseFloat(nodes[1].shape.get('origin').text);
        return Math.abs(a - b);
    }
    return 0;
}

function getDigitsDecimal(interval, unitNumber) {
    const unitBit = Math.floor(Math.log10(unitNumber));
    if (interval >= unitNumber) {
        const remainder = interval % unitNumber;
        if (remainder > 0) {
            const remainderBit = Math.floor(Math.log10(remainder));
            return Math.abs(remainderBit - unitBit);
        }
    } else {
        const intervalBit = Math.floor(Math.log10(interval));
        return Math.abs(intervalBit - unitBit);
    }
    return 0;
}

