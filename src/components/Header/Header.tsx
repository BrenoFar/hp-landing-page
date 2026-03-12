import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.icon}>⚡</span>
          <span className={styles.title}>HP Characters</span>
        </div>
        <p className={styles.subtitle}>
          Explore o universo mágico de Harry Potter
        </p>
      </div>
    </header>
  );
}
