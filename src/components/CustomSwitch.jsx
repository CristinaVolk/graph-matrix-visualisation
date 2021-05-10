import PropTypes from "prop-types";
import { FormControlLabel, Switch } from "@material-ui/core";

export function CustomSwitch({ toogler }) {
  const { title, checked, boxName, color, handleChange } = toogler;

  return (
    <FormControlLabel
      labelPlacement='end'
      label={title}
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

CustomSwitch.propTypes = {
  toogler: PropTypes.object.isRequired,
};
