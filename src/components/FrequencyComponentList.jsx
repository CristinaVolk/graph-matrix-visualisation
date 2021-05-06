import React from "react";
import { Grid, FormGroup, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { CustomCheckbox } from "../components/CustomCheckbox";
import { CustomSwitch } from "../components/CustomSwitch";

export function FrequencyComponentList({ checkboxList, switcherList }) {
  const { maxFrequentSwitch, minFrequentSwitch } = switcherList;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography
        className={classes.checkboxLabel}
        gutterBottom
        color='secondary'
        variant='subtitle1'
        align='center'
      >
        Filter Hugo's characters by frequency
      </Typography>
      <FormGroup component='fieldset' className={classes.formGroupFrequrncy}>
        {checkboxList.map((frequencyCheckbox) => (
          <CustomCheckbox
            key={frequencyCheckbox.boxName}
            checkbox={frequencyCheckbox}
          />
        ))}

        <Grid container className={classes.switchGrid}>
          <CustomSwitch toogler={maxFrequentSwitch && maxFrequentSwitch} />
          <CustomSwitch toogler={minFrequentSwitch && minFrequentSwitch} />
        </Grid>
      </FormGroup>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  formGroupFrequrncy: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginLeft: theme.spacing(8),
    color: theme.palette.primary.contrastText,
    marginBottom: "2vw",
  },
  switchGrid: {
    marginTop: theme.spacing(3),
  },
  checkboxLabel: {
    fontSize: "1.1rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
}));

FrequencyComponentList.propTypes = {
  checkboxList: PropTypes.array,
  switcherList: PropTypes.object,
};
