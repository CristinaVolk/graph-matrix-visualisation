import { useState } from "react";
import { useComponent } from "./hook";
import { assending, descending } from "../utils/tools";

export function useFilterLinks() {
  const { chartContent, loading, setChartContent } = useComponent();
  const [disabledCheckbox, setDisabledCheckbox] = useState(false);

  const [checkboxState, setCheckboxState] = useState({
    low: true,
    middle: true,
    high: true,
  });

  const [checkMaxMinFrequency, setCheckMaxMinFrequency] = useState({
    max: false,
    min: false,
  });

  const filterFreqLinks = (options) => {
    return chartContent.items.map((item) =>
      item.type === "link" &&
      item.d.frequency >= options.from &&
      item.d.frequency < options.to
        ? {
            ...item,
            d: { ...item.d, checked: true },
          }
        : { ...item },
    );
  };

  const unfilterFreqLinks = (options) => {
    return chartContent.items.map((item) => {
      if (
        item.type === "link" &&
        item.d.frequency >= options.from &&
        item.d.frequency < options.to
      ) {
        return {
          ...item,
          d: { ...item.d, checked: false },
        };
      }
      return { ...item };
    });
  };

  const filterByFrequency = (event, options) => {
    let filteredFreqLinks = [];
    if (event.target.checked) {
      filteredFreqLinks = filterFreqLinks(options);
    } else {
      filteredFreqLinks = unfilterFreqLinks(options);
    }

    setChartContent((prevState) => {
      return { ...prevState, items: filteredFreqLinks };
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

  const findNodeIdsWithExtremeFrequency = (flag) => {
    const links = chartContent.items.filter(
      (item) => item.type === "link" && item.d.checked,
    );
    const sortedLinks = links.sort(flag === "max" ? descending : assending);

    const nodeIds = sortedLinks
      .filter((link) => link.d.frequency === sortedLinks[0].d.frequency)
      .map((filteredResult) => [filteredResult.id1, filteredResult.id2])
      .flat();

    return nodeIds;
  };

  const applyHalo = (nodeIdsWithExtremeFrequency, colour) => {
    if (chartContent) {
      return chartContent.items.map((item) => {
        if (
          item.type === "node" &&
          nodeIdsWithExtremeFrequency.includes(item.id)
        ) {
          return {
            ...item,
            ha0: {
              c: colour,
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

  const removeHalo = (nodeIds) => {
    return chartContent.items.map((item) => {
      if (item.type === "node" && nodeIds.includes(item.id)) {
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
    const colour = "rgb(255, 112, 112)";
    const nodeIdsWithMaxFrequency = findNodeIdsWithExtremeFrequency("max");
    if (event.target.checked) {
      updatedChartContent = applyHalo(nodeIdsWithMaxFrequency, colour);
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
    const colour = "rgb(112, 234, 255)";
    setCheckMaxMinFrequency({
      ...checkMaxMinFrequency,
      [event.target.name]: event.target.checked,
    });

    let updatedChartContent = {};
    const nodeIdsWithMinFrequency = findNodeIdsWithExtremeFrequency("min");
    if (event.target.checked) {
      updatedChartContent = applyHalo(nodeIdsWithMinFrequency, colour);
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

  const lowFrequentCheckBox = {
    title: "Low: less than 5",
    boxName: "low",
    checked: checkboxState.low,
    handleChange: checkFrequency,
    disabled: disabledCheckbox,
  };
  const middleFrequentCheckBox = {
    title: "Middle: between 5 & 9",
    boxName: "middle",
    checked: checkboxState.middle,
    handleChange: checkFrequency,
    disabled: disabledCheckbox,
  };

  const highFrequentCheckBox = {
    title: "High: more than 9",
    boxName: "high",
    checked: checkboxState.high,
    handleChange: checkFrequency,
    disabled: disabledCheckbox,
  };

  const maxFrequentSwitch = {
    title: "Show characters with MAX Frequency",
    boxName: "max",
    checked: checkMaxMinFrequency.max,
    handleChange: onChangeMaxFrequency,
    color: "primary",
  };

  const minFrequentSwitch = {
    title: "Show characters with MIN Frequency",
    boxName: "min",
    checked: checkMaxMinFrequency.min,
    handleChange: onChangeMinFrequency,
    color: "secondary",
  };

  return {
    chartContent,
    loading,
    checkboxState,
    lowFrequentCheckBox,
    middleFrequentCheckBox,
    highFrequentCheckBox,
    maxFrequentSwitch,
    minFrequentSwitch,
    setChartContent,
    setDisabledCheckbox,
  };
}
