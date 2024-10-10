import fs from "fs";
import path from "path";
import {
  Archetype,
  MagicLevel,
  SetOptions,
  SettlementIncrementor,
  SettlementSize,
} from "./types/generator-options";
import genPopulation from "./generator-functions/population";
import randomInt, {
  randomIntInc,
  randomNumbersWithFixedSum,
} from "./shared/random-int";
import genNPC from "./generator-functions/npcs";
import genRandomNPC from "./generator-functions/npcs";
import dotenv from "dotenv";
import capitalize from "./shared/capitalize";
import { generateSettlement } from "./generator-functions/settlements";
import readInventoriesJSONs from "./generator-functions/stores";
// import readInventoriesJSONs from "./generator-functions/stores";
import mongoose from "mongoose";
import ILandform from "./db/interfaces/landform";
import { IClimate } from "./db/interfaces/climate";
import { Climate, SubClimate } from "./db/schemas/climate";
import { ISpecies } from "./db/interfaces/species";
import { Species } from "./db/schemas/species";
import IName from "./db/interfaces/name";
import { Name } from "./db/schemas/name";
import { IEyes, IHair } from "./db/interfaces/eyes_hair";
import { Eyes } from "./db/schemas/eyes";
import { Hair } from "./db/schemas/hair";
import { ISkin } from "./db/interfaces/skin";
import { Skin } from "./db/schemas/skin";
import IRandomTrait from "./db/interfaces/random_trait";
import { RandomTrait } from "./db/schemas/random_trait";
dotenv.config();

const createOptions = (): SetOptions => {
  const climatePath = path.resolve("src", "assets", "general", "climate.json");
  const terrainPath = path.resolve("src", "assets", "general", "terrain.json");
  const speciesPath = path.resolve("src", "assets", "general", "species.json");

  const climates: IClimate[] = JSON.parse(fs.readFileSync(climatePath, "utf8"));
  const terrains: ILandform[] = JSON.parse(fs.readFileSync(terrainPath, "utf8"));
  const speciesList: ISpecies[] = JSON.parse(
    fs.readFileSync(speciesPath, "utf8")
  );
  const archetypes: Archetype[] = [
    "FISHING",
    "MINING",
    "TRADE",
    "FARMING",
    "RELIGIOUS",
    "MILITARY",
    "SHADY",
  ];

  const climate = climates[randomInt(0, climates.length - 1)];
  const terrain = terrains[randomInt(0, terrains.length - 1)];
  const archetype: Archetype = archetypes[randomInt(0, archetypes.length - 1)];

  const species = speciesList
    .sort(() => 0.5 - Math.random())
    .slice(0, randomInt(0, speciesList.length / 2) + 1);

  const sizes: SettlementSize[] = [
    "SETTLEMENT",
    "VILLAGE",
    "TOWN",
    "CITY",
    "METROPOLIS",
  ];

  const incrementors: SettlementIncrementor[] = ["SMALL", "REGULAR", "LARGE"];

  const mLevels: MagicLevel[] = [
    "NO_MAGIC",
    "LOW_MAGIC",
    "COMMON_MAGIC",
    "HIGH_MAGIC",
  ];
  const size = sizes[randomInt(0, sizes.length - 1)];

  const incrementor =
    ["VILLAGE", "TOWN", "CITY"].filter((v: string) => v === size).length > 0
      ? incrementors[randomInt(0, incrementors.length - 1)]
      : undefined;

  const distribution = randomNumbersWithFixedSum(species.length, 100);

  const newSpecies = species
    .map((value: ISpecies, ix: number) => ({
      ...value,
      distribution: distribution[ix],
    }))
    .filter((v: ISpecies) => v.distribution != 0);

  return {
    name: (Math.random() + 1).toString(36).substring(7),
    species: newSpecies,
    terrain,
    climate,
    size,
    magicLevel: mLevels[randomInt(0, mLevels.length - 1)],
    hasGuilds: true,
    incrementor,
    archetype,
  };
};

const startSettlementGenerator = async (options: SetOptions) => {
  const mdbe = await mongoose.connect(process.env.MONGODB_URI as string)

  // const hair: IHair[] = JSON.parse(fs.readFileSync(hairPath, "utf8"));
  // const res = await Skin.insertMany(skins)
  // console.log(res)
  // const e = await Eyes.insertMany(eyes)
  // const h = await Hair.insertMany(hair)
  // console.log(e.length)
  // console.log(h.length)
  // const { pop, dist } = genPopulation(options);
  // const npc: NPC = genRandomNPC({ pop, dist }, options);

  // const x = `
  // Name of the settlement: ${options.name}
  // Population of the settlement: ${pop}
  // Species in the settlement: \n ${options.species
  //   .map((v) => {
  //     return `\t - ${v.name}: ${v.distribution}%`;
  //   })
  //   .join("\n")}
  // Type of terrain: ${options.terrain.name} - ${options.terrain.description}
  // Climate of terrain: ${options.climate.type} ${
  //   options.climate.subTypes.length > 0
  //     ? "- " + options.climate.subTypes[randomIntInc(0, 1)].name
  //     : ""
  // }
  // Size of the settlement: ${options.incrementor ? options.incrementor : ""} ${
  //   options.size
  // }
  // Does it have guilds: ${options.hasGuilds ? "Yes" : "No"}
  // How common is magic?: ${options.magicLevel}
  // Archetype: ${options.archetype}
  // `;

  // const inputs = ` ${npc.name}, ${npc.gender} ${npc.species.name}, with ${
  //   npc.skin
  // } skin, ${npc.eyes} eyes and ${npc.hair} hair. ${
  //   npc.additional ? npc.additional : ""
  // }`;
  // console.log(inputs);
  // readInventoriesJSONs();
  // readInventoriesJSONs(options, pop);
  // generateSettlement(options, { pop, dist });
};

startSettlementGenerator(createOptions());
// { "name": "Knights’ Guild", "SV": undefined },
// { "name": "Architects’ Guild", "SV": undefined },
// { "name": "Sailors’ Guild", "SV": undefined },
// { "name": "Writers’ Guild", "SV": undefined },
// { "name": "Adventurers’ Guild", "SV": undefined },
// { "name": "Mages’ Guild", "SV": undefined },
// { "name": "Bards’ Guild", "SV": undefined },
// { "name": "Artists’ Guild", "SV": undefined },
// { "name": "Hunters’ Guild", "SV": undefined },
// { "name": "Fishermen’s Guild", "SV": undefined },
// { "name": "Thieves’ Guild", "SV": undefined },
// { "name": "Merchants’ Guild", "SV": undefined },
// { "name": "Scholars’ Guild", "SV": undefined },
