import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Snackbar, SnackbarContent } from "@material-ui/core/";

import { useComponent } from "./hook";
import { snackContent } from "../../utils/appData";

export function InformationSnack() {
  const { state, handleClick, handleClose } = useComponent();
  const classes = useStyles();

  const SnackContent = (
    <SnackbarContent
      classes={{
        root: classes.snackContentRoot,
        message: classes.snackContentMessage,
      }}
      message={snackContent.message}
    />
  );

  return (
    <div className={classes.snackContainer}>
      <Button color='secondary' onClick={handleClick}>
        For your Information
      </Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        classes={{
          root: classes.snackRoot,
        }}
      >
        {SnackContent}
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  snackContainer: {
    position: "absolute",
    right: theme.spacing(4),
    bottom: theme.spacing(3),

    [theme.breakpoints.down("md")]: {
      position: "unset",
    },
  },
  snackRoot: {
    width: "30%",
    margin: theme.spacing(1),
    padding: theme.spacing(1),

    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  snackContentRoot: {
    background: "linear-gradient(180deg, black, #012c38)",
    border: "solid 1px #333333",
    borderRadius: theme.spacing(1),
  },
  snackContentMessage: {
    wordBreak: "break-word",
    fontWeight: 300,
    lineHeight: `${theme.spacing(3)}px`,
    color: theme.palette.secondary.light,
    letterSpacing: "0.05em",
    fontSize: "1.1em",
  },
}));
