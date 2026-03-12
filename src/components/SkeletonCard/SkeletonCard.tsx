import styles from "./SkeletonCard.module.scss";

export default function SkeletonCard() {
  return (
    <article className={styles.card}>
      <div className={styles.image} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.lineShort} />
      </div>
    </article>
  );
}
