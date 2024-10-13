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
  archetype?: StoreType
  inventory: InventoryItem[] = [];
  storeOwner!: INPC;
  constructor(name: string, owner: INPC, inventory?: InventoryItem[], archetype?: StoreType) {
    this.storeName = name
    this.storeOwner = owner
    if (inventory) {
      this.inventory = inventory;
    }
    if (archetype) {
      this.archetype = archetype
    }
  }
}

const generateStore = (shop: IPossibleShop) => {
  if (shop.archetype) {
    ShopArchetype.find({ archetype: shop.archetype })
  }
}
