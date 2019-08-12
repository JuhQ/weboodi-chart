// TODO: Typings
// TODO: Add test
export const negate = (callback: (arg0: any) => boolean) => item =>
  !callback(item);
