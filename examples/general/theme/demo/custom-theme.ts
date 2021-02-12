import { Column, G2 } from '@antv/g2plot';
import { deepMix } from '@antv/util';

const theme = G2.getTheme('dark');
document.getElementById('container').style.background = theme.background;

fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
  .then((res) => res.json())
  .then((data) => {
    const column = new Column('container', {
      data,
      xField: '城市',
      yField: '销售额',
      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      appendPadding: 10,
      theme: deepMix({}, theme, {
        components: {
          scrollbar: {
            // 默认样式
            default: {
              style: {
                trackColor: 'rgba(255,255,255,0.05)',
                thumbColor: 'rgba(255,255,255,0.25)',
              },
            },
            // hover 时，可以设置滑块样式
            hover: {
              style: {
                thumbColor: 'rgba(255,255,255,0.6)',
              },
            },
          },
        },
      }),
      scrollbar: {
        type: 'horizontal',
      },
    });

    column.render();
  });
