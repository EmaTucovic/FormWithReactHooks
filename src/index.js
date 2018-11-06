import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import schema from "./schema";
import useForm from "./form";

function App() {
  const form = useForm(schema);
  const [isVisible, setIsVisible] = useState(true);
  // console.log(form);
  return (
    <Fragment>
      <div className="App">{form.name.render({ isVisible })}</div>
      <div className="App">{form.lastName.render()}</div>
      <button
        style={{ marginRight: "5px" }}
        onClick={() => {
          setIsVisible(false);
        }}
      >
        hide name
      </button>
      <button
        onClick={() => {
          setIsVisible(true);
        }}
      >
        show name
      </button>
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
