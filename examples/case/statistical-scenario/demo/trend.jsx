import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@antv/g2plot';
import { DataView } from '@antv/data-set';
import * as _ from '@antv/util';
import insertCss from 'insert-css';

class TrendChart extends React.Component {
  chartNodeRef = React.createRef();
  chartRef = React.createRef();

  state = {
    tooltipItems: [],
    activeTooltipTitle: null,
    activeSeries: null,
  };

  componentDidMount() {
    // Step 2: 创建图表
    const chartDom = this.chartNodeRef.current;

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
        if (this.chartRef) {
          console.log('this.chartRef', this.chartRef);
          this.chartRef?.current?.clear();
        }
        const line = new Line(chartDom, {
          data,
          autoFit: true,
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
          appendPadding: [0, 0, 0, 0],
          legend: false,
          smooth: true,
          lineStyle: {
            lineWidth: 1.5,
          },
          tooltip: {
            showMarkers: false,
            follow: false,
            position: 'top',
            customContent: () => null,
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
        this.chartRef = line;
        // 初始化，默认激活
        const lastData = _.last(data);
        const point = line.chart.getXY(lastData);
        line.chart.showTooltip(point);
        const activeTooltipTitle = lastData.Date;
        this.setState({ tooltipItems: data.filter((d) => d.Date === activeTooltipTitle), activeTooltipTitle });

        line.on('plot:mouseleave', () => {
          line.chart.hideTooltip();
        });
        line.on('tooltip:change', (evt) => {
          const { title } = evt.data;
          const tooltipItems = data.filter((d) => d.Date === title);
          this.setState({ tooltipItems, activeTooltipTitle: title });
        });
      });
  }

  changeActiveSeries = (activeSeries, activeTooltipTitle) => {
    console.log('change', activeSeries);
    this.setState({ activeSeries, activeTooltipTitle }, () => {
      // @ts-ignore
      const chart = this.chartRef?.chart;
      if (chart && activeSeries) {
        chart.filter('series', (series) => {
          return series === activeSeries ? false : true;
        });
        chart.render(true);
        chart.geometries
          .find((geom) => geom.type === 'point')
          .elements.forEach((ele) => {
            const { Date, series } = ele.getModel().data;
            if (Date === activeTooltipTitle && series === activeSeries) {
              ele.setState('active', true);
            }
          });
      }
    });
  };

  generateTooltip = () => {
    // @ts-ignore
    const chart = this.chartRef?.chart;
    if (!chart) {
      return;
    }
    const { tooltipItems, activeSeries, activeTooltipTitle } = this.state;
    const { colors10 } = chart.themeObject;
    return (
      <div className="g2-tooltip">
        <div className="g2-tooltip-title">{activeTooltipTitle}</div>
        <div className="g2-tooltip-items">
          {tooltipItems.map((item, idx) => {
            const changeActiveSeries = () => this.changeActiveSeries(item.series, item.Date);
            const opacity = item.series === activeSeries ? 0.25 : 1;
            console.log('opacity', opacity, activeSeries);
            return (
              <div className={`g2-tooltip-item tooltip-${item.series} ${item.series === activeSeries ? 'active' : ''}`} onClick={changeActiveSeries}>
                <div className="g2-tooltip-item-marker" style={{ background: colors10[idx] }}></div>
                <div className="g2-tooltip-item-label">{item.series}</div>
                <div className="g2-tooltip-item-value">{item.value || '-'}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <section className={'wrapper'}>
        {this.generateTooltip()}
        <div className={'chart-wrapper'} ref={this.chartNodeRef} />
      </section>
    );
  }
}

insertCss(`
  .g2-tooltip {
    position: absolute;
    z-index: 8;
    transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
    background-color: transparent;
    color: rgb(89, 89, 89);
    padding: 0px 12px;
    margin: 0px;
    overflow-x: auto;
    width: 100%;
    left: 0px;
    top: 0px;
    pointer-events: auto;
  }
  .g2-tooltip-title {
    margin: 10px 0;
    font-weight: 700;
    height: 12px;
    line-height: 12px;
  }
  .g2-tooltip-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: auto;
    width: 100%;
  }
  .g2-tooltip-item {
    opacity: 1;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 92px;
    min-width: 92px;
    padding-left: 12px;
    justify-content: space-between;
  }
  .g2-tooltip-item.active {
    opacity: 0.25;
  }
  .g2-tooltip-item-marker {
    width: 3px;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    height: 48px;
    left: 0px;
  }
  .g2-tooltip-item-label {
    font-size: 14px;
    line-height: 14px;
    margin: 2px 0px 12px;
  }
  .g2-tooltip-item-value {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.65);
    margin: 0px 0px 4px;
  }
  #container {
    width: 100%;
    height: 100%;
  }
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .wrapper .chart-wrapper {
    position: absolute !important;
    top: 90px;
    bottom: 0px;
    right: 10px;
    left: 10px;
    height: calc(100% - 60px);
  }
`);

ReactDOM.render(<TrendChart />, document.getElementById('container'));
