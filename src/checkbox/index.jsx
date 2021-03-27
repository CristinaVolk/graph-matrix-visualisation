import styles from "./styles.module.css";

export function Checkbox({ checkbox }) {
  const { title, checked, handleChange, boxName } = checkbox;

  const onHandleChange = (event) => {
    handleChange(event);
  };

  return (
    <div className={styles.checkboxHolder}>
      <label className='checkbox'></label>
      <input
        checked={checked}
        name={boxName}
        id={title}
        type='checkbox'
        onChange={onHandleChange}
      />
      <div>{title}</div>
    </div>
  );
}
