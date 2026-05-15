import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button'
}) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[size]}
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  )
}