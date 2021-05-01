import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core/";

import { useComponent } from "./hook";

export function InformationBox({ open, selectedItem, onClose }) {
  const { shapeSelectedItem } = useComponent();

  return (
    <Dialog
      onClose={() => onClose(selectedItem)}
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
