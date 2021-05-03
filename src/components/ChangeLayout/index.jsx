import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Typography } from "@material-ui/core";

import { useComponent } from "./hook";
import { layouts } from "../../utils/appData";

export function ChangeLayout({ changeLayout }) {
  const { runLayout } = useComponent(changeLayout);
  const classes = useStyles();

  return (
    <div className={classes.layoutsBoxContainer}>
      <Typography
        className={classes.root}
        color='secondary'
        variant='subtitle1'
        align='center'
      >
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
            <Button
              className={classes.layoutButton}
              key={singleLayout}
              component='button'
              onClick={runLayout}
            >
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
    width: "90%",
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    fontSize: "1.1rem",
  },
  layoutButton: {
    width: "120px",
  },
}));

ChangeLayout.propTypes = {
  changeLayout: PropTypes.func.isRequired,
};
