import { WordCloud } from '@antv/g2plot';

fetch('../data/word-cloud.json')
  .then((res) => res.json())
  .then((data) => {
    const wordCloudPlot = new WordCloud(document.getElementById('container'), getWordCloudConfig(data));
    wordCloudPlot.render();
  });

function getDataList(data) {
  const list = [];
  // change data type
  data.forEach((d) => {
    list.push({
      word: d.name,
      weight: d.value,
      id: list.length,
    });
  });
  return list;
}

function getWordCloudConfig(data) {
  return {
    width: 600,
    height: 400,
    data: getDataList(data),
    maskImage: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
    wordStyle: {
      rotation: [-Math.PI / 2, Math.PI / 2],
      rotateRatio: 0.5,
      rotationSteps: 4,
      fontSize: [10, 60],
      color: (word, weight) => {
        return getRandomColor();
      },
      active: {
        shadowColor: '#333333',
        shadowBlur: 10,
      },
      gridSize: 8,
    },
    shape: 'cardioid',
    shuffle: false,
    backgroundColor: '#fff',
    tooltip: {
      visible: true,
    },
    selected: -1,

    onWordCloudHover: hoverAction,
  };
}

function getRandomColor() {
  const arr = [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
  ];
  return arr[Math.floor(Math.random() * (arr.length - 1))];
}

function hoverAction(item, dimension, evt, start) {
  // console.log('hover action', item && item.word);
}
