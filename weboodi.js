const getLocalStorage = key =>
  JSON.parse(localStorage.getItem(key) || "[]").filter(notEmpty);

const setLocalStorage = key => value =>
  localStorage.setItem(key, JSON.stringify(value));

const setDuplikaattiKurssit = setLocalStorage("duplikaattiKurssit");
const setPerusOpinnot = setLocalStorage("perusOpinnot");
const setAineOpinnot = setLocalStorage("aineOpinnot");

const getDuplikaattiKurssit = () => getLocalStorage("duplikaattiKurssit");
const getPerusOpinnot = () => getLocalStorage("perusOpinnot");
const getAineOpinnot = () => getLocalStorage("aineOpinnot");

const max = lista => Math.max(...lista);

const findPvm = (list, key) => list.find(({ pvm }) => pvm === key);

const isTruthy = v => v;

const isString = val => typeof val === "string";

const notEmpty = data => data.length > 0;

const isArray = val => Array.isArray(val);

const toLowerCase = str => str.toLowerCase();

const map = (list, keys) =>
  list.reduce(
    (acc, item) => [
      ...acc,
      ...(isString(keys) ? [keys] : keys).map(key => item[key])
    ],
    []
  );

const chartColors = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple"
];

const kurssitietokanta = {
  tkt: {
    perusopinnot: [
      {
        name: "Johdatus tietojenkäsittelytieteeseen",
        keys: ["TKT10001", "AYTKT10001", "582102", "A582102"]
      },
      {
        name: "Ohjelmoinnin perusteet",
        keys: ["TKT10002", "AYTKT10002", "581325", "A581325"]
      },
      {
        name: "Ohjelmoinnin jatkokurssi",
        keys: ["TKT10003", "AYTKT10003", "582103", "A582103"]
      },
      {
        name: "Tietokantojen perusteet",
        keys: ["TKT10004", "AYTKT10004", "581328", "A581328"]
      },
      {
        name: "Tietokoneen toiminta",
        keys: ["TKT10005", "AYTKT10005", "581305", "A581305"]
      }
    ],
    aineopinnot: [
      {
        name: "Tietorakenteet ja algoritmit",
        keys: ["TKT20001", "AYTKT20001", "58131", "A58131"]
      },
      {
        name: "Ohjelmistotekniikan menetelmät",
        keys: ["TKT20002", "AYTKT20002", "582104", "A582104"]
      },
      {
        name: "Käyttöjärjestelmät",
        keys: ["TKT20003", "AYTKT20003", "582219", "A582219"]
      },
      {
        name: "Tietoliikenteen perusteet",
        keys: ["TKT20004", "AYTKT20004", "582202", "A582202"]
      },
      {
        name: "Laskennan mallit",
        keys: ["TKT20005", "AYTKT20005", "582206", "A582206"]
      },
      {
        name: "Ohjelmistotuotanto",
        keys: ["TKT20006", "AYTKT20006", "581259", "A581259"]
      },
      {
        name: "Ohjelmistotuotantoprojekti",
        keys: ["TKT20007", "AYTKT20007", "581260", "A581260"]
      },
      {
        name: "Johdatus tekoälyyn",
        keys: ["TKT20008", "AYTKT20008", "582216", "A582216"]
      },
      {
        name: "Tietoturvan perusteet",
        keys: ["TKT20009", "AYTKT20009", "582215", "A582215"]
      },
      {
        name: "Kandidaatin tutkielma",
        keys: ["TKT20013", "AYTKT20013", "582204", "A582204"]
      },
      {
        name: "Kypsyysnäyte LuK",
        keys: ["TKT20014", "AYTKT20014", "50036", "A50036"]
      }
    ],
    perusopinnotPre2017: [
      {
        name: "Johdatus tietojenkäsittelytieteeseen",
        keys: ["TKT10001", "AYTKT10001", "582102", "A582102"]
      },
      {
        name: "Ohjelmoinnin perusteet",
        keys: ["TKT10002", "AYTKT10002", "581325", "A581325"]
      },
      {
        name: "Ohjelmoinnin jatkokurssi",
        keys: ["TKT10003", "AYTKT10003", "582103", "A582103"]
      },
      {
        name: "Tietokantojen perusteet",
        keys: ["TKT10004", "AYTKT10004", "581328", "A581328"]
      },
      {
        name: "Ohjelmistotekniikan menetelmät",
        keys: ["TKT20002", "AYTKT20002", "582104", "A582104"]
      }
    ],
    aineopinnotPre2017: [
      {
        name: "Tietorakenteet ja algoritmit",
        keys: ["TKT20001", "AYTKT20001", "58131", "A58131"]
      },
      {
        name: "Käyttöjärjestelmät",
        keys: ["TKT20003", "AYTKT20003", "582219", "A582219"]
      },
      {
        name: "Tietokoneen toiminta",
        keys: ["TKT10005", "AYTKT10005", "581305", "A581305"]
      },
      {
        name: "Tietoliikenteen perusteet",
        keys: ["TKT20004", "AYTKT20004", "582202", "A582202"]
      },
      {
        name: "Laskennan mallit",
        keys: ["TKT20005", "AYTKT20005", "582206", "A582206"]
      },
      {
        name: "Ohjelmistotuotanto",
        keys: ["TKT20006", "AYTKT20006", "581259", "A581259"]
      },
      {
        name: "Ohjelmistotuotantoprojekti",
        keys: ["TKT20007", "AYTKT20007", "581260", "A581260"]
      },
      {
        name: "Johdatus tekoälyyn",
        keys: ["TKT20008", "AYTKT20008", "582216", "A582216"]
      },
      {
        name: "Tietoturvan perusteet",
        keys: ["TKT20009", "AYTKT20009", "582215", "A582215"]
      },
      {
        name: "Kandidaatin tutkielma",
        keys: ["TKT20013", "AYTKT20013", "582204", "A582204"]
      },
      {
        name: "Kypsyysnäyte LuK",
        keys: ["TKT20014", "AYTKT20014", "50036", "A50036"]
      }
    ],
    labrat: [
      {
        name: "Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit",
        keys: ["TKT20010", "58161", "AYTKT20010", "A58161"]
      },
      {
        name: "Aineopintojen harjoitustyö: Tietokantasovellus",
        keys: ["TKT20011", "582203", "AYTKT20011", "A582203"]
      },
      {
        name: "Aineopintojen harjoitustyö: Tietoliikenne",
        keys: ["TKT20012", "AYTKT20012"]
      },
      {
        name: "Aineopintojen harjoitustyö: Ohjelmointi",
        keys: ["582221", "A582221"]
      }
    ]
  }
};

