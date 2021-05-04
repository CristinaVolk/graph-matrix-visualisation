import React from "react";
import { Button, Snackbar, Slide } from "@material-ui/core/";

import { useComponent } from "./hook";

function SlideTransition(props) {
  return <Slide {...props} direction='up' />;
}

export function InformationSnack() {
  const { state, handleClick, handleClose } = useComponent();

  return (
    <div>
      <Button color='secondary' onClick={handleClick(SlideTransition)}>
        Slide Information
      </Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message='I am useful info about the graph. README.md :)'
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
}
