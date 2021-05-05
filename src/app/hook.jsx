import { useRef, useState, useEffect, useCallback } from "react";

import { useGetCharMatrixData } from "./useGetCharMatrixData";

export function useComponent() {
  const chartRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    chartContent,
    loading,
    clearError,
    fetchCharMatrixData,
    setChartContent,
  } = useGetCharMatrixData();

  const handleClickOpen = () => setOpen(true);

  const clickNodeHandler = useCallback(({ id }) => {
    if (chartRef.current.component.getItem(id)) {
      const item = chartRef.current.component.getItem(id);
      item.x = chartRef.current.component.viewCoordinates(item.x, item.y).x;
      item.y = chartRef.current.component.viewCoordinates(item.x, item.y).y;
      setSelectedItem(item);
      handleClickOpen();
    }
  }, []);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedItem(value);
  };

  const nodeIdsToArrange = useCallback(
    (groupNo) => {
      return chartContent.items
        .filter(
          (item) => item.type === "node" && item.d.group === Number(groupNo),
        )
        .map((node) => node.id);
    },
    [chartContent.items],
  );

  useEffect(() => {
    fetchCharMatrixData();

    return () => clearError();
  }, [clearError, fetchCharMatrixData]);

  return {
    chartRef,
    chartContent,
    loading,
    open,
    selectedItem,
    setChartContent,
    clickNodeHandler,
    handleClose,
    nodeIdsToArrange,
  };
}
