import { Venn } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/c4c17fe9-0a93-4255-bc1e-1ff84966d24a.json')
  .then((data) => data.json())
  .then((data) => {
    const sum = data.reduce((a, b) => a + b.size, 0);
    const toPercent = (p) => `${(p * 100).toFixed(2)}%`;
    const plot = new Venn('container', {
      setsField: 'sets',
      sizeField: 'size',
      data,
      pointStyle: { fillOpacity: 0.85 },
      color: ['#9DF5CA', '#61DDAA', '#42C090'],
      label: {
        style: {
          lineHeight: 18,
        },
        formatter: (datum) => {
          return datum.sets.length > 1
            ? `${datum.size} (${toPercent(datum.size / sum)})`
            : `${datum.id}\n${datum.size} (${toPercent(datum.size / sum)})`;
        },
      },
      tooltip: {
        fields: ['sets', 'size'],
        customContent: (title, items) => {
          const datum = items[0]?.data || {};
          const color = items[0]?.color;

          let listStr = '';
          if (datum['伙伴名称']?.length > 0) {
            datum['伙伴名称'].forEach((item, idx) => {
              listStr += `<div class="g2-tooltip-list-item">
                  <span class="g2-tooltip-name">${idx}. ${item}</span>
              </div>`;
            });
          }

          return `<div class="g2-tooltip-list">
            <div class="g2-tooltip-list-item">
              <span class="g2-tooltip-marker" style="background:${color}; width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 8px;"></span>
              <span class="g2-tooltip-name">${datum.sets?.join('&')}</span>
              <span class="g2-tooltip-value">${datum.size}</span>
            </div>
            ${
              listStr
                ? `<div class="g2-tooltip-list-item">
              <span class="g2-tooltip-name"><b>伙伴名称</b></span>
            </div>${listStr}`
                : ''
            }
          </div>`;
        },
      },
    });
    plot.render();
  });
