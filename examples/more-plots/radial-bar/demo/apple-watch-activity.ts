import { RadialBar } from '@antv/g2plot';

const data = [
  {
    name: 'activity1',
    percent: 2370,
    color: '#1ad5de',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/ck11Y6aRrz/shangjiantou.png',
  },
  {
    name: 'activity2',
    percent: 800,
    color: '#a0ff03',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/zY2JB7hhrO/shuangjiantou.png',
  },
  {
    name: 'activity3',
    percent: 650,
    color: '#e90b3a',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/%24qBxSxdK05/jiantou.png',
  },
];
const bar = new RadialBar('container', {
  width: 400,
  height: 244,
  autoFit: false,
  appendPadding: [50, 0, 50, 0],
  data,
  xField: 'name',
  yField: 'percent',
  // maxAngle: 90, //最大旋转角度,
  radius: 0.8,
  innerRadius: 0.2,
  xAxis: false,
  theme: 'dark',
  barBackground: { style: { fill: 'rgba(255,255,255,0.45)' } },
  barStyle: { lineCap: 'round' },
  minBarWidth: 16,
  maxBarWidth: 16,
  colorField: 'name',
  color: ({ name }) => {
    return data.find((d) => d.name === name).color;
  },
  annotations: data.map((d) => ({
    type: 'html',
    position: [d.name, 0],
    html: `<div style="width:11px;height:11px;transform:translate(-50%, -50%)">
      <img
        style="width:11px;height:11px;display: block;"
        src="${d.icon}"
      />
    </div>`,
  })),
});
bar.render();
