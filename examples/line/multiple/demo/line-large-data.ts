import { Line } from '@antv/g2plot';
import { uniq, isNumber, isDate } from '@antv/util';

const dict = {
  周一: 1,
  周二: 2,
  周三: 3,
  周四: 4,
  周五: 5,
  周六: 6,
  周日: 7,
  周天: 7,
  星期一: 1,
  星期二: 2,
  星期三: 3,
  星期四: 4,
  星期五: 5,
  星期六: 6,
  星期日: 7,
  星期天: 7,
  一月: 1,
  二月: 2,
  三月: 3,
  四月: 4,
  五月: 5,
  六月: 6,
  七月: 7,
  八月: 8,
  九月: 9,
  十月: 10,
  十一月: 11,
  十二月: 12,
  janurary: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};
let monthOrWeekKeys = Object.keys(dict);

// 数组排序
const sort = (a, b) => {
  if (isNumber(a)) {
    return a - b;
  } else if (isDate(a)) {
    return String(a).localeCompare(String(b));
  } else if (monthOrWeekKeys.includes(a)) {
    return dict[a] - dict[b];
  }
};

/**
 * 获取 annotations 配置项
 * @param data {Array} 原始数据，建议传入的数据自行处理对x轴数据的排序，此处只处理月份/星期/日期类型/数值型几种场景。
 * @param xField {String} x字段
 * @param yField {String} y字段
 * @param seriesField {String} series字段
 * @param color {Array} 主题色列表，与配置项中的颜色列表对应，用于填充文字颜色，与曲线保持一致
 *
 * @param offsetX {Number} 偏移量
 * @param maxLabelLength {Number} 文本最大显示长度，超过一定值时显示...
 * @param needSort {Boolean} 是否需要对X轴排序
 * @param isStack {Boolean} 是否为堆叠数据
 * @param xAxisOffset {Number} 堆叠状态下X轴偏移几条数据，默认为0，设置该值后标签将不显示在尾部而是显示在区域内
 * @return annotations 配置项
 */
const getAnnotations = (
  data,
  { xField, yField, seriesField, color = [] },
  { offsetX = 16, maxLabelLength = 15, needSort = false, isStack = false, xAxisOffset = 0 }
) => {
  // 获取legend项，根据seriesField字段去重
  let legend = uniq(data.map((item) => item[seriesField]));

  let annotations = legend.map((content, idx) => {
    // 获取每个legend项的数组
    let arr = data.filter((item) => item[seriesField] == content);

    // 根据X轴逆序排序，取出第0个为最后一项的Y值
    // 如果输入数据已经对X轴做过排序，直接将取出的值逆序即可；
    arr = needSort ? arr.sort((b, a) => sort(a[xField], b[xField])) : arr.reverse();

    return {
      type: 'text',
      // 超过最大长度时显示 ...
      content: content.slice(0, maxLabelLength) + (content[maxLabelLength] ? '...' : ''),
      position: [arr[xAxisOffset][xField], arr[xAxisOffset][yField]],
      style: {
        fill: color[idx],
        textAlign: xAxisOffset > 0 ? 'center' : 'left',
        textBaseling: 'middle',
      },
      offsetX,
    };
  });
  if (!isStack) {
    return annotations;
  }
  return handleStackPosition(annotations);
};

/**
 * 处理堆叠数据尾部标签位置
 * @param annotations 配置项
 */
const handleStackPosition = (annotations) => {
  let legendVal = annotations.map((item) => item.position[1]);
  legendVal = legendVal.reverse();
  for (let i = 1; i < legendVal.length; i++) {
    legendVal[i] = legendVal[i] + legendVal[i - 1];
  }
  legendVal = [0, ...legendVal];
  // 处理堆叠数据
  let position = annotations
    .map((item, idx) => {
      // 显示在两组数据居中的位置
      let val = (legendVal[idx] + legendVal[idx + 1]) / 2;
      return [item.position[0], val];
    })
    .reverse();
  return annotations.map((item, idx) => ({
    ...item,
    position: position[idx],
  }));
};

const option = {
  seriesField: 'category',
  xField: 'year',
  yField: 'value',
  color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E86452', '#6DC8EC', '#945FB9', '#FF9845', '#1E9493', '#FF99C3'],
};

fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
  .then((res) => res.json())
  .then((data) => {
    let annotations = getAnnotations(data, option, {
      offsetX: 8,
      needSort: false,
      isStack: false,
      xAxisOffset: 0,
      maxLabelLength: 15,
    });
    const line = new Line('container', {
      data,
      ...option,
      appendPadding: [0, 100, 0, 0],
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      legend: false,

      // 以下是尾部标签跟随效果
      annotations,
    });

    line.render();
  });
