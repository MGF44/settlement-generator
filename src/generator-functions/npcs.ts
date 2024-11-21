import { getEyeColors } from "../db/querys/physical-traits/eyes";
import { getHairColors } from "../db/querys/physical-traits/hair";
import { getRandomTraits } from "../db/querys/physical-traits/random";
import { getSkinColors } from "../db/querys/physical-traits/skin";
import { getSpeciesNames } from "../db/querys/species/names";
import randomInt, { randomIntInc } from "../shared/random-int";
import { NPCAge, SetOptions } from "../types/generator-options";
import { IEyes, IHair } from "../db/interfaces/npc/eyes_hair";
import IName from "../db/interfaces/npc/name";
import { ISkin } from "../db/interfaces/npc/skin";
import { ISpecies } from "../db/interfaces/npc/species";
import INPC from "../db/schemas/npc/npc";
import IRandomTrait from "../db/interfaces/npc/random_trait";
import { getSpecies } from "../db/querys/species/species";

interface NPC {
  name: string;
  species: ISpecies;
  profession: string;
  appearance: string;
  age: number;
}
const minMax = (child: number[], young: number[], adult: number[], senior: number[]) => {
  const [minChild, maxChild] = child;
  const [minYoung, maxYoung] = young;
  const [minAdult, maxAdult] = adult;
  const [minSenior, maxSenior] = senior;
  return {
    'CHILD': { min: minChild, max: maxChild },
    'YOUNG_ADULT': { min: minYoung, max: maxYoung },
    'ADULT': { min: minAdult, max: maxAdult },
    'SENIOR': { min: minSenior, max: maxSenior }
  }
}
const getAge = (specie: ISpecies, group: NPCAge) => {
  const selector = {
    'Aarakocra': [[1, 3], [4, 10], [11, 22], [23, 30]],
    'Aasimar': [[1, 16], [17, 40], [41, 130], [131, 160]],
    'Dragonborn': [[1, 15], [16, 30], [31, 60], [61, 80]],
    'Dwarf': [[1, 50], [51, 90], [91, 300], [301, 350]],
    'Elf': [[1, 100], [101, 200], [201, 650], [651, 750]],
    'Firbolg': [[1, 100], [101, 200], [201, 650], [651, 750]],
    'Genasi': [[1, 16], [17, 30], [31, 80], [81, 120]],
    'Gnome': [[1, 40], [41, 100], [101, 300], [301, 350]],
    'Goliath': [[1, 15], [16, 30], [31, 60], [61, 80]],
    'Halfling': [[1, 20], [21, 80], [81, 200], [201, 250]],
    'Halfelf': [[1, 20], [21, 40], [41, 150], [151, 180]],
    'Human': [[1, 16], [17, 30], [31, 60], [61, 80]],
    'Kobold': [[1, 6], [7, 20], [21, 80], [81, 120]],
    'Orc': [[1, 12], [13, 20], [21, 40], [41, 50]],
    'Tiefling': [[1, 16], [17, 30], [31, 70], [71, 100]],
    'Tortle': [[1, 15], [16, 25], [26, 40], [41, 50]],
  };
  console.log(specie.name, group)
  const [child, young, adult, senior] = (selector as any)[specie.name]
  const { min, max } = (minMax(child, young, adult, senior) as any)[group]
  return randomIntInc(min, max)
}

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

const generateNPC = async (species: ISpecies, physical: { eyesColor: IEyes, hairColor: IHair, skinColor: ISkin, addTraits: IRandomTrait | undefined }, ageGroup?: NPCAge): Promise<INPC> => {
  const gender = randomGender()
  const name = await speciesNames(species, gender);
  const age = ['CHILD', 'YOUNG_ADULT', 'ADULT', 'SENIOR'][randomInt(0, 4)]


  return {
    name: name,
    gender,
    species,
    eyes: physical.eyesColor,
    hair: physical.hairColor,
    skin: physical.skinColor,
    additionalTraits: physical.addTraits,
    ...(!!ageGroup && { age: getAge(species, ageGroup === 'RANDOM' ? age as NPCAge : ageGroup) })
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

const gen = async () => {
  const { eyes, hair, skin, random } = await getPhysicalTraits()
  return {
    random: async (ageGroup?: NPCAge) => {
      const species = await getSpecies()
      const specie = species[Math.floor(Math.random() * species.length)]
      const physical = await generatePhysical(specie, { eyes, hair, skin, random })
      return generateNPC(specie, physical, ageGroup)
    },
    npc: async (specie: ISpecies, ageGroup?: NPCAge) => {
      const physical = await generatePhysical(specie, { eyes, hair, skin, random })
      return generateNPC(specie, physical, ageGroup)
    }
  }
}

export default generate;


export { gen }