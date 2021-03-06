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
  const shapedItem = selectedItem && shapeSelectedItem(selectedItem);
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
        {shapedItem &&
          Object.keys(shapedItem).map((property) => (
            <ListItem key={property} className={classes.dialogListItem}>
              <ListItemText
                className={classes.dialogListItemText}
                primary={`${property} : ${shapedItem[property]}`}
              />
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    background: theme.palette.primary.dark,
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
