import { useRef, useState, useEffect, useCallback } from "react";

import { useGetCharMatrixData } from "./useGetCharMatrixData";
import { /*debounce,*/ validateLayoutName } from "../utils/tools";
import { zoomOptions, arrangeOptions } from "../utils/appData";

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

  const doLayout = useCallback(
    async (layoutName) => {
      await chartRef.current.component.layout(
        validateLayoutName(layoutName) ? layoutName : "organic",
        {
          consistent: true,
          packing: "adaptive",
          animate: true,
          time: 1000,
          tidy: true,
          spacing: "stretched",
          tightness: 1,
        },
      );
      await chartRef.current.component.zoom("fit", zoomOptions);
    },
    [chartRef],
  );

  const loadedChart = () => chartRef.current && doLayout("organic");

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

  const arrangeNodesFromGroup = (groupNumber) => {
    chartRef.current &&
      chartRef.current.component.arrange(
        "circle",
        nodeIdsToArrange(groupNumber),
        arrangeOptions,
        chartRef.current.component.zoom("fit", zoomOptions),
      );
  };

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
    doLayout,
    loadedChart,
    setChartContent,
    clickNodeHandler,
    handleClose,
    arrangeNodesFromGroup,
  };
}
