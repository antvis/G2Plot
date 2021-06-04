import { WordCloud } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/jPKbal7r9r/mock.json')
  .then((res) => res.json())
  .then((data) => {
    const wordCloud = new WordCloud('container', {
      data,
      wordField: 'x',
      weightField: 'value',
      color: '#122c6a',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [24, 80],
      },
      // 设置交互类型
      interactions: [{ type: 'element-active' }],
      state: {
        active: {
          // 这里可以设置 active 时的样式
          style: {
            lineWidth: 3,
          },
        },
      },
    });

    wordCloud.render();
  });
