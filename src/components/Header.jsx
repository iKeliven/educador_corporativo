import styles from './Header.module.css'

import logo from '../assets/logo.png'

import Button from './UI/Button'

import { Link, useNavigate } from 'react-router-dom'

export default function Header({
    isAuthenticated = false,
    userName = "Administrador",
}) {
    function handleLogout() {
        console.log("logout");
    }

    return (
        <header className={styles.header}>
            <Link
                to={isAuthenticated ? "/dashboard" : "/"}
                className={styles.logo}
            >
                <img src={logo} alt="Educação Corporativa" />
            </Link>

            <div className={styles.actions}>
                {isAuthenticated ? (
                    <>
                        <div className={styles.user}>
                            <div className={styles.avatar}>{userName.charAt(0)}</div>

                            <div className={styles.userInfo}>
                                <strong>{userName}</strong>
                                <span>Administrador</span>
                            </div>
                        </div>

                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            Sair
                        </Button>
                    </>
                ) : (
                    <div className={styles.nav}>
                    <Link to="/sobre"className={styles.navLink}>Sobre</Link>
                    <Link to="/login" className={styles.loginLink}>
                        <Button variant="secondary" size="sm">
                            Entrar
                        </Button>
                    </Link>
                    </div>
                )}
            </div>
        </header>
    );
}