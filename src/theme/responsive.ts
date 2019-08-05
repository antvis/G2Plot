const responsiveTheme = {
  element: {
    column : {
      constraints : [
        'columnWidth',
      ],
    },
    ring: {
      constraints : [
        'ringThickness',
        'minRingThickness',
      ],
    },
  },
  labels:{
    line : {
      constraints: [
        'elementCollision',
      ],
      rules: {
        elementCollision: [
          { name: 'nodesResamplingByChange' },
          // { name: 'nodeJitter' },
          { name: 'clearOverlapping' },
        ],
      },
    },
    column: {
      constraints: [
        'elementCollision',
      ],
      rules: {
        elementCollision:[
          { name: 'nodeJitterUpward' },
          { name: 'nodesResamplingByState',
            options:{
              keep: [ 'min', 'max', 'median' ],
            },
          },
          {
            name: 'textHide',
          },
        ],
      },
    },
  },
  axis: {
    x: {
      category: {
        label: {
          constraints: [
            'elementDist',
          ],
          rules: {
            elementDist: [
              {
                name: 'textWrapper',
                options: {
                  lineNumber: 2,
                },
              },
              {
                name: 'textRotation',
                options: {
                  degree: 45,
                },
              },
              {
                name: 'textRotation',
                options: {
                  degree: 90,
                },
              },
              {
                name: 'textAbbreviate',
                options: {
                  abbreviateBy: 'end',
                },
              },
              {
                name: 'textHide',
              },
            ],
          },
        },
      },
      linear: {
        label: {
          constraints: [
            'elementDist',
          ],
          rules: {
            elementDist:
            [ {
              name: 'nodesResampling',
              options: {
                keep: [ 'end' ],
              },
            },
              {
                name: 'textRotation',
                options: {
                  degree: 45,
                },
              },
              {
                name: 'textRotation',
                options: {
                  degree: 90,
                },
              },
              {
                name: 'robustAbbrevaite',
                options: {
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
      },
      dateTime: {
        label: {
          constraints: [
            'elementDist',
          ],
          rules: {
            elementDist: [
              {
                name: 'datetimeStringAbbrevaite',
              },
              {
                name: 'nodesResamplingByAbbrevate',
                options: {
                  // keep:['end']
                },
              },
              {
                name: 'textRotation',
                options: {
                  degree: 45,
                },
              },
              {
                name: 'textRotation',
                options: {
                  degree: 90,
                },
              },
              {
                name: 'textHide',
              },
            ],
          },
        },
      },
    },
    y: {
      linear: {
        label: {
          constraints: [
            'elementDistVertical',
            'elementWidth',
          ],
          rules: {
            elementDistVertical: [
              { name: 'nodesResampling' },
              { name: 'textHide' },
            ],
            elementWidth: [
              { name: 'digitsAbbreviate' },
              { name: 'textHide' },
            ],
          },
        },

      }, // linear y axis
      category: {
        label:{
          constraints: [
            'elementDistVertical',
            'elementWidth',
          ],
          rules: {
            elementDistVertical: [
              { name: 'nodesResampling' },
              { name: 'textHide' },
            ],
            elementWidth: [
              { name: 'textAbbreviate',
                options: {
                  abbreviateBy: 'end',
                },
              },
              { name: 'textHide' },
            ],
          },
        },

      }, // categroy y axis， 条形图
    },
  },
};

export default responsiveTheme;
