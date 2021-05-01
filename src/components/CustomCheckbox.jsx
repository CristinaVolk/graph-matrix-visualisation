import { FormControlLabel, Checkbox } from "@material-ui/core";

export function CustomCheckbox({ checkbox }) {
  const { title, checked, boxName, disabled, handleChange } = checkbox;

  return (
    <FormControlLabel
      disabled={disabled}
      control={
        <Checkbox
          onChange={(event) => handleChange(event)}
          id={title}
          checked={checked}
          name={boxName}
        />
      }
      label={title}
    />
  );
}
