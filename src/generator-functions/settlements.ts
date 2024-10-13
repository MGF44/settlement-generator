import {
  Archetype,
  SetOptions,
  SettlementSize,
} from "../types/generator-options";
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
import IPossibleShop from "../db/interfaces/shop/possible_shops";
import { PossibleShop } from "../db/schemas/shop/possible_shop";
import { generateStore } from "./stores";

const storesNo = (pop: number, sv: number) => {
  const perPop = pop / sv;
  const perPopInt = Math.floor(perPop);
  const rest = perPop - perPopInt;
  const random = Math.random();
  return perPopInt + (random <= rest ? 1 : 0);
};

const archetypeMap = (archetype: Archetype, shop: IPossibleShop): IPossibleShop => {
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

const archMods = (archetype: Archetype, shops: IPossibleShop[]): IPossibleShop[] => {
  return shops.map((shop: IPossibleShop) => archetypeMap(archetype, shop));
};
const sizeIncMods = (size: SettlementSize, shops: IPossibleShop[]): IPossibleShop[] => {
  return shops.map((shop: IPossibleShop) => {
    if (size === 'METROPOLIS') return metropolisMod(shop)
    if (size === 'CITY') return cityMod(shop)
    return shop
  })
};
const magicLevelModifiers = () => { };
const incrementorModifiers = () => { };
const climateModififers = () => { };

const generateSettlement = async (opt: SetOptions) => {
  const possibleShops = await PossibleShop.find({})
  const adjustedShops = archMods(opt.archetype, sizeIncMods(opt.size, possibleShops))
    .map((shop: IPossibleShop) => ({ shop, amount: storesNo(opt.population, shop.SV) }))
    .filter(({ amount }) => amount > 0)
  return await Promise.all(adjustedShops.map(async ({ shop, amount }) => Promise.all([...Array(amount).keys()].map(async () => await generateStore(shop, opt)))))
};


export { generateSettlement };
