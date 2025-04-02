export function calculatePerformance(hashrateInHs: number, power: number) {
  return (((hashrateInHs / 1000)) / power).toFixed(2);
}