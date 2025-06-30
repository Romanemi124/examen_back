import {Character, CharacterAPI, House } from "./type.ts";

let charactersCache: Character[] | null = null;

export const fetchCharacters = async (): Promise<CharacterAPI[]> => {
  if (charactersCache) return charactersCache;
  const res = await fetch("https://hp-api.onrender.com/api/characters");
  if (!res.ok) throw new Error("Fallo al obtener personajes");

  const data: any[] = await res.json();
  charactersCache = data.map((char: any, index: number) => ({
    id: index.toString(),
    name: char.name ?? "Desconocido",
    alternate_names: char.alternate_names ?? [],
    species: char.species ?? "Desconocido",
    gender: char.gender ?? "Desconocido",
    house: char.house ?? "",
  }));

  return charactersCache;
};

export const getHouse = async (houseName: string): Promise<House | null> => {
const all = await fetchCharacters();
const houseCharacters = all.filter(
    (char) => char.house.toLowerCase() === houseName.toLowerCase()
);
  if (houseCharacters.length === 0) return null;
  return {
    name: houseName,
    characters: houseCharacters,
  };
};
