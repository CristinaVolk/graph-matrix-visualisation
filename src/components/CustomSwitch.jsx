import PropTypes from "prop-types";
import { FormControlLabel, Switch, makeStyles } from "@material-ui/core";

export function CustomSwitch({ toogler }) {
  const { title, checked, boxName, color, handleChange } = toogler;
  const classes = useStyles();

  return (
    <FormControlLabel
      labelPlacement='end'
      label={title}
      classes={{
        label: classes.label,
      }}
      control={
        <Switch
          checked={checked}
          onChange={(event) => handleChange(event)}
          name={boxName}
          inputProps={{ "aria-label": "primary checkbox" }}
          color={color}
          size='small'
        />
      }
    />
  );
}

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: "1em",
  },
}));

CustomSwitch.propTypes = {
  toogler: PropTypes.object.isRequired,
};
