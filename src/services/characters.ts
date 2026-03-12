import { Character } from "@/types/character";

const BASE_URL = "https://hp-api.onrender.com/api";

export async function fetchAllCharacters(): Promise<Character[]> {
  const response = await fetch(`${BASE_URL}/characters`, {
    next: { revalidate: 3600 }, // cache por 1h -> feature do NExt.js 
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar personagens: ${response.status}`);
  }

  return response.json();
}
