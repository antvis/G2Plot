import { WordCloud, WordCloudConfig } from '../../src';
import * as _ from '@antv/util';
import { Dimension, InnerStartFunction, WordCloudData } from '../../src/plots/word-cloud/layer';

describe('WordCloud plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '400px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const preData =
    '14 Love\n' +
    '14 G2Plot\n' +
    '5 Liebe\n' +
    '5 ፍቅር\n' +
    '5 Lufu\n' +
    '5 حب\n' +
    '5 Aimor\n' +
    '5 Amor\n' +
    '5 Heyran\n' +
    '5 ভালোবাসা\n' +
    '5 Каханне\n' +
    '5 Любоў\n' +
    '5 Любов\n' +
    '5 བརྩེ་དུང་།\n' +
    '5 Ljubav\n' +
    '5 Karantez\n' +
    '5 Юрату\n' +
    '5 Láska\n' +
    '5 Amore\n' +
    '5 Cariad\n' +
    '5 Kærlighed\n' +
    '5 Armastus\n' +
    '5 Αγάπη\n' +
    '5 Amo\n' +
    '5 Amol\n' +
    '5 Maitasun\n' +
    '5 عشق\n' +
    '5 Pyar\n' +
    '5 Amour\n' +
    '5 Leafde\n' +
    '5 Gràdh\n' +
    '5 愛\n' +
    '5 爱\n' +
    '5 પ્રેમ\n' +
    '5 사랑\n' +
    '5 Սեր\n' +
    '5 Ihunanya\n' +
    '5 Cinta\n' +
    '5 ᑕᑯᑦᓱᒍᓱᑉᐳᖅ\n' +
    '5 Ást\n' +
    '5 אהבה\n' +
    '5 ಪ್ರೀತಿ\n' +
    '5 სიყვარული\n' +
    '5 Махаббат\n' +
    '5 Pendo\n' +
    '5 Сүйүү\n' +
    '5 Mīlestība\n' +
    '5 Meilė\n' +
    '5 Leefde\n' +
    '5 Bolingo\n' +
    '5 Szerelem\n' +
    '5 Љубов\n' +
    '5 സ്നേഹം\n' +
    '5 Imħabba\n' +
    '5 प्रेम\n' +
    '5 Ái\n' +
    '5 Хайр\n' +
    '5 အချစ်\n' +
    '5 Tlazohtiliztli\n' +
    '5 Liefde\n' +
    '5 माया\n' +
    '5 मतिना\n' +
    '5 Kjærlighet\n' +
    '5 Kjærleik\n' +
    '5 ପ୍ରେମ\n' +
    '5 Sevgi\n' +
    '5 ਪਿਆਰ\n' +
    '5 پیار\n' +
    '5 Miłość\n' +
    '5 Leevde\n' +
    '5 Dragoste\n' +
    '5 Khuyay\n' +
    '5 Любовь\n' +
    '5 Таптал\n' +
    '5 Dashuria\n' +
    '5 Amuri\n' +
    '5 ආදරය\n' +
    '5 Ljubezen\n' +
    '5 Jaceyl\n' +
    '5 خۆشەویستی\n' +
    '5 Љубав\n' +
    '5 Rakkaus\n' +
    '5 Kärlek\n' +
    '5 Pag-ibig\n' +
    '5 காதல்\n' +
    '5 ప్రేమ\n' +
    '5 ความรัก\n' +
    '5 Ишқ\n' +
    '5 Aşk\n' +
    '5 محبت\n' +
    '5 Tình yêu\n' +
    '5 Higugma\n' +
    '5 ליבע\n' +
    '4 Liebe\n' +
    '4 ፍቅር\n' +
    '4 Lufu\n' +
    '4 حب\n' +
    '4 Aimor\n' +
    '4 Amor\n' +
    '4 Heyran\n' +
    '4 ভালোবাসা\n' +
    '4 Каханне\n' +
    '4 Любоў\n' +
    '4 Любов\n' +
    '4 བརྩེ་དུང་།\n' +
    '4 Ljubav\n' +
    '4 Karantez\n' +
    '4 Юрату\n' +
    '4 Láska\n' +
    '4 Amore\n' +
    '4 Cariad\n' +
    '4 Kærlighed\n' +
    '4 Armastus\n' +
    '4 Αγάπη\n' +
    '4 Amo\n' +
    '4 Amol\n' +
    '4 Maitasun\n' +
    '4 عشق\n' +
    '4 Pyar\n' +
    '4 Amour\n' +
    '4 Leafde\n' +
    '4 Gràdh\n' +
    '4 愛\n' +
    '4 爱\n' +
    '4 પ્રેમ\n' +
    '4 사랑\n' +
    '4 Սեր\n' +
    '4 Ihunanya\n' +
    '4 Cinta\n' +
    '4 ᑕᑯᑦᓱᒍᓱᑉᐳᖅ\n' +
    '4 Ást\n' +
    '4 אהבה\n' +
    '4 ಪ್ರೀತಿ\n' +
    '4 სიყვარული\n' +
    '4 Махаббат\n' +
    '4 Pendo\n' +
    '4 Сүйүү\n' +
    '4 Mīlestība\n' +
    '4 Meilė\n' +
    '4 Leefde\n' +
    '4 Bolingo\n' +
    '4 Szerelem\n' +
    '4 Љубов\n' +
    '4 സ്നേഹം\n' +
    '4 Imħabba\n' +
    '4 प्रेम\n' +
    '4 Ái\n' +
    '4 Хайр\n' +
    '4 အချစ်\n' +
    '4 Tlazohtiliztli\n' +
    '4 Liefde\n' +
    '4 माया\n' +
    '4 मतिना\n' +
    '4 Kjærlighet\n' +
    '4 Kjærleik\n' +
    '4 ପ୍ରେମ\n' +
    '4 Sevgi\n' +
    '4 ਪਿਆਰ\n' +
    '4 پیار\n' +
    '4 Miłość\n' +
    '4 Leevde\n' +
    '4 Dragoste\n' +
    '4 Khuyay\n' +
    '4 Любовь\n' +
    '4 Таптал\n' +
    '4 Dashuria\n' +
    '4 Amuri\n' +
    '4 ආදරය\n' +
    '4 Ljubezen\n' +
    '4 Jaceyl\n' +
    '4 خۆشەویستی\n' +
    '4 Љубав\n' +
    '4 Rakkaus\n' +
    '4 Kärlek\n' +
    '4 Pag-ibig\n' +
    '4 காதல்\n' +
    '4 ప్రేమ\n' +
    '4 ความรัก\n' +
    '4 Ишқ\n' +
    '4 Aşk\n' +
    '4 محبت\n' +
    '4 Tình yêu\n' +
    '4 Higugma\n' +
    '4 ליבע\n' +
    '3 Liebe\n' +
    '3 ፍቅር\n' +
    '3 Lufu\n' +
    '3 حب\n' +
    '3 Aimor\n' +
    '3 Amor\n' +
    '3 Heyran\n' +
    '3 ভালোবাসা\n' +
    '3 Каханне\n' +
    '3 Любоў\n' +
    '3 Любов\n' +
    '3 བརྩེ་དུང་།\n' +
    '3 Ljubav\n' +
    '3 Karantez\n' +
    '3 Юрату\n' +
    '3 Láska\n' +
    '3 Amore\n' +
    '3 Cariad\n' +
    '3 Kærlighed\n' +
    '3 Armastus\n' +
    '3 Αγάπη\n' +
    '3 Amo\n' +
    '3 Amol\n' +
    '3 Maitasun\n' +
    '3 عشق\n' +
    '3 Pyar\n' +
    '3 Amour\n' +
    '3 Leafde\n' +
    '3 Gràdh\n' +
    '3 愛\n' +
    '3 爱\n' +
    '3 પ્રેમ\n' +
    '3 사랑\n' +
    '3 Սեր\n' +
    '3 Ihunanya\n' +
    '3 Cinta\n' +
    '3 ᑕᑯᑦᓱᒍᓱᑉᐳᖅ\n' +
    '3 Ást\n' +
    '3 אהבה\n' +
    '3 ಪ್ರೀತಿ\n' +
    '3 სიყვარული\n' +
    '3 Махаббат\n' +
    '3 Pendo\n' +
    '3 Сүйүү\n' +
    '3 Mīlestība\n' +
    '3 Meilė\n' +
    '3 Leefde\n' +
    '3 Bolingo\n' +
    '3 Szerelem\n' +
    '3 Љубов\n' +
    '3 സ്നേഹം\n' +
    '3 Imħabba\n' +
    '3 प्रेम\n' +
    '3 Ái\n' +
    '3 Хайр\n' +
    '3 အချစ်\n' +
    '3 Tlazohtiliztli\n' +
    '3 Liefde\n' +
    '3 माया\n' +
    '3 मतिना\n' +
    '3 Kjærlighet\n' +
    '3 Kjærleik\n' +
    '3 ପ୍ରେମ\n' +
    '3 Sevgi\n' +
    '3 ਪਿਆਰ\n' +
    '3 پیار\n' +
    '3 Miłość\n' +
    '3 Leevde\n' +
    '3 Dragoste\n' +
    '3 Khuyay\n' +
    '3 Любовь\n' +
    '3 Таптал\n' +
    '3 Dashuria\n' +
    '3 Amuri\n' +
    '3 ආදරය\n' +
    '3 Ljubezen\n' +
    '3 Jaceyl\n' +
    '3 خۆشەویستی\n' +
    '3 Љубав\n' +
    '3 Rakkaus\n' +
    '3 Kärlek\n' +
    '3 Pag-ibig\n' +
    '3 காதல்\n' +
    '3 ప్రేమ\n' +
    '3 ความรัก\n' +
    '3 Ишқ\n' +
    '3 Aşk\n' +
    '3 محبت\n' +
    '3 Tình yêu\n' +
    '3 Higugma\n' +
    '3 ליבע\n' +
    '2 Liebe\n' +
    '2 ፍቅር\n' +
    '2 Lufu\n' +
    '2 حب\n' +
    '2 Aimor\n' +
    '2 Amor\n' +
    '2 Heyran\n' +
    '2 ভালোবাসা\n' +
    '2 Каханне\n' +
    '2 Любоў\n' +
    '2 Любов\n' +
    '2 བརྩེ་དུང་།\n' +
    '2 Ljubav\n' +
    '2 Karantez\n' +
    '2 Юрату\n' +
    '2 Láska\n' +
    '2 Amore\n' +
    '2 Cariad\n' +
    '2 Kærlighed\n' +
    '2 Armastus\n' +
    '2 Αγάπη\n' +
    '2 Amo\n' +
    '2 Amol\n' +
    '2 Maitasun\n' +
    '2 عشق\n' +
    '2 Pyar\n' +
    '2 Amour\n' +
    '2 Leafde\n' +
    '2 Gràdh\n' +
    '2 愛\n' +
    '2 爱\n' +
    '2 પ્રેમ\n' +
    '2 사랑\n' +
    '2 Սեր\n' +
    '2 Ihunanya\n' +
    '2 Cinta\n' +
    '2 ᑕᑯᑦᓱᒍᓱᑉᐳᖅ\n' +
    '2 Ást\n' +
    '2 אהבה\n' +
    '2 ಪ್ರೀತಿ\n' +
    '2 სიყვარული\n' +
    '2 Махаббат\n' +
    '2 Pendo\n' +
    '2 Сүйүү\n' +
    '2 Mīlestība\n' +
    '2 Meilė\n' +
    '2 Leefde\n' +
    '2 Bolingo\n' +
    '2 Szerelem\n' +
    '2 Љубов\n' +
    '2 സ്നേഹം\n' +
    '2 Imħabba\n' +
    '2 प्रेम\n' +
    '2 Ái\n' +
    '2 Хайр\n' +
    '2 အချစ်\n' +
    '2 Tlazohtiliztli\n' +
    '2 Liefde\n' +
    '2 माया\n' +
    '2 मतिना\n' +
    '2 Kjærlighet\n' +
    '2 Kjærleik\n' +
    '2 ପ୍ରେମ\n' +
    '2 Sevgi\n' +
    '2 ਪਿਆਰ\n' +
    '2 پیار\n' +
    '2 Miłość\n' +
    '2 Leevde\n' +
    '2 Dragoste\n' +
    '2 Khuyay\n' +
    '2 Любовь\n' +
    '2 Таптал\n' +
    '2 Dashuria\n' +
    '2 Amuri\n' +
    '2 ආදරය\n' +
    '2 Ljubezen\n' +
    '2 Jaceyl\n' +
    '2 خۆشەویستی\n' +
    '2 Љубав\n' +
    '2 Rakkaus\n' +
    '2 Kärlek\n' +
    '2 Pag-ibig\n' +
    '2 காதல்\n' +
    '2 ప్రేమ\n' +
    '2 ความรัก\n' +
    '2 Ишқ\n' +
    '2 Aşk\n' +
    '2 محبت\n' +
    '2 Tình yêu\n' +
    '2 Higugma\n' +
    '2 ליבע\n' +
    '2 Liebe\n' +
    '2 ፍቅር\n' +
    '2 Lufu\n' +
    '2 حب\n' +
    '2 Aimor\n' +
    '2 Amor\n' +
    '2 Heyran\n' +
    '2 ভালোবাসা\n' +
    '2 Каханне\n' +
    '2 Любоў\n' +
    '2 Любов\n' +
    '2 བརྩེ་དུང་།\n' +
    '2 Ljubav\n' +
    '2 Karantez\n' +
    '2 Юрату\n' +
    '2 Láska\n' +
    '2 Amore\n' +
    '2 Cariad\n' +
    '2 Kærlighed\n' +
    '2 Armastus\n' +
    '2 Αγάπη\n' +
    '2 Amo\n' +
    '2 Amol\n' +
    '2 Maitasun\n' +
    '2 عشق\n' +
    '2 Pyar\n' +
    '2 Amour\n' +
    '2 Leafde\n' +
    '2 Gràdh\n' +
    '2 愛\n' +
    '2 爱\n' +
    '2 પ્રેમ\n' +
    '2 사랑\n' +
    '2 Սեր\n' +
    '2 Ihunanya\n' +
    '2 Cinta\n' +
    '2 ᑕᑯᑦᓱᒍᓱᑉᐳᖅ\n' +
    '2 Ást\n' +
    '2 אהבה\n' +
    '2 ಪ್ರೀತಿ\n' +
    '2 სიყვარული\n' +
    '2 Махаббат\n' +
    '2 Pendo\n' +
    '2 Сүйүү\n' +
    '2 Mīlestība\n' +
    '2 Meilė\n' +
    '2 Leefde\n' +
    '2 Bolingo\n' +
    '2 Szerelem\n' +
    '2 Љубов\n' +
    '2 സ്നേഹം\n' +
    '2 Imħabba\n' +
    '2 प्रेम\n' +
    '2 Ái\n' +
    '2 Хайр\n' +
    '2 အချစ်\n' +
    '2 Tlazohtiliztli\n' +
    '2 Liefde\n' +
    '2 माया\n' +
    '2 मतिना\n' +
    '2 Kjærlighet\n' +
    '2 Kjærleik\n' +
    '2 ପ୍ରେମ\n' +
    '2 Sevgi\n' +
    '2 ਪਿਆਰ\n' +
    '2 پیار\n' +
    '2 Miłość\n' +
    '2 Leevde\n' +
    '2 Dragoste\n' +
    '2 Khuyay\n' +
    '2 Любовь\n' +
    '2 Таптал\n' +
    '2 Dashuria\n' +
    '2 Amuri\n' +
    '2 ආදරය\n' +
    '2 Ljubezen\n' +
    '2 Jaceyl\n' +
    '2 خۆشەویستی\n' +
    '2 Љубав\n' +
    '2 Rakkaus\n' +
    '2 Kärlek\n' +
    '2 Pag-ibig\n' +
    '2 காதல்\n' +
    '2 ప్రేమ\n' +
    '2 ความรัก\n' +
    '2 Ишқ\n' +
    '2 Aşk\n' +
    '2 محبت\n' +
    '2 Tình yêu\n' +
    '2 Higugma\n' +
    '2 ליבע';

  let wordCloudPlot = undefined;
  const dataList: WordCloudData[] = [];

  it('词云图配置项', () => {
    preData.split('\n').forEach((value) => {
      const v = value.split(' ');
      dataList.push({
        word: v[1],
        weight: parseInt(v[0]),
        id: dataList.length,
      });
    });

    wordCloudPlot = new WordCloud(canvasDiv, getWordCloudConfig());

    wordCloudPlot.render();
  });

  function getWordCloudConfig(): WordCloudConfig {
    return {
      pixelRatio: 2,
      width: 600,
      height: 400,
      data: dataList,
      // maskImage: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
      // maskImage: 'https://github.com/ecomfe/echarts-wordcloud/blob/master/example/logo.png?raw=true',
      maxFontSize: 60,
      minFontSize: 10,
      color: (word: string, weight: number) => {
        return getRandomColor();
      },
      shape: 'cardioid',
      ellipticity: 1,

      minRotation: -Math.PI / 2,
      maxRotation: Math.PI / 2,
      rotateRatio: 0.5,
      rotationSteps: 4,

      gridSize: 8,
      shuffle: false,
      backgroundColor: '#fff',
      wait: 0,

      enableToolTips: true,
      enableEmphasis: true,
      hoveredId: -1,
      shadowColor: '#333333',
      shadowBlur: 10,

      hover: hoverAction,
    } as WordCloudConfig;
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

  function hoverAction(item: WordCloudData, dimension: Dimension, evt: MouseEvent, start: InnerStartFunction) {
    // console.log('hover action', item && item.word);
  }
});
