import moment from "moment";
import Chart from "chart.js/auto";

export const makeWaterData = (arr, key = "Timestamp") => {
  //no need to sort data, data comes sorted from api
  // arr.sort((a, b) => timeDateSorter(a, b, key));
  let [dataLabels, tds, cod, bod, ph, temp, ec, dio] = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  for (let i = 0; i < arr.length; i++) {
    dataLabels.push(moment(toDate(arr[i][key])).format("lll"));
    tds.push(Math.abs(arr[i].TDS) > 500 ? 0 : arr[i].TDS);
    cod.push(Math.abs(arr[i].COD) > 50 ? 0 : arr[i].COD);
    bod.push(Math.abs(arr[i].BOD) > 50 ? 0 : arr[i].BOD);
    ph.push(Math.abs(arr[i].pH) > 20 ? 0 : arr[i].pH);
    temp.push(Math.abs(arr[i].Temperature) > 70 ? 0 : arr[i].Temperature);
    ec.push(
      Math.abs(arr[i]["Electro-conductivity"]) > 10
        ? 0
        : arr[i]["Electro-conductivity"]
    );
    dio.push(10.27 - 0.6 * parseFloat(cod[i]) - 0.35 * parseFloat(bod[i]));
  }
  return { dataLabels, tds, cod, bod, ph, temp, ec, dio };
};

// export const timeDateSorter = (_a, _b, key) => {
//   let a = _a[key];
//   let b = _b[key];

//   let p = toDate(a);
//   let q = toDate(b);
//   if (p < q) return -1;
//   else if (p > q) return 1;
//   return 0;
// };

function toDate(a) {
  a =
    a.substring(5, 7) +
    "/" +
    a.substring(8, 10) +
    "/" +
    a.substring(0, 4) +
    " " +
    a.substring(11, 19);
  return new Date(a);
}

export const makeChart = (
  canvasId,
  title,
  xLabel,
  yLabelArr,
  axisIDArr,
  yDataArr,
  type,
  colorArr = [],
  fontSize = 14,
  indexAxis = "x"
) => {
  if (colorArr === []) {
    yDataArr.forEach((_, i) => {
      colorArr[i] = `hsl(
        ${genRan(0, 360)},
        100%,100%
      )`;
    });
  }
  if (fontSize < 8) fontSize = 8;
  let scales = {
    y: {
      position: "left",
      beginAtZero: true,
      grid: {
        display: true,
        color: "#ffffff11",
      },
      ticks: {
        font: { size: fontSize },
      },
    },
    x: {
      position: "bottom",
      beginAtZero: true,
      ticks: {
        maxRotation: 0,
        autoskip: true,
        autoSkipPadding: 20,
        font: { size: fontSize },
      },
      grid: {
        display: false,
      },
    },
  };

  const datasets = yDataArr.map((yData, i) => {
    if (axisIDArr[i] === "1") {
      if (indexAxis === "x") {
        scales.y1 = {
          position: "right",
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            color: hexWithAlpha(colorArr[i], "dd"),
            font: { size: fontSize },
          },
        };
      } else {
        scales.x1 = {
          position: "top",
          barPercentage: 1.0,
          categoryPercentage: 0.5,
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            color: hexWithAlpha(colorArr[i], "dd"),
            font: { size: fontSize },
          },
        };
      }
    }
    let xId;
    let yId;
    if (axisIDArr[i] === "1") {
      if (indexAxis === "x") {
        yId = "y1";
      }
      xId = "x1";
    }
    let ret = {
      type: type[i],
      label: yLabelArr[i],
      data: yData,
      backgroundColor: hexWithAlpha(colorArr[i], "55"),
      borderColor: colorArr[i],
      borderWidth: 1,

      tension: 0,
    };
    if (indexAxis === "x") {
      ret.yAxisID = yId;
    } else ret.xAxisID = xId;
    return ret;
  });

  return new Chart(document.getElementById(canvasId).getContext("2d"), {
    type: "bar",
    data: {
      labels: xLabel,
      datasets: datasets,
    },
    options: {
      indexAxis: indexAxis,
      responsive: true,
      maintainAspectRatio: false,
      scales: scales,
      plugins: {
        title: {
          display: true,
          text: title,
          position: "top",
          align: "start",
          color: "#00c3ff",
          font: {
            size: fontSize * 2,
            weight: "200",
          },
        },
        legend: {
          position: "top",
          align: "end",
          labels: {
            color: "#00c3ff",
            display: true,
            font: {
              size: fontSize,
            },
          },
        },
      },
      elements: {
        point: {
          radius: 1,
          hoverRadius: 10,
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
