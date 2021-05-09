import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";

import { InformationSnack } from ".";

describe("Information Box component", () => {
  it("opens the SnackContent message once the button is clicked", () => {
    const { getByRole, getByText, queryByRole } = render(<InformationSnack />);
    const snackButton = getByRole("button");
    const spanTextButton = getByText(/information/i);

    expect(snackButton).toBeInTheDocument();
    expect(queryByRole("alert")).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(spanTextButton);
    });

    expect(getByRole("alert")).toBeInTheDocument();
  });
});
