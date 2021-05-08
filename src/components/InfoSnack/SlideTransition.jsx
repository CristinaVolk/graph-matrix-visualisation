import React from "react";
import { Slide } from "@material-ui/core/";

export function SlideTransition(props) {
  return <Slide {...props} direction='up' />;
}
