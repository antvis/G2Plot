import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import moment, { months } from 'moment';
import { getMedian, dotProduct2D } from '../math';
import { DataPointType } from '@antv/g2/lib/interface';

/** todo: 这么铺开太乱了，稍后整理成结构化模块 */

/** 响应式规则库 */
export interface IRule {
  name: string;
  method: Function;
}

/** 文本 */
interface TextWrapperCfg {
  lineNumber: number;
}
function textWrapper(shape: Shape, cfg: TextWrapperCfg) {
  const text = shape.attr('text');
  const step = Math.ceil(text.length / cfg.lineNumber);
  let wrapperText = '';
  for (let i = 1; i < cfg.lineNumber; i++) {
    const index = step * i;
    wrapperText = `${text.slice(0, index)}\n${text.slice(index)}`;
  }
  const fontSize = shape.attr('fontSize');
  shape.attr({
    text: wrapperText,
    lineHeight: fontSize,
    textAlign: 'center',
    textBaseline: 'top',
  });
}

interface TextRotationCfg {
  degree: number;
}
function textRotation(shape: Shape, cfg: TextRotationCfg) {
  shape.resetMatrix();
  shape.attr({
    rotate: 360 - cfg.degree,
    textAlign: 'right',
    textBaseline: 'middle',
  });
}

interface TextAbbreviateCfg {
  abbreviateBy?: 'start' | 'middle' | 'end';
}
function textAbbreviate(shape: Shape, cfg: TextAbbreviateCfg) {
  const abbreviateBy = cfg.abbreviateBy ? cfg.abbreviateBy : 'end';
  const text = shape.attr('text');
  let abbravateText;
  if (abbreviateBy === 'end') abbravateText = `${text[0]}...`;
  if (abbreviateBy === 'start') abbravateText = `...${text[text.length - 1]}`;
  if (abbreviateBy === 'middle') abbravateText = `${text[0]}...${text[text.length - 1]}`;
  shape.resetMatrix();
  shape.attr({
    text: abbravateText,
    textAlign: 'center',
    textBaseline: 'top',
  });
}

