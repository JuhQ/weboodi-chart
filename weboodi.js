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

const setHtmlContent = ({ id, content }) => {
  document.getElementById(id).innerHTML = content;
};

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
        name: "Kandidaatin tutkielma",
        keys: ["TKT20013", "AYTKT20013", "582204", "A582204"]
      },
      {
        name: "Kypsyysnäyte LuK",
        keys: ["TKT20014", "AYTKT20014", "50036", "A50036"]
      }
    ],
    mitaNaaOn: [
      {
        name: "Johdatus tekoälyyn",
        keys: ["TKT20008", "AYTKT20008", "582216", "A582216"]
      },
      {
        name: "Tietoturvan perusteet",
        keys: ["TKT20009", "AYTKT20009", "582215", "A582215"]
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

const isFloat = n => Number(n) === n && n % 1 !== 0;

const teeHienoTooltip = () => ({
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const label = data.datasets[tooltipItem.datasetIndex].label || "";
        const value = Math.round(tooltipItem.yLabel * 100) / 100;

        // datasetIndex = bar chart, values are multiplied by ten to show larger bars
        const labelValue =
          tooltipItem.datasetIndex || isFloat(value / 10) ? value : value / 10;

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
  const stepSize = 55;
  const maxValue =
    Math.ceil(max(map(datasets, "data").map(max)) / stepSize) * stepSize;

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
                max: maxValue,
                stepSize
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
        <canvas id="chart-keskiarvo" width="500" height="200"></canvas>
      </div>
    </div>
    <div class="clear">
      <div class="jeejee-pull-left half">
        <canvas id="chart-nopat-kuukaudet" width="500" height="200"></canvas>
      </div>
      <div class="jeejee-pull-left half">
        <div id="opintojen-maara"></div>
        <div id="keskiarvo-op-maara"></div>
        <div id="luennoitsijoiden-maara"></div>
        <div id="open-uni-maara"></div>
        <div id="hyv-maara"></div>
        <div id="vuodet-arvio"></div>
        <div id="max-kuukausi-nopat"></div>
        <div id="keskiarvo"></div>
        <div id="tagipilvi"></div>
      </div>
    </div>
    <div class="clear">
      <div class="jeejee-pull-left half">
        <canvas id="chart-nopat-vuosi" width="500" height="200"></canvas>
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

    <p>
      Plugin löytyy googlen webstoresta <a href="https://chrome.google.com/webstore/detail/weboodi-charts/mmjejalobgipeicnedjpcnjkeamamlnd">https://chrome.google.com/webstore/detail/weboodi-charts/mmjejalobgipeicnedjpcnjkeamamlnd</a><br>
      Lyhytosoite <a href="https://goo.gl/TrpRJr">https://goo.gl/TrpRJr</a>
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
    .map(item => ({
      ...item,
      op: item.op <= 10 ? item.op * 10 : item.op,
      realOp: item.op
    }));

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
  op: Number(poistaSulut(op)), // paketoitu kandi tms
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
    .filter(({ op }) => !isNaN(op))
    .sort(sorttaaStuffLukukausienMukaan)
    .reduce(lasketaanpaLopuksiKumulatiivisetNopat, []);

const takeUntil = (list, n) =>
  list.reduce((initial, item, i) => (i < n ? [...initial, item] : initial), []);

const sum = (a, b) => a + b;

const average = list => list.reduce(sum, 0) / list.length;

const annaMulleKeskiarvotKursseista = stuff =>
  stuff
    .filter(item => !isNaN(item.arvosana))
    .map((item, i, list) => ({
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

const poistaAvoinKurssiNimestä = kurssi =>
  kurssi
    .replace("Avoin yo:", "")
    .replace("Open uni:", "")
    .trim();

const poistaSulut = str => str.replace(/\(|\)/g, "").trim();

const poistaPilkut = str => str.replace(",", "").trim();

const liianLyhytNimiSanaPilveen = 2;

const poistaLiianLyhyetNimet = str => str.length > liianLyhytNimiSanaPilveen;

const haluanRakentaaSanapilvenJa2008SoittiJaHalusiSanapilvenTakaisin = stuff =>
  map(stuff, "kurssi")
    .map(poistaAvoinKurssiNimestä)
    .map(poistaSulut)
    .reduce((list, kurssi) => [...list, ...kurssi.split(" ")], [])
    .filter(poistaLiianLyhyetNimet)
    .map(poistaPilkut)
    .reduce(
      (list, kurssi) => ({
        ...list,
        [kurssi]: list[kurssi] ? list[kurssi] + 1 : 1
      }),
      {}
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

const removeAvoinFromKurssiNimi = item => ({
  ...item,
  kurssi: item.kurssi.replace("Avoin yo: ", "").replace("Open uni: ", "")
});

const negate = callback => item => !callback(item);

const partition = (list, predicate) => [
  list.filter(negate(predicate)),
  list.filter(predicate)
];

const drawOpintoDonitsi = ({ id, stuff, data }) => {
  const [coursesDone, coursesNotDone] = partition(
    data,
    lyhenne => !stuff.find(course => lyhenne === course.lyhenne)
  );

  const opintoData = [
    ...coursesDone.map(lyhenne => ({ lyhenne, done: true })),
    ...coursesNotDone.map(lyhenne => ({ lyhenne, done: false }))
  ]
    .map(({ lyhenne, done }) => ({
      kurssi: findFromKurssiTietokanta(lyhenne) || lyhenne,
      done
    }))
    .reduce(removeDuplicateCourses(coursesDone), [])
    .map(removeAvoinFromKurssiNimi);

  const greatSuccess =
    coursesDone.length === opintoData.length ? "All done, nice!" : "";

  setHtmlContent({
    id: `${id}-progress`,
    content: `${coursesDone.length}/${opintoData.length} ${greatSuccess}`
  });

  drawPie({
    id,
    labels: map(opintoData, "kurssi"),
    datasets: opintoData.map(() => (1 / opintoData.length) * 100),
    backgroundColor: opintoData.map(({ done }) =>
      done ? "lightgreen" : "lightgray"
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
    notEmpty(keskiarvot) && {
      label: "Kurssien keskiarvo",
      data: map(keskiarvot, "keskiarvo"),
      ...style
    },
    notEmpty(keskiarvotPerusopinnoista) && {
      label: "Perusopintojen keskiarvo",
      data: map(keskiarvotPerusopinnoista, "keskiarvo"),
      ...styleBlue
    },
    notEmpty(keskiarvotAineopinnoista) && {
      label: "Aineopintojen keskiarvo",
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

const luoLukuvuodelleKivaAvain = ({
  vuosi,
  pvmIsCurrentSemester,
  pvmIsNextSemester
}) => {
  if (pvmIsCurrentSemester) {
    return (vuosiJuttu = vuosi);
  } else if (pvmIsNextSemester) {
    // If it's not between the current semester, it must be the next one
    return (vuosiJuttu = vuosi + 1);
  }
  return (vuosiJuttu = vuosi - 1);
};

const laskeLukukausienNopat = (prev, { pvmDate, op }) => {
  const vuosi = pvmDate.getFullYear();

  const pvmIsCurrentSemester = isInBetween({
    value: pvmDate,
    values: getLukuvuosi(vuosi)
  });

  const pvmIsNextSemester = isInBetween({
    value: pvmDate,
    values: getLukuvuosi(vuosi + 1)
  });

  const vuosiJuttu = luoLukuvuodelleKivaAvain({
    vuosi,
    pvmIsCurrentSemester,
    pvmIsNextSemester
  });

  return { ...prev, [vuosiJuttu]: op + (prev[vuosiJuttu] || 0) };
};

const luoKivaAvainReducelle = pvmDate => {
  const vuosi = pvmDate.getFullYear();
  const kuukausi = pvmDate.toLocaleString("fi", { month: "long" });

  return `${kuukausi} ${vuosi}`;
};

const laskeKuukausienNopat = (prev, { pvmDate, op }) => {
  const avainOnneen = luoKivaAvainReducelle(pvmDate);
  return { ...prev, [avainOnneen]: op + (prev[avainOnneen] || 0) };
};

const laskeKumulatiivisetKuukausienNopat = (
  prev,
  { pvmDate, cumulativeOp }
) => ({ ...prev, [luoKivaAvainReducelle(pvmDate)]: cumulativeOp });

const ryhmitteleStuffKivasti = ({ fn, stuff }) =>
  stuff.sort(sorttaaStuffLukukausienMukaan).reduce(fn, {});

const hemmettiSentäänTeeDataSetti = ({ label, data, secondDataSet }) =>
  [
    {
      label,
      data,
      ...styleBlue
    },
    secondDataSet && { ...secondDataSet, type: "line", ...styleGreen }
  ].filter(isTruthy);

const piirräPerusGraafiNopille = ({ id, label, labels, data, secondDataSet }) =>
  draw({
    id,
    type: secondDataSet ? "bar" : "line",
    labels,
    datasets: hemmettiSentäänTeeDataSetti({ label, data, secondDataSet })
  });

const piirteleVuosiJuttujaJookosKookosHaliPus = stuff => {
  const lukukausiGroups = ryhmitteleStuffKivasti({
    fn: laskeLukukausienNopat,
    stuff
  });
  const lukukausiKeys = Object.keys(lukukausiGroups);
  const lukukausiData = Object.values(lukukausiGroups);
  const ekaLukukausi = parseInt(lukukausiKeys[0], 10);
  const vainYksiLukukausiSuoritettu = lukukausiKeys.length === 1;
  const labels = vainYksiLukukausiSuoritettu
    ? [
        `${ekaLukukausi - 1}-${ekaLukukausi}`,
        `${ekaLukukausi}-${ekaLukukausi + 1}`,
        `${ekaLukukausi + 1}-${ekaLukukausi + 2}`
      ]
    : lukukausiKeys.map(i => `${i}-${parseInt(i, 10) + 1}`);

  // if only one year to show, pad data with zeros
  const data = vainYksiLukukausiSuoritettu ? [0, data[0], 0] : lukukausiData;

  piirräPerusGraafiNopille({
    id: "chart-nopat-vuosi",
    label: "Noppia per lukuvuosi",
    labels,
    data
  });
};

const piirteleKuukausittaisetJututJookosKookosHaliPusJaAdios = ({
  kuukausiGroups,
  kumulatiivisetKuukaudetGroups
}) => {
  piirräPerusGraafiNopille({
    id: "chart-nopat-kuukaudet",
    label: "Noppia per kuukausi",
    labels: Object.keys(kuukausiGroups),
    data: Object.values(kuukausiGroups),
    secondDataSet: {
      label: "Kumulatiiviset nopat",
      data: Object.values(kumulatiivisetKuukaudetGroups)
    }
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

const piirräLuennoitsijaListat = luennoitsijat => {
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

const piirraAvoimenSuorituksia = ({ kurssimaara, openUniMaara, openUniOp }) => {
  const openUniPercentage = ((openUniMaara / kurssimaara) * 100).toFixed(2);
  setHtmlContent({
    id: "open-uni-maara",
    content: `Olet suorittanut ${openUniMaara} avoimen kurssia, joka on ${openUniPercentage}% opinnoistasi. Yhteensä ${openUniOp} op.`
  });
};

const laitaHyvaksytytSuorituksetDomiinJeps = ({
  kurssimaara,
  hyvMaara,
  hyvOp
}) => {
  const hyvPercentage = ((hyvMaara / kurssimaara) * 100).toFixed(2);
  setHtmlContent({
    id: "hyv-maara",
    content: `Olet saanut ${hyvMaara} hyv merkintää, joka on ${hyvPercentage}% opinnoistasi. Yhteensä ${hyvOp} op.`
  });
};

const arvioidaanOpintoVuodetDomiin = op => {
  const vuodet = (op / 60).toFixed(2);
  setHtmlContent({
    id: "vuodet-arvio",
    content: `Opintopistemäärän mukaan arvioin sinun suorittaneen ${vuodet} vuotta opintojasi. Laskukaava = <span title="Opintopistemäärä / vuoden tavoiteopintopistemäärä">${op} / 60</span>.`
  });
};

const piirraRandomStatistiikkaa = ({
  kurssimaara,
  luennoitsijamaara,
  op,
  openUniMaara,
  openUniOp,
  hyvMaara,
  hyvOp,
  maxKuukausi,
  keskiarvo,
  painotettuKeskiarvo
}) => {
  setHtmlContent({
    id: "opintojen-maara",
    content: `Olet suorittanut huimat ${kurssimaara} erilaista kurssia! Good for you!`
  });

  const [kuukausi, vuosi] = maxKuukausi[0].split(" ");

  setHtmlContent({
    id: "max-kuukausi-nopat",
    content: `Olit tulessa ${kuukausi}ssa ${vuosi}! Suoritit silloin ${
      maxKuukausi[1]
    } noppaa! Whoah!`
  });

  setHtmlContent({
    id: "keskiarvo",
    content: `Opintojen keskiarvo: ${keskiarvo}. Painotettu keskiarvo: ${painotettuKeskiarvo}.`
  });

  setHtmlContent({
    id: "luennoitsijoiden-maara",
    content: `Olet käynyt ${luennoitsijamaara} eri luennoitsijan kursseilla, ${(
      kurssimaara / luennoitsijamaara
    ).toFixed(2)} kurssia per luennoitsija, ${(op / luennoitsijamaara).toFixed(
      2
    )} op per luennoitsija.`
  });
  setHtmlContent({
    id: "keskiarvo-op-maara",
    content: `Keskiarvolta ${(op / kurssimaara).toFixed(2)} noppaa per kurssi.`
  });
  if (openUniMaara) {
    piirraAvoimenSuorituksia({ kurssimaara, openUniMaara, openUniOp });
  }

  if (hyvMaara) {
    laitaHyvaksytytSuorituksetDomiinJeps({ kurssimaara, hyvMaara, hyvOp });
  }

  arvioidaanOpintoVuodetDomiin(op);
};

const minFontSize = 7;
const maxFontSize = 28;

const countFontSize = ({ val, minValue, maxValue }) =>
  val > minValue
    ? (maxFontSize * (val - minValue)) / (maxValue - minValue) + minFontSize
    : 1;

const piirraRumaTagipilvi = words => {
  const minValue = Math.min(...Object.values(words));
  const maxValue = Math.max(...Object.values(words));

  const content = Object.keys(words)
    .map(key => ({
      key,
      fontSize: countFontSize({ val: words[key], minValue, maxValue }),
      count: words[key]
    }))
    .map(
      ({ fontSize, key, count }) =>
        `<span style="font-size: ${fontSize}px;" title="${key} on mainittu ${count} kertaa suorituksissasi">${key}</span>`
    )
    .join(" ");

  setHtmlContent({
    id: "tagipilvi",
    content
  });
};

const undefinedStuffFilter = item => item.luennoitsija !== undefined;

const nameIncludesAvoinYo = name =>
  name.includes("avoin yo") || name.includes("open uni");

const laskePainotettuKeskiarvo = stuff => {
  const arvosanallisetOpintosuoritukset = stuff.filter(
    ({ arvosana }) => !isNaN(arvosana)
  );

  return (
    arvosanallisetOpintosuoritukset.reduce(
      (acc, { op, arvosana }) => acc + arvosana * op,
      0
    ) / map(arvosanallisetOpintosuoritukset, "op").reduce(sum, 0)
  ).toFixed(2);
};

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

  // prevent division with 0
  if (!stuff.length) {
    return;
  }

  const keskiarvot = annaMulleKeskiarvotKursseista(stuff);

  const {
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista
  } = laskeKeskiarvot({ stuff, keskiarvot, perusOpinnot, aineOpinnot });

  const luennoitsijat = haluaisinTietääLuennoitsijoista(stuff);

  const suositutSanat = haluanRakentaaSanapilvenJa2008SoittiJaHalusiSanapilvenTakaisin(
    stuff
  );

  const kuukausiGroups = ryhmitteleStuffKivasti({
    fn: laskeKuukausienNopat,
    stuff
  });

  const kumulatiivisetKuukaudetGroups = ryhmitteleStuffKivasti({
    fn: laskeKumulatiivisetKuukausienNopat,
    stuff
  });

  const maxKuukausiNopat = max(Object.values(kuukausiGroups));
  const maxKuukausi = Object.entries(kuukausiGroups).find(
    ([_, op]) => op === maxKuukausiNopat
  );

  const { keskiarvo } = [...keskiarvot].pop();
  const painotettuKeskiarvo = laskePainotettuKeskiarvo(stuff);

  piirraRumaTagipilvi(suositutSanat);

  drawGraphs({
    stuff,
    keskiarvot,
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista
  }); // 📈

  piirräDonitsit({ stuff, aineOpinnot, perusOpinnot }); // 🍩

  piirräLuennoitsijaListat(luennoitsijat); // 👩‍🏫👨‍🏫

  piirteleVuosiJuttujaJookosKookosHaliPus(stuff);
  piirteleKuukausittaisetJututJookosKookosHaliPusJaAdios({
    kuukausiGroups,
    kumulatiivisetKuukaudetGroups
  });

  piirraRandomStatistiikkaa({
    kurssimaara: stuff.length,
    luennoitsijamaara: luennoitsijat.length,
    op: map(stuff, "op").reduce(sum, 0),
    openUniMaara: map(stuff, "kurssi")
      .map(name => name.toLowerCase())
      .filter(nameIncludesAvoinYo).length,
    openUniOp: stuff
      .filter(({ kurssi }) => nameIncludesAvoinYo(kurssi.toLowerCase()))
      .map(({ op }) => op)
      .reduce(sum, 0),
    hyvMaara: map(stuff, "arvosana").filter(isNaN).length,
    hyvOp: map(stuff.filter(({ arvosana }) => isNaN(arvosana)), "op").reduce(
      sum
    ),
    maxKuukausi,
    keskiarvo,
    painotettuKeskiarvo
  });

  kuunteleAsijoita(); // 👂
};

start();
