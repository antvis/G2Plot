import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from 'antd';
import { Column } from '@antv/g2plot';
import insertCss from 'insert-css';

class Plot extends React.Component {
  chartNodeRef = React.createRef();
  chartRef = React.createRef();

  componentDidMount() {
    fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
      .then((data) => data.json())
      .then((data) => {
        const chartDom = this.chartNodeRef.current;

        const plot = new Column(chartDom, {
          data,
          xField: 'city',
          yField: 'value',
          seriesField: 'type',
          isGroup: 'true',
        });

        plot.render();
        this.chartRef.current = plot;
      });
  }

  handlePositionChange = (v) => {
    const plot = this.chartRef.current;
    if (plot) {
      plot.update({ legend: { position: v } });
    }
  };

  render() {
    return (
      <section>
        <div>
          <span className="select-label">切换位置</span>
          <Select
            aria-label="select"
            defaultValue="top-left"
            dropdownMatchSelectWidth={false}
            onChange={this.handlePositionChange}
            size="small"
          >
            {[
              'top',
              'top-left',
              'top-right',
              'left',
              'left-top',
              'left-bottom',
              'right',
              'right-top',
              'right-bottom',
              'bottom',
              'bottom-left',
              'bottom-right',
            ].map((opt) => {
              return <Select.Option value={opt}>{opt}</Select.Option>;
            })}
          </Select>
        </div>
        <div className={'chart-wrapper'} ref={this.chartNodeRef} />
      </section>
    );
  }
}

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .select-label {
    margin-right: 8px;
  }
  .select-label:not(:first-of-type) {
    margin-left: 8px;
  }
  .chart-wrapper {
    margin-top: 12px;
    height: 320px;
  }
`);

ReactDOM.render(<Plot />, document.getElementById('container'));
