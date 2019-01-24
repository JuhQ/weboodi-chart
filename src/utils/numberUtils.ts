const sum = (a: number, b: number): number => a + b;

const average = (list: number[]): number => list.reduce(sum, 0) / list.length;

export { sum, average };
