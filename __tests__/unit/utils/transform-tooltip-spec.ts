import { transformTooltip } from '../../../src/utils';

describe('transform tooltip', () => {
  it('tooltip', () => {
    expect(transformTooltip(undefined)).not.toBeDefined();
    expect(transformTooltip(null)).toBeNull();
    expect(transformTooltip('null')).toBe('null');
    expect(transformTooltip('')).toBe('');
    expect(transformTooltip({ showMarkers: true })).toEqual({ showMarkers: true });
    expect(transformTooltip({ showMarkers: true, customContent: () => '123' }).customContent).toBeTruthy();
    expect(transformTooltip({ showMarkers: true, formatter: () => '456' }).customContent).toBeTruthy();
  });
});
