const notEmpty = (data: string) => data.length > 0;
const notEmptyList = <T>(data: T[]) => data.length > 0;

export { notEmpty, notEmptyList };
