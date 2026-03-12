import Image from "next/image";
import { Character } from "@/types/character";
import styles from "./CharacterCard.module.scss";

type Props = {
  character: Character;
};

// Mapeia a casa para a classe CSS correta
const houseClassMap: Record<string, string> = {
  Gryffindor: "gryffindor",
  Slytherin: "slytherin",
  Hufflepuff: "hufflepuff",
  Ravenclaw: "ravenclaw",
};

export default function CharacterCard({ character }: Props) {
  const {
    name,
    image,
    dateOfBirth,
    house,
    patronus,
    actor,
    alive,
  } = character;

  const houseClass = houseClassMap[house] ?? null;
  const statusLabel = alive ? "Vivo" : "Falecido";

  return (
    <article className={styles.card}>

      {/* Imagem do personagem */}
      <div className={styles.imageWrapper}>
        {image ? (
          <Image
            src={image}
            alt={`Foto de ${name}`}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>🧙</span>
            <p>Sem imagem</p>
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className={styles.content}>

        {/* Nome + status */}
        <header className={styles.cardHeader}>
          <h2 className={styles.name}>{name}</h2>
          <span className={`${styles.status} ${alive ? styles.alive : styles.dead}`}>
            {statusLabel}
          </span>
        </header>

        {/* Badge da casa */}
        {house && (
          <span className={`${styles.houseBadge} ${houseClass ? styles[houseClass] : ""}`}>
            {house}
          </span>
        )}

        {/* Informações */}
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

      </div>
    </article>
  );
}
