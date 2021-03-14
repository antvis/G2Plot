import { Heatmap } from '@antv/g2plot';

// 数据截取于: 2021-02-21 13:04:19, 前往参与游戏: https://antv-studio.antfin.com/bless-heatmap
fetch('https://gw.alipayobjects.com/os/antfincdn/wOj8DF0KF0/desire-heatmap.json')
  .then((data) => data.json())
  .then((data) => {
    const COLS = 15;
    const ROWS = 10;
    function getSizeFactor() {
      const box = document.getElementById('container').getBoundingClientRect();
      const size = Math.min(box.width / COLS, box.height / ROWS);
      return {
        width: size * COLS,
        height: size * ROWS,
        size,
      };
    }
    const { width, height, size } = getSizeFactor();
    const plot = new Heatmap('container', {
      data,
      autoFit: false,
      width,
      height,
      xField: 'row',
      yField: 'col',
      colorField: 'count',
      shape: 'square',
      sizeRatio: 1,
      color: [
        '#dcdcdc',
        '#dad0bf',
        '#d9c3a1',
        '#d7b784',
        '#d6aa67',
        '#da9a54',
        '#e3864c',
        '#ec7344',
        '#f65f3c',
        '#ff4b34',
      ],
      tooltip: false,
      xAxis: false,
      yAxis: false,
      meta: {
        count: {
          max: 200,
        },
      },
      label: {
        formatter: (datum) => datum.item,
        layout: [{ type: 'adjust-color' }],
        style: { fontWeight: 700, fontSize: (size / 36) * 14 * (size < 32 ? 1.2 : 1) },
      },
      theme: {
        geometries: {
          polygon: {
            square: {
              active: {
                style: {
                  stroke: '#fff',
                },
              },
            },
          },
        },
      },
      interactions: [
        {
          type: 'element-active',
          cfg: {
            showEnable: [
              { trigger: 'element:mouseenter', action: 'cursor:pointer' },
              { trigger: 'element:mouseleave', action: 'cursor:default' },
            ],
          },
        },
      ],
    });
    plot.render();

    window.addEventListener('resize', () => {
      const { width, height, size } = getSizeFactor();
      plot.changeSize(width, height);
      if (plot.options.width / COLS !== size) {
        plot.update({
          label: {
            formatter: (datum) => datum.item,
            layout: [{ type: 'adjust-color' }],
            style: { fontWeight: 700, fontSize: 14 * (size < 32 ? 0.8 : size < 40 ? 1.48 : 1.3) },
          },
        });
      }
    });
  });
