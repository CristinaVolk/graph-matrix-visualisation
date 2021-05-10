import React from "react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { InformationBox } from ".";
import { useComponent } from "./../../app/hook";

const component = (open, selectedItem, onClose) => (
  <InformationBox open={open} selectedItem={selectedItem} onClose={onClose} />
);
const mockedNode = {
  type: "node",
  id: 1,
  c: "",
  t: "Joly",
  d: {
    group: 0,
    title: `Joly`,
  },
  e: 6,
  ff: "Roboto, Helvetica, Arial, sans-serif",
  fs: 10,
  x: 100,
  y: 100,
};

const mockedLink = {
  type: "link",
  id: `link-1`,
  id1: 1,
  id2: 2,
  c: "rgb(0, 0, 26, 0.5)",
  t: 31,
  d: {
    frequency: 31,
    checked: true,
    sourceNode: "Joly",
    targetNode: "Cosette",
  },
  w: 31,
};

describe("Information Box component", () => {
  const hookResult = renderHook(() => useComponent());
  const { selectedItem, handleClose } = hookResult.result.current;
  const shapeSelectedItem = jest.fn();

  it.only("renders the component in the closed state", () => {
    const { queryByRole } = render(component(false, selectedItem, handleClose));
    const dialog = queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it.only("renders the component with in the open state", () => {
    const { queryByRole } = render(component(true, selectedItem, handleClose));
    const dialog = queryByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  it.only("renders the link as the selectedItem", () => {
    const { getByText } = render(component(true, mockedLink, handleClose));

    shapeSelectedItem.mockReturnValueOnce({
      Type: mockedLink.type,
      ID: mockedLink.id,
      "Node Source Id": mockedLink.id1,
      "Node Target Id": mockedLink.id2,
      "First Character": mockedLink.d.targetNode,
      "Second Character": mockedLink.d.targetNode,
      "Occurrence in the chapter": mockedLink.d.frequency,
      "Width of the link": mockedLink.w,
    });

    const link = shapeSelectedItem();
    const linkRegExp = new RegExp(link.ID, "i");
    const idCellSpanEl = getByText(linkRegExp);

    expect(idCellSpanEl).toBeInstanceOf(HTMLSpanElement);
  });

  it.only("renders the node as the selectedItem", () => {
    const { getByText } = render(component(true, mockedNode, handleClose));

    shapeSelectedItem.mockReturnValueOnce({
      Type: mockedNode.type,
      ID: mockedNode.id,
      Character: mockedNode.t,
      Colour: mockedNode.c,
      "Chapter No": mockedNode.d.group,
      "X Coord": Math.floor(mockedNode.x),
      "Y Coord": Math.floor(mockedNode.y),
    });

    const node = shapeSelectedItem();
    const nodeRegExp = new RegExp(node.Type, "i");
    const typeCellSpanEl = getByText(nodeRegExp);

    expect(typeCellSpanEl).toBeInstanceOf(HTMLSpanElement);
  });
});
