import { Pie } from '@antv/g2plot';

const data = [
  {
    value: 19464.706,
    city: '潮州',
  },
  {
    value: 16028.26,
    city: '泰州',
  },
  {
    value: 14705.8225,
    city: '南平',
  },
  {
    value: 11972.8575,
    city: '广州',
  },
  {
    value: 11558.98,
    city: '温州',
  },
  {
    value: 10903.09,
    city: '中卫',
  },
  {
    value: 9449.931,
    city: '台州',
  },
  {
    value: 7338.79,
    city: '武汉',
  },
  {
    value: 6500.663,
    city: '东莞',
  },
  {
    value: 3905.75,
    city: '兰州',
  },
  {
    value: 3874.12,
    city: '汕头',
  },
  {
    value: 3760.75,
    city: '安阳',
  },
  {
    value: 3503.12,
    city: '唐山',
  },
  {
    value: 3482.41,
    city: '延安',
  },
  {
    value: 3279.61,
    city: '商丘',
  },
  {
    value: 3271.01,
    city: '绥化',
  },
  {
    value: 3168.2815,
    city: '鸡西',
  },
  {
    value: 3029.97,
    city: '河源',
  },
  {
    value: 3025.426,
    city: '三亚',
  },
  {
    value: 2976.21,
    city: '惠州',
  },
  {
    value: 2580.67,
    city: '徐州',
  },
  {
    value: 2318.2135,
    city: '重庆',
  },
  {
    value: 2288.6,
    city: '巴彦淖尔',
  },
  {
    value: 2236.16,
    city: '晋城',
  },
  {
    value: 2181.44,
    city: '海口',
  },
  {
    value: 2135.9755,
    city: '营口',
  },
  {
    value: 2073.62,
    city: '北海',
  },
  {
    value: 2004.22,
    city: '钦州',
  },
  {
    value: 1829.8715,
    city: '株洲',
  },
  {
    value: 1693.53,
    city: '北京 ',
  },
  {
    value: 1475.661,
    city: '天津 ',
  },
  {
    value: 1450.61,
    city: '杭州',
  },
  {
    value: 1317.76,
    city: '朔州',
  },
  {
    value: 1289.127,
    city: '达州',
  },
  {
    value: 1201.934,
    city: '忻州',
  },
  {
    value: 1136.44,
    city: '桂林',
  },
  {
    value: 877.827,
    city: '梧州',
  },
  {
    value: 824.24,
    city: '四平',
  },
  {
    value: 801.45,
    city: '黑河',
  },
  {
    value: 742.21,
    city: '乌鲁木齐',
  },
  {
    value: 738.2505,
    city: '揭阳',
  },
  {
    value: 633.08,
    city: '衢州',
  },
  {
    value: 623.35,
    city: '平顶山',
  },
  {
    value: 550.29,
    city: '莆田',
  },
  {
    value: 542.11,
    city: '菏泽',
  },
  {
    value: 532.89,
    city: '泉州',
  },
  {
    value: 447.0405,
    city: '辽阳',
  },
  {
    value: 360.47,
    city: '呼和浩特',
  },
  {
    value: 336.47,
    city: '三沙',
  },
  {
    value: 277.08,
    city: '克拉玛依',
  },
  {
    value: 241.706,
    city: '淮南',
  },
  {
    value: 218.85,
    city: '贺州',
  },
  {
    value: 136.16,
    city: '吕梁',
  },
  {
    value: 124.06,
    city: '乌兰察布',
  },
  {
    value: 112.72,
    city: '柳州',
  },
  {
    value: 110.42,
    city: '上海',
  },
  {
    value: 107.86,
    city: '张家口',
  },
  {
    value: 86.61,
    city: '金昌',
  },
  {
    value: 78.2,
    city: '阳江',
  },
  {
    value: 74.02,
    city: '濮阳',
  },
  {
    value: 60.69,
    city: '铜陵',
  },
  {
    value: 57.84,
    city: '大同',
  },
  {
    value: 55.77,
    city: '鞍山',
  },
  {
    value: 48.75,
    city: '运城',
  },
  {
    value: 25.96,
    city: '张掖',
  },
  {
    value: 12.12,
    city: '自贡',
  },
];
const piePlot = new Pie(document.getElementById('container'), {
  width: 600,
  height: 400 - 16 * 2,
  // title: {
  //   visible: true,
  //   text: '城市数据',
  // },
  // description: {
  //   visible: true,
  //   text:
  //     '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。',
  // },
  radius: 0.6,
  padding: [16, 0, 0, 0],
  data,
  angleField: 'value',
  colorField: 'city',
  legend: {
    visible: false,
  },
  label: {
    visible: true,
    type: 'upgrade-pie',
    formatter: (text, item) => {
      return `${item._origin['city']} (${item._origin['value']})`;
    },
  },
  pieStyle: {
    lineWidth: 0,
  },
});

piePlot.render();
