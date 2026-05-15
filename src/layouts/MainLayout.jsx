import styles from "./MainLayout.module.css";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
      <div className={styles.background}>
        <div className={styles.glowTop} />
        <div className={styles.glowBottom} />
      </div>

      <main className={styles.content}>
        {children}
      </main>

      <Footer />
    </div>
  );
}