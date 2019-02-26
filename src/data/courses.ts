export interface SingleCourse {
  name: string;
  keys: string[];
}

export interface CourseDb {
  [aine: string]: StudyType;
}

export interface StudyType {
  [studyType: string]: SingleCourse[];
}

const kurssitietokanta: CourseDb = {
  tkt: {
    perusopinnot: [
      {
        name: 'Johdatus tietojenkäsittelytieteeseen',
        keys: ['TKT10001', 'AYTKT10001', '582102', 'A582102'],
      },
      {
        name: 'Ohjelmoinnin perusteet',
        keys: ['TKT10002', 'AYTKT10002', '581325', 'A581325'],
      },
      {
        name: 'Ohjelmoinnin jatkokurssi',
        keys: ['TKT10003', 'AYTKT10003', '582103', 'A582103'],
      },
      {
        name: 'Tietokantojen perusteet',
        keys: ['TKT10004', 'AYTKT10004', '581328', 'A581328'],
      },
      {
        name: 'Tietokoneen toiminta',
        keys: ['TKT10005', 'AYTKT10005', '581305', 'A581305'],
      },
    ],
    aineopinnot: [
      {
        name: 'Tietorakenteet ja algoritmit',
        keys: ['TKT20001', 'AYTKT20001', '58131', 'A58131'],
      },
      {
        name: 'Ohjelmistotekniikan menetelmät',
        keys: ['TKT20002', 'AYTKT20002', '582104', 'A582104'],
      },
      {
        name: 'Käyttöjärjestelmät',
        keys: ['TKT20003', 'AYTKT20003', '582219', 'A582219'],
      },
      {
        name: 'Tietoliikenteen perusteet',
        keys: ['TKT20004', 'AYTKT20004', '582202', 'A582202'],
      },
      {
        name: 'Laskennan mallit',
        keys: ['TKT20005', 'AYTKT20005', '582206', 'A582206'],
      },
      {
        name: 'Ohjelmistotuotanto',
        keys: ['TKT20006', 'AYTKT20006', '581259', 'A581259'],
      },
      {
        name: 'Ohjelmistotuotantoprojekti',
        keys: ['TKT20007', 'AYTKT20007', '581260', 'A581260'],
      },
      {
        name: 'Kandidaatin tutkielma',
        keys: ['TKT20013', 'AYTKT20013', '582204', 'A582204'],
      },
      {
        name: 'Kypsyysnäyte LuK',
        keys: ['TKT20014', 'AYTKT20014', '50036', 'A50036'],
      },
    ],
    mitaNaaOn: [
      {
        name: 'Johdatus tekoälyyn',
        keys: ['TKT20008', 'AYTKT20008', '582216', 'A582216'],
      },
      {
        // these three courses forms tietoturvan perusteet course
        // AY5823951 Open uni: Cyber Security Base: Introduction to Cyber Security
        // AY5823952 Open uni: Cyber Security Base: Securing Software
        // AY5823953 Open uni: Cyber Security Base: Course Project I
        name: 'Tietoturvan perusteet',
        keys: ['TKT20009', 'AYTKT20009', '582215', 'A582215'],
      },
      { name: 'Tietoliikenteen perusteet', keys: ['TKT20004', 'AYTKT20004'] },
    ],
    perusopinnotPre2017: [
      {
        name: 'Johdatus tietojenkäsittelytieteeseen',
        keys: ['TKT10001', 'AYTKT10001', '582102', 'A582102'],
      },
      {
        name: 'Ohjelmoinnin perusteet',
        keys: ['TKT10002', 'AYTKT10002', '581325', 'A581325'],
      },
      {
        name: 'Ohjelmoinnin jatkokurssi',
        keys: ['TKT10003', 'AYTKT10003', '582103', 'A582103'],
      },
      {
        name: 'Tietokantojen perusteet',
        keys: ['TKT10004', 'AYTKT10004', '581328', 'A581328'],
      },
      {
        name: 'Ohjelmistotekniikan menetelmät',
        keys: ['TKT20002', 'AYTKT20002', '582104', 'A582104'],
      },
    ],
    aineopinnotPre2017: [
      {
        name: 'Tietorakenteet ja algoritmit',
        keys: ['TKT20001', 'AYTKT20001', '58131', 'A58131'],
      },
      {
        name: 'Käyttöjärjestelmät',
        keys: ['TKT20003', 'AYTKT20003', '582219', 'A582219'],
      },
      {
        name: 'Tietokoneen toiminta',
        keys: ['TKT10005', 'AYTKT10005', '581305', 'A581305'],
      },
      {
        name: 'Tietoliikenteen perusteet',
        keys: ['TKT20004', 'AYTKT20004', '582202', 'A582202'],
      },
      {
        name: 'Laskennan mallit',
        keys: ['TKT20005', 'AYTKT20005', '582206', 'A582206'],
      },
      {
        name: 'Ohjelmistotuotanto',
        keys: ['TKT20006', 'AYTKT20006', '581259', 'A581259'],
      },
      {
        name: 'Ohjelmistotuotantoprojekti',
        keys: ['TKT20007', 'AYTKT20007', '581260', 'A581260'],
      },
      {
        name: 'Kandidaatin tutkielma',
        keys: ['TKT20013', 'AYTKT20013', '582204', 'A582204'],
      },
      {
        name: 'Kypsyysnäyte LuK',
        keys: ['TKT20014', 'AYTKT20014', '50036', 'A50036'],
      },
    ],
    labrat: [
      {
        name: 'Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit',
        keys: ['TKT20010', '58161', 'AYTKT20010', 'A58161'],
      },
      {
        name: 'Aineopintojen harjoitustyö: Tietokantasovellus',
        keys: ['TKT20011', '582203', 'AYTKT20011', 'A582203'],
      },
      {
        name: 'Aineopintojen harjoitustyö: Tietoliikenne',
        keys: ['TKT20012', 'AYTKT20012'],
      },
      {
        name: 'Aineopintojen harjoitustyö: Ohjelmointi',
        keys: ['582221', 'A582221'],
      },
      {
        name: 'Robottiohjelmoinnin harjoitustyö',
        keys: ['TKT21013', 'AYTKT21013'],
      },
    ],
    vapaavalintaisia: [
      {
        // not exactly vapaavalintainen
        name: 'Versionhallinta',
        keys: ['TKT21015', 'AYTKT21015'],
      },
      {
        name: 'Kilpaohjelmointi',
        keys: ['TKT21017', 'AYTKT21017'],
      },
      {
        name: 'Ohjelmointihaasteita I',
        keys: ['582350', 'A582350'],
      },
      {
        name: 'Johdatus funktionaaliseen ohjelmointiin',
        keys: ['TKT21014', 'AYTKT21014'],
      },
      {
        name: 'Tietojenkäsittelytieteen kisälliopetus: Java-ohjelmointi',
        keys: ['582520', 'A582520'],
      },
      {
        name: 'Tietokone työvälineenä',
        keys: ['TKT50003', 'AYTKT50003'],
      },
      {
        name: 'Ohjelmointitekniikka (Scala)',
        keys: ['582330', 'A582330'],
      },
      {
        name: 'Linux Fundamentals',
        keys: ['582351', 'A582351'],
      },
      {
        name: 'Programming in C',
        keys: ['58127', 'A58127'],
      },
      {
        name: 'Web-palvelinohjelmointi Ruby on Rails',
        keys: ['TKT21003', 'AYTKT21003'],
      },
      {
        name: 'Web-palvelinohjelmointi Ruby on Rails, harjoitustyö',
        keys: ['TKT21016', 'AYTKT21016'],
      },
      {
        name: 'DevOps with Docker',
        keys: ['TKT21025', 'AYTKT21025'],
      },
      {
        name: 'Valinnaisia aineopintoja (hackathon)',
        keys: ['TKT21999', 'AYTKT21999'],
      },
      {
        name: 'Cyber Security Base: Introduction to Cyber Security',
        keys: ['AY5823951'],
      },
      {
        name: 'Cyber Security Base: Securing Software',
        keys: ['AY5823952'],
      },
      {
        name: 'Cyber Security Base: Course Project I',
        keys: ['AY5823953'],
      },
      {
        name: 'Algoritmipaja',
        keys: ['TKT20000', 'AYTKT20000'],
      },
      {
        name: 'Algoritmit ongelmanratkaisussa',
        keys: ['TKT21012', 'AYTKT21012'],
      },
      {
        name: 'Computer Organization II 5 op',
        keys: ['TKT21004', 'AYTKT21004'],
      },
      {
        name: 'Full Stack -websovelluskehitys',
        keys: ['TKT21009', 'AYTKT21009'],
      },
      {
        name: 'Full Stack -websovelluskehitys harjoitustyö',
        keys: ['TKT21010', 'AYTKT21010'],
      },
      {
        name: 'Introduction to Game Programming',
        keys: ['TKT21002', 'AYTKT21002'],
      },
      {
        name: 'Introduction to Lambda Calculus',
        keys: ['TKT21019', 'AYTKT21019'],
      },
      {
        name: 'Johdatus tekoälyyn',
        keys: ['DATA15001', 'AYDATA15001'],
      },
      {
        name: 'Linux System Administration',
        keys: ['TKT21022', 'AYTKT21022'],
      },
      {
        name: 'Ohjelmointihaasteita I',
        keys: ['TKT21024', 'AYTKT21024'],
      },
      {
        name: 'Ohjelmointitekniikka (JavaScript)',
        keys: ['TKT21005', 'AYTKT21005'],
      },
      {
        name: 'Programming in C',
        keys: ['TKT21008', 'AYTKT21008'],
      },
      {
        name: 'Tietokannan suunnittelu',
        keys: ['TKT21001', 'AYTKT21001'],
      },
      {
        name: 'UI Application Development with Qt and QML',
        keys: ['TKT21023', 'AYTKT21023'],
      },
      {
        name: 'Web-palvelinohjelmointi Java',
        keys: ['TKT21007', 'AYTKT21007'],
      },
    ],
  },
  mat: {
    satunnaisia: [
      {
        name: 'Johdatus yliopistomatematiikkaan',
        keys: ['MAT11001', 'AYMAT11001', '57033', 'A57033'],
      },
      {
        name: 'Matematiikkaa kaikkialla',
        keys: ['MAT20002', 'AYMAT20002'],
      },
      {
        name: 'Johdatus logiikkaan I',
        keys: ['MAT21014', 'AYMAT21014'],
      },
      {
        name: 'Differentiaalilaskenta',
        keys: ['MAT11004', 'AYMAT11004', '57117', 'A57117'],
      },
      {
        name: 'Lineaarialgebra ja matriisilaskenta I',
        keys: ['MAT11002', 'AYMAT11002', '57043', 'A57043'],
      },
      {
        name: 'Raja-arvot',
        keys: ['MAT11003', 'AYMAT11003', '57116', 'A57116'],
      },
      {
        name: 'Calculus IA: Limits and differentiation',
        keys: ['MAT11006', 'AYMAT11006'],
      },
      {
        name: 'Calculus IB: Integration',
        keys: ['MAT11007', 'AYMAT11007'],
      },
      {
        name: 'Data-analyysin projekti',
        keys: ['MAT12005', 'AYMAT12005'],
      },
      {
        name: 'Matemaattinen analyysi I',
        keys: ['MAT11010', 'AYMAT11010'],
      },
      {
        name: 'Matemaattinen analyysi II',
        keys: ['MAT11011', 'AYMAT11011'],
      },
      {
        name: 'Tilastotiede ja R tutuksi I',
        keys: ['MAT12001', 'AYMAT12001'],
      },
      {
        name: 'Tilastotiede ja R tutuksi II',
        keys: ['MAT12002', 'AYMAT12002'],
      },
    ],
  },
};

export { kurssitietokanta };

// {
//   name: '',
//   keys: ['', ''],
// },
