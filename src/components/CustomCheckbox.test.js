import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import { useFilterLinks } from "./../app/useFilterLinks";
import { CustomCheckbox } from "./CustomCheckbox";

const component = (checkbox) => <CustomCheckbox checkbox={checkbox} />;

describe("CustomCheckbox component", () => {
  const { result } = renderHook(() => useFilterLinks());
  const { frequencyCheckboxList } = result.current;

  it("renders the custom hook and CustomCheckbox component with the low frequent checkbox", () => {
    const { getByRole } = render(component(frequencyCheckboxList[0]));
    const lowFrequentCheckbox = getByRole("checkbox");
    expect(lowFrequentCheckbox).toHaveProperty("name", "low");
    expect(lowFrequentCheckbox).toHaveProperty("checked", true);

    act(() => {
      fireEvent.change(lowFrequentCheckbox, { target: { checked: false } });
    });

    expect(lowFrequentCheckbox).toHaveProperty("checked", false);
  });

  it("renders the custom hook and CustomCheckbox component with the middle frequent checkbox", () => {
    const { getByRole } = render(component(frequencyCheckboxList[1]));
    const lowFrequentCheckbox = getByRole("checkbox");
    expect(lowFrequentCheckbox).toHaveProperty("name", "middle");
    expect(lowFrequentCheckbox).toHaveProperty("checked", true);

    act(() => {
      fireEvent.change(lowFrequentCheckbox, { target: { checked: false } });
    });

    expect(lowFrequentCheckbox).toHaveProperty("checked", false);
  });

  it("renders the custom hook and CustomCheckbox component with the high frequent checkbox", () => {
    const { getByRole } = render(component(frequencyCheckboxList[2]));
    const lowFrequentCheckbox = getByRole("checkbox");
    expect(lowFrequentCheckbox).toHaveProperty("name", "high");
    expect(lowFrequentCheckbox).toHaveProperty("checked", true);

    act(() => {
      fireEvent.change(lowFrequentCheckbox, { target: { checked: false } });
    });

    expect(lowFrequentCheckbox).toHaveProperty("checked", false);
  });
});
