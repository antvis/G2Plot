import React from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@antv/g2plot';
import { get } from '@antv/util';
import { Tooltip } from 'rc-for-plots';

const Plot = () => {
  const $container = React.useRef();
  const $plot = React.useRef();
  let $tooltipId;
  const [data, changeData] = React.useState([]);

  React.useEffect(() => {
    // 建议使用 uniqueId
    $tooltipId = `tooltip${Math.random()}`;
    const div = document.createElement('div');
    div.id = $tooltipId;
    document.body.appendChild(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  // 初始化加载，fetch 数据
  React.useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
      .then((data) => data.json())
      .then((data) => {
        changeData(data);
      });
  }, []);

  const options = React.useMemo(() => {
    const seriesField = 'type';
    const yField = 'value';

    return {
      data: [],
      isGroup: true,
      xField: 'city',
      yField,
      seriesField: 'type',
      tooltip: {
        // 使用该方式，无法设置 enterable. 若有的话，可以考虑监听 tooltip show/hide/change 事件，进行展示
        customContent: (title, items) => {
          let container = document.getElementById($tooltipId);
          if (!container) {
            container = document.createElement('div');
            container.id = $tooltipId;
          }
          const plotBox = $container.current?.getBoundingClientRect();
          if (items.length && plotBox) {
            const position = { x: items[0].x, y: items[0].y };
            const total = items.reduce((sum, d) => sum + (d.data[yField] || null), 0);
            const portal = ReactDOM.createPortal(
              // 可以使用自定义的 react tooltip 组件
              <Tooltip
                x={position.x + plotBox.x}
                y={position.y + plotBox.y - 36}
                header={false}
                details={
                  <Tooltip.Detail
                    data={[
                      { label: '城市', value: title },
                      ...items.map((item) => ({
                        label: get(item, ['data', seriesField]),
                        value: get(item, ['data', yField]),
                      })),
                    ]}
                  />
                }
                footer={<Tooltip.Footer tip={`总计: ${total}`} />}
              />,
              container
            );
            ReactDOM.render(portal, container);
          }

          return container;
        },
      },
    };
  }, []);

  React.useEffect(() => {
    if (!$container?.current) return;
    const newOptions = { ...options, data };
    if (!$plot?.current) {
      $plot.current = new Column($container.current, newOptions);
      $plot.current.render();
    } else {
      $plot.current.update(newOptions);
    }
  }, [options]);

  React.useEffect(() => {
    if ($plot?.current) {
      $plot.current.changeData(data);
    }
  }, [data]);

  return <div ref={$container} />;
};

ReactDOM.render(<Plot />, document.getElementById('container'));
