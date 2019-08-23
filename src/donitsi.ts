import { kurssitietokanta } from './data/courses';
import { Course } from './interfaces/Interfaces';
import { setHtmlContent } from './utils/dom';
import { drawPie } from './utils/draw';
import {
  findFromKurssiTietokanta,
  map,
  notEmpty,
  partition,
} from './utils/listUtils';
import { poistaAvoinKurssiNimestä } from './utils/stringUtils';

interface Donitsi {
  stuff: Course[];
  aineOpinnot: string[];
  perusOpinnot: string[];
}

interface CoolBeans {
  id: string;
  stuff: Course[];
  data: string[];
}

interface Jepulis {
  kurssi: string;
  done: boolean;
}

const courseNamesMatch = (kurssi: string) => (row: Jepulis) =>
  row.kurssi === kurssi;

const removeDuplicateCourses = (coursesDone: string[]) => (
  acc: Jepulis[],
  item: Jepulis,
) =>
  acc.find(courseNamesMatch(item.kurssi)) ||
  // @ts-ignore
  coursesDone.find(courseNamesMatch(item.kurssi))
    ? acc
    : [...acc, item];

const removeAvoinFromKurssiNimi = (item: Jepulis) => ({
  ...item,
  kurssi: poistaAvoinKurssiNimestä(item.kurssi),
});

const drawOpintoDonitsi = ({ id, stuff, data }: CoolBeans) => {
  const [coursesDone, coursesNotDone]: Array<CoolBeans['data']> = partition(
    data,
    (lyhenne: string) => !stuff.find(course => lyhenne === course.lyhenne),
  );

  const opintoData = [
    ...coursesDone.map(lyhenne => ({ lyhenne, done: true })),
    ...coursesNotDone.map(lyhenne => ({ lyhenne, done: false })),
  ]
    .map(
      ({ lyhenne, done }): Jepulis => ({
        kurssi:
          findFromKurssiTietokanta({ db: kurssitietokanta, lyhenne }) ||
          lyhenne,
        done,
      }),
    )
    .reduce(removeDuplicateCourses(coursesDone), [])
    .map(removeAvoinFromKurssiNimi);

  const greatSuccess =
    coursesDone.length >= opintoData.length ? 'All done, nice!' : '';

  setHtmlContent({
    id: `${id}-progress`,
    content: `${coursesDone.length}/${opintoData.length} ${greatSuccess}`,
  });

  const percentage = ((1 / opintoData.length) * 100).toFixed(2);

  drawPie({
    id,
    labels: map(opintoData, 'kurssi'),
    datasets: opintoData.map(() => percentage),
    backgroundColor: opintoData.map(({ done }) =>
      done ? 'lightgreen' : 'lightgray',
    ),
  });
};

export const piirräDonitsit = ({
  stuff,
  aineOpinnot,
  perusOpinnot,
}: Donitsi) => {
  notEmpty(aineOpinnot) &&
    drawOpintoDonitsi({ id: 'aineopinnot', stuff, data: aineOpinnot });

  notEmpty(perusOpinnot) &&
    drawOpintoDonitsi({ id: 'perusopinnot', stuff, data: perusOpinnot });
};
