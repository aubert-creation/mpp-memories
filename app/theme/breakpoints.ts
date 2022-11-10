// TODO => updates values
const SM = '320px';
const MD = '770px';
const LG = '1024px';
const XL = '1280px';
const XXL = '1440px';
const XXXL = '1680px';

type BreakpointsProp = Array<string> & {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
  xxxl?: string;
};

class Breakpoints {
  constructor(breakpoints: BreakpointsProp) {
    Object.assign(this, breakpoints);
  }

  map(fn: (value: string) => string): Array<string> {
    return Object.values(this).map(fn);
  }
}

const breakpoints = new Breakpoints({
  ...[SM, MD, LG, XL, XXL, XXXL],
  ...{
    sm: SM,
    md: MD,
    lg: LG,
    xl: XL,
    xxl: XXL,
    xxxl: XXXL,
  },
});

export default breakpoints;
