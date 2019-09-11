export const sigmoid1 = (input) => {
  // input expected to be between 0 and 1
  const slope = 10;
  const exponent = -slope * (input - 0.5);
  return 1 / (1 + Math.pow(Math.E, exponent));
}

export const sigmoid2 = (input) => {
  // input expected to be between 0 and 1
  const slope = 15;
  const exponent = -slope * (input - 0.66);
  return 1 / (1 + Math.pow(Math.E, exponent));
}

export const sigmoid3 = (input) => {
  // input expected to be between 0 and 1
  const slope = 10;
  const exponent = -slope * (1.5 * input - 0.5);
  const funcRes = 1 / (1 + Math.pow(Math.E, exponent));
  return funcRes * input;
}
