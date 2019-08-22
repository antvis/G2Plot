import * as _ from '@antv/util';

// 存储一些共用部分
const defaultResponsiveTheme = {
  axis: {
    x: {
      category: {
        label: {
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
      },
      linear: {
        label: {
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
      },
      dateTime: {
        label: {
          constraints: [{ name: 'elementDist' }],
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
          constraints: [{ name: 'elementDistVertical' }, { name: 'elementWidth' }],
          rules: {
            elementDistVertical: [{ name: 'nodesResampling' }, { name: 'textHide' }],
            elementWidth: [{ name: 'digitsAbbreviate' }, { name: 'textHide' }],
          },
        },
      }, // linear y axis
      category: {
        label: {
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
  },
};

const RESPONSIVE_THEME_MAP = {};

export function registerResponsiveTheme(name: string, theme) {
  if (getResponsiveTheme(name)) {
    throw new Error(`responsive theme type '${name}' existed.`);
  }
  RESPONSIVE_THEME_MAP[name] = theme;
}

export function getResponsiveTheme(name: string) {
  return RESPONSIVE_THEME_MAP[name];
}

export function updateResponsiveTheme(name: string, cfg) {
  let theme = RESPONSIVE_THEME_MAP[name];
  if (!theme) {
    throw new Error(`responsive theme type '${name}' does not existed.`);
  }
  theme = _.deepMix(theme, cfg);
}

registerResponsiveTheme('default', defaultResponsiveTheme);
