import { DataView } from '@antv/data-set';
import { Lab } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/738147f2-2cef-4591-8e0d-4fd5268c2e0a.json')
  .then((data) => data.json())
  .then((data) => {
    const COLORS = ['#ff93a7', '#ff9300', '#bb82f3', '#6349ec', '#0074ff'];
    const START_BTN = 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*rhl0QYDkV7EAAAAAAAAAAAAAARQnAQ';
    const STOP_BTN = 'https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*2F9fRr2RfEEAAAAAAAAAAAAAARQnAQ';
    let currentYear = 1901;
    /** 散点图数据（各国诺贝尔奖获奖者的年龄分布） */
    const getPointViewData = (year) => {
      return data.map((d) => (d.year <= year ? d : { ...d, age: null }));
    };
    /** 占比环图数据（各领域诺贝尔奖获奖分布） */
    const getIntervalViewData = (year) => {
      const ds = new DataView().source(data.map((d) => (d.year <= year ? d : { ...d, number: 0 })));
      const othersCnt = data.filter((d) => d.year > year).reduce((a, b) => a + b.number, 0);
      ds.transform({
        type: 'summary', // 别名 summary
        fields: ['number'], // 统计字段集
        operations: ['sum'], // 统计操作集
        as: ['counts'], // 存储字段集
        groupBy: ['type'], // 分组字段集
      });
      return [...ds.rows, { type: 'other', counts: othersCnt }];
    };
    const getDataGroupByField = (field) => {
      const transformData = [...data];
      for (let i = 1901; i < 2016; i++) {
        if (!data.find((d) => d.year === i)) {
          transformData.push({
            year: i,
            number: 0,
            name: '',
            nickName: '',
            age: 0,
            country: '',
            about: '',
            type: '',
            avatar: '',
          });
        }
      }
      return new DataView()
        .source(transformData)
        .transform({ type: 'group', groupBy: [field] })
        .rows.map((d) => ({ [field]: d[0][field] }));
    };

    const labChart = new Lab.MultiView('container', {
      height: 500,
      padding: 'auto',
      theme: 'dark',
      appendPadding: [20, 0, 20, 0],
      legend: {
        type: { position: 'bottom' },
      },
      tooltip: {
        domStyles: {
          'g2-tooltip-list-item': {
            color: '#fff',
          },
        },
      },
      views: [
        {
          data: getIntervalViewData(currentYear),
          region: { start: { x: 0, y: 0.35 }, end: { x: 1, y: 0.65 } },
          coordinate: {
            type: 'theta',
            cfg: { innerRadius: 0.89, radius: 0.96 },
          },
          geometries: [
            {
              type: 'interval',
              xField: '1',
              yField: 'counts',
              colorField: 'type',
              mapping: {
                color: [...COLORS, '#D9D9D9'],
              },
              adjust: { type: 'stack' },
            },
          ],
          annotations: [
            {
              type: 'html',
              position: ['50%', '50%'],
              style: {
                textAlign: 'center',
                fill: 'rgba(255,255,255,0.85)',
              },
              html: (container, view) => {
                const width = Math.min(view.getCoordinate().getWidth(), view.getCoordinate().getHeight()) * 0.2;
                return `<div id="btn" style="width=${width * 1.2}px;height=${
                  width * 1.2
                }px;color: rgba(255,255,2550.85);transform: translate(-50%,-50%);cursor: pointer;">
                  <img alt="image" width=${width} height=${width} src=${START_BTN}>
                </div>`;
              },
            },
          ],
        },
        {
          data: getPointViewData(currentYear),
          region: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
          coordinate: {
            type: 'polar',
            cfg: {
              innerRadius: 0.45,
              radius: 0.64,
            },
          },
          axes: {
            country: {
              tickLine: null,
              label: null,
            },
            age: {
              min: 20,
              max: 100,
              tickInterval: 20,
              alias: '获奖\n年龄',
              label: {
                style: {
                  fontSize: 10,
                },
              },
              grid: {
                line: {
                  style: {
                    lineWidth: 0.5,
                  },
                },
              },
            },
          },
          geometries: [
            {
              type: 'point',
              xField: 'country',
              yField: 'age',
              colorField: 'type',
              mapping: {
                size: 3,
                shape: 'circle',
                style: {
                  lineWidth: 0,
                },
                color: COLORS,
              },
            },
          ],
        },
        {
          // 国家展示
          data: getDataGroupByField('country'),
          region: { start: { x: 0.18, y: 0.18 }, end: { x: 0.82, y: 0.82 } },
          coordinate: { type: 'polar', cfg: { innerRadius: 0.99, radius: 1 } },
          geometries: [
            {
              type: 'interval',
              xField: 'country',
              yField: '1',
              label: {
                labelEmit: true,
                fields: ['country'],
                style: {
                  fontSize: 10,
                },
              },
              mapping: {
                color: 'transparent',
              },
            },
          ],
        },
        {
          // 年度 label 展示
          data: getDataGroupByField('year'),
          region: {
            start: { x: 0.05, y: 0.05 },
            end: { x: 0.95, y: 0.95 },
          },
          axes: {
            year: {
              tickCount: 10,
              label: null,
              line: {
                style: {
                  lineWidth: 0.5,
                },
              },
            },
          },
          coordinate: { type: 'polar', cfg: { innerRadius: 0.99, radius: 1 } },
          geometries: [
            {
              type: 'line',
              xField: 'year',
              yField: '0.9',
              label: {
                labelEmit: true,
                content: ({ year }) => {
                  return year === '1901' || Number(year) % 10 === 0 ? year : '-';
                },
              },
              mapping: {
                color: 'transparent',
              },
            },
          ],
        },
        {
          // 滑块
          data: getDataGroupByField('year'),
          region: {
            start: { x: 0.05, y: 0.05 },
            end: { x: 0.95, y: 0.95 },
          },
          coordinate: { type: 'polar', cfg: { innerRadius: 0.99, radius: 1 } },
          axes: {
            1: null,
            year: {
              // todo fix G2 tickCount 为 0，会死循环
              // tickCount: 0,
              label: null,
            },
          },
          geometries: [
            {
              type: 'interval',
              xField: 'year',
              yField: '1',
              label: {
                labelEmit: true,
                fields: ['year'],
                callback: (year) => {
                  return {
                    style: {
                      fill: year === currentYear ? 'rgba(255,255,255,0.85)' : 'transparent',
                    },
                    content: () => `${currentYear}`,
                    background: {
                      padding: 2,
                      // @ts-ignore
                      radius: 2,
                      style: {
                        fill: year === currentYear ? 'pink' : 'transparent',
                      },
                    },
                  };
                },
              },
              mapping: {
                color: 'transparent',
              },
            },
          ],
        },
      ],
    });

    labChart.render();
    // @ts-ignore
    window.chart = labChart;
    const dymaticView = labChart.chart.views[4];
    dymaticView.on('element:click', (evt) => {
      const data = evt.data?.data;
      if (data) {
        if (typeof data?.year === 'number') {
          currentYear = data.year;
          rerender(currentYear);
        }
      }
    });

    function rerender(y) {
      labChart.chart.views[0].changeData(getIntervalViewData(y));
      labChart.chart.views[1].changeData(getPointViewData(y));
      dymaticView.geometries[0].label('year', (year) => ({
        labelEmit: true,
        style: {
          fill: year === y ? 'rgba(255,255,255,0.85)' : 'transparent',
        },
        content: () => `${y}`,
        background: {
          padding: 2,
          // @ts-ignore
          radius: 2,
          style: {
            fill: year === y ? 'pink' : 'transparent',
          },
        },
      }));
      dymaticView.render(true);
    }

    let interval;
    function start() {
      if (!interval) {
        if (document.querySelector('#btn').querySelector('img')) {
          document.querySelector('#btn').querySelector('img').setAttribute('src', START_BTN);
        }
      }
      interval = setInterval(() => {
        if (currentYear < 2016) {
          currentYear += 1;
          rerender(currentYear);
        } else {
          end();
        }
      }, 800);
    }
    function end() {
      clearInterval(interval);
      interval = null;
      if (document.querySelector('#btn').querySelector('img')) {
        document.querySelector('#btn').querySelector('img').setAttribute('src', STOP_BTN);
      }
    }

    start();
    // 延迟绑定事件
    setTimeout(() => {
      document.querySelector('#btn').addEventListener('click', () => {
        if (!interval) {
          start();
        } else {
          end();
        }
      });
    }, 500);
  });
