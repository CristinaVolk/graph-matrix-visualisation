import { renderHook } from "@testing-library/react-hooks";

import { useComponent } from "./hook";

describe("App main component", () => {
  it("renders the useComponent hook in the initial state", () => {
    const { result } = renderHook(() => useComponent());
    const { current } = result;

    expect(current.chartRef.current).toBeNull();
    expect(current.chartContent.type).toBe("LinkChart");
    expect(current.chartContent.items.length).toBe(0);
    expect(current.loading).toBeTruthy();
    expect(current.open).toBeFalsy();
    expect(current.selectedItem).toBeNull();
    expect(current.doLayout).toBeInstanceOf(Function);
    expect(current.loadedChart).toBeInstanceOf(Function);
    expect(current.setChartContent).toBeInstanceOf(Function);
    expect(current.clickNodeHandler).toBeInstanceOf(Function);
    expect(current.handleClose).toBeInstanceOf(Function);
    expect(current.arrangeNodesFromGroup).toBeInstanceOf(Function);
  });
});
