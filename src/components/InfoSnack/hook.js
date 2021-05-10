import { useState } from "react";
import { Slide } from "@material-ui/core/";
import { SlideTransition } from "./SlideTransition";

export function useComponent() {
  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });

  const handleClick = () => {
    setState({
      open: true,
      SlideTransition,
    });
  };

  const handleClose = () => {
    setState((prevState) => {
      return { ...prevState, open: false };
    });
  };

  return { state, handleClick, handleClose };
}
