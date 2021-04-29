import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function ChangeLayout({ changeLayout }) {
  const classes = useStyles();

  const runLayout = (event) => {
    console.log(event.target.innerHTML.toLowerCase());
    const layoutName = event.target.innerHTML.toLowerCase();
    changeLayout(layoutName);
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom color='secondary' variant='h6' align='center'>
        Choose the layout
      </Typography>
      <ButtonGroup
        orientation='vertical'
        color='primary'
        aria-label='vertical contained primary button group'
        variant='text'
      >
        <Button component='button' onClick={runLayout}>
          Lens
        </Button>
        <Button onClick={runLayout}>Sequential</Button>
        <Button onClick={runLayout}>Hierarchy</Button>
        <Button onClick={runLayout}>Tweak</Button>
      </ButtonGroup>
    </div>
  );
}
