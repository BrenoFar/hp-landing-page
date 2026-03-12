"use client";

import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import Hero from "@/components/Hero/Hero";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import Filters from "@/components/Filters/Filters";
import styles from "./page.module.scss";

// Array fixo para renderizar 12 skeletons durante o loading
const SKELETON_COUNT = Array.from({ length: 12 });

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [house, setHouse] = useState("all");
  const [status, setStatus] = useState<"all" | "alive" | "dead">("all");

  const { characters, totalCharacters, loading, error } = useCharacters({
    search,
    house,
    status,
  });

  return (
    <>
      <Hero />

      <main className={styles.main}>

        <Filters
          search={search}
          onSearchChange={setSearch}
          house={house}
          onHouseChange={setHouse}
          status={status}
          onStatusChange={setStatus}
          total={characters.length}
          filtered={totalCharacters}
        />

        {/* Erro */}
        {error && (
          <div className={styles.feedback}>
            <p className={styles.error}> {error}</p>
          </div>
        )}

        {/* Grid de cards */}
        <section className={styles.grid}>
          {loading
            ? SKELETON_COUNT.map((_, i) => <SkeletonCard key={i} />)
            : characters.map((character, index) => (
                <CharacterCard
                  key={`${character.name}-${index}`}  /* key única */
                  character={character}
                />
              ))}
        </section>

        {/* Nenhum resultado encontrado */}
        {!loading && !error && characters.length === 0 && (
          <div className={styles.feedback}>
            <p className={styles.empty}>Nenhum personagem encontrado.</p>
            <p className={styles.emptyHint}>Tente ajustar os filtros.</p>
          </div>
        )}

      </main>
    </>
  );
}
