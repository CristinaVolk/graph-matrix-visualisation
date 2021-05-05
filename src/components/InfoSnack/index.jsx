import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Snackbar, Slide, SnackbarContent } from "@material-ui/core/";

import { useComponent } from "./hook";
import { snackContent } from "../../utils/appData";

function SlideTransition(props) {
  return <Slide {...props} direction='up' />;
}

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
    <div>
      <Button color='secondary' onClick={handleClick(SlideTransition)}>
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
  snackRoot: {
    width: "30%",
    margin: theme.spacing(1),
    padding: theme.spacing(1),

    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  snackContentRoot: {
    background: "#0a0a0a",
  },
  snackContentMessage: {
    wordBreak: "break-word",
    fontWeight: 300,
    lineHeight: `${theme.spacing(3)}px`,
    color: "rosybrown",
  },
}));
