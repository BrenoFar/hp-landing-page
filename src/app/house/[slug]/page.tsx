"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchAllCharacters } from "@/services/characters";
import { GROUPS, resolveGroup } from "@/services/groups";
import { Character } from "@/types/character";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import Filters from "@/components/Filters/Filters";
import styles from "./page.module.scss";

const SKELETON_COUNT = Array.from({ length: 12 });

export default function HousePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "alive" | "dead">("all");

  const groupConfig = GROUPS.find((g) => g.key === slug);

  useEffect(() => {
    if (!groupConfig) {
      router.replace("/");
      return;
    }

    async function load() {
      try {
        const data = await fetchAllCharacters();
        setAllCharacters(data);
      } catch {
        setError("Não foi possível carregar os personagens.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  const characters = useMemo(() => {
    return allCharacters
      .filter((c) => resolveGroup(c) === slug)
      .filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase().trim())
      )
      .filter((c) => {
        if (status === "alive") return c.alive === true;
        if (status === "dead") return c.alive === false;
        return true;
      });
  }, [allCharacters, slug, search, status]);

  const totalInGroup = useMemo(
    () => allCharacters.filter((c) => resolveGroup(c) === slug).length,
    [allCharacters, slug]
  );

  if (!groupConfig) return null;

  return (
    <main className={styles.main}>

      {/* Header da casa */}
      <div
        className={styles.houseHeader}
        style={{ "--house-color": groupConfig.color } as React.CSSProperties}
      >
        <button className={styles.backBtn} onClick={() => router.back()}>
          ← Voltar
        </button>

        <div className={styles.houseInfo}>
          <div className={styles.houseIconWrapper}>
            <Image
              src={groupConfig.icon}
              alt={groupConfig.label}
              width={56}
              height={56}
              className={styles.houseIcon}
            />
          </div>
          <div>
            <h1 className={styles.houseTitle}>{groupConfig.label}</h1>
            <p className={styles.houseDescription}>{groupConfig.description}</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <Filters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        total={characters.length}
        filtered={totalInGroup}
      />

      {/* Erro */}
      {error && (
        <div className={styles.feedback}>
          <p className={styles.error}>{error}</p>
        </div>
      )}

      {/* Grid */}
      <div className={styles.grid}>
        {loading
          ? SKELETON_COUNT.map((_, i) => <SkeletonCard key={i} />)
          : characters.map((character, index) => (
              <CharacterCard
                key={`${character.name}-${index}`}
                character={character}
                priority={index < 4}
                houseColor={groupConfig.color} // ← fix: passa a cor do grupo
              />
            ))}
      </div>

      {/* Vazio */}
      {!loading && !error && characters.length === 0 && (
        <div className={styles.feedback}>
          <p className={styles.empty}>Nenhum personagem encontrado.</p>
          <p className={styles.emptyHint}>Tente ajustar os filtros.</p>
        </div>
      )}

    </main>
  );
}
