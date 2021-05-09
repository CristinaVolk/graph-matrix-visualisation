import { renderHook, act } from "@testing-library/react-hooks";
import { render, fireEvent, screen } from "@testing-library/react";

import { ArrangeNodesLayout } from ".";
import { useComponent } from "./hook";

describe("ArrangeNodesLayout component", () => {
  const arrangeNodesFromGroup = jest.fn();

  it("renders the list of buttons to change the layout", () => {
    const { queryAllByRole } = render(
      <ArrangeNodesLayout arrangeNodesFromGroup={arrangeNodesFromGroup} />,
    );
    expect(queryAllByRole("button").length).toBe(0);

    const { result, rerender } = renderHook(() =>
      useComponent(arrangeNodesFromGroup),
    );
    screen.debug();

    act(() => {
      screen.debug();
    });
  });
});
