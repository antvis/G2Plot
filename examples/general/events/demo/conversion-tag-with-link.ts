import { Column, G2 } from '@antv/g2plot';

G2.registerInteraction('conversion-tag-cursor', {
  start: [{ trigger: 'conversion-tag-group:mouseenter', action: 'cursor:pointer' }],
  end: [{ trigger: 'conversion-tag-group:mouseleave', action: 'cursor:default' }],
});

const data = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8500, link: 'https://github.com/antvis/g2plot' },
];

const plot = new Column('container', {
  data,
  xField: 'action',
  yField: 'pv',
  conversionTag: {},
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  interactions: [
    {
      type: 'conversion-tag-cursor',
      cfg: {
        start: [
          {
            trigger: 'conversion-tag-group:mouseenter',
            action: (context) => {
              const { event, view } = context;
              const { nextElement } = event.data;
              const link = nextElement.getModel().data.link;
              // 根据实际情况修改，如果配置了链接跳转 则改变 cursor 样式
              if (link) {
                view.getCanvas().setCursor('pointer');
              }
            },
          },
        ],
      },
    },
  ],
});

plot.render();

plot.on('conversion-tag-group:click', (evt) => {
  const { target } = evt;
  if (target?.get('origin')) {
    const { nextElement } = target?.get('origin');
    const link = nextElement.getModel().data.link;
    window.open(link);
  }
});
