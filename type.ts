export type CharacterAPI = {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
};

export type Character = CharacterAPI & {
  houseObj?: House | null;
};

export type House = {
  name: string;
  characters: Character[];
};
