import { ConvertedCourse } from '../interfaces/Interfaces';

// TODO: Add test
export const negate = (callback: (arg0: any) => boolean) => (item: any) =>
  !callback(item);

// TODO: Add test
export const filterArvosana = ({ arvosana }: ConvertedCourse): boolean =>
  arvosana !== 'hyv' && !isNaN(arvosana);
