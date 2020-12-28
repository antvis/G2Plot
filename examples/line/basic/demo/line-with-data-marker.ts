import { G2, Line } from '@antv/g2plot';

G2.registerShape('point', 'breath-point', {
  draw(cfg, container) {
    const data = cfg.data;
    const point = { x: cfg.x, y: cfg.y };
    const group = container.addGroup();
    if (data.time === '14.20' && data.date === 'today') {
      const decorator1 = group.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: cfg.color,
          opacity: 0.5,
        },
      });
      const decorator2 = group.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: cfg.color,
          opacity: 0.5,
        },
      });
      const decorator3 = group.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 10,
          fill: cfg.color,
          opacity: 0.5,
        },
      });
      decorator1.animate(
        {
          r: 20,
          opacity: 0,
        },
        {
          duration: 1800,
          easing: 'easeLinear',
          repeat: true,
        }
      );
      decorator2.animate(
        {
          r: 20,
          opacity: 0,
        },
        {
          duration: 1800,
          easing: 'easeLinear',
          repeat: true,
          delay: 600,
        }
      );
      decorator3.animate(
        {
          r: 20,
          opacity: 0,
        },
        {
          duration: 1800,
          easing: 'easeLinear',
          repeat: true,
          delay: 1200,
        }
      );
      group.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 6,
          fill: cfg.color,
          opacity: 0.7,
        },
      });
      group.addShape('circle', {
        attrs: {
          x: point.x,
          y: point.y,
          r: 1.5,
          fill: cfg.color,
        },
      });
    }

    return group;
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/cpu-data.json')
  .then((res) => res.json())
  .then((data) => {
    const plot = new Line('container', {
      autoFit: true,
      height: 500,
      data,
      meta: {
        cpu: {
          time: { type: 'cat' },
          max: 100,
          min: 0,
        },
      },
      xField: 'time',
      yField: 'cpu',
      seriesField: 'date',
      tooltip: { showMarkers: false },
      point: {
        shape: 'breath-point',
      },
    });

    plot.render();
  });
