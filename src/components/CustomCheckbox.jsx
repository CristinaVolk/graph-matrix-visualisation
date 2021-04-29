import { FormControlLabel, Checkbox } from "@material-ui/core";

export function CustomCheckbox({ checkbox }) {
  const { title, checked, handleChange, boxName, disabled } = checkbox;

  const onHandleChange = (event) => {
    handleChange(event);
  };

  return (
    <FormControlLabel
      disabled={disabled}
      control={
        <Checkbox
          onChange={onHandleChange}
          id={title}
          checked={checked}
          name={boxName}
        />
      }
      label={title}
    />
  );
}
