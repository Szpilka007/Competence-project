export const distanceBetweenPoints = (x1: number, x2: number, y1: number, y2: number): number =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
