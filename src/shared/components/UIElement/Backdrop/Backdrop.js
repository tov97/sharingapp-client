import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";
//added backdrop-hook to the index.html file.
const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
