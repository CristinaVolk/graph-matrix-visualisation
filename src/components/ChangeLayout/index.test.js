import { act } from "@testing-library/react-hooks";
import { render, screen, fireEvent } from "@testing-library/react";

import { ChangeLayout } from ".";
import * as hooks from "./hook";
import { layouts } from "../../utils/appData";

describe("ChangeLayout component", () => {
  const changeLayout = jest.fn();
  it("renders the list of buttons to change the layout", () => {
    const { getAllByRole, getByText } = render(
      <ChangeLayout changeLayout={changeLayout} />,
    );
    const buttonList = getAllByRole("button");
    const spanButtonElements = buttonList.map((button) =>
      button.querySelector("span"),
    );
    screen.debug();
    expect(getByText(/choose/i)).toBeInTheDocument();
    expect(buttonList.length).toBe(5);
    spanButtonElements.forEach((spanEl, index) => {
      expect(spanEl.textContent).toEqual(layouts[index]);
    });
  });

  it.only("renders the custom hook and fires click event on the button to run the layout", () => {
    const mockedRunLayout = jest.fn();
    hooks.useComponent = jest.fn().mockReturnValue({
      runLayout: mockedRunLayout,
    });
    const { getAllByRole } = render(
      <ChangeLayout changeLayout={changeLayout} />,
    );

    const buttonListElements = getAllByRole("button");

    act(() => {
      buttonListElements.forEach((buttonElement) => {
        fireEvent.click(buttonElement);
      });
    });
    expect(mockedRunLayout).toHaveBeenCalledTimes(5);
  });
});
