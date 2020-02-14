// 基础饼图 - 显示百分比

const data = [
  {
    type: '分类一',
    value: 27,
  },
  {
    type: '分类二',
    value: 25,
  },
  {
    type: '分类三',
    value: 18,
  },
  {
    type: '分类四',
    value: 15,
  },
  {
    type: '分类五',
    value: 10,
  },
  {
    type: 'Other',
    value: 5,
  },
];

const piePlot = new g2plot.Pie(document.getElementById('canvas'), {
  padding: 'auto',
  data,
  angleField: 'value',
  colorField: 'type',
  label: {
    visible: true,
    formatter: (text, item, index) => {
      return `${(item.percent * 100).toFixed(2)}%`;
    },
  },
  tooltip: {
    visible: true,
    shared: false,
    htmlContent: (title, items) => {
      const item = items[0];
      return `<div class="g2-tooltip">
<div class="g2-tooltip-title" style="margin-bottom: 4px;">显示百分比</div>
  <ul class="g2-tooltip-list" style="margin: 0px; list-style-type: none; padding: 0px;">
    <li data-index="0" style="margin: 0px 0px 4px; list-style-type: none; padding: 0px;">
      <span style="background-color: ${
        item.color
      }; width: 5px; height: 5px; border-radius: 50%; display: inline-block; margin-right: 8px;" class="g2-tooltip-marker"></span>
        ${item.name}<span class="g2-tooltip-value" style="display: inline-block; float: right; margin-left: 30px;">${(
        item.percent * 100
      ).toFixed(2)}%</span>
    </li>
  </ul>
</div>`;
    },
  },
});
piePlot.render();

// 作为模块 避免变量冲突
export {};
