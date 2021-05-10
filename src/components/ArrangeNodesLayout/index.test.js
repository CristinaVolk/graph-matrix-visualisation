import { act } from "@testing-library/react-hooks";
import { render, fireEvent } from "@testing-library/react";

import { ArrangeNodesLayout, chapters } from ".";
import * as hooks from "./hook";

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

  it.only("renders the custom hook and fires click event on the button to arrange nodes", () => {
    const mockedArrangeNodes = jest.fn();
    hooks.useComponent = jest.fn().mockReturnValue({
      arrangeNodes: mockedArrangeNodes,
    });
    const { getAllByRole } = render(
      <ArrangeNodesLayout arrangeNodesFromGroup={arrangeNodesFromGroup} />,
    );

    const buttonListElements = getAllByRole("button");

    act(() => {
      buttonListElements.forEach((buttonElement) => {
        fireEvent.click(buttonElement);
      });
    });
    expect(mockedArrangeNodes).toHaveBeenCalledTimes(9);
  });
});
