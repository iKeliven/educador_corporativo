import styles from './StatCard.module.css'

export default function StatCard({
    strong,
    icon,
    text
}) {
    return (
        <div className={styles.statCard}>
            <div className={styles.statIcon}>
                {icon}
            </div>

            <strong>{strong}</strong>

            <span>{text}</span>
        </div>
    )
}