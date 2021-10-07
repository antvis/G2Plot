import { Datum, Sankey } from '../../../../src';
import { createDiv, removeDom } from '../../../utils/dom';
import { ENERGY_RELATIONS } from '../../../data/sankey-energy';
import { EDGES_VIEW_ID, NODES_VIEW_ID } from '../../../../src/plots/sankey/constant';

describe('sankey', () => {
  const div = createDiv();
  const sankey = new Sankey(div, {
    height: 500,
    data: ENERGY_RELATIONS,
    sourceField: 'source',
    targetField: 'target',
    weightField: 'value',
    animation: false,
  });

  sankey.render();
  it('state', () => {
    sankey.update({
      nodeState: {
        active: {
          style: {
            fill: 'red',
          },
        },
        selected: {
          style: {
            stroke: 'red',
          },
        },
      },
      edgeState: {
        active: {
          style: {
            fill: 'blue',
          },
        },
      },
    });

    sankey.setState('active', (datum: Datum) => {
      return datum.isNode;
    });

    let elements = sankey.chart.views.find((v) => v.id === NODES_VIEW_ID).geometries[0].elements;
    elements.forEach((element) => expect(element.shape.attr('fill')).toBe('red'));

    sankey.setState('selected', (datum: Datum) => {
      return datum.isNode;
    });

    elements = sankey.chart.views.find((v) => v.id === NODES_VIEW_ID).geometries[0].elements;
    elements.forEach((element) => expect(element.shape.attr('stroke')).toBe('red'));

    sankey.setState('active', (datum: Datum) => {
      return !datum.isNode;
    });
    elements = sankey.chart.views.find((v) => v.id === EDGES_VIEW_ID).geometries[0].elements;
    elements.forEach((element) => expect(element.shape.attr('fill')).toBe('blue'));
  });

  afterAll(() => {
    sankey.destroy();
    removeDom(div);
  });
});
