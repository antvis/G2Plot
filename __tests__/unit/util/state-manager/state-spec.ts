import { Column } from '../../../../src';
import StateManager from '../../../../src/util/state-manager';
import { keys } from '@antv/util';

describe.skip('state', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '300px';
  canvasDiv.style.height = '300px';
  canvasDiv.style.left = '0px';
  canvasDiv.style.top = '0px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [
    {
      year: '1991',
      value: 31,
    },
    {
      year: '1992',
      value: 41,
    },
    {
      year: '1993',
      value: 35,
    },
    {
      year: '1994',
      value: 55,
    },
    {
      year: '1995',
      value: 49,
    },
    {
      year: '1996',
      value: 15,
    },
    {
      year: '1997',
      value: 17,
    },
    {
      year: '1998',
      value: 29,
    },
    {
      year: '1999',
      value: 33,
    },
  ];

  let stateManager;

  it('stateManager initialize', () => {
    stateManager = new StateManager();
    expect(stateManager).toBeInstanceOf(StateManager);
  });

  it('stateManager set state', (done) => {
    stateManager.setState('test', 'a');
    setTimeout(() => {
      expect(stateManager._states['test']).toBe('a');
      done();
    }, 16);
  });

  it('stateManager get state', () => {
    expect(stateManager.getState('test')).toBe('a');
  });

  it('stateManager get all state', (done) => {
    stateManager.setState('test2', (obj) => {
      return obj.type === 'a';
    });
    setTimeout(() => {
      const states = stateManager.getAllStates();
      expect(keys(states).length).toBe(2);
      expect(states.test).toBe('a');
      done();
    }, 20);
  });

  it('stateManager clear state', () => {
    stateManager.clear();
    expect(stateManager._states).toBeEmpty();
  });

  it('bind stateManager to plot', (done) => {
    let stateChanged = false;
    const columnPlot = new Column(canvasDiv, {
      width: 300,
      height: 300,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    columnPlot.render();
    columnPlot.bindStateManager(stateManager, {
      setState: [
        {
          state: {
            name: 'year',
            exp: '1991',
          },
        },
      ],
      onStateChange: [
        {
          name: 'year',
          callback: () => {
            stateChanged = true;
          },
        },
      ],
    });

    setTimeout(() => {
      expect(stateChanged).toBe(true);
      expect(stateManager._states.year).toBe('1991');
      columnPlot.destroy();
      done();
    }, 20);
  });

  it('plot setActive() method, state as function', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 300,
      height: 300,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    columnPlot.render();
    columnPlot.setActive(
      (obj) => {
        return obj.year === '1991';
      },
      {
        fillStyle: 'red',
      }
    );
    const geom = columnPlot.getLayer().plot.geometries[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('fillStyle')).toBe('red');
    columnPlot.destroy();
  });

  it('plot setActive() method, state condition exp as value', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 300,
      height: 300,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    columnPlot.render();
    columnPlot.setActive({ name: 'year', exp: '1993' }, { fillStyle: 'red' });
    const geom = columnPlot.getLayer().plot.geometries[0];
    const shapes = geom.getShapes();
    expect(shapes[2].attr('fillStyle')).toBe('red');
    columnPlot.destroy();
  });

  it('plot setActive() method, state condition exp as function', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 300,
      height: 300,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    columnPlot.render();
    columnPlot.setActive(
      {
        name: 'year',
        exp: (d) => {
          return d !== '1991';
        },
      },
      { fillStyle: 'red' }
    );
    const geom = columnPlot.getLayer().plot.geometries[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('fillStyle')).toBe('#1890FF');
    expect(shapes[1].attr('fillStyle')).toBe('red');
    expect(shapes[2].attr('fillStyle')).toBe('red');
    expect(shapes[3].attr('fillStyle')).toBe('red');
    expect(shapes[4].attr('fillStyle')).toBe('red');
    columnPlot.destroy();
  });

  it('plot setDisable() method', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 300,
      height: 300,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    columnPlot.render();
    columnPlot.setDisable({ name: 'year', exp: '1991' }, { fillStyle: 'grey' });
    const geom = columnPlot.getLayer().plot.geometries[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('fillStyle')).toBe('grey');
    columnPlot.destroy();
  });

  it('plot setSelected() method', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 300,
      height: 300,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    columnPlot.render();
    columnPlot.setSelected({ name: 'year', exp: '1991' }, { stroke: 'black', lineWidth: 1 });
    const geom = columnPlot.getLayer().plot.geometries[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('stroke')).toBe('black');
    expect(shapes[0].attr('lineWidth')).toBe(1);
    columnPlot.destroy();
  });

  it('plot setNormal() method', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 300,
      height: 300,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
    });
    columnPlot.render();
    columnPlot.setActive({ name: 'year', exp: '1993' }, { fillStyle: 'red' });
    columnPlot.setNormal({ name: 'year', exp: '1991' });
    const geom = columnPlot.getLayer().plot.geometries[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('fillStyle')).toBe('#1890FF');
    columnPlot.destroy();
  });

  it('plot defaultState', () => {
    const columnPlot = new Column(canvasDiv, {
      width: 300,
      height: 300,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      defaultState: {
        selected: {
          condition: {
            name: 'year',
            exp: '1991',
          },
        },
        disable: {
          condition: {
            name: 'year',
            exp: (d) => {
              return d !== '1991';
            },
          },
        },
      },
    });
    columnPlot.render();
    const geom = columnPlot.getLayer().plot.geometries[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('stroke')).toBe('black');
    expect(shapes[1].attr('opacity')).toBe(0.5);
    expect(shapes[2].attr('opacity')).toBe(0.5);
    expect(shapes[3].attr('opacity')).toBe(0.5);
    columnPlot.destroy();
  });
});
