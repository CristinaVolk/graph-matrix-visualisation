import { renderHook } from "@testing-library/react-hooks";
import { render } from "@testing-library/react";

import { ArrangeNodesLayout, chapters } from ".";
import { useComponent } from "./hook";

describe("ArrangeNodesLayout component", () => {
  const arrangeNodesFromGroup = jest.fn();

  it("renders the list of buttons to change the layout", () => {
    const { getAllByRole, getByText } = render(
      <ArrangeNodesLayout arrangeNodesFromGroup={arrangeNodesFromGroup} />,
    );
    const buttonList = getAllByRole("button");
    const spanButtonElements = buttonList.map((button) =>
      button.querySelector("span"),
    );

    expect(getByText(/arrange/i)).toBeInTheDocument();
    expect(buttonList.length).toBe(9);
    spanButtonElements.forEach((spanEl, index) => {
      expect(spanEl.textContent).toEqual(String(chapters[index]));
    });
  });

  it("renders the custom hook", () => {
    const { result } = renderHook(() => useComponent(arrangeNodesFromGroup));
    expect(result.current.arrangeNodes).toBeInstanceOf(Function);
  });
});
