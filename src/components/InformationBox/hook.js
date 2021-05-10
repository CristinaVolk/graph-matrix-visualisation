export function useComponent() {
  const shapeSelectedItem = (item) =>
    item.type === "node" ? shapeNode(item) : shapeLink(item);

  const shapeLink = (link) => {
    return {
      Type: link.type,
      ID: link.id,
      "Node Source Id": link.id1,
      "Node Target Id": link.id2,
      "First Character": link.d.sourceNode,
      "Second Character": link.d.targetNode,
      "Occurrence in the chapter": link.d.frequency,
      "Width of the link": link.w,
    };
  };

  const shapeNode = (node) => {
    return {
      Type: node.type,
      ID: node.id,
      Character: node.t,
      Colour: node.c,
      "Chapter No": node.d.group,
      "X Coord": Math.floor(node.x),
      "Y Coord": Math.floor(node.y),
    };
  };

  return { shapeSelectedItem };
}
