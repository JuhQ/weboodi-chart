const add = (a: number, b: number): number => a + b;

const sum = (list: number[]): number => list.reduce(add, 0);

const average = (list: number[]): number => sum(list) / list.length;

const nameIncludesAvoinYo = (name: string) =>
  name.includes('avoin yo') || name.includes('open uni');

export { add, average, sum, nameIncludesAvoinYo };
