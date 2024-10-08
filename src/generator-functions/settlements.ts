import { Archetype, SetOptions } from "../types/generator-options";
import fs from "fs";
import farmingArchetypeMod from "./archetypes/farming";
import fishingArchetypeMod from "./archetypes/fishing";
import miningArchetypeMod from "./archetypes/mining";

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

const archetypeModifiers = (archetype: Archetype, shops: Shop[]) => {
  return shops.map((shop: Shop) => {
    if (archetype === "FARMING") {
      return farmingArchetypeMod(shop, archetype);
    }
    if (archetype === "FISHING") {
      return fishingArchetypeMod(shop, archetype);
    }
    if (archetype === "MINING") {
      return miningArchetypeMod(shop, archetype);
    }
  });
};
const settlementSizeModifiers = () => {};
const magicLevelModifiers = () => {};
const incrementorModifiers = () => {};
const terrainModififers = () => {};
const climateModififers = () => {};

const generateSettlement = (
  opt: SetOptions,
  { pop, dist }: { pop: number; dist: any }
) => {
  const possibleShops = getPossibleShops();
};
interface Shop {
  name: string;
  SV: number;
  count?: number;
}
export { generateSettlement, Shop };
