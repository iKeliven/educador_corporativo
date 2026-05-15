import styles from './Dropdown.module.css'

export default function Dropdown() {
  return (
    <select className={styles.dropdown}>
      <option>Selecione</option>
      <option>Vídeo</option>
      <option>Workshop</option>
    </select>
  )
}