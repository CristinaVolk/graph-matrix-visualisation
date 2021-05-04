import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../hooks/http.hook";
import { data } from "../utils/appData";

export function useGetCharMatrixData() {
  const [chartContent, setChartContent] = useState(data);
  const { loading, request, clearError } = useHttp();

  const chooseColor = (group) => {
    const colors = [
      "rgb(33, 60, 110)", // blue
      "rgb(243, 114, 44)", // orange
      "rgb(82, 183, 136)", // green
      "rgb(242, 64, 67)", // red
      "rgb(188, 138, 178)", // purple
      "rgb(36, 5, 9)", //brown
      "rgb(253, 155, 173)", // light pink
      "rgb(138, 138, 92)", //grey
      "rgb(251, 182, 55)", //yellow
      "rgb(62, 148, 224)", //light blue
      "rgb(1, 79, 134)", //darkblue
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
