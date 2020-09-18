import { WordCloud } from '@antv/g2plot';

const imageMask = new Image();
imageMask.crossOrigin = '';
imageMask.src = 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ';

// 等待图片加载完成
imageMask.onload = () => {
  fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
    .then((res) => res.json())
    .then((data) => {
      const wordCloud = new WordCloud('container', {
        data,
        // 宽高设置最好根据 imageMask 做调整
        width: 600,
        height: 400,
        autoFit: false,
        wordField: 'name',
        weightField: 'value',
        imageMask,
        wordStyle: {
          fontFamily: 'Verdana',
          fontSize: [8, 32],
        },
      });

      wordCloud.render();
    });
};
