import { Column, Pie } from '@antv/g2plot';
import { each, groupBy } from '@antv/util';
import insertCss from 'insert-css';

// We use 'insert-css' to insert custom styles
// It is recommended to add the style to your own style sheet files
// If you want to copy the code directly, please remember to install the npm package 'insert-css
insertCss(`
#container {
  display: flex;
  flex-direction: column !important;
  padding: 8px;
}
#container1, #container2 {
  flex: 1;
}
`);

fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
  .then((data) => data.json())
  .then((data) => {
    const pieData = ((originData) => {
      const groupData = groupBy(originData, 'type');
      const result = [];
      each(groupData, (values, k) => {
        result.push({ type: k, value: values.reduce((a, b) => a + b.value, 0) });
      });
      return result;
    })(data);

    const pie = new Pie('container1', {
      data: pieData,
      colorField: 'type',
      angleField: 'value',
      label: { type: 'inner' },
      tooltip: false,
      state: {
        // 设置【active】激活状态样式 - 无描边
        active: {
          style: {
            lineWidth: 0,
          },
        },
      },
      interactions: [
        {
          type: 'element-highlight',
          cfg: {
            showEnable: [{ trigger: 'element:mouseenter', action: 'cursor:pointer' }],
            end: [
              { trigger: 'element:mouseleave', action: 'cursor:default' },
              { trigger: 'element:mouseleave', action: 'element-highlight:reset' },
            ],
          },
        },
      ],
    });

    const column = new Column('container2', {
      data,
      xField: 'city',
      yField: 'value',
      seriesField: 'type',
      isGroup: 'true',
      legend: false,
      columnStyle: {
        radius: [4, 4, 0, 0],
      },
    });

    pie.render();
    column.render();

    pie.on('element:mouseover', (evt) => {
      const eventData = evt.data;
      if (eventData?.data) {
        const type = eventData.data.type;
        column.setState('selected', (datum) => datum.type === type);
        column.setState('selected', (datum) => datum.type !== type, false);
      }
    });
    pie.on('element:mouseleave', () => {
      // 取消 selected 选中状态
      column.setState('selected', () => true, false);
    });

    pie.on('element:click', (evt) => {
      const eventData = evt.data;
      if (eventData?.data) {
        const type = eventData.data.type;
        pie.chart.changeData(pieData.filter((datum) => datum.type === type));
        column.chart.changeData(data.filter((datum) => datum.type === type));
      }
    });
    // 双击，还原数据
    pie.on('element:dblclick', () => {
      pie.chart.changeData(pieData);
      column.chart.changeData(data);
    });
  });