const findFromKurssiTietokantaRecurse = ({ db, lyhenne }) =>
  Object.keys(db).reduce((acc, key) => {
    const courseFound =
      !acc.length &&
      isArray(db[key]) &&
      db[key].find(({ keys }) =>
        keys.map(toLowerCase).includes(lyhenne.toLowerCase())
      );

    return (
      acc ||
      (isArray(db[key])
        ? courseFound
          ? courseFound.name
          : acc
        : findFromKurssiTietokantaRecurse({ db: db[key], lyhenne }))
    );
  }, "");

const findFromKurssiTietokanta = lyhenne =>
  findFromKurssiTietokantaRecurse({ db: kurssitietokanta, lyhenne });

const teeHienoTooltip = () => ({
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const label = data.datasets[tooltipItem.datasetIndex].label || "";
        const value = Math.round(tooltipItem.yLabel * 100) / 100;

        // datasetIndex = bar chart, values are multiplied by ten to show larger bars
        const labelValue = tooltipItem.datasetIndex ? value : value / 10;

        return `${label}: ${labelValue}`;
      }
    }
  }
});

const draw = ({
  id,
  labels,
  datasets,
  type = "bar",
  customTooltip = false,
  customTicks = false
}) => {
  new Chart(document.getElementById(id), {
    type,
    data: { labels, datasets },
    options: {
      ...(customTooltip && teeHienoTooltip()),
      scales: {
        yAxes: [
          {
            ...(customTicks && {
              gridLines: {
                drawBorder: false,
                color: chartColors
              }
            }),
            ticks: {
              beginAtZero: true,
              ...(customTicks && {
                max: max(map(datasets, "data").map(max)) + 10,
                stepSize: 55
              })
            }
          }
        ]
      }
    }
  });
};

