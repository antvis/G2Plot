import { CirclePacking } from '@antv/g2plot';

const format = (v: string) => (v ? (v.length > 3 ? `${v.slice(0, 2)}...` : v) : '');

fetch('https://gw.alipayobjects.com/os/antfincdn/Nco%241GHZqb/philosopher.json')
  .then((data) => data.json())
  .then((data) => {
    const { relations, schools, philosophers } = data;
    function getCirclePackingData() {
      const root = {
        name: '哲学家',
        children: [],
      };

      const schoolPhilosophers = relations.filter((d) => d.type === '0');
      const map = new Map();
      for (const { from, to } of schoolPhilosophers) {
        const s = schools.find((d) => d.id === +from);
        const p = philosophers.find((d) => d.id === +to);
        const pNode = {
          name: p.name,
          value: 1,
          children: [],
        };
        const sNode = map.get(s.name);

        if (!sNode) {
          const newSNode = {
            name: s.name,
            children: [pNode],
          };
          map.set(s.name, newSNode);
        } else {
          sNode.children.push(pNode);
        }
      }

      for (const [key, value] of map) {
        if (value.children.length <= 1) {
          const node = value.children[0];
          node.name = `${node.name}: ${value.name}`;
          root.children.push(node);
        } else {
          root.children.push(value);
        }
      }

      return root;
    }

    const plot = new CirclePacking('container', {
      width: 600,
      height: 600,
      appendPadding: 30,
      autoFit: true,
      padding: 0,
      data: getCirclePackingData(),
      colorField: 'r',
      color: 'rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)',
      pointStyle: {
        stroke: 'rgb(183, 55, 121)',
        lineWidth: 0.5,
      },
      label: {
        formatter: (d) => {
          return d.children.length === 0 ? format(d.name) : '';
        },
        offsetY: 12,
        style: {
          fontSize: 10,
          textAlign: 'center',
          fill: 'rgba(0,0,0,0.65)',
        },
      },
      hierarchyConfig: {
        padding: 0.01,
      },
      legend: false,
    });

    plot.render();
  });
