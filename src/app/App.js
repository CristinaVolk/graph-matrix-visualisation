import "keylines";
import React from "react";
import { Chart } from "../react-keylines";

import { useComponent } from "./hook";
import "./App.css";

const App = () => {
  const { chartContent, loadedChart, clickHandler, state } = useComponent();
  console.log(state);

  return (
    state.isLoaded && (
      <Chart
        data={chartContent}
        ready={loadedChart}
        containerClassName='chart-container'
        click={clickHandler}
      />
    )
  );
};

export default App;
