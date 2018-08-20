const list = document.querySelectorAll(
  "#legacy-page-wrapper > table:nth-child(17) > tbody > tr > td > table > tbody tr"
);

let cumulativeOp = 0;

const stuff = [...list]
  .map(item => [...item.querySelectorAll("td")])
  .filter(item => item.length)
  .map(item => item.map(value => value.textContent.trim()))
  .filter(([lyhenne]) => !["A582103", "A581325"].includes(lyhenne))
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
      pvmDate: new Date(vuosi, Number(kuukausi) - 1, paiva),
      luennoitsija
    };
  });

const yolo = `
<canvas id="chart-op" width="500" height="200"></canvas>
<canvas id="chart-keskiarvo" width="500" height="200"></canvas>
<div id="luennoitsijat" style="clear:both;display:inline-block;margin-bottom:100px;"></div>
`;

const listaTaulukko = document.querySelectorAll("table")[1];
listaTaulukko.outerHTML = listaTaulukko.outerHTML + yolo;

const find = (list, key) => list.find(({ pvm }) => pvm === key);

const grouped = stuff
  .reduce((initial, item) => {
    const found = find(initial, item.pvm);
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
        ...jee,
        ...today
      };
    });
  }, [])
  .map(item => ({ ...item, op: item.op * 10 }));

let arvosanaTotal = 0;

const keskiarvot = stuff
  .filter(item => !isNaN(item.arvosana))
  .map((item, i) => {
    arvosanaTotal += item.arvosana;
    return {
      ...item,
      keskiarvo: (arvosanaTotal / (i + 1)).toFixed(2)
    };
  });

const luennoitsijat = stuff
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

const luennoitsijatElement = document.querySelector("#luennoitsijat");

const drawLuennoitsijat = ({ title, lista }) => {
  let html = `<div style="float: left; margin-right: 10px;"><p><strong>${title}</strong></p>`;

  lista.forEach(item => {
    const wadap = `<p>
    ${item.luennoitsija},
    kursseja ${item.kurssimaara},
    keskiarvo: ${item.luennot.keskiarvo},
    noppia: ${item.luennot.totalOp}
    </p>`;
    html += wadap;
  });

  html += "</div>";
  luennoitsijatElement.innerHTML = luennoitsijatElement.innerHTML + html;
};

const getMax = lista => Math.max.apply(null, lista);

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

draw({
  id: "chart-op",
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
      label: "Arvosanojen päivittäinen keskiarvo",
      data: keskiarvot.map(({ keskiarvo }) => keskiarvo),
      ...style
    }
  ]
});

drawLuennoitsijat({
  title: "Luennoitsijoiden top lista by kurssimaara",
  lista: luennoitsijat.sort((a, b) => b.kurssimaara - a.kurssimaara)
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
  ]
});

drawLuennoitsijat({
  title: "Luennoitsijoiden top lista by nopat",
  lista: luennoitsijat.sort((a, b) => b.luennot.totalOp - a.luennot.totalOp)
});
