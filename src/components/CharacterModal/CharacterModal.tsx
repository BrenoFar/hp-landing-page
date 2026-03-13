"use client";

import Image from "next/image";
import { Character } from "@/types/character";
import styles from "./CharacterModal.module.scss";
import { useEffect } from "react";
import { formatDate, formatWandLength } from "@/utils/format";
import {
  t,
  houseNames,
  speciesNames,
  ancestryNames,
  eyeColours,
  hairColours,
  patronusNames,
  wandWoods,
  wandCores,
} from "@/utils/translations";

type Props = {
  character: Character | null;
  onClose: () => void;
  houseColor?: string;
};

export default function CharacterModal({ character, onClose, houseColor = "#c9a84c" }: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!character) return null;

  const {
    name, image, house, dateOfBirth, ancestry,
    eyeColour, hairColour, patronus, wand,
    hogwartsStudent, hogwartsStaff, species,
  } = character;

  const role = hogwartsStaff
    ? "Professor & Staff"
    : hogwartsStudent
    ? "Estudante"
    : null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes de ${name}`}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ "--modal-color": houseColor } as React.CSSProperties}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className={styles.layout}>
          {/* Coluna esquerda — imagem */}
          <div className={styles.imageCol}>
            {image ? (
              <Image
                src={image}
                alt={`Foto de ${name}`}
                fill
                className={styles.photo}
                sizes="(max-width: 768px) 100vw, 280px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            ) : (
              <div className={styles.noPhoto}>
                <Image
                  src="/icons/deathly-hallows.svg"
                  alt="Sem imagem"
                  width={64}
                  height={64}
                  style={{ opacity: 0.3, filter: "invert(1)" }}
                />
                <span>Sem imagem</span>
              </div>
            )}
          </div>

          {/* Coluna direita — dados */}
          <div className={styles.dataCol}>
            <div className={styles.header}>
              <h2 className={styles.name}>{name}</h2>
              <div className={styles.tags}>
                {house && (
                  <span className={styles.tag}>{t(houseNames, house)}</span>
                )}
                {role && <span className={styles.tag}>{role}</span>}
                {species && species !== "human" && (
                  <span className={styles.tag}>{t(speciesNames, species)}</span>
                )}
              </div>
            </div>

            {/* Identidade */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Identidade</h3>
              <ul className={styles.infoList}>
                <li><strong>Nascimento:</strong> {formatDate(dateOfBirth)}</li>
                <li><strong>Ancestralidade:</strong> {ancestry ? t(ancestryNames, ancestry) : "—"}</li>
                <li><strong>Espécie:</strong> {species ? t(speciesNames, species) : "—"}</li>
              </ul>
            </section>

            {/* Aparência */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Aparência</h3>
              <ul className={styles.infoList}>
                <li><strong>Olhos:</strong> {eyeColour ? t(eyeColours, eyeColour) : "—"}</li>
                <li><strong>Cabelo:</strong> {hairColour ? t(hairColours, hairColour) : "—"}</li>
              </ul>
            </section>

            {/* Patrono */}
            {patronus && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Patrono</h3>
                <p className={styles.patronus}>{t(patronusNames, patronus)}</p>
              </section>
            )}

            {/* Varinha */}
            {(wand?.wood || wand?.core || wand?.length) && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Varinha</h3>
                <ul className={styles.infoList}>
                  {wand.wood && <li><strong>Madeira:</strong> {t(wandWoods, wand.wood)}</li>}
                  {wand.core && <li><strong>Núcleo:</strong> {t(wandCores, wand.core)}</li>}
                  {wand.length && <li><strong>Tamanho:</strong> {formatWandLength(wand.length)}</li>}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