const drawPie = ({ id, labels, datasets, backgroundColor }) => {
  document.getElementById(`${id}-container`).style.display = "block";

  new Chart(document.getElementById(id), {
    type: "pie",
    data: {
      datasets: [{ data: datasets, backgroundColor }],
      labels
    }
  });
};

const style = {
  backgroundColor: "rgba(255, 99, 132, 0.2)",
  borderColor: "rgba(255,99,132,1)",
  borderWidth: 1
};

const styleBlue = {
  backgroundColor: "rgba(118, 99, 255, 0.2)",
  borderColor: "rgba(118,99,132,1)",
  borderWidth: 1
};

const styleGreen = {
  backgroundColor: "rgba(99, 255, 157, 0.2)",
  borderColor: "rgba(99,99,132,1)",
  borderWidth: 1
};

const doCss = () => `
  <style>
    #luennoitsijat {
      clear: both;
      display: inline-block;
      margin-bottom: 100px;
    }

    .luennoitsijat {
      margin-right: 10px;
    }

    .clear {
      clear: both;
      display: table;
      width: 100%;
    }

    @media only screen and (min-width: 900px) {
      .jeejee-pull-left {
        float: left;
      }

      .half {
        width: 50%;
      }
    }

    .margin-bottom-large {
      margin-bottom: 100px;
    }

    .margin-bottom-small {
      margin-bottom: 20px;
    }

    #nuggets input {
      width: 100%;
    }
  </style>
  `;

const yolohtml = ({ duplikaattiKurssit, perusOpinnot, aineOpinnot }) => `
  <div id="nuggets" class="margin-bottom-large">
    <div class="clear margin-bottom-small">
      <div id="perusopinnot-container" class="jeejee-pull-left" style="display:none;">
        Perusopinnot <span id="perusopinnot-progress"></span>
        <canvas id="perusopinnot" width="500" height="200"></canvas>
      </div>
      <div id="aineopinnot-container" class="jeejee-pull-left" style="display:none;">
        Aineopinnot <span id="aineopinnot-progress"></span>
        <canvas id="aineopinnot" width="500" height="200"></canvas>
      </div>
    </div>
    <div class="clear">
      <div class="jeejee-pull-left half">
        <canvas id="chart-nopat" width="500" height="200"></canvas>
      </div>
      <div class="jeejee-pull-left half">
        <canvas id="chart-nopat-vuosi" width="500" height="200"></canvas>
      </div>
    </div>
    <div class="clear">
      <div class="jeejee-pull-left half">
        <canvas id="chart-keskiarvo" width="500" height="200"></canvas>
      </div>
    </div>
    <div id="luennoitsijat"></div>
    <div id="tools" class="margin-bottom-large">
      <p>
        <label style="margin-bottom:30px;">
          Merkkaa tähän inputtiin pilkulla erottaen mahdolliset duplikaattikurssit, kas näin: A582103,A581325<br/>
          <input type="text" name="duplikaattiKurssit" value="${duplikaattiKurssit}" />
        </label>
      </p>

      <p>
        <label style="margin-bottom:30px;">
          Merkkaa tähän inputtiin pilkulla erottaen perusopintokurssisi pääaineesta, kas näin vaikkapa: A582103,A581325<br/>
          <input type="text" name="perusOpinnot" value="${perusOpinnot}" />
        </label>
      </p>

      <p>
        <label style="margin-bottom:30px;">
          Merkkaa tähän inputtiin pilkulla erottaen aineopintokurssi pääaineesta, kas näin vaikkapa: A582103,A581325<br/>
          <input type="text" name="aineOpinnot" value="${aineOpinnot}" />
        </label>
      </p>

      <p>
        <button id="kliketi-klik">
          Päivitä chartit, esimerkiksi duplikaattikurssien lisäämisen jälkeen
        </button>
      </p>

      <p>
        <button id="kliketi-klik-esitäyttö-2017">
          Esitäytä perus- ja aineopinnot tkt kandi opinnoilla (2017 &ge; ) huom: sisältää myös avoimen ja vanhan malliset lyhenteet
        </button>
      </p>

      <p>
        <button id="kliketi-klik-esitäyttö-pre-2017">
          Esitäytä perus- ja aineopinnot tkt kandi opinnoilla (&le; 2016) huom: sisältää myös avoimen ja vanhan malliset lyhenteet
        </button>
      </p>
    </div>

    <p>
      Haluatko lisätoiminnallisuutta tähän plugariin? Löysitkö virheen?<br>
      Mikäli olet tkt opiskelija, <a href="https://github.com/JuhQ/weboodi-chart">tee pull request</a>.<br>
      Mikäli opiskelet jotain muuta, laita mailia juha.tauriainen@helsinki.fi
    </p>
  </div>
  `;

