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
      tooltip: {
        customContent(_, data) {
          if (!data.length) return;
          return `<h4 style="margin-top: 1em;">title</h4>
            <li class="g2-tooltip-list-item" style="margin-bottom:4px;display:flex;align-items:center;">
            <span style="background-color:${data[0]?.color};" class="g2-tooltip-marker"></span>
            <span style="display:inline-flex;flex:1;justify-content:space-between">
              <span style="margin-right: 16px;">${data[0]?.data.text}:</span><span>${data[0]?.data.value}</span>
            </span>
          </li>`;
        },
      },
    });

    wordCloud.render();
  });
