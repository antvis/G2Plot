import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Funnel } from '@antv/g2plot';
import insertCss from 'insert-css';

const formatter = (v) => `${(v * 100).toFixed(2)}%`;

const Plot = () => {
  const data = [
    { stage: '简历投递数', count: 3511 },
    { stage: '简历评估通过数', count: 1024 },
    { stage: '终面通过数', count: 148 },
    { stage: 'offer 数', count: 119 },
    { stage: '入职数', count: 70 },
  ].map((d) => ({ ...d, _count: 1 }));

  const chartNodeRef = useRef();
  const plotRef = useRef();

  const renderAnntations = (plot) => {
    const { chart } = plot;
    const coord = chart.getCoordinate();
    const elements = chart.geometries[0].elements;
    const parsePoints = [];
    elements.forEach((ele, idx) => {
      const { points, nextPoints } = ele.shape.get('origin');
      if (nextPoints) {
        let p0 = { y: (points[1].y + points[2].y) / 2 };
        if (idx > 0) {
          p0.x = parsePoints[idx - 1][1].x;
        } else {
          p0.x = (points[2].x + points[1].x) / 2;
        }
        let p3 = { x: (nextPoints[2].x + nextPoints[1].x) / 2, y: (nextPoints[2].y + nextPoints[1].y) / 2 };
        parsePoints.push([p0, p3]);
      }
    });
    let container = chart.getLayer('fore').findById('annotation-group');
    if (!container) {
      container = chart.getLayer('fore').addGroup({ id: 'annotation-group' });
    } else {
      container.clear();
    }
    parsePoints.forEach((point, idx) => {
      const p0 = coord.convert(point[0]);
      const p3 = coord.convert(point[1]);
      const path = [
        ['M', p0.x, p0.y],
        ['L', p0.x + 15, p0.y],
        ['L', p3.x + 15, p3.y - 2],
        ['L', p3.x, p3.y - 2],
      ];
      container.addShape('path', {
        attrs: {
          path,
          stroke: '#d3d3d3',
          lineWidth: 1,
        },
      });
      const fontSize = 10;
      const offset = 5;
      container.addShape('text', {
        attrs: {
          x: (path[0][1] + path[1][1]) / 2 + offset,
          y: (path[1][2] + path[2][2] + fontSize) / 2,
          text: `转化率：${formatter(data[idx + 1].count / data[idx].count)}`,
          fontSize: 10,
          fill: '#333',
        },
      });
    });
    chart.render(true);
  };

  useEffect(() => {
    // Step 2: 创建图表
    if (chartNodeRef && chartNodeRef.current) {
      const plot = new Funnel(chartNodeRef.current, {
        data: data,
        xField: 'stage',
        yField: '_count',
        legend: false,
        conversionTag: false,
        dynamicHeight: true,
        label: {
          formatter: (text, item) => {
            return `${item._origin.stage} ${item._origin.count}`;
          },
        },
        tooltip: {
          customItems: (items) => {
            return items.map((d) => ({ ...d, value: d.data.count }));
          },
        },
        funnelStyle: {
          stroke: '#fff',
          lineWidth: 3,
        },
      });

      // Step 3: 渲染图表
      plot.render();
      plotRef.current = plot;
    }
  }, [chartNodeRef]);

  useEffect(() => {
    const plot = plotRef && plotRef.current;
    if (plot) {
      renderAnntations(plot);
      plot.chart.on('afterchangesize', () => {
        renderAnntations(plot);
      });
    }
  }, [plotRef]);

  return (
    <section className={'wrapper'}>
      <div ref={chartNodeRef} />
    </section>
  );
};

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(``);

ReactDOM.render(<Plot />, document.getElementById('container'));
