import ConstraintSolver from '../../src/util/responsive/constraintSolver';

describe('simple constraint solver', () => {
  const expression = (a, b) => {
    return a >= b;
  };

  it('dd', () => {
    const solver = new ConstraintSolver({
      expression,
      parameter: [ 2, 3 ]
    });

  });

});
