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
        name: "Johdatus tietojenkäsittelytieteeseen",
        keys: ["TKT10001", "AYTKT10001", "582102", "A582102"],
      },
      {
        name: "Ohjelmoinnin perusteet",
        keys: ["TKT10002", "AYTKT10002", "581325", "A581325"],
      },
      {
        name: "Ohjelmoinnin jatkokurssi",
        keys: ["TKT10003", "AYTKT10003", "582103", "A582103"],
      },
      {
        name: "Tietokantojen perusteet",
        keys: ["TKT10004", "AYTKT10004", "581328", "A581328"],
      },
      {
        name: "Tietokoneen toiminta",
        keys: ["TKT10005", "AYTKT10005", "581305", "A581305"],
      },
    ],
    aineopinnot: [
      {
        name: "Tietorakenteet ja algoritmit",
        keys: ["TKT20001", "AYTKT20001", "58131", "A58131"],
      },
      {
        name: "Ohjelmistotekniikan menetelmät",
        keys: ["TKT20002", "AYTKT20002", "582104", "A582104"],
      },
      {
        name: "Käyttöjärjestelmät",
        keys: ["TKT20003", "AYTKT20003", "582219", "A582219"],
      },
      {
        name: "Tietoliikenteen perusteet",
        keys: ["TKT20004", "AYTKT20004", "582202", "A582202"],
      },
      {
        name: "Laskennan mallit",
        keys: ["TKT20005", "AYTKT20005", "582206", "A582206"],
      },
      {
        name: "Ohjelmistotuotanto",
        keys: ["TKT20006", "AYTKT20006", "581259", "A581259"],
      },
      {
        name: "Ohjelmistotuotantoprojekti",
        keys: ["TKT20007", "AYTKT20007", "581260", "A581260"],
      },
      {
        name: "Kandidaatin tutkielma",
        keys: ["TKT20013", "AYTKT20013", "582204", "A582204"],
      },
      {
        name: "Kypsyysnäyte LuK",
        keys: ["TKT20014", "AYTKT20014", "50036", "A50036"],
      },
    ],
    mitaNaaOn: [
      {
        name: "Johdatus tekoälyyn",
        keys: ["TKT20008", "AYTKT20008", "582216", "A582216"],
      },
      {
        name: "Tietoturvan perusteet",
        keys: ["TKT20009", "AYTKT20009", "582215", "A582215"],
      },
    ],
    perusopinnotPre2017: [
      {
        name: "Johdatus tietojenkäsittelytieteeseen",
        keys: ["TKT10001", "AYTKT10001", "582102", "A582102"],
      },
      {
        name: "Ohjelmoinnin perusteet",
        keys: ["TKT10002", "AYTKT10002", "581325", "A581325"],
      },
      {
        name: "Ohjelmoinnin jatkokurssi",
        keys: ["TKT10003", "AYTKT10003", "582103", "A582103"],
      },
      {
        name: "Tietokantojen perusteet",
        keys: ["TKT10004", "AYTKT10004", "581328", "A581328"],
      },
      {
        name: "Ohjelmistotekniikan menetelmät",
        keys: ["TKT20002", "AYTKT20002", "582104", "A582104"],
      },
    ],
    aineopinnotPre2017: [
      {
        name: "Tietorakenteet ja algoritmit",
        keys: ["TKT20001", "AYTKT20001", "58131", "A58131"],
      },
      {
        name: "Käyttöjärjestelmät",
        keys: ["TKT20003", "AYTKT20003", "582219", "A582219"],
      },
      {
        name: "Tietokoneen toiminta",
        keys: ["TKT10005", "AYTKT10005", "581305", "A581305"],
      },
      {
        name: "Tietoliikenteen perusteet",
        keys: ["TKT20004", "AYTKT20004", "582202", "A582202"],
      },
      {
        name: "Laskennan mallit",
        keys: ["TKT20005", "AYTKT20005", "582206", "A582206"],
      },
      {
        name: "Ohjelmistotuotanto",
        keys: ["TKT20006", "AYTKT20006", "581259", "A581259"],
      },
      {
        name: "Ohjelmistotuotantoprojekti",
        keys: ["TKT20007", "AYTKT20007", "581260", "A581260"],
      },
      {
        name: "Kandidaatin tutkielma",
        keys: ["TKT20013", "AYTKT20013", "582204", "A582204"],
      },
      {
        name: "Kypsyysnäyte LuK",
        keys: ["TKT20014", "AYTKT20014", "50036", "A50036"],
      },
    ],
    labrat: [
      {
        name: "Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit",
        keys: ["TKT20010", "58161", "AYTKT20010", "A58161"],
      },
      {
        name: "Aineopintojen harjoitustyö: Tietokantasovellus",
        keys: ["TKT20011", "582203", "AYTKT20011", "A582203"],
      },
      {
        name: "Aineopintojen harjoitustyö: Tietoliikenne",
        keys: ["TKT20012", "AYTKT20012"],
      },
      {
        name: "Aineopintojen harjoitustyö: Ohjelmointi",
        keys: ["582221", "A582221"],
      },
    ],
  },
};

export { kurssitietokanta };
