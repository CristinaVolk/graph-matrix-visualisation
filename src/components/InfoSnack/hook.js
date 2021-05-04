import { useState } from "react";
import { Slide } from "@material-ui/core/";

export function useComponent() {
  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  return { state, handleClick, handleClose };
}
