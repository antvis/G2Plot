import { Column } from '@antv/g2plot';

const pattern = ({ name }) => {
  return name === '理科'
    ? {
        type: 'line',
        cfg: {
          lineWidth: 6,
          spacing: 5,
        },
      }
    : {
        type: 'dot',
        cfg: {
          size: 10,
        },
      };
};

fetch('https://gw.alipayobjects.com/os/antfincdn/cK%24sTxSsah/stack-group-column.json')
  .then((data) => data.json())
  .then((data) => {
    const column = new Column('container', {
      data,
      xField: 'month',
      yField: 'value',
      isGroup: true,
      isStack: true,
      seriesField: 'type',
      groupField: 'name',
      rawFields: ['type', 'name'],
      columnStyle: {
        radius: 5,
      },
      pattern,
    });

    column.update({
      theme: {
        styleSheet: {
          brandColor: '#FF4500',
          paletteQualitative10: [
            '#FF4500',
            '#1AAF8B',
            '#406C85',
            '#F6BD16',
            '#B40F0F',
            '#2FB8FC',
            '#4435FF',
            '#FF5CA2',
            '#BBE800',
            '#FE8A26',
          ],
          paletteQualitative20: [
            '#FF4500',
            '#1AAF8B',
            '#406C85',
            '#F6BD16',
            '#B40F0F',
            '#2FB8FC',
            '#4435FF',
            '#FF5CA2',
            '#BBE800',
            '#FE8A26',
            '#946DFF',
            '#6C3E00',
            '#6193FF',
            '#FF988E',
            '#36BCCB',
            '#004988',
            '#FFCF9D',
            '#CCDC8A',
            '#8D00A1',
            '#1CC25E',
          ],
        },
      },
    });
    column.render();
  });
