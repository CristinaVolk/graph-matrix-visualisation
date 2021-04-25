import { FormControlLabel, Checkbox } from "@material-ui/core";

export function CustomCheckbox({ checkbox }) {
  const { title, checked, handleChange, boxName, disabled } = checkbox;

  const onHandleChange = (event) => {
    console.log(disabled);
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
