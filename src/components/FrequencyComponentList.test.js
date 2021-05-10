import React from "react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { FrequencyComponentList } from "./FrequencyComponentList";
import { useFilterLinks } from "./../app/useFilterLinks";

const component = (checkboxList, switcherList) => (
  <FrequencyComponentList
    checkboxList={checkboxList}
    switcherList={switcherList}
  />
);

describe("FrequencyComponentList component", () => {
  const { result } = renderHook(() => useFilterLinks());
  const { frequencyCheckboxList, extremeSwitcherList } = result.current;

  it("renders the title and list of checkboxes and switchers", () => {
    const { getByText, getAllByRole, getAllByLabelText } = render(
      component(frequencyCheckboxList, extremeSwitcherList),
    );
    const checkboxList = getAllByRole("checkbox");
    const switchList = getAllByLabelText("primary checkbox");

    expect(getByText(/hugo/i)).toBeInTheDocument();
    expect(getByText(/low/i)).toBeInTheDocument();
    expect(getByText(/middle/i)).toBeInTheDocument();
    expect(getByText(/high/i)).toBeInTheDocument();
    expect(checkboxList.length).toEqual(5);
    expect(switchList.length).toEqual(2);
  });
});
