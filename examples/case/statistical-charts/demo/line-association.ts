import { Line } from '@antv/g2plot';
import { DataView } from '@antv/data-set';
import * as _ from '@antv/util';

fetch('https://gw.alipayobjects.com/os/bmw-prod/c335e0c4-caa5-4c76-a321-20df96b6e5c8.json')
  .then((res) => res.json())
  .then((originData) => {
    const dv = new DataView().source(originData);
    dv.transform({
      type: 'fold',
      fields: ['USA', 'California', 'BA9C', 'Marin'], // 展开字段集
      key: 'series',
      value: 'value',
    });
    const data = dv.rows.map((d) => ({
      ...d,
      value: d.value ? Number(d.value) : d.value,
    }));
    const line = new Line('container', {
      data,
      autoFit: true,
      height: 400,
      xField: 'Date',
      yField: 'value',
      seriesField: 'series',
      xAxis: {
        type: 'cat',
        label: {
          autoRotate: false,
          formatter: (v) => {
            return v.split('/').reverse().join('-');
          },
        },
      },
      yAxis: {
        grid: {
          line: {
            style: {
              lineWidth: 0.5,
              lineDash: [4, 4],
            },
          },
        },
      },
      meta: {
        Date: {
          range: [0.04, 0.96],
        },
      },
      point: {
        shape: 'circle',
        size: 2,
        style: () => {
          return {
            fillOpacity: 0,
            stroke: 'transparent',
          };
        },
      },
      appendPadding: [68, 10, 0, 10],
      legend: false,
      smooth: true,
      lineStyle: {
        lineWidth: 1.5,
      },
      tooltip: {
        showMarkers: false,
        follow: false,
        position: 'top',
        offsetY: -30,
        offsetX: 0,
        shared: true,
        enterable: true,
        domStyles: {
          'g2-tooltip': {
            boxShadow: 'none',
            fontSize: '14px',
            margin: '0',
            overflowX: 'auto',
            width: '100%',
          },
          'g2-tooltip-items': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'no-wrap',
            overflow: 'auto',
            width: '100%',
          },
          'g2-tooltip-item': {
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '92px',
            minWidth: '92px',
            paddingLeft: '12px',
            justifyContent: ' space-between',
          },
          'g2-tooltip-item-marker': {
            width: '4px',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            height: '48px',
            left: '0px',
          },
          'g2-tooltip-item-title': {
            fontWeight: 700,
            fontSize: '18px',
            color: 'rgba(0, 0, 0, 0.65)',
            margin: '10px 0 0 0',
          },
          'g2-tooltip-item-value': {
            fontWeight: 700,
            fontSize: '18px',
            color: 'rgba(0, 0, 0, 0.65)',
            margin: '4px 0 12px 0',
          },
          'g2-tooltip-item-label': {
            fontSize: '14px',
            lineHeight: '14px',
            margin: '0 0 4px 0px',
          },
        },
        crosshairs: {
          line: {
            style: {
              strokeOpacity: 0.45,
            },
          },
        },
      },
      theme: {
        geometries: {
          point: {
            circle: {
              active: {
                style: {
                  r: 4,
                  fillOpacity: 1,
                  stroke: '#000',
                  lineWidth: 1,
                },
              },
            },
          },
        },
      },
      interactions: [{ type: 'marker-active' }, { type: 'brush' }],
    });

    line.render();
    let activeSeries;

    line.update({
      tooltip: {
        customContent: (title) => {
          const date = title ? title.split('/').reverse().join('-') : '';
          let htmlStr = `<div style="margin:10px 0;font-weight:700;">${date}</div><div class="g2-tooltip-items">`;
          const dataItems = data.filter((d) => d.Date === title);
          const { colors10 } = line.chart.getTheme();
          dataItems.forEach((item, idx) => {
            htmlStr += `<div class="g2-tooltip-item tooltip-${item.series}" data-series=${item.series} data-year=${
              item.Date
            } style="opacity:${item.series === activeSeries ? 0.25 : 1}">
                <div class="g2-tooltip-item-marker" style="background:${colors10[idx]}"></div>
                <div class="g2-tooltip-item-value">${item.value || '-'}</div>
                <div class="g2-tooltip-item-label">${item.series}</div>
              </div>`;
          });
          htmlStr += '</div>';
          return htmlStr;
        },
      },
    });

    // 初始化，默认激活
    const point = line.chart.getXY(_.last(data));
    line.chart.showTooltip(point);
    line.on('plot:mouseleave', () => {
      line.chart.hideTooltip();
    });

    document.addEventListener('click', (e) => {
      let target = e.target;
      // @ts-ignore
      if (target && target.getAttribute('class') && e.target.getAttribute('class').match('g2-tooltip-item')) {
        // @ts-ignore
        if (!target.getAttribute('class') !== 'g2-tooltip-item') {
          // @ts-ignore

          target = target.parentNode;
        }

        // @ts-ignore
        const dataset = target.dataset;
        if (activeSeries === dataset.series) {
          activeSeries = null;
        } else {
          activeSeries = dataset.series;
        }
        line.chart.once('afterrender', () => {
          document.querySelectorAll('.g2-tooltip-item').forEach((ele) => {
            // @ts-ignore
            if (ele.dataset.series === activeSeries) {
              // @ts-ignore
              ele.style.opacity = 0.25;
            } else {
              // @ts-ignore
              ele.style.opacity = 1;
            }
          });
        });

        line.chart.filter('series', (series) => {
          return series === activeSeries ? false : true;
        });
        line.chart.render(true);
        line.chart.geometries
          .find((geom) => geom.type === 'point')
          .elements.forEach((ele) => {
            const { Date, series } = ele.getModel().data;
            if (Date === dataset.Date && series === dataset.series) {
              ele.setState('active', true);
            }
          });
      }
    });
  });
