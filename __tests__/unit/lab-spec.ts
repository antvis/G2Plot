import { Lab, notice, Stage } from '../../src/lab';

describe('lab', () => {
  it('lab', () => {
    expect(Lab).toBeDefined();
    expect(Lab.MultiView).toBeDefined();
  });

  it('notice', () => {
    const fn = jest.fn();
    window.console.warn = fn;

    notice(Stage.DEV, 'Test');
    expect(fn).toBeCalledWith(`Plot 'Test' is in DEV stage, just give us issues.`);

    notice(Stage.BETA, 'X');
    expect(fn).toBeCalledWith(`Plot 'X' is in BETA stage, DO NOT use it in production env.`);

    notice(Stage.STABLE, 'Y');
    expect(fn).toBeCalledWith(`Plot 'Y' is in STABLE stage, import it by "import { Y } from '@antv/g2plot'".`);

    // @ts-ignore
    notice('NO-STAGE', 'Y');
    expect(fn).toBeCalledWith(`invalid Stage type.`);
  });
});
