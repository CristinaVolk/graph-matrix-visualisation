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

  return {
    chartContent,
    loading,
    chart,
    loadedChart,
    setChartContent,
  };
}
