import "keylines";
import React, { useEffect, useCallback } from "react";
import { Chart } from "../react-keylines";

import { useComponent } from "./hook";
import { Checkbox } from "../checkbox";
import styles from "./styles.module.css";
import { useFilterLinks } from "./useFilterLinks";

const App = () => {
  const { chart, loadedChart, clickHandler } = useComponent();

  const {
    loading,
    chartContent,
    lowFrequentCheckBox,
    middleFrequentCheckBox,
    highFrequentCheckBox,
  } = useFilterLinks();

  // const selectMaxLinkedNodes = chartContent.sort((a, b) => a - b);

  const linksToArrange =
    chartContent &&
    chartContent.items.filter(
      (item) => item.type === "link" && item.data.checked === true,
    );

  const sortedLinks = linksToArrange.sort(
    (a, b) => b.data.frequency - a.data.frequency,
  );

  // console.log(
  //   sortedLinks[1],
  //   chartContent.items.find((item) => item.type === "node" && item.id === 26),
  // );

  const doLayout = useCallback(() => {
    return (
      sortedLinks.length &&
      chart
        .layout("organic", {
          fit: true,
          animate: true,
          time: 600,
          tidy: true,
          spacing: "stretched",
          top: [sortedLinks[1].id1, sortedLinks[1].id2],
        })
        .then(() => {})
    );
  }, [chart, sortedLinks]);

  useEffect(() => {
    if (chart !== null) {
      chart.filter((item) => item.data.checked === true, { type: "link" });
      doLayout();
    }

    return () => {};
  }, [chart, chartContent, doLayout]);

  // chart
  //   .arrange("circle", idssToArrange, {
  //     fit: true,
  //     animate: true,
  //     time: 1000,
  //     position: "tidy",
  //     tightness: 5,
  //   })
  //   .then(() => {
  //     console.log("arr");
  //   });

  return (
    !loading && (
      <>
        <Chart
          data={!loading && chartContent}
          ready={loadedChart}
          containerClassName={styles.chartContainer}
          click={clickHandler}
        />
        <div className={styles.checkboxContainer}>
          <Checkbox checkbox={lowFrequentCheckBox} />
          <Checkbox checkbox={middleFrequentCheckBox} />
          <Checkbox checkbox={highFrequentCheckBox} />
        </div>
      </>
    )
  );
};

export default App;
