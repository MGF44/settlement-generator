import { log } from "console";
import fs from "fs";
import { InventoryItem, InventoryItemAvailability } from "../types/store";
import { SetOptions } from "../types/generator-options";
import path from "path";
import capitalize from "../shared/capitalize";
import IInventoryItem from "../db/interfaces/shop/inventory_item";
import IShopArchetype from "../db/interfaces/shop/shop_archetype";
import { PossibleShop } from "../db/schemas/shop/possible_shop";
import IPossibleShop from "../db/interfaces/shop/possible_shops";
import { ShopArchetype } from "../db/schemas/shop/shop_archetype";
import INPC from "../db/schemas/npc/npc";
import genRandomNPC, { generateNPC } from "./npcs";
import randomInt, { randomIntInc } from "../shared/random-int";

type StoreType = 'ADVENTURING SUPPLIES' |
  'ADVENTURING SUPPLIES_ARTS' |
  'ADVENTURING SUPPLIES_MAGICAL' |
  'ADVENTURING SUPPLIES_SHADY' |
  'ADVENTURING SUPPLIES_WATER' |
  'ARCANE SHOP' |
  'BLACKSMITH ARMORY' |
  'BOOKSTORE' |
  'CREATURES' |
  'FLETCHER BOWYER' |
  'GENERAL STORE' |
  'GROCER' |
  'HIGH END CLOTHING' |
  'INNS TAVERNS' |
  'JEWELER' |
  'LEATHERWORKER' |
  'POTION SHOP' |
  'SPECIAL_MATERIALS' |
  'TAILOR' |
  'TEMPLE_SUPPLIES' |
  'TRANSPORTATION';


class Store {
  storeName?: string;
  _archetype?: StoreType
  shopType: string;
  _inventory: InventoryItem[] = [];
  storeOwner!: INPC;
  storeApprentices?: INPC[]
  constructor(name: string, owner: INPC, shopType: string, inventory?: InventoryItem[], archetype?: StoreType) {
    this.storeName = name
    this.storeOwner = owner
    this.shopType = shopType
    if (inventory) {
      this.inventory = inventory;
    }
    if (archetype) {
      this._archetype = archetype
    }
  }

  set archetype(archetype: StoreType) {
    this._archetype = archetype
  }

  get archetype(): StoreType | undefined {
    return this._archetype
  }

  set inventory(inventory: InventoryItem[]) {
    this._inventory = inventory
  }

  get inventory(): InventoryItem[] {
    return this.inventory
  }

  addApprentice(npc: INPC) {
    this.storeApprentices?.push(npc)
  }
}

const generateStore = async (shop: IPossibleShop, opt: SetOptions) => {
  const name = (Math.random() + 1).toString(36).substring(7);
  const owner = await genRandomNPC(opt);
  const store = new Store(name, owner, shop.name)
  const random = randomIntInc(0, 1)
  if (random === 0) {
    const noApprentices = randomIntInc(1, 3);
    [...Array(noApprentices).keys()]
      .forEach(async () => {
        const apprentice = await genRandomNPC(opt)
        store.addApprentice(apprentice)
      })
  }
  if (shop.archetype) {
    store.archetype = shop.archetype as StoreType
    const res = await ShopArchetype.findOne({ archetype: shop.archetype })
    store.inventory = res?.inventory || []
  }
  return store;
}

export { generateStore, Store }