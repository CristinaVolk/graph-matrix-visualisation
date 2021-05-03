export function useComponent() {
  const shapeSelectedItem = (item) =>
    item.type === "node" ? shapeNode(item) : shapeLink(item);

  const shapeLink = (link) => {
    return {
      Type: link.type,
      ID: link.id,
      Node_Source_Id: link.id1,
      Node_Target_Id: link.id2,
      Node_Source_Name: link.d.sourceNode,
      Node_Target_Name: link.d.targetNode,
      Frequency: link.d.frequency,
      Width: link.w,
    };
  };

  const shapeNode = (node) => {
    return {
      Type: node.type,
      ID: node.id,
      Name: node.t,
      colour: node.c,
      GroupNo: node.d,
      X_Coord: Math.floor(node.x),
      Y_Coord: Math.floor(node.y),
    };
  };

  return { shapeSelectedItem };
}
