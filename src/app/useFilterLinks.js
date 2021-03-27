import { useState } from "react";
import { useComponent } from "./hook";

export function useFilterLinks() {
  const { chartContent, loading, setChartContent } = useComponent();

  const [checkboxState, setCheckboxState] = useState({
    low: true,
    middle: true,
    high: true,
  });

  const filterFreqLinks = (options) => {
    return chartContent.items.map((item) => {
      if (
        item.type === "link" &&
        item.data.frequency >= options.from &&
        item.data.frequency < options.to
      ) {
        return { ...item, data: { ...item.data, checked: true } };
      }
      return { ...item };
    });
  };

  const unfilterFreqLinks = (options) => {
    return chartContent.items.map((item) => {
      if (
        item.type === "link" &&
        item.data.frequency >= options.from &&
        item.data.frequency < options.to
      ) {
        return { ...item, data: { ...item.data, checked: false } };
      }
      return { ...item };
    });
  };

  const filterByFrequency = (event, options) => {
    let filteredLowFreqLinks = [];
    if (event.target.checked) {
      filteredLowFreqLinks = filterFreqLinks(options);
    } else {
      filteredLowFreqLinks = unfilterFreqLinks(options);
    }

    setChartContent((prevState) => {
      return { ...prevState, items: filteredLowFreqLinks };
    });
  };

  const checkFrequency = (event) => {
    const options = { from: 0, to: 0 };
    if (event.target.name === "low") {
      options.to = 5;
    }
    if (event.target.name === "middle") {
      options.from = 5;
      options.to = 9;
    }
    if (event.target.name === "high") {
      options.from = 9;
      options.to = 100;
    }

    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });

    filterByFrequency(event, options);
  };

  const lowFrequentCheckBox = {
    title: "Low: less than 5",
    boxName: "low",
    checked: checkboxState.low,
    handleChange: checkFrequency,
  };

  const middleFrequentCheckBox = {
    title: "Middle: between 5 & 9",
    boxName: "middle",
    checked: checkboxState.middle,
    handleChange: checkFrequency,
  };

  const highFrequentCheckBox = {
    title: "High: between 9 & 15",
    boxName: "high",
    checked: checkboxState.high,
    handleChange: checkFrequency,
  };

  return {
    chartContent,
    loading,
    lowFrequentCheckBox,
    middleFrequentCheckBox,
    highFrequentCheckBox,
  };
}
