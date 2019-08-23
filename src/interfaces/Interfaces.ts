// The precourse type is the first representation of the course.
import { ConvertedCourse } from './Interfaces';
// The size can be either 3 or 7 (depending if the WebOodi row is an additional info field.)
export type PreCourse =
  | [string, string, string]
  | [string, string, string, string, string, string, string];

// CourseArrToObjParams -type defines the types of the filtered array.
export type CourseArrToObjParams = [
  string,
  string,
  string,
  string,
  string | undefined,
  string
];

/**
 * The ConvertedCourse interface comes after CourseArrToObjParams conversion.
 *
 * @export
 * @interface ConvertedCourse
 */
export interface ConvertedCourse {
  pvm: Paivays['pvm'];
  kurssi: string;
  lyhenne: string;
  luennoitsija: string;
  op: number;
  arvosana: number | 'hyv';
  pvmDate: Date;
}

export interface ConvertedCourseWithKeskiarvo extends ConvertedCourse {
  keskiarvo: number;
  painotettuKeskiarvo: number;
}

export interface DOMParams {
  duplikaattiKurssit: string[];
  aineOpinnot: string[];
  perusOpinnot: string[];
  pääaine: string | null;
  sivuaineet: string[];
}

export interface Course extends ConvertedCourseWithKeskiarvo {
  cumulativeOp: number;
}

export interface Paivays {
  pvm: string;
}

export interface DrawParams {
  id: string;
  labels: any;
  datasets: any[];
  type?: 'line' | 'bar';
  customTooltip?: boolean;
  customTicks?: boolean;
}

export interface DrawPieParams {
  id: string;
  labels: any;
  datasets: any;
  backgroundColor: string | string[];
}

export interface LecturerRowParams {
  luennoitsija: string;
  kurssimaara: number;
  luennot: {
    keskiarvo: number;
    totalOp: number;
  };
}

export interface DrawLuennoitsijatParams {
  title: string;
  lista: any[];
  luennoitsijatElement?: Element;
}

interface SingleCourse {
  name: string;
  keys: string[];
}

type StudyType = Record<string, SingleCourse[]>;
export type CourseDb = Record<string, StudyType>;

export interface Laitos {
  op: number;
  courseCount: number;
  kurssit: ConvertedCourse[];
  arvosanat: number[];
  keskiarvo: number;
  painotettuKeskiarvo: number;
  laitos: string;
}
