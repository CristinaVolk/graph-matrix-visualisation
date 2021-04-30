import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core/";

export function InformationBox(props) {
  const { onClose, selectedItem, open } = props;

  const handleClose = () => {
    onClose(selectedItem);
  };

  const shapeSelectedItem = (item) =>
    item.type === "node" ? shapeNode(item) : shapeLink(item);

  const shapeLink = (link) => {
    return {
      Type: link.type,
      ID: link.id,
      Node_Source_Id: link.id1,
      Node_Target_Id: link.id2,
      Node_Source_Name: link.t1,
      Node_Target_Name: link.t2,
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

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogTitle id='simple-dialog-title'>
        Key information about the item selected
      </DialogTitle>
      <List>
        {selectedItem &&
          shapeSelectedItem(selectedItem) &&
          Object.keys(shapeSelectedItem(selectedItem)).map((property) => (
            <ListItem key={property}>
              <ListItemText
                primary={`${property} : ${
                  shapeSelectedItem(selectedItem)[property]
                }`}
              />
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
}

InformationBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
};
