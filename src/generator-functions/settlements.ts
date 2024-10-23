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
import { Store } from "./stores";
import { getPossibleShops } from "../db/querys/shop/possible-shops";
import generate from "./npcs";
import randomInt from "../shared/random-int";

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



const getShops = async (opt: SetOptions) => {
  const posShops = await getPossibleShops()
  return archMods(opt.archetype, sizeIncMods(opt.size, posShops))
    .map((shop: IPossibleShop) => ({ shop, amount: storesNo(opt.population, shop.SV) }))
    .filter(({ amount }) => amount > 0);
}

async function* generateShopsForSettlement(opt: SetOptions) {
  const shops = (await getShops(opt)).sort((a, b) => a.amount - b.amount)
  const npcGen = await generate(opt)
  for (let ix = 0; ix < shops.length; ix++) {
    const { shop, amount } = shops[ix];
    const stores = []
    for (let innerIx = 0; innerIx < amount; innerIx++) {
      const name = (Math.random() + 1).toString(36).substring(7);
      const owner = await npcGen.random()
      const store = new Store(name, shop.type)
      if (shop.archetype) {
        store.archetype = shop.archetype
      }
      store.storeName = shop.name;
      store.addOwner(owner);
      if (randomInt(0, 2) === 0) {
        store.addApprentice(await npcGen.npc(owner.species))
      }
      stores.push(store)
    }
    yield stores;
  }
}

// const generateSettlementShops = async (opt: SetOptions) => {
//   const possibleShops = await getPossibleShops()
//   const adjustedShops = archMods(opt.archetype, sizeIncMods(opt.size, possibleShops))
//     .map((shop: IPossibleShop) => ({ shop, amount: storesNo(opt.population, shop.SV) }))
//     .filter(({ amount }) => amount > 0)
//   return await Promise.all(adjustedShops.map(async ({ shop, amount }) => Promise.all([...Array(amount).keys()].map(async () => await generateStore(shop, opt)))))
// };


export { generateShopsForSettlement };
