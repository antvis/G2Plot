import { WordCloud } from '@antv/g2plot';

const data = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('').map((item) => ({ name: item, value: 1 }));

const wordCloud = new WordCloud('container', {
  data,
  width: 600,
  height: 400,
  wordField: 'name',
  weightField: 'value',
  colorField: 'name',
  wordStyle: {
    fontFamily: 'Verdana',
    fontSize: 16,
    rotation: 0,
  },
  customPlacement(word, index, words) {
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
