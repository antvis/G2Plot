import { Bar, G2 } from '@antv/g2plot';

// TODO 需要介绍下 convetsion-tag 的组成
G2.registerInteraction('conversion-tag-active', {
  start: [
    {
      isEnable: (context) => {
        const element = context.event.data?.element as G2.Element;
        const href = element?.data?.href;
        if (href) {
          return true;
        }
        return false;
      },
      trigger: 'conversion-tag-group:mouseenter',
      action: (context) => {
        const view = context.view;
        // 设置鼠标样式
        view.getCanvas().setCursor('pointer');
        const tagArrow = context.event.gEvent.shape;
        if (tagArrow.get('name') === 'conversion-tag-arrow') {
          tagArrow.attr('fill', 'rgba(251,151,71,0.85)');
        } else {
          const siblings = tagArrow.get('parent').getChildren();
          const shape = siblings[siblings.findIndex((c) => c.get('origin') === tagArrow.get('origin')) - 1];
          shape?.attr('fill', 'rgba(251,151,71,0.85)');
        }
      },
    },
    {
      trigger: 'conversion-tag-group:mousedown',
      action: (context) => {
        const element = context.event.data?.element;
        const href = element?.data?.href;
        window.open(href);
      },
    },
  ],
  end: [
    {
      trigger: 'conversion-tag-group:mouseleave',
      action: (context) => {
        const view = context.view;
        // 设置鼠标样式
        view.getCanvas().setCursor('default');
        const tagArrow = context.event.gEvent.shape;
        if (tagArrow.get('name') === 'conversion-tag-arrow') {
          tagArrow.attr('fill', '#efefef');
        }
      },
    },
  ],
});

const plotData = [
  { action: '浏览网站', pv: 50000, href: 'https://github.com/antvis/g2plot' },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000, href: 'https://github.com/antvis/g2' },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8500 },
];

const plot = new Bar('container', {
  data: plotData,
  xField: 'pv',
  yField: 'action',
  conversionTag: {
    offset: 0,
    spacing: 8,
    arrow: {
      style: {
        fill: '#efefef',
      },
    },
  },
  interactions: [{ type: 'active-region', enable: false }, { type: 'conversion-tag-active' }],
});

plot.render();
