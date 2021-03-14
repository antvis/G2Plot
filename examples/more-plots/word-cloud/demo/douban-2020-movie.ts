import { WordCloud } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/%24IWXp5slbE/2020-movie-from-douban.json')
  .then((res) => res.json())
  .then((data) => {
    const wordCloud = new WordCloud('container', {
      data,
      wordField: 'title',
      weightField: 'rate',
      colorField: 'tag',
      legend: {},
      imageMask: 'https://gw.alipayobjects.com/zos/antfincdn/Qw7Xbn76kM/53176454-747c-4f0a-a9e5-936aa66a0082.png',
      wordStyle: {
        fontFamily: 'Avenir',
        fontSize: [8, 16],
      },
      state: {
        active: {
          style: {
            lineWidth: 0,
            shadowBlur: 4,
            shadowColor: 'rgba(0,0,0,0.3)',
          },
        },
      },
    });

    wordCloud.render();
  });
