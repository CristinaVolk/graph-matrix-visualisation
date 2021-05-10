import React from "react";
import { render } from "@testing-library/react";

import { Loading } from "./Loading";

describe("Loading component", () => {
  it("renders 2 Linear Loading Mui components", () => {
    const { getAllByRole } = render(<Loading />);
    const progressBarList = getAllByRole("progressbar");
    const classNamesList = [
      "MuiLinearProgress-colorPrimary",
      "MuiLinearProgress-colorSecondary",
    ];

    expect(progressBarList.length).toEqual(2);
    progressBarList.forEach((singleItem, index) => {
      expect(singleItem).toBeInstanceOf(HTMLDivElement);
      expect(
        singleItem.className.split(" ").includes(classNamesList[index]),
      ).toBeTruthy();
    });
  });
});