function textHide(shape) {
  shape.attr('text', '');
}

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
function digitsAbbreviate(shape: Shape, cfg: DigitsAbbreviateCfg, index, responsive) {
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


interface TimeStringAbbrevaiteCfg {
  keep?: string[];
}

function datetimeStringAbbrevaite(shape, cfg: TimeStringAbbrevaiteCfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  let campareText;
  if (index === nodes.length - 1) {
    campareText = nodes[index - 1].shape.get('origin').text;
  } else {
    campareText = nodes[index + 1].shape.get('origin').text;
  }
  const compare = isTime(campareText) ? timeAdaptor(campareText) : moment(campareText);
  /**获取时间周期和时间间隔 */
  const text = shape.get('origin').text;
  const current = isTime(text) ? timeAdaptor(text) : moment(text);
  const startText = nodes[0].shape.get('origin').text;
  const start = isTime(startText) ? timeAdaptor(startText) : moment(startText);
  const endText = nodes[nodes.length - 1].shape.get('origin').text;
  const end = isTime(endText) ? timeAdaptor(endText) : moment(endText);
  const timeDuration = getDateTimeMode(start, end);
  const timeCycle = getDateTimeMode(current, compare); // time frequency
  // 如果duration和frequency在同一区间
  if (timeDuration === timeCycle) {
    if (index !== 0 && index !== nodes.length - 1) {
      const formatter = sameSectionFormatter(timeDuration);
      shape.attr('text', current.format(formatter));
    }
    return;
  }
  if (index !== 0) {
    const previousText = nodes[index - 1].shape.get('origin').text;
    const previous = isTime(previousText) ? timeAdaptor(previousText) : moment(previousText);
    const isAbbreviate = needAbbrevaite(timeDuration, current, previous);
    if (isAbbreviate) {
      const formatter = getAbbrevaiteFormatter(timeDuration, timeCycle);
      shape.attr('text', current.format(formatter));
      return;
    }
  }
}

function needAbbrevaite(mode, current, previous) {
  const currentStamp = current.get(mode);
  const previousStamp = previous.get(mode);
  if (currentStamp !== previousStamp) {
    return false;
  }
  return true;
}

function getDateTimeMode(a, b) {
  const dist = moment.duration(Math.abs(a.diff(b)));
  const oneMinute = moment.duration(1, 'minutes');
  const oneHour = moment.duration(1, 'hours');
  const oneDay = moment.duration(1, 'days');
  const oneMonth = moment.duration(1, 'months');
  const oneYear = moment.duration(1, 'years');
  if (dist >= oneMinute && dist < oneHour) {
    return 'minute';
  } if (dist >= oneHour && dist < oneDay) {
    return 'hour';
  } if (dist >= oneDay && dist < oneMonth) {
    return 'day';
  } if (dist >= oneMonth && dist < oneYear) {
    return 'month';
  } if (dist >= oneYear) {
    return 'year';
  }
}

function getAbbrevaiteFormatter(duration, cycle) {
  const times = ['year', 'month', 'day', 'hour', 'minite'];
  const formatters = ['YYYY', 'MM', 'DD', 'HH', 'MM'];
  const startIndex = times.indexOf(duration) + 1;
  const endIndex = times.indexOf(cycle);
  let formatter = '';
  for (let i = startIndex; i <= endIndex; i++) {
    formatter += formatters[i];
    if (i < endIndex) {
      formatter += '-';
    }
  }
  return formatter;
}

function sameSectionFormatter(mode) {
  const times = ['year', 'month', 'day', 'hour', 'minite'];
  const formatters = ['YYYY', 'MM', 'DD', 'HH', 'MM'];
  const index = times.indexOf(mode);
  const formatter = formatters[index];
  return formatter;
}

/*tslint:disable*/
function isTime(string) {
  const hourminExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
  const hourminSecExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  return hourminExp.test(string) || hourminSecExp.test(string);
}

function timeAdaptor(string) {
  /** hh:mm hh:mm:ss 格式兼容 */
  const hourminExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
  const hourminSecExp = /^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  if (hourminExp.test(string)) {
    return moment(string, 'hh:mm');
  } if (hourminSecExp.test(string)) {
    return moment(string, 'hh:mm:ss');
  }
}

interface RobustAbbrevaiteCfg {
  keep?: string[];
  abbreviateBy?: 'start' | 'middle' | 'end';
  unit?: 'k' | 'm' | 'b' | 't' | 'auto';
  decimal?: number;
}

function robustAbbrevaite(shape: Shape, cfg: RobustAbbrevaiteCfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  const text = shape.attr('text');
  /** 判断text类型： 数字、时间、文本 */
  const isnum = /^\d+$/.test(text);
  if (isnum) {
    digitsAbbreviate(shape, cfg, index, nodes);
  } else if (moment(text).isValid() || isTime(text)) {
    datetimeStringAbbrevaite(shape, cfg, index, nodes);
  } else {
    textAbbreviate(shape, cfg);
  }
}

/** nodes */
interface NodesResamplingCfg {
  keep: string[];
}

function nodesResampling(shape, cfg: NodesResamplingCfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  /** nodeLength为偶数，则奇数index的shape保留，反之则偶数index的shape保留 */
  const oddKeep = (nodes.length % 2 === 0) ? false : true;
  if (isKeep(cfg.keep, index, nodes)) {
    return;
  } {
    const isOdd = index % 2 === 0 ? true : false;
    if ((!oddKeep && isOdd) || (oddKeep && !isOdd)) {
      textHide(shape);
    }
  }
}

function isKeep(keepCfg, index, nodes) {
  /** 允许设置start end 或任意index */
  const conditions = [];
  _.each(keepCfg, (cfg) => {
    if (cfg === 'start') {
      conditions.push(index === 0);
    } else if (cfg === 'end') {
      conditions.push(index === nodes.length - 1);
    } else if (_.isNumber(cfg)) {
      conditions.push(index === cfg);
    }
  });
  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    if (condition === true) {
      return true;
    }
  }
  return false;
}

function nodesResamplingByAbbrevate(shape, cfg: NodesResamplingCfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  if (isKeep(cfg.keep, index, nodes)) {
    return;
  } {
    const currentText = shape.attr('text');
    const originText = shape.get('origin').text;
    if (currentText !== originText) {
      textHide(shape);
    }
  }
}

/**图形在水平或垂直方向抖开 */
function nodeJitter(shape: Shape, cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  if (index === nodes.length - 1) {
    return;
  }
  const current = nodes[index];
  const next = nodes[index + 1];
  const { dir, distX, distY } = alignDirection(current, next);
  const startPoint = shape.get('startPoint');
  if (dir === 'x') {
    shape.attr('y', startPoint.y + 20);
  }
}

function alignDirection(nodeA, nodeB) {
  let dir;
  /** 计算两个node 中心点向量的角度 */
  const vector = { x: nodeB.centerX - nodeA.centerX, y: nodeB.centerY - nodeA.centerY };
  const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const vector_horizontal = { x: 10, y: 0 };//水平方向向量
  const mag_horizontal = Math.sqrt(vector_horizontal.x * vector_horizontal.x + vector_horizontal.y * vector_horizontal.y);
  const dot = dotProduct2D(vector, vector_horizontal);
  let angle = dot / (mag * mag_horizontal) * 180 / Math.PI;
  if (angle < 0) angle = 360 - angle;
  angle = adjustAngle(angle); //将角度从0-360转换到0-90

  /** 计算两个node在x、y两个方向上的距离 */
  const distX = Math.abs(nodeA.centerX - nodeB.centerX);
  const distY = Math.abs(nodeA.centerY - nodeB.centerY);

  if (angle > 45) {
    dir = 'x';
  } else if (angle < 45) {
    dir = 'y';
  }

  return { dir, distX, distY };
}

function adjustAngle(angle) {
  if (angle > 90 && angle <= 180) {
    return 180 - angle;
  } else if (angle > 180 && angle < 270) {
    return angle - 180;
  } else {
    return 360 - angle;
  }
}

