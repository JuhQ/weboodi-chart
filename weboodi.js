const list = document.querySelectorAll(
  "#legacy-page-wrapper > table:nth-child(17) > tbody > tr > td > table > tbody tr"
);

const getLocalStorage = key => JSON.parse(localStorage.getItem(key) || "[]");
const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getDuplikaattiKurssit = () => getLocalStorage("duplikaattiKurssit");

const setDuplikaattiKurssit = kurssit =>
  setLocalStorage("duplikaattiKurssit", kurssit);

const getPerusOpinnot = () => getLocalStorage("perusOpinnot");

const setPerusOpinnot = kurssit => setLocalStorage("perusOpinnot", kurssit);

const getAineOpinnot = () => getLocalStorage("aineOpinnot");

const setAineOpinnot = kurssit => setLocalStorage("aineOpinnot", kurssit);

const getMax = lista => Math.max.apply(null, lista);

const findPvm = (list, key) => list.find(({ pvm }) => pvm === key);

const draw = ({
  id,
  labels,
  datasets,
  type = "bar",
  customTooltip = false,
  customTicks = false
}) => {
  const tooltip = {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          const label = data.datasets[tooltipItem.datasetIndex].label || "";

          const value = Math.round(tooltipItem.yLabel * 100) / 100;

          // datasetIndex = bar chart, values are multiplied by ten to show larger bars
          const labelValue = tooltipItem.datasetIndex ? value : value / 10;

          return `${label}: ${labelValue}`;
        }
      }
    }
  };

  var ctx = document.getElementById(id);
  var chart = new Chart(ctx, {
    type,
    data: { labels, datasets },
    options: {
      ...(customTooltip && tooltip),
      scales: {
        yAxes: [
          {
            ...(customTicks && {
              gridLines: {
                drawBorder: false,
                color: [
                  "pink",
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "indigo",
                  "purple"
                ]
              }
            }),
            ticks: {
              beginAtZero: true,
              ...(customTicks && {
                max: getMax(datasets.map(({ data }) => getMax(data))) + 20,
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

  var ctx = document.getElementById(id);
  const myPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [{ data: datasets, backgroundColor }],
      labels
    }
  });
};

const style = {
  backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)"
  ],
  borderColor: [
    "rgba(255,99,132,1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)"
  ],
  borderWidth: 1
};

const styleBlue = {
  backgroundColor: ["rgba(118, 99, 255, 0.2)"],
  borderColor: ["rgba(118,99,132,1)"],
  borderWidth: 1
};

const styleGreen = {
  backgroundColor: ["rgba(99, 255, 157, 0.2)"],
  borderColor: ["rgba(99,99,132,1)"],
  borderWidth: 1
};

const doCss = () => {
  return `
  <style>
    #luennoitsijat {
      clear: both;
      display: inline-block;
      margin-bottom: 100px;
    }

    .clear {
      clear: both;
      display: table;
    }

    .pull-left {
      float: left;
    }

    .margin-bottom-large {
      margin-bottom: 100px;
    }
  </style>
  `;
};

const createDom = ({ duplikaattiKurssit, perusOpinnot, aineOpinnot }) => {
  const yolo = `
  <div id="nuggets" class="margin-bottom-large">
    <div class="clear margin-bottom-large">
      <div id="perusopinnot-container" class="pull-left" style="display:none;">
        Perusopinnot
        <canvas id="perusopinnot" width="500" height="200"></canvas>
      </div>
      <div id="aineopinnot-container" class="pull-left" style="display:none;">
        Aineopinnot
        <canvas id="aineopinnot" width="500" height="200"></canvas>
      </div>
    </div>
    <canvas id="chart-nopat" width="500" height="200"></canvas>
    <canvas id="chart-keskiarvo" width="500" height="200"></canvas>
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
    </div>

    <p>
      Haluatko lisätoiminnallisuutta tähän plugariin? Löysitkö virheen?<br>
      Mikäli olet tkt opiskelija, <a href="https://github.com/JuhQ/weboodi-chart">tee pull request</a>.<br>
      Mikäli opiskelet jotain muuta, laita mailia juha.tauriainen@helsinki.fi
    </p>
  </div>
  `;

  const listaTaulukko = document.querySelectorAll("table")[1];
  const nuggetsExist = document.querySelector("#nuggets");
  if (nuggetsExist) {
    nuggetsExist.outerHTML = yolo;
  } else {
    listaTaulukko.outerHTML = listaTaulukko.outerHTML + doCss() + yolo;
  }
};

const createCoursesArray = target => target.value.split(",").map(k => k.trim());

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

const groupThemCourses = stuff =>
  stuff
    .reduce((initial, item) => {
      const found = findPvm(initial, item.pvm);
      if (!found) {
        return [...initial, item];
      }

      return initial.map(jee => {
        const today =
          jee.pvm === item.pvm
            ? {
                cumulativeOp: item.op + jee.cumulativeOp,
                op: item.op + jee.op
              }
            : null;

        return {
          ...jee, // 💩👌
          ...today
        };
      });
    }, [])
    .map(item => ({ ...item, op: item.op * 10 }));

const makeSomeStuff = ({ list, duplikaattiKurssit }) => {
  let cumulativeOp = 0;

  return [...list]
    .map(item => [...item.querySelectorAll("td")])
    .filter(item => item.length)
    .map(item => item.map(value => value.textContent.trim()))
    .filter(([lyhenne]) => !duplikaattiKurssit.includes(lyhenne))
    .reverse()
    .map(([lyhenne, kurssi, op, arvosana, pvm, luennoitsija]) => {
      const [paiva, kuukausi, vuosi] = pvm.split(".");
      const opNumber = Number(op);

      cumulativeOp += opNumber;

      return {
        lyhenne,
        kurssi,
        op: opNumber,
        cumulativeOp,
        arvosana: Number(arvosana),
        pvm,
        pvmDate: new Date(vuosi, Number(kuukausi) - 1, paiva), // not used anywhere yet
        luennoitsija
      };
    });
};

const annaMulleKeskiarvotKursseista = stuff => {
  let arvosanaTotal = 0;

  return stuff.filter(item => !isNaN(item.arvosana)).map((item, i) => {
    arvosanaTotal += item.arvosana;
    return {
      ...item,
      keskiarvo: (arvosanaTotal / (i + 1)).toFixed(2)
    };
  });
};

const annaMulleKeskiarvotTietyistäKursseista = ({ kurssit, stuff }) => {
  let arvosanaTotal = 0;

  return stuff
    .filter(item => !isNaN(item.arvosana))
    .filter(({ lyhenne }) => kurssit.includes(lyhenne))
    .map((item, i) => {
      arvosanaTotal += item.arvosana;
      return {
        ...item,
        keskiarvo: (arvosanaTotal / (i + 1)).toFixed(2)
      };
    });
};

const haluaisinTietääLuennoitsijoista = stuff =>
  stuff
    .reduce(
      (initial, item) => [
        ...initial,
        ...item.luennoitsija
          .split(",")
          .map(luennoitsija => luennoitsija.trim())
          .filter(luennoitsija => luennoitsija.length)
          .map(luennoitsija => ({ ...item, luennoitsija }))
      ],
      []
    )
    .map((item, i, arr) => {
      const luennot = arr.filter(
        ({ luennoitsija }) => luennoitsija === item.luennoitsija
      );
      const arvosanat = luennot
        .filter(item => !isNaN(item.arvosana))
        .map(({ arvosana }) => arvosana);

      const keskiarvo = arvosanat.reduce((a, b) => a + b, 0) / arvosanat.length;

      return {
        ...item,
        kurssimaara: luennot.length,
        luennot: {
          arvosanat,
          keskiarvo: keskiarvo ? keskiarvo.toFixed(2) : "hyv",
          op: luennot.map(({ op }) => op),
          totalOp: luennot.map(({ op }) => op).reduce((a, b) => a + b, 0)
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
    <div style="float: left; margin-right: 10px;">
      <p><strong>${title}</strong></p>
      ${lista.map(createLuennoitsijaRivi).join("")}
    </div>
  `;

  luennoitsijatElement.innerHTML = luennoitsijatElement.innerHTML + html;
};

const drawOpintoDonitsi = ({ id, stuff, data }) => {
  const opintoData = [
    ...stuff
      .filter(({ lyhenne }) => data.includes(lyhenne))
      .map(({ lyhenne }) => ({ lyhenne, done: true })),
    ...data
      .filter(lyhenne => !stuff.find(course => lyhenne === course.lyhenne))
      .map(lyhenne => ({ lyhenne, done: false }))
  ];

  drawPie({
    id,
    labels: opintoData.map(({ lyhenne }) => lyhenne),
    datasets: opintoData.map(() => (1 / opintoData.length) * 100),
    backgroundColor: opintoData.map(
      ({ done }) => (done ? "lightgreen" : "lightgray")
    )
  });
};

const hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai = ({
  keskiarvot,
  opinnot
}) =>
  keskiarvot.reduce((initial, item) => {
    const jeejee = opinnot.find(({ lyhenne }) => lyhenne === item.lyhenne);
    if (jeejee) {
      return [...initial, { ...jeejee, fromOpinnot: true }];
    }

    const mitäs = initial.filter(({ fromOpinnot }) => fromOpinnot).reverse()[0];

    return [...initial, !mitäs ? item : mitäs];
  }, []);

// tästä tää lähtee!
const start = () => {
  const duplikaattiKurssit = getDuplikaattiKurssit();
  const aineOpinnot = getAineOpinnot();
  const perusOpinnot = getPerusOpinnot();

  createDom({ duplikaattiKurssit, aineOpinnot, perusOpinnot });
  kuunteleDuplikaattiInputtia();
  kuunteleppaNiitäPerusopintoja();
  tahtoisinVaanKuunnellaAineopintoja();
  kuunteleppaNapinpainalluksiaJuu();

  const stuff = makeSomeStuff({ list, duplikaattiKurssit });

  const grouped = groupThemCourses(stuff);

  const keskiarvot = annaMulleKeskiarvotKursseista(stuff);

  const keskiarvotPerusopinnoista = hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai(
    {
      keskiarvot,
      opinnot: annaMulleKeskiarvotTietyistäKursseista({
        kurssit: perusOpinnot,
        stuff
      })
    }
  );

  const keskiarvotAineopinnoista = hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai(
    {
      keskiarvot,
      opinnot: annaMulleKeskiarvotTietyistäKursseista({
        kurssit: aineOpinnot,
        stuff
      })
    }
  );

  const luennoitsijat = haluaisinTietääLuennoitsijoista(stuff);

  const luennoitsijatElement = document.querySelector("#luennoitsijat");

  if (aineOpinnot.length) {
    drawOpintoDonitsi({ id: "aineopinnot", stuff, data: aineOpinnot });
  }

  if (perusOpinnot.length) {
    drawOpintoDonitsi({ id: "perusopinnot", stuff, data: perusOpinnot });
  }

  draw({
    id: "chart-nopat",
    customTooltip: true,
    customTicks: true,
    labels: grouped.map(({ pvm }) => pvm),
    datasets: [
      {
        label: "Päivän opintopisteet",
        data: grouped.map(({ op }) => op)
      },
      {
        label: "Suoritukset",
        data: grouped.map(({ cumulativeOp }) => cumulativeOp),
        ...style,
        type: "line"
      }
    ]
  });

  draw({
    id: "chart-keskiarvo",
    labels: keskiarvot.map(({ pvm }) => pvm),
    type: "line",
    datasets: [
      {
        label: "Arvosanojen päivittäinen keskiarvo kaikista kursseista",
        data: keskiarvot.map(({ keskiarvo }) => keskiarvo),
        ...style
      },
      {
        label: "Arvosanojen päivittäinen keskiarvo perusopinnoista",
        data: keskiarvotPerusopinnoista.map(({ keskiarvo }) => keskiarvo),
        ...styleBlue
      },
      {
        label: "Arvosanojen päivittäinen keskiarvo aineopinnoista",
        data: keskiarvotAineopinnoista.map(({ keskiarvo }) => keskiarvo),
        ...styleGreen
      }
    ]
  });

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
        .sort(
          (a, b) =>
            b.luennot.keskiarvo - a.luennot.keskiarvo ||
            b.kurssimaara - a.kurssimaara
        ),
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

start();
