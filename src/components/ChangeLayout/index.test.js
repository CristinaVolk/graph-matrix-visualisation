import { renderHook, act } from "@testing-library/react-hooks";
import { render, screen, fireEvent } from "@testing-library/react";

import { ChangeLayout } from ".";
import { useComponent } from "./hook";
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

  it("renders the custom hook", () => {
    const { result } = renderHook(() => useComponent(changeLayout));
    const { getAllByRole, getByText } = render(
      <ChangeLayout changeLayout={changeLayout} />,
    );

    act(() => {
      fireEvent.click(getByText(layouts[0]));
    });

    expect(result.current.runLayout).toHaveBeenCalled();

    expect(result.current.runLayout).toBeInstanceOf(Function);
  });
});
