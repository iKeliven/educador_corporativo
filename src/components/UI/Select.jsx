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

      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}

      <select
        className={styles.select}
        name={name}
        value={value}
        onChange={onChange}
      >

        <option value="">
          Selecione
        </option>

        {options.map((option) => {

          const optionValue =
            typeof option === "string"
              ? option
              : option.value;

          const optionLabel =
            typeof option === "string"
              ? option
              : option.label;

          return (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>
          );
        })}

      </select>

    </div>
  );
}