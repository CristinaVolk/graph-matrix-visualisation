import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

import { useComponent } from "./hook";

const chapters = [0, 1, 2, 3, 4, 5, 7, 8, 10];

export function ArrangeNodesLayout({ arrangeNodesFromGroup }) {
  const { arrangeNodes } = useComponent(arrangeNodesFromGroup);
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='space-around'
      alignItems='center'
      className={classes.chapterBoxContainer}
    >
      <Typography
        className={classes.root}
        color='secondary'
        variant='subtitle1'
        align='center'
      >
        Arrange names from a single chapter
      </Typography>
      <ButtonGroup
        orientation='horizontal'
        color='primary'
        aria-label='vertical contained primary button group'
        variant='text'
        className={classes.arrangeButtonGroup}
      >
        {chapters.map((chapter) => {
          return (
            <Button
              className={classes.chapterButton}
              key={chapter}
              component='button'
              onClick={arrangeNodes}
            >
              {chapter}
            </Button>
          );
        })}
      </ButtonGroup>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  chapterBoxContainer: {
    width: "90%",
    margin: theme.spacing(1),
  },
  root: {
    fontSize: "1.1rem",
    marginBottom: "1vw",

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  arrangeButtonGroup: {
    flexWrap: "wrap",
  },
  chapterButton: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

ArrangeNodesLayout.propTypes = {
  arrangeNodesFromGroup: PropTypes.func.isRequired,
};
