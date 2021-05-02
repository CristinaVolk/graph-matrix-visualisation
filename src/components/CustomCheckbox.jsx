import { FormControlLabel, Checkbox, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

export function CustomCheckbox({ checkbox }) {
  const { title, checked, boxName, disabled, handleChange } = checkbox;
  const classes = useStyles();

  return (
    <FormControlLabel
      className={classes.root}
      disabled={disabled}
      classes={{
        label: classes.label,
      }}
      control={
        <Checkbox
          onChange={(event) => handleChange(event)}
          id={title}
          checked={checked}
          name={boxName}
          classes={{ colorSecondary: classes.colorSecondary }}
        />
      }
      label={title}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  colorSecondary: {
    padding: "4px",
  },
  label: {
    fontSize: "1em",
  },
}));

CustomCheckbox.propTypes = {
  checkbox: PropTypes.object.isRequired,
};
