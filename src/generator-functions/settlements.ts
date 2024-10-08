import {
  Archetype,
  SetOptions,
  SettlementIncrementor,
  SettlementSize,
} from "../types/generator-options";
import fs from "fs";
import {
  farmingArchetypeMod,
  fishingArchetypeMod,
  militaryArchetypeMod,
  miningArchetypeMod,
  religiousArchetypeMod,
  shadyArchetypeMod,
  tradeArchetypeMod,
} from "./archetypes";

const getPossibleShops = (): Shop[] => {
  const inventories = "./src/assets/random";
  const json = JSON.parse(
    fs.readFileSync(inventories + "/" + "shops_f.json", "utf8")
  );
  return json["UniqueProfessions"];
};

const storesNo = (pop: number, sv: number) => {
  const perPop = pop / sv;
  const perPopInt = Math.floor(perPop);
  const rest = perPop - perPopInt;
  const random = Math.random();
  return perPopInt + (random <= rest ? 1 : 0);
};

const archetypeMap = (archetype: Archetype, shop: Shop) => {
  if (archetype === "FARMING") {
    return farmingArchetypeMod(shop, archetype);
  }
  if (archetype === "FISHING") {
    return fishingArchetypeMod(shop, archetype);
  }
  if (archetype === "MINING") {
    return miningArchetypeMod(shop, archetype);
  }
  if (archetype === "MILITARY") {
    return militaryArchetypeMod(shop, archetype);
  }
  if (archetype === "RELIGIOUS") {
    return religiousArchetypeMod(shop, archetype);
  }
  if (archetype === "SHADY") {
    return shadyArchetypeMod(shop, archetype);
  }
  if (archetype === "TRADE") {
    return tradeArchetypeMod(shop, archetype);
  }
};

const archetypeModifiers = (archetype: Archetype, shops: Shop[]) => {
  return shops.map((shop: Shop) => archetypeMap(archetype, shop));
};

// const settlementModifiers = (
//   setSize: SettlementSize,
//   setInc: SettlementIncrementor,
//   shops: Shop[]
// ) => {

// };

const settlementSizeModifiers = () => {};
const magicLevelModifiers = () => {};
const incrementorModifiers = () => {};
const terrainModififers = () => {};
const climateModififers = () => {};

const generateSettlement = (
  opt: SetOptions,
  { pop, dist }: { pop: number; dist: any }
) => {
  const shops = getPossibleShops();
  const possibleShops = archetypeModifiers(opt.archetype, shops);
};

interface Shop {
  name: string;
  SV: number;
  count?: number;
}
export { generateSettlement, Shop };
