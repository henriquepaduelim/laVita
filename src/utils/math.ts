export function isFiniteNumber(value: number) {
  return Number.isFinite(value);
}

export function median(values: number[]) {
  const sorted = [...values].filter(isFiniteNumber).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length === 0) {
    return Number.NaN;
  }

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

export function pearsonCorrelation(xValues: number[], yValues: number[]) {
  if (xValues.length !== yValues.length || xValues.length < 2) {
    return Number.NaN;
  }

  const meanX = xValues.reduce((sum, value) => sum + value, 0) / xValues.length;
  const meanY = yValues.reduce((sum, value) => sum + value, 0) / yValues.length;

  let numerator = 0;
  let xDenominator = 0;
  let yDenominator = 0;

  for (let index = 0; index < xValues.length; index += 1) {
    const deltaX = xValues[index] - meanX;
    const deltaY = yValues[index] - meanY;
    numerator += deltaX * deltaY;
    xDenominator += deltaX * deltaX;
    yDenominator += deltaY * deltaY;
  }

  if (xDenominator === 0 || yDenominator === 0) {
    return Number.NaN;
  }

  return numerator / Math.sqrt(xDenominator * yDenominator);
}
