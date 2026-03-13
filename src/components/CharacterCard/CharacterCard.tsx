"use client";

import { useState, useEffect } from "react"; // ← useEffect adicionado
import Image from "next/image";
import { Character } from "@/types/character";
import { formatDate } from "@/utils/format";
import styles from "./CharacterCard.module.scss";

type Props = {
  character: Character;
  priority?: boolean;
  onClick?: () => void;
  houseColor?: string;
  revealStatus?: boolean;
};

const houseIconMap: Record<string, string> = {
  Gryffindor: "/icons/gryffindor.svg",
  Slytherin: "/icons/slytherin.svg",
  Hufflepuff: "/icons/hufflepuff.svg",
  Ravenclaw: "/icons/ravenclaw.svg",
};

export default function CharacterCard({
  character,
  priority = false,
  onClick,
  houseColor = "#c9a84c",
  revealStatus = false,
}: Props) {
  const { name, image, dateOfBirth, house, patronus, actor, alive } = character;

  const [revealed, setRevealed] = useState(revealStatus);

  // Sincroniza quando o filtro muda na página pai
  useEffect(() => {
    setRevealed(revealStatus);
  }, [revealStatus]);

  const houseIcon = houseIconMap[house] ?? null;

  return (
    <article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ "--card-color": houseColor } as React.CSSProperties}
    >

      <div className={styles.imageWrapper}>
        {image ? (
          <Image
            src={image}
            alt={`Foto de ${name}`}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            className={styles.image}
            priority={priority}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className={styles.placeholder}>
            <Image
              src="/icons/deathly-hallows.svg"
              alt="Sem imagem"
              width={60}
              height={60}
              className={styles.placeholderIcon}
            />
            <p>Sem imagem</p>
          </div>
        )}

        {houseIcon && (
          <div className={styles.houseIcon}>
            <Image src={houseIcon} alt={house} width={28} height={28} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <header className={styles.cardHeader}>
          <h2 className={styles.name}>{name}</h2>

          <button
            className={`${styles.spoiler} ${revealed ? (alive ? styles.alive : styles.dead) : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setRevealed((prev) => !prev);
            }}
            aria-label={revealed ? (alive ? "Vivo" : "Falecido") : "Revelar status"}
          >
            <span className={`${styles.spoilerInner} ${revealed ? styles.revealed : ""}`}>
              <span className={styles.spoilerFront}>Spoiler</span>
              <span className={styles.spoilerBack}>
                {alive ? "Vivo" : "Falecido"}
              </span>
            </span>
          </button>
        </header>

        <ul className={styles.infoList}>
          <li>
            <strong>Nascimento:</strong> {formatDate(dateOfBirth)}
          </li>
          <li>
            <strong>Patrono:</strong> {patronus || "—"}
          </li>
          <li>
            <strong>Ator/Atriz:</strong> {actor || "—"}
          </li>
        </ul>

        <button className={styles.detailsBtn}>Ver detalhes</button>
      </div>
    </article>
  );
}
