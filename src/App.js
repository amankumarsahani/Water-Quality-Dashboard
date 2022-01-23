import "./App.css";
import Refresh from "./refresh.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeChart, makeWaterData } from "./utils.js";
function App() {
  const url =
    "https://gcyiihdmt6.execute-api.us-west-2.amazonaws.com/default/GetWaterQuality";

  const [waterData, setWaterData] = useState(null);
  const [chart1, setChart1] = useState(null);
  const [chart2, setChart2] = useState(null);
  const [chart3, setChart3] = useState(null);
  const [liveData, setLiveData] = useState({});
  const [refresh, setRefresh] = useState(false);

  const destroyCharts = (i) => {
    if (i === 1) chart1 && chart1.destroy();
    else if (i === 2) chart2 && chart2.destroy();
    else if (i === 3) chart3 && chart3.destroy();
  };

  useEffect(() => {
    axios.get(url + "?lim=20").then((response) => {
      setWaterData(makeWaterData(response.data.water));
    });
  }, [refresh]);

  useEffect(() => {
    axios.get(url + "?live=1").then((response) => {
      setLiveData(makeWaterData(response.data.water));
    });
  }, [refresh]);

  useEffect(() => {
    destroyCharts(1);
    waterData &&
      setChart1(
        makeChart(
          "c1",
          "title",
          waterData.dataLabels,
          ["COD", "BOD", "pH"],
          ["y", "y", "y1"],
          [waterData.cod, waterData.bod, waterData.ph],
          ["bar", "bar", "line"],
          ["#ff006f", "#0062ff", "#15ff00"],
          true
        )
      );
  }, [waterData]);

  useEffect(() => {
    destroyCharts(2);
    waterData &&
      setChart2(
        makeChart(
          "c2",
          "title",
          waterData.dataLabels,
          ["Electro-conductivity", "TDS"],
          ["y", "y1"],
          [waterData.ec, waterData.tds],
          ["line", "bar"],
          ["#17fc54", "#bb00ff"]
        )
      );
  }, [waterData]);

  useEffect(() => {
    destroyCharts(3);
    waterData &&
      setChart3(
        makeChart(
          "c3",
          "Temperature",
          waterData.dataLabels,
          ["Temperature"],
          ["y"],
          [waterData.temp],
          ["bar"],
          ["#ff5e00"]
        )
      );
  }, [waterData]);

  return (
    <div className="App dark">
      <header className="App-header">Water Quality Monitoring System</header>
      <div className="graphHolder">
        <div id="g1" className="graph">
          <div className="chart">
            <canvas id="c1"></canvas>
          </div>
        </div>
        <div id="g2" className="graph">
          <div id="liveTitle">
            <span>Live Data</span>
            <img
              id="refresh"
              src={Refresh}
              alt="refresh icon"
              onClick={() => {
                setRefresh(!refresh);
                console.log("refreshed");
              }}
            ></img>
          </div>
          <div className="liveDataHolder">
            <div id="ld0">
              <span>Time :</span>{" "}
              <span className="liveDataValue">{liveData.dataLabels}</span>
            </div>
            <div id="ld1">
              <span> pH : </span>
              <span className="liveDataValue">
                {parseFloat(liveData.ph).toFixed(3)}
              </span>
            </div>
            <div id="ld2">
              <span> COD : </span>
              <span className="liveDataValue">
                {parseFloat(liveData.cod).toFixed(3)}
              </span>
            </div>
            <div id="ld3">
              <span> BOD : </span>
              <span className="liveDataValue">
                {" "}
                {parseFloat(liveData.bod).toFixed(3)}
              </span>
            </div>
            <div id="ld4">
              <span> TDS : </span>
              <span className="liveDataValue">
                {" "}
                {parseFloat(liveData.tds).toFixed(3)}
              </span>
            </div>
            <div id="ld5">
              <span>Electro-Conductivity : </span>
              <span className="liveDataValue">
                {parseFloat(liveData.ec).toFixed(3)}
              </span>
            </div>
            <div id="ld6">
              <span>Temperature : </span>
              <span className="liveDataValue">{liveData.temp}</span>
            </div>
          </div>
        </div>
        <div id="g3" className="graph">
          <div className="chart">
            <canvas id="c2"></canvas>
          </div>
        </div>
        <div id="g4" className="graph">
          <canvas id="c3"></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
