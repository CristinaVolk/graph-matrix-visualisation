import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { data } from "../utils/networkData";

export function useComponent() {
  const initialState = {
    networkData: [],
    isLoaded: false,
    error: null,
  };

  const [state, setState] = useState(initialState);
  const [chart, setChart] = useState(null);
  const [chartContent, setChartContent] = useState(data);

  const renderContent = useCallback((responseData) => {
    const chartContent = [];
    const { nodes, links } = responseData;

    const chartNodes = nodes.map((singleNode, index) => {
      return {
        type: "node",
        id: index,
        t: singleNode.name,
        c: chooseColor(singleNode.group),
        data: singleNode.group,
      };
    });

    const chartLinks = links.map((singleLink, index) => {
      return {
        type: "link",
        id: index,
        id1: singleLink.source,
        id2: singleLink.target,
        c: "rgb(0, 0, 26, 0.5)",
        t: singleLink.value,
        t1: singleLink.source,
        t2: singleLink.target,
        data: { frequency: singleLink.value },
        w: singleLink.value,
      };
    });

    return {
      ...chartContent,
      type: "LinkChart",
      items: chartNodes.concat(chartLinks),
    };
  }, []);

  const fetchData = useCallback(() => {
    axios
      .get(`https://bost.ocks.org/mike/miserables/miserables.json`)
      .then((response) => {
        setState({
          networkData: response.data,
          isLoaded: true,
          error: null,
        });
        console.log(renderContent(response.data));
        setChartContent(renderContent(response.data));
      })
      .catch((error) => {
        setState({
          networkData: null,
          isLoaded: true,
          error: `Some error has occurred during the loading data...`,
        });
        console.log(error);
      });
  }, [renderContent]);

  const loadedChart = useCallback((chart) => {
    console.log(chart);
    setChart(chart);
  }, []);

  const chooseColor = (group) => {
    const colors = [
      "rgb(26, 26, 255)", // blue
      "rgb(255, 102, 0)", // orange
      "rgb(0, 102, 0)", // green
      "rgb(204, 0, 0)", // red
      "rgb(204, 0, 204)", // purple
      "rgb(153, 51, 0)", //brown
      "rgb(255, 102, 153)", // light pink
      "rgb(138, 138, 92)", //grey
      "rgb(255, 255, 26)", //yellow
      "rgb(0, 204, 255)", //light blue
      "rgb(38, 38, 115)", //darkblue
    ];
    return colors.find((color, index) => index === group);
  };

  const clickHandler = useCallback(
    ({ id }) => {
      if (chart.getItem(id)) {
        const clickedItem = chart.getItem(id);

        console.log(clickedItem.data);

        const neighbours = chart.graph().neighbours(id).nodes;
        chart.foreground(
          (node) => node.id === id || neighbours.includes(node.id),
        );
      } else {
        chart.foreground(() => true);
      }
    },
    [chart],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { state, chartContent, loadedChart, clickHandler };
}
