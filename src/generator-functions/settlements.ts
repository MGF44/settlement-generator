import {
  Archetype,
  Landform,
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
    return farmingArchetypeMod(shop);
  }
  if (archetype === "FISHING") {
    return fishingArchetypeMod(shop);
  }
  if (archetype === "MINING") {
    return miningArchetypeMod(shop);
  }
  if (archetype === "MILITARY") {
    return militaryArchetypeMod(shop);
  }
  if (archetype === "RELIGIOUS") {
    return religiousArchetypeMod(shop);
  }
  if (archetype === "SHADY") {
    return shadyArchetypeMod(shop);
  }
  if (archetype === "TRADE") {
    return tradeArchetypeMod(shop);
  }
};

const archetypeModifiers = (archetype: Archetype, shops: Shop[]) => {
  return shops.map((shop: Shop) => archetypeMap(archetype, shop));
};
const settlementSizeIncrementorModifiers = () => {};
const magicLevelModifiers = () => {};
const incrementorModifiers = () => {};
const climateModififers = () => {};

const generateSettlement = (
  opt: SetOptions,
  { pop, dist }: { pop: number; dist: any }
) => {
  const posShops = getPossibleShops();
  const posShopsArchetype = archetypeModifiers(opt.archetype, posShops);
};

interface Shop {
  name: string;
  SV: number;
  count?: number;
}
export { generateSettlement, Shop };
