// Installing third-party modules by tnpm or cnpm will name modules with underscore as prefix.
// In this case _{module} is also necessary.
const esm = ['internmap', 'd3-*', 'lodash-es'].map((d) => `_${d}|${d}`).join('|');

module.exports = {
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  testTimeout: 30000,
  setupFilesAfterEnv: ['jest-extended', './jest.setup.js'],
  preset: 'ts-jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/_template/**',
    '!**/interactions/**',
    '!**/venn/layout/**',
  ],
  testRegex: '/__tests__/.*-spec\\.ts?$',
  moduleNameMapper: {
    'lodash-es': 'lodash',
    'd3-color': 'd3-color/dist/d3-color.min.js',
    'd3-interpolate': 'd3-interpolate/dist/d3-interpolate.min.js',
  },
};
