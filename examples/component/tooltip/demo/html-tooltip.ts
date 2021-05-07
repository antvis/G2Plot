import { MultiView } from '@antv/g2plot';
import insertCss from 'insert-css';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
    .custom-tooltip-title {
        margin: 0px 12px;
        padding: 72px 0 8px;
        font-size: 12px;
        border-bottom-style: solid;
        border-bottom-width: thin;
        border-bottom-color: #e9e9e9;
    }

    .custom-tooltip-value {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 8px 12px 0 12px;
      padding-bottom: 8px;
      font-size: 40px;
      text-align: center;
      border-bottom-style: solid;
      border-bottom-width: thin;
      border-bottom-color: #e9e9e9;
      height: 70px;
    }

    .custom-tooltip-temp {
      display: flex;
      position: relative;
      align-items: center;
    }

    .custom-tooltip-temp span:first-child {
      font-size: 12px;
      position: absolute;
      top: 0px;
      color: rgba(0, 0, 0, 0.45)
    }

    .custom-tooltip-temp span:last-child {
      text-align: left;
      margin-top: 10px;
      position: relative;
      color: rgba(0, 0, 0, 0.85)
    }

    .custom-tooltip-wind {
        margin: 8px 12px 12px 12px;
        font-size: 10px;
        color: rgba(0, 0, 0, 0.45);
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .tooltip-footer {
      margin: 8px 12px 12px 12px;
      font-size: 10px;
      color: rgba(0, 0, 0, 0.45);
    }

    .background-image {
      background-repeat: no-repeat;
    }

    .rain {
        background-image: url(https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*sg5aT7dY36wAAAAAAAAAAABkARQnAQ);
    }

    .sun {
        background-image: url(https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*gE_hS5JVl5YAAAAAAAAAAABkARQnAQ);
    }

    .cloud {
        background-image: url(https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BTw4R4O341AAAAAAAAAAAABkARQnAQ);
    }
`);

fetch('https://gw.alipayobjects.com/os/antfincdn/yTron%268MtC/range-data.json')
  .then((data) => data.json())
  .then((data) => {
    const plot = new MultiView('container', {
      meta: {
        date: { sync: true },
        minTemp: { min: 0, max: 30 },
        maxTemp: { min: 0, max: 30 },
        values: { min: 0, max: 30 },
      },
      tooltip: {
        showMarkers: false,
        enterable: true,
        domStyles: {
          'g2-tooltip': {
            width: '150px',
            padding: 0,
          },
        },
        customContent: (title, items) => {
          const data = items[0]?.data || {};
          const titleDom = `<div class ="custom-tooltip-title">${data.date}</div>`;
          const tempDom = `<div class = "custom-tooltip-value"><div class = "custom-tooltip-temp"><span>低温</span><span>${data.minTemp}</span></div><div class = "custom-tooltip-temp"><span>高温</span><span>${data.maxTemp}</span></div></div>`;
          const windDom = `<div class = "custom-tooltip-wind"><span>风向:${data.windDir}</span><span>风速:${data.windSpeed}</span></div>`;
          let domClass;
          if (data.rain === true) {
            domClass = 'rain';
          } else if (data.sunny === true) {
            domClass = 'sun';
          } else {
            domClass = 'cloud';
          }
          return `<div class="background-image ${domClass}">${titleDom}${tempDom}${windDom}<div class="tooltip-footer">打开 <a href="https://weather.com/zh-CN/weather/today/l/CHXX0008:1:CH" target="_blank">天气预报网 ☁️</a></div></div>`;
        },
      },
      views: [
        {
          data: data.map((d) => {
            return { ...d, values: [d.minTemp, d.maxTemp] };
          }),
          meta: {
            date: { sync: true },
            minTemp: { min: 0, max: 30 },
            maxTemp: { min: 0, max: 30 },
            values: { min: 0, max: 30 },
          },
          axes: {
            date: {},
            minTemp: false,
            maxTemp: false,
            values: {
              position: 'left',
            },
          },
          interactions: [{ type: 'active-region' }],
          geometries: [
            {
              type: 'interval',
              xField: 'date',
              yField: 'values',
              mapping: {
                size: 4,
                style: { fill: '#EBEDF0' },
              },
            },
            {
              type: 'point',
              xField: 'date',
              yField: 'minTemp',
              colorField: 'maxTemp',
              mapping: {
                style: { r: 5 },
                shape: 'circle',
                color: ['#6ab7da', '#806bd9', '#da6bcc'],
              },
            },
            {
              type: 'point',
              xField: 'date',
              yField: 'maxTemp',
              colorField: 'maxTemp',
              mapping: {
                size: 5,
                shape: 'circle',
                color: ['#6ab7da', '#806bd9', '#da6bcc'],
              },
            },
          ],
        },
      ],
    });

    plot.render();
  });
