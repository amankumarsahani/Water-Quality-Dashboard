import "./App.css";
import Darkbtn from "./Components/Darkbtn";
import Navbar from "./Components/Navbar";
import Location from "./Components/Location";
import React from "react";
import useLocalStorage from "use-local-storage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationData from "./Components/LocationDataGraph/LocationDataGraph";

function App() {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const toggalTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className="app" data-theme={theme}>
      <Router>
        <Navbar mode={theme} />
        <Routes>
          <Route exact path="/" element={<Location mode={theme} />}></Route>
          <Route
            exact
            path="/amritsar"
            element={<LocationData mode={theme} device={"Amritsar - WQ101"} />}
          ></Route>
          <Route
            exact
            path="/rupnagar"
            element={<LocationData mode={theme} device={"Rupnagar - WQ102"} />}
          ></Route>
          <Route
            exact
            path="/ludhiana"
            element={<LocationData mode={theme} device={"Ludhiana - WQ103"} />}
          ></Route>
          <Route
            exact
            path="/patiala"
            element={<LocationData mode={theme} device={"Patiala - WQ104"} />}
          ></Route>
          <Route
            exact
            path="/mohali"
            element={<LocationData mode={theme} device={"Mohali - WQ105"} />}
          ></Route>
          <Route
            exact
            path="/jalandhar"
            element={<LocationData mode={theme} device={"Jalandhar - WQ106"} />}
          ></Route>
        </Routes>
        <Darkbtn theme={toggalTheme} mode={theme} switchTheme={toggalTheme} />
      </Router>
    </div>
  );
}

export default App;
