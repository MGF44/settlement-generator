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
import metropolisMod from "./size/metropolis";
import cityMod from "./size/city";


const storesNo = (pop: number, sv: number) => {
  const perPop = pop / sv;
  const perPopInt = Math.floor(perPop);
  const rest = perPop - perPopInt;
  const random = Math.random();
  return perPopInt + (random <= rest ? 1 : 0);
};

const archetypeMap = (archetype: Archetype, shop: Shop): Shop => {
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
  return shop
};

const archetypeModifiers = (archetype: Archetype, shops: Shop[]): Shop[] => {
  return shops.map((shop: Shop) => archetypeMap(archetype, shop));
};
const settlementSizeIncrementorModifiers = (size: SettlementSize, shops: Shop[]) => {
  return shops.map((shop: Shop) => {
    if (size === 'METROPOLIS') return metropolisMod(shop)
    if (size === 'CITY') return cityMod(shop)
    return shop
  })
};
const magicLevelModifiers = () => { };
const incrementorModifiers = () => { };
const climateModififers = () => { };

const generateSettlement = (
  opt: SetOptions,
  { pop, dist }: { pop: number; dist: any }
) => {
  // const posShops = getPossibleShops();
  // const posShopsArchetype = settlementSizeIncrementorModifiers(opt.size, archetypeModifiers(opt.archetype, posShops));
  // const numberShops = posShopsArchetype.map((shop: Shop) => ({ shop, quantity: storesNo(pop, shop.SV) })).filter((v) => v.quantity > 0)
  // console.log(numberShops)
};

interface Shop {
  name: string;
  SV: number;
  count?: number;
}
export { generateSettlement, Shop };
