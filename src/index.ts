import {
  Archetype,
  MagicLevel,
  SetOptions,
  SettlementIncrementor,
  SettlementSize,
} from "./types/generator-options";
import randomInt, {
  randomNumbersWithFixedSum,
} from "./shared/random-int";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ILandform from "./db/interfaces/landform";
import { IClimate } from "./db/interfaces/climate";
import { ISpecies } from "./db/interfaces/species";
import { getClimates } from "./db/querys/nature/climate";
import { getLandforms } from "./db/querys/nature/landform";
import { getSpecies } from "./db/querys/species/species";
import { generateNPC } from "./generator-functions/npcs";
import { Name } from "./db/schemas/name";
import { Species } from "./db/schemas/species";
import fs from 'fs'
import IName from "./db/interfaces/name";
import capitalize from "./shared/capitalize";
dotenv.config();

const createOptions = async (): Promise<SetOptions> => {
  const climates: IClimate[] = await getClimates();
  const terrains: ILandform[] = await getLandforms();
  const speciesList: ISpecies[] = await getSpecies();
  const archetypes: Archetype[] = ["FISHING", "MINING", "TRADE", "FARMING", "RELIGIOUS", "MILITARY", "SHADY"];

  const climate: IClimate = climates[randomInt(0, climates.length - 1)];
  const terrain: ILandform = terrains[randomInt(0, terrains.length - 1)];
  const archetype: Archetype = archetypes[randomInt(0, archetypes.length - 1)];
  const sizes: SettlementSize[] = ["SETTLEMENT", "VILLAGE", "TOWN", "CITY", "METROPOLIS"];
  const incrementors: SettlementIncrementor[] = ["SMALL", "REGULAR", "LARGE"];
  const mLevels: MagicLevel[] = ["NO_MAGIC", "LOW_MAGIC", "COMMON_MAGIC", "HIGH_MAGIC"];
  const species = speciesList.sort(() => 0.5 - Math.random()).slice(0, randomInt(0, speciesList.length / 2) + 1);
  const size = sizes[randomInt(0, sizes.length - 1)];
  const incrementor = ["VILLAGE", "TOWN", "CITY"].filter((v: string) => v === size).length > 0 ? incrementors[randomInt(0, incrementors.length - 1)] : undefined;
  const distribution = randomNumbersWithFixedSum(species.length, 100);

  const newSpecies = species
    .map((species: ISpecies, ix: number) => ({ species, distribution: distribution[ix] }))
    .filter((v: any) => v.distribution != 0);
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

const startSettlementGenerator = async () => {
  const mdbe = await mongoose.connect(process.env.MONGODB_URI as string)

  const options = await createOptions()
  const npc = await generateNPC(options.species[0].species)
  // const res = (await Name.find({}).populate('species')).map((value) => value.species)
  // const species = [...new Set(res)]
  // console.log(species)
  // await Species.insertMany(species)
  // const hair: IHair[] = JSON.parse(fs.readFileSync(hairPath, "utf8"));
  // const res = await Skin.insertMany(skins)
  // console.log(res)
  // const e = await Eyes.insertMany(eyes)
  // const h = await Hair.insertMany(hair)
  // console.log(e.length)
  // console.log(h.length)
  // const { pop, dist } = await genPopulation(options);
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

startSettlementGenerator();
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
