import React from 'react';
import ReactDOM from 'react-dom';
import { Select, Input } from 'antd';
import { Line } from '@antv/g2plot';
import insertCss from 'insert-css';

class LinePlot extends React.Component {
  chartNodeRef = React.createRef();
  chartRef = React.createRef();

  componentDidMount() {
    // Step 1: 声明数据源
    // G2Plot 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    /** Generater a data array of 50 items */
    const data = new Array(50).fill(1).map((d, idx) => ({ x: `${idx}`, y: idx + Math.random() * 10 }));
    // Step 2: 创建图表
    const chartDom = this.chartNodeRef.current;
    const line = new Line(chartDom, {
      data,
      xField: 'x',
      yField: 'y',
    });

    // Step 3: 渲染图表
    line.render();
    this.chartRef.current = line;
  }

  handleAnimationChange = (v) => {
    const line = this.chartRef.current;
    if (line) {
      line.update({ animation: { appear: { animation: v } } });
    }
  };

  handleDurationChange = (e) => {
    const v = e.target.value;
    const line = this.chartRef.current;
    if (line) {
      line.update({ animation: { appear: { duration: v } } });
    }
  };

  render() {
    return (
      <section>
        <div>
          <span className="select-label">切换动画</span>
          <Select defaultValue="wave-in" onChange={this.handleAnimationChange} size="small">
            {['wave-in', 'zoom-in', 'fade-in'].map((opt) => {
              return <Select.Option value={opt}>{opt}</Select.Option>;
            })}
          </Select>
          <span className="select-label">动画持续时间</span>
          <Input className="custom-input" placeholder="500ms" size="small" onChange={this.handleDurationChange} />
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
  .custom-input {
    display: inline-block;
    width: 200px !important;
  }
  .chart-wrapper {
    margin-top: 12px;
  }
`);

ReactDOM.render(<LinePlot />, document.getElementById('container'));