const suoritusTableSelector = "[name=suoritus] + table + table";

const pitäisköDomRakentaa = () =>
  !!document.querySelector(suoritusTableSelector);

const createDom = ({ duplikaattiKurssit, aineOpinnot, perusOpinnot }) => {
  const listaTaulukko = document.querySelector(suoritusTableSelector);
  const nuggetsExist = document.querySelector("#nuggets");
  const yolo = yolohtml({ duplikaattiKurssit, aineOpinnot, perusOpinnot });

  if (!listaTaulukko) {
    return false;
  }

  if (nuggetsExist) {
    nuggetsExist.outerHTML = yolo;
  } else {
    listaTaulukko.outerHTML = listaTaulukko.outerHTML + doCss() + yolo;
  }

  return true;
};

const createCoursesArray = target =>
  target.value
    .split(",")
    .map(putsaaTeksti)
    .filter(notEmpty);

const kuunteleDuplikaattiInputtia = () => {
  const input = document.querySelector("input[name='duplikaattiKurssit']");

  input.addEventListener("input", ({ target }) => {
    setDuplikaattiKurssit(createCoursesArray(target));
  });
};

const kuunteleppaNiitäPerusopintoja = () => {
  const input = document.querySelector("input[name='perusOpinnot']");

  input.addEventListener("input", ({ target }) => {
    setPerusOpinnot(createCoursesArray(target));
  });
};

const tahtoisinVaanKuunnellaAineopintoja = () => {
  const input = document.querySelector("input[name='aineOpinnot']");

  input.addEventListener("input", ({ target }) => {
    setAineOpinnot(createCoursesArray(target));
  });
};

const kuunteleppaNapinpainalluksiaJuu = () => {
  const input = document.querySelector("button#kliketi-klik");

  input.addEventListener("click", start);
};

const luoKurssiAvainListaTietokannasta = opinnot =>
  map(kurssitietokanta.tkt[opinnot], "keys").reduce((a, b) => [...a, ...b], []);

const kuunteleEsitäyttönapinKliksutteluja2017 = () => {
  const input = document.querySelector("button#kliketi-klik-esitäyttö-2017");

  input.addEventListener("click", () => {
    setPerusOpinnot(luoKurssiAvainListaTietokannasta("perusopinnot"));
    setAineOpinnot(luoKurssiAvainListaTietokannasta("aineopinnot"));
    start();
  });
};

