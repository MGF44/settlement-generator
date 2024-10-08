import fs from "fs";
import path from "path";
import {
  Archetype,
  Climate,
  Landform,
  MagicLevel,
  SetOptions,
  SettlementIncrementor,
  SettlementSize,
  Species,
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
import NPC from "./types/npc";
import { generateSettlement } from "./generator-functions/settlements";
// import readInventoriesJSONs from "./generator-functions/stores";

dotenv.config();

/*
 * Archetypes: FISHING, MINING, TRADE, FARMING, RELIGIOUS, MILITARY, SHADY
 */
const createOptions = (): SetOptions => {
  const climatePath = path.resolve("src", "assets", "general", "climate.json");
  const terrainPath = path.resolve("src", "assets", "general", "terrain.json");
  const speciesPath = path.resolve("src", "assets", "general", "species.json");

  const climates: Climate[] = JSON.parse(fs.readFileSync(climatePath, "utf8"));
  const terrains: Landform[] = JSON.parse(fs.readFileSync(terrainPath, "utf8"));
  const speciesList: Species[] = JSON.parse(
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
    .map((value: Species, ix: number) => ({
      ...value,
      distribution: distribution[ix],
    }))
    .filter((v: Species) => v.distribution != 0);

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
  const { pop, dist } = genPopulation(options);
  // const npc: NPC = genRandomNPC({ pop, dist }, options);

  const x = `
  Name of the settlement: ${options.name}
  Population of the settlement: ${pop}
  Species in the settlement: \n ${options.species
    .map((v) => {
      return `\t - ${v.name}: ${v.distribution}%`;
    })
    .join("\n")}
  Type of terrain: ${options.terrain.name} - ${options.terrain.description}
  Climate of terrain: ${options.climate.type} ${
    options.climate.subTypes.length > 0
      ? "- " + options.climate.subTypes[randomIntInc(0, 1)].name
      : ""
  }
  Size of the settlement: ${options.incrementor ? options.incrementor : ""} ${
    options.size
  }
  Does it have guilds: ${options.hasGuilds ? "Yes" : "No"}
  How common is magic?: ${options.magicLevel}
  `;

  // const inputs = ` ${npc.name}, ${npc.gender} ${npc.species.name}, with ${
  //   npc.skin
  // } skin, ${npc.eyes} eyes and ${npc.hair} hair. ${
  //   npc.additional ? npc.additional : ""
  // }`;
  console.log(x);
  // console.log(inputs);
  // readInventoriesJSONs(options, pop);
  generateSettlement(options, { pop, dist });
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
