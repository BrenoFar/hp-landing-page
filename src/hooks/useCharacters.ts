import { useEffect, useMemo, useState } from "react";
import { fetchAllCharacters } from "@/services/characters";
import { Character } from "@/types/character";

type Filters = {
  search: string;
  status: "all" | "alive" | "dead";
};

export type HouseGroup = {
  key: string;
  label: string;
  icon: string;
  color: string;
  characters: Character[];
};

// Configuração visual de cada grupo
const GROUP_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  Gryffindor: { label: "Gryffindor", icon: "/icons/gryffindor.svg",      color: "#ae0001" },
  Slytherin:  { label: "Slytherin",  icon: "/icons/slytherin.svg",       color: "#1a472a" },
  Hufflepuff: { label: "Hufflepuff", icon: "/icons/hufflepuff.svg",      color: "#ecb939" },
  Ravenclaw:  { label: "Ravenclaw",  icon: "/icons/ravenclaw.svg",       color: "#0e1a40" },
  staff:      { label: "Professores & Staff", icon: "/icons/deathly-hallows.svg", color: "#7c3aed" },
  muggle:     { label: "Trouxas",    icon: "/icons/deathly-hallows.svg", color: "#6b7280" },
  other:      { label: "Outros",     icon: "/icons/deathly-hallows.svg", color: "#374151" },
};

// Ordem de exibição dos grupos
const GROUP_ORDER = [
  "Gryffindor",
  "Slytherin",
  "Hufflepuff",
  "Ravenclaw",
  "staff",
  "muggle",
  "other",
];

// Determina em qual grupo o personagem se encaixa
function resolveGroup(character: Character): string {
  const { house, hogwartsStaff, species, wizard } = character;

  if (hogwartsStaff) return "staff";
  if (species !== "human") return "other";
  if (house && GROUP_CONFIG[house]) return house;
  if (wizard === false) return "muggle";
  if (wizard === true) return "unaffiliated";

  return "other";
}
export function useCharacters(filters: Filters) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllCharacters();
        setCharacters(data);
      } catch {
        setError("Não foi possível carregar os personagens. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Aplica filtros de busca e status
  const filteredCharacters = useMemo(() => {
    return characters
      .filter((c) =>
        c.name.toLowerCase().includes(filters.search.toLowerCase().trim())
      )
      .filter((c) => {
        if (filters.status === "alive") return c.alive === true;
        if (filters.status === "dead") return c.alive === false;
        return true;
      });
  }, [characters, filters]);

  // Agrupa por casa/função
  const groupedCharacters = useMemo(() => {
    const groups: Record<string, Character[]> = {};

    filteredCharacters.forEach((c) => {
      const key = resolveGroup(c);
      if (!groups[key]) groups[key] = [];
      groups[key].push(c);
    });

    // Retorna na ordem definida, sem grupos vazios
    return GROUP_ORDER
      .filter((key) => groups[key]?.length > 0)
      .map((key) => ({
        key,
        ...GROUP_CONFIG[key],
        characters: groups[key],
      })) as HouseGroup[];
  }, [filteredCharacters]);

  return {
    groupedCharacters,
    totalCharacters: characters.length,
    filteredTotal: filteredCharacters.length,
    loading,
    error,
  };
}
