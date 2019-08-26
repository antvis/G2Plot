import { defaultTheme } from '../../theme';

defaultTheme.registerPlotTheme('gauge', {
  stripWidth: 30,
  stripBackColor: '#ddd',
  tickInterval: 20,
  tickLabelPos: 'inner',
  tickLabelSize: 16,
  tickLabelColor: '#aaa',
  tickLineColor: '#aaa',
  subTickCount: 4,
  labelPos: ['50%', '80%'],
  labelColor: '#666',
  labelSize: 30,
});
