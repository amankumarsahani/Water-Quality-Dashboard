import Chart from "chart.js/auto";

export const makeWaterData = (arr) => {
  arr.sort((a, b) => timeDateSorter(a, b, "Timestamp"));
  let [dataLabels, tds, cod, bod, ph, temp, ec] = [[], [], [], [], [], [], []];
  console.log("WaterDataFetched: ", arr.length);
  for (let i = 0; i < arr.length; i++) {
    dataLabels.push(arr[i]["Timestamp"]);
    tds.push(Math.abs(arr[i].TDS) > 1000 ? 0 : arr[i].TDS);
    cod.push(Math.abs(arr[i].COD) > 100 ? 0 : arr[i].COD);
    bod.push(Math.abs(arr[i].BOD) > 100 ? 0 : arr[i].BOD);
    ph.push(Math.abs(arr[i].pH) > 100 ? 0 : arr[i].pH);
    temp.push(Math.abs(arr[i].Temperature) > 100 ? 0 : arr[i].Temperature);
    ec.push(
      Math.abs(arr[i]["Electro-conductivity"]) > 100
        ? 0
        : arr[i]["Electro-conductivity"]
    );
  }
  console.log({ dataLabels, tds, cod, bod, ph, temp, ec });
  return { dataLabels, tds, cod, bod, ph, temp, ec };
};

export const timeDateSorter = (_a, _b, key) => {
  let a = _a[key];
  let b = _b[key];

  let p = toDate(a);
  let q = toDate(b);
  if (p < q) return -1;
  else if (p > q) return 1;
  return 0;
};

function toDate(a) {
  a = a.substring(3, 6) + a.substring(0, 3) + a.substring(6);
  return new Date(a);
}

export const makeChart = (
  canvasId,
  title,
  xLabel,
  yLabelArr,
  yAxisIDArr,
  yDataArr,
  type,
  colorArr = [],
  stacked = false
) => {
  if (colorArr === []) {
    yDataArr.forEach((_, i) => {
      colorArr[i] = `hsl(
        ${genRan(0, 360)},
        100%,100%
      )`;
    });
  }
  const datasets = yDataArr.map((yData, i) => {
    console.log(i);
    return {
      type: type[i],
      label: yLabelArr[i],
      data: yData,
      backgroundColor: hexWithAlpha(colorArr[i], "55"),
      borderColor: colorArr[i],
      borderWidth: 1,
      yAxisID: yAxisIDArr[i],
    };
  });
  return new Chart(document.getElementById(canvasId).getContext("2d"), {
    type: "bar",
    data: {
      labels: xLabel,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          stacked: stacked,
          position: "left",
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        y1: {
          stacked: stacked,
          position: "right",
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x: {
          stacked: stacked,
          beginAtZero: true,
          ticks: { maxRotation: 0, autoskip: true, autoSkipPadding: 20 },
          grid: {
            display: false,
          },
        },
      },
    },
  });
};
export const genRan = (min, max) => {
  let x = min + Math.floor(Math.random() * (max - min));
  console.log(x);

  return x;
};

export const hexWithAlpha = (hex, alpha) => `${hex}${alpha}`;