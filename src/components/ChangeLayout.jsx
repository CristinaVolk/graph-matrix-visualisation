import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Typography } from "@material-ui/core";

import { layouts } from "../utils/appData";

export function ChangeLayout({ changeLayout }) {
  const classes = useStyles();

  const runLayout = useCallback(
    (event) => {
      console.log(
        // clear comment
        event.target.innerHTML.replace(/(<([^>]+)>)/gi, "").toLowerCase(),
      );
      changeLayout(
        event.target.innerHTML.replace(/(<([^>]+)>)/gi, "").toLowerCase(),
      );
    },
    [changeLayout],
  );

  return (
    <div className={classes.layoutsBoxContainer}>
      <Typography gutterBottom color='secondary' variant='h6' align='center'>
        Choose one of the layouts below to arrange nodes in various ways
      </Typography>
      <ButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='vertical contained primary button group'
        variant='text'
      >
        {layouts.map((singleLayout) => {
          return (
            <Button key={singleLayout} component='button' onClick={runLayout}>
              {singleLayout}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  layoutsBoxContainer: {
    width: "60%",
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
