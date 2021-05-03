import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../hooks/http.hook";
import { data } from "../utils/appData";

export function useGetCharMatrixData() {
  const [chartContent, setChartContent] = useState(data);
  const { loading, request, clearError } = useHttp();

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
    return colors.find((_color, index) => index === group);
  };

  const renderContent = useCallback((charMatrixData) => {
    const { nodes, links } = charMatrixData;
    const chartNodes = nodes.map((singleNode, index) => {
      return {
        type: "node",
        id: index,
        c: chooseColor(singleNode.group),
        t: `${singleNode.name}`,
        d: {
          group: singleNode.group,
          title: `${singleNode.name}`,
        },
      };
    });

    const chartLinks = links.map((singleLink) => {
      return {
        type: "link",
        id: `link-${uuidv4()}`,
        id1: singleLink.source,
        id2: singleLink.target,
        c: "rgb(0, 0, 26, 0.5)",
        t: singleLink.value,
        d: {
          frequency: singleLink.value,
          checked: true,
          sourceNode: chartNodes.find((node) => node.id === singleLink.source).d
            .title,
          targetNode: chartNodes.find((node) => node.id === singleLink.target).d
            .title,
        },
        w: singleLink.value,
      };
    });

    return chartNodes.concat(chartLinks);
  }, []);

  const fetchCharMatrixData = useCallback(async () => {
    const fetched = await request(
      "https://bost.ocks.org/mike/miserables/miserables.json",
    );

    setChartContent((prevState) => {
      return { ...prevState, items: renderContent(fetched) };
    });
  }, [renderContent, request]);

  return {
    chartContent,
    loading,
    setChartContent,
    clearError,
    fetchCharMatrixData,
  };
}
