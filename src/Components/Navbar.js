import React from "react";

export default function Navbar(props) {
  return (
      <div className="container-fluid nav" data-theme={props.mode}>
        <p className="nav-title">WATER QUALITY MONITORING SYSTEM</p>
      </div>
  )
}