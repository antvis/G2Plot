const responsiveTheme = {
  geometry: {
    column : {
      constraints : [
        { name: 'columnWidth',
          option:{
            ratio: 0.1
          }
        }
      ],
    },
    ring: {
      constraints : [
        { name: 'ringThickness' },
        { name: 'minRingThickness' },
      ],
    },
  },
  labels:{
    line : {
      constraints: [
        { name: 'elementCollision' }
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
        { name: 'elementCollision'},
      ],
      rules: {
        elementCollision:[
          { name: 'nodeJitterUpward' },
          { name: 'nodesResamplingByState',
            option:{
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
            {name:'elementDist'},
          ],
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
      },
      linear: {
        label: {
          constraints: [
            { name: 'elementDist'},
          ],
          rules: {
            elementDist:
            [ {
              name: 'nodesResampling',
              option: {
                keep: [ 'end' ],
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
      },
      dateTime: {
        label: {
          constraints: [
            {name: 'elementDist'},
          ],
          rules: {
            elementDist: [
              {
                name: 'datetimeStringAbbrevaite',
              },
              {
                name: 'nodesResamplingByAbbrevate',
                option: {
                  // keep:['end']
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
            {name:'elementDistVertical'},
            {name:'elementWidth'},
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
            {name:'elementDistVertical'},
            {name: 'elementWidth'},
          ],
          rules: {
            elementDistVertical: [
              { name: 'nodesResampling' },
              { name: 'textHide' },
            ],
            elementWidth: [
              { name: 'textAbbreviate',
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
  },
};

export default responsiveTheme;


function registerResponsiveTheme(name,theme){

}

function getResponsiveTheme(){
  
}



