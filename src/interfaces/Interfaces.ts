// The precourse type is the first representation of the course.
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
  luennoitsija?: string;
  op: number;
  arvosana: number;
  pvmDate: Date;
}

export interface DOMParams {
  duplikaattiKurssit: string[];
  aineOpinnot: string[];
  perusOpinnot: string[];
  pääaine: string | null;
  sivuaineet: string[];
}

export interface Course extends ConvertedCourse {
  cumulativeOp: number;
}

export interface Paivays {
  pvm: string;
}

export interface DrawParams {
  id: string;
  labels: any;
  datasets: any[];
  type: string;
  customTooltip?: boolean;
  customTicks?: boolean;
}

export interface DrawPieParams {
  id: string;
  labels: any;
  datasets: any;
  backgroundColor: string;
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
  luennoitsijatElement?: HTMLElement;
}

interface SingleCourse {
  name: string;
  keys: string[];
}

interface StudyType {
  [studyType: string]: SingleCourse[];
}

export interface CourseDb {
  [aine: string]: StudyType;
}
