// 存储一些共用部分
export const DEFAULT_RESPONSIVE_THEME = {
  axis: {
    x: {
      category: {
        constraints: [{ name: 'elementDist' }],
        rules: {
          elementDist: [
            {
              name: 'textWrapper',
              option: {
                lineNumber: 2,
              },
            },
            {
              name: 'textRotation',
              option: {
                degree: 45,
              },
            },
            {
              name: 'textRotation',
              option: {
                degree: 90,
              },
            },
            {
              name: 'textAbbreviate',
              option: {
                abbreviateBy: 'end',
              },
            },
            {
              name: 'textHide',
            },
          ],
        },
      },
      linear: {
        constraints: [{ name: 'elementDist' }],
        rules: {
          elementDist: [
            {
              name: 'nodesResampling',
              option: {
                keep: ['end'],
              },
            },
            {
              name: 'textRotation',
              option: {
                degree: 45,
              },
            },
            {
              name: 'textRotation',
              option: {
                degree: 90,
              },
            },
            {
              name: 'robustAbbrevaite',
              option: {
                unit: 'thousand',
                decimal: 1,
                abbreviateBy: 'end',
              },
            },
            {
              name: 'textHide',
            },
          ],
        },
      },
      dateTime: {
        constraints: [{ name: 'elementDist' }],
        rules: {
          elementDist: [
            {
              name: 'datetimeStringAbbrevaite',
            },
            {
              name: 'nodesResamplingByAbbrevate',
              option: {
                // keep: ['end'],
              },
            },
            {
              name: 'textRotation',
              option: {
                degree: 45,
              },
            },
            {
              name: 'textRotation',
              option: {
                degree: 90,
              },
            },
            {
              name: 'nodesResampling',
            },
            {
              name: 'nodesResampling',
            },
            {
              name: 'textHide',
            },
          ],
        },
      },
    },
    y: {
      linear: {
        constraints: [{ name: 'elementDistVertical' }, { name: 'elementWidth' }],
        rules: {
          elementDistVertical: [{ name: 'nodesResampling' }, { name: 'textHide' }],
          elementWidth: [{ name: 'digitsAbbreviate' }, { name: 'textHide' }],
        },
      }, // linear y axis
      category: {
        constraints: [{ name: 'elementDistVertical' }, { name: 'elementWidth' }],
        rules: {
          elementDistVertical: [{ name: 'nodesResampling' }, { name: 'textHide' }],
          elementWidth: [
            {
              name: 'textAbbreviate',
              option: {
                abbreviateBy: 'end',
              },
            },
            { name: 'textHide' },
          ],
        },
      },
    }, // categroy y axis， 条形图
  },
};
