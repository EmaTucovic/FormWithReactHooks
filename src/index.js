import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import schema from "./schema";
import useInput from "./form";

function App() {
  const form = useInput(schema);
  console.log(form);
  return (
    <Fragment>
      <div className="App">{form.name.render()}</div>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
