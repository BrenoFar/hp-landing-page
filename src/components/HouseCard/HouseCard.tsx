import Image from "next/image";
import Link from "next/link";
import { GroupConfig } from "@/services/groups";
import styles from "./HouseCard.module.scss";

type Props = {
  group: GroupConfig;
  count: number;
};

export default function HouseCard({ group, count }: Props) {
  return (
    <Link
      href={`/house/${group.key}`}
      className={styles.card}
      style={{ "--house-color": group.color } as React.CSSProperties}
    >
      {/* Barra colorida no topo */}
      <div className={styles.topBar} />

      <div className={styles.iconWrapper}>
        <Image
          src={group.icon}
          alt={group.label}
          width={56}
          height={56}
          className={styles.icon}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{group.label}</h2>
        <p className={styles.description}>{group.description}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.count}>{count} personagens</span>
        <span className={styles.arrow}>→</span>
      </div>
    </Link>
  );
}
