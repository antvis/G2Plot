import { getDefaultOptions, chordLayout } from '../../../../src/utils/transform/chord';
import { transformDataToNodeLinkData } from '../../../../src/utils/data';
import { populationMovementData } from '../../../data/chord-population';
describe('chordLayout', () => {
  it('chordLayout-weight-true', () => {
    const chordLayoutData = chordLayout(
      { weight: true },
      transformDataToNodeLinkData(populationMovementData, 'source', 'target', 'value')
    );
    const nodesData = chordLayoutData.nodes.map((node) => {
      return {
        id: node.id,
        x: node.x,
        y: node.y,
        name: node.name,
        value: node.value,
      };
    });
    const edgesData = chordLayoutData.links.map((link) => {
      return {
        source: link.source.name,
        target: link.target.name,
        x: link.x,
        y: link.y,
        value: link.value,
      };
    });
    expect(nodesData[0]).toEqual({
      id: 0,
      name: '北京',
      value: 325,
      x: [0.00625, 0.24959442595673875, 0.24959442595673875, 0.00625],
      y: [-0.025, -0.025, 0.025, 0.025],
    });
    expect(nodesData.length).toBe(8);

    expect(edgesData[0]).toEqual({
      source: '北京',
      target: '天津',
      value: 30,
      x: [0.00625, 0.028712562396006655, 0.2620944259567387, 0.28455698835274534],
      y: [0, 0, 0, 0],
    });
    expect(edgesData.length).toBe(13);
  });

  it('chordLayout-weight-false', () => {
    const chordLayoutData = chordLayout(
      { weight: false },
      transformDataToNodeLinkData(populationMovementData, 'source', 'target', 'value')
    );
    const nodesData = chordLayoutData.nodes.map((node) => {
      return {
        id: node.id,
        x: node.x,
        y: node.y,
        name: node.name,
        value: node.value,
      };
    });
    const edgesData = chordLayoutData.links.map((link) => {
      return {
        source: link.source.name,
        target: link.target.name,
        x: link.x,
        y: link.y,
        value: link.value,
      };
    });
    expect(nodesData[0]).toEqual({
      id: 0,
      name: '北京',
      value: 325,
      x: 0.0625,
      y: 0,
    });
    expect(nodesData.length).toBe(8);

    expect(edgesData[0]).toEqual({
      source: '北京',
      target: '天津',
      value: 30,
      x: [0.0625, 0.1875],
      y: [0, 0],
    });
    expect(edgesData.length).toBe(13);
  });

  it('defaultOptions', () => {
    expect(getDefaultOptions({}).weight).toBe(false);
    expect(getDefaultOptions({}).y).toBe(0);
    expect(getDefaultOptions({}).nodePaddingRatio).toBe(0.1);
    expect(getDefaultOptions({}).nodeWidthRatio).toBe(0.05);
  });
});
