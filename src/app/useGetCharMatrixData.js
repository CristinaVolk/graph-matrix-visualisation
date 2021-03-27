import { useState, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { data } from "../utils/networkData";

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
        data: { frequency: singleLink.value, checked: true },
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
