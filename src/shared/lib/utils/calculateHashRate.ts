const prefixes = ['H/s', 'kH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s'];

export function calculateHashRate(hashrateInHs?: number): {
  value: number;
  unit: string;
} {
  if (hashrateInHs === undefined) {
    return {
      value: 0,
      unit: 'H/s',
    };
  }

  const threshold = 1000;
  let prefixIndex = 0;
  let value = hashrateInHs;

  while (value >= threshold && prefixIndex < prefixes.length - 1) {
    value /= threshold;
    prefixIndex++;
  }

  const formattedValue = value.toFixed(2);

  return {
    value: parseFloat(formattedValue),
    unit: prefixes[prefixIndex],
  };
}