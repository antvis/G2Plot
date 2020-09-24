import { WordCloud } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
  .then((res) => res.json())
  .then((data) => {
    const wordCloud = new WordCloud('container', {
      data,
      width: 600,
      height: 400,
      wordField: 'name',
      weightField: 'value',
      imageMask: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [8, 32],
      },
    });

    wordCloud.render();
  });
