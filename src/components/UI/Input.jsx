import styles from "./Input.module.css";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  textarea = false,
  rows = 5,
  defaultValue,
}) {

  return (
    <div className={styles.group}>

      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}

      {textarea ? (

        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          rows={rows}
          defaultValue={defaultValue}
        />

      ) : (

        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
        />

      )}

    </div>
  );
}