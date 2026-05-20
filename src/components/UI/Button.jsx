import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${styles.button}
        ${styles[size]}
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  );
}