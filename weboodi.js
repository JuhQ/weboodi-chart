const list = document.querySelectorAll(
  "#legacy-page-wrapper > table:nth-child(17) > tbody > tr > td > table > tbody tr"
);

let cumulativeOp = 0;

stuff = [...list]
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

JSON.stringify(stuff);
