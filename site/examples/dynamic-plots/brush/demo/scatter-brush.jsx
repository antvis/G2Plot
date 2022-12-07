import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from 'antd';
import { Scatter } from '@antv/g2plot';
import insertCss from 'insert-css';

class Plot extends React.Component {
  chartNodeRef = React.createRef();
  chartRef = React.createRef();

  componentDidMount() {
    const chartDom = this.chartNodeRef.current;
    const plot = new Scatter(chartDom, {
      data: [],
      xField: 'weight',
      yField: 'height',
      colorField: 'gender',
      size: 5,
      shape: 'circle',
      pointStyle: {
        fillOpacity: 1,
      },
      brush: {
        enabled: true,
        // 圈选高亮，不指定默认为: filter
        action: 'highlight',
        mask: {
          style: {
            fill: 'rgba(0,0,0,0.15)',
            stroke: 'rgba(0,0,0,0.45)',
            lineWidth: 0.5,
          },
        },
      },
    });

    // Step 3: 渲染图表
    plot.render();
    this.chartRef.current = plot;

    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
      .then((res) => res.json())
      .then((data) => {
        plot.changeData(data);
      });
  }

  handleChange = (v) => {
    const plot = this.chartRef.current;
    if (plot) {
      plot.update({ brush: { type: v } });
    }
  };

  render() {
    return (
      <section>
        <div>
          <span className="select-label">Brush 类型</span>
          <Select aria-label="select" defaultValue="rect" onChange={this.handleChange} size="small">
            {['rect', 'x-rect', 'y-rect', 'circle', 'path'].map((opt) => {
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
insertCss(`
  .select-label {
    margin-right: 8px;
  }
  .select-label:not(:first-of-type) {
    margin-left: 8px;
  }
  .chart-wrapper {
    margin-top: 12px;
  }
`);

ReactDOM.render(<Plot />, document.getElementById('container'));
