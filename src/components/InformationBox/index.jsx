import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { useComponent } from "./hook";

export function InformationBox({ open, selectedItem, onClose }) {
  const { shapeSelectedItem } = useComponent();
  const classes = useStyles();

  return (
    <Dialog
      onClose={() => onClose(selectedItem)}
      aria-labelledby='simple-dialog-title'
      open={open}
      classes={{ paper: classes.dialogBox }}
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

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    background: "#282829",
    color: "rgb(213 221 255)",
  },
}));

InformationBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
};
