"use client";

import Image from "next/image";
import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import Hero from "@/components/Hero/Hero";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import Filters from "@/components/Filters/Filters";
import styles from "./page.module.scss";

const SKELETON_COUNT = Array.from({ length: 12 });

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "alive" | "dead">("all");

  // Removemos o filtro de house daqui — agora o agrupamento é automático
  const { groupedCharacters, totalCharacters, filteredTotal, loading, error } =
    useCharacters({ search, status });

  return (
    <>
      <Hero />

      <main className={styles.main}>

        <Filters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          total={filteredTotal}
          filtered={totalCharacters}
        />

        {/* Erro */}
        {error && (
          <div className={styles.feedback}>
            <p className={styles.error}>{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className={styles.grid}>
            {SKELETON_COUNT.map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Grupos por casa / função */}
        {!loading && !error && groupedCharacters.map((group) => (
          <section key={group.key} className={styles.houseSection}>

            {/* Header do grupo */}
            <div
              className={styles.houseHeader}
              style={{ borderColor: group.color }}
            >
              <div
                className={styles.houseIconWrapper}
                style={{ boxShadow: `0 0 12px ${group.color}66` }}
              >
                <Image
                  src={group.icon}
                  alt={group.label}
                  width={28}
                  height={28}
                  className={styles.houseHeaderIcon}
                />
              </div>
              <h2 className={styles.houseTitle}>{group.label}</h2>
              <span className={styles.houseCount}>
                {group.characters.length} personagens
              </span>
            </div>

            {/* Grid de cards */}
            <div className={styles.grid}>
              {group.characters.map((character, index) => (
                <CharacterCard
                  key={`${character.name}-${index}`}
                  character={character}
                  priority={index < 4}
                />
              ))}
            </div>

          </section>
        ))}

        {/* Nenhum resultado */}
        {!loading && !error && groupedCharacters.length === 0 && (
          <div className={styles.feedback}>
            <p className={styles.empty}>Nenhum personagem encontrado.</p>
            <p className={styles.emptyHint}>Tente ajustar os filtros.</p>
          </div>
        )}

      </main>
    </>
  );
}
