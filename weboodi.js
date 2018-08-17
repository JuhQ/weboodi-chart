const list = document.querySelectorAll(
  "#legacy-page-wrapper > table:nth-child(17) > tbody > tr > td > table > tbody tr"
);

const mm = [...list];

let cumulativeOp = 0;

shit = mm
  .map(item => [...item.querySelectorAll("td")])
  .filter(item => item.length)
  .reverse()
  .map(([lyhenne, kurssi, op, arvosana, pvm]) => {
    const [paiva, kuukausi, vuosi] = pvm.textContent.trim().split(".");
    const opNumber = Number(op.textContent.trim());

    cumulativeOp += opNumber;

    return {
      lyhenne: lyhenne.textContent.trim(),
      kurssi: kurssi.textContent.trim(),
      op: opNumber,
      cumulativeOp,
      arvosana: Number(arvosana.textContent.trim()),
      pvm: pvm.textContent.trim(),
      pvmDate: new Date(vuosi, Number(kuukausi) - 1, paiva)
    };
  });

JSON.stringify(shit);