const kuunteleEsitäyttönapinKliksutteluja2016 = () => {
  const input = document.querySelector(
    "button#kliketi-klik-esitäyttö-pre-2017"
  );

  input.addEventListener("click", () => {
    setPerusOpinnot(luoKurssiAvainListaTietokannasta("perusopinnotPre2017"));
    setAineOpinnot(luoKurssiAvainListaTietokannasta("aineopinnotPre2017"));
    start();
  });
};

const kuunteleAsijoita = () => {
  kuunteleDuplikaattiInputtia();
  kuunteleppaNiitäPerusopintoja();
  tahtoisinVaanKuunnellaAineopintoja();
  kuunteleppaNapinpainalluksiaJuu();
  kuunteleEsitäyttönapinKliksutteluja2017();
  kuunteleEsitäyttönapinKliksutteluja2016();
};

const setDailyCumulativeNoppas = ({ pvm, op }) => jee => {
  const today =
    jee.pvm === pvm
      ? {
          cumulativeOp: op + jee.cumulativeOp,
          op: op + jee.op
        }
      : null;

  return {
    ...jee, // 💩👌
    ...today
  };
};

const groupThemCourses = stuff =>
  stuff
    .reduce(
      (initial, item) =>
        findPvm(initial, item.pvm)
          ? initial.map(setDailyCumulativeNoppas(item))
          : [...initial, item],
      []
    )
    .map(item => ({ ...item, op: item.op * 10 }));

const putsaaTeksti = str => str.replace(/&nbsp;/g, " ").trim();

const muutaArrayKivaksiObjektiksi = ([
  lyhenne,
  kurssi,
  op,
  arvosana,
  pvm = "01.01.1970",
  luennoitsija
]) => ({
  pvm,
  kurssi,
  lyhenne,
  luennoitsija,
  op: Number(op),
  arvosana: Number(arvosana),
  pvmDate: rakenteleDateObjekti(getPvmArray(pvm))
});

const lasketaanpaLopuksiKumulatiivisetNopat = (initial, item, i) => [
  ...initial,
  {
    ...item,
    cumulativeOp: item.op + (i && initial[i - 1].cumulativeOp)
  }
];

const hommaaMeilleListaAsijoistaDommista = () => [
  ...document.querySelectorAll(
    "[name=suoritus] + table + table:not(.eisei) table.eisei tbody tr"
  )
];

const makeSomeStuff = duplikaattiKurssit =>
  hommaaMeilleListaAsijoistaDommista()
    .map(item => [...item.querySelectorAll("td")])
    .filter(notEmpty)
    .map(item => item.map(value => value.textContent).map(putsaaTeksti))
    .filter(([lyhenne]) => !duplikaattiKurssit.includes(lyhenne))
    .reverse()
    .filter(item => item.length > 3)
    .map(muutaArrayKivaksiObjektiksi)
    .sort(sorttaaStuffLukukausienMukaan)
    .reduce(lasketaanpaLopuksiKumulatiivisetNopat, []);

const takeUntil = (list, n) =>
  list.reduce((initial, item, i) => (i < n ? [...initial, item] : initial), []);

const sum = (a, b) => a + b;

const average = list => list.reduce(sum, 0) / list.length;

const annaMulleKeskiarvotKursseista = stuff =>
  stuff.filter(item => !isNaN(item.arvosana)).map((item, i, list) => ({
    ...item,
    keskiarvo: average(takeUntil(map(list, "arvosana"), i + 1)).toFixed(2)
  }));

const annaMulleKeskiarvotTietyistäKursseista = ({ kurssit, stuff }) =>
  annaMulleKeskiarvotKursseista(
    stuff.filter(({ lyhenne }) => kurssit.includes(lyhenne))
  );

const rakennaListaLuennoitsijoista = (initial, item) => [
  ...initial,
  ...item.luennoitsija
    .split(",")
    .map(putsaaTeksti)
    .filter(notEmpty)
    .map(luennoitsija => ({ ...item, luennoitsija }))
];

