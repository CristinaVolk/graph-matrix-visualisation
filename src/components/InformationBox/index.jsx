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
      <DialogTitle id='simple-dialog-title' className={classes.dialogTitle}>
        Key information about the item selected
      </DialogTitle>
      <List className={classes.dialogList}>
        {selectedItem &&
          shapeSelectedItem(selectedItem) &&
          Object.keys(shapeSelectedItem(selectedItem)).map((property) => (
            <ListItem key={property} className={classes.dialogListItem}>
              <ListItemText
                className={classes.dialogListItemText}
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
    background: "#0c2531",
    color: "rgb(213 221 255)",
    borderRadius: theme.spacing(1),
  },
  dialogTitle: {
    border: "solid 1px #333333",
    borderRadius: theme.spacing(1),
    background: "black",
    "& > h2": {
      letterSpacing: "0.003em",
      fontWeight: 400,
    },
  },
  dialogList: {
    padding: 0,
    borderRadius: theme.spacing(1),
    border: "solid 1px black",
  },
  dialogListItem: {
    borderRadius: "inherit",
    background: "linear-gradient(180deg, black, #08282db8)",
  },
  dialogListItemText: {
    "& > span": {
      letterSpacing: "0.03em",
      fontWeight: 100,
    },
  },
}));

InformationBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string,
};
