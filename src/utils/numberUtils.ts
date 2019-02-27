const sum = (a: number, b: number): number => a + b;

const average = (list: number[]): number => list.reduce(sum, 0) / list.length;

const nameIncludesAvoinYo = (name: string) =>
  name.includes('avoin yo') || name.includes('open uni');

export { sum, average, nameIncludesAvoinYo };