const haluaisinTietääLuennoitsijoista = stuff =>
  stuff
    .reduce(rakennaListaLuennoitsijoista, [])
    .map((item, i, arr) => {
      const luennot = arr.filter(
        ({ luennoitsija }) => luennoitsija === item.luennoitsija
      );

      const arvosanat = map(
        luennot.filter(item => !isNaN(item.arvosana)),
        "arvosana"
      );

      const keskiarvo = average(arvosanat);

      return {
        ...item,
        kurssimaara: luennot.length,
        luennot: {
          arvosanat,
          keskiarvo: keskiarvo ? keskiarvo.toFixed(2) : "hyv",
          op: map(luennot, "op"),
          totalOp: map(luennot, "op").reduce(sum, 0)
        }
      };
    })
    .reduce(
      (initial, item) =>
        initial.find(({ luennoitsija }) => luennoitsija === item.luennoitsija)
          ? initial
          : [...initial, item],
      []
    );

const createLuennoitsijaRivi = ({ luennoitsija, kurssimaara, luennot }) => `<p>
    ${luennoitsija},
    kursseja ${kurssimaara},
    keskiarvo: ${luennot.keskiarvo},
    noppia: ${luennot.totalOp}
  </p>`;

const drawLuennoitsijat = ({ title, lista, luennoitsijatElement }) => {
  const html = `
    <div class="luennoitsijat pull-left">
      <p><strong>${title}</strong></p>
      ${lista.map(createLuennoitsijaRivi).join("")}
    </div>
  `;

  luennoitsijatElement.innerHTML = luennoitsijatElement.innerHTML + html;
};

const courseNamesMatch = kurssi => row => row.kurssi === kurssi;

const removeDuplicateCourses = coursesDone => (acc, item) =>
  acc.find(courseNamesMatch(item.kurssi)) ||
  coursesDone.find(courseNamesMatch(item.kurssi))
    ? acc
    : [...acc, item];

const drawOpintoDonitsi = ({ id, stuff, data }) => {
  const coursesDone = stuff
    .filter(({ lyhenne }) => data.includes(lyhenne))
    .map(({ kurssi, lyhenne }) => ({ kurssi, lyhenne, done: true }));

  const coursesNotDone = data
    .filter(lyhenne => !stuff.find(course => lyhenne === course.lyhenne))
    .map(lyhenne => ({
      kurssi: findFromKurssiTietokanta(lyhenne) || lyhenne,
      done: false
    }))
    .reduce(removeDuplicateCourses(coursesDone), []);

  const opintoData = [...coursesDone, ...coursesNotDone];

  document.getElementById(`${id}-progress`).innerHTML = `${
    coursesDone.length
  }/${opintoData.length}`;

  drawPie({
    id,
    labels: map(opintoData, "kurssi"),
    datasets: opintoData.map(() => (1 / opintoData.length) * 100),
    backgroundColor: opintoData.map(
      ({ done }) => (done ? "lightgreen" : "lightgray")
    )
  });
};

const findOpintoByLyhenne = ({ opinnot, lyhenne }) =>
  opinnot.find(item => lyhenne === item.lyhenne);

const hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai = ({
  stuff,
  keskiarvot,
  kurssit
}) => {
  if (!kurssit.length) {
    return [];
  }

  const opinnot = annaMulleKeskiarvotTietyistäKursseista({
    kurssit,
    stuff
  });

  return keskiarvot.reduce((initial, item) => {
    const jeejee = findOpintoByLyhenne({ opinnot, lyhenne: item.lyhenne });

    if (jeejee) {
      return [...initial, { ...jeejee, fromOpinnot: true }];
    }

    const mitäs = initial.filter(({ fromOpinnot }) => fromOpinnot).reverse()[0];

    return [...initial, { ...mitäs, arvosana: 0 } || item];
  }, []);
};

