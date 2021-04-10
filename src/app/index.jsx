import "keylines";
import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "../react-keylines";

import { useComponent } from "./hook";
import { Checkbox } from "../checkbox";
import styles from "./styles.module.css";
import { useFilterLinks } from "./useFilterLinks";

const App = () => {
  const { chart, loadedChart, clickNodeHandler } = useComponent();

  const {
    loading,
    chartContent,
    lowFrequentCheckBox,
    middleFrequentCheckBox,
    highFrequentCheckBox,
    setChartContent,
  } = useFilterLinks();

  const [checkMaxMinFrequency, setCheckMaxMinFrequency] = useState({
    max: false,
    min: false,
  });

  const doLayout = useCallback(() => {
    return chart
      .layout("organic", {
        consistent: true,
        packing: "adaptive",
        animate: true,
        time: 900,
        tidy: true,
        spacing: "stretched",
        tightness: 2,
      })
      .then(() => {});
  }, [chart]);

  const findNodeIdsWithMaxFrequency = () => {
    const links = chartContent.items.filter(
      (item) => item.type === "link" && item.d.checked,
    );
    const sortedLinks = links.sort(
      (current, next) => next.d.frequency - current.d.frequency,
    );

    const nodeIds = sortedLinks
      .filter((link) => link.d.frequency === sortedLinks[0].d.frequency)
      .map((filteredResult) => [filteredResult.id1, filteredResult.id2])
      .flat();

    return nodeIds;
  };

  const findNodeIdsWithMinFrequency = () => {
    const links = chartContent.items.filter(
      (item) => item.type === "link" && item.d.checked,
    );
    const sortedLinks = links.sort(
      (current, next) => current.d.frequency - next.d.frequency,
    );

    const nodeIds = sortedLinks
      .filter((link) => link.d.frequency === sortedLinks[0].d.frequency)
      .map((filteredResult) => [filteredResult.id1, filteredResult.id2])
      .flat();

    console.log(
      links.sort((current, next) => current.d.frequency - next.d.frequency),
    );

    return nodeIds;
  };

  const applyHalo = (nodeIdsWithMaxFrequency) => {
    if (chartContent) {
      return chartContent.items.map((item) => {
        if (item.type === "node" && nodeIdsWithMaxFrequency.includes(item.id)) {
          console.log(item);
          return {
            ...item,
            ha0: {
              c: "rgb(112, 234, 255)",
              r: 50,
              w: 30,
            },
          };
        } else {
          return { ...item };
        }
      });
    }
  };

  const removeHalo = () => {
    return chartContent.items.map((item) => {
      if (item.type === "node") {
        delete item.ha0;
        return item;
      }
      return item;
    });
  };

  const onChangeMaxFrequency = (event) => {
    setCheckMaxMinFrequency({
      ...checkMaxMinFrequency,
      [event.target.name]: event.target.checked,
    });

    let updatedChartContent = {};
    const nodeIdsWithMaxFrequency = findNodeIdsWithMaxFrequency();
    if (event.target.checked) {
      updatedChartContent = applyHalo(nodeIdsWithMaxFrequency);
    } else {
      updatedChartContent = removeHalo(nodeIdsWithMaxFrequency);
    }

    setChartContent((prevState) => {
      return {
        ...prevState,
        items: updatedChartContent,
      };
    });
  };

  const onChangeMinFrequency = (event) => {
    setCheckMaxMinFrequency({
      ...checkMaxMinFrequency,
      [event.target.name]: event.target.checked,
    });

    let updatedChartContent = {};
    const nodeIdsWithMinFrequency = findNodeIdsWithMinFrequency();
    if (event.target.checked) {
      updatedChartContent = applyHalo(nodeIdsWithMinFrequency);
    } else {
      updatedChartContent = removeHalo(nodeIdsWithMinFrequency);
    }

    setChartContent((prevState) => {
      return {
        ...prevState,
        items: updatedChartContent,
      };
    });
  };

  const maxFrequentCheckBox = {
    title: "Show maX Frequency",
    boxName: "max",
    checked: checkMaxMinFrequency.max,
    handleChange: onChangeMaxFrequency,
  };

  const minFrequentCheckBox = {
    title: "Show miN Frequency",
    boxName: "min",
    checked: checkMaxMinFrequency.min,
    handleChange: onChangeMinFrequency,
  };

  useEffect(() => {
    if (chart !== null) {
      chart.filter((item) => item.d.checked === true, { type: "link" });

      doLayout();
    }

    return () => {};
  }, [chart, chartContent, doLayout]);

  return (
    !loading && (
      <>
        <Chart
          data={!loading && chartContent}
          ready={loadedChart}
          containerClassName={styles.chartContainer}
          click={clickNodeHandler}
        />
        <div className={styles.checkboxContainer}>
          <Checkbox checkbox={lowFrequentCheckBox} />
          <Checkbox checkbox={middleFrequentCheckBox} />
          <Checkbox checkbox={highFrequentCheckBox} />

          <Checkbox checkbox={maxFrequentCheckBox} />
          <Checkbox checkbox={minFrequentCheckBox} />
        </div>
      </>
    )
  );
};

export default App;
