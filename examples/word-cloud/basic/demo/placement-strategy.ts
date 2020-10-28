import { WordCloud } from '@antv/g2plot';

const data = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('').map((item) => ({ name: item, value: 1 }));

const wordCloud = new WordCloud('container', {
  data,
  wordField: 'name',
  weightField: 'value',
  colorField: 'name',
  wordStyle: {
    fontFamily: 'Verdana',
    fontSize: 16,
    rotation: 0,
  },
  placementStrategy(word, index, words) {
    const width = this.ele.clientWidth;
    const height = this.ele.clientHeight;
    const length = words.length;

    return {
      x: (width / length) * index,
      y: (height / length) * index,
    };
  },
});

wordCloud.render();
