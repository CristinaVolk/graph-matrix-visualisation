import { useState, useEffect, useCallback } from "react";

import { useGetCharMatrixData } from "./useGetCharMatrixData";

export function useComponent() {
  const [chart, setChart] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    chartContent,
    loading,
    clearError,
    fetchCharMatrixData,
    setChartContent,
  } = useGetCharMatrixData();

  const loadedChart = useCallback((chart) => {
    setChart(chart);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const clickNodeHandler = useCallback(
    ({ id }) => {
      if (chart.getItem(id)) {
        setSelectedItem(chart.getItem(id));
        handleClickOpen();
      }
    },
    [chart],
  );

  const handleClose = (value) => {
    setOpen(false);
    setSelectedItem(value);
  };

  useEffect(() => {
    fetchCharMatrixData();

    return () => clearError();
  }, [clearError, fetchCharMatrixData]);

  return {
    chartContent,
    loading,
    chart,
    open,
    selectedItem,
    loadedChart,
    setChartContent,
    clickNodeHandler,
    handleClose,
  };
}
