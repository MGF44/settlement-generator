import { getEyeColors } from "../db/querys/physical-traits/eyes";
import { getHairColors } from "../db/querys/physical-traits/hair";
import { getRandomTraits } from "../db/querys/physical-traits/random";
import { getSkinColors } from "../db/querys/physical-traits/skin";
import { getSpeciesNames } from "../db/querys/species/names";
import randomInt, { randomIntInc } from "../shared/random-int";
import { SetOptions } from "../types/generator-options";
import { IEyes, IHair } from "../db/interfaces/npc/eyes_hair";
import IName from "../db/interfaces/npc/name";
import { ISkin } from "../db/interfaces/npc/skin";
import { ISpecies } from "../db/interfaces/npc/species";
import INPC from "../db/schemas/npc/npc";
import IRandomTrait from "../db/interfaces/npc/random_trait";
interface NPC {
  name: string;
  species: ISpecies;
  profession: string;
  appearance: string;
  age: number;
}

// HAIR COLOR
// Basic: Humans and other mundane races.
// Exotic: Perhaps elves or more feral, sylvan or unusual ancestry races.
// Pale: Celestials or perhaps plane touched.
// Fey: Fey or other varied hair color races.

// EYE COLOR
// Basic: Humans and other mundane races.
// Exotic: Perhaps elves or more feral, sylvan or unusual ancestry races.
// Pale: Celestials or perhaps plane touched.
// Fey: Fey or other varied eye color races.

// SKIN COLOR
// Basic: Humans and other mundane races.
// Exotic: Perhaps elves or more feral, sylvan or unusual ancestry races.
// Fey: Fey or other varied skin tone races.

const tGroupEyes = (species: ISpecies): string => {
  switch (species.name) {
    case "Halfelf":
    case "Elf":
      return "fey";
    case "Firbolg":
    case "Aarakocra":
    case "Orc":
    case "Tortle":
    case "Kobold":
    case "Dragonborn":
      return "exotic";
    case "Aasimar":
    case "Genasi":
      return "pale";
    case "Dwarf":
    case "Gnome":
    case "Goliath":
    case "Halfling":
    case "Human":
    case "Tiefling":
      return "basic";
  }
  return "basic";
};

const tGroupHair = (species: ISpecies): string => {
  switch (species.name) {
    case "Halfelf":
    case "Elf":
    case "Firbolg":
    case "Aarakocra":
    case "Orc":
    case "Tortle":
    case "Kobold":
    case "Dragonborn":
    case "Aasimar":
    case "Genasi":
      return "fey";
    case "Dwarf":
    case "Gnome":
    case "Goliath":
    case "Halfling":
    case "Human":
    case "Tiefling":
      return "basic";
  }
  return "basic";
};

const tGroupSkin = (species: ISpecies): string => {
  switch (species.name) {
    case "Firbolg":
    case "Aarakocra":
    case "Orc":
    case "Tortle":
    case "Kobold":
    case "Dragonborn":
    case "Genasi":
    case "Dwarf":
    case "Gnome":
      return "fey";
    case "Halfelf":
      return "basic/tan";
    case "Aasimar":
    case "Elf":
    case "Goliath":
      return "basic/light";
    case "Halfling":
    case "Human":
      return "basic/any";
    case "Tiefling":
      return "basic/dark";
  }
  return "";
};

const getPhysicalTraits = async () => {
  const eyes = await getEyeColors()
  const hair = await getHairColors()
  const skin = await getSkinColors()
  const random = await getRandomTraits()
  return { eyes, hair, skin, random };
};

const choose = () => {
  return {
    eyes: (eyes: IEyes[], random: number, tGroup: string) => {
      return eyes.filter((v: any) => random >= v[tGroup].min && random <= v[tGroup].max)[0];
    },
    hair: (hairs: IHair[], random: number, tGroup: string) => {
      return hairs.filter((v: any) => random >= v[tGroup].min && random <= v[tGroup].max)[0];
    },
    skin: (skins: ISkin[], random: number, tGroup: string) => {
      return skins.filter((sk: any) => {
        if (tGroup === "fey") {
          return random >= sk[tGroup].min && random <= sk[tGroup].max;
        }
        const [first, tSubGroup] = tGroup.split("/");
        return (random >= sk[first][tSubGroup].min && random <= sk[first][tSubGroup].max);
      })[0]
    }
  }
}

const generatePhysical = async (species: ISpecies, { eyes, hair, skin, random }: { eyes: IEyes[], hair: IHair[], skin: ISkin[], random: IRandomTrait[] }) => {
  const physFn = choose()
  const eyesColor = physFn.eyes(eyes, randomIntInc(1, eyes.length - 1), tGroupEyes(species));
  const hairColor = physFn.hair(hair, randomIntInc(1, hair.length - 1), tGroupHair(species));
  const skinColor = physFn.skin(skin, randomIntInc(1, skin.length - 1), tGroupSkin(species));
  const addTraits = randomIntInc(1, 100) <= 5 ? random[randomIntInc(1, 200)] : undefined;
  return { eyesColor, hairColor, skinColor, addTraits };
};

const speciesNames = async (species: ISpecies, gender: string): Promise<IName> => {
  const names = await getSpeciesNames(species, gender)
  return names[randomIntInc(1, names.length - 1)]
};

const GENDER = [
  ...Array(9).fill("male"),
  ...Array(9).fill("female"),
  ...Array(2).fill("non-binary"),
];

const randomGender = () => {
  const gender = GENDER[Math.floor(Math.random() * GENDER.length)];
  return gender === "non-binary" ? randomInt(0, 1) === 0 ? "male" : "female" : gender;
}

const generateNPC = async (species: ISpecies, physical: { eyesColor: IEyes, hairColor: IHair, skinColor: ISkin, addTraits: IRandomTrait | undefined }): Promise<INPC> => {
  const gender = randomGender()
  const name = await speciesNames(species, gender);
  return {
    name: name,
    gender,
    species,
    eyes: physical.eyesColor,
    hair: physical.hairColor,
    skin: physical.skinColor,
    additionalTraits: physical.addTraits,
  };
};

const getRandomSpecies = (options: SetOptions) => {
  const { species } = options
  const sum = species.reduce((p, n) => p + n.distribution, 0)
  return species
    .map(({ distribution, species }) => ({ species, distribution: Math.abs((distribution as number) - randomInt(1, sum + 1)) }))
    .reduce((prev, n) => (prev.distribution < n.distribution ? prev : n));
}

const generate = async (options: SetOptions) => {
  const { eyes, hair, skin, random } = await getPhysicalTraits()
  return {
    random: async () => {
      const { species } = getRandomSpecies(options)
      const physical = await generatePhysical(species, { eyes, hair, skin, random })
      return generateNPC(species, physical)
    },
    npc: async (species: ISpecies) => {
      const physical = await generatePhysical(species, { eyes, hair, skin, random })
      return generateNPC(species, physical)
    }
  }
}



export default generate;

