import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, Button } from 'antd';
import { Bar } from '@antv/g2plot';
import insertCss from 'insert-css';

function format(number) {
  if (number >= 1e8) {
    return `${(number / 1e8).toFixed(2)}亿`;
  } else if (number >= 1e4 && number < 1e8) {
    return `${(number / 1e4).toFixed(2)}万`;
  }
  return number;
}

class Funnel extends React.Component {
  chartNodeRef = React.createRef();
  state = {
    data: [
      {
        name: '曝光',
        count: 120000000,
        hints: [
          {
            message: '曝光率过低',
          },
        ],
      },
      {
        name: '点击',
        count: 80000000,
      },
      {
        name: '承接访问页',
        count: 60000000,
      },
      {
        name: '承接点击页',
        count: 40000000,
        hints: [
          {
            message: '最终转化率过低，请关注表单提交成功率',
          },
        ],
      },
      {
        name: '最终转化量',
        count: 2000000,
      },
    ],
    barMargin: 0,
    firstMargin: 0,
  };

  componentDidMount() {
    // Step 1: 声明数据源
    // G2Plot 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    const { data } = this.state;

    // Step 2: 创建图表
    const chartDom = this.chartNodeRef.current;
    const bar = new Bar(chartDom, {
      data: data,
      autoFit: true,
      xField: 'count',
      yField: 'name',
      yAxis: false,
      xAxis: false,
      conversionTag: {
        spacing: 8,
        text: {
          style: {
            fontSize: 12,
            fontWeight: 700,
          },
          formatter: (prev, next) =>
            data[0]?.count === 0 ? '0.00%' : `${((next / data[0]?.count) * 100)?.toFixed(2)}%`,
        },
        arrow: {
          style: {
            fill: '#F1F1FB',
          },
        },
      },
      tooltip: {
        showTitle: false,
        formatter: (item) => ({ name: item.name, value: format(item.count) }),
      },
      label: {
        content: (item) => {
          return `${format(item?.count)}`;
        },
        layout: [
          {
            type: 'adjust-color',
          },
        ],
      },
    });

    // Step 3: 渲染图表
    bar.render();

    const { chart } = bar;
    const coord = chart.getCoordinate();
    const xScale = chart.getXScale();

    // 计算出每个bar左上角之间的间距
    this.setState({ firstMargin: coord.convert({ x: xScale?.scale(data[0]?.name), y: 0 })?.y });
    this.setState({
      barMargin:
        coord.convert({ x: xScale?.scale(data[1]?.name), y: 0 })?.y -
        coord.convert({ x: xScale?.scale(data[0]?.name), y: 0 })?.y,
    });
  }

  render() {
    const { data, barMargin, firstMargin } = this.state;

    return (
      <section className={'wrapper'}>
        <p className={'title'}>召回（PV）</p>
        <div className={'yaxis-wrapper'}>
          {data?.map((item, index) => {
            return (
              <p className={'yaxis'} style={index ? { marginTop: '24px' } : {}}>
                {item.name}
              </p>
            );
          })}
        </div>

        {data?.map((item, index) => {
          return (
            item?.hints?.length && (
              <div className={'message-list'} style={{ top: `${index * barMargin + 94}px` }}>
                <div>
                  {item?.hints?.map((subItem) => {
                    return (
                      <Alert
                        type="warning"
                        showIcon
                        message={
                          <span>
                            <span>{subItem.message}</span>
                            <Button type="link">查看原因</Button>
                          </span>
                        }
                      ></Alert>
                    );
                  })}
                </div>
              </div>
            )
          );
        })}

        <div className={'chart-wrapper'} ref={this.chartNodeRef} />
      </section>
    );
  }
}

insertCss(`
.wrapper {
  position: relative;
  padding: 10px;
}
.wrapper .title {
  font-size: 20px;
}
.wrapper .yaxis-wrapper {
  width: 70px;
  font-size: 14px;
}
.wrapper .yaxis {
  position: relative;
  display: -webkit-box;
  width: 70px;
  height: 43px;
  overflow: hidden;
  font-weight: 500;
  line-height: 22px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.wrapper .icon-question {
  position: absolute;
  top: 4px;
  right: -6px;
  color: #999;
}
.wrapper .chart-wrapper {
  height: 340px;
  position: absolute !important;
  top: 40px;
  right: 10px;
  left: 96px;
}
.wrapper .message-list {
  position: absolute;
  right: 10px;
  left: 186px;
  z-index: 1;
}
.wrapper .message-list .ant-alert-icon {
  position: relative;
  top: 0;
  left: 0;
  margin-right: 8px;
}
.wrapper .message-list .ant-alert-warning {
  height: 28px;
  padding: 0 8px;
  line-height: 28px;
  border: none;
  border-radius: 0;
}
`);

ReactDOM.render(<Funnel />, document.getElementById('container'));
