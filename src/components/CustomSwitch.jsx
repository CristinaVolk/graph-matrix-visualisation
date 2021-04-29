import { FormControlLabel, Switch } from "@material-ui/core";

export function CustomSwitch({ toogler }) {
  const { title, checked, handleChange, boxName, color } = toogler;

  const onHandleChange = (event) => {
    handleChange(event);
  };

  return (
    <FormControlLabel
      labelPlacement='end'
      label={title}
      control={
        <Switch
          checked={checked}
          onChange={onHandleChange}
          name={boxName}
          inputProps={{ "aria-label": "primary checkbox" }}
          color={color}
          size='small'
        />
      }
    />
  );
}
