import { WordCloud } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world-population.json')
  .then((res) => res.json())
  .then((data) => {
    const wordCloud = new WordCloud('container', {
      data,
      width: 600,
      height: 500,
      wordField: 'x',
      weightField: 'value',
      color: '#6262ff',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [24, 80],
      },
    });

    wordCloud.render();
  });
