export function useComponent() {
  const shapeSelectedItem = (item) =>
    item.type === "node" ? shapeNode(item) : shapeLink(item);

  const shapeLink = (link) => {
    return {
      Type: link.type,
      ID: link.id,
      Node_Source_Id: link.id1,
      Node_Target_Id: link.id2,
      First_Character: link.d.sourceNode,
      Second_Character: link.d.targetNode,
      Occurrence_in_the_chapter: link.d.frequency,
      Width_of_the_link: link.w,
    };
  };

  const shapeNode = (node) => {
    return {
      Type: node.type,
      ID: node.id,
      Character: node.t,
      Colour: node.c,
      Chapter_No: node.d.group,
      X_Coord: Math.floor(node.x),
      Y_Coord: Math.floor(node.y),
    };
  };

  return { shapeSelectedItem };
}
