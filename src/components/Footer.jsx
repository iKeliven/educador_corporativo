import styles from './Footer.module.css'
import logo from '../assets/logo.png'
import senai from '../assets/senai.png'

export default function Footer() {
    return (
        <footer className={styles.footer} >
            <div className={styles.logo}>
                <img src={logo} alt="Educação Corporativa Senai" />
            </div>
            <div className={styles.logo}>
                <img src={senai} alt="Senai" />
            </div>

        </footer >
    )
}