import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import { useFilterLinks } from "./../app/useFilterLinks";
import { CustomSwitch } from "./CustomSwitch";

const component = (toogler) => <CustomSwitch toogler={toogler} />;

describe("CustomSwitch component", () => {
  const { result } = renderHook(() => useFilterLinks());
  const { extremeSwitcherList } = result.current;

  it("renders the custom hook and CustomSwitch component with the maximum toogler", () => {
    const { getByLabelText } = render(
      component(extremeSwitcherList.maxFrequentSwitch),
    );
    const maxCheckBox = getByLabelText("primary checkbox");
    expect(maxCheckBox).toHaveProperty("name", "max");
    expect(maxCheckBox).toHaveProperty("checked", false);

    act(() => {
      fireEvent.change(maxCheckBox, { target: { checked: true } });
    });

    expect(maxCheckBox).toHaveProperty("checked", true);
  });

  it("renders the hook and the CustomSwitch component with the minimum toogler", () => {
    const { getByLabelText } = render(
      component(extremeSwitcherList.minFrequentSwitch),
    );

    const minCheckBox = getByLabelText("primary checkbox");
    expect(minCheckBox).toHaveProperty("name", "min");
    expect(minCheckBox).toHaveProperty("checked", false);

    act(() => {
      fireEvent.change(minCheckBox, { target: { checked: true } });
    });

    expect(minCheckBox).toHaveProperty("checked", true);
  });
});
