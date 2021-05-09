import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";

import { InformationSnack } from ".";
import * as hooks from "./hook";

describe("InfoSnack component", () => {
  it("opens the SnackContent message once the button is clicked", async () => {
    const mockedHandleClick = jest.fn();

    hooks.useComponent = jest.fn().mockReturnValue({
      state: { open: false },
      handleClick: mockedHandleClick,
    });
    const { getByRole, getByText, queryByRole } = render(<InformationSnack />);

    const snackButton = getByRole("button");
    const spanTextButton = getByText(/information/i);

    expect(snackButton).toBeInTheDocument();
    expect(queryByRole("alert")).not.toBeInTheDocument();

    hooks.useComponent = jest.fn().mockReturnValue({
      state: { open: true },
      handleClick: mockedHandleClick,
    });
    render(<InformationSnack />);

    act(() => {
      fireEvent.click(spanTextButton);
    });

    expect(mockedHandleClick).toHaveBeenCalled();
    expect(getByRole("alert")).toBeInTheDocument();
  });
});
