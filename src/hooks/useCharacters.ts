import { useEffect, useMemo, useState } from "react";
import { fetchAllCharacters } from "@/services/characters";
import { Character } from "@/types/character";

type Filters = {
  search: string;
  house: string;
  status: "all" | "alive" | "dead";
};

export function useCharacters(filters: Filters) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllCharacters();
        setCharacters(data);
      } catch (err) {
        setError("Não foi possível carregar os personagens. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredCharacters = useMemo(() => {
    return characters
      .filter((c) =>
        c.name.toLowerCase().includes(filters.search.toLowerCase().trim())
      )
      .filter((c) =>
        filters.house === "all" ? true : c.house === filters.house
      )
      .filter((c) => {
        if (filters.status === "alive") return c.alive === true;
        if (filters.status === "dead") return c.alive === false;
        return true;
      });
  }, [characters, filters]);

  return {
    characters: filteredCharacters,
    totalCharacters: characters.length, // ← total sem filtro
    loading,
    error,
  };
}