const rakenteleDataSetitKeskiarvoChartille = ({
  keskiarvot,
  keskiarvotPerusopinnoista,
  keskiarvotAineopinnoista
}) =>
  [
    {
      label: "Päivittäinen keskiarvo kaikista kursseista",
      data: map(keskiarvot, "keskiarvo"),
      ...style
    },
    notEmpty(keskiarvotPerusopinnoista) && {
      label: "Päivittäinen keskiarvo perusopinnoista",
      data: map(keskiarvotPerusopinnoista, "keskiarvo"),
      ...styleBlue
    },
    notEmpty(keskiarvotAineopinnoista) && {
      label: "Päivittäinen keskiarvo aineopinnoista",
      data: map(keskiarvotAineopinnoista, "keskiarvo"),
      ...styleGreen
    }
  ].filter(isTruthy);

const rakenteleDataSetitNoppaChartille = grouped =>
  [
    {
      label: "Päivän opintopisteet",
      data: map(grouped, "op")
    },
    {
      label: "Suoritukset",
      data: map(grouped, "cumulativeOp"),
      ...style,
      type: "line"
    }
  ].filter(isTruthy);

const drawGraphs = ({
  stuff,
  keskiarvot,
  keskiarvotPerusopinnoista,
  keskiarvotAineopinnoista
}) => {
  const grouped = groupThemCourses(stuff);
  notEmpty(grouped) &&
    draw({
      id: "chart-nopat",
      customTooltip: true,
      customTicks: true,
      labels: map(grouped, "pvm"),
      datasets: rakenteleDataSetitNoppaChartille(grouped)
    });

  notEmpty(keskiarvot) &&
    draw({
      id: "chart-keskiarvo",
      labels: map(keskiarvot, "pvm"),
      type: "line",
      datasets: rakenteleDataSetitKeskiarvoChartille({
        keskiarvot,
        keskiarvotPerusopinnoista,
        keskiarvotAineopinnoista
      })
    });
};

// Returns the semester's precise starting and ending dates.
// TODO: Replace with Moment.js
const getLukuvuosi = vuosi => [
  new Date(vuosi, 7, 1),
  new Date(vuosi + 1, 6, 31, 23, 59, 59)
];

const rakenteleDateObjekti = ([paiva, kuukausi, vuosi]) =>
  new Date(vuosi, kuukausi - 1, paiva);

const getPvmArray = pvm => pvm.split(".").map(Number);

const sorttaaStuffLukukausienMukaan = (a, b) => a.pvmDate - b.pvmDate;

const isInBetween = ({ value, values: [start, end] }) =>
  value >= start && value <= end;

const laskeLukukausienNopat = (prev, { pvmDate, op }) => {
  const vuosi = pvmDate.getFullYear();

  // Then.. It must be the previous semester of the previous semester we just checked!
  // this comment makes no sense now that i moved it from else, sorry. - juha
  let vuosiJuttu = vuosi - 1;

  const pvmIsCurrentSemester = isInBetween({
    value: pvmDate,
    values: getLukuvuosi(vuosi)
  });

  const pvmIsNextSemester = isInBetween({
    value: pvmDate,
    values: getLukuvuosi(vuosi + 1)
  });

  if (pvmIsCurrentSemester) {
    vuosiJuttu = vuosi;
  } else if (pvmIsNextSemester) {
    // If it's not between the current semester, it must be the next one
    vuosiJuttu = vuosi + 1;
  }

  return { ...prev, [vuosiJuttu]: op + (prev[vuosiJuttu] || 0) };
};

const ryhmitteleStuffKivastiLukukausiksi = stuff =>
  stuff.sort(sorttaaStuffLukukausienMukaan).reduce(laskeLukukausienNopat, {});

const piirteleVuosiJuttujaJookosKookosHaliPus = stuff => {
  const kuukausiGroups = ryhmitteleStuffKivastiLukukausiksi(stuff);

  draw({
    id: "chart-nopat-vuosi",
    type: "line",
    labels: Object.keys(kuukausiGroups),
    datasets: [
      {
        label: "Noppia per lukuvuosi",
        data: Object.values(kuukausiGroups),
        ...styleBlue
      }
    ]
  });
};

