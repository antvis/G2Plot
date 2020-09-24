import { SunBurst } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('sun burst', () => {
  it('init: default', () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json')
      .then((res) => res.json())
      .then((fetchData) => {
        const sunBurstPlot = new SunBurst(createDiv(), {
          width: 400,
          height: 400,
          data: fetchData,
          seriesField: 'sum',
          colorField: 'value',
          color: ['#BAE7FF', '#1890FF', '#0050B3'],
          innerRadius: 0.3,
          label: {
            position: 'middle',
          },
          tooltip: {
            customContent: (_, item) => {
              const mappingData = item?.[0]?.mappingData;
              const data = mappingData?._origin?.data;
              return `<div>${data?.label} - ${data?.sum}</div>`;
            },
          },
          interactions: [{ type: 'element-active' }],
        });
        sunBurstPlot.render();
      });
  });
});

describe('sun burst', () => {
  it('init: type treemap', () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/mobile.json')
      .then((res) => res.json())
      .then((mobiles) => {
        mobiles.forEach(function (mobile) {
          mobile.value = null;
        });
        const data = {
          name: 'root',
          children: mobiles,
        };
        const sunBurstPlot = new SunBurst(createDiv(), {
          width: 400,
          height: 400,
          data,
          type: 'treemap',
          seriesField: 'value',
          reflect: 'y',
          colorField: 'brand',
          sunBurstStyle: {
            lineWidth: 1,
            stroke: '#fff',
          },
          interactions: [{ type: 'element-active' }],
        });
        sunBurstPlot.render();
      });
  });
});
