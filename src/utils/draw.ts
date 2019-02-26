import Chart from 'chart.js';

import { DrawParams, DrawPieParams } from '../interfaces/Interfaces';
import chartColors from './chartColors';
import { map, max } from './listUtils';
import { isFloat } from './validators';

const teeHienoTooltip = () => ({
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const label = data.datasets[tooltipItem.datasetIndex].label || '';
        const value = Math.round(tooltipItem.yLabel * 100) / 100;

        // datasetIndex = bar chart, values are multiplied by ten to show larger bars
        const labelValue =
          tooltipItem.datasetIndex || isFloat(value / 10) ? value : value / 10;

        return `${label}: ${labelValue}`;
      },
    },
  },
});

export const draw = ({
  id,
  labels,
  datasets,
  type = 'bar',
  customTooltip = false,
  customTicks = false,
}: DrawParams) => {
  const stepSize = 55;
  const maxValue =
    Math.ceil(max(map(datasets, 'data').map(max)) / stepSize) * stepSize;

  const elem = document.getElementById(id);

  if (elem === null) {
    throw new Error(`draw(): Element with id ${id} is null`);
  }

  new Chart(elem as HTMLCanvasElement, {
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
                color: chartColors,
              },
            }),
            ticks: {
              beginAtZero: true,
              ...(customTicks && {
                max: maxValue,
                stepSize,
              }),
            },
          },
        ],
      },
    },
  });
};

export const drawPie = ({
  id,
  labels,
  datasets,
  backgroundColor,
}: DrawPieParams) => {
  const elem = document.getElementById(`${id}-container`);
  if (elem === null) {
    throw new Error(`drawPie(): Element with id ${id}-container is null`);
  }
  elem.style.display = 'block';

  const elem2 = document.getElementById(id);

  if (elem2 === null) {
    throw new Error(`drawPie(): Element with id ${id} is null`);
  }

  new Chart(elem2 as HTMLCanvasElement, {
    type: 'pie',
    data: {
      datasets: [{ data: datasets, backgroundColor }],
      labels,
    },
  });
};
