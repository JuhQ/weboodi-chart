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
  .map(([lyhenne, kurssi, op, arvosana, pvm]) => {
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
      pvmDate: new Date(vuosi, Number(kuukausi) - 1, paiva)
    };
  });

const yolo = '<canvas id="chart" width="500" height="200"></canvas>';

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

const draw = ({ id, labels, datasets }) => {
  var ctx = document.getElementById(id);
  var chart = new Chart(ctx, {
    type: "bar",
    data: { labels, datasets },
    options: {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            console.log("tooltip", tooltipItem);

            const label = data.datasets[tooltipItem.datasetIndex].label || "";

            const value = Math.round(tooltipItem.yLabel * 100) / 100;

            // datasetIndex = bar chart, values are multiplied by ten to show larger bars
            const labelValue = tooltipItem.datasetIndex ? value : value / 10;

            return `${label}: ${labelValue}`;
          }
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
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
  id: "chart",
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
