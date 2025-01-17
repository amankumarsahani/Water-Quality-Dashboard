/* eslint-disable react-hooks/exhaustive-deps */
import "./LocationDataStyle.css";
import Refresh from "./refresh.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeChart, makeWaterData } from "./utils.js";
import ReactLoading from "react-loading";

function LocationData(props) {
  const url =
    "https://gcyiihdmt6.execute-api.us-west-2.amazonaws.com/default/GetWaterQuality";
  const [lastEndTime, setLastEndTime] = useState();
  const [waterData, setWaterData] = useState(null);
  const [chart1, setChart1] = useState(null);
  const [chart2, setChart2] = useState(null);
  const [chart3, setChart3] = useState(null);
  const [liveData, setLiveData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [type, setType] = useState(1);
  // const [limit, setLimit] = useState(30);
  const [vw, setVw] = useState();
  const [index, setIndex] = useState(1);

  const destroyCharts = (i) => {
    if (i === 1) chart1 && chart1.destroy();
    else if (i === 2) chart2 && chart2.destroy();
    else if (i === 3) chart3 && chart3.destroy();
    setVw((0.8 * Math.min(window.innerWidth, window.screen.width)) / 100);
    setIndex(window.screen.width > 700);
  };

  const handleChartType = () => {
    setType(!type);
  };

  // const handleLimitChange = (e) => {
  //   setLimit(e.target.value);
  // };

  useEffect(() => {
    axios.get(url).then((response) => {
      const newData = makeWaterData(response.data.water, "time_stamp");
      if (
        lastEndTime &&
        lastEndTime === newData.dataLabels[newData.dataLabels.length - 1]
      ) {
        return null;
      }
      setWaterData(newData);
      setLastEndTime(newData.dataLabels[response.data.water.length - 1]);
    });
  }, [refresh]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefresh(!refresh);
    }, 59 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [refresh]);

  useEffect(() => {
    const last_index = waterData && waterData.dataLabels.length - 1;
    waterData &&
      setLiveData({
        dataLabels: waterData.dataLabels[last_index],
        tds: waterData.tds[last_index],
        cod: waterData.cod[last_index],
        bod: waterData.bod[last_index],
        ph: waterData.ph[last_index],
        temp: waterData.temp[last_index],
        ec: waterData.ec[last_index],
        dio: waterData.dio[last_index],
      });
  }, [waterData]);

  useEffect(() => {
    destroyCharts(1);
    let chartType = ["bar", "bar", "bar", "bar"];
    if (type) chartType = ["line", "line", "line", "line"];
    waterData &&
      setChart1(
        makeChart(
          "c1",
          "DO, COD, BOD and pH",
          waterData.dataLabels,
          index
            ? [
                "DO mg/L         ",
                "COD mg/L          ",
                "BOD mg/L          ",
                "pH          ",
              ]
            : ["DO mg/L", "COD mg/L", "BOD mg/L", "pH"],

          ["", "", "", "1"],
          [waterData.dio, waterData.cod, waterData.bod, waterData.ph],
          chartType,
          ["#ff5e00", "#ff006f", "#0062ff", "#17fc54"],
          vw,
          index ? "x" : "y"
        )
      );
  }, [waterData, type]);

  useEffect(() => {
    destroyCharts(2);
    let chartType = ["bar", "bar"];
    if (type) chartType = ["line", "line"];
    waterData &&
      setChart2(
        makeChart(
          "c2",
          "Electrical conductivity and TDS",
          waterData.dataLabels,
          index
            ? ["Electrical conductivity mS/cm          ", "TDS ppm          "]
            : ["Electrical conductivity mS/cm", "TDS ppm"],
          ["", "1"],
          [waterData.ec, waterData.tds],
          chartType,
          ["#17fc54", "#595bd9"],
          vw,
          index ? "x" : "y"
        )
      );
  }, [waterData, type]);

  useEffect(() => {
    destroyCharts(3);
    let chartType = ["bar"];
    if (type) chartType = ["line"];
    waterData &&
      setChart3(
        makeChart(
          "c3",
          "Temperature",
          waterData.dataLabels,
          index ? ["Temperature ºC          "] : ["Temperature ºC"],
          [""],
          [waterData.temp],
          chartType,
          ["#ff5e00"],
          vw,
          index ? "x" : "y"
        )
      );
  }, [waterData, type]);

  return (
  
    <div className="main dark " data-theme={props.mode}>
      {/* <header className="App-header">
        WATER &nbsp; QUALITY &nbsp; MONITORING &nbsp; SYSTEM
      </header> */}
      <div className="graphHolder">
        <div id="g1" className="graph">
          {!waterData ? (
            <div id="loading" >
              <ReactLoading type={"bars"} color={"#2980b9"}></ReactLoading>
            </div>
          ) : (
            <>
            
              <div id="liveTitle">               
                <span className="liveTitleText">LIVE DATA</span>
                <span className="options">
                  <img
                    id="refresh"
                    src={Refresh}
                    alt="refresh icon"
                    onClick={() => {
                      setRefresh(!refresh);
                    }}
                  ></img>
                  <button className="chartTypeButton" onClick={handleChartType}>
                    {type ? "BAR" : "LINE"}
                  </button>
                </span>
              </div>
              <div className="liveDataHolder">
                <div id="ld0" className="liv">
                  <span>Time :</span>{" "}
                  <span className="liveDataValue">
                    {liveData && liveData.dataLabels}
                  </span>
                </div>
                <div id="ld2" className="liv">
                  <span>Device : </span>
                  <span className="liveDataValue">
                    {props.device}
                  </span>
                </div>
                <div id="ld1" className="liv">
                  <span>Temperature : </span>
                  <span className="liveDataValue">
                    {liveData && liveData.temp} ºC
                  </span>
                  <span> pH : </span>
                  <span className="liveDataValue">
                    {liveData && parseFloat(liveData.ph).toFixed(3)}
                  </span>
                </div>
                <div id="ld3" className="liv">
                  <span> TDS : </span>
                  <span className="liveDataValue">
                    {liveData && parseFloat(liveData.tds).toFixed(2)} ppm
                  </span>
                </div>
                <div id="ld4" className="liv">
                  <span> BOD : </span>
                  <span className="liveDataValue">
                    {liveData && parseFloat(liveData.bod).toFixed(2)} mg/L
                  </span>
                </div>
                <div id="ld5" className="liv">
                  <span> COD : </span>
                  <span className="liveDataValue">
                    {liveData && parseFloat(liveData.cod).toFixed(2)} mg/L
                  </span>
                </div>
                <div id="ld6" className="liv">
                  <span>DO : </span>
                  <span className="liveDataValue">
                    {liveData && parseFloat(liveData.dio).toFixed(2)} mg/L
                  </span>
                </div>
                <div id="ld7" className="liv">
                  <span>Electrical Conductivity : </span>
                  <span className="liveDataValue">
                    {liveData && parseFloat(liveData.ec).toFixed(3)} mS/cm
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div id="g2" className="graph">
          <div className="chart">
            <canvas id="c1"></canvas>
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

export default LocationData;