/**图形向上抖开并拉线 */
//todo 允许设置offset和拉线样式
function nodeJitterUpward(shape: Shape, cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  if (index === 0) {
    return;
  }
  const current = nodes[index];
  const previous = nodes[index - 1];
  if (isNodeOverlap(current, previous)) {
    const y = previous.top - current.height / 2;
    const offset = 10;
    if (y - offset > responsive.region.top) {
      //取到label对应的element-shape
      const origin = current.shape.get('origin');
      const shapeId = responsive.cfg.element.getShapeId(origin);
      const shapes = responsive.cfg.element.getShapes();
      const shapeBbox = getShapeById(shapeId, shapes).get('box');
      const originX = shapeBbox.left + shapeBbox.width / 2;
      const originY = shapeBbox.top;
      //拉线
      const container = responsive.cfg.labelsContainer;
      const labelLine = container.addShape('path', {
        attrs: {
          path: [
            ['M', originX, originY],
            ['L', current.shape.attr('x'), y]
          ],
          stroke: '#ccc',
          lineWidth: 1
        }
      });
      /**保存labelLine和label初始位置信息 */
      const origin_position = {x:shape.attr('x'),y:shape.attr('y')};
      //current.origin_position = {x:shape.attr('x'),y:shape.attr('y')};
      //更新标签位置，同步更新node
      current.shape.attr('y', y - offset);
      nodes[index] = responsive.nodes.measure(current.shape);
      nodes[index].line = labelLine;
      nodes[index].origin_position = origin_position;
    }
  }
}

function getShapeById(shapeId, shapes) {
  let target;
  _.each(shapes, (shape) => {
    const s = shape as Shape;
    const id = s.id;
    if (id === shapeId) {
      target = s;
    }
  });
  return target;
}

/** 根据变化进行抽样，保留变化较大的点，类似于点简化算法*/
function nodesResamplingByChange(shape: Shape, cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  const tolerance = responsive.cfg.tolerance;
  if (index <= 1) {
    return;
  }
  const current = nodes[index];
  //const previous = nodes[index-1];
  const previous = findPrevious(index, nodes);
  const distX = previous.centerX - current.centerX;
  const distY = previous.centerY - current.centerY;
  const dist = Math.sqrt(distX * distX + distY * distY);
  if (dist < tolerance) {
    textHide(shape);
    shape.set('blank', true);
  }
}

function findPrevious(index, nodes) {
  for (let i = index - 1; i > 0; i--) {
    const node = nodes[i];
    if (!node.shape.get('blank')) {
      return node;
    }
  }
}

interface NodesResamplingCfg {
  keep: string[];
}

function nodesResamplingByState(shape: Shape, cfg, index, responsive){
  const nodes = responsive.nodes.nodes;
  const current = nodes[index];
  current.line && current.line.remove();
  const { stateNodes } = responsive.cfg;
  let isState = false;
  _.each(stateNodes,(node:DataPointType)=>{
    if(node.shape.get('origin') === current.shape.get('origin')){
      isState = true;
    }
  });
  if(isState){
    if(current.origin_position){
      const {x,y} = current.origin_position;
      shape.attr('x',x);
      shape.attr('y',y);
    }
  }else{
    textHide(shape);
  }
}

function clearOverlapping(shape: Shape, cfg, index, responsive) {
  const nodes = responsive.nodes.nodes;
  const current = nodes[index];
  const overlaped = [];
  /** 找到所有与当前点overlap的node */
  if (!current.shape.get('blank')) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const shape = node.shape;
      if (i !== index && !shape.get('blank')) {
        const isOverlap = isNodeOverlap(current, node);
        if (isOverlap) {
          overlaped.push(node);
        }
      }
    }
  }
  /** overlap处理逻辑 */
  if (overlaped.length > 0) {
    overlaped.push(current);
    overlaped.sort((a, b) => {
      return b.top - a.top;
    });
    /** 隐藏除最高点以外的node */
    _.each(overlaped, (node, index) => {
      if (index > 0) {
        const shape = node.shape;
        textHide(shape);
        shape.set('blank', true);
      }
    });
  }
}

function isNodeOverlap(nodeA, nodeB) {
  if (nodeA.bottom < nodeB.top || nodeB.bottom < nodeA.top) {
    return false;
  } else if (nodeA.right < nodeB.left || nodeB.right < nodeA.left) {
    return false;
  }
  return true;
}


export const rulesLib = {
  textWrapper,
  textRotation,
  textAbbreviate,
  textHide,
  digitsAbbreviate,
  datetimeStringAbbrevaite,
  robustAbbrevaite,
  nodesResampling,
  nodesResamplingByAbbrevate,  
  nodesResamplingByChange,
  nodesResamplingByState,
  nodeJitter,
  nodeJitterUpward,
  clearOverlapping
};

export function registerResponsiveRule(name, method) {
  //todo: 防止覆盖
  rulesLib[name] = method;
}
