import { fetchCharacters, getHouse } from "./utils.ts";
import { Character, House } from "./type.ts";

export const resolvers = {
  Character: {
    house: async (parent: Character): Promise<House | null> => {
      if (!parent.house) return null;
      const house = await getHouse(parent.house);
      return house;
    },
  },

  House: {
    characters: async (parent: House): Promise<Character[]> => {
      const all = await fetchCharacters();
      return all
        .filter((c) => c.house === parent.name)
        .map((c) => ({ ...c, houseObj: null }));
    },
  },

  Query: {
    getCharacter: async (_: unknown, { id }: { id: string }) => {
      const characters = await fetchCharacters();
      const found = characters.find((c) => c.id === id);
      return found ? { ...found, houseObj: null } : null;
    },

    getCharacters: async (_: unknown, { ids }: { ids?: string[] }) => {
      const characters = await fetchCharacters();
      if (!ids) return characters.map((c) => ({ ...c, houseObj: null }));
      return characters
        .filter((c) => ids.includes(c.id))
        .map((c) => ({ ...c, houseObj: null }));
    },
  },
};
