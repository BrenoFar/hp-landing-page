"use client";

import { useState } from "react";
import Image from "next/image";
import { Character } from "@/types/character";
import styles from "./CharacterCard.module.scss";

type Props = {
  character: Character;
  priority?: boolean;
  onClick?: () => void;
  houseColor?: string;
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
}: Props) {
  const { name, image, dateOfBirth, house, patronus, actor, alive } = character;

  const [revealed, setRevealed] = useState(false);

  const houseIcon = houseIconMap[house] ?? null;

  return (
    <article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ "--card-color": houseColor } as React.CSSProperties}
    >

      {/* Imagem do personagem */}
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

        {/* Ícone da casa sobre a imagem */}
        {houseIcon && (
          <div className={styles.houseIcon}> {/* ← sem houseClass */}
            <Image
              src={houseIcon}
              alt={house}
              width={28}
              height={28}
            />
          </div>
        )}
      </div>

      {/* Conteúdo */}
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
            <strong>Nascimento:</strong>{" "}
            {dateOfBirth || "Não informado"}
          </li>
          <li>
            <strong>Patrono:</strong>{" "}
            {patronus || "Não informado"}
          </li>
          <li>
            <strong>Ator/Atriz:</strong>{" "}
            {actor || "Não informado"}
          </li>
        </ul>

        <button className={styles.detailsBtn}>
          Ver detalhes
        </button>
      </div>
    </article>
  );
}
