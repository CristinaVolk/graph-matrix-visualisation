import { useState, useEffect, useCallback } from "react";

import { useGetCharMatrixData } from "./useGetCharMatrixData";

export function useComponent() {
  const [chart, setChart] = useState(null);

  const {
    chartContent,
    loading,
    clearError,
    fetchCharMatrixData,
    setChartContent,
  } = useGetCharMatrixData();

  useEffect(() => {
    fetchCharMatrixData();

    return () => clearError();
  }, [clearError, fetchCharMatrixData]);

  const loadedChart = useCallback((chart) => {
    setChart(chart);
  }, []);

  const clickNodeHandler = useCallback(
    ({ id }) => {
      if (chart.getItem(id)) {
        const clickedItem = chart.getItem(id);

        console.log(clickedItem);

        const neighbours = chart.graph().neighbours(id).nodes;
        chart.foreground(
          (node) => node.id === id || neighbours.includes(node.id),
        );

        chart.foreground(() => true);
      }
    },
    [chart],
  );

  return {
    chartContent,
    loading,
    chart,
    loadedChart,
    clickNodeHandler,
    setChartContent,
  };
}
