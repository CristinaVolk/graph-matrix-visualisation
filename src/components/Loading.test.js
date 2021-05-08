import React from "react";
import { render } from "@testing-library/react";

import { Loading } from "./Loading";

describe("Loading component", () => {
  it("renders the Linear Loading Mui component", () => {
    const { queryAllByRole } = render(<Loading />);
    const progressBarList = queryAllByRole("progressbar");
    expect(progressBarList.length).toEqual(2);
    progressBarList.forEach((singleItem) =>
      expect(singleItem).toBeInstanceOf(HTMLDivElement),
    );
  });
});
