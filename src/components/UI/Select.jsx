import styles from "./Select.module.css";

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className={styles.group}>
      <label className={styles.label}>
        {label}
      </label>

      <select
        className={styles.select}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" className={styles.option}>
          Selecione
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}