import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Select } from 'antd';
import { Area } from '@antv/g2plot';
import insertCss from 'insert-css';

const options = [
  { label: '最小值', value: 'min' },
  { label: '最大值', value: 'max' },
  { label: '中位值', value: 'median' },
  { label: '平均值', value: 'mean' },
];

const Plot = () => {
  const chartNodeRef = useRef();
  const plotRef = useRef();

  const [startX, setStartX] = useState('min');
  const [startY, setStartY] = useState('median');
  const [endX, setEndX] = useState('max');
  const [endY, setEndY] = useState('median');

  useEffect(() => {
    // Step 2: 创建图表
    const chartDom = chartNodeRef.current;
    const plot = new Area(chartDom, {
      data: [],
      xField: 'Date',
      yField: 'scales',
      smooth: true,
      annotations: [
        {
          type: 'line',
          id: 'line',
          /** 起始位置 */
          start: [startX, startY],
          /** 结束位置 */
          end: [endX, endY],
          text: {
            content: '中位线',
            position: 'right',
            offsetY: 18,
            style: {
              textAlign: 'right',
            },
          },
          style: {
            lineWidth: 0.5,
            lineDash: [4, 4],
          },
        },
      ],
    });

    plot.render();

    plotRef.current = plot;
  }, []);

  useEffect(() => {
    if (plotRef?.current) {
      let label = '辅助线';
      if (startY === endY) {
        label = options.find((opt) => opt.value === startY)?.label || label;
      }

      plotRef.current.addAnnotations([
        {
          type: 'line',
          id: 'line',
          /** 起始位置 */
          start: [startX, startY],
          /** 结束位置 */
          end: [endX, endY],
          text: {
            content: label,
          },
        },
      ]);
    }
  }, [startX, startY, endX, endY]);

  useEffect(() => {
    if (plotRef?.current) {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
        .then((res) => res.json())
        .then((data) => {
          plotRef.current.changeData(data);
        });
    }
  }, [plotRef]);

  return (
    <section className="line-annotation-container">
      <section style={{ display: 'flex' }}>
        <div className="select-container">
          起点 x 位置：
          <Select value={startX} onChange={setStartX} size="small">
            {options.map((d) => (
              <Select.Option value={d.value} key={d.value}>
                {d.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="select-container">
          起点 y 位置：
          <Select value={startY} onChange={setStartY} size="small">
            {options.map((d) => (
              <Select.Option value={d.value} key={d.value}>
                {d.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </section>
      <section style={{ display: 'flex' }}>
        <div className="select-container">
          终点 x 位置：
          <Select value={endX} onChange={setEndX} size="small">
            {options.map((d) => (
              <Select.Option value={d.value} key={d.value}>
                {d.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="select-container">
          终点 y 位置：
          <Select value={endY} onChange={setEndY} size="small">
            {options.map((d) => (
              <Select.Option value={d.value} key={d.value}>
                {d.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </section>
      <div className={'chart-wrapper'} ref={chartNodeRef} />
    </section>
  );
};

insertCss(`
.line-annotation-container {
  position: relative;
  padding: 10px;
}
.line-annotation-container .select-container {
  display: flex;
  flex-direction: row;
  margin: 4px 12px 0;
}
.chart-wrapper {
  width: calc(100% - 30px);
  margin: 18px 10px;
}
`);

ReactDOM.render(<Plot />, document.getElementById('container'));
