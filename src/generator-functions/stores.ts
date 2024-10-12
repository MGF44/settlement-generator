import { log } from "console";
import fs from "fs";
import { InventoryItemAvailability } from "../types/store";
import { SetOptions } from "../types/generator-options";
import path from "path";
import capitalize from "../shared/capitalize";
import IInventoryItem from "../db/interfaces/shop/inventory_item";
import IShopArchetype from "../db/interfaces/shop/shop_archetype";


type StoreType = 'ADVENTURING SUPPLIES' |
  'ADVENTURING SUPPLIES ARTS' |
  'ADVENTURING SUPPLIES MAGICAL' |
  'ADVENTURING SUPPLIES SHADY' |
  'ADVENTURING SUPPLIES WATER' |
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

interface Store {
  type: StoreType;
  inventory: IInventoryItem[]
}

const readInventoriesJSONs = (opt: SetOptions, pop: number): IShopArchetype[] => {
  const inventoriesPath = path.resolve("src", "assets", "inventory_shops");
  const files = fs.readdirSync(inventoriesPath);
  return files.map((fileName: string) => {
    const raw = fs.readFileSync(inventoriesPath.concat("/", fileName), "utf8");
    const inventory = JSON.parse(raw);
    const [title] = fileName.split('.')
    const archetype = title.replace('_', ' ').toUpperCase() as StoreType
    return {
      archetype,
      inventory
    }
  })
};

export default readInventoriesJSONs;
