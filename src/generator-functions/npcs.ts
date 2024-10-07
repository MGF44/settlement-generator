import randomInt, { randomIntInc } from "../shared/random-int";
import { SetOptions, Species } from "../types/generator-options";
import fs from "fs";
interface NPC {
  name: string;
  species: Species;
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

const traitGroupSkinEyes = (species: Species): string => {
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

const traitGroupSkinHair = (species: Species): string => {
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

const traitGroupSkin = (species: Species): string => {
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

const getJSONS = () => {
  const eyesPath = "./src/assets/npcs/physical_traits/eye-color.json";
  const hairPath = "./src/assets/npcs/physical_traits/hair-color.json";
  const skinPath = "./src/assets/npcs/physical_traits/skin-color.json";
  const randomPath = "./src/assets/npcs/physical_traits/random-traits.json";
  const eyes = JSON.parse(fs.readFileSync(eyesPath, "utf8"));
  const hair = JSON.parse(fs.readFileSync(hairPath, "utf8"));
  const skin = JSON.parse(fs.readFileSync(skinPath, "utf8"));
  const random = JSON.parse(fs.readFileSync(randomPath, "utf8"));
  return { eyes, hair, skin, random };
};

const getEyes = (eyes: any, tGroup: string) => {
  const randomEyes = randomIntInc(1, 100);
  return eyes.filter(
    (v: any) => randomEyes >= v[tGroup].min && randomEyes <= v[tGroup].max
  )[0];
};

const getHair = (hair: any, tGroup: string) => {
  const randomHair = randomIntInc(1, 100);
  return hair.filter(
    (v: any) => randomHair >= v[tGroup].min && randomHair <= v[tGroup].max
  )[0];
};

const getSkin = (skin: any, tGroup: string) => {
  const randomSkin = randomIntInc(1, 100);
  return skin.filter((v: any) => {
    if (tGroup === "fey")
      return randomSkin >= v[tGroup].min && randomSkin <= v[tGroup].max;
    else {
      const [first, tSubGroup] = tGroup.split("/");
      return (
        randomSkin >= v[first][tSubGroup].min &&
        randomSkin <= v[first][tSubGroup].max
      );
    }
  })[0];
};

const generatePhysical = (species: Species) => {
  const { eyes, hair, skin, random } = getJSONS();
  const tGroupEyes = traitGroupSkinEyes(species);
  const tGroupHair = traitGroupSkinHair(species);
  const tGroupSK = traitGroupSkin(species);
  const eyesColor = getEyes(eyes, tGroupEyes);
  const hairColor = getHair(hair, tGroupHair);
  const skinColor = getSkin(skin, tGroupSK);
  const addTraits =
    randomIntInc(1, 100) <= 5 ? random[randomIntInc(1, 200)] : undefined;
  return { eyesColor, hairColor, skinColor, addTraits };
};

const speciesNames = (species: Species, gender: string) => {
  const { name } = species;
  const path = `./src/assets/npcs/names/${name.toLowerCase()}.json`;
  const dictionary = JSON.parse(fs.readFileSync(path, "utf-8"));
  return dictionary[gender][
    Math.floor(Math.random() * dictionary[gender].length)
  ];
};

const GENDER = [
  ...Array(9).fill("male"),
  ...Array(9).fill("female"),
  ...Array(2).fill("non-binary"),
];

const generateNPC = (species: Species) => {
  const gender = GENDER[Math.floor(Math.random() * GENDER.length)];
  const key =
    gender === "non-binary"
      ? randomInt(0, 1) === 0
        ? "male"
        : "female"
      : gender;
  const name = speciesNames(species, key);
  const physical = generatePhysical(species);
  return {
    name,
    gender,
    species,
    eyes: physical.eyesColor.color,
    hair: physical.hairColor.color,
    skin: physical.skinColor.color,
    additional: physical.addTraits,
  };
};

const genRandomNPC = (rawPop: any, options: SetOptions) => {
  const { dist, pop } = rawPop;
  const spNo = randomInt(1, pop);
  const chosen = Object.entries(dist)
    .map(([k, value]) => ({
      species: k,
      dist: Math.abs((value as number) - spNo),
    }))
    .reduce((prev, n) => (prev.dist < n.dist ? prev : n));
  const species: Species = options.species.filter(
    (v) => v.name == chosen.species
  )[0];
  return generateNPC(species);
};

export default genRandomNPC;

export { generateNPC };
