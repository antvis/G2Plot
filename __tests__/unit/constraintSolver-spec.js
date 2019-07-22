import ConstraintSolver from '../../src/util/responsive/constraintSolver';

describe('simple constraint solver', () => {
  const expression = (a, b) => {
    let s = b - 1;
    s = s - 1;
    return a >= Math.abs(s + 8);
  };

  it('dd', () => {
    const solver = new ConstraintSolver({
      expression,
      param: { a: 2, b: 3 },
      variable: 'a'
    });
    solver.solve();
  });

});