const piirräDonitsit = ({ stuff, aineOpinnot, perusOpinnot }) => {
  notEmpty(aineOpinnot) &&
    drawOpintoDonitsi({ id: "aineopinnot", stuff, data: aineOpinnot });

  notEmpty(perusOpinnot) &&
    drawOpintoDonitsi({ id: "perusopinnot", stuff, data: perusOpinnot });
};

const sorttaaLuennoitsijatKeskiarvonMukaan = (a, b) =>
  b.luennot.keskiarvo - a.luennot.keskiarvo || b.kurssimaara - a.kurssimaara;

const piirräLuennoitsijaListat = stuff => {
  const luennoitsijat = haluaisinTietääLuennoitsijoista(stuff);

  const luennoitsijatElement = document.querySelector("#luennoitsijat");
  luennoitsijatElement.innerHTML = "";

  drawLuennoitsijat({
    title: "Luennoitsijoiden top lista by kurssimaara",
    lista: luennoitsijat.sort((a, b) => b.kurssimaara - a.kurssimaara),
    luennoitsijatElement
  });

  drawLuennoitsijat({
    title: "Luennoitsijoiden top lista by keskiarvo",
    lista: [
      ...luennoitsijat
        .filter(({ luennot }) => luennot.keskiarvo !== "hyv")
        .sort(sorttaaLuennoitsijatKeskiarvonMukaan),
      ...luennoitsijat.filter(({ luennot }) => luennot.keskiarvo === "hyv")
    ],
    luennoitsijatElement
  });

  drawLuennoitsijat({
    title: "Luennoitsijoiden top lista by nopat",
    lista: luennoitsijat.sort((a, b) => b.luennot.totalOp - a.luennot.totalOp),
    luennoitsijatElement
  });
};

const hommaaMatskutLocalStoragesta = () => ({
  duplikaattiKurssit: getDuplikaattiKurssit(),
  perusOpinnot: getPerusOpinnot(),
  aineOpinnot: getAineOpinnot()
});

const laskeKeskiarvot = ({ stuff, keskiarvot, perusOpinnot, aineOpinnot }) => {
  const keskiarvotPerusopinnoista = hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai(
    {
      stuff,
      keskiarvot,
      kurssit: perusOpinnot
    }
  );

  const keskiarvotAineopinnoista = hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai(
    {
      stuff,
      keskiarvot,
      kurssit: aineOpinnot
    }
  );

  return { keskiarvotPerusopinnoista, keskiarvotAineopinnoista };
};

const undefinedStuffFilter = item => item.luennoitsija !== undefined;

// tästä tää lähtee!
const start = () => {
  if (!pitäisköDomRakentaa()) {
    return;
  }

  const {
    duplikaattiKurssit,
    perusOpinnot,
    aineOpinnot
  } = hommaaMatskutLocalStoragesta();

  createDom({ duplikaattiKurssit, perusOpinnot, aineOpinnot });

  // Make stuff & filter out undefined things
  const stuff = makeSomeStuff(duplikaattiKurssit).filter(undefinedStuffFilter);

  const keskiarvot = annaMulleKeskiarvotKursseista(stuff);

  const {
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista
  } = laskeKeskiarvot({ stuff, keskiarvot, perusOpinnot, aineOpinnot });

  drawGraphs({
    stuff,
    keskiarvot,
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista
  }); // 📈

  piirräDonitsit({ stuff, aineOpinnot, perusOpinnot }); // 🍩

  piirräLuennoitsijaListat(stuff); // 👩‍🏫👨‍🏫

  piirteleVuosiJuttujaJookosKookosHaliPus(stuff);

  kuunteleAsijoita(); // 👂
};

start();
