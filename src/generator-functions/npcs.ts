import { ObjectId } from "mongoose";
import { IEyes, IHair } from "../db/interfaces/eyes_hair";
import IName from "../db/interfaces/name";
import { ISkin } from "../db/interfaces/skin";
import { ISpecies } from "../db/interfaces/species";
import { getEyeColors } from "../db/querys/physical-traits/eyes";
import { getHairColors } from "../db/querys/physical-traits/hair";
import { getRandomTraits } from "../db/querys/physical-traits/random";
import { getSkinColors } from "../db/querys/physical-traits/skin";
import { getSpeciesNames } from "../db/querys/species/names";
import randomInt, { randomIntInc } from "../shared/random-int";
import { SetOptions } from "../types/generator-options";
import fs from "fs";
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
      console.log(tGroup)
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

const generatePhysical = async (species: ISpecies) => {
  const { eyes, hair, skin, random } = await getPhysicalTraits();
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

const generateNPC = async (species: ISpecies) => {
  const gender = randomGender()
  const res = await speciesNames(species, gender);
  console.log(res, species.name, gender)
  // console.log((species.name), (species as any)._id, gender)
  // console.log(res)
  // const physical = await generatePhysical(species);
  // console.log(physical)
  // return {
  //   name,
  //   gender,
  //   species,
  //   eyes: physical.eyesColor.color,
  //   hair: physical.hairColor.color,
  //   skin: physical.skinColor.color,
  //   additional: physical.addTraits,
  // };
};

const genRandomNPC = (rawPop: any, options: SetOptions) => {
  // const { dist, pop } = rawPop;
  // const spNo = randomInt(1, pop);
  // const chosen = Object.entries(dist)
  //   .map(([k, value]) => ({
  //     species: k,
  //     dist: Math.abs((value as number) - spNo),
  //   }))
  //   .reduce((prev, n) => (prev.dist < n.dist ? prev : n));
  // const species: ISpecies = options.species.filter(
  //   (v) => v.name == chosen.species
  // )[0];
  // return generateNPC(species);
};

export default genRandomNPC;

export { generateNPC };
