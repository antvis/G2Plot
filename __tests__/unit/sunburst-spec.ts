import { Sunburst } from '../../src';
import { each, clone } from '@antv/util';

describe('sunburst', () => {
  const data = {
    name: 'Family Tree',
    value: 39,
    children: [
      {
        name: 'Grandpa',
        value: 29,
        children: [
          {
            name: 'Uncle Leo',
            value: 15,
            children: [
              {
                name: 'Cousin Jack',
                value: 2,
              },
              {
                name: 'Cousin Mary',
                value: 5,
                children: [
                  {
                    name: 'Jackson',
                    value: 2,
                  },
                ],
              },
              {
                name: 'Cousin Ben',
                value: 4,
              },
            ],
          },
          {
            name: 'Aunt Jane',
            value: 4,
            children: [
              {
                name: 'Cousin Kate',
                value: 4,
              },
            ],
          },
          {
            name: 'Father',
            value: 10,
            children: [
              {
                name: 'Me',
                value: 5,
                itemStyle: {
                  color: 'red',
                },
              },
              {
                name: 'Brother Peter',
                value: 1,
              },
            ],
          },
        ],
      },
      {
        name: 'Mike',
        value: 7,
        children: [
          {
            name: 'Uncle Dan',
            value: 7,
            children: [
              {
                name: 'Cousin Lucy',
                value: 3,
              },
              {
                name: 'Cousin Luck',
                value: 4,
                children: [
                  {
                    name: 'Nephew',
                    value: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Nancy',
        value: 3,
        children: [
          {
            name: 'Uncle Nike',
            value: 3,
            children: [
              {
                name: 'Cousin Betty',
                value: 1,
              },
              {
                name: 'Cousin Jenny',
                value: 2,
              },
            ],
          },
        ],
      },
    ],
  };
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '0px';
  canvasDiv.style.top = '0px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  it.only('initilize', () => {
    const sunBurstPlot = new Sunburst(canvasDiv, {
      width: 600,
      height: 600,
      data,
      colorField: 'name',
      interactions: [
        {
          type: 'drilldown',
          cfg: {
            startNode: {
              name: 'root',
            },
          } as any,
        },
      ],
    });
    sunBurstPlot.render();
  });
});

function processData(data) {
  let sumValue = 0;
  each(data, (d) => {
    sumValue += d.value;
  });

  return { name: 'root', value: sumValue, children: data };
}
