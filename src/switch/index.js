import { FormControlLabel, Switch } from "@material-ui/core";

export function CustomSwitch({ toogler }) {
  const { title, checked, handleChange, boxName, disabled } = toogler;

  const onHandleChange = (event) => {
    console.log(disabled);
    handleChange(event);
  };

  return (
    <FormControlLabel
      labelPlacement='start'
      label={title}
      control={
        <Switch
          checked={checked}
          onChange={onHandleChange}
          name={boxName}
          inputProps={{ "aria-label": "primary checkbox" }}
          color='primary'
          size='small'
        />
      }
    />
  );
}
